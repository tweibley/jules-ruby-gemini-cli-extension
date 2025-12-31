import { z } from 'zod';

// ============================================================================
// Constants
// ============================================================================

export const MAX_PROMPT_LENGTH = 50000;
export const MAX_TITLE_LENGTH = 1000;
export const MAX_ID_LENGTH = 256;

// ============================================================================
// Schemas
// ============================================================================

const noFlags = (val: string) => !val.startsWith('-');
const noFlagsMessage = { message: "Input cannot start with '-'" };

/**
 * Validates a generic ID (session ID, activity ID, etc.)
 */
export const JulesIdSchema = z.string()
    .max(MAX_ID_LENGTH)
    .refine(noFlags, noFlagsMessage);

/**
 * Validates a source name (GitHub repository path)
 */
export const JulesSourceSchema = z.string()
    .max(MAX_ID_LENGTH) // Sources shouldn't be excessively long
    .refine(noFlags, noFlagsMessage);

/**
 * Validates a branch name
 */
export const JulesBranchSchema = z.string()
    .max(256) // Git branch names are typically short
    .refine(noFlags, noFlagsMessage);

/**
 * Validates a user prompt/message
 */
export const JulesPromptSchema = z.string()
    .max(MAX_PROMPT_LENGTH)
    .refine(noFlags, noFlagsMessage);

/**
 * Validates a session title
 */
export const JulesTitleSchema = z.string()
    .max(MAX_TITLE_LENGTH)
    .refine(noFlags, noFlagsMessage);
