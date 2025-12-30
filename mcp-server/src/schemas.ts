import { z } from 'zod';

export const MAX_PROMPT_LENGTH = 50000;
export const MAX_TITLE_LENGTH = 1000;
export const MAX_ID_LENGTH = 256;

// Reusable field schemas
const sourceSchema = z.string()
    .max(MAX_ID_LENGTH)
    .refine(val => !val.startsWith('-'), { message: "Source name cannot start with '-'" })
    .describe('Source name (e.g., sources/github/owner/repo)');

const branchSchema = z.string()
    .max(MAX_ID_LENGTH)
    .refine(val => !val.startsWith('-'), { message: "Branch name cannot start with '-'" })
    .describe('Starting branch name (e.g., main)');

const promptSchema = z.string()
    .max(MAX_PROMPT_LENGTH)
    .refine(val => !val.startsWith('-'), { message: "Prompt cannot start with '-'" })
    .describe('Task description for Jules to work on');

const titleSchema = z.string()
    .max(MAX_TITLE_LENGTH)
    .refine(val => !val.startsWith('-'), { message: "Title cannot start with '-'" })
    .describe('Optional title for the session');

const sessionIdSchema = z.string()
    .max(MAX_ID_LENGTH)
    .refine(val => !val.startsWith('-'), { message: "Session ID cannot start with '-'" })
    .describe('Session ID (e.g., 12345678 or sessions/12345678)');

const activityNameSchema = z.string()
    .max(MAX_ID_LENGTH)
    .refine(val => !val.startsWith('-'), { message: "Activity name cannot start with '-'" })
    .describe('Activity name (e.g., sessions/123/activities/456)');

// Tool Schemas

export const listSourcesSchema = z.object({}).shape;

export const showSourceSchema = z.object({
    name: sourceSchema
}).shape;

export const listSessionsSchema = z.object({}).shape;

export const showSessionSchema = z.object({
    session_id: sessionIdSchema
}).shape;

export const createSessionSchema = z.object({
    source: sourceSchema,
    branch: branchSchema,
    prompt: promptSchema,
    title: titleSchema.optional(),
    auto_pr: z.boolean().optional().describe('Automatically create a PR when done'),
}).shape;

export const approvePlanSchema = z.object({
    session_id: sessionIdSchema
}).shape;

export const sendMessageSchema = z.object({
    session_id: sessionIdSchema,
    prompt: promptSchema
}).shape;

export const deleteSessionSchema = z.object({
    session_id: sessionIdSchema
}).shape;

export const listActivitiesSchema = z.object({
    session_id: sessionIdSchema
}).shape;

export const showActivitySchema = z.object({
    activity_name: activityNameSchema
}).shape;
