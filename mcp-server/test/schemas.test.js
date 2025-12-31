import { test } from 'node:test';
import assert from 'node:assert';
import {
    JulesIdSchema,
    JulesSourceSchema,
    JulesPromptSchema,
    JulesTitleSchema,
    MAX_PROMPT_LENGTH,
    MAX_TITLE_LENGTH,
    MAX_ID_LENGTH
} from '../dist/schemas.js';

test('JulesIdSchema validation', async (t) => {
    await t.test('accepts valid IDs', () => {
        assert.ok(JulesIdSchema.parse('123456'));
        assert.ok(JulesIdSchema.parse('sessions/123456'));
    });

    await t.test('rejects inputs starting with -', () => {
        assert.throws(() => JulesIdSchema.parse('-flag'), /Input cannot start with '-'/);
    });

    await t.test('rejects overly long IDs', () => {
        const longId = 'a'.repeat(MAX_ID_LENGTH + 1);
        assert.throws(() => JulesIdSchema.parse(longId));
    });
});

test('JulesSourceSchema validation', async (t) => {
    await t.test('accepts valid sources', () => {
        assert.ok(JulesSourceSchema.parse('sources/github/owner/repo'));
    });

    await t.test('rejects inputs starting with -', () => {
        assert.throws(() => JulesSourceSchema.parse('-flag'), /Input cannot start with '-'/);
    });
});

test('JulesPromptSchema validation', async (t) => {
    await t.test('accepts valid prompts', () => {
        assert.ok(JulesPromptSchema.parse('This is a prompt'));
    });

    await t.test('rejects inputs starting with -', () => {
        assert.throws(() => JulesPromptSchema.parse('-flag'), /Input cannot start with '-'/);
    });

    await t.test('rejects overly long prompts', () => {
        const longPrompt = 'a'.repeat(MAX_PROMPT_LENGTH + 1);
        assert.throws(() => JulesPromptSchema.parse(longPrompt));
    });
});

test('JulesTitleSchema validation', async (t) => {
    await t.test('accepts valid titles', () => {
        assert.ok(JulesTitleSchema.parse('My Session Title'));
    });

    await t.test('rejects inputs starting with -', () => {
        assert.throws(() => JulesTitleSchema.parse('-flag'), /Input cannot start with '-'/);
    });

    await t.test('rejects overly long titles', () => {
        const longTitle = 'a'.repeat(MAX_TITLE_LENGTH + 1);
        assert.throws(() => JulesTitleSchema.parse(longTitle));
    });
});
