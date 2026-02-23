# UsersDirectory

A React Native (Expo) app that lists users from the [DummyJSON](https://dummyjson.com) API, supports search, shows a detail screen with rich user info, and demonstrates reusable component design with a design-system mindset.

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                       App.tsx                           │
│              NavigationContainer + StatusBar             │
└──────────────────────┬──────────────────────────────────┘
                       │
              ┌────────▼────────┐
              │  RootNavigator  │  (native-stack)
              └────┬───────┬────┘
                   │       │
        ┌──────────▼─┐  ┌──▼───────────────┐
        │ HomeScreen │  │ UserDetailScreen │
        └─────┬──────┘  └───────┬──────────┘
              │                 │
     ┌────────▼────────┐  ┌────▼──────────┐
     │  useUsersStore  │  │ fetchUserById │
     │   (Zustand)     │  │   (API)       │
     └────────┬────────┘  └───────────────┘
              │
     ┌────────▼────────┐
     │   API Layer     │
     │  (fetch client) │
     └────────┬────────┘
              │
     ┌────────▼────────┐
     │   DummyJSON     │
     │   REST API      │
     └─────────────────┘
```

**Data flow:** Screens → Zustand store / hooks → API layer → DummyJSON.
State is managed centrally in the Zustand store; components subscribe to slices they need. The API layer is a thin `fetch` wrapper that handles JSON parsing and error normalisation.

---


---

## Project Structure

```
src/
├── api/                # Fetch-based API client & endpoint functions
│   ├── client.ts       # Generic request<T>() wrapper over fetch
│   ├── users.ts        # fetchUsers, fetchUserById, searchUsers
│   └── index.ts
├── components/         # Reusable design-system components
│   ├── Avatar.tsx      # Image with initials fallback
│   ├── Button.tsx      # Variants (primary/secondary/outline/ghost), sizes
│   ├── Card.tsx        # Elevated surface container
│   ├── EmptyState.tsx  # Empty list placeholder
│   ├── ErrorState.tsx  # Error display with retry button
│   ├── InfoRow.tsx     # Label–value row for detail screens
│   ├── Input.tsx       # Label, clearable, styled wrapper
│   ├── ListItem.tsx    # Pressable row with avatar & chevron
│   ├── Loading.tsx     # Full-screen spinner
│   ├── Text.tsx        # Typography with variants
│   ├── __tests__/      # Component unit tests
│   └── index.ts
├── navigation/         # React Navigation stack
│   ├── types.ts        # RootStackParamList & screen props
│   ├── RootNavigator.tsx
│   └── index.ts
├── screens/            # Screen components
│   ├── HomeScreen.tsx         # FlatList + search + pagination + animated search bar
│   ├── UserDetailScreen.tsx   # Collapsible header + bounce animation + user details
│   ├── __tests__/             # Screen integration tests
│   └── index.ts
├── store/              # Zustand store
│   ├── useUsersStore.ts       # Users state, pagination, search actions
│   └── index.ts
├── theme.ts            # Colors, spacing, radii, typography tokens
├── types/              # Shared TypeScript interfaces
│   ├── user.ts
│   └── index.ts
└── App.tsx             # Root: NavigationContainer + RootNavigator
```

---

## Getting Started

### Prerequisites

- **Node.js** >= 18
- **Expo CLI** (`npx expo`)
- **Xcode** (for iOS simulator)
- **Android Studio** (for Android emulator)
- **EAS CLI** (`npm i -g eas-cli`) — for cloud builds / Detox

### Install Dependencies

```bash
npm install --legacy-peer-deps
```

### Run on iOS

```bash
# Start Expo dev server + open iOS simulator
npx expo start --ios
```

### Run on Android

```bash
# Start Expo dev server + open Android emulator
npx expo start --android
```

> **Note:** The first launch requires a development build. If you're using Expo Go, run `npx expo start` and scan the QR code.

---

## Running Unit / Integration Tests

Tests use **Jest** with **jest-expo** preset and **@testing-library/react-native**.

```bash
# Run all tests (single run)
npm test

# Run in watch mode (re-runs on file changes)
npm run test:watch

# Run with coverage report
npm run test:coverage
```

### What's tested

| Area        | Tests                                                                       |
| ----------- | --------------------------------------------------------------------------- |
| Components  | Avatar, Button, Card, EmptyState, ErrorState, InfoRow, Input, ListItem, Loading, Text |
| Hooks       | useUsers (load, error, search, hasMore)                                     |
| Screens     | HomeScreen (loading, list, error, navigation), UserDetailScreen (loading, sections, error, retry) |

---

## Running E2E Tests (Detox)

The project uses **Detox** for end-to-end testing on iOS simulator. Builds are done via **EAS** cloud builds to avoid needing 15 GB+ local disk space.

### 1. Build the `.app` via EAS 

```bash
eas build -p ios --profile=development-detox --local
```

### 2. Extract the .tar.gz file

```bash
tar -xzf <your-build-artifact>.tar.gz
```

This extracts `UsersDirectory.app` into the project root.

### 3. Run Detox tests

```bash
npx detox test -c ios.sim.release
```

### E2E test scenarios

- App launches and shows the users list
- User items are visible in the list
- Search filters users
- Tapping a user navigates to the detail screen
- Bounce avatar button is interactive
- Detail screen scrolls to reveal all sections

---

## Key Decisions & Tradeoffs

### 1. Server-side Search vs. Client-side Filtering

**Decision:** Use DummyJSON's `/users/search?q=...` endpoint.

**Why:** Keeps the client lean — no need to download all ~200 users upfront. The server handles matching (firstName, lastName, maidenName), ensuring consistent results and smaller payloads.

**Tradeoff:** Requires a network call for every search query. Mitigated with a **400 ms debounce** to reduce API calls while the user types.

### 2. Zustand over Context / Redux

**Decision:** Zustand for global state.

**Why:** Zero boilerplate — no providers, reducers, or action types. Direct store access outside React via `useUsersStore.getState()`. Excellent TypeScript inference out of the box.

**Tradeoff:** Smaller ecosystem compared to Redux 

### 3. Built-in `fetch` over Axios

**Decision:** Use the native `fetch` API with a thin wrapper (`apiClient.request<T>()`).

**Why:** No extra dependency. The wrapper centralises JSON parsing and error handling. For this app's scope (read-only GET requests), axios's features (interceptors, cancel tokens) aren't needed.

**Tradeoff:** No automatic request/response transformation or retry logic — acceptable for a read-only directory app.

### 4. Reanimated Animations

**Decision:** Collapsible header on UserDetailScreen 

**Why:** Demonstrates UI-thread animations at 60 fps. The collapsible header interpolates height/scale/opacity based on scroll offset. The bounce-avatar uses `withSpring` for a playful micro-interaction.

**Tradeoff:** Reanimated adds native module complexity (requires babel plugin, careful jest mocking with worklets). Worth it for production-quality animations.

### 5. Design-System Components

**Decision:** Build a reusable component library (`src/components/`) with centralised theme tokens (`theme.ts`).

**Why:** Ensures visual consistency across screens, makes it easy to update colours/spacing globally, and each component is independently testable.

**Tradeoff:** More upfront code than inline styles, but pays off as the app grows and more screens are added.

### 6. Pagination Strategy

**Decision:** Offset pagination using `skip` + `limit` parameters with FlatList's `onEndReached`.

**Why:** DummyJSON supports offset pagination. Loading 30 users per page balances initial load time with smooth, continuous scrolling. `removeClippedSubviews`, `maxToRenderPerBatch`, and `windowSize` optimise FlatList rendering.

**Tradeoff:** No infinite scroll cache — pull-to-refresh resets to page 1. Acceptable for a directory use case.

### 7. Scalability & Performance Considerations

- **FlatList optimisations:** `removeClippedSubviews`, `maxToRenderPerBatch=15`, `windowSize=10` prevent memory spikes with large lists.
- **Debounced search:** 400 ms delay prevents excessive API calls during rapid typing.
- **Shared helper in store:** `loadFirstPage()` eliminates duplicated fetch logic across `loadUsers`, `refresh`, and `clearSearch`.
- **Arrow function exports:** Consistent function style across the API layer for tree-shaking friendliness.

---

## API

All data comes from [DummyJSON Users](https://dummyjson.com/docs/users).

| Endpoint                     | Usage                  |
| ---------------------------- | ---------------------- |
| `GET /users?limit=30&skip=N` | Paginated user list    |
| `GET /users/search?q=...`    | Server-side search     |
| `GET /users/:id`             | Single user details    |

---

## License

MIT
