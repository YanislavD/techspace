# TechSpace

Co-working/университетско пространство за резервация на техника (лаптопи,
монитори, VR очила, проектори и т.н.). Членове разглеждат каталог с техника
и правят резервации за определени дати.

Изпитен React проект.

## 🔗 Live Demo

**[тук ще е линкът към deploy-натото приложение]**

Не е нужна никаква инсталация или Supabase setup, за да се разгледа и тества
проектът — приложението е вече deploy-нато и свързано с реална Supabase база
данни. Просто отвори линка. За тестови данни и стъпки виж **Functional
Guide** по-долу.

## Технологии

- **React** (Vite)
- **React Router** — client-side routing, route guards
- **Supabase** — Auth + Postgres база данни + JS SDK (реален remote service,
  без hardcoded данни)
- Външни CSS файлове (без CSS-in-JS)

## Functional Guide

_Ще бъде попълнен, след като функционалността е завършена — стъпка по
стъпка какво може да се тества в живото приложение (регистрация, разглеждане
на каталог, резервация, коментари и т.н.)._

## Статус на разработката

Проектът е в процес на разработка. Към момента:

- [x] Routing + route guards (`PrivateRoute`, `GuestRoute`)
- [x] Автентикация (Register, Login, Logout) през Supabase Auth
- [x] `AuthContext` — консистентно auth състояние в цялото приложение
- [x] Equipment каталог + Details страница (реален fetch от база, URL параметри)
- [x] Създаване на резервация (Create booking) + синхронизация на статуса на техниката
- [ ] Преглед, редакция и изтриване на резервации (My Bookings)
- [ ] Коментари към техниката
- [ ] Пълно стилизиране по design system-а
- [ ] Deploy на frontend-а

## Локално стартиране (по избор — само ако искаш да пуснеш кода сам)

Ревюиращият **не трябва** да прави това — то е само за разработка/преглед на
кода на локална машина.

### 1. Клонирай репото и инсталирай зависимостите

```bash
git clone https://github.com/YanislavD/techspace.git
cd techspace
npm install
```

### 2. Създай Supabase проект

- Регистрирай се в [supabase.com](https://supabase.com) и създай нов проект.
- От **Settings → API** вземи **Project URL** и **anon/publishable key**.

### 3. Настрой environment променливите

Копирай `.env.example` в `.env` и попълни реалните стойности:

```bash
cp .env.example .env
```

```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Създай таблиците в базата

В Supabase dashboard → **SQL Editor**, изпълни поред:

1. `supabase/schema.sql` — таблици, тригери, RLS policies
2. `supabase/seed.sql` — примерни данни за каталога с техника

### 5. Стартирай dev сървъра

```bash
npm run dev
```

Приложението тръгва на `http://localhost:5173`.

## Структура на проекта

```
src/
  components/   # преизползваеми UI компоненти (Navbar, EquipmentCard, StatusBadge)
  pages/        # страници, свързани с route-ите
  context/      # AuthContext — споделено auth състояние
  routes/       # PrivateRoute / GuestRoute route guards
  lib/          # Supabase клиент, помощни функции
  hooks/        # custom hooks за комуникация със Supabase (CRUD логика)
  styles/       # външни CSS файлове
supabase/
  schema.sql    # data модел + RLS policies
  seed.sql      # примерни данни за equipment каталога
```
