# EDS Block Analyser MCP Server

A Model Context Protocol (MCP) server that provides UI architecture analysis for converting Figma designs or web pages into reusable UI code blocks.

## What it does

This MCP server provides a single tool that returns a comprehensive UI architect prompt for analyzing and estimating the effort required to convert Figma designs or web pages into modular, reusable UI blocks. The prompt guides AI assistants to perform thorough analysis focusing on component structure, effort estimation, and implementation approach.

## Features

- **Component Analysis**: Identifies UI components from Figma designs or web pages
- **Effort Estimation**: Uses T-shirt sizing (S, M, L, XL, XXL) for complexity assessment
- **CSV Output**: Provides structured output in CSV format for easy processing
- **Performance Focus**: Targets Lighthouse score of 100
- **Modular Design**: Emphasizes reusable, independent UI blocks
- **Plain Tech Stack**: Focuses on vanilla JavaScript and CSS without frameworks

## Installation

### Global Installation
```bash
npm install -g eds-block-analyser-mcp-server-test
```

### Local Installation
```bash
npm install eds-block-analyser-mcp-server-test
```

## Usage

### With Claude Desktop

Add this to your Claude Desktop configuration file:

**On macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
**On Windows:** `%APPDATA%/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "eds-block-analyser": {
      "command": "npx",
      "args": ["eds-block-analyser-mcp-server-test"]
    }
  }
}
```

### With MCP Client

```javascript
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

const transport = new StdioClientTransport({
  command: 'npx',
  args: ['eds-block-analyser-mcp-server-test']
});

const client = new Client({
  name: 'my-client',
  version: '1.0.0'
}, {
  capabilities: {}
});

await client.connect(transport);

// Use the tool
const result = await client.callTool({
  name: 'eds_block_analyser'
});

console.log(result.content[0].text);
```

## Available Tools

### `eds_block_analyser`
- **Description:** Get a UI architect prompt for analyzing and estimating UI block conversion
- **Parameters:** None
- **Returns:** A comprehensive prompt for UI block analysis and effort estimation

The prompt includes:
- Role definition as UI Architect
- Task description for Figma/web page conversion
- Context about blocks, tech stack, and performance requirements
- Few-shot examples for guidance
- Strict CSV output format requirements

## Output Format

The tool provides a prompt that generates CSV output with the following columns:
- Page Title
- UI Component Name
- Function description
- Tshirt Sizing (S, M, L, XL, XXL)
- Complexity justification
- Other remarks

## Development

### Clone and Setup
```bash
git clone https://github.com/kalimuthu-a/eds-block-analyser-mcp-server-test.git
cd eds-block-analyser-mcp-server-test
npm install
```

### Run Locally
```bash
npm start
```

### Test with MCP Inspector
```bash
npx @modelcontextprotocol/inspector npx eds-block-analyser-mcp-server-test
```

## Requirements

- Node.js >= 18.0.0
- @modelcontextprotocol/sdk ^0.4.0

## License

MIT

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Support

If you encounter any issues, please file them on the [GitHub repository](https://github.com/kalimuthu-a/eds-block-analyser-mcp-server-test/issues).