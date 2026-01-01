#!/bin/bash
# Sync singular folders (OpenCode) to plural folders (Claude Code)
# Run this before committing changes

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

mkdir -p agents commands skills/conversation-analysis

cp -r agent/* agents/ 2>/dev/null || true
cp -r command/* commands/ 2>/dev/null || true
cp -r skill/* skills/ 2>/dev/null || true

echo "Synced: agent/ -> agents/, command/ -> commands/, skill/ -> skills/"
