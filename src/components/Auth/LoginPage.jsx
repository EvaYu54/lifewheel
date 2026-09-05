import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function LoginPage() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    const result = login(email, password)
    if (!result.success) setError(result.error)
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.bgOrbs}>
        <div style={{ ...styles.orb, ...styles.orb1 }} />
        <div style={{ ...styles.orb, ...styles.orb2 }} />
      </div>

      <div style={styles.container}>
        <div style={styles.logo}>
          <span style={styles.logoIcon}>◉</span>
          <span style={styles.logoText}>Колесо Жизни</span>
        </div>

        <h1 style={styles.title}>Добро пожаловать</h1>
        <p style={styles.subtitle}>Войдите, чтобы продолжить работу с вашим Колесом</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          {error && <div style={styles.error}>{error}</div>}

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              className="input-field"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Пароль</label>
            <input
              type="password"
              className="input-field"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-lg btn-block">
            Войти
          </button>
        </form>

        <p style={styles.footer}>
          Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
        </p>
      </div>
    </div>
  )
}

const styles = {
  wrapper: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    padding: 20,
  },
  bgOrbs: {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
  },
  orb: {
    position: 'absolute',
    borderRadius: '50%',
    filter: 'blur(80px)',
    opacity: 0.15,
  },
  orb1: {
    width: 400,
    height: 400,
    background: '#6c5ce7',
    top: '-10%',
    right: '-5%',
  },
  orb2: {
    width: 300,
    height: 300,
    background: '#a855f7',
    bottom: '-5%',
    left: '-5%',
  },
  container: {
    width: '100%',
    maxWidth: 420,
    background: 'var(--bg-card)',
    border: '1px solid var(--border-color)',
    borderRadius: 'var(--radius-xl)',
    padding: 40,
    position: 'relative',
    zIndex: 1,
    animation: 'fadeIn 0.5s ease',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    justifyContent: 'center',
    marginBottom: 32,
  },
  logoIcon: {
    fontSize: 28,
    background: 'var(--accent-gradient)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  logoText: {
    fontSize: 20,
    fontWeight: 700,
    color: 'var(--text-primary)',
  },
  title: {
    fontSize: 24,
    fontWeight: 700,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: 'var(--text-secondary)',
    textAlign: 'center',
    marginBottom: 28,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  error: {
    background: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    borderRadius: 'var(--radius-sm)',
    padding: '10px 14px',
    fontSize: 13,
    color: 'var(--danger)',
  },
  footer: {
    textAlign: 'center',
    fontSize: 14,
    color: 'var(--text-secondary)',
    marginTop: 24,
  },
}