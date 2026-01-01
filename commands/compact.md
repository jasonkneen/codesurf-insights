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

Remove detritus from conversation logs while archiving removed content for reference. This keeps logs clean and focused on valuable interactions.

## Arguments

- `project` (default): Compact current project's conversations only
- `all`: Compact all projects globally
- `{project-name}`: Compact specific project by name

## Process

1. **Locate Conversations**
   Find conversation files to process:
   - Project: `~/.claude/projects/{hash}/conversations/`
   - Global: `~/.claude/projects/*/conversations/`

2. **Use detritus-detector Agent**
   Launch the detritus-detector agent to identify noise:
   - Failed tool loops (3+ retries)
   - Greeting/acknowledgment exchanges
   - Abandoned threads
   - Duplicate error messages
   - Clarification spirals

3. **Show What Will Be Archived**
   Present summary before archiving:
   ```
   Detritus Found
   ══════════════════════════════════
   Conversation abc123:
   ├── [lines 45-67] Failed grep loop (5 attempts)
   ├── [lines 120-125] Greeting exchange
   └── [lines 200-245] Abandoned refactoring thread

   Conversation def456:
   ├── [lines 12-18] "Let me try again" x4
   └── [lines 89-102] Duplicate error output

   Total: 156 lines across 8 conversations
   Archive location: ~/.claude/insights/archive/2024-01-15/
   ```

4. **Archive Detritus**
   Move flagged content to archive:
   - Create `~/.claude/insights/archive/YYYY-MM-DD/`
   - Save each conversation's detritus with context
   - Include line numbers and timestamps for reference

5. **Update Original Logs**
   Remove detritus from original conversation files:
   - Replace with compact marker: `[ARCHIVED: 23 lines - failed tool loop]`
   - Preserve message structure and flow
   - Keep enough context for remaining content to make sense

6. **Report Results**
   Show completion summary:
   ```
   Compaction Complete
   ══════════════════════════════════
   Conversations processed: 8
   Lines archived: 156
   Space saved: 45KB
   Archive: ~/.claude/insights/archive/2024-01-15/

   Original logs updated with archive markers.
   ```

## Archive Format

Archived content preserves context:
```markdown
# Archive: abc123
Date: 2024-01-15
Reason: Failed tool loop

## Original Location: lines 45-67

[user]: Search for the config file
[assistant]: Let me search...
[tool_call]: grep "config" - FAILED
[assistant]: Let me try again...
[tool_call]: grep "config" - FAILED
...
```

## Tips

- Run after `/codesurf-insights:analyze` to clean flagged detritus
- Archives are kept indefinitely for reference if needed
- Use `all` monthly to keep global logs manageable
- Review archives occasionally for false positives
