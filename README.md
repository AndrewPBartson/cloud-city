# 📚 Cloud City Movie Showcase — built with React & Redux

## 🌠 Andrew Patrick Bartson - 2025

Welcome to the _Cloud-City-Movies-Showcase_ app — a demo storefront built in React and Redux Toolkit for checking out movies, new and old, complete with search, sorting, cart, and checkout features.

This project was built as part of Frontend Simplified coding curriculum. The original concept was to build a demo storefront for books, which then evolved into a demo storefront for movies.

---

## ✨ Features

- 🔍 **Live Search & Filter UI**

  - Search movies by title
  - Sort by rating, price, year, and more
  - Filter by genre or awards
  - Real-time search input bound to Redux state
  - Automatic display of “no results” message and imagery

- 💸 **Fake Price System**

  - Prices generated dynamically from IMDb vote counts
  - Full price is algorithmically scaled from vote popularity
  - Sale prices randomly assigned to 60% of items (at fetch time)

- 🛒 **Cart Functionality**

  - Add and remove items with quantity control
  - Cart summary updates instantly
  - Cart icon in NavBar shows total quantity
  - All cart math is selector-driven (no redundant state)

- 🧱 **Skeleton Loading Experience**

  - Custom skeleton components prevent layout shift
  - Smooth transition from loading → content

- 📭 **No Results UX**

  - Stylish “no_results.jpg” image and message when a search yields nothing
  - Image and message load together to avoid flickering

- 📦 **Checkout System (Demo Mode)**

  - View cart items and total cost
  - Display toast: “Demo only! Not taking orders!”

- 🌐 **Routing**
  - Routes include `/media`, `/media/:id`, `/cart`, and `/checkout`
  - URL-friendly item IDs generated from movie titles and IMDb IDs

---

## 🧠 Challenges Overcome

- 🧩 **Rescaling IMDb vote data into plausible storefront prices**
- 🧮 **Replacing duplicated item state with ID-based lookups using Redux selectors**
- ⚖️ **Keeping `salePrice` logic random yet deterministic**
- 🔄 **Fixing edge cases where “no results” UI flashed briefly before real content**
- 💥 **Preventing UI from jumping during state transitions by controlling `status` values explicitly**
- 💬 **Keeping the user informed through toasts, feedback messages, and dynamic cart badges**

---

## 🛠️ Built With

- [React](https://reactjs.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Router](https://reactrouter.com/)
- [React Toastify](https://fkhadra.github.io/react-toastify/)
- Custom CSS for all layout and component styling

---

## 🔮 Future Ideas

- Save cart to localStorage
- Add genre filtering from live data
- Replace IMDb API with a movie-book hybrid API (for fun)
- Animate transitions between routes
- Fully rename all “book” references to “item” or “media”

---

## 🙏 Special Thanks

To Nova (AI wingman) for clarity and code ideas, and to open-source culture for making web development fun.

---
