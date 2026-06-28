# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `yarn dev` — start the Vite dev server (opens browser automatically, see `vite.config.ts`)
- `yarn build` — type-check (`tsc -b`) then build for production
- `yarn preview` — preview the production build locally
- `yarn lint` / `yarn lint:fix` — run ESLint (flat config in `eslint.config.js`)
- `yarn format` / `yarn format:check` — Prettier write/check
- `yarn storybook` — run Storybook locally on port 6006 (component documentation)
- `yarn build-storybook` — build the static Storybook site into `storybook-static/` (gitignored)
- `yarn test` — run the Vitest suite once (`vitest run`)
- `yarn test:watch` — run Vitest in watch mode
- To run a single test file: `npx vitest run src/components/atoms/Text/Text.test.tsx` (or drop `run` for watch mode on just that file)

**Do not re-add `@storybook/addon-vitest`, `playwright`, or `@chromatic-com/storybook`** — `storybook init` adds them by default, but they were deliberately removed (see Storybook section below). Unit testing in this project is a plain standalone Vitest setup, intentionally not wired into Storybook.

To type-check without building: `npx tsc -b --noEmit` (project uses TS project references — `tsconfig.app.json` for `src/`, `tsconfig.node.json` for Vite config).

## Architecture

This is a React 19 + TypeScript + Vite app. `src/App.tsx` was reset to a minimal placeholder component to build the real app from scratch on top of a custom design-token layer in `src/foundation/`. Styling is done with `styled-components` (no plain CSS files) — the global reset that used to live in `index.css` is now `src/styles/GlobalStyle.ts`, a `createGlobalStyle`, rendered once in `main.tsx` alongside `<App />`.

### `src/foundation/` is the single source of design tokens

`src/foundation/` defines a code-based token system (colors, spacing, typography, motion, radius, shadows, opacity, zIndex, breakpoints), exported through `src/foundation/index.ts`. It is the only design-token system in the project — new UI should consume values from `src/foundation` inside `styled-components` definitions (e.g. `colors.primary[500]`, `spacing[4]`) rather than hardcoding colors/spacing/etc. Note it currently has no dark-mode variants.

### Components follow Atomic Design

UI components live under `src/components/<layer>/<ComponentName>/`, where `<layer>` is one of `atoms`, `molecules`, `organisms`, `templates`, `pages`. Each component gets its own PascalCase folder containing:

- `ComponentName.tsx` — the component (default export) plus its `export type ComponentNameProps`.
- `ComponentName.styles.ts` — the `styled-components` definitions, imported into `ComponentName.tsx`. Keep styling declarations out of the component file itself.
- `index.ts` — barrel re-exporting the default and the props type, e.g. `export { default } from "./ComponentName"` / `export type { ComponentNameProps } from "./ComponentName"`.

Each layer folder (`atoms/`, `molecules/`, ...) also has its own `index.ts` barrel re-exporting every component in that layer by name, e.g. `export { default as Text } from "./Text"` / `export type { TextProps } from "./Text"` (see `src/components/atoms/index.ts`) — add new components to that barrel too.

`src/components/atoms/Text/` is the reference implementation: it derives its `size`/`weight` variants directly from `typography.fontSize`/`fontWeight`/`lineHeight` and its `color` variants from a semantic map (`default`/`secondary`/`muted`/`inverse`/`brand`/`success`/`warning`/`danger`/`info`) backed by `colors` — follow this pattern (semantic prop values mapped to `src/foundation` tokens, not raw hex/px values) for new atoms/molecules/organisms.

### Styling with `styled-components`

- Plain `.css` files are no longer used anywhere in `src/` — write all styles with `styled-components`.
- Component-specific styled components live in `ComponentName.styles.ts`, not inline in the `.tsx` file.
- Props passed to a styled component that exist purely to drive CSS (not valid DOM attributes) must use the `$` transient-prop prefix (e.g. `$size`, `$color`) so `styled-components` doesn't forward them to the DOM node — see `Text.styles.ts`.
- Polymorphic tag rendering (e.g. `Text`'s `as` prop) should rely on `styled-components`' native `as` prop support on the styled component itself, rather than swapping the rendered element manually.
- Global/reset styles go in `src/styles/GlobalStyle.ts` via `createGlobalStyle`, rendered once in `main.tsx`.

### Every component is documented with Storybook

Each component folder also gets a co-located `ComponentName.stories.tsx` (CSF3 format), alongside `ComponentName.tsx`/`.styles.ts`/`index.ts` — see `Text.stories.tsx`. Conventions:

- `title` in the story's `meta` mirrors the Atomic Design path, e.g. `"Atoms/Text"`.
- `tags: ["autodocs"]` on `meta` so Storybook generates the docs page automatically from `argTypes`/props instead of requiring a hand-written `.mdx` file.
- Only two Storybook addons are installed: `@storybook/addon-docs` (autodocs) and `@storybook/addon-a11y` (accessibility checks), configured in `.storybook/main.ts`. **Don't add `@storybook/addon-vitest`/Chromatic/MCP addons** without an explicit ask — `storybook init` bundles those by default, but they pull in Vitest + Playwright browser binaries purely for component testing, which is out of scope (no test runner in this project).
- `.storybook/preview.tsx` wraps every story in `<GlobalStyle />` (from `src/styles/GlobalStyle.ts`) via a decorator, so stories render with the same reset as the real app.

### Unit testing with Vitest + React Testing Library

- Each component folder also gets a co-located `ComponentName.test.tsx` — see `Text.test.tsx`. Test the rendered behavior (text content, tag name, attributes/classes) via `@testing-library/react`'s `render`/`screen`, not implementation details.
- Vitest is configured directly in `vite.config.ts` (`test: { environment: "jsdom", setupFiles: ["./src/test/setup.ts"] }`) via the `/// <reference types="vitest/config" />` triple-slash directive — there's no separate `vitest.config.ts`.
- `src/test/setup.ts` imports `@testing-library/jest-dom/vitest` (the Vitest-specific entry point, not the generic `@testing-library/jest-dom` one) to register matchers like `toHaveClass`/`toBeInTheDocument` on Vitest's `expect`.
- Import `describe`/`it`/`expect` explicitly from `"vitest"` in every test file — `globals` is not enabled in the Vitest config, matching this project's preference for explicit imports over ambient globals.
- `@testing-library/dom` is a required peer dependency of `@testing-library/react` and must stay installed even though nothing imports it directly.

### `src/foundation/` conventions

Every token module follows the same shape — match it when adding a new one or editing existing ones:

```ts
export const tokenName = { ... }
export type TokenNameType = typeof tokenName
```

- Named exports only — **no `export default`**. The barrel (`src/foundation/index.ts`) re-exports everything via `export *`, which does not forward default exports, so a default would be dead code.
- The barrel exports are alphabetically ordered by filename; keep new modules in that order.
- Object literals are not `as const` — values widen to `string`/`number` in the derived `*Type` types rather than keeping literal types.

### TypeScript config notes

- `verbatimModuleSyntax: true` (`tsconfig.app.json`) — type-only imports/exports must use `import type` / `export type` explicitly; mixed imports will fail to compile.
- `erasableSyntaxOnly: true` — avoid TS syntax that requires runtime transformation (e.g. enums, parameter properties, namespaces).
- `noUnusedLocals` / `noUnusedParameters` are enabled — unused bindings fail the build, not just lint.

### ESLint/Prettier conventions

- Import order is enforced by `eslint-plugin-simple-import-sort` (`simple-import-sort/imports` and `/exports` are `error`, not warnings) — let `lint:fix` or an editor integration sort imports rather than hand-ordering them.
- Prettier config (`.prettierrc`): no semicolons, double quotes, trailing commas everywhere, 120 print width, LF line endings.
- **Arrow functions are preferred everywhere** — enforced via `func-style: ["error", "expression", { allowArrowFunctions: true }]` (bans `function foo() {}` declarations) and `prefer-arrow-callback: "error"` (bans `function` expressions passed as callbacks, e.g. `arr.map(function (x) {...})`). Always write `const foo = () => {...}`, including for components (see `App.tsx`) and hooks.
- **Never destructure function parameters inline.** Take the full `props` (or other single argument) and destructure it on the first line of the body instead: `const { a, b } = props`, not `({ a, b }: Props) => {}`. This applies to components and plain functions alike, including `styled-components` interpolation callbacks (see `Text.styles.ts`, where the whole props object is destructured once inside the interpolation function body rather than in its parameter list). Not currently lint-enforced — no ESLint rule covers this, so review for it manually.
- **Alphabetical property order, required before optional**, enforced by `eslint-plugin-perfectionist` but scoped to `files: ["src/components/**/*.{ts,tsx}"]` only (see `eslint.config.js`) — deliberately **not** applied to `src/foundation/`, whose token scales (`xs`→`4xl`, `50`→`900`) are ordered by size, not alphabetically:
  - `perfectionist/sort-object-types` sorts prop type members (`type FooProps = {...}`) alphabetically within two groups, in this order: `required-property` first, then `optional-property` (each group alphabetical on its own — see `TextProps`/`StyledTextProps`).
  - `perfectionist/sort-objects` sorts object literals and destructured patterns (e.g. `const { a, b } = props`) purely alphabetically — there's no required/optional concept at the destructuring level.

## React-specific rules

- `eslint-plugin-react-refresh` is configured with the Vite preset, which enables `react-refresh/only-export-components`. **A file that exports a React component must only export components** (plus optionally constants used purely for fast-refresh-safe patterns like `displayName`) — don't add hooks, utility functions, or non-component constants to the same file as a component, or Fast Refresh breaks and lint will flag it. Put shared hooks/utils in their own file.
- `eslint-plugin-react-hooks` recommended rules are active (`rules-of-hooks`, `exhaustive-deps`) — treat `exhaustive-deps` warnings as real bugs to fix, not to suppress with an inline disable comment.
- Function components only, no class components — matches the existing codebase and the hooks-based ESLint setup.
- `react/prop-types` is off and there's no runtime prop validation — props must be typed with TypeScript interfaces/types, since that's the only type safety layer for component contracts.

## Git conventions

- Commit messages follow **Conventional Commits**: prefix the subject with `feat:`, `fix:`, `docs:`, or `refactor:` depending on the change (e.g. `feat: add Text atom`, `fix: correct zIndex layer gaps`).
- Keep the **first line under 72 characters**. Put any additional detail in the commit body after a blank line, not by letting the subject run long.
- **Always run `yarn test` before committing** — never commit with a failing test suite.

### These rules are enforced by Husky, not just documented

- `core.hooksPath` is set to `.husky/_` (via `husky init`); the `prepare` script (`"prepare": "husky"`) re-links this on every `yarn install`, so hooks work for anyone who clones the repo — don't delete the `prepare` script.
- `.husky/pre-commit` runs `yarn test` — a commit is blocked if the suite fails.
- `.husky/commit-msg` runs `scripts/validate-commit-msg.mjs`, which rejects the commit if the subject line doesn't start with `feat:`/`fix:`/`docs:`/`refactor:` (optionally `type(scope):`) or exceeds 72 characters. This is a small standalone Node script, not commitlint — if a new commit type needs to be allowed, edit the `allowedTypes` array there.
- Hook files in `.husky/` must keep the executable bit (`100755`) in git, not `100644` — Windows filesystems don't track this natively, so after creating/editing a hook file, fix it explicitly with `git update-index --chmod=+x .husky/<hook-name>` if `git ls-files --stage .husky/<hook-name>` shows `100644`.
