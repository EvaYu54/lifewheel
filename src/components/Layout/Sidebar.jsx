import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const navItems = [
  { to: '/dashboard', label: 'Колесо Жизни', icon: '◉' },
  { to: '/knowledge', label: 'База знаний', icon: '📖' },
  { to: '/profile', label: 'Профиль', icon: '👤' },
]

export default function Sidebar({ isOpen, onClose }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <>
      {isOpen && <div style={styles.overlay} onClick={onClose} />}
      <aside style={{ ...styles.sidebar, ...(isOpen ? styles.sidebarOpen : {}) }}>
        {/* Logo */}
        <div style={styles.logo}>
          <span style={styles.logoIcon}>◉</span>
          <span style={styles.logoText}>Колесо Жизни</span>
        </div>

        {/* Navigation */}
        <nav style={styles.nav}>
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              style={({ isActive }) => ({
                ...styles.navItem,
                ...(isActive ? styles.navItemActive : {}),
              })}
            >
              <span style={styles.navIcon}>{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* User Info */}
        <div style={styles.userSection}>
          <div style={styles.userInfo}>
            <div style={styles.avatar}>{user?.avatar || '?'}</div>
            <div>
              <div style={styles.userName}>{user?.name}</div>
              <div style={styles.userEmail}>{user?.email}</div>
            </div>
          </div>
          <button onClick={handleLogout} style={styles.logoutBtn}>
            Выйти
          </button>
        </div>
      </aside>
    </>
  )
}

const styles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.6)',
    zIndex: 998,
    display: 'none',
    '@media (max-width: 768px)': { display: 'block' },
  },
  sidebar: {
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    width: 260,
    background: 'var(--bg-secondary)',
    borderRight: '1px solid var(--border-color)',
    display: 'flex',
    flexDirection: 'column',
    padding: '24px 16px',
    zIndex: 999,
    transition: 'transform 0.3s ease',
  },
  sidebarOpen: {},
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '0 8px',
    marginBottom: 40,
  },
  logoIcon: {
    fontSize: 24,
    background: 'linear-gradient(135deg, #6c5ce7, #a855f7)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  logoText: {
    fontSize: 18,
    fontWeight: 700,
    color: 'var(--text-primary)',
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    flex: 1,
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '12px 14px',
    borderRadius: 'var(--radius-sm)',
    color: 'var(--text-secondary)',
    fontSize: 14,
    fontWeight: 500,
    textDecoration: 'none',
    transition: 'all 0.2s',
  },
  navItemActive: {
    background: 'rgba(108, 92, 231, 0.15)',
    color: '#a855f7',
  },
  navIcon: {
    fontSize: 18,
    width: 24,
    textAlign: 'center',
  },
  userSection: {
    borderTop: '1px solid var(--border-color)',
    paddingTop: 16,
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: '50%',
    background: 'var(--accent-gradient)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 14,
    fontWeight: 700,
    color: 'white',
    flexShrink: 0,
  },
  userName: {
    fontSize: 13,
    fontWeight: 600,
    color: 'var(--text-primary)',
  },
  userEmail: {
    fontSize: 11,
    color: 'var(--text-muted)',
  },
  logoutBtn: {
    padding: '8px 14px',
    background: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid rgba(239, 68, 68, 0.2)',
    borderRadius: 'var(--radius-sm)',
    color: 'var(--danger)',
    fontSize: 13,
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontFamily: 'inherit',
  },
}