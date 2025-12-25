#!/bin/sh
# Git post-commit hook to automatically update CHANGELOG.md
# 
# To install this hook, run:
#   cp scripts/post-commit-hook.sh .git/hooks/post-commit
#   chmod +x .git/hooks/post-commit

node scripts/update-changelog.js

