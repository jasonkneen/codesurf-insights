---
description: Generate insights summary report from conversation analysis
argument-hint: "[week|month|all]"
allowed-tools:
  - Read
  - Glob
  - Grep
  - Bash
  - Write
  - TodoWrite
---

# Generate Insights Report

Create a comprehensive report summarizing insights extracted from conversation analysis. Outputs both to terminal and saves to file.

## Arguments

- `week` (default): Report on last 7 days of analysis
- `month`: Report on last 30 days
- `all`: Report on all available analysis data
- `YYYY-MM-DD`: Report from specific date

## Process

1. **Gather Analysis Data**
   Read from:
   - Previous reports: `~/.claude/insights/reports/`
   - CLAUDE.md insight sections
   - Archive metadata: `~/.claude/insights/archive/*/`

2. **Aggregate by Dimension**
   Group insights by the 6 analysis dimensions:
   - User Communication
   - Model Understanding
   - Incorrect Assumptions
   - Efficiency Opportunities
   - Lessons Learned
   - Language/Vernacular

3. **Calculate Statistics**
   Compute metrics:
   - Total conversations analyzed
   - Messages processed
   - Detritus ratio over time
   - Most common insight types
   - Improvement trends

4. **Identify Patterns**
   Find recurring themes:
   - Frequently repeated lessons
   - Common efficiency gaps
   - Persistent assumption errors
   - Language additions

5. **Output to Terminal**
   Display formatted summary:
   ```
   CodeSurf Insights Report
   ════════════════════════════════════════════
   Period: 2024-01-08 to 2024-01-15

   STATISTICS
   ──────────────────────────────────
   Conversations: 47
   Messages: 2,891
   Detritus archived: 634 (22%)
   Insights extracted: 89

   TOP LESSONS LEARNED
   ──────────────────────────────────
   1. Always verify file exists before editing (seen 7x)
   2. Use Task agent for multi-file searches (seen 5x)
   3. Check imports before adding new ones (seen 4x)

   EFFICIENCY OPPORTUNITIES
   ──────────────────────────────────
   1. Could save ~3 turns by reading full file first
   2. Parallel tool calls underutilized
   3. Over-explaining in responses

   COMMON ASSUMPTIONS (Incorrect)
   ──────────────────────────────────
   1. Assuming TypeScript when user has JavaScript
   2. Assuming npm when user prefers pnpm
   3. Assuming main branch instead of checking

   LANGUAGE ADDITIONS
   ──────────────────────────────────
   - "PR" → Pull Request
   - "WIP" → Work In Progress
   - "LGTM" → Looks Good To Me

   TREND
   ──────────────────────────────────
   ↑ Efficiency improved 12% from last period
   ↓ More assumptions this week (investigate)
   → Detritus ratio stable at ~22%
   ```

6. **Save Report File**
   Write detailed version to:
   `~/.claude/insights/reports/YYYY-MM-DD-HHmm.md`

   Include:
   - Full statistics
   - All insights with examples
   - Conversation references
   - Recommendations

## Report File Format

```markdown
# CodeSurf Insights Report
Generated: 2024-01-15 14:30
Period: 2024-01-08 to 2024-01-15

## Summary
- Conversations: 47
- Messages: 2,891
- Insights: 89

## Lessons Learned

### 1. Verify file exists before editing
**Frequency**: 7 occurrences
**Example**: In conversation abc123, attempted to edit...
**Recommendation**: Add file existence check to editing workflow

### 2. Use Task agent for parallel searches
...
```

## Tips

- Run weekly to track improvement trends
- Use `all` quarterly for comprehensive review
- Share reports with team for collective learning
- Compare month-over-month to measure progress
