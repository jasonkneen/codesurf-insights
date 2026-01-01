---
description: Archive detritus and clean conversation logs
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

# Compact Conversation Logs

Remove detritus from conversation logs while archiving removed content for reference. Works with both **Claude Code** and **OpenCode** conversation histories.

## Arguments

- `project` (default): Compact current project's conversations only
- `all`: Compact all projects globally (both tools)
- `{project-name}`: Compact specific project by name

## Process

### 1. Detect Tool & Locate Conversations

**IMPORTANT**: First detect which conversation sources exist:

**Claude Code**:
- Project: `~/.claude/projects/{hash}/conversations/*.jsonl`
- Global: `~/.claude/projects/*/conversations/*.jsonl`

**OpenCode**:
- Sessions: `~/.local/share/opencode/storage/session/ses_*`
- Messages: `~/.local/share/opencode/storage/message/ses_*`
- Parts: `~/.local/share/opencode/storage/part/msg_*/prt_*.json`

### 2. Use detritus-detector Agent

Launch the detritus-detector agent to identify noise:
- Failed tool loops (3+ retries)
- Greeting/acknowledgment exchanges
- Abandoned threads
- Duplicate error messages
- Clarification spirals

### 3. Show What Will Be Archived

Present summary before archiving:
```
Detritus Found
══════════════════════════════════
Source: Claude Code
├── Conversation abc123:
│   ├── [lines 45-67] Failed grep loop (5 attempts)
│   └── [lines 120-125] Greeting exchange

Source: OpenCode
├── Session ses_485d888e:
│   ├── [msg_19b370...] Failed tool loop (4 attempts)
│   └── [msg_19b371...] "Let me try again" x3

Total: 156 segments across 8 conversations/sessions
Archive location: ~/.claude/insights/archive/2026-01-01/
```

### 4. Archive Detritus

Move flagged content to archive:
- Create `~/.claude/insights/archive/YYYY-MM-DD/`
- Save each conversation's detritus with context
- Include source (Claude Code/OpenCode), IDs, and timestamps

### 5. Update Original Logs

**Claude Code**: Remove detritus from JSONL files:
- Replace with compact marker: `{"archived": true, "lines": 23, "reason": "failed tool loop"}`

**OpenCode**: Mark parts as archived (don't delete - OpenCode manages its own storage):
- Create archive reference file listing archived message IDs
- Note: OpenCode storage is managed internally, so we archive copies rather than modify

### 6. Report Results

```
Compaction Complete
══════════════════════════════════
Sources processed:
  - Claude Code: 8 conversations
  - OpenCode: 12 sessions
Segments archived: 156
Space saved: ~45KB (Claude Code only - OpenCode archived separately)
Archive: ~/.claude/insights/archive/2026-01-01/

Original Claude Code logs updated with archive markers.
OpenCode archive references created.
```

## Archive Format

Archived content preserves context and source:
```markdown
# Archive: Claude Code - abc123
Date: 2026-01-01
Source: Claude Code
Reason: Failed tool loop

## Original Location: lines 45-67

[user]: Search for the config file
[assistant]: Let me search...
[tool_call]: grep "config" - FAILED
[assistant]: Let me try again...
...

---

# Archive: OpenCode - ses_485d888e
Date: 2026-01-01
Source: OpenCode
Reason: Failed tool loop

## Message IDs: msg_19b370..., msg_19b371...

[user]: Find the auth implementation
[assistant]: Searching...
[tool_call]: grep "auth" - FAILED
...
```

## Tips

- Run after `/analyze` to clean flagged detritus
- Archives are kept indefinitely for reference if needed
- Use `all` monthly to keep both tools' logs manageable
- OpenCode storage is reference-archived (copies), Claude Code is modified in-place
- Review archives occasionally for false positives
