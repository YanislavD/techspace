# TechSpace

A shared-equipment booking app for a university co-working space (laptops,
monitors, VR headsets, projectors and more). Users browse a catalog, book
equipment for a date range, and can add their own equipment to the catalog.

React exam project (SoftUni, Regular Exam).

## 🔗 Live Demo

**[https://techspace-nine.vercel.app/](https://techspace-nine.vercel.app/)**

No installation or Supabase setup is needed to try the project: the app is
deployed on Vercel and connected to a real, hosted Supabase database. Email
confirmation is disabled, so you can register with any email address and sign
in immediately.

> The application UI is in Bulgarian. Throughout this document UI labels are
> written as English name followed by the Bulgarian label in quotes, for
> example **Book** ("Резервирай").

## Tech Stack

- **React 19** (Vite)
- **React Router 7** - client-side routing, nested routes, route guards
- **Supabase** - Auth + Postgres + JS SDK (a real remote service, no hardcoded
  data and no custom backend)
- Plain external CSS files (no CSS-in-JS), responsive layout for phones

---

# Functional Guide

## 1. Project Overview

**Application Name:** TechSpace

**Application Category / Topic:** Booking System (shared equipment reservations)

**Main Purpose:** TechSpace lets students of a university co-working space see
what equipment is available, book it for a period from one date to another, and
keep track of their reservations. Any user can also add their own equipment to
the catalog (for example a personal laptop or game controller they are willing
to share), so the catalog does not depend on a single administrator.

## 2. User Access & Permissions

### Guest (Not Authenticated)

- **Available pages / routes:** `/` (home), `/equipment` (catalog),
  `/equipment/:id` (details), `/login`, `/register`.
- **Public data shown:** the full equipment catalog (name, code, category,
  specs, photo, status available/booked) and counters of available and booked
  items.
- The **Book** ("Резервирай") and **Add equipment** ("+ Добави техника")
  buttons are visible, but for a guest they open a login/register modal
  instead of performing the action.

### Authenticated User

- **Main sections / pages:** `/my-bookings` (my reservations),
  `/my-equipment` (equipment I added), plus everything a guest can access.
- **Details pages:** `/equipment/:id` - equipment details shown in a modal
  window over the catalog.
- **Create / Edit / Delete actions:**
  - reservations: create (`/equipment/:id/book`), edit dates/purpose (modal),
    delete with confirmation - only the author's own reservations;
  - equipment: add (`/equipment/new`) and delete your own equipment while it is
    available. An owner cannot book their own equipment.

## 3. Authentication & Session Handling

### Authentication Flow

1. **When the app loads**, `AuthProvider` calls `supabase.auth.getSession()`.
   Until the answer arrives the app renders nothing, so there is no flicker
   between "guest" and "logged in".
2. **Authentication status** is tracked with
   `supabase.auth.onAuthStateChange(...)`, so a login or logout anywhere in the
   app updates `session` in the context.
3. **On successful login or registration** the form calls `onSuccess`: on the
   `/login` and `/register` pages this redirects to `/`, in the auth modal it
   closes the modal. Registration signs the user in directly (email
   confirmation is disabled in Supabase).
4. **On logout** the **Logout** ("Изход") button calls
   `supabase.auth.signOut()`. The session becomes `null` and the route guards
   redirect private pages to `/login`.

### Session Persistence

The session is stored by the Supabase SDK in `localStorage`. After a page
refresh `getSession()` restores it and the user stays logged in. The state is
shared through `AuthContext` (`session`, `user`, `loading`, `signOut`).

## 4. Routing Structure

### Route Guards Logic

- **`GuestRoute`** - only for unauthenticated users. A logged-in user who opens
  `/login` or `/register` is redirected to `/`.
- **`PrivateRoute`** - only for authenticated users. A guest who opens a
  private page is redirected to `/login`.
- The catalog and details are public, so a guest can browse the equipment.

Both guards are layout routes that render `<Outlet />` when their condition is
met.

### Main Routes

| Route | Page | Access |
|---|---|---|
| `/` | Home | everyone |
| `/equipment` | Catalog | everyone |
| `/equipment/:id` | Details (nested route) | everyone |
| `/login`, `/register` | Login, Register | guests only |
| `/equipment/new` | Add equipment | logged in only |
| `/equipment/:id/book` | New reservation | logged in only |
| `/my-bookings` | My reservations | logged in only |
| `/my-equipment` | My equipment | logged in only |

In total: 8 pages and 9 routes.

### Nested & Parameterized Routes

- **Nested route:** `/equipment/:id` is a child of `/equipment`. The catalog
  (`Equipment`) stays mounted and the details are rendered through `<Outlet />`
  as a modal over it. Opening and closing the modal therefore does not reload
  the list and does not lose the selected category.
- **URL parameters:** `/equipment/:id` and `/equipment/:id/book` (read with
  `useParams()`).

## 5. List → Details Flow

### Catalog / List Page

- Shows equipment cards: photo, code, name, category and status.
- **Category filter** in the sidebar (a row above the catalog on phones) and
  "available / booked" counters.
- Data comes from the `equipment` table in Supabase.

### Details Page

- Navigation is a `<Link>` from the card to `/equipment/<id>`.
- `useParams()` provides `id` and `useEquipmentItem(id)` loads that record.
- The details show photo, code, category, status and specs, with actions that
  depend on the viewer: **Book** for everyone except the owner, and **Delete
  equipment** ("Изтрий техниката") for the owner.
- The page also works when the link is opened directly (Vercel SPA rewrite).

## 6. Data Source & Backend

**Backend Type:** Real backend - **Supabase** (Backend-as-a-Service: Postgres,
Auth and a REST API used through the JS SDK). There is no custom server to
deploy. The database is hosted and data persists between visits.

Tables:

- `equipment` - `id`, `code` (generated `EQ-xxx`), `name`, `category`, `specs`,
  `status`, `image_url`, `owner_id`
- `bookings` - `id`, `equipment_id`, `user_id`, `start_date`, `end_date`,
  `purpose`
- `profiles` - user profile, created by a trigger on registration

Authorization is enforced in the database with **Row Level Security**:
reservations can be read, changed and deleted only by their author, and
equipment can be added and deleted only by its owner. The policies are in
`supabase/schema.sql`.

## 7. Data Operations (CRUD)

The main collection with full CRUD is **`bookings`** (reservations).

### Create (POST)

From the details of an available item the user presses **Book** and fills in
`/equipment/:id/book` (start date, end date, purpose). `useCreateBooking`
inserts into `bookings` and sets the equipment status to `booked`. On success
the user is redirected to `/my-bookings`. In the same way `useCreateEquipment`
adds new equipment from `/equipment/new`.

### Read (GET)

- Catalog: `useEquipment` (select from `equipment`, ordered by code).
- Details: `useEquipmentItem(id)`.
- Reservations: `useMyBooking` - only the current user's (via RLS), joined with
  the related equipment, with a status computed from the dates: Upcoming /
  Active / Completed.
- My equipment: `useMyEquipment` with the filter `owner_id = user.id`.

### Update (PUT/PATCH)

The author presses the pencil icon on a reservation and edits the dates and
purpose in a modal (`UpdateModal`) pre-filled with the current values.
`useUpdateBooking` performs the `update`, and the list is updated immediately
through `setBooking`, without refetching.

### Delete

- **Reservation:** the trash icon opens a confirmation ("Сигурен ли си?"). After
  the `delete` the row disappears from the list and the equipment becomes
  available again.
- **Equipment:** the owner deletes it from the details, but only while it is
  available (otherwise other users' reservations would be removed with it). The
  catalog updates immediately through a function passed via
  `<Outlet context>`.

## 8. Forms & Validation

### Forms Used

- Login (`LoginForm`) and Register (`RegisterForm`) - on pages and in a modal
- New reservation (`NewBooking`), edit reservation (`UpdateModal`)
- Add equipment (`NewEquipment`)

All fields are **controlled inputs** (`value` + `onChange`), and forms are
submitted with `onSubmit` and `e.preventDefault()`.

### Validation Rules

- **Password (register):** required, at least 6 characters, and must match
  "Confirm password".
- **Email:** required and in a valid format (`type="email"`).
- **Reservation dates:** both required, the end date cannot be before the start
  date, and the start date cannot be in the past (on create).
- **Equipment name:** required, 2-80 characters (after `trim`).
- **Category:** a required selection from the list.
- **Specs:** up to 300 characters.
- **Image link (optional):** if filled in, it must start with `http://` or
  `https://`.

Errors are shown under the form (`role="alert"`), and the submit button is
disabled while a request is in progress.

## 9. React-Specific Techniques

### Hooks & Component Lifecycle

- **`useState`** - form state, filters, open modals.
- **`useEffect`** - loading data inside hooks.
- **Custom hooks** in `src/hooks/`: `useEquipment`, `useCreateEquipment`,
  `useDeleteEquipment`, `useEquipmentItem`, `useMyEquipment`, `useMyBooking`,
  `useCreateBooking`, `useUpdateBooking`, `useDeleteBooking`. They hold all
  communication with Supabase and return `loading` and `error`.
- **Mount / update / unmount:**
  - *mount* - when the catalog opens, `useEquipment` loads the list;
  - *update* - when `id` in the URL changes, `useEquipmentItem` (which has
    `[id]` in its dependencies) loads the new item;
  - *unmount* - `AuthProvider` returns a cleanup function that unsubscribes the
    `onAuthStateChange` listener.

### Context API

- **`AuthContext`** - `session`, `user`, `loading`, `signOut`. Consumed by
  `Navbar`, the route guards, the details and booking pages, and hooks.
- **`AuthModalContext`** - whether the global login/register modal is open and
  which tab is active. Consumed by `AuthModal`, the catalog and the details.

The context objects and their hooks live in separate files (`auth-context.js`)
and the providers in `.jsx` files, so that Fast Refresh keeps working.

### Component Styling

External CSS files in `src/styles/` (`tokens.css` with variables, `layout.css`,
`equipment.css`, `forms.css`, `modal.css`). The layout is responsive: on a phone
the menu becomes a hamburger, and filters, rows and grids reflow.

## 10. Typical User Flow

**As a guest**

1. Open **Catalog** ("Каталог") and filter by category.
2. Click an item - its details open in a window over the catalog.
3. Press **Book** - a login/register modal appears.

**Registration, booking, own equipment**

1. Create an account (email and a password of at least 6 characters) - you are
   signed in automatically.
2. Open an available item, press **Book**, and choose dates and a purpose.
3. In **My reservations** ("Моите резервации") you see the new reservation with
   its status; you can edit it (pencil) or delete it (trash, with
   confirmation). After deleting, the equipment is available again.
4. From **Catalog → Add equipment** enter a name, category, specs and
   optionally an image link.
5. In **My equipment** ("Моята техника") you see only what you added. From the
   details you can delete it while it is available.
6. Try opening `/login` while signed in - you are sent back to `/`. Log out
   with **Logout**; your reservations are not visible from another account.

## 11. Error & Edge Case Handling

- **Authentication errors:** a wrong password, an already registered email and
  similar cases show the Supabase message under the form. Short or mismatching
  passwords are caught before any request. Private pages without a login
  redirect to `/login`.
- **Network or data errors:** every hook keeps `loading` and `error` state;
  pages show a loading message and an error message instead of crashing.
  Buttons are disabled while submitting to prevent duplicate requests.
- **Empty or missing data states:** "no reservations yet", "you have not added
  any equipment yet", "equipment not found" (invalid `id`), and "not available
  for booking".
- **Silent failure guard:** deleting equipment checks how many rows were
  deleted, because when Row Level Security rejects a delete the database
  returns no error, only 0 rows.

**Known limitations**

- The equipment status (available/booked) is a flag changed when a reservation
  is created or deleted. It is not computed from the dates.
- A user cannot edit equipment they added, only delete it.
- The database runs on the free Supabase plan, which pauses projects after
  about a week without activity. A scheduled GitHub Actions workflow
  (`.github/workflows/keep-alive.yml`) sends a small request three times a week
  to keep it active. If the app ever fails to load data, the project can be
  restored from the Supabase dashboard.

---

# Local Setup

### 1. Clone the repository and install dependencies

```bash
git clone https://github.com/YanislavD/techspace.git
cd techspace
npm install
```

### 2. Create a Supabase project

- Sign up at [supabase.com](https://supabase.com) and create a new project.
- From **Settings → API** copy the **Project URL** and the **anon/publishable
  key**.
- Under **Authentication → Providers → Email** turn off "Confirm email" so you
  are signed in right after registering.

### 3. Configure environment variables

Copy `.env.example` to `.env` and fill in the real values:

```bash
cp .env.example .env
```

```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Create the database tables

In the Supabase dashboard → **SQL Editor**, run in order:

1. `supabase/schema.sql` - tables, triggers, RLS policies
2. `supabase/seed.sql` - sample catalog data

(`add_user_equipment.sql`, `add_images.sql` and `fix_*.sql` are migrations only
for a database created with an older version of the schema; they are not needed
for a fresh database.)

### 5. Start the dev server

```bash
npm run dev
```

The app runs at `http://localhost:5173`. Other commands: `npm run build`
(production build) and `npm run lint`.

---

# Architecture & Structure

```
src/
  components/   # reusable UI components (Navbar, AuthModal, EquipmentCard,
                # StatusBadge, Booking, UpdateModal, LoginForm, RegisterForm)
  pages/        # route pages (Home, Equipment, EquipmentDetails, NewEquipment,
                # MyEquipment, NewBooking, MyBookings, Login, Register)
  context/      # AuthContext and AuthModalContext (providers in .jsx, context
                # objects and hooks in auth-*.js)
  routes/       # PrivateRoute / GuestRoute route guards
  hooks/        # custom hooks - all communication with Supabase
  lib/          # Supabase client, category helpers
  styles/       # external CSS files
supabase/
  schema.sql    # data model + RLS policies (for a fresh database)
  seed.sql      # sample catalog data
  *.sql         # migrations for an already existing database
```

**How the layers connect:** a page renders the UI and calls a custom hook; the
hook talks to Supabase through the shared client in `lib/supabaseClient.js` and
returns `data`, `loading` and `error`. The user's identity comes from
`AuthContext`, and what the user may do in the database is decided by the RLS
policies, not only by the interface.

**Key architectural decisions**

- **Details are a nested route over the catalog**, not a separate page:
  records are small, and this way the catalog is not reloaded and the filter is
  kept. The URL stays real (`/equipment/:id`).
- **The auth modal is a separate context** from `AuthContext`, because it is UI
  state, not identity. While it is open the details window hides itself so the
  two do not stack.
- **Authorization lives in the database (RLS)**, not only in React: hiding a
  button is a convenience, the protection is in the policies.
- **The equipment code** is generated by a database sequence (`EQ-100`,
  `EQ-101`, ...), so it is unique regardless of the client.

## Development Status

- [x] Routing, nested routes and route guards (`PrivateRoute`, `GuestRoute`)
- [x] Authentication (Register, Login, Logout) with Supabase Auth
- [x] `AuthContext` and `AuthModalContext`
- [x] Catalog + details (real fetch, URL parameters)
- [x] Full CRUD for reservations, author-only through RLS
- [x] Add and delete your own equipment, "My equipment" page
- [x] Responsive layout for phones
- [x] Frontend deployed ([techspace-nine.vercel.app](https://techspace-nine.vercel.app/))
