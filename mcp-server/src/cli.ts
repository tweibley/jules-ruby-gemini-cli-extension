/**
 * CLI helper for executing jules-ruby commands
 */

import { spawn } from 'child_process';

// Defined at module scope to prevent memory reallocation on every function call
const ALLOWED_ENV_KEYS = ['JULES_API_KEY', 'PATH', 'HOME', 'SSH_AUTH_SOCK', 'LANG', 'LC_ALL'];

export interface CliResult {
    stdout: string;
    stderr: string;
    exitCode: number;
}

/**
 * Execute a jules-ruby CLI command
 * @param args - Arguments to pass to the jules-ruby command
 * @param options - Optional configuration
 */
export async function execJules(
    args: string[],
    options: { cwd?: string; useJson?: boolean } = {}
): Promise<CliResult> {
    const { cwd, useJson = false } = options;

    // Build args with optional json format
    let finalArgs = [...args];
    if (useJson) finalArgs.push('--format=json');

    return new Promise((resolve, reject) => {
        // Only pass necessary environment variables to the child process
        // to avoid leaking sensitive secrets that jules-ruby doesn't need.
        // Also ensure we don't pass undefined values which would cause spawn to crash.
        const env: NodeJS.ProcessEnv = {};

        for (const key of ALLOWED_ENV_KEYS) {
            const value = process.env[key];
            if (value !== undefined) {
                env[key] = value;
            }
        }

        const child = spawn('jules-ruby', finalArgs, {
            cwd,
            env,
            // Optimization: Ignore stdin as we don't write to it. This saves a file descriptor and pipe creation overhead.
            stdio: ['ignore', 'pipe', 'pipe']
        });

        let stdout = '';
        let stderr = '';

        // Optimization: Set encoding to 'utf8' to handle multi-byte characters correctly
        // and improve performance by avoiding manual string conversion of buffers.
        child.stdout.setEncoding('utf8');
        child.stderr.setEncoding('utf8');

        child.stdout.on('data', (data) => {
            stdout += data;
        });

        child.stderr.on('data', (data) => {
            stderr += data;
        });

        child.on('close', (code) => {
            resolve({
                stdout: stdout.trim(),
                stderr: stderr.trim(),
                exitCode: code ?? 0
            });
        });

        child.on('error', (err) => {
            reject(err);
        });
    });
}

/**
 * Helper to format error messages for MCP
 */
function formatErrorResponse(error: any): { content: Array<{ type: 'text'; text: string }> } {
    if (error.code === 'ENOENT') {
        return {
            content: [{
                type: 'text',
                text: "Configuration Error: The 'jules-ruby' CLI was not found. Please ensure it is installed and available in your PATH."
            }]
        };
    }

    return {
        content: [{
            type: 'text',
            text: `Failed to execute jules-ruby command: ${error.message || error}`
        }]
    };
}

/**
 * Helper to format non-zero exit code responses
 */
function formatExitCodeResponse(result: CliResult): { content: Array<{ type: 'text'; text: string }> } {
    return {
        content: [{
            type: 'text',
            text: `The command failed with exit code ${result.exitCode}.\n\nError details:\n${result.stderr || result.stdout}`
        }]
    };
}

/**
 * Execute jules-ruby command and return formatted result for MCP (text output)
 */
export async function execJulesForMcp(
    args: string[],
    options: { cwd?: string } = {}
): Promise<{ content: Array<{ type: 'text'; text: string }> }> {
    try {
        const result = await execJules(args, options);

        if (result.exitCode !== 0) {
            return formatExitCodeResponse(result);
        }

        return {
            content: [{
                type: 'text',
                text: result.stdout || 'Command completed successfully'
            }]
        };
    } catch (error) {
        return formatErrorResponse(error);
    }
}

/**
 * Execute jules-ruby command with --format=json flag and return parsed JSON for MCP
 * Falls back to text output if JSON parsing fails
 */
export async function execJulesJsonForMcp(
    args: string[],
    options: { cwd?: string } = {}
): Promise<{ content: Array<{ type: 'text'; text: string }> }> {
    try {
        const result = await execJules(args, { ...options, useJson: true });

        if (result.exitCode !== 0) {
            // Try to parse error as JSON first
            try {
                const errorJson = JSON.parse(result.stdout || result.stderr);
                return {
                    content: [{
                        type: 'text',
                        text: JSON.stringify(errorJson, null, 2)
                    }]
                };
            } catch {
                return formatExitCodeResponse(result);
            }
        }

        // Parse and re-format JSON for clean output
        try {
            const json = JSON.parse(result.stdout);
            return {
                content: [{
                    type: 'text',
                    text: JSON.stringify(json, null, 2)
                }]
            };
        } catch {
            // Fall back to raw text if JSON parsing fails
            return {
                content: [{
                    type: 'text',
                    text: result.stdout || 'Command completed successfully'
                }]
            };
        }
    } catch (error) {
        return formatErrorResponse(error);
    }
}
