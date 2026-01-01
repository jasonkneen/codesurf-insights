# codesurf-insights

Learn from conversation history to continuously improve AI coding assistant performance.

**Cross-compatible**: Works with both **Claude Code** and **OpenCode**.

---

## Quick Start

### Claude Code Installation

```bash
# Option 1: Symlink (recommended - always up to date)
ln -s ~/.claude/plugins/codesurf-insights ~/.claude/plugins/codesurf-insights

# Option 2: Direct path
claude --plugin-dir ~/.claude/plugins/codesurf-insights
```

**Verify it works:**
```bash
claude
# Then type: /codesurf-insights:analyze
# Should see: "Analyzing conversations..."
```

### OpenCode Installation

```bash
# Copy to OpenCode plugins directory
mkdir -p ~/.config/opencode/plugins
cp -r ~/.claude/plugins/codesurf-insights ~/.config/opencode/plugins/
```

**Verify it works:**
```bash
opencode
# Then type: /analyze
# Should see: "Analyzing conversations..."
```

---

## Commands

| Claude Code | OpenCode | Description |
|-------------|----------|-------------|
| `/codesurf-insights:analyze [project\|all]` | `/analyze [project\|all]` | Analyze conversations, extract insights |
| `/codesurf-insights:compact [project\|all]` | `/compact [project\|all]` | Archive detritus, clean logs |
| `/codesurf-insights:report` | `/report` | Generate insights summary |

### Arguments

- `project` (default): Current project only
- `all`: All projects globally
- `{project-name}`: Specific project by name

---

## Features

### Conversation Analysis
Extracts insights across 6 dimensions:
- **User Communication**: How clearly you convey requests
- **Model Understanding**: Where the model misunderstands
- **Assumptions**: Incorrect assumptions made
- **Efficiency**: Wasted tokens, unnecessary loops
- **Lessons Learned**: Actionable improvements
- **Language Patterns**: Terminology that helps/hurts

### Automatic Learning
Post-session hook analyzes conversations and updates CLAUDE.md with lessons:
```markdown
<!-- codesurf-insights: START -->
## Learned Insights (Auto-generated: 2026-01-01)

### CRITICAL: File Paths in Hooks
**cwd resets between bash calls - 23 failures from relative paths**
<!-- codesurf-insights: END -->
```

### Log Compaction
Archives detritus (failed loops, noise, small talk) to keep logs clean and focused.

---

## Example Output

```
Analysis Complete
═══════════════════════════════════════════════════════════════
Conversations analyzed: 5 (largest, 2.3MB total)
Total messages: 826
Detritus flagged: ~177 correction cycles
Insights extracted: 10 critical patterns

Top Insights:
1. [CRITICAL] File paths - use absolute (23 failures from relative)
2. [CRITICAL] Error format - [file:line] + 5 context = 92% success
3. [CRITICAL] Hook state - file-based only (cwd resets)
4. [CRITICAL] Scope - fix ONLY what's asked (18 overreach instances)
5. [EFFICIENCY] Max 1 apology (47 instances = 14K wasted tokens)

Full reports: ~/.claude/insights/reports/
  ├── README.md              - Guide to reports
  ├── SUMMARY.md             - 2-min overview
  ├── TOP-INSIGHTS.md        - Top 10 actionable items
  └── claude-md-additions.md - Ready-to-paste sections

CLAUDE.md updated with 10 new insights
═══════════════════════════════════════════════════════════════
```

---

## Cross-Compatibility Architecture

This plugin maintains parallel folder structures for both tools:

```
codesurf-insights/
├── .claude-plugin/
│   └── plugin.json          # Claude Code manifest
├── plugin.ts                 # OpenCode entry point
│
├── agent/                    # OpenCode agents (EDIT THESE)
│   ├── conversation-analyzer.md
│   └── detritus-detector.md
├── agents/                   # Claude Code agents (auto-synced)
│
├── command/                  # OpenCode commands (EDIT THESE)
│   ├── analyze.md
│   ├── compact.md
│   └── report.md
├── commands/                 # Claude Code commands (auto-synced)
│
├── skill/                    # OpenCode skills (EDIT THESE)
│   └── conversation-analysis/
├── skills/                   # Claude Code skills (auto-synced)
│
├── hooks/
│   └── hooks.json           # Claude Code post-session hook
│
├── sync.sh                  # Syncs singular → plural folders
└── .githooks/
    └── pre-commit           # Auto-syncs before git commit
```

### How Sync Works

1. **Edit files in singular folders** (`agent/`, `command/`, `skill/`)
2. **Run `./sync.sh`** or just commit (pre-commit hook runs sync automatically)
3. **Both tools get updates**

| Component | Claude Code Reads | OpenCode Reads |
|-----------|-------------------|----------------|
| Agents | `agents/` | `agent/` |
| Commands | `commands/` | `command/` |
| Skills | `skills/` | `skill/` |
| Hooks | `hooks/hooks.json` | `plugin.ts` |
| Manifest | `.claude-plugin/plugin.json` | (auto-detected) |

---

## Configuration

Create `~/.claude/codesurf-insights.local.md` to customize behavior:

```markdown
# CodeSurf Insights Settings

## Analysis Depth
<!-- brief | detailed -->
depth: detailed

## Auto-Analysis Threshold
<!-- Minimum messages before auto-analyzing -->
min_messages: 10

## Detritus Patterns
<!-- Patterns to identify as noise -->
- Failed tool call loops (3+ retries)
- Greetings and small talk
- "Let me try again" without new approach
- Repetitive error messages

## Dimensions to Prioritize
<!-- Which analysis dimensions to focus on -->
- lessons_learned: high
- efficiency: high
- model_understanding: medium
- user_communication: medium
- assumptions: medium
- language: low

## Auto-Compact
<!-- Enable automatic compaction -->
enabled: true
threshold_mb: 10
```

---

## How It Works

1. **Post-Session Hook**: After conversation ends, hook checks if analysis should run
2. **Threshold Check**: Only analyzes if message count >= min_messages (default: 10)
3. **Detritus Detection**: Identifies and archives unhelpful content
4. **Insight Extraction**: Analyzes remaining content across 6 dimensions
5. **CLAUDE.md Update**: Adds lessons between marker comments
6. **Report Generation**: Creates timestamped insight reports

---

## Log Locations

| Content | Location |
|---------|----------|
| Conversation logs | `~/.claude/projects/*/conversations/` |
| Archived detritus | `~/.claude/insights/archive/` |
| Insight reports | `~/.claude/insights/reports/` |
| Settings | `~/.claude/codesurf-insights.local.md` |

---

## Troubleshooting

### Commands not appearing

**Claude Code:**
```bash
# Check plugin is loaded
claude --list-plugins
# Should show: codesurf-insights

# If not, verify plugin.json exists
ls ~/.claude/plugins/codesurf-insights/.claude-plugin/plugin.json
```

**OpenCode:**
```bash
# Check plugin directory
ls ~/.config/opencode/plugins/codesurf-insights/

# Verify plugin.ts exists
ls ~/.config/opencode/plugins/codesurf-insights/plugin.ts
```

### Sync not working

```bash
# Verify git hook is enabled
cd ~/.claude/plugins/codesurf-insights
git config core.hooksPath
# Should show: .githooks

# If not, enable it
git config core.hooksPath .githooks
```

### Analysis finds no conversations

```bash
# Check conversation logs exist
ls ~/.claude/projects/*/conversations/*.jsonl

# If empty, run some Claude sessions first
```

### CLAUDE.md not updating

Check for marker comments in your CLAUDE.md:
```markdown
<!-- codesurf-insights: START -->
<!-- codesurf-insights: END -->
```

If missing, add them - insights get inserted between these markers.

---

## Development

### Making Changes

1. Edit files in **singular folders** (`agent/`, `command/`, `skill/`)
2. Test in your preferred tool
3. Commit - sync happens automatically via pre-commit hook

### Manual Sync

```bash
cd ~/.claude/plugins/codesurf-insights
./sync.sh
```

### Testing Locally

```bash
# Claude Code
claude --plugin-dir ~/.claude/plugins/codesurf-insights

# OpenCode  
cp -r . ~/.config/opencode/plugins/codesurf-insights-test
opencode
```

---

## Why Dual Folders?

Symlinks would be cleaner but:
- Windows requires admin/Developer Mode for symlinks
- Git often converts symlinks to text files on clone
- Duplicate folders are simpler and always work

The sync overhead is minimal - just run `./sync.sh` or let the pre-commit hook handle it.

---

## License

MIT
