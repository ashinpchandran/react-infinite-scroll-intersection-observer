# react-infinite-scroll-intersection-observer

An elegant, highly-performant **Infinite Scrolling** application built with React and the native browser **Intersection Observer API**, utilizing data from the JSONPlaceholder API. 

This project demonstrates a production-ready implementation of infinite scroll without relying on heavy external third-party packages or resource-intensive window scroll listeners.

---

## 🚀 Features

- **Asynchronous Performance:** Uses `IntersectionObserver` to offload scroll detection away from the browser's main thread.
- **Duplicate Prevention:** Features robust defensive state mapping via JavaScript `Set` lookups to eliminate duplicate key errors—even when running under `React.StrictMode`.
- **Pre-fetching UX:** Includes an advanced configuration using `rootMargin` so content loads seamlessly 20px before the user completely hits the bottom of the visible screen.
- **Clean Lifecycle Architecture:** Handles edge cases gracefully, such as clearing active observers upon component unmount to prevent severe memory leaks.

---

## 🛠️ Tech Stack

- **Frontend:** React 18+
- **Hooks Utilized:** `useState`, `useEffect`, `useRef`, `useCallback`
- **Data Source:** JSONPlaceholder (mock `/posts` endpoint)
- **Styling:** CSS3

---

## 📖 How It Works Under the Hood

Instead of attaching a heavy listener to the window `scroll` event (which triggers rapidly hundreds of times and degrades UI performance), this project sets up an observer targeting an invisible `<div>` anchored at the bottom of the post list. 

```text
[ Post Item #1 ]
[ Post Item #2 ]
       ...
[ Post Item #10 ]
=========================  Viewport Bottom Boundary (+20px Margin)
[ Target Loading Div ]    <-- Element tracked by IntersectionObserver
