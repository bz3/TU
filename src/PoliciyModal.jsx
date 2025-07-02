import React from 'react';

export default function PolicyModal({ open, onClose, title, text }) {
  if (!open) return null;
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      background: 'rgba(0,0,0,0.25)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{ background: '#fff', borderRadius: 12, maxWidth: 480, width: '90%', padding: 24, boxShadow: '0 2px 16px rgba(0,0,0,0.08)' }}>
        <h2 style={{ marginTop: 0 }}>{title}</h2>
        <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', fontSize: 15, color: '#333', marginBottom: 24 }}>{text}</pre>
        <button onClick={onClose} style={{ background: '#0057ff', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 20px', fontWeight: 600, cursor: 'pointer' }}>Cerrar</button>
      </div>
    </div>
  );
} 