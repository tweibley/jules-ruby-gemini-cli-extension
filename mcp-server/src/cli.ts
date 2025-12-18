/**
 * CLI helper for executing jules-ruby commands
 */

import { spawn } from 'child_process';

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
        const allowedKeys = ['JULES_API_KEY', 'PATH', 'HOME', 'SSH_AUTH_SOCK', 'LANG', 'LC_ALL'];
        const env: NodeJS.ProcessEnv = {};

        for (const key of allowedKeys) {
            const value = process.env[key];
            if (value !== undefined) {
                env[key] = value;
            }
        }

        const child = spawn('jules-ruby', finalArgs, {
            cwd,
            env
        });

        let stdout = '';
        let stderr = '';

        child.stdout.on('data', (data) => {
            stdout += data.toString();
        });

        child.stderr.on('data', (data) => {
            stderr += data.toString();
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
 * Execute jules-ruby command and return formatted result for MCP (text output)
 */
export async function execJulesForMcp(
    args: string[],
    options: { cwd?: string } = {}
): Promise<{ content: Array<{ type: 'text'; text: string }> }> {
    try {
        const result = await execJules(args, options);

        if (result.exitCode !== 0) {
            return {
                content: [{
                    type: 'text',
                    text: `Error (exit code ${result.exitCode}):\n${result.stderr || result.stdout}`
                }]
            };
        }

        return {
            content: [{
                type: 'text',
                text: result.stdout || 'Command completed successfully'
            }]
        };
    } catch (error) {
        return {
            content: [{
                type: 'text',
                text: `Failed to execute jules-ruby command: ${error}`
            }]
        };
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
                return {
                    content: [{
                        type: 'text',
                        text: `Error (exit code ${result.exitCode}):\n${result.stderr || result.stdout}`
                    }]
                };
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
        return {
            content: [{
                type: 'text',
                text: `Failed to execute jules-ruby command: ${error}`
            }]
        };
    }
}
