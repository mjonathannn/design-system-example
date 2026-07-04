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
- To run a single test file: `npx vitest run src/ds-components/atoms/Text/Text.test.tsx` (or drop `run` for watch mode on just that file)

**Do not re-add `@storybook/addon-vitest`, `playwright`, or `@chromatic-com/storybook`** — `storybook init` adds them by default, but they were deliberately removed (see Storybook section below). Unit testing in this project is a plain standalone Vitest setup, intentionally not wired into Storybook.

To type-check without building: `npx tsc -b --noEmit` (project uses TS project references — `tsconfig.app.json` for `src/`, `tsconfig.node.json` for Vite config).

## Architecture

This is a React 19 + TypeScript + Vite app, built from scratch on top of a custom design-token layer in `src/foundation/`. Styling is done with `styled-components` (no plain CSS files) — the global reset that used to live in `index.css` is now `src/styles/GlobalStyle.ts`, a `createGlobalStyle`, rendered once in `main.tsx` alongside the router.

### Routing

`src/routes/routes.tsx` (re-exported via `src/routes/index.ts`, so it's imported as `from "./routes"`/`from "@/routes"`) is the single source of route definitions, exporting a `router` built with `react-router-dom`'s `createBrowserRouter` (a flat array of `{ element, path }` entries — no nested/layout routes yet). `main.tsx` renders `<RouterProvider router={router} />` (there is no `App.tsx` — that placeholder was replaced by `src/pages/` once routing landed). Each route's `element` is a component from `src/pages/<PageName>/`, imported via the `@/pages` barrel. A `<Link>` is rendered via `Text`'s polymorphic `as` prop (`<Text as={Link} to="/experimental">`) rather than a raw `<a>`, same as any other `as` target.

### `src/pages/` holds routed views, and is intentionally outside `src/ds-components/`

`src/pages/<PageName>/` follows the same per-component folder shape as `src/ds-components/` (`PageName.tsx` + `PageName.styles.ts` + `index.ts`, each layer folder's `index.ts` re-exporting every page — see `src/pages/index.ts`), but pages are **not** part of the Atomic Design component layers below and don't get `.stories.tsx`/`.test.tsx`: they're routed compositions of atoms/molecules/organisms, not reusable design-system pieces documented in Storybook or unit-tested in isolation.

### `src/utils/` holds cross-cutting pure functions

`src/utils/<moduleName>/` is for plain, framework-agnostic functions reused across multiple components/pages — not tied to any single component's folder. Each module gets its own folder mirroring the component-folder shape (`<moduleName>.ts` + `index.ts` re-exporting it, e.g. `export * from "./formats"`) and a co-located `<moduleName>.test.ts` (see `src/utils/formats/`). The top-level `src/utils/index.ts` re-exports every module folder in turn, so consumers can import from `@/utils` directly. Modules are named exports only, no default export. `formats/formats.ts` is the single source of truth for display formatting (`formatCpf`, `formatCnpj`, `formatCep`, `formatPhone`, `formatCreditCard`, `formatCurrency`, `formatExpiry`) — each takes a raw/possibly-dirty `string` and returns the formatted display string, doing its own digit-extraction and, where the format has a fixed length, truncation internally. `Input`'s `mask` prop (`src/ds-components/molecules/Input/Input.masks.ts`) is a thin dispatcher over these same functions rather than its own implementation — don't duplicate a formatter's logic in a component when the value could instead be formatted for display via `@/utils/formats` from anywhere in the app. `loadingStore/loadingStore.ts` is another such module — see the `src/services/httpClient/` section below for what it's for.

- **Never inline `.replace(/\D/g, "")` to strip non-digit characters.** Use `stripNonDigits` exported from `@/utils/formats` instead (see its use in `Input.tsx`'s `numeric` handling and `viaCep.ts`). Keeping this in one place means a future change to what counts as "a digit" (or swapping the implementation) only has to happen once.

### `src/services/` holds external API calls

`src/services/<serviceName>/` follows the same per-module folder shape as `src/utils/` (`<serviceName>.ts` + `index.ts` re-exporting it, e.g. `export * from "./viaCep"`), re-exported in turn through the top-level `src/services/index.ts`. Named exports only, no default export. **Unlike every other layer in this project, services don't get unit tests** — there's no `<serviceName>.test.ts` to write, mocked or otherwise (`httpClient` is the one exception, precisely because it isn't a thin network call — see below).

### `src/services/httpClient/` and the global Loading overlay

Every service **must** call the API through the shared `httpClient` (`src/services/httpClient/httpClient.ts`, re-exported via `@/services`) instead of importing `axios` directly (see `viaCep.ts`) — its request/response interceptors are what make the `Loading` overlay (`src/components/Loading/`) show up automatically for every API call, with zero wiring per call site:

- `GlobalLoading` (`src/components/GlobalLoading/`) is mounted once in `main.tsx`, alongside the router. It subscribes to `src/utils/loadingStore` (a plain pending-request counter with a subscribe/notify pair, unit-tested like any other util) via `useSyncExternalStore`, and renders `<Loading />` whenever that counter is above zero.
- `httpClient`'s interceptors call `startLoading()`/`stopLoading()` on every request/response (or error) — that's the only thing wiring an API call to the counter, so a new service automatically gets the overlay for free just by using `httpClient`.
- Every service function's public signature **must** accept the request's own arguments plus a final, optional `config: RequestConfig` parameter (e.g. `getAddressByCep(cep: string, config?: RequestConfig)`), passed straight through as `httpClient`'s second argument. `RequestConfig` (exported from `httpClient.ts`) is `Pick<AxiosRequestConfig, "showLoading">` today — a deliberately narrow, purpose-built object (not the full `AxiosRequestConfig`) — so a caller that doesn't want the global overlay for a specific call passes `{ showLoading: false }`; anything else (including omitting `config`) shows it. Add new fields to the same `declare module "axios"` augmentation in `httpClient.ts` and `Pick` them into `RequestConfig` as new cross-cutting per-call options are needed, rather than growing each service's own parameter list.

### `src/models/` holds the types for each service

`src/models/<serviceName>/` mirrors the folder of the matching `src/services/<serviceName>/` one-to-one (`<serviceName>.ts` + `index.ts` re-exporting it, e.g. `export * from "./viaCep"`, re-exported in turn through the top-level `src/models/index.ts`). It holds every type tied to that service's endpoints — request parameters, response shapes (see `models/viaCep/viaCep.ts`'s `ViaCepAddress`) — so the service file itself only imports types from `@/models`, it never declares its own. Named exports only, no default export, and — same as `src/services/` — no unit tests, since these are type-only declarations with nothing to execute.

### `src/foundation/` is the single source of design tokens

`src/foundation/` defines a code-based token system (colors, spacing, typography, motion, radius, shadows, opacity, zIndex, breakpoints), exported through `src/foundation/index.ts`. It is the only design-token system in the project — new UI should consume values from `src/foundation` inside `styled-components` definitions (e.g. `colors.primary[500]`, `spacing[16]`) rather than hardcoding colors/spacing/etc. Note it currently has no dark-mode variants.

`spacing` and `colors.primary`/`colors.neutral` are numeric-keyed scales, but they don't mean the same thing: `spacing` keys are the pixel value itself (`spacing[16]` is `"16px"`, `spacing[24]` is `"24px"`, ...), while the color scales use abstract step numbers (`colors.primary[500]` is the base brand blue, not "500px" of anything). Don't assume one numeric-key convention applies to both.

### Components follow Atomic Design, under `src/ds-components/`

UI components live under `src/ds-components/<layer>/<ComponentName>/`, where `<layer>` is one of `atoms`, `molecules`, `organisms`, `templates` (routed pages live in `src/pages/` instead — see below). Each component gets its own PascalCase folder containing:

- `ComponentName.tsx` — the component as a named export (e.g. `export const Text = ...`) plus its `export type ComponentNameProps`.
- `ComponentName.styles.ts` — the `styled-components` definitions, imported into `ComponentName.tsx`. Keep styling declarations out of the component file itself.
- `index.ts` — barrel re-exporting everything from the component file, e.g. `export * from "./ComponentName"`.

Each layer folder (`atoms/`, `molecules/`, ...) also has its own `index.ts` barrel re-exporting every component in that layer, e.g. `export * from "./Text"` (see `src/ds-components/atoms/index.ts`) — add new components to that barrel too.

`src/ds-components/atoms/Text/` is the reference implementation: it derives its `size`/`weight` variants directly from `typography.fontSize`/`fontWeight`/`lineHeight` and its `color` variants from a semantic map (`default`/`secondary`/`muted`/`inverse`/`brand`/`success`/`warning`/`danger`/`info`) backed by `colors` — follow this pattern (semantic prop values mapped to `src/foundation` tokens, not raw hex/px values) for new atoms/molecules/organisms.

Every component also accepts a `style?: CSSProperties` prop (imported as `import type { CSSProperties } from "react"`), passed straight through to the root styled element (e.g. `<StyledText style={style}>`) as a one-off inline-style escape hatch on top of the variant props — see `Text.tsx`/`Text.styles.ts`.

### `src/components/` holds components that are not part of the ds-components design system

Unlike `src/ds-components/`, `src/components/<ComponentName>/` is flat (no Atomic Design `<layer>` segment) and holds components that aren't meant to be reusable, documented design-system pieces — `Loading` (a full-viewport overlay tied to app-level async states) lives here. It still follows the same per-component folder shape (`ComponentName.tsx` + `.styles.ts` + `index.ts` + `.stories.tsx` + `.test.tsx`) and the same conventions (styled-components, `@/foundation` tokens, `style`/`className` props, alphabetical prop order via `eslint-plugin-perfectionist` — see its `files` glob in `eslint.config.js`, which covers both this folder and `src/ds-components/`). Has its own top-level `src/components/index.ts` barrel, same as any other layer.

### `Tooltip` and the `tooltip` prop convention

`src/ds-components/atoms/Tooltip/` provides the cursor-following tooltip balloon plus the `useTooltip` hook that any component uses to opt into a `tooltip?: string` prop:

- `Tooltip.tsx` is the presentational balloon — it takes `x`/`y` (viewport coordinates) and `children`, and renders via `createPortal(..., document.body)` so it isn't clipped by `overflow: hidden` ancestors and always sits above other content (`zIndex.tooltip`). It has no visibility/hover logic of its own — it always renders when mounted.
- `useTooltip(tooltip?: string)` (in `useTooltip.tsx`, co-located with `Tooltip` since it's tightly coupled — note the `.tsx` extension, required because the hook returns JSX) owns the hover/mouse-tracking state and returns `{ tooltipElement, tooltipHandlers }`. `tooltipHandlers` (`onMouseEnter`/`onMouseMove`/`onMouseLeave`) gets spread onto the component's root styled element to track the cursor and toggle visibility; `tooltipElement` is the already-built `<Tooltip>` (or `null` when not hovering / no `tooltip` text given) to render as a sibling.
- To add this to a new component: add `tooltip?: string` to its own props (alphabetical position among the optional props), call `const { tooltipElement, tooltipHandlers } = useTooltip(tooltip)`, spread `{...tooltipHandlers}` onto the root styled element (after `{...rest}`, so it always wins over any same-named prop a caller passed through), wrap the return in a fragment, and render `{tooltipElement}` as a sibling after the root element — see `Text.tsx` for the reference wiring.

### Styling with `styled-components`

- Plain `.css` files are no longer used anywhere in `src/` — write all styles with `styled-components`.
- Component-specific styled components live in `ComponentName.styles.ts`, not inline in the `.tsx` file.
- Props passed to a styled component that exist purely to drive CSS (not valid DOM attributes) must use the `$` transient-prop prefix (e.g. `$size`, `$color`) so `styled-components` doesn't forward them to the DOM node — see `Text.styles.ts`.
- Polymorphic tag rendering (e.g. `Text`'s `as` prop) should rely on `styled-components`' native `as` prop support on the styled component itself, rather than swapping the rendered element manually. To get the rendered tag's own attributes typed and forwarded (e.g. `href` when `as="a"`), make the component's props generic over `C extends ElementType` — own props live in a `TextOwnProps<C>` type, and the exported `TextProps<C extends ElementType = "p">` intersects it with `Omit<ComponentPropsWithoutRef<C>, keyof TextOwnProps<C>>`. The component itself becomes `<C extends ElementType = "p">(props: TextProps<C>) => {...}`, destructuring known props plus `...rest` and spreading `rest` onto the styled element. See `Text.tsx`. (A bare generic like `<T>(props) => ...` is ambiguous with JSX in a `.tsx` file and needs a trailing comma — `<T,>` — or an `extends` clause to disambiguate; since this generic already has `extends ElementType`, no trailing comma is needed here.)
- Global/reset styles go in `src/styles/GlobalStyle.ts` via `createGlobalStyle`, rendered once in `main.tsx`.
- **Token values in styles must use `src/foundation` tokens, never hardcoded literals.** Any CSS property whose value has a corresponding foundation token must reference that token — never write the raw value directly in a `.styles.ts` file or a `style={{...}}` object:
  - Pixel measurements → `spacing` (e.g. `padding: ${spacing[24]}`, `gap: ${spacing[8]}`)
  - Opacity → `opacity` (e.g. `opacity: ${opacity.disabled}` instead of `opacity: 0.5`)
  - Other token types follow the same rule: `radius`, `shadows`, `colors`, `zIndex`, `typography`, `motion`, `translucency`
  - Exceptions: values with no corresponding token (`1px` borders, percentage/viewport units, dynamic computed values) and values already derived from another token (e.g. `${typography.fontSize.sm}px`).

### Adding or changing props

Whenever a new prop is added to a component (or an existing prop is changed or removed), two files **must** be updated in the same change:

1. **`ComponentName.stories.tsx`** — add or update the `argTypes` entry for the prop (with `control` type and `description`) and add a dedicated story that exercises the new behavior if it isn't already covered.
2. **`ComponentName.test.tsx`** — add or update test cases that cover the new prop's behavior.

These are not optional follow-ups: documentation and tests are part of the same unit of work as the prop itself.

### Every component is documented with Storybook

Each component folder also gets a co-located `ComponentName.stories.tsx` (CSF3 format), alongside `ComponentName.tsx`/`.styles.ts`/`index.ts` — see `Text.stories.tsx`. Conventions:

- `title` in the story's `meta` mirrors the Atomic Design path, e.g. `"Atoms/Text"`.
- `tags: ["autodocs"]` on `meta` so Storybook generates the docs page automatically from `argTypes`/props instead of requiring a hand-written `.mdx` file.
- Only two Storybook addons are installed: `@storybook/addon-docs` (autodocs) and `@storybook/addon-a11y` (accessibility checks), configured in `.storybook/main.ts`. **Don't add `@storybook/addon-vitest`/Chromatic/MCP addons** without an explicit ask — `storybook init` bundles those by default, but they pull in Vitest + Playwright browser binaries purely for component testing, which is out of scope (no test runner in this project).
- `.storybook/preview.tsx` wraps every story in `<GlobalStyle />` (from `src/styles/GlobalStyle.ts`) via a decorator, so stories render with the same reset as the real app.
- Every exported story (including `Default`) gets a one-line comment directly above it describing what it demonstrates, e.g. `// The elevated prop adding a drop shadow and removing the border` — describe the prop/behavior/variant being shown, not just restate the story name.
- **This design system targets a Brazilian Portuguese (pt-BR) product** — example content rendered by stories (`args` values like `children`/`title`/`placeholder`/`helperText`, and any hardcoded text inside a custom `render()`) must be written in pt-BR, e.g. `title: "E-mail"`, `placeholder: "Digite algo..."` (see `Input.stories.tsx`). This does **not** extend to `argTypes[...].description` strings, story comments, or anything else in the codebase — those stay in English like the rest of the code. Also don't translate values that are literally part of the component's API surface (e.g. `color="default"`/`color="brand"` demoed by rendering the token name itself, or an `Icon`'s `name` slug) — translating those would make the displayed label lie about the actual prop value.

### Unit testing with Vitest + React Testing Library

- Each component folder also gets a co-located `ComponentName.test.tsx` — see `Text.test.tsx`. Test the rendered behavior (text content, tag name, attributes/classes) via `@testing-library/react`'s `render`/`screen`, not implementation details.
- Vitest is configured directly in `vite.config.ts` (`test: { environment: "jsdom", setupFiles: ["./src/test/setup.ts"] }`) via the `/// <reference types="vitest/config" />` triple-slash directive — there's no separate `vitest.config.ts`.
- `src/test/setup.ts` imports `@testing-library/jest-dom/vitest` (the Vitest-specific entry point, not the generic `@testing-library/jest-dom` one) to register matchers like `toHaveClass`/`toBeInTheDocument` on Vitest's `expect`.
- Import `describe`/`it`/`expect` explicitly from `"vitest"` in every test file — `globals` is not enabled in the Vitest config, matching this project's preference for explicit imports over ambient globals.
- `@testing-library/dom` is a required peer dependency of `@testing-library/react` and must stay installed even though nothing imports it directly.
- `src/test/setup.ts` also calls `afterEach(() => cleanup())` explicitly. React Testing Library's auto-cleanup only registers itself when it detects a global `afterEach` (e.g. Jest, or Vitest with `globals: true`); since this project's Vitest config keeps `globals` off, auto-cleanup never fires without this — and without it, every `render()` in a file keeps piling up in `document.body` across `it` blocks (most visible with portal-based components like `Tooltip`, or repeated text across tests).

### `src/foundation/` conventions

Every token module follows the same shape — match it when adding a new one or editing existing ones:

```ts
export const tokenName = { ... }
export type TokenNameType = typeof tokenName
```

- Named exports only — **no `export default`**. The barrel (`src/foundation/index.ts`) re-exports everything via `export *`, which does not forward default exports, so a default would be dead code.
- The barrel exports are alphabetically ordered by filename; keep new modules in that order.
- Object literals are not `as const` — values widen to `string`/`number` in the derived `*Type` types rather than keeping literal types.
- `breakpoints.ts` is the one exception to "one object + one type per module": it exports both `breakpoints` (raw pixel values) and `media` (the same values pre-wrapped in `(min-width: ...)` strings), each with its own `BreakpointsType`/`MediaType`.

### TypeScript config notes

- `verbatimModuleSyntax: true` (`tsconfig.app.json`) — type-only imports/exports must use `import type` / `export type` explicitly; mixed imports will fail to compile.
- `erasableSyntaxOnly: true` — avoid TS syntax that requires runtime transformation (e.g. enums, parameter properties, namespaces).
- `noUnusedLocals` / `noUnusedParameters` are enabled — unused bindings fail the build, not just lint.
- **`@/*` path alias maps to `src/*`** — configured in both `tsconfig.app.json` (`paths`, no `baseUrl`; it's deprecated as of this TS version) and `vite.config.ts` (`resolve.alias`, via `path.resolve(import.meta.dirname, "src")`). Both must stay in sync — TS only type-checks the alias, Vite is what actually resolves it at build/dev/test time.
- Use `@/...` for cross-cutting imports (e.g. `@/foundation`, `@/styles/GlobalStyle`) to avoid `../../../`-style chains as components nest deeper under Atomic Design layers. Keep plain relative imports (`./Text.styles`) for files co-located in the same component folder — the alias is for crossing into a different top-level concern, not for siblings.

### ESLint/Prettier conventions

- Import order is enforced by `eslint-plugin-simple-import-sort` (`simple-import-sort/imports` and `/exports` are `error`, not warnings) — let `lint:fix` or an editor integration sort imports rather than hand-ordering them.
- Prettier config (`.prettierrc`): no semicolons, double quotes, trailing commas everywhere, 120 print width, LF line endings.
- **Arrow functions are preferred everywhere** — enforced via `func-style: ["error", "expression", { allowArrowFunctions: true }]` (bans `function foo() {}` declarations) and `prefer-arrow-callback: "error"` (bans `function` expressions passed as callbacks, e.g. `arr.map(function (x) {...})`). Always write `const foo = () => {...}`, including for components (see `Text.tsx`) and hooks.
- **Never use nested ternaries.** When more than one condition must be resolved, use `if/else` chains or early returns instead. A single ternary (`a ? b : c`) is fine; nesting another inside the branches is not.
- **Never destructure function parameters inline.** Take the full `props` (or other single argument) and destructure it on the first line of the body instead: `const { a, b } = props`, not `({ a, b }: Props) => {}`. This applies to components and plain functions alike, including `styled-components` interpolation callbacks (see `Text.styles.ts`, where the whole props object is destructured once inside the interpolation function body rather than in its parameter list). Not currently lint-enforced — no ESLint rule covers this, so review for it manually.
- **Prefer `async`/`await` over `.then()`/`.catch()` chains.** Write `const data = await getAddressByCep(cep)` inside an `async` function rather than `getAddressByCep(cep).then(setData)`. Not lint-enforced — review manually.
- **Prefer `try`/`catch` over `.catch()` for error handling**, once the calling function is `async` (see the previous rule) — wrap the `await` in `try`/`catch` rather than chaining `.catch()` off the promise. Note that a `useEffect` callback can't be `async` itself (its return value is reserved for an optional cleanup function), so when an effect needs to `await` something, declare a separate `async` function inside the effect and call it, rather than making the effect callback `async` or falling back to `.then()`/`.catch()` — see `Experimental.tsx`.
- **Alphabetical property order, required before optional**, enforced by `eslint-plugin-perfectionist` but scoped to `files: ["src/ds-components/**/*.{ts,tsx}", "src/components/**/*.{ts,tsx}"]` only (see `eslint.config.js`) — deliberately **not** applied to `src/foundation/`, whose token scales (`xs`→`4xl`, `50`→`900`) are ordered by size, not alphabetically:
  - `perfectionist/sort-object-types` sorts prop type members (`type FooProps = {...}`) alphabetically within two groups, in this order: `required-property` first, then `optional-property` (each group alphabetical on its own — see `TextProps`/`StyledTextProps`).
  - `perfectionist/sort-objects` sorts object literals and destructured patterns (e.g. `const { a, b } = props`) purely alphabetically — there's no required/optional concept at the destructuring level.

## Component body ordering

Inside a component, constants must follow this sequence (when each type is present), with each block separated by exactly one blank line:

1. **`useRef`** calls
2. **Custom hooks** (e.g. `useTooltip`, any hook from `src/ds-components` or a shared `hooks/` folder)
3. **`useState`** calls
4. **Derived constants** (booleans and other values computed from props/state)

The props destructuring that opens the function body is not counted as a block — the first blank line appears after it, before whichever block comes first. A blank line also follows the last block, before the `return`.

```tsx
export const Example = (props: ExampleProps) => {
  const { disabled, label, tooltip } = props

  const inputRef = useRef<HTMLInputElement>(null)

  const { tooltipElement, tooltipHandlers } = useTooltip(tooltip)

  const [open, setOpen] = useState(false)

  const isActive = open && !disabled

  return (...)
}
```

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
- Scripts under `scripts/` run in Node, not the browser, so they get a dedicated `eslint.config.js` block with `globals.node` (for `process`, etc.) instead of the `globals.browser` used everywhere else — add new Node-only scripts under that same folder so they pick up the right globals automatically.
- Hook files in `.husky/` must keep the executable bit (`100755`) in git, not `100644` — Windows filesystems don't track this natively, so after creating/editing a hook file, fix it explicitly with `git update-index --chmod=+x .husky/<hook-name>` if `git ls-files --stage .husky/<hook-name>` shows `100644`.
