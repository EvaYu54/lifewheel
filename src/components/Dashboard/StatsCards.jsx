import React from 'react'

export default function StatsCards({ spheres, history }) {
  const average = (spheres.reduce((s, v) => s + v.value, 0) / spheres.length).toFixed(1)
  const lowest = [...spheres].sort((a, b) => a.value - b.value)[0]
  const highest = [...spheres].sort((a, b) => b.value - a.value)[0]
  const totalSessions = history?.length || 0

  const prevAvg = history?.length >= 2
    ? history[history.length - 2].averageScore
    : null
  const diff = prevAvg !== null ? (average - prevAvg).toFixed(1) : null

  const cards = [
    {
      title: 'Средний балл',
      value: average,
      subtitle: diff !== null
        ? `${diff > 0 ? '+' : ''}${diff} с прошлого раза`
        : 'Первая оценка',
      color: '#6c5ce7',
      icon: '📊',
    },
    {
      title: 'Сильная сфера',
      value: `${highest.icon} ${highest.name}`,
      subtitle: `${highest.value}/10`,
      color: '#10b981',
      icon: '🏆',
    },
    {
      title: 'Зона роста',
      value: `${lowest.icon} ${lowest.name}`,
      subtitle: `${lowest.value}/10`,
      color: '#f59e0b',
      icon: '🎯',
    },
    {
      title: 'Всего оценок',
      value: totalSessions,
      subtitle: 'сессий проведено',
      color: '#3b82f6',
      icon: '📅',
    },
  ]

  return (
    <div style={styles.grid}>
      {cards.map((card, i) => (
        <div key={i} style={styles.card}>
          <div style={styles.cardHeader}>
            <span style={styles.cardIcon}>{card.icon}</span>
            <span style={styles.cardTitle}>{card.title}</span>
          </div>
          <div style={{ ...styles.cardValue, color: card.color }}>
            {card.value}
          </div>
          <div style={styles.cardSubtitle}>{card.subtitle}</div>
        </div>
      ))}
    </div>
  )
}

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: 16,
  },
  card: {
    background: 'var(--bg-card)',
    border: '1px solid var(--border-color)',
    borderRadius: 'var(--radius-lg)',
    padding: 20,
    transition: 'all 0.2s',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  cardIcon: {
    fontSize: 16,
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: 500,
    color: 'var(--text-secondary)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  cardValue: {
    fontSize: 20,
    fontWeight: 700,
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 12,
    color: 'var(--text-muted)',
  },
}