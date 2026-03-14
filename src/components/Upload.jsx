import { useState, useRef, useEffect } from "react";

export const STORAGE_KEY = "showcase_items";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600&family=DM+Sans:wght@300;400;500&display=swap');

  .up{--blue:#2563eb;--blue-lt:#eff6ff;--blue-md:#bfdbfe;--blue-dk:#1d4ed8;
      --text:#0f172a;--muted:#64748b;--border:#e2e8f0;--white:#fff;
      --sh:0 1px 3px rgba(37,99,235,.07),0 4px 16px rgba(37,99,235,.06);
      --sh2:0 4px 20px rgba(37,99,235,.14);
      min-height:100vh;background:#f8faff;color:var(--text);
      font-family:'DM Sans',sans-serif;font-weight:300;-webkit-font-smoothing:antialiased;}
  .up h1,.up h2{font-family:'Cormorant Garamond',serif;}
  .up button{cursor:pointer;border:none;outline:none;font-family:'DM Sans',sans-serif;}
  .up input,.up textarea{font-family:'DM Sans',sans-serif;outline:none;}
  .up ::-webkit-scrollbar{width:4px;}
  .up ::-webkit-scrollbar-thumb{background:var(--blue-md);border-radius:2px;}

  @keyframes up-up  {from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
  @keyframes up-in  {from{opacity:0}to{opacity:1}}
  @keyframes up-pop {0%{transform:scale(.96);opacity:0}100%{transform:scale(1);opacity:1}}
  @keyframes up-shk {0%,100%{transform:translateX(0)}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}

  /* Header */
  .up-hdr{background:var(--white);border-bottom:1px solid var(--border);padding:0 48px;
          display:flex;align-items:center;justify-content:space-between;height:60px;
          box-shadow:0 1px 0 var(--border),0 2px 8px rgba(37,99,235,.04);}
  .up-brand{font-family:'Cormorant Garamond',serif;font-size:1.5rem;font-weight:600;color:var(--blue);
            letter-spacing:-.01em;display:flex;align-items:center;gap:8px;}
  .up-dot{width:8px;height:8px;border-radius:50%;background:var(--blue);}

  /* Main */
  .up-main{max-width:640px;margin:0 auto;padding:40px 24px 80px;animation:up-up .5s ease both;}

  /* Tabs */
  .up-tabs{display:flex;background:var(--white);border:1px solid var(--border);border-radius:12px;
           overflow:hidden;box-shadow:var(--sh);margin-bottom:28px;}
  .up-tab{flex:1;padding:12px 0;background:transparent;color:var(--muted);font-size:.8rem;
          letter-spacing:.08em;text-transform:uppercase;transition:all .2s;border-right:1px solid var(--border);}
  .up-tab:last-child{border-right:none;}
  .up-tab:hover{background:var(--blue-lt);color:var(--blue);}
  .up-tab--on{background:var(--blue)!important;color:#fff!important;font-weight:500;}

  /* Form card */
  .up-card{background:var(--white);border:1px solid var(--border);border-radius:14px;
           box-shadow:var(--sh);padding:28px;animation:up-in .3s ease;}

  /* Drop zone */
  .up-drop{border:2px dashed var(--border);border-radius:10px;padding:44px 20px;text-align:center;
           cursor:pointer;background:var(--blue-lt);transition:all .25s;margin-bottom:20px;}
  .up-drop:hover,.up-drop--on{border-color:var(--blue);background:#e0edff;}
  .up-drop--err{animation:up-shk .4s ease;border-color:#ef4444;background:#fef2f2;}
  .up-drop-ic{font-size:2.2rem;color:var(--blue);display:block;margin-bottom:10px;transition:transform .3s;}
  .up-drop:hover .up-drop-ic{transform:scale(1.12) translateY(-3px);}
  .up-drop p{font-size:.92rem;color:var(--blue-dk);font-weight:400;margin-bottom:4px;}
  .up-drop-sub{font-size:.75rem;color:var(--muted);}
  .up-types{display:flex;gap:6px;justify-content:center;margin-top:10px;flex-wrap:wrap;}
  .up-chip{background:var(--white);border:1px solid var(--blue-md);color:var(--blue);
           font-size:.65rem;letter-spacing:.1em;padding:2px 10px;border-radius:100px;}

  /* Queue */
  .up-queue{display:flex;flex-direction:column;gap:8px;margin-bottom:20px;}
  .up-qi{display:flex;align-items:center;gap:10px;background:var(--blue-lt);border:1px solid var(--blue-md);
         border-radius:8px;padding:10px 12px;animation:up-pop .25s ease;}
  .up-qi-thumb{width:40px;height:40px;object-fit:cover;border-radius:6px;flex-shrink:0;}
  .up-qi-pdf{width:40px;height:40px;display:flex;align-items:center;justify-content:center;
             font-size:1.4rem;background:var(--white);border:1px solid var(--blue-md);border-radius:6px;flex-shrink:0;}
  .up-qi-info{flex:1;min-width:0;}
  .up-qi-name{font-size:.82rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:var(--text);}
  .up-qi-sz{font-size:.68rem;color:var(--muted);margin-top:1px;}
  .up-qi-del{background:transparent;color:var(--muted);font-size:.75rem;padding:3px 7px;
             border-radius:4px;transition:all .2s;flex-shrink:0;}
  .up-qi-del:hover{color:#ef4444;background:#fef2f2;}

  /* Fields */
  .up-fields{display:flex;flex-direction:column;gap:16px;margin-bottom:24px;}
  .up-field{display:flex;flex-direction:column;gap:6px;}
  .up-label{font-size:.7rem;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);font-weight:500;}
  .up-input,.up-area{background:var(--white);border:1.5px solid var(--border);border-radius:8px;
                     color:var(--text);padding:11px 14px;font-size:.92rem;transition:border-color .2s,box-shadow .2s;resize:vertical;}
  .up-input:focus,.up-area:focus{border-color:var(--blue);box-shadow:0 0 0 3px rgba(37,99,235,.1);}
  .up-input::placeholder,.up-area::placeholder{color:#94a3b8;}
  .up-field-row{position:relative;}
  .up-char{position:absolute;right:12px;bottom:10px;font-size:.65rem;color:var(--muted);}

  /* Submit */
  .up-submit{width:100%;background:var(--blue);color:#fff;padding:13px;border-radius:10px;
             font-size:.9rem;font-weight:500;letter-spacing:.04em;transition:all .2s;}
  .up-submit:hover:not(:disabled){background:var(--blue-dk);transform:translateY(-1px);box-shadow:var(--sh2);}
  .up-submit:disabled{opacity:.4;cursor:not-allowed;}

  /* Recent */
  .up-recent{margin-top:36px;animation:up-up .5s .15s ease both;}
  .up-rec-hdr{display:flex;align-items:center;gap:12px;margin-bottom:16px;}
  .up-rec-hdr h2{font-size:1rem;font-weight:600;letter-spacing:-.01em;}
  .up-rec-cnt{font-size:.68rem;color:var(--muted);background:var(--blue-lt);border:1px solid var(--blue-md);padding:2px 10px;border-radius:100px;}
  .up-rec-list{display:flex;flex-direction:column;gap:8px;}
  .up-rec-item{display:flex;align-items:center;gap:10px;background:var(--white);border:1px solid var(--border);
               border-radius:10px;padding:10px 14px;box-shadow:var(--sh);}
  .up-rec-thumb{width:36px;height:36px;object-fit:cover;border-radius:6px;flex-shrink:0;}
  .up-rec-ic{width:36px;height:36px;display:flex;align-items:center;justify-content:center;
             font-size:1.1rem;background:var(--blue-lt);border:1px solid var(--blue-md);border-radius:6px;flex-shrink:0;}
  .up-rec-info{flex:1;min-width:0;}
  .up-rec-name{font-size:.82rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:var(--text);}
  .up-rec-meta{display:flex;gap:8px;align-items:center;margin-top:2px;}
  .up-rec-tag{font-size:.58rem;letter-spacing:.12em;text-transform:uppercase;color:var(--blue);font-weight:500;}
  .up-rec-date{font-size:.65rem;color:var(--muted);}
  .up-rec-del{background:transparent;color:#cbd5e1;font-size:.7rem;padding:3px 7px;border-radius:4px;transition:all .2s;flex-shrink:0;}
  .up-rec-del:hover{color:#ef4444;background:#fef2f2;}
  .up-empty{text-align:center;padding:24px;color:var(--muted);font-size:.83rem;}

  /* Toast */
  .up-toast{position:fixed;bottom:24px;right:24px;background:var(--white);border:1px solid var(--border);
            color:var(--text);padding:10px 20px;border-radius:10px;font-size:.82rem;
            z-index:9999;animation:up-pop .3s ease;box-shadow:var(--sh);}
  .up-toast--ok  {border-left:3px solid var(--blue);}
  .up-toast--err {border-left:3px solid #ef4444;}
  .up-toast--inf {border-left:3px solid var(--muted);}

  @media(max-width:600px){
    .up-hdr{padding:0 18px;}
    .up-main{padding:28px 16px 60px;}
  }
`;

function inject() {
  if (document.getElementById("up-css")) return;
  const s = document.createElement("style"); s.id = "up-css"; s.textContent = CSS;
  document.head.appendChild(s);
}
function fmt(b) { return b < 1048576 ? `${(b/1024).toFixed(1)} KB` : `${(b/1048576).toFixed(1)} MB`; }
function today() { return new Date().toLocaleDateString("en-IN", { day:"numeric", month:"short", year:"numeric" }); }

export default function Upload() {
  useEffect(() => { inject(); }, []);

  const [items, setItems]       = useState([]);
  const [tab, setTab]           = useState("image");
  const [queue, setQueue]       = useState([]);
  const [dragging, setDragging] = useState(false);
  const [dropErr, setDropErr]   = useState(false);

  // Shared fields for all tabs
  const [title, setTitle]       = useState("");
  const [desc, setDesc]         = useState("");
  // Note-only content
  const [noteContent, setNote]  = useState("");

  const [toast, setToast]       = useState(null);
  const fileRef                 = useRef();

  const load = () => { try { const s = localStorage.getItem(STORAGE_KEY); if (s) setItems(JSON.parse(s)); } catch {} };

  useEffect(() => {
    load();
    const fn = e => { if (e.key === STORAGE_KEY) load(); };
    window.addEventListener("storage", fn);
    return () => window.removeEventListener("storage", fn);
  }, []);

  const persist = next => {
    setItems(next);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); }
    catch { showToast("Storage full.", "err"); }
  };

  const showToast = (msg, type = "ok") => { setToast({ msg, type }); setTimeout(() => setToast(null), 3000); };

  const validate = f => {
    if (!f.type.startsWith("image/") && f.type !== "application/pdf") {
      showToast(`"${f.name}" — images & PDFs only.`, "err"); return false;
    }
    if (f.size > 10 * 1024 * 1024) { showToast(`"${f.name}" over 10 MB.`, "err"); return false; }
    return true;
  };

  const addToQueue = files => {
    const valid = Array.from(files).filter(validate);
    if (!valid.length) { setDropErr(true); setTimeout(() => setDropErr(false), 600); return; }
    const entries = valid.map(f => ({
      id: Date.now() + Math.random(), file: f, name: f.name, size: f.size,
      type: f.type.startsWith("image/") ? "image" : "pdf",
      preview: f.type.startsWith("image/") ? URL.createObjectURL(f) : null,
    }));
    setQueue(p => [...p, ...entries]);
  };

  const handleDrop = e => { e.preventDefault(); setDragging(false); addToQueue(e.dataTransfer.files); };

  const readFile = f => new Promise(res => { const r = new FileReader(); r.onload = e => res(e.target.result); r.readAsDataURL(f); });

  const publishFiles = async () => {
    if (!queue.length) return;
    const newItems = await Promise.all(queue.map(async q => ({
      id: Date.now() + Math.random(),
      type: q.type,
      name: q.name,
      title: title.trim() || q.name,
      description: desc.trim(),
      data: await readFile(q.file),
      date: today(),
    })));
    persist([...newItems, ...items]);
    setQueue([]); setTitle(""); setDesc("");
    showToast(`${newItems.length} file${newItems.length > 1 ? "s" : ""} published!`);
  };

  const publishNote = () => {
    if (!noteContent.trim()) { showToast("Write something first.", "err"); return; }
    persist([{
      id: Date.now() + Math.random(),
      type: "note",
      name: title.trim() || "Untitled Note",
      title: title.trim() || "Untitled Note",
      content: noteContent.trim(),
      data: noteContent.trim(),
      date: today(),
    }, ...items]);
    setTitle(""); setDesc(""); setNote("");
    showToast("Note published!");
  };

  const deleteItem = id => { persist(items.filter(i => i.id !== id)); showToast("Removed.", "inf"); };

  const switchTab = t => { setTab(t); setQueue([]); setTitle(""); setDesc(""); setNote(""); };

  const recent = items.slice(0, 6);

  const acceptedType = tab === "image" ? "image/*" : "application/pdf";
  const isFilesTab = tab === "image" || tab === "pdf";

  return (
    <div className="up">
      <header className="up-hdr">
        <div className="up-brand"><div className="up-dot" />Upload</div>
      </header>

      <div className="up-main">
        {/* Tabs */}
        <div className="up-tabs">
          {[["image","🖼 Image"],["pdf","📄 PDF"],["note","✎ Note"]].map(([v,l]) => (
            <button key={v} className={`up-tab${tab===v?" up-tab--on":""}`} onClick={() => switchTab(v)}>{l}</button>
          ))}
        </div>

        <div className="up-card">
          {/* File area (image or pdf tab) */}
          {isFilesTab && (
            <div
              className={`up-drop${dragging?" up-drop--on":""}${dropErr?" up-drop--err":""}`}
              onDragOver={e => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileRef.current?.click()}
            >
              <input ref={fileRef} type="file" multiple accept={acceptedType} style={{display:"none"}} onChange={e => addToQueue(e.target.files)} />
              <span className="up-drop-ic">{dragging ? "⬇" : tab === "image" ? "🖼" : "📄"}</span>
              <p>{dragging ? "Drop here" : `Drag & drop ${tab === "image" ? "images" : "PDF files"}`}</p>
              <span className="up-drop-sub">or click to browse · max 10 MB each</span>
              <div className="up-types">
                {tab === "image" ? ["JPG","PNG","GIF","WEBP","SVG"].map(t => <span key={t} className="up-chip">{t}</span>)
                                 : [<span key="pdf" className="up-chip">PDF</span>]}
              </div>
            </div>
          )}

          {/* Queue */}
          {queue.length > 0 && (
            <div className="up-queue">
              {queue.map(q => (
                <div key={q.id} className="up-qi">
                  {q.preview ? <img src={q.preview} alt={q.name} className="up-qi-thumb" /> : <div className="up-qi-pdf">📄</div>}
                  <div className="up-qi-info">
                    <div className="up-qi-name">{q.name}</div>
                    <div className="up-qi-sz">{fmt(q.size)}</div>
                  </div>
                  <button className="up-qi-del" onClick={() => setQueue(p => p.filter(x => x.id !== q.id))}>✕</button>
                </div>
              ))}
            </div>
          )}

          {/* Shared fields: Title + Description/Content */}
          <div className="up-fields">
            <div className="up-field">
              <label className="up-label">Title {tab !== "note" && "(optional)"}</label>
              <div className="up-field-row">
                <input className="up-input" placeholder={tab === "note" ? "Give your note a title…" : "Add a title for this upload…"} value={title} onChange={e => setTitle(e.target.value)} maxLength={80} />
                <span className="up-char">{title.length}/80</span>
              </div>
            </div>

            <div className="up-field">
              <label className="up-label">{tab === "note" ? "Note Content" : "Description (optional)"}</label>
              <div className="up-field-row">
                <textarea
                  className="up-area"
                  placeholder={tab === "note" ? "Write your thoughts here…" : "Add a description or caption…"}
                  value={tab === "note" ? noteContent : desc}
                  onChange={e => tab === "note" ? setNote(e.target.value) : setDesc(e.target.value)}
                  rows={tab === "note" ? 6 : 3}
                  maxLength={tab === "note" ? 3000 : 500}
                />
                <span className="up-char">{(tab === "note" ? noteContent : desc).length}/{tab === "note" ? 3000 : 500}</span>
              </div>
            </div>
          </div>

          {/* Submit */}
          {isFilesTab ? (
            <button className="up-submit" onClick={publishFiles} disabled={!queue.length}>
              {queue.length ? `Publish ${queue.length} file${queue.length > 1 ? "s" : ""} →` : "Select files above to continue"}
            </button>
          ) : (
            <button className="up-submit" onClick={publishNote} disabled={!noteContent.trim()}>
              Publish Note →
            </button>
          )}
        </div>

        {/* Recent */}
        <div className="up-recent">
          <div className="up-rec-hdr">
            <h2>Recently Published</h2>
            <span className="up-rec-cnt">{items.length} total</span>
          </div>
          {recent.length === 0 ? (
            <div className="up-empty">Nothing published yet.</div>
          ) : (
            <div className="up-rec-list">
              {recent.map(item => (
                <div key={item.id} className="up-rec-item">
                  {item.type === "image" ? <img src={item.data} alt={item.title || item.name} className="up-rec-thumb" /> : <div className="up-rec-ic">{item.type === "pdf" ? "📄" : "✎"}</div>}
                  <div className="up-rec-info">
                    <div className="up-rec-name">{item.title || item.name}</div>
                    <div className="up-rec-meta">
                      <span className="up-rec-tag">{item.type}</span>
                      <span className="up-rec-date">{item.date}</span>
                    </div>
                  </div>
                  <button className="up-rec-del" onClick={() => deleteItem(item.id)}>✕</button>
                </div>
              ))}
              {items.length > 6 && <div className="up-empty">+{items.length - 6} more in Showcase</div>}
            </div>
          )}
        </div>
      </div>

      {toast && <div className={`up-toast up-toast--${toast.type}`}>{toast.msg}</div>}
    </div>
  );
}