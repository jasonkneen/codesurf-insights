---
description: Analyze conversation logs to extract insights and lessons learned
argument-hint: "[project|all]"
allowed-tools:
  - Read
  - Glob
  - Grep
  - Bash
  - Write
  - Task
  - TodoWrite
---

# Analyze Conversations

Analyze conversation logs from **Claude Code** OR **OpenCode** to extract insights across 6 dimensions: user communication, model understanding, assumptions, efficiency, lessons learned, and language patterns.

## Arguments

- `project` (default): Analyze current project's conversations only
- `all`: Analyze all projects globally
- `{project-name}`: Analyze specific project by name

## Process

### 1. Detect Tool & Locate Conversations

**IMPORTANT**: First detect which tool's history to analyze by checking which paths exist:

**Claude Code** (check first):
- Project scope: `~/.claude/projects/{current-project-hash}/conversations/*.jsonl`
- Global scope: `~/.claude/projects/*/conversations/*.jsonl`
- Format: JSONL files with message objects

**OpenCode** (check if Claude paths don't exist or explicitly requested):
- Sessions: `~/.local/share/opencode/storage/session/ses_*`
- Messages: `~/.local/share/opencode/storage/message/ses_*`  
- Parts: `~/.local/share/opencode/storage/part/msg_*/prt_*.json`
- Format: JSON files with `{id, type, text, messageID, sessionID}`

**Both** (when running `/analyze all`):
- Analyze BOTH sources and combine insights

### 2. Show Live Progress

Display progress as you analyze:
```
Analyzing conversations...
├── Source: Claude Code
│   ├── Project: my-app (12 conversations)
│   │   ├── [1/12] abc123... 47 messages, 3 insights
│   │   └── ...
├── Source: OpenCode  
│   ├── Sessions found: 73
│   │   ├── [1/73] ses_485d888e... 23 messages, 2 insights
│   │   └── ...
```

### 3. Use conversation-analyzer Agent

Launch the conversation-analyzer agent for deep analysis. The agent will:
- Parse messages (handling both JSONL and OpenCode JSON formats)
- Identify segments and patterns
- Score across 6 dimensions
- Extract structured insights
- Flag detritus for later compaction

### 4. Aggregate Results

Combine insights across ALL conversation sources:
- Group by dimension
- Identify recurring patterns
- Rank by frequency and actionability
- Note which tool the insight came from

### 5. Update Memory Files

**Claude Code** (if CLAUDE.md exists):
```markdown
<!-- codesurf-insights: START -->
### Learned: YYYY-MM-DD

- [LESSON] insight here
- [EFFICIENCY] insight here

<!-- codesurf-insights: END -->
```

**OpenCode** (if opencode.json exists, update project README or OPENCODE.md):
```markdown
<!-- codesurf-insights: START -->
### Learned: YYYY-MM-DD

- [LESSON] insight here  
- [EFFICIENCY] insight here

<!-- codesurf-insights: END -->
```

### 6. Save Report

Write detailed report to `~/.claude/insights/reports/YYYY-MM-DD-HHmm.md`
Include which sources were analyzed.

## Output

Show summary at completion:
```
Analysis Complete
═══════════════════════════════════════
Sources analyzed:
  - Claude Code: 24 conversations
  - OpenCode: 73 sessions
Total messages: 1,247
Detritus flagged: 312 (25%)
Insights extracted: 18

Top Insights:
1. [EFFICIENCY] Use Task agent for parallel file searches
2. [LESSON] Always check git status before bulk edits
3. [ASSUMPTION] Verify TypeScript vs JavaScript early

Full report: ~/.claude/insights/reports/2026-01-01-1430.md
CLAUDE.md updated with 5 new lessons
```

## OpenCode Part Format Reference

When parsing OpenCode parts, expect this structure:
```json
{
  "id": "prt_...",
  "type": "text",
  "text": "message content",
  "synthetic": false,
  "time": {"start": timestamp, "end": timestamp},
  "messageID": "msg_...",
  "sessionID": "ses_..."
}
```

## Tips

- Run after completing significant work sessions
- Use `all` to analyze BOTH Claude Code and OpenCode history together
- Cross-tool insights often reveal interesting patterns
- Review flagged detritus with `/compact` to clean logs
