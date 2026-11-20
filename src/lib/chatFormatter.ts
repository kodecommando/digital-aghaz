export type ChatBlock =
  | { type: 'heading'; level: number; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'bullet-list'; items: string[] }
  | { type: 'numbered-list'; items: Array<{ number: string; text: string }> }
  | { type: 'callout'; text: string }
  | { type: 'code-block'; code: string; language?: string };

export type InlineToken =
  | { type: 'text'; text: string }
  | { type: 'bold'; text: string }
  | { type: 'italic'; text: string }
  | { type: 'code'; text: string };

/**
 * Splits inline text into plain text, bold, italic, and inline code tokens.
 */
export function parseInlineTokens(text: string): InlineToken[] {
  const tokens: InlineToken[] = [];
  const tokenRegex = /(\*\*[^*]+\*\*|\*[^*\n]+\*|`[^`\n]+`)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = tokenRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ type: 'text', text: text.slice(lastIndex, match.index) });
    }
    const raw = match[0];
    if (raw.startsWith('**') && raw.endsWith('**')) {
      tokens.push({ type: 'bold', text: raw.slice(2, -2) });
    } else if (raw.startsWith('*') && raw.endsWith('*')) {
      tokens.push({ type: 'italic', text: raw.slice(1, -1) });
    } else if (raw.startsWith('`') && raw.endsWith('`')) {
      tokens.push({ type: 'code', text: raw.slice(1, -1) });
    }
    lastIndex = match.index + raw.length;
  }

  if (lastIndex < text.length) {
    tokens.push({ type: 'text', text: text.slice(lastIndex) });
  }

  return tokens;
}

/**
 * Parses a raw AI response string into structured semantic blocks (headings,
 * paragraphs, bullet lists, numbered lists, callouts, and code blocks) for
 * spacious, highly legible presentation.
 */
export function parseChatBlocks(rawText: string): ChatBlock[] {
  if (!rawText || !rawText.trim()) return [];

  const lines = rawText.split(/\r?\n/);
  const blocks: ChatBlock[] = [];

  let inCodeBlock = false;
  let codeBlockLang = '';
  let codeLines: string[] = [];

  let currentBulletItems: string[] | null = null;
  let currentNumberedItems: Array<{ number: string; text: string }> | null = null;
  let currentParagraphLines: string[] | null = null;

  const flushListsAndParagraphs = () => {
    if (currentBulletItems && currentBulletItems.length > 0) {
      blocks.push({ type: 'bullet-list', items: [...currentBulletItems] });
      currentBulletItems = null;
    }
    if (currentNumberedItems && currentNumberedItems.length > 0) {
      blocks.push({ type: 'numbered-list', items: [...currentNumberedItems] });
      currentNumberedItems = null;
    }
    if (currentParagraphLines && currentParagraphLines.length > 0) {
      blocks.push({ type: 'paragraph', text: currentParagraphLines.join(' ') });
      currentParagraphLines = null;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    // Check code fence
    const codeFenceMatch = trimmed.match(/^```(\w+)?$/);
    if (codeFenceMatch) {
      if (!inCodeBlock) {
        flushListsAndParagraphs();
        inCodeBlock = true;
        codeBlockLang = codeFenceMatch[1] || '';
        codeLines = [];
      } else {
        inCodeBlock = false;
        blocks.push({
          type: 'code-block',
          code: codeLines.join('\n'),
          language: codeBlockLang || undefined,
        });
        codeBlockLang = '';
        codeLines = [];
      }
      continue;
    }

    if (inCodeBlock) {
      codeLines.push(rawLine);
      continue;
    }

    // Blank line flushes lists and paragraphs
    if (!trimmed) {
      flushListsAndParagraphs();
      continue;
    }

    // Heading (# to ######)
    const headingMatch = trimmed.match(/^(#{1,6})\s+(.*)$/);
    if (headingMatch) {
      flushListsAndParagraphs();
      blocks.push({
        type: 'heading',
        level: headingMatch[1].length,
        text: headingMatch[2].trim(),
      });
      continue;
    }

    // Standalone bold line acting as section title: **Title:**
    const standaloneBoldHeading = trimmed.match(/^\*\*([^*]+)\*\*$/);
    if (standaloneBoldHeading && standaloneBoldHeading[1].endsWith(':')) {
      flushListsAndParagraphs();
      blocks.push({
        type: 'heading',
        level: 4,
        text: standaloneBoldHeading[1].trim(),
      });
      continue;
    }

    // Callout / Blockquote (> Quote)
    const calloutMatch = trimmed.match(/^>\s*(.*)$/);
    if (calloutMatch) {
      flushListsAndParagraphs();
      blocks.push({
        type: 'callout',
        text: calloutMatch[1].trim(),
      });
      continue;
    }

    // Bullet items: * item, - item, • item
    const bulletMatch = trimmed.match(/^(?:\*|-|•)\s+(.*)$/);
    if (bulletMatch) {
      if (currentNumberedItems) {
        blocks.push({ type: 'numbered-list', items: [...currentNumberedItems] });
        currentNumberedItems = null;
      }
      if (currentParagraphLines) {
        blocks.push({ type: 'paragraph', text: currentParagraphLines.join(' ') });
        currentParagraphLines = null;
      }
      if (!currentBulletItems) {
        currentBulletItems = [];
      }
      currentBulletItems.push(bulletMatch[1].trim());
      continue;
    }

    // Numbered items: 1. item, 2. item
    const numberedMatch = trimmed.match(/^(\d+[\.\)])\s+(.*)$/);
    if (numberedMatch) {
      if (currentBulletItems) {
        blocks.push({ type: 'bullet-list', items: [...currentBulletItems] });
        currentBulletItems = null;
      }
      if (currentParagraphLines) {
        blocks.push({ type: 'paragraph', text: currentParagraphLines.join(' ') });
        currentParagraphLines = null;
      }
      if (!currentNumberedItems) {
        currentNumberedItems = [];
      }
      currentNumberedItems.push({
        number: numberedMatch[1],
        text: numberedMatch[2].trim(),
      });
      continue;
    }

    // Regular paragraph line
    if (currentBulletItems) {
      blocks.push({ type: 'bullet-list', items: [...currentBulletItems] });
      currentBulletItems = null;
    }
    if (currentNumberedItems) {
      blocks.push({ type: 'numbered-list', items: [...currentNumberedItems] });
      currentNumberedItems = null;
    }
    if (!currentParagraphLines) {
      currentParagraphLines = [];
    }
    currentParagraphLines.push(trimmed);
  }

  if (inCodeBlock && codeLines.length > 0) {
    blocks.push({
      type: 'code-block',
      code: codeLines.join('\n'),
      language: codeBlockLang || undefined,
    });
  }

  flushListsAndParagraphs();

  return blocks;
}
