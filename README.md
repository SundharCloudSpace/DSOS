# DS OneConnect – Playwright + TypeScript Automation (Page Object Model)

## Structure
```
├── playwright.config.ts        # Browsers, timeouts, reporters, trace/screenshot/video
├── tsconfig.json               # TS config (+ path aliases)
├── .env / .env.example         # Environment config & credentials (.env is git-ignored)
├── src
│   ├── pages
│   │   ├── BasePage.ts         # Shared helpers (click, fill, wait...)
│   │   └── LoginPage.ts        # Locators + actions for the login screen
│   ├── fixtures
│   │   └── test-fixtures.ts    # Injects page objects into tests
│   ├── data/users.ts           # Test data
│   └── utils/env.ts            # Typed env reader
└── tests
    └── login/login.spec.ts     # Specs (Given / When / Then steps)
```

## Setup
```bash
npm install
npx playwright install        # downloads browsers
cp .env.example .env          # then edit values
```

## Run
| Command | What it does |
|---|---|
| `npm test` | All tests, headless |
| `npm run test:headed` | Watch the browser |
| `npm run test:ui` | Playwright UI mode |
| `npm run test:debug` | Step-through debugger |
| `npm run test:smoke` | Only `@smoke` tests |
| `npm run report` | Open HTML report |
| `npm run typecheck` | TypeScript check |

## Adding a new page
1. Create `src/pages/DashboardPage.ts` extending `BasePage`.
2. Register it in `src/fixtures/test-fixtures.ts`.
3. Use it in a spec: `test('...', async ({ dashboardPage }) => { ... })`.

## Conventions
- Locators live only in page objects; assertions on page state can live there too.
- Prefer `#id`, `getByRole`, `getByLabel`, `data-testid` over CSS-class selectors (Tailwind classes change often).
- Never hard-code secrets; use `.env` (CI: use pipeline secrets).
