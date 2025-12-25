#!/usr/bin/env node

/**
 * Script to automatically update CHANGELOG.md with new git commits
 * 
 * Usage:
 *   node scripts/update-changelog.js
 *   npm run changelog
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const CHANGELOG_PATH = path.join(__dirname, '..', 'CHANGELOG.md');

// Get the last commit hash from CHANGELOG.md
function getLastRecordedCommit() {
  try {
    const changelog = fs.readFileSync(CHANGELOG_PATH, 'utf8');
    const commitMatch = changelog.match(/## Commit History[\s\S]*?### \d{4}-\d{2}-\d{2}[\s\S]*?\*\*([a-f0-9]+)\*\*/);
    if (commitMatch) {
      return commitMatch[1];
    }
    // If no commit history section, check the version section
    const versionMatch = changelog.match(/\*\*Commit:\*\* `([a-f0-9]+)`/);
    if (versionMatch) {
      return versionMatch[1];
    }
    return null;
  } catch (error) {
    console.error('Error reading CHANGELOG.md:', error.message);
    return null;
  }
}

// Get all commits since a specific commit hash
function getCommitsSince(hash) {
  try {
    if (!hash) {
      // Get all commits
      const output = execSync(
        'git log --pretty=format:"%h|%ad|%an|%ae|%s" --date=iso',
        { encoding: 'utf8' }
      );
      return parseCommits(output);
    } else {
      // Get commits since the hash
      const output = execSync(
        `git log ${hash}..HEAD --pretty=format:"%h|%ad|%an|%ae|%s" --date=iso`,
        { encoding: 'utf8' }
      );
      return parseCommits(output);
    }
  } catch (error) {
    // If hash doesn't exist, get all commits
    if (error.message.includes('bad revision')) {
      const output = execSync(
        'git log --pretty=format:"%h|%ad|%an|%ae|%s" --date=iso',
        { encoding: 'utf8' }
      );
      return parseCommits(output);
    }
    throw error;
  }
}

// Parse commit output
function parseCommits(output) {
  if (!output.trim()) {
    return [];
  }
  
  return output.trim().split('\n').map(line => {
    const [hash, date, author, email, ...messageParts] = line.split('|');
    const message = messageParts.join('|');
    return {
      hash: hash.trim(),
      date: date.trim(),
      author: author.trim(),
      email: email.trim(),
      message: message.trim()
    };
  });
}

// Get commit stats
function getCommitStats(hash) {
  try {
    const output = execSync(
      `git show --stat --format="" ${hash}`,
      { encoding: 'utf8' }
    );
    const lines = output.trim().split('\n');
    const lastLine = lines[lines.length - 1];
    const match = lastLine.match(/(\d+) files? changed(?:, (\d+) insertions?\(\+\))?(?:, (\d+) deletions?\(-\))?/);
    
    if (match) {
      return {
        files: parseInt(match[1]) || 0,
        insertions: parseInt(match[2]) || 0,
        deletions: parseInt(match[3]) || 0
      };
    }
    return { files: 0, insertions: 0, deletions: 0 };
  } catch (error) {
    return { files: 0, insertions: 0, deletions: 0 };
  }
}

// Group commits by date
function groupCommitsByDate(commits) {
  const grouped = {};
  commits.forEach(commit => {
    const date = commit.date.split('T')[0]; // Extract YYYY-MM-DD
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(commit);
  });
  return grouped;
}

// Update CHANGELOG.md
function updateChangelog(newCommits) {
  if (newCommits.length === 0) {
    console.log('No new commits to add to CHANGELOG.md');
    return;
  }

  let changelog = fs.readFileSync(CHANGELOG_PATH, 'utf8');
  
  // Group commits by date
  const groupedCommits = groupCommitsByDate(newCommits);
  const dates = Object.keys(groupedCommits).sort().reverse();
  
  // Find the "Commit History" section
  const commitHistoryIndex = changelog.indexOf('## Commit History');
  
  if (commitHistoryIndex === -1) {
    // If no commit history section, add it before the end
    const newSection = '\n\n## Commit History\n\n';
    dates.forEach(date => {
      newSection += `### ${date}\n`;
      groupedCommits[date].forEach(commit => {
        const stats = getCommitStats(commit.hash);
        newSection += `- **${commit.hash}** - ${commit.message}\n`;
        newSection += `  - Author: ${commit.author} (${commit.email})\n`;
        newSection += `  - Date: ${commit.date}\n`;
        if (stats.files > 0) {
          newSection += `  - Files: ${stats.files} changed, ${stats.insertions} insertions(+), ${stats.deletions} deletions(-)\n`;
        }
        newSection += '\n';
      });
    });
    changelog += newSection;
  } else {
    // Insert new commits at the beginning of the commit history section
    let insertPosition = commitHistoryIndex + '## Commit History'.length;
    
    // Find the first date section or end of commit history
    const nextSectionMatch = changelog.substring(insertPosition).match(/\n\n---/);
    const nextSectionIndex = nextSectionMatch 
      ? insertPosition + nextSectionMatch.index 
      : changelog.length;
    
    // Build new commit entries
    let newEntries = '\n';
    dates.forEach(date => {
      newEntries += `### ${date}\n`;
      groupedCommits[date].forEach(commit => {
        const stats = getCommitStats(commit.hash);
        newEntries += `- **${commit.hash}** - ${commit.message}\n`;
        newEntries += `  - Author: ${commit.author} (${commit.email})\n`;
        newEntries += `  - Date: ${commit.date}\n`;
        if (stats.files > 0) {
          newEntries += `  - Files: ${stats.files} changed, ${stats.insertions} insertions(+), ${stats.deletions} deletions(-)\n`;
        }
        newEntries += '\n';
      });
    });
    
    // Insert new entries
    changelog = changelog.substring(0, insertPosition) + newEntries + changelog.substring(insertPosition);
  }
  
  // Update the "Unreleased" section if it exists
  const unreleasedMatch = changelog.match(/## \[Unreleased\]/);
  if (unreleasedMatch && newCommits.length > 0) {
    // Build new entries for Unreleased section
    let unreleasedEntries = '';
    const addedCommits = [];
    const fixedCommits = [];
    const changedCommits = [];
    const removedCommits = [];
    
    // Categorize commits by message prefix
    newCommits.forEach(commit => {
      const msg = commit.message.toLowerCase();
      if (msg.startsWith('fix') || msg.startsWith('bugfix')) {
        fixedCommits.push(commit);
      } else if (msg.startsWith('remove') || msg.startsWith('delete')) {
        removedCommits.push(commit);
      } else if (msg.startsWith('update') || msg.startsWith('change') || msg.startsWith('modify')) {
        changedCommits.push(commit);
      } else {
        addedCommits.push(commit);
      }
    });
    
    if (addedCommits.length > 0) {
      unreleasedEntries += '### Added\n';
      addedCommits.forEach(commit => {
        unreleasedEntries += `- ${commit.message} (${commit.hash})\n`;
      });
      unreleasedEntries += '\n';
    }
    
    if (changedCommits.length > 0) {
      unreleasedEntries += '### Changed\n';
      changedCommits.forEach(commit => {
        unreleasedEntries += `- ${commit.message} (${commit.hash})\n`;
      });
      unreleasedEntries += '\n';
    }
    
    if (fixedCommits.length > 0) {
      unreleasedEntries += '### Fixed\n';
      fixedCommits.forEach(commit => {
        unreleasedEntries += `- ${commit.message} (${commit.hash})\n`;
      });
      unreleasedEntries += '\n';
    }
    
    if (removedCommits.length > 0) {
      unreleasedEntries += '### Removed\n';
      removedCommits.forEach(commit => {
        unreleasedEntries += `- ${commit.message} (${commit.hash})\n`;
      });
      unreleasedEntries += '\n';
    }
    
    // Replace the Unreleased section
    const unreleasedRegex = /## \[Unreleased\]\s*\n\n/;
    if (unreleasedRegex.test(changelog)) {
      changelog = changelog.replace(unreleasedRegex, `## [Unreleased]\n\n${unreleasedEntries}`);
    } else {
      // Insert after Unreleased header
      const insertPos = unreleasedMatch.index + unreleasedMatch[0].length;
      changelog = changelog.substring(0, insertPos) + '\n\n' + unreleasedEntries + changelog.substring(insertPos);
    }
  }
  
  fs.writeFileSync(CHANGELOG_PATH, changelog, 'utf8');
  console.log(`✓ Updated CHANGELOG.md with ${newCommits.length} new commit(s)`);
}

// Main execution
function main() {
  try {
    console.log('Updating CHANGELOG.md...');
    
    const lastCommit = getLastRecordedCommit();
    console.log(`Last recorded commit: ${lastCommit || 'none (will add all commits)'}`);
    
    const newCommits = getCommitsSince(lastCommit);
    console.log(`Found ${newCommits.length} commit(s) to add`);
    
    if (newCommits.length > 0) {
      updateChangelog(newCommits);
    } else {
      console.log('No new commits to add.');
    }
  } catch (error) {
    console.error('Error updating changelog:', error.message);
    process.exit(1);
  }
}

main();

