import React, { useState, useRef } from 'react';
import { Upload, Search, Trash2, Zap, RefreshCw, Leaf, Video, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

function App() {
  const [image, setImage]     = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult]   = useState(null);
  const [error, setError]     = useState(null);
  const [showGuide, setShowGuide]   = useState(false);
  const [showImpact, setShowImpact] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!image) return;
    setLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append('image', image);
    try {
      const response = await fetch(`${API_BASE}/classify`, { method: 'POST', body: formData });
      if (!response.ok) throw new Error('Classification failed');
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError('Connection to server failed. Please ensure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const resetScanner = () => {
    setImage(null);
    setPreview(null);
    setResult(null);
    setError(null);
  };

  const overlay = { position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' };
  const box     = { background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(20px)', borderRadius: '24px', padding: '3rem', maxWidth: '800px', width: '100%', maxHeight: '85vh', overflowY: 'auto', boxShadow: '0 25px 60px rgba(0,0,0,0.25)' };
  const closeBtnStyle = { background: '#f1f5f9', border: 'none', borderRadius: '12px', padding: '0.5rem 1rem', cursor: 'pointer', fontSize: '1.1rem', lineHeight: 1 };

  const impactStats = [
    { icon: <Leaf size={32} />,      value: '500 kg+',  label: 'CO₂ Offset',    detail: 'Equivalent to planting 25 trees this year.' },
    { icon: <Trash2 size={32} />,    value: '2.5 Tons', label: 'Waste Diverted', detail: 'Kept out of landfills through upcycling.' },
    { icon: <Zap size={32} />,       value: '15,000+',  label: 'Eco-Warriors',   detail: 'Active users making sustainable choices daily.' },
    { icon: <RefreshCw size={32} />, value: '8,400+',   label: 'Items Upcycled', detail: 'Items given a second life instead of discarded.' },
  ];

  const guideSteps = [
    { icon: <Upload size={32} />,       title: '01 · Snap & Scan',      desc: 'Take a clear, well-lit photo of your waste item and upload it using the scanner.' },
    { icon: <Search size={32} />,       title: '02 · Identify Material', desc: 'Our AI instantly analyzes the material — Organic, Plastic, Metal, Glass, Paper, or E-waste.' },
    { icon: <RefreshCw size={32} />,    title: '03 · Discover Worth',    desc: 'Explore creative DIY upcycling projects and pro-tips for correct recycling.' },
    { icon: <CheckCircle2 size={32} />, title: '04 · Track Impact',      desc: 'Earn +50 XP sustainability points per scan and see your eco-contribution grow.' },
  ];

  return (
    <div className="app-wrapper">

      {/* Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 3rem', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ backgroundColor: '#10b981', color: 'white', padding: '0.5rem', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Leaf size={24} />
          </div>
          <h2 style={{ margin: 0, fontSize: '1.5rem', whiteSpace: 'nowrap' }}>Waste2Worth</h2>
        </div>
        <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <button onClick={() => setShowImpact(true)} style={{ color: '#374151', fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.95rem', padding: 0, fontFamily: 'inherit', letterSpacing: '0.01em' }}>Impact</button>
          <button onClick={() => setShowGuide(true)}  style={{ color: '#374151', fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.95rem', padding: 0, fontFamily: 'inherit', letterSpacing: '0.01em' }}>Guide</button>
        </nav>
      </header>

      <main className="container">

        {/* Hero */}
        <section className="hero">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            From Waste to Worth
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            AI-powered waste classification to help you recycle better and find creative value in everyday items.
          </motion.p>
        </section>

        {/* Scanner */}
        <section className="scanner-section">
          {!preview ? (
            <motion.div className="glass-card upload-zone" whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} onClick={() => fileInputRef.current.click()}>
              <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} accept="image/*" />
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                <div className="animate-float" style={{ backgroundColor: 'rgba(16,185,129,0.1)', color: '#10b981', padding: '1.5rem', borderRadius: '50%' }}>
                  <Upload size={48} />
                </div>
                <div>
                  <h3 style={{ marginBottom: '0.25rem' }}>Drop your image here</h3>
                  <p style={{ color: 'var(--text-muted)' }}>or click to browse from files</p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
              <img src={preview} alt="Upload preview" className="preview-image" />
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                <button className="btn" style={{ backgroundColor: '#f1f5f9', color: '#475569' }} onClick={resetScanner}>
                  <Trash2 size={20} /> Clear
                </button>
                <button className="btn btn-primary" disabled={loading} onClick={handleUpload}>
                  {loading ? <RefreshCw size={20} style={{ animation: 'spin 1s linear infinite' }} /> : <Search size={20} />}
                  {loading ? 'Analyzing...' : 'Analyze Waste'}
                </button>
              </div>
            </motion.div>
          )}

          <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>

          <AnimatePresence>
            {error && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                style={{ marginTop: '1.5rem', padding: '1rem', borderRadius: '12px', backgroundColor: '#fef2f2', color: '#b91c1c', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <AlertCircle size={20} /> {error}
              </motion.div>
            )}
            {result && (
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="glass-card result-card">
                <div className={`category-tag tag-${result.category.toLowerCase().replace('-','')}`}>{result.category} Waste</div>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: '#064e3b' }}>AI Detected: {result.category}</h2>
                <div className="info-grid">
                  <div className="info-item">
                    <label>Biodegradable</label>
                    <p style={{ color: result.info.biodegradable === 'Yes' ? 'var(--success)' : 'var(--danger)' }}>{result.info.biodegradable}</p>
                  </div>
                  <div className="info-item">
                    <label>Decomposition Time</label>
                    <p>{result.info.time}</p>
                  </div>
                  <div className="info-item">
                    <label>Sustainability Bonus</label>
                    <p style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Zap size={16} fill="currentColor" /> +50 XP
                    </p>
                  </div>
                </div>
                <div className="worth-section">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <RefreshCw size={20} />
                    <h3 style={{ margin: 0 }}>From Waste to Worth</h3>
                  </div>
                  <p style={{ opacity: 0.9 }}>{result.info.worth}</p>
                  <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}>
                    <p style={{ fontSize: '0.875rem', fontWeight: 500 }}>💡 Pro Tip: {result.info.tips}</p>
                  </div>
                </div>
                <div style={{ marginTop: '2rem' }}>
                  <a href={result.info.video} target="_blank" rel="noopener noreferrer" className="btn" style={{ width: '100%', backgroundColor: '#064e3b', color: 'white' }}>
                    <Video size={20} /> Watch Recycling Guide
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </main>

      {/* Guide Modal */}
      <AnimatePresence>
        {showGuide && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowGuide(false)} style={overlay}>
            <motion.div initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 60, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }} onClick={(e) => e.stopPropagation()} style={box}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ margin: 0, fontSize: '2rem', color: '#064e3b' }}>How it Works</h2>
                <button onClick={() => setShowGuide(false)} style={closeBtnStyle}>✕</button>
              </div>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '1.05rem' }}>Master the art of "Waste to Worth" in four simple steps.</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                {guideSteps.map((step, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                    style={{ background: 'rgba(16,185,129,0.06)', borderRadius: '16px', padding: '1.5rem', borderLeft: '4px solid #10b981' }}>
                    <div style={{ color: '#10b981', marginBottom: '1rem' }}>{step.icon}</div>
                    <h4 style={{ color: '#064e3b', marginBottom: '0.5rem', fontSize: '1.05rem' }}>{step.title}</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>{step.desc}</p>
                  </motion.div>
                ))}
              </div>
              <div style={{ marginTop: '2rem', padding: '1.25rem', background: 'linear-gradient(135deg,#f0fdf4,#dcfce7)', borderRadius: '12px', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <Leaf size={22} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                <p style={{ margin: 0, color: '#065f46', fontWeight: 500, fontSize: '0.95rem' }}>
                  💡 For best results: use good lighting and place the item against a plain background when scanning.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Impact Modal */}
      <AnimatePresence>
        {showImpact && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowImpact(false)} style={overlay}>
            <motion.div initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 60, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }} onClick={(e) => e.stopPropagation()} style={box}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ margin: 0, fontSize: '2rem', color: '#064e3b' }}>The Global Impact</h2>
                <button onClick={() => setShowImpact(false)} style={closeBtnStyle}>✕</button>
              </div>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '1.05rem' }}>Every scan contributes to a larger movement. See what our community has achieved.</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                {impactStats.map((stat, i) => (
                  <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.07 }}
                    style={{ background: 'rgba(16,185,129,0.06)', borderRadius: '16px', padding: '1.75rem', textAlign: 'center', border: '1px solid rgba(16,185,129,0.2)' }}>
                    <div style={{ color: '#10b981', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>{stat.icon}</div>
                    <div style={{ fontSize: '2rem', fontWeight: 800, color: '#064e3b', fontFamily: 'Outfit, sans-serif', marginBottom: '0.25rem' }}>{stat.value}</div>
                    <h4 style={{ color: '#065f46', marginBottom: '0.5rem' }}>{stat.label}</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.5 }}>{stat.detail}</p>
                  </motion.div>
                ))}
              </div>
              <div style={{ padding: '1.5rem', background: 'linear-gradient(135deg,#064e3b,#10b981)', borderRadius: '16px', color: 'white', textAlign: 'center' }}>
                <p style={{ margin: 0, fontSize: '1rem', fontWeight: 500, lineHeight: 1.6 }}>
                  🌍 Together we've saved the energy equivalent of <strong>12,000 miles of driving</strong>. Keep making a difference!
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="container" style={{ marginTop: 'auto', textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
        <p>&copy; 2026 Waste2Worth. Let's build a greener future together.</p>
      </footer>
    </div>
  );
}

export default App;
