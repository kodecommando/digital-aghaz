import test from 'node:test';
import assert from 'node:assert/strict';
import { parseChatBlocks, parseInlineTokens } from './chatFormatter';

test('parseInlineTokens handles plain text, bold, italic, and inline code cleanly', () => {
  const input = 'We build **fast apps** with *clean UI* and `React 19`.';
  const tokens = parseInlineTokens(input);

  assert.equal(tokens.length, 7);
  assert.deepEqual(tokens[0], { type: 'text', text: 'We build ' });
  assert.deepEqual(tokens[1], { type: 'bold', text: 'fast apps' });
  assert.deepEqual(tokens[2], { type: 'text', text: ' with ' });
  assert.deepEqual(tokens[3], { type: 'italic', text: 'clean UI' });
  assert.deepEqual(tokens[4], { type: 'text', text: ' and ' });
  assert.deepEqual(tokens[5], { type: 'code', text: 'React 19' });
  assert.deepEqual(tokens[6], { type: 'text', text: '.' });
});

test('parseChatBlocks handles headings, paragraphs, bullet lists, numbered lists and code', () => {
  const sampleMarkdown = `
### Full-Stack Digital Services
At Digital Aghaz, we craft performance-focused websites and apps.

Key advantages:
* Modern React & TypeScript architecture
* Fast page speeds on mobile, tablet & desktop
* Built-in SEO and security best practices

Our 3-Step Process:
1. Discovery & Strategy
2. UX Design & Prototyping
3. Code, QA & Launch

> Every project receives dedicated post-launch support.

\`\`\`bash
npm run dev
\`\`\`
`.trim();

  const blocks = parseChatBlocks(sampleMarkdown);

  assert.ok(blocks.length >= 7);
  assert.equal(blocks[0].type, 'heading');
  if (blocks[0].type === 'heading') {
    assert.equal(blocks[0].level, 3);
    assert.equal(blocks[0].text, 'Full-Stack Digital Services');
  }

  assert.equal(blocks[1].type, 'paragraph');
  assert.equal(blocks[2].type, 'paragraph');
  assert.equal(blocks[3].type, 'bullet-list');
  if (blocks[3].type === 'bullet-list') {
    assert.equal(blocks[3].items.length, 3);
    assert.equal(blocks[3].items[0], 'Modern React & TypeScript architecture');
  }

  assert.equal(blocks[4].type, 'paragraph');
  assert.equal(blocks[5].type, 'numbered-list');
  if (blocks[5].type === 'numbered-list') {
    assert.equal(blocks[5].items.length, 3);
    assert.equal(blocks[5].items[0].number, '1.');
    assert.equal(blocks[5].items[0].text, 'Discovery & Strategy');
  }

  assert.equal(blocks[6].type, 'callout');
  if (blocks[6].type === 'callout') {
    assert.equal(blocks[6].text, 'Every project receives dedicated post-launch support.');
  }

  assert.equal(blocks[7].type, 'code-block');
  if (blocks[7].type === 'code-block') {
    assert.equal(blocks[7].code, 'npm run dev');
    assert.equal(blocks[7].language, 'bash');
  }
});

test('parseChatBlocks returns empty array for empty or whitespace-only input', () => {
  assert.deepEqual(parseChatBlocks(''), []);
  assert.deepEqual(parseChatBlocks('   \n  \n\t '), []);
});
