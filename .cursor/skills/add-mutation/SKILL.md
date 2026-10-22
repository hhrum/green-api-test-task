---
name: add-mutation
description: >-
  Add a Green API write mutation in this repo: request function, params and
  response DTO, and a TanStack Query mutationOptions factory in shared/api.
  Use when the user asks to add a mutation, POST method, setSettings, or
  another Green API write, including wiring the call into a screen.
---

# Add a mutation

Plain Green API writes live in `src/shared/api/<domain>/`. Do not put the request in `entities/`, `features/`, or `pages/`. Reuse the existing domain folder (`profile/`, `chat/`) when the method belongs to that resource. Add a new folder only for a new resource, then re-export it from `src/shared/api/index.ts`.

Do not rebuild the instance URL. `greenApi` already inserts `idInstance` and `apiTokenInstance`. A read stays in `<domain>.queries.ts`. Follow the add-query skill for that.

## Files

For domain `profile` the files are `profile.ts`, `profile.types.ts`, `profile.mutations.ts`, and `index.ts`.

1. **Types** in `<domain>.types.ts`.
   - Params come from the user's request example. A field the user marks optional stays optional. When every field is optional, type the body as `Partial<...>`.
   - Do not add fields the user did not list.
   - `"yes"` / `"no"` is `'yes' | 'no'`. Reuse the `YesNo` alias already in that file. Do not type those fields as `boolean`.
   - A numeric range TypeScript cannot express (min, max, recommended) is one comment on the params type. Do not add a runtime check.
   - When the body is an existing DTO minus read-only fields, reuse it. `setSettings` is `Partial<Omit<ProfileSettingsDto, 'wid' | 'typeInstance'>>`.
   - Response DTO comes from the user's example. If they omit the response, use the documented body (`{ saveSettings: boolean }` for `setSettings`). Do not leave the return type `unknown`.
2. **Request** in `<domain>.ts`:

```ts
export function setSettings(body: SetSettingsParams) {
  return greenApi<SetSettingsDto>('setSettings', { body })
}
```

- Method name is the path segment only: `setSettings`, not the full `{{apiUrl}}/waInstance...` URL.
- A JSON body goes in `body`. `greenApi` sends POST when `body` is set. `JSON.stringify` drops `undefined` fields, so a partial body is enough. An empty object is valid when the user says nothing is required. Do not add an "at least one field" constraint they did not ask for.
3. **Factory** in `<domain>.mutations.ts`. One object, `<domain>Mutations`, built with `mutationOptions` from `@tanstack/react-query`. The key hangs off that domain's query root:

```ts
export const profileMutations = {
  setSettings: () =>
    mutationOptions({
      mutationKey: [...profileQueries.all(), 'setSettings'] as const,
      mutationFn: setSettings,
    }),
}
```

`chat.mutations.ts` still exports a `chatMutationKeys` stub. Replace that stub with `chatMutations` when the first chat mutation is added. Do not keep both.

Do not put `onSuccess`, cache invalidation, or UI state in the factory. The caller decides what to refresh.
4. **Public API.** Export the function, params type, response DTO, and `<domain>Mutations` from the domain `index.ts`. Consumers import `@/shared/api`, never a file inside the domain.

Skip a mutation that already exists. Extend its params or DTO instead of adding a second factory entry.

## Wire it only when asked

The screen calls `useMutation(<domain>Mutations.setSettings())` and passes only the fields that change:

```ts
const settingsMutation = useMutation(profileMutations.setSettings())

settingsMutation.mutateAsync({
  outgoingWebhook: 'yes',
  stateWebhook: 'yes',
  incomingWebhook: 'yes',
})
```

Invalidate or refresh the related query in that caller. `TurnOnNotificationSettings` does this through `onNeedRefreshSettings` after `saveSettings` is true. Disable the button and show a spinner while the mutation is pending. Surface `error.message` on failure.

After the change, run `pnpm exec tsc --noEmit`. If the mutation is rendered, open the affected screen and confirm the pending, success, and error states.
