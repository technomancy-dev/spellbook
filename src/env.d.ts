/// <reference path="../.astro/types.d.ts" />
declare namespace React {
  interface HTMLAttributes<T> {
    // Preact supports using "class" instead of "classname" - need to teach typescript
    class?: string;
  }
  interface SVGAttributes<T> {
    // Preact supports using "class" instead of "classname" - need to teach typescript
    class?: string;
  }
}
