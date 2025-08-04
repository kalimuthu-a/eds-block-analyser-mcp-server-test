# MCP UI Architect Review

A simple Model Context Protocol (MCP) server that provides UI architect code review prompts for AI assistants.

## What it does

This MCP server provides a single tool that returns a comprehensive UI architect code review prompt. When called, it provides a structured prompt that guides AI assistants to perform thorough UI/UX code reviews focusing on best practices.

## Installation

### Global Installation
```bash
npm install -g mcp-ui-architect-review
```

### Local Installation
```bash
npm install mcp-ui-architect-review
```

## Usage

### With Claude Desktop

Add this to your Claude Desktop configuration file:

**On macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
**On Windows:** `%APPDATA%/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "ui-architect-review": {
      "command": "npx",
      "args": ["mcp-ui-architect-review"]
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
  args: ['mcp-ui-architect-review']
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
  name: 'ui_architect_review'
});

console.log(result.content[0].text);
```

## Available Tools

### `ui_architect_review`
- **Description:** Get a UI architect code review prompt
- **Parameters:** None
- **Returns:** A comprehensive prompt for UI architecture code review

## Development

### Clone and Setup
```bash
git clone https://github.com/yourusername/mcp-ui-architect-review.git
cd mcp-ui-architect-review
npm install
```

### Run Locally
```bash
npm start
```

### Test with MCP Inspector
```bash
npx @modelcontextprotocol/inspector npx mcp-ui-architect-review
```

## License

MIT

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Support

If you encounter any issues, please file them on the [GitHub repository](https://github.com/yourusername/mcp-ui-architect-review/issues).