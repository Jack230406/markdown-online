export type MarkdownTemplate = {
  id: "readme" | "blog-post" | "meeting-notes" | "documentation";
  title: string;
  description: string;
  content: string;
};

export const MARKDOWN_TEMPLATES: MarkdownTemplate[] = [
  {
    id: "readme",
    title: "README Template",
    description: "Start a project README with sections for setup, usage, features, and license.",
    content: `# Project Name

A short one-line description of what this project does and who it is for.

## Features

- Fast setup
- Clear documentation
- Ready for contributors

## Installation

\`\`\`bash
npm install
\`\`\`

## Usage

\`\`\`bash
npm run dev
\`\`\`

## Configuration

Describe environment variables, config files, or required setup steps here.

## Roadmap

- [ ] Add more examples
- [ ] Improve documentation
- [ ] Publish first release

## License

MIT
`,
  },
  {
    id: "blog-post",
    title: "Blog Post Template",
    description: "Outline a post with title, intro, takeaways, examples, and conclusion.",
    content: `# Blog Post Title

> A short summary that explains what the reader will learn.

## Introduction

Open with the problem, context, or question this post addresses.

## Key Takeaways

- First takeaway
- Second takeaway
- Third takeaway

## Main Section

Explain the core idea with examples, screenshots, or code.

## Example

\`\`\`ts
export function example() {
  return "hello";
}
\`\`\`

## Conclusion

Wrap up the main insight and point to the next action or resource.
`,
  },
  {
    id: "meeting-notes",
    title: "Meeting Notes Template",
    description: "Capture attendees, agenda, decisions, action items, and next steps.",
    content: `# Meeting Notes

**Date:** YYYY-MM-DD  
**Time:** HH:MM  
**Attendees:** Name, Name, Name

## Agenda

1. Topic one
2. Topic two
3. Topic three

## Discussion Notes

- Point one
- Point two
- Point three

## Decisions

- Decision one
- Decision two

## Action Items

| Task | Owner | Due |
|------|-------|-----|
| Follow up on topic | Name | YYYY-MM-DD |

## Next Meeting

- Date:
- Goal:
`,
  },
  {
    id: "documentation",
    title: "Documentation Template",
    description: "Structure technical docs with overview, prerequisites, steps, and troubleshooting.",
    content: `# Documentation Title

## Overview

Describe what this guide covers and when someone should use it.

## Prerequisites

- Requirement one
- Requirement two
- Requirement three

## Step-by-Step Instructions

### Step 1

Explain what to do first.

### Step 2

Explain the next action with enough detail to follow.

### Step 3

Add examples, screenshots, or commands as needed.

\`\`\`bash
example-command --flag
\`\`\`

## Troubleshooting

- Common issue one
- Common issue two

## FAQ

### Question

Answer here.
`,
  },
];

export const TEMPLATE_MAP = Object.fromEntries(MARKDOWN_TEMPLATES.map((template) => [template.id, template])) as Record<MarkdownTemplate["id"], MarkdownTemplate>;
