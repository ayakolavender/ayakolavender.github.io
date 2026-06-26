/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

// YAML files imported via @modyfi/vite-plugin-yaml resolve to parsed data.
declare module '*.yml' {
  const data: unknown;
  export default data;
}
declare module '*.yaml' {
  const data: unknown;
  export default data;
}
