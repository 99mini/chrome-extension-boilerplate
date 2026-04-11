import { useState } from 'react';

const styles = {
  panel: {
    position: 'fixed' as const,
    bottom: '24px',
    right: '24px',
    width: '280px',
    background: '#1e1e2e',
    color: '#cdd6f4',
    borderRadius: '12px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
    fontFamily: 'system-ui, sans-serif',
    fontSize: '14px',
    zIndex: 2147483647,
    overflow: 'hidden',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 16px',
    background: '#313244',
    cursor: 'pointer',
    userSelect: 'none' as const,
  },
  headerTitle: {
    fontWeight: 600,
    fontSize: '13px',
    color: '#cba6f7',
  },
  toggleBtn: {
    background: 'none',
    border: 'none',
    color: '#cdd6f4',
    cursor: 'pointer',
    fontSize: '16px',
    padding: '0',
    lineHeight: 1,
  },
  body: {
    padding: '16px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px',
  },
  infoRow: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '4px',
  },
  label: {
    fontSize: '11px',
    color: '#6c7086',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
  },
  value: {
    fontSize: '13px',
    color: '#a6e3a1',
    wordBreak: 'break-all' as const,
  },
  divider: {
    height: '1px',
    background: '#313244',
    margin: '4px 0',
  },
  noteInput: {
    width: '100%',
    background: '#313244',
    border: '1px solid #45475a',
    borderRadius: '6px',
    color: '#cdd6f4',
    padding: '8px',
    fontSize: '13px',
    resize: 'vertical' as const,
    minHeight: '60px',
    outline: 'none',
    boxSizing: 'border-box' as const,
  },
  saveBtn: {
    background: '#cba6f7',
    color: '#1e1e2e',
    border: 'none',
    borderRadius: '6px',
    padding: '8px 12px',
    fontSize: '13px',
    fontWeight: 600,
    cursor: 'pointer',
    width: '100%',
  },
  savedMsg: {
    fontSize: '12px',
    color: '#a6e3a1',
    textAlign: 'center' as const,
  },
};

const FloatingPanel = () => {
  const [open, setOpen] = useState(true);
  const [note, setNote] = useState('');
  const [saved, setSaved] = useState(false);

  const pageInfo = {
    title: document.title,
    url: location.href,
    domain: location.hostname,
  };

  const handleSave = () => {
    const key = `note:${pageInfo.domain}`;
    localStorage.setItem(key, note);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div style={styles.panel}>
      <div style={styles.header} onClick={() => setOpen((v) => !v)}>
        <span style={styles.headerTitle}>Chrome Extension Panel</span>
        <button style={styles.toggleBtn}>{open ? '▾' : '▸'}</button>
      </div>

      {open && (
        <div style={styles.body}>
          <div style={styles.infoRow}>
            <span style={styles.label}>Page Title</span>
            <span style={styles.value}>{pageInfo.title}</span>
          </div>
          <div style={styles.infoRow}>
            <span style={styles.label}>Domain</span>
            <span style={styles.value}>{pageInfo.domain}</span>
          </div>
          <div style={styles.divider} />
          <div style={styles.infoRow}>
            <span style={styles.label}>Page Note</span>
            <textarea
              style={styles.noteInput}
              placeholder="이 페이지에 대한 메모를 작성하세요..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
          <button style={styles.saveBtn} onClick={handleSave}>
            저장
          </button>
          {saved && <div style={styles.savedMsg}>저장되었습니다!</div>}
        </div>
      )}
    </div>
  );
};

export default FloatingPanel;
