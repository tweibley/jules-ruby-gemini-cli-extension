/**
 * A simple in-memory cache with TTL support.
 */
interface CacheEntry<T> {
    value: T;
    expiry: number;
}

export class SimpleCache<T> {
    private cache = new Map<string, CacheEntry<T>>();

    /**
     * Set a value in the cache with a Time-To-Live (TTL)
     * @param key - The key to store the value under
     * @param value - The value to store
     * @param ttlSeconds - Time in seconds until the entry expires
     */
    set(key: string, value: T, ttlSeconds: number): void {
        const expiry = Date.now() + ttlSeconds * 1000;
        this.cache.set(key, { value, expiry });
    }

    /**
     * Get a value from the cache
     * @param key - The key to retrieve
     * @returns The cached value or undefined if not found or expired
     */
    get(key: string): T | undefined {
        const entry = this.cache.get(key);
        if (!entry) {
            return undefined;
        }

        if (Date.now() > entry.expiry) {
            this.cache.delete(key);
            return undefined;
        }

        return entry.value;
    }

    /**
     * Clear all entries from the cache
     */
    clear(): void {
        this.cache.clear();
    }
}
