# Changelog Update Scripts

This directory contains scripts for automatically maintaining the CHANGELOG.md file.

## update-changelog.js

Automatically updates CHANGELOG.md with new git commits since the last recorded commit.

### Usage

```bash
# Run manually
npm run changelog

# Or directly
node scripts/update-changelog.js
```

### How it works

1. Reads the last recorded commit hash from CHANGELOG.md
2. Fetches all commits since that hash
3. Groups commits by date
4. Updates the "Unreleased" section with new commits
5. Adds detailed commit information to the "Commit History" section

### Features

- Automatically detects new commits
- Groups commits by date
- Includes commit hash, author, date, and file statistics
- Preserves existing changelog format
- Safe to run multiple times (won't duplicate entries)

## Automatic Updates with Git Hooks

To automatically update the changelog after each commit, install the post-commit hook:

```bash
# Copy the hook script to git hooks directory
cp scripts/post-commit-hook.sh .git/hooks/post-commit

# Make it executable
chmod +x .git/hooks/post-commit
```

After installation, the changelog will be automatically updated every time you commit.

### Manual Update

If you prefer to update manually, just run:

```bash
npm run changelog
```

This is useful if you want to batch multiple commits together or update at specific times.

