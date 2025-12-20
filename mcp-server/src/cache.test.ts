import { test } from 'node:test';
import assert from 'node:assert';
import { SimpleCache } from './cache.js';

test('SimpleCache stores and retrieves values', () => {
    const cache = new SimpleCache<string>(1000);
    cache.set('key1', 'value1');
    assert.strictEqual(cache.get('key1'), 'value1');
});

test('SimpleCache returns undefined for missing keys', () => {
    const cache = new SimpleCache<string>(1000);
    assert.strictEqual(cache.get('missing'), undefined);
});

test('SimpleCache respects TTL', async () => {
    const cache = new SimpleCache<string>(100); // 100ms TTL
    cache.set('key1', 'value1');
    assert.strictEqual(cache.get('key1'), 'value1');

    await new Promise(resolve => setTimeout(resolve, 150));
    assert.strictEqual(cache.get('key1'), undefined);
});

test('SimpleCache clear removes all entries', () => {
    const cache = new SimpleCache<string>(1000);
    cache.set('key1', 'value1');
    cache.set('key2', 'value2');
    cache.clear();
    assert.strictEqual(cache.get('key1'), undefined);
    assert.strictEqual(cache.get('key2'), undefined);
});
