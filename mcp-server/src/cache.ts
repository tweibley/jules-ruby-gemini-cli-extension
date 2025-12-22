/**
 * Simple in-memory cache with TTL support
 */
export class SimpleCache<T> {
    private cache: Map<string, { value: T; expiresAt: number }>;
    private ttl: number;

    /**
     * @param ttl - Time to live in milliseconds
     */
    constructor(ttl: number) {
        this.cache = new Map();
        this.ttl = ttl;
    }

    set(key: string, value: T): void {
        this.cache.set(key, {
            value,
            expiresAt: Date.now() + this.ttl
        });
    }

    get(key: string): T | undefined {
        const item = this.cache.get(key);
        if (!item) return undefined;

        if (Date.now() > item.expiresAt) {
            this.cache.delete(key);
            return undefined;
        }

        return item.value;
    }

    /**
     * Get value from cache or compute it if missing/expired
     */
    async getOrSet(key: string, compute: () => Promise<T>): Promise<T> {
        const cached = this.get(key);
        if (cached !== undefined) {
            return cached;
        }

        const value = await compute();
        this.set(key, value);
        return value;
    }
}
