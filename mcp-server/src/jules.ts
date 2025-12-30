/**
 * Jules Ruby MCP Server
 * Exposes jules-ruby CLI capabilities as MCP tools for Gemini CLI
 */

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { execJulesForMcp, execJulesJsonForMcp } from './cli.js';
import * as schemas from './schemas.js';

const server = new McpServer({
    name: 'jules-ruby-server',
    version: '1.0.0',
});

// ============================================================================
// Source Management Tools
// ============================================================================

server.registerTool(
    'jules_list_sources',
    {
        description: 'List all connected GitHub repositories (sources) for Jules',
        inputSchema: schemas.listSourcesSchema,
    },
    async () => execJulesJsonForMcp(['sources', 'list'])
);

server.registerTool(
    'jules_show_source',
    {
        description: 'Show details of a specific source (GitHub repository)',
        inputSchema: schemas.showSourceSchema,
    },
    async ({ name }) => execJulesForMcp(['sources', 'show', name])
);

// ============================================================================
// Session Management Tools
// ============================================================================

server.registerTool(
    'jules_list_sessions',
    {
        description: 'List all Jules sessions',
        inputSchema: schemas.listSessionsSchema,
    },
    async () => execJulesJsonForMcp(['sessions', 'list'])
);

server.registerTool(
    'jules_show_session',
    {
        description: 'Show details of a specific Jules session',
        inputSchema: schemas.showSessionSchema,
    },
    async ({ session_id }) => execJulesForMcp(['sessions', 'show', session_id])
);

server.registerTool(
    'jules_create_session',
    {
        description: 'Create a new Jules coding session to work on a task',
        inputSchema: schemas.createSessionSchema,
    },
    async ({ source, branch, prompt, title, auto_pr }) => {
        const args = ['sessions', 'create', '--source', source, '--branch', branch, '--prompt', prompt];
        if (title) args.push('--title', title);
        if (auto_pr) args.push('--auto-pr');
        return execJulesForMcp(args);
    }
);

server.registerTool(
    'jules_approve_plan',
    {
        description: 'Approve a session plan that is awaiting approval',
        inputSchema: schemas.approvePlanSchema,
    },
    async ({ session_id }) => execJulesForMcp(['sessions', 'approve', session_id])
);

server.registerTool(
    'jules_send_message',
    {
        description: 'Send a message to an active Jules session',
        inputSchema: schemas.sendMessageSchema,
    },
    async ({ session_id, prompt }) =>
        execJulesForMcp(['sessions', 'message', session_id, '--prompt', prompt])
);

server.registerTool(
    'jules_delete_session',
    {
        description: 'Delete a Jules session',
        inputSchema: schemas.deleteSessionSchema,
    },
    async ({ session_id }) => execJulesForMcp(['sessions', 'delete', session_id])
);

// ============================================================================
// Activity Management Tools
// ============================================================================

server.registerTool(
    'jules_list_activities',
    {
        description: 'List activities (progress history) for a Jules session',
        inputSchema: schemas.listActivitiesSchema,
    },
    async ({ session_id }) => execJulesJsonForMcp(['activities', 'list', session_id])
);

server.registerTool(
    'jules_show_activity',
    {
        description: 'Show details of a specific activity',
        inputSchema: schemas.showActivitySchema,
    },
    async ({ activity_name }) => execJulesForMcp(['activities', 'show', activity_name])
);

// ============================================================================
// Start Server
// ============================================================================

const transport = new StdioServerTransport();
await server.connect(transport);
