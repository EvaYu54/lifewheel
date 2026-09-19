import React from 'react'
import { useLocation } from 'react-router-dom'

const titles = {
  '/dashboard': 'Моё Колесо Жизни',
  '/knowledge': 'База знаний',
  '/profile': 'Личный профиль',
  '/path': 'Мои цели',
}

export default function Header({ onMenuClick }) {
  const location = useLocation()
  const path = '/' + location.pathname.split('/')[1]
  const title = titles[path] || 'Колесо Жизни'

  return (
    <header style={styles.header}>
      <button onClick={onMenuClick} style={styles.menuBtn}>☰</button>
      <h1 style={styles.title}> Заголовок - {title}</h1>
      <div style={styles.date}>
        {new Date().toLocaleDateString('ru-RU', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })}
      </div>
    </header>
  )
}

const styles = {
  header: {
    height: 64,
    display: 'flex',
    alignItems: 'center',
    padding: '0 32px',
    borderBottom: '1px solid var(--border-color)',
    background: 'var(--bg-secondary)',
    gap: 16,
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  menuBtn: {
    display: 'none',
    background: 'none',
    border: 'none',
    color: 'var(--text-primary)',
    fontSize: 22,
    cursor: 'pointer',
    padding: 4,
    '@media (max-width: 768px)': { display: 'block' },
  },
  title: {
    fontSize: 18,
    fontWeight: 600,
    flex: 1,
  },
  date: {
    fontSize: 13,
    color: 'var(--text-secondary)',
  },
}