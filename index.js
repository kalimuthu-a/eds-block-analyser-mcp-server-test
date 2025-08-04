#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { 
  CallToolRequestSchema, 
  ListToolsRequestSchema, 
  CallToolResultSchema, 
  ListToolsResultSchema 
} from '@modelcontextprotocol/sdk/types.js';

// Create the server
const server = new Server(
  {
    name: 'ui-architect-review',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Define the UI architect review prompt
const UI_ARCHITECT_PROMPT = `As a UI architect, do the code review.

Focus on:
- Component structure and organization
- UI/UX best practices
- Responsive design considerations
- Accessibility compliance
- Performance implications
- Code maintainability
- Design system consistency
- Cross-browser compatibility

Please provide specific feedback and actionable recommendations.`;

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'ui_architect_review',
        description: 'Get a UI architect code review prompt',
        inputSchema: {
          type: 'object',
          properties: {},
          required: [],
        },
      },
    ],
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name } = request.params;

  if (name === 'ui_architect_review') {
    return {
      content: [
        {
          type: 'text',
          text: UI_ARCHITECT_PROMPT,
        },
      ],
    };
  }

  throw new Error(`Unknown tool: ${name}`);
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('UI Architect Review MCP server running on stdio');
}

main().catch((error) => {
  console.error('Server error:', error);
  process.exit(1);
});