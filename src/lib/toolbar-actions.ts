export interface ToolbarAction {
  label: string;
  icon: string;
  prefix: string;
  suffix: string;
  block?: boolean;
}

export const toolbarActions: ToolbarAction[] = [
  { label: "Bold", icon: "B", prefix: "**", suffix: "**" },
  { label: "Italic", icon: "I", prefix: "*", suffix: "*" },
  { label: "Heading", icon: "H", prefix: "## ", suffix: "", block: true },
  { label: "Link", icon: "🔗", prefix: "[", suffix: "](url)" },
  { label: "Image", icon: "🖼", prefix: "![alt](", suffix: ")" },
  { label: "Code", icon: "<>", prefix: "`", suffix: "`" },
  { label: "List", icon: "•", prefix: "- ", suffix: "", block: true },
  { label: "Quote", icon: '"', prefix: "> ", suffix: "", block: true },
  { label: "Strikethrough", icon: "S̶", prefix: "~~", suffix: "~~" },
  { label: "Ordered List", icon: "1.", prefix: "1. ", suffix: "", block: true },
  { label: "Task List", icon: "☑", prefix: "- [ ] ", suffix: "", block: true },
  { label: "Horizontal Rule", icon: "―", prefix: "\n---\n", suffix: "", block: false },
  { label: "Table", icon: "⊞", prefix: "\n| Header | Header |\n|--------|--------|\n| Cell   | Cell   |\n", suffix: "", block: false },
];

export function insertMarkdown(
  textarea: HTMLTextAreaElement,
  action: ToolbarAction
): string {
  const { selectionStart, selectionEnd, value } = textarea;
  const selected = value.substring(selectionStart, selectionEnd);

  let insertion: string;
  let cursorOffset: number;

  if (action.block) {
    const lineStart = value.lastIndexOf("\n", selectionStart - 1) + 1;
    const before = value.substring(0, lineStart);
    const after = value.substring(selectionStart);
    const text = selected || action.label.toLowerCase();
    insertion = before + action.prefix + text + action.suffix + after.substring(selectionEnd - lineStart);
    cursorOffset = lineStart + action.prefix.length + text.length;
    return insertion;
  }

  const text = selected || action.label.toLowerCase();
  const before = value.substring(0, selectionStart);
  const after = value.substring(selectionEnd);
  insertion = before + action.prefix + text + action.suffix + after;
  cursorOffset = selectionStart + action.prefix.length + text.length;

  // We need to set cursor position after React re-renders
  setTimeout(() => {
    textarea.focus();
    textarea.setSelectionRange(cursorOffset, cursorOffset);
  }, 0);

  return insertion;
}
