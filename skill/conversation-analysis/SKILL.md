# Conversation Analysis

Use this skill when analyzing Claude Code conversation logs to extract insights, identify patterns, detect detritus, and generate actionable lessons for improvement. This skill is triggered when the user asks about "analyzing conversations", "learning from history", "extracting insights from logs", "improving from past sessions", or "understanding conversation patterns".

---

## Analysis Dimensions

Analyze conversations across these 6 dimensions:

### 1. User Communication Quality
Evaluate how clearly the user communicated their intent:
- Were instructions specific or vague?
- Did ambiguity cause wasted cycles?
- Could better prompting have shortened the conversation?
- Did the user provide sufficient context upfront?

**Insight format**: "User could have specified X upfront to avoid Y clarification cycles"

### 2. Model Understanding
Assess whether Claude correctly understood the request:
- Did Claude grasp the core intent on first read?
- Were there misinterpretations that needed correction?
- Did domain knowledge gaps cause confusion?
- Was context from earlier in conversation lost?

**Insight format**: "Model misunderstood X as Y, causing Z wasted attempts"

### 3. Incorrect Assumptions
Identify assumptions Claude made that proved wrong:
- Technical assumptions about the codebase
- Assumptions about user preferences
- Assumptions about what "done" means
- Implicit assumptions that weren't validated

**Insight format**: "Assumed X without verification, should have asked/checked first"

### 4. Efficiency Opportunities
Find where conversations could have been shorter:
- Unnecessary back-and-forth
- Repeated failed approaches before changing strategy
- Over-explaining or verbose responses
- Doing more than asked (over-engineering)
- Not using available tools effectively

**Insight format**: "Could have achieved same result in N fewer turns by doing X"

### 5. Lessons Learned
Extract reusable knowledge:
- Patterns that worked well
- Debugging approaches that succeeded
- Code patterns discovered
- Tool usage insights
- Project-specific knowledge worth remembering

**Insight format**: "LESSON: When encountering X, do Y because Z"

### 6. Language/Vernacular
Identify domain-specific terminology:
- User's preferred terminology
- Project-specific naming conventions
- Abbreviations and shorthand used
- Technical terms that caused confusion
- Regional/cultural communication patterns

**Insight format**: "User uses 'X' to mean Y - add to vocabulary"

---

## Detritus Detection

Identify and flag these patterns as detritus:

### High-Confidence Detritus (Auto-archive)
- **Failed tool loops**: 3+ consecutive failed attempts at same operation
- **Greeting exchanges**: "Hello", "Hi Claude", "Thanks" without substance
- **Acknowledgment chains**: "Got it", "Understood", "Will do" responses
- **Abandoned threads**: Topics started but never completed
- **Duplicate content**: Same error message repeated 3+ times

### Medium-Confidence Detritus (Review recommended)
- **Exploratory dead-ends**: Research that led nowhere
- **Reverted changes**: Code written then immediately undone
- **Context rebuilding**: Re-explaining things Claude forgot
- **Clarification spirals**: 5+ back-and-forth to understand one thing

### Low-Confidence (Preserve, may have learning value)
- **Novel error resolution**: Even if messy, may teach something
- **User frustration moments**: Indicate pain points to address
- **Significant pivots**: Strategy changes often contain insights

---

## Insight Extraction Process

1. **Parse Conversation**: Load conversation JSON, extract message pairs
2. **Identify Segments**: Break into logical task segments
3. **Score Each Segment**: Rate across 6 dimensions (1-5 scale)
4. **Flag Detritus**: Mark content matching detritus patterns
5. **Extract Insights**: Generate structured insights for valuable segments
6. **Prioritize**: Rank insights by actionability and frequency
7. **Format Output**: Structure for CLAUDE.md or report

---

## CLAUDE.md Update Format

When adding lessons to CLAUDE.md, use this format:

```markdown
## Learned Insights (Auto-generated)

<!-- codesurf-insights: START -->
### Session: YYYY-MM-DD

**Efficiency**: [insight]
**Lesson**: [insight]
**Language**: Added "[term]" = [meaning]

<!-- codesurf-insights: END -->
```

Place between marker comments so future updates can replace/append cleanly.

---

## Conversation Log Structure

Claude Code stores conversations at:
- `~/.claude/projects/{project-hash}/conversations/{conversation-id}.json`

Each conversation contains:
- `messages`: Array of user/assistant message pairs
- `metadata`: Timestamps, model used, tools invoked
- `tool_calls`: Record of tool invocations and results

Parse with:
```javascript
const conversation = JSON.parse(fs.readFileSync(path));
const messages = conversation.messages || [];
```

---

## Quality Thresholds

Set configurable thresholds for analysis:

| Metric | Default | Description |
|--------|---------|-------------|
| min_messages | 10 | Minimum messages to trigger analysis |
| detritus_ratio | 0.3 | Archive if >30% is detritus |
| insight_confidence | 0.7 | Minimum confidence to report insight |
| max_insights_per_session | 5 | Limit insights to most valuable |

---

## Output Formats

### Terminal (Live Progress)
```
Analyzing conversation abc123...
├── Messages: 47
├── Detritus detected: 12 (25%)
├── Insights extracted: 4
│   ├── [EFFICIENCY] Could use Task agent for parallel searches
│   ├── [LESSON] Check imports before suggesting new ones
│   ├── [ASSUMPTION] Verified user wants TypeScript, not JavaScript
│   └── [LANGUAGE] "PR" = Pull Request in this context
└── Done. Report saved to ~/.claude/insights/reports/2024-01-15.md
```

### Report File
Markdown with full details, examples, and recommendations.

### CLAUDE.md Update
Concise, actionable additions between marker comments.
