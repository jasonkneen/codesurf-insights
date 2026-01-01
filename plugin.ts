/**
 * OpenCode Plugin Entry Point for codesurf-insights
 * 
 * This file provides OpenCode compatibility for the codesurf-insights plugin.
 * Claude Code uses hooks/hooks.json instead.
 * 
 * Cross-compatibility:
 * - Claude Code: reads agents/, commands/, skills/, hooks/hooks.json
 * - OpenCode: reads agent/, command/, skill/, plugin.ts
 */
import type { Plugin, Hooks } from "@opencode-ai/plugin";

const plugin: Plugin = async ({ client, project, directory }) => {
  const hooks: Hooks = {
    /**
     * Session end event - equivalent to Claude's "stop" hook
     * Triggers conversation analysis when session ends
     */
    event: async ({ event }) => {
      // Only trigger on session end events
      if (event.type !== "session.complete" && event.type !== "session.end") {
        return;
      }

      // The actual analysis is handled by the conversation-analyzer agent
      // This hook just logs that analysis could be triggered
      // In OpenCode, the /analyze command is the primary entry point
      console.log("[codesurf-insights] Session ended. Run /analyze to extract insights.");
    },

    /**
     * Optional: Transform system prompt to include insights
     * Injects learned lessons from previous analysis into context
     */
    "experimental.chat.system.transform": async ({}, output) => {
      // Could inject insights from ~/.claude/insights/ here
      // For now, this is a placeholder for future enhancement
    },
  };

  return hooks;
};

export default plugin;
