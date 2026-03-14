import { useState, useEffect } from "react";

export const STORAGE_KEY = "showcase_items";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');

  .sh{--blue:#2563eb;--blue-lt:#eff6ff;--blue-md:#bfdbfe;--blue-dk:#1d4ed8;
      --text:#0f172a;--muted:#64748b;--border:#e2e8f0;--white:#fff;
      --sh:0 1px 3px rgba(37,99,235,.07),0 4px 16px rgba(37,99,235,.06);
      --sh2:0 4px 12px rgba(37,99,235,.14),0 12px 32px rgba(37,99,235,.10);
      min-height:100vh;background:#f8faff;color:var(--text);
      font-family:'DM Sans',sans-serif;font-weight:300;-webkit-font-smoothing:antialiased;}
  .sh h1,.sh h2,.sh h3{font-family:'Cormorant Garamond',serif;}
  .sh button{cursor:pointer;border:none;outline:none;font-family:'DM Sans',sans-serif;}
  .sh ::-webkit-scrollbar{width:4px;}
  .sh ::-webkit-scrollbar-thumb{background:var(--blue-md);border-radius:2px;}

  @keyframes sh-up  {from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
  @keyframes sh-in  {from{opacity:0}to{opacity:1}}
  @keyframes sh-pop {0%{transform:scale(.96);opacity:0}100%{transform:scale(1);opacity:1}}

  /* Header */
  .sh-hdr{background:var(--white);border-bottom:1px solid var(--border);padding:0 48px;
          display:flex;align-items:center;justify-content:space-between;height:60px;
          box-shadow:0 1px 0 var(--border),0 2px 8px rgba(37,99,235,.04);}
  .sh-brand{font-family:'Cormorant Garamond',serif;font-size:1.5rem;font-weight:600;color:var(--blue);
            letter-spacing:-.01em;display:flex;align-items:center;gap:8px;}
  .sh-dot{width:8px;height:8px;border-radius:50%;background:var(--blue);}
  .sh-cnt{font-size:.75rem;letter-spacing:.1em;color:var(--muted);background:var(--blue-lt);
          border:1px solid var(--blue-md);padding:3px 12px;border-radius:100px;}

  /* Filters */
  .sh-flt{display:flex;gap:6px;padding:28px 48px 0;animation:sh-in .4s ease;flex-wrap:wrap;}
  .sh-fb{background:var(--white);border:1px solid var(--border);color:var(--muted);padding:5px 16px;
         border-radius:100px;font-size:.75rem;letter-spacing:.06em;transition:all .2s;}
  .sh-fb:hover{border-color:var(--blue);color:var(--blue);}
  .sh-fb--on{background:var(--blue);border-color:var(--blue);color:#fff;font-weight:500;}

  /* Timeline */
  .sh-tl{position:relative;max-width:860px;margin:0 auto;padding:48px 0 100px;}
  .sh-spine{position:absolute;top:0;bottom:0;left:50%;transform:translateX(-50%);
            width:2px;background:linear-gradient(to bottom,transparent,var(--blue-md) 4%,var(--blue-md) 96%,transparent);}

  /* Arrow */
  .sh-arrow{display:flex;justify-content:center;position:relative;z-index:2;margin:2px 0;}
  .sh-arr-wrap{display:flex;flex-direction:column;align-items:center;}
  .sh-arr-line{width:2px;height:26px;background:var(--blue);}
  .sh-arr-head{border-left:6px solid transparent;border-right:6px solid transparent;border-top:9px solid var(--blue);}

  /* Row */
  .sh-row{display:flex;align-items:flex-start;position:relative;z-index:1;
          animation:sh-up .5s ease both;padding:0 calc(50% + 24px) 0 0;}
  .sh-row--r{flex-direction:row-reverse;padding:0 0 0 calc(50% + 24px);}

  .sh-node{position:absolute;left:50%;transform:translateX(-50%);top:24px;z-index:3;
           width:14px;height:14px;border-radius:50%;background:var(--blue);
           border:3px solid var(--white);box-shadow:0 0 0 2px var(--blue);}

  /* Card */
  .sh-card{background:var(--white);border:1px solid var(--border);border-radius:14px;
           box-shadow:var(--sh);overflow:hidden;width:100%;cursor:pointer;
           transition:box-shadow .25s,transform .25s,border-color .25s;}
  .sh-card:hover{box-shadow:var(--sh2);transform:translateY(-3px);border-color:var(--blue-md);}

  .sh-img-wrap{position:relative;overflow:hidden;}
  .sh-img{width:100%;height:175px;object-fit:cover;display:block;transition:transform .4s ease;}
  .sh-card:hover .sh-img{transform:scale(1.04);}
  .sh-img-ov{position:absolute;inset:0;background:linear-gradient(to top,rgba(37,99,235,.18),transparent 55%);}

  .sh-pdf-top{height:110px;display:flex;flex-direction:column;align-items:center;justify-content:center;
              gap:6px;background:var(--blue-lt);border-bottom:1px solid var(--blue-md);}
  .sh-pdf-ic{font-size:2.2rem;}
  .sh-pdf-lb{font-size:.62rem;letter-spacing:.14em;color:var(--blue);font-weight:500;text-transform:uppercase;}

  .sh-note-top{background:linear-gradient(135deg,var(--blue-lt),#f0f9ff);
               border-bottom:1px solid var(--blue-md);padding:18px 20px;min-height:72px;
               display:flex;align-items:flex-start;}
  .sh-note-prev{font-size:.84rem;color:var(--blue-dk);line-height:1.7;
                display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;}

  .sh-card-body{padding:14px 16px 16px;}
  .sh-tag{font-size:.6rem;letter-spacing:.14em;text-transform:uppercase;color:var(--blue);font-weight:500;margin-bottom:4px;}
  .sh-title{font-family:'Cormorant Garamond',serif;font-size:1.12rem;font-weight:600;
            line-height:1.3;color:var(--text);margin-bottom:4px;}
  .sh-desc{font-size:.8rem;color:var(--muted);line-height:1.6;
           display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;margin-bottom:10px;}
  .sh-card-ft{display:flex;align-items:center;justify-content:space-between;}
  .sh-date{font-size:.67rem;color:var(--muted);}
  .sh-view{font-size:.7rem;color:var(--blue);letter-spacing:.06em;opacity:0;transition:opacity .2s;}
  .sh-card:hover .sh-view{opacity:1;}
  .sh-del{background:transparent;color:#cbd5e1;font-size:.7rem;padding:2px 6px;border-radius:4px;transition:all .2s;}
  .sh-del:hover{color:#ef4444;background:#fef2f2;}

  /* Date label beside spine */
  .sh-datelabel{font-size:.65rem;color:var(--muted);white-space:nowrap;
                position:absolute;top:27px;}
  .sh-row .sh-datelabel{left:calc(50% + 22px);}
  .sh-row--r .sh-datelabel{right:calc(50% + 22px);left:auto;text-align:right;}

  /* Empty */
  .sh-empty{text-align:center;padding:100px 24px;animation:sh-in .5s ease;}
  .sh-empty-ic{font-size:3rem;margin-bottom:16px;opacity:.25;}
  .sh-empty p{color:var(--muted);font-size:.95rem;line-height:1.9;}
  .sh-hint{display:inline-block;margin-top:14px;background:var(--blue-lt);border:1px solid var(--blue-md);
           color:var(--blue);font-size:.75rem;padding:7px 18px;border-radius:100px;}

  /* Modal */
  .sh-back{position:fixed;inset:0;background:rgba(15,23,42,.65);z-index:999;
           display:flex;align-items:center;justify-content:center;padding:24px;
           animation:sh-in .2s ease;backdrop-filter:blur(6px);}
  .sh-modal{background:var(--white);border-radius:16px;max-width:820px;width:100%;
            max-height:90vh;display:flex;flex-direction:column;animation:sh-pop .25s ease;
            overflow:hidden;box-shadow:0 20px 60px rgba(37,99,235,.2);}
  .sh-mhdr{padding:20px 24px 18px;border-bottom:1px solid var(--border);
           display:flex;justify-content:space-between;align-items:flex-start;gap:12px;}
  .sh-mtag{font-size:.6rem;letter-spacing:.14em;text-transform:uppercase;color:var(--blue);font-weight:500;margin-bottom:4px;}
  .sh-mtitle{font-family:'Cormorant Garamond',serif;font-size:1.5rem;font-weight:600;line-height:1.2;}
  .sh-mdate{font-size:.7rem;color:var(--muted);margin-top:4px;}
  .sh-mbtns{display:flex;gap:8px;flex-shrink:0;}
  .sh-mclose{background:var(--blue-lt);color:var(--blue);font-size:.82rem;padding:7px 14px;border-radius:8px;transition:background .2s;}
  .sh-mclose:hover{background:var(--blue-md);}
  .sh-mbody{flex:1;overflow:auto;}
  .sh-mimg{width:100%;height:auto;display:block;}
  .sh-mpdf{width:100%;height:65vh;border:none;}
  .sh-mcontent{padding:22px 24px;font-size:.95rem;line-height:1.9;color:var(--text);white-space:pre-wrap;}
  .sh-mclabel{font-size:.65rem;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);margin-bottom:8px;}

  /* Toast */
  .sh-toast{position:fixed;bottom:24px;right:24px;background:var(--white);border:1px solid var(--border);
            color:var(--text);padding:10px 20px;border-radius:10px;font-size:.82rem;
            z-index:9999;animation:sh-pop .3s ease;box-shadow:var(--sh);}
  .sh-toast--info{border-left:3px solid var(--blue);}
  .sh-toast--error{border-left:3px solid #ef4444;}

  @media(max-width:680px){
    .sh-hdr{padding:0 18px;}
    .sh-flt{padding:18px 18px 0;}
    .sh-tl{padding:28px 18px 60px;}
    .sh-spine,.sh-node,.sh-datelabel{display:none;}
    .sh-row,.sh-row--r{padding:0!important;flex-direction:column;}
  }
`;

function inject() {
  if (document.getElementById("sh-css")) return;
  const s = document.createElement("style"); s.id = "sh-css"; s.textContent = CSS;
  document.head.appendChild(s);
}

export default function Showcase() {
  useEffect(() => { inject(); }, []);
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("all");
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState(null);

  const load = () => {
    try { const s = localStorage.getItem(STORAGE_KEY); if (s) setItems(JSON.parse(s)); } catch {}
  };
  useEffect(() => {
    load();
    const fn = e => { if (e.key === STORAGE_KEY) load(); };
    const t = setInterval(load, 800);
    window.addEventListener("storage", fn);
    return () => { window.removeEventListener("storage", fn); clearInterval(t); };
  }, []);

  const showToast = (msg, type = "info") => { setToast({ msg, type }); setTimeout(() => setToast(null), 3000); };

  const deleteItem = id => {
    const next = items.filter(i => i.id !== id);
    setItems(next);
    if (modal?.id === id) setModal(null);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
    showToast("Removed.");
  };

  const counts = { image: items.filter(i => i.type === "image").length, pdf: items.filter(i => i.type === "pdf").length, note: items.filter(i => i.type === "note").length };
  const filtered = filter === "all" ? items : items.filter(i => i.type === filter);
  // Stored newest-first → reverse to show oldest top, newest bottom
  const displayed = [...filtered].reverse();

  return (
    <div className="sh">
      <header className="sh-hdr">
        <div className="sh-brand"><div className="sh-dot" />Showcase</div>
        {items.length > 0 && <span className="sh-cnt">{items.length} {items.length === 1 ? "entry" : "entries"}</span>}
      </header>

      {items.length > 0 && (
        <div className="sh-flt">
          {[["all",`All (${items.length})`],["image",`Images (${counts.image})`],["pdf",`PDFs (${counts.pdf})`],["note",`Notes (${counts.note})`]].map(([v,l]) => (
            <button key={v} className={`sh-fb${filter===v?" sh-fb--on":""}`} onClick={() => setFilter(v)}>{l}</button>
          ))}
        </div>
      )}

      <div className="sh-tl">
        {displayed.length === 0 ? (
          <div className="sh-empty">
            <div className="sh-empty-ic">◈</div>
            <p>{items.length === 0 ? <>Nothing here yet.<br/>Upload to begin.</> : `No ${filter}s yet.`}</p>
            <span className="sh-hint">Go to Upload →</span>
          </div>
        ) : (
          <>
            <div className="sh-spine" />
            {displayed.map((item, i) => {
              const isRight = i % 2 !== 0;
              return (
                <div key={item.id}>
                  {i > 0 && (
                    <div className="sh-arrow">
                      <div className="sh-arr-wrap">
                        <div className="sh-arr-line" />
                        <div className="sh-arr-head" />
                      </div>
                    </div>
                  )}
                  <div className={`sh-row${isRight ? " sh-row--r" : ""}`} style={{ animationDelay: `${i * 55}ms` }}>
                    <div className="sh-node" />
                    <span className="sh-datelabel">{item.date}</span>
                    <div className="sh-card" onClick={() => setModal(item)}>
                      {item.type === "image" && (
                        <div className="sh-img-wrap">
                          <img src={item.data} alt={item.title || item.name} className="sh-img" />
                          <div className="sh-img-ov" />
                        </div>
                      )}
                      {item.type === "pdf" && (
                        <div className="sh-pdf-top"><span className="sh-pdf-ic">📄</span><span className="sh-pdf-lb">PDF Document</span></div>
                      )}
                      {item.type === "note" && (
                        <div className="sh-note-top"><p className="sh-note-prev">{item.content || item.data}</p></div>
                      )}
                      <div className="sh-card-body">
                        <div className="sh-tag">{item.type}</div>
                        <div className="sh-title">{item.title || item.name}</div>
                        {(item.content || item.description) && item.type !== "note" && (
                          <p className="sh-desc">{item.description || item.content}</p>
                        )}
                        <div className="sh-card-ft">
                          <span className="sh-date">{item.date}</span>
                          <div style={{display:"flex",gap:8,alignItems:"center"}}>
                            <span className="sh-view">View →</span>
                            <button className="sh-del" onClick={e => { e.stopPropagation(); deleteItem(item.id); }}>✕</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>

      {modal && (
        <div className="sh-back" onClick={() => setModal(null)}>
          <div className="sh-modal" onClick={e => e.stopPropagation()}>
            <div className="sh-mhdr">
              <div>
                <div className="sh-mtag">{modal.type}</div>
                <h2 className="sh-mtitle">{modal.title || modal.name}</h2>
                <div className="sh-mdate">{modal.date}</div>
              </div>
              <div className="sh-mbtns">
                <button className="sh-del" onClick={() => deleteItem(modal.id)}>Delete</button>
                <button className="sh-mclose" onClick={() => setModal(null)}>✕ Close</button>
              </div>
            </div>
            <div className="sh-mbody">
              {modal.type === "image" && <img src={modal.data} alt={modal.title || modal.name} className="sh-mimg" />}
              {modal.type === "pdf"   && <iframe src={modal.data} title={modal.title || modal.name} className="sh-mpdf" />}
              {(modal.content || modal.description || (modal.type === "note" && modal.data)) && (
                <div className="sh-mcontent">
                  <div className="sh-mclabel">{modal.type === "note" ? "Note" : "Description"}</div>
                  {modal.description || modal.content || modal.data}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {toast && <div className={`sh-toast sh-toast--${toast.type}`}>{toast.msg}</div>}
    </div>
  );
}