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

Analyze Claude Code conversation logs to extract insights across 6 dimensions: user communication, model understanding, assumptions, efficiency, lessons learned, and language patterns.

## Arguments

- `project` (default): Analyze current project's conversations only
- `all`: Analyze all projects globally
- `{project-name}`: Analyze specific project by name

## Process

1. **Locate Conversations**
   - Project scope: `~/.claude/projects/{current-project-hash}/conversations/`
   - Global scope: `~/.claude/projects/*/conversations/`

2. **Show Live Progress**
   Display progress as you analyze:
   ```
   Analyzing conversations...
   ├── Project: my-app (12 conversations)
   │   ├── [1/12] abc123... 47 messages, 3 insights
   │   ├── [2/12] def456... 23 messages, 1 insight
   │   └── ...
   ```

3. **Use conversation-analyzer Agent**
   Launch the conversation-analyzer agent for deep analysis of each conversation. The agent will:
   - Parse messages and identify segments
   - Score across 6 dimensions
   - Extract structured insights
   - Flag detritus for later compaction

4. **Aggregate Results**
   Combine insights across conversations:
   - Group by dimension
   - Identify recurring patterns
   - Rank by frequency and actionability

5. **Update CLAUDE.md**
   Add lessons learned directly to CLAUDE.md between marker comments:
   ```markdown
   <!-- codesurf-insights: START -->
   ### Learned: YYYY-MM-DD

   - [LESSON] insight here
   - [EFFICIENCY] insight here

   <!-- codesurf-insights: END -->
   ```

6. **Save Report**
   Write detailed report to `~/.claude/insights/reports/YYYY-MM-DD-HHmm.md`

## Output

Show summary at completion:
```
Analysis Complete
═══════════════════════════════════════
Conversations analyzed: 24
Total messages: 1,247
Detritus flagged: 312 (25%)
Insights extracted: 18

Top Insights:
1. [EFFICIENCY] Use Task agent for parallel file searches
2. [LESSON] Always check git status before bulk edits
3. [ASSUMPTION] Verify TypeScript vs JavaScript early

Full report: ~/.claude/insights/reports/2024-01-15-1430.md
CLAUDE.md updated with 5 new lessons
```

## Tips

- Run after completing significant work sessions
- Use `all` periodically to find cross-project patterns
- Review flagged detritus with `/codesurf-insights:compact` to clean logs
