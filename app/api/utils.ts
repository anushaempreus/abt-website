function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

// Escapes every string value in a form payload so user input can be
// safely interpolated into HTML email bodies.
export function sanitizeFormBody(raw: Record<string, unknown>): Record<string, string> {
  const clean: Record<string, string> = {}
  for (const [key, value] of Object.entries(raw)) {
    if (typeof value === 'string') clean[key] = escapeHtml(value)
  }
  return clean
}
