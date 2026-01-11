import { useEffect } from "react";
import { useAppSelector } from "./store/hooks";
import ThemeToggle from "./components/ui/ThemeToggle";

function App() {
  const mode = useAppSelector((state) => state.theme.mode);

  // Sync the html class with the Redux state
  useEffect(() => {
    document.documentElement.classList.toggle("dark", mode === "dark");
  }, [mode]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-main-bg">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-black text-primary tracking-tighter mb-4">
          DIVY PORTFOLIO
        </h1>
        <p className="text-secondary font-medium">
          Frontend Developer & Algorithm Enthusiast
        </p>
      </header>

      {/* Using the new component */}
      <ThemeToggle />

      <section className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 px-4 w-full max-w-4xl">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-48 rounded-3xl border border-border bg-main-bg shadow-xl p-6 flex flex-col justify-end transition-transform hover:-translate-y-2"
          >
            <div className="h-2 w-12 bg-primary rounded-full mb-3" />
            <div className="h-4 w-full bg-border rounded-full" />
          </div>
        ))}
      </section>

      <footer className="mt-20 opacity-30 text-xs font-mono">
        EST. 2026 // BUILT WITH TAILWIND V4
      </footer>
    </main>
  );
}

export default App;
