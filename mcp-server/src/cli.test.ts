
import { describe, it, expect, vi, afterEach } from 'vitest';
import { execJules } from './cli.js';
import * as child_process from 'child_process';
import { EventEmitter } from 'events';

// Mock child_process
vi.mock('child_process', () => {
    return {
        spawn: vi.fn()
    };
});

describe('execJules', () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    it('should timeout if process takes too long', async () => {
        const mockChild = new EventEmitter() as any;
        mockChild.stdout = new EventEmitter();
        mockChild.stderr = new EventEmitter();
        mockChild.stdout.setEncoding = vi.fn();
        mockChild.stderr.setEncoding = vi.fn();
        mockChild.kill = vi.fn();

        (child_process.spawn as any).mockReturnValue(mockChild);

        const promise = execJules(['arg'], { timeout: 100 });

        // Fast-forward time is tricky with real setTimeout, but vitest has fake timers.
        // However, we can just wait. 100ms is short.

        // We verify that kill was called and promise rejected
        await expect(promise).rejects.toThrow(/timed out/);

        expect(mockChild.kill).toHaveBeenCalled();
    });

    it('should not timeout if process completes quickly', async () => {
        const mockChild = new EventEmitter() as any;
        mockChild.stdout = new EventEmitter();
        mockChild.stderr = new EventEmitter();
        mockChild.stdout.setEncoding = vi.fn();
        mockChild.stderr.setEncoding = vi.fn();
        mockChild.kill = vi.fn();

        (child_process.spawn as any).mockReturnValue(mockChild);

        const promise = execJules(['arg'], { timeout: 500 });

        // Simulate process completion
        setTimeout(() => {
            mockChild.emit('close', 0);
        }, 50);

        const result = await promise;
        expect(result.exitCode).toBe(0);
        expect(mockChild.kill).not.toHaveBeenCalled();
    });
});
