/**
 * Simple in-memory cache with Time-To-Live (TTL)
 */
export class SimpleCache<T> {
    private cache = new Map<string, { value: T; expiresAt: number }>();
    private ttl: number;

    /**
     * @param ttlMs Time to live in milliseconds
     */
    constructor(ttlMs: number) {
        this.ttl = ttlMs;
    }

    /**
     * Get value from cache
     * @param key Cache key
     * @returns The cached value or undefined if not found or expired
     */
    get(key: string): T | undefined {
        const entry = this.cache.get(key);
        if (!entry) return undefined;

        if (Date.now() > entry.expiresAt) {
            this.cache.delete(key);
            return undefined;
        }

        return entry.value;
    }

    /**
     * Set value in cache
     * @param key Cache key
     * @param value Value to store
     */
    set(key: string, value: T): void {
        this.cache.set(key, {
            value,
            expiresAt: Date.now() + this.ttl
        });
    }

    /**
     * Clear the cache
     */
    clear(): void {
        this.cache.clear();
    }
}
