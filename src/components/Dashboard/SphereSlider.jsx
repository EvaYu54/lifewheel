import React from 'react'

export default function SphereSlider({ sphere, onChange }) {
  const getScoreColor = (value) => {
    if (value <= 3) return 'var(--danger)'
    if (value <= 5) return 'var(--warning)'
    if (value <= 7) return 'var(--info)'
    return 'var(--success)'
  }

  const getScoreLabel = (value) => {
    if (value <= 2) return 'Критично'
    if (value <= 4) return 'Низко'
    if (value <= 6) return 'Средне'
    if (value <= 8) return 'Хорошо'
    return 'Отлично'
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.nameRow}>
          <span style={styles.icon}>{sphere.icon}</span>
          <span style={styles.name}>{sphere.name}</span>
        </div>
        <div style={styles.scoreBlock}>
          <span style={{
            ...styles.score,
            color: getScoreColor(sphere.value),
          }}>
            {sphere.value}
          </span>
          <span style={{
            ...styles.label,
            color: getScoreColor(sphere.value),
          }}>
            {getScoreLabel(sphere.value)}
          </span>
        </div>
      </div>

      <div style={styles.sliderWrapper}>
        <input
          type="range"
          min="1"
          max="10"
          value={sphere.value}
          onChange={(e) => onChange(sphere.id, Number(e.target.value))}
          style={{
            ...styles.slider,
            background: `linear-gradient(to right, ${sphere.color} 0%, ${sphere.color} ${(sphere.value - 1) / 9 * 100}%, var(--bg-input) ${(sphere.value - 1) / 9 * 100}%, var(--bg-input) 100%)`,
          }}
        />
        <div style={styles.marks}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
            <span
              key={n}
              style={{
                ...styles.mark,
                color: n <= sphere.value ? sphere.color : 'var(--text-muted)',
                fontWeight: n === sphere.value ? 700 : 400,
              }}
            >
              {n}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    padding: '16px 20px',
    background: 'var(--bg-card)',
    border: '1px solid var(--border-color)',
    borderRadius: 'var(--radius-md)',
    transition: 'all 0.2s',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  nameRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  icon: {
    fontSize: 20,
  },
  name: {
    fontSize: 14,
    fontWeight: 600,
    color: 'var(--text-primary)',
  },
  scoreBlock: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  score: {
    fontSize: 22,
    fontWeight: 800,
  },
  label: {
    fontSize: 11,
    fontWeight: 500,
  },
  sliderWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  slider: {
    width: '100%',
    height: 6,
    borderRadius: 3,
    appearance: 'none',
    outline: 'none',
    cursor: 'pointer',
    WebkitAppearance: 'none',
  },
  marks: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 2px',
  },
  mark: {
    fontSize: 10,
    width: 16,
    textAlign: 'center',
  },
}