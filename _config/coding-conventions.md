# Coding Conventions

> Universal rules for this project. Derived from the personal `pi-coding-conventions.md`.
> Framework-specific rules live in `_config/stack.md`.

## Size limits (canonical, non-negotiable)
| Measure | Limit | Applies to |
|---|---|---|
| Function | under 50 lines | function body (executable logic), excluding doc comments |
| File | under 300 lines | code, excluding doc comments / headers |

## Descriptive names — everything
Files, folders, functions, variables, types, components, DB tables/columns. The test:
would you know what it is from the file tree alone? Prefer long descriptive names
(`calculateMonthlySubscriptionCost` over `calc`). Abbreviations only when universal
(`id`, `url`, `http`, `db`, `api`, `auth`).

## Folder nesting as navigation
- Group by domain/feature, not by file type.
- Each directory has one clear purpose.
- A directory with one file is usually wrong.

## Library-first design
Self-contained functions, clean interfaces, no hard-coded project values inside
reusable logic — pass them as parameters.

## No auto-save / no background persistence
Every write to DB/file/storage traces back to a deliberate user action.
Pattern: `User Action → Service Call → Write → Confirm Success`.

## Error transparency
- Never swallow errors; never empty catch blocks.
- Catch at service boundaries; log technical details; show human-readable messages.
- Never show raw errors/stack traces to users.

## Delete dead code
No commented-out code, no unused imports/vars/functions. Git has the history.

## TypeScript
- Strict mode always on; no `any` (use `unknown` + narrowing).
- Interfaces for object shapes; types for unions/aliases; PascalCase, no `I` prefix.
- `const` by default; arrow functions; `??` over `||`; optional chaining.
- No magic numbers/strings — named constants.

## File header (every source file)
```typescript
/**
 * @file DescriptiveFileName
 * @description What this file does (1-3 lines)
 *
 * @status None
 * @issues None
 * @todo None
 */
```
Check the header first when working in a file; clean up resolved TODOs/issues.

## Function docs & inline comments
Document public functions (`@param`, `@returns`). Inline comments explain
**why**, not what.

## Import organization (3 groups, blank-line separated)
1. Framework/language imports
2. Third-party libraries
3. Local imports (`@/...` or relative)

## Naming reference
| Thing | Convention | Example |
|---|---|---|
| Vue components | PascalCase | `ProductCard.vue` |
| TS/JS files | camelCase | `userProfileService.ts` |
| Config files | kebab-case | `nuxt.config.ts` |
| Variables/functions | camelCase | `handleFileUpload` |
| Constants | UPPER_SNAKE_CASE | `MAX_RETRY_ATTEMPTS` |
| Types/Interfaces | PascalCase | `UserSession` |
| CSS classes | kebab-case | `.sidebar-panel-header` |
| DB tables/columns | snake_case | `user_sessions`, `created_at` |
