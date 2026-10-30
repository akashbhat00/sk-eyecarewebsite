# Architecture

The app is layered so features and backends can be added without rewriting existing code.

```
ui/  ──►  services/  ──►  repositories/interfaces  ◄──  repositories/supabase  (+ supabase/models)
 │            │                                          repositories/memory    (tests, demo)
 │            └──►  domain/  (models, schemas, rules)    repositories/api       (future backend)
 └──►  config/, content/, utils/, shared/
```

| Layer | Folder | Responsibility | May import |
|---|---|---|---|
| Config | `src/config` | Env, shop details, routes, admin nav | nothing app-specific |
| Domain | `src/domain` | Models (JSDoc), zod schemas, constants, pure business rules | `zod` only |
| Repositories | `src/repositories` | Data access + row↔model mapping. No business rules | domain, shared, config |
| Services | `src/services` | Use-cases: validate, enforce rules, call repositories | domain, shared, repository **interfaces** |
| UI | `src/ui` | React components, hooks, pages, layouts | services (via `useServices`), domain constants, config, content, utils |

Rules (checked in review):
- `@supabase/supabase-js` is imported only in `src/repositories/supabase/`.
- `src/ui` never imports from `src/repositories`.
- Shop facts (phone, address, hours) live only in `src/config/site.config.js`.

## How the pieces connect

1. `repositories/repository.factory.js` picks implementations from `VITE_BACKEND`.
2. `services/service.container.js` (the composition root) injects them into services.
3. `main.jsx` passes the container to `<ServicesProvider>`; components use `useServices()` and hooks
   such as `useSubmitInquiry` and `useInquiries`.
4. The admin area is lazy-loaded (`ui/app/AdminArea.jsx`), and supabase-js is loaded on first use,
   so visitors only download the storefront.

## Naming

kebab-case files with a role suffix: `.model.js`, `.schema.js`, `.constants.js`, `.repository.js`,
`.service.js`, `.config.js`, `.content.js`, `.util.js`, `.test.js`, `.row.js` (DB row shape).
React components are `PascalCase.jsx`.

## Adding a feature (example: Orders)

1. `src/domain/order/`: `order.model.js`, `order.schema.js`, `order.constants.js` (statuses and the
   allowed `STATUS_TRANSITIONS`).
2. `src/repositories/interfaces/order.repository.js`: the contract.
3. `src/repositories/supabase/models/order.row.js` + `supabase-order.repository.js`; a memory version
   for tests.
4. Register it in `repository.factory.js`.
5. `src/services/order.service.js`, registered in `service.container.js`.
6. UI: `src/ui/components/orders/*`, `src/ui/pages/admin/AdminOrdersPage.jsx`, a hook in `ui/hooks/`.
7. Add the path to `config/routes.config.js`, the menu item to `config/admin-nav.config.js`, and the
   `<Route>` in `ui/app/AdminArea.jsx`.
8. `supabase/migrations/00X_orders.sql` with RLS using `public.is_staff()`.
9. Tests in `tests/` against the memory repository.

## Swapping the backend

To move from Supabase to your own API: create `src/repositories/api/` with repositories that
implement the same interfaces (fetch + map JSON to domain models + throw `AppError`), add an
`api` case in `repository.factory.js`, and set `VITE_BACKEND=api`. Services and UI do not change.
The zod schemas in `src/domain` can be imported by a Node backend for identical validation.

## Phase 2/3 blueprint

**Data model**

```
categories ─┐
products ───┼── product_variants (sku, colour, size, price, mrp) ── product_images
            │         │
            │   stock_movements (variant_id, qty ±, reason, ref)   → stock = SUM(qty)
customers ── orders ── order_items (variant_id, qty, unit_price snapshot)
               ├── order_status_history (from, to, changed_by, note, at)
               └── prescriptions (customer_id, R/L SPH CYL AXIS ADD, image)
staff_profiles (user_id, role)  ← already exists, drives RLS
```

- Stock is a ledger (`stock_movements`), never an overwritten number: full history, no lost updates.
- `order_items` stores the price at purchase time so later price changes don't rewrite history.

**Order lifecycle**

```
pending → confirmed → rx_verified* → in_lab → ready → picked_up | out_for_delivery → delivered → completed
pending | confirmed → cancelled → refunded (if paid)          * prescription orders only
```

Allowed transitions live in one table in `domain/order/order.constants.js`, used by the service
and mirrored by a DB trigger; every change writes `order_status_history`.

**Server-side operations.** Placing an order (re-pricing, reserving stock atomically) and payment
webhooks (Razorpay) must not run in the browser. Implement them as a Postgres function (RPC) or a
Supabase Edge Function, called through a repository like everything else.
