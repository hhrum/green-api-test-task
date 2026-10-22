---
name: add-query
description: >-
  Add a Green API read query in this repo: request function, response DTO,
  and a TanStack Query factory in shared/api. Use when the user asks to add
  a query, endpoint, get-method, or Green API method such as getChatHistory,
  including wiring the result into a page.
---

# Add a query

Plain Green API reads live in `src/shared/api/<domain>/`. Do not put the request in `entities/` or `pages/`. Reuse the existing domain folder (`chat/`) when the method belongs to that resource. Add a new folder only for a new resource, then re-export it from `src/shared/api/index.ts`.

Do not rebuild the instance URL. `greenApi` already inserts `idInstance` and `apiTokenInstance`.

## Files

For domain `chat` the files are `chat.ts`, `chat.types.ts`, `chat.queries.ts`, and `index.ts`. A write belongs in `<domain>.mutations.ts`. Follow the add-mutation skill. Do not add a query there.

1. **DTO** in `<domain>.types.ts`. Type the response from the user's example.
   - Variants (`typeMessage`, incoming/outgoing) are a discriminated union, not one object with every field optional.
   - A field missing in some examples of the same variant is optional.
   - Identifiers that the chat list, route params, and Green API already use as strings stay strings. `chatId` is a string, including group ids like `-74679425618479`.
2. **Request** in `<domain>.ts`:

```ts
export function getChatHistory({ chatId, count }: GetChatHistoryParams) {
  return greenApi<Array<ChatMessageDto>>('getChatHistory', {
    body: { chatId, count },
  })
}
```

- Method name is the path segment only: `getChatHistory`, not the full `{{apiUrl}}/waInstance...` URL.
- Query string (`count` on `getChats`) goes in `query`. A JSON body goes in `body`. `greenApi` sends POST when `body` is set and GET otherwise. Omit `undefined` fields; the client already drops undefined query values, and `JSON.stringify` drops undefined body fields.

3. **Factory** in `<domain>.queries.ts`. Extend the existing object. Keys are hierarchical, and an optional argument is `param ?? null` so the key stays stable:

```ts
histories: () => [...chatQueries.all(), 'history'] as const,

history: (chatId: string, count?: number) =>
  queryOptions({
    queryKey: [...chatQueries.histories(), chatId, count ?? null] as const,
    queryFn: () => getChatHistory({ chatId, count }),
    enabled: chatId.length > 0,
  }),
```

`enabled` only when the query cannot run without an id. Do not copy `staleTime` onto every query; `list` uses `60_000`, history does not.

4. **Public API.** Export the function, param type, and DTO from the domain `index.ts`. Consumers import `@/shared/api`, never a file inside the domain.

Skip a query that already exists. Extend its DTO instead of adding a second factory entry.

## Wire it only when asked

The page or widget that renders the data calls `useQuery(chatQueries.history(chatId))`. Read `chatId` with `useParams({ from: '/_authenticated/chat/$chatId' })`. Match `ChatsList`: spinner while `isLoading`, `Empty` with `error.message` on `isError`, `Empty` when the list is empty.

Green API history is newest-first. Reverse it before rendering a chat transcript. For a group chat, pass `senderName` into `ChatMessage` only when `chatType === 'group'` and `type === 'incoming'`.

A text helper used by one screen stays next to that screen. Do not add display labels to the request module unless the screen already shares that helper (`getChatMessageText`).

After the change, run `pnpm exec tsc --noEmit`. If the query is rendered, open the affected chat route and confirm loading, data, and the empty or error state.
