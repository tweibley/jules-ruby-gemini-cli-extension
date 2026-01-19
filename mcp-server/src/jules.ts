/**
 * Jules Ruby MCP Server
 * Exposes jules-ruby CLI capabilities as MCP tools for Gemini CLI
 */

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { execJulesForMcp, execJulesJsonForMcp } from './cli.js';

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
        inputSchema: z.object({}).shape,
    },
    async () => execJulesJsonForMcp(['sources', 'list'])
);

server.registerTool(
    'jules_show_source',
    {
        description: 'Show details of a specific source (GitHub repository)',
        inputSchema: z.object({
            name: z.string().max(256).refine(val => !val.startsWith('-'), { message: "Source name cannot start with '-'" }).describe('Source name (e.g., sources/github/owner/repo)'),
        }).shape,
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
        inputSchema: z.object({}).shape,
    },
    async () => execJulesJsonForMcp(['sessions', 'list'])
);

server.registerTool(
    'jules_show_session',
    {
        description: 'Show details of a specific Jules session',
        inputSchema: z.object({
            session_id: z.string().max(256).refine(val => !val.startsWith('-'), { message: "Session ID cannot start with '-'" }).describe('Session ID (e.g., 12345678 or sessions/12345678)'),
        }).shape,
    },
    async ({ session_id }) => execJulesForMcp(['sessions', 'show', session_id])
);

server.registerTool(
    'jules_create_session',
    {
        description: 'Create a new Jules coding session to work on a task',
        inputSchema: z.object({
            source: z.string().max(256).refine(val => !val.startsWith('-'), { message: "Source name cannot start with '-'" }).describe('Source name (e.g., sources/github/owner/repo)'),
            branch: z.string().max(256).refine(val => !val.startsWith('-'), { message: "Branch name cannot start with '-'" }).describe('Starting branch name (e.g., main)'),
            prompt: z.string().max(25000).refine(val => !val.startsWith('-'), { message: "Prompt cannot start with '-'" }).describe('Task description for Jules to work on'),
            title: z.string().max(1024).optional().refine(val => !val || !val.startsWith('-'), { message: "Title cannot start with '-'" }).describe('Optional title for the session'),
            auto_pr: z.boolean().optional().describe('Automatically create a PR when done'),
        }).shape,
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
        inputSchema: z.object({
            session_id: z.string().max(256).refine(val => !val.startsWith('-'), { message: "Session ID cannot start with '-'" }).describe('Session ID to approve'),
        }).shape,
    },
    async ({ session_id }) => execJulesForMcp(['sessions', 'approve', session_id])
);

server.registerTool(
    'jules_send_message',
    {
        description: 'Send a message to an active Jules session',
        inputSchema: z.object({
            session_id: z.string().max(256).refine(val => !val.startsWith('-'), { message: "Session ID cannot start with '-'" }).describe('Session ID to send message to'),
            prompt: z.string().max(25000).refine(val => !val.startsWith('-'), { message: "Message prompt cannot start with '-'" }).describe('Message to send to Jules'),
        }).shape,
    },
    async ({ session_id, prompt }) =>
        execJulesForMcp(['sessions', 'message', session_id, '--prompt', prompt])
);

server.registerTool(
    'jules_delete_session',
    {
        description: 'Delete a Jules session',
        inputSchema: z.object({
            session_id: z.string().max(256).refine(val => !val.startsWith('-'), { message: "Session ID cannot start with '-'" }).describe('Session ID to delete'),
        }).shape,
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
        inputSchema: z.object({
            session_id: z.string().max(256).refine(val => !val.startsWith('-'), { message: "Session ID cannot start with '-'" }).describe('Session ID to list activities for'),
        }).shape,
    },
    async ({ session_id }) => execJulesJsonForMcp(['activities', 'list', session_id])
);

server.registerTool(
    'jules_show_activity',
    {
        description: 'Show details of a specific activity',
        inputSchema: z.object({
            activity_name: z.string().max(256).refine(val => !val.startsWith('-'), { message: "Activity name cannot start with '-'" }).describe('Activity name (e.g., sessions/123/activities/456)'),
        }).shape,
    },
    async ({ activity_name }) => execJulesForMcp(['activities', 'show', activity_name])
);

// ============================================================================
// Start Server
// ============================================================================

const transport = new StdioServerTransport();
await server.connect(transport);
