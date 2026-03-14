import { useState, useEffect } from "react";
import Upload from "./components/Upload";
import Showcase from "./components/Showcase";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body, #root { height: 100%; background: #f8faff; }

  .app-nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 200;
    background: rgba(255,255,255,0.9); backdrop-filter: blur(12px);
    border-bottom: 1px solid #e2e8f0;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 48px; height: 60px;
    box-shadow: 0 1px 0 #e2e8f0, 0 2px 12px rgba(37,99,235,.06);
  }

  .app-brand {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.45rem; font-weight: 600; color: #2563eb;
    letter-spacing: -.01em; cursor: pointer;
    display: flex; align-items: center; gap: 8px;
    user-select: none;
  }
  .app-brand-dot { width: 8px; height: 8px; border-radius: 50%; background: #2563eb; }

  .app-links { display: flex; gap: 4px; }

  .app-link {
    background: transparent; color: #64748b;
    font-family: 'DM Sans', sans-serif; font-size: .8rem;
    letter-spacing: .08em; text-transform: uppercase;
    padding: 7px 18px; border-radius: 100px;
    transition: all .2s; display: flex; align-items: center; gap: 6px;
  }
  .app-link:hover { background: #eff6ff; color: #2563eb; }
  .app-link--on {
    background: #2563eb; color: #fff;
    box-shadow: 0 2px 8px rgba(37,99,235,.25);
  }
  .app-link--on:hover { background: #1d4ed8; color: #fff; }

  .app-page { padding-top: 60px; min-height: 100vh; }

  @keyframes app-fade { from { opacity: 0; } to { opacity: 1; } }
  .app-page--in { animation: app-fade .22s ease; }

  @media (max-width: 600px) {
    .app-nav { padding: 0 16px; }
    .app-link { padding: 6px 12px; font-size: .72rem; }
  }
`;

function injectNav() {
  if (document.getElementById("app-nav-css")) return;
  const s = document.createElement("style"); s.id = "app-nav-css"; s.textContent = CSS;
  document.head.appendChild(s);
}

const getPage = () => {
  const h = window.location.hash.replace("#", "");
  return ["showcase", "upload"].includes(h) ? h : "showcase";
};

export default function App() {
  useEffect(() => { injectNav(); }, []);
  const [page, setPage] = useState(getPage);
  const [anim, setAnim] = useState(false);

  useEffect(() => {
    const fn = () => { const p = getPage(); if (p !== page) go(p, true); };
    window.addEventListener("hashchange", fn);
    return () => window.removeEventListener("hashchange", fn);
  }, [page]);

  const go = (target, fromHash = false) => {
    if (target === page) return;
    setAnim(true);
    setPage(target);
    if (!fromHash) window.location.hash = target;
    setTimeout(() => setAnim(false), 300);
  };

  const links = [
    { id: "showcase", label: "Showcase", icon: "✦" },
    { id: "upload",   label: "Upload",   icon: "⬆" },
  ];

  return (
    <>
      <nav className="app-nav">
        <div className="app-brand" onClick={() => go("showcase")}>
          <div className="app-brand-dot" />
          MyPortfolio
        </div>
        <div className="app-links">
          {links.map(({ id, label, icon }) => (
            <button key={id} className={`app-link${page === id ? " app-link--on" : ""}`} onClick={() => go(id)}>
              {icon} {label}
            </button>
          ))}
        </div>
      </nav>
      <div className={`app-page${anim ? " app-page--in" : ""}`}>
        {page === "showcase" && <Showcase />}
        {page === "upload"   && <Upload />}
      </div>
    </>
  );
}