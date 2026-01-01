# codesurf-insights

Learn from conversation history to continuously improve Claude Code performance.

## Features

- **Conversation Analysis**: Extracts insights across 6 dimensions:
  - User communication quality
  - Model understanding issues
  - Incorrect model assumptions
  - Efficiency opportunities (shorter conversations)
  - Lessons learned
  - Language/vernacular improvements

- **Automatic Learning**: Post-session hook analyzes conversations and updates CLAUDE.md with lessons

- **Log Compaction**: Archives detritus (failed loops, noise, small talk) to keep logs clean

- **Global + Project Insights**: Learns patterns that benefit all projects, plus project-specific lessons


## Example output

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
    ├── conversation-analysis-2026-01-01.md - Full 680-line analysis
    ├── claude-md-additions.md - Ready-to-paste sections
    └── IMPLEMENTATION-CHECKLIST.md - Rollout plan

  CLAUDE.md updated with 10 new insights
  ═══════════════════════════════════════════════════════════════

  Key findings:
  - 122K tokens wasted (5.8%) - recoverable with these patterns
  - 92% first-turn fix rate achievable with error+context format
  - 40% fewer corrections possible with two-attempt rule + scope containment

## Installation

```bash
claude --plugin-dir ~/.claude/plugins/codesurf-insights
```

Or add to your Claude Code settings.

## Commands

| Command | Description |
|---------|-------------|
| `/codesurf-insights:analyze [project\|all]` | Analyze conversations on-demand |
| `/codesurf-insights:compact [project\|all]` | Archive detritus, clean logs |
| `/codesurf-insights:report` | Generate insights summary |

## Agents

- **conversation-analyzer**: Deep analysis of conversations, extracts actionable lessons
- **detritus-detector**: Identifies noise, failed loops, and unhelpful content

## Configuration

Create `~/.claude/codesurf-insights.local.md` to customize:

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

## How It Works

1. **Post-Session Hook**: After each conversation, the hook checks if analysis should run
2. **Detritus Detection**: Identifies and archives unhelpful content
3. **Insight Extraction**: Analyzes remaining content across 6 dimensions
4. **CLAUDE.md Update**: Adds lessons learned directly to your CLAUDE.md
5. **Report Generation**: Creates timestamped insight reports

## Log Locations

- Conversation logs: `~/.claude/projects/*/conversations/`
- Archived detritus: `~/.claude/insights/archive/`
- Insight reports: `~/.claude/insights/reports/`
