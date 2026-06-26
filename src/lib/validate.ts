import type { z } from 'astro:content';

/**
 * Parse `data` against `schema`, and on failure throw an error that names the
 * exact file and field that's wrong, so a non-developer editing YAML sees a
 * readable message in the dev overlay / build log instead of a white screen.
 */
export function friendlyParse<S extends z.ZodTypeAny>(
  schema: S,
  data: unknown,
  fileLabel: string
): z.infer<S> {
  const result = schema.safeParse(data);
  if (result.success) return result.data;

  const lines = result.error.issues.map((issue) => {
    const path = issue.path.length ? issue.path.join(' → ') : '(top level)';
    return `   • ${path}: ${issue.message}`;
  });

  throw new Error(
    [
      ``,
      `──────────────────────────────────────────────────────────`,
      ` There is a problem in your content file:  content/${fileLabel}`,
      `──────────────────────────────────────────────────────────`,
      ...lines,
      ``,
      ` Open content/${fileLabel}, fix the field(s) above, and save.`,
      ` Tip: indentation matters in YAML, use spaces, never tabs.`,
      `──────────────────────────────────────────────────────────`,
      ``,
    ].join('\n')
  );
}
