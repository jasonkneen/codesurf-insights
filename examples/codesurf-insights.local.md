# CodeSurf Insights Settings

Example configuration file. Copy to `~/.claude/codesurf-insights.local.md` to customize.

## Analysis Depth
<!-- Options: brief | detailed -->
depth: detailed

## Auto-Analysis Threshold
<!-- Minimum messages before auto-analyzing a session -->
min_messages: 10

## Detritus Patterns
<!-- Patterns to identify as noise for archival -->
patterns:
  - Failed tool call loops (3+ retries)
  - Greetings and small talk
  - "Let me try again" without new approach
  - Repetitive error messages (3+ occurrences)
  - Abandoned threads (started but not completed)
  - Pure acknowledgment responses

## Dimensions to Prioritize
<!-- Which analysis dimensions to focus on (high/medium/low) -->
priorities:
  lessons_learned: high
  efficiency: high
  model_understanding: medium
  user_communication: medium
  assumptions: medium
  language: low

## Auto-Compact Settings
<!-- Automatic log compaction configuration -->
auto_compact:
  enabled: true
  threshold_mb: 10
  archive_detritus: true

## CLAUDE.md Integration
<!-- How to update CLAUDE.md with insights -->
claude_md:
  update_mode: direct
  max_insights_per_session: 5
  use_markers: true

## Report Settings
<!-- Insight report configuration -->
reports:
  save_to_file: true
  output_dir: ~/.claude/insights/reports/
  include_examples: true
