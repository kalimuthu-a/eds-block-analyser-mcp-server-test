#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { 
  CallToolRequestSchema, 
  ListToolsRequestSchema, 
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
const EDS_BLOCK_ANALYSER_PROMPT = `### Role

You are a UI Architect responsible for front-end architecture, modular design systems, and performance-optimized implementations.


### Task

Estimate the effort and outline the approach for **converting a Figma design or web page** into **reusable UI code blocks** based on defined constraints.


### Context

* A **block** is a **reusable, independent UI unit** with its own folder under 'blocks/' (e.g., 'blocks/hero-banner/', 'blocks/footer/')

  * Contains its own '.js' and '.css' files
  * Must **not depend on global styles/scripts**, except shared utilities or variables
  * Must be **accessible, responsive**, and **performance-optimized**
* The tech stack is strictly:

  * **Plain JavaScript**
  * **Plain CSS**
  * **No frameworks** (React, Vue, etc.)
  * **No third-party libraries** (unless absolutely necessary)
* Target performance: **Lighthouse score = 100**
* Each major section/component in Figma or the web page = **one block**
* Effort should be estimated using **T-shirt sizing**: S, M, L, XL, XXL
* **CSV output required**, with strict formatting constraints (see below)


### Few-Shot Examples

(For illustration only; actual examples are not to be included in final output)

| Page Title | UI Component Name | Function description                                      | Tshirt Sizing | Complexity justification                                           | Other remarks                                        |
| ---------- | ----------------- | --------------------------------------------------------- | ------------- | ------------------------------------------------------------------ | ---------------------------------------------------- |
| "Home"     | "Hero Banner"     | "Top visual section with heading, subheading, CTA button" | "M"           | "Requires responsive image handling and text positioning"          | "Figma shows a background video but fallback needed" |
| "Product"  | "Feature Grid"    | "Displays 3x3 feature cards with icons and descriptions"  | "L"           | "Requires grid layout, hover animations, and accessibility labels" | "Reusable for other pages"                           |

---

### Response Format

Please return the response **in CSV format** (as text output), with the following constraints:

* Include these headers:

  '''
  "Page Title","UI Component Name","Function description","Tshirt Sizing","Complexity justification","Other remarks"
  '''
* **Quotes are required** around every column value.
* **Each row must represent one UI block/component**.
* **DO NOT miss any component**, including:

  * '"Header"'
  * '"Footer"'
  * '"Cookie Acceptance Banner"' (if present)
* If a UI component name contains commas, enclose it in **double quotes**.
* Avoid combining multiple items into one row.

 `;

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'eds_block_analyser',
        description: 'Get a UI architect prompt for analyzing and estimating UI block conversion from Figma designs or web pages',
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

  if (name === 'eds_block_analyser') {
    return {
      content: [
        {
          type: 'text',
          text: EDS_BLOCK_ANALYSER_PROMPT,
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
  console.error('EDS Block Analyser MCP server running on stdio');
}

main().catch((error) => {
  console.error('Server error:', error);
  process.exit(1);
});