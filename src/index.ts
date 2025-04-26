#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "My MCP server",
  version: "1.0.0"
});

server.tool("add_two_numbers",
    "Add two numbers",
  { a: z.number(), b: z.number() },
  ({ a, b }) => {
    const answer = a + b;
    return {
      content: [{
        type: "text",
        text: answer.toString()
      }]
    }
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);