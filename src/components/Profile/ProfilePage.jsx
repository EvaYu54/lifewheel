import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

export default function ProfilePage() {
  const { user, updateUser } = useAuth()
  const [name, setName] = useState(user?.name || '')
  const [saved, setSaved] = useState(false)

  if (!user) return null

  const handleSave = () => {
    updateUser({ name, avatar: name.charAt(0).toUpperCase() })
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const exportData = () => {
    const data = JSON.stringify(user, null, 2)
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `lifewheel-${user.name}-${format(new Date(), 'yyyy-MM-dd')}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div style={styles.page} className="animate-fade">
      {/* Profile Card */}
      <div className="card">
        <div style={styles.profileHeader}>
          <div style={styles.avatarLarge}>
            {user.avatar}
          </div>
          <div>
            <h2 style={styles.profileName}>{user.name}</h2>
            <p style={styles.profileEmail}>{user.email}</p>
            <p style={styles.profileDate}>
              На нашей платформе с {format(new Date(user.createdAt), 'd MMMM yyyy', { locale: ru })}
            </p>
          </div>
        </div>
      </div>

      {/* Edit Profile */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">✏️ Редактирование</h3>
        </div>
        <div style={styles.form}>
          <div className="input-group">
            <label>Имя</label>
            <input
              type="text"
              className="input-field"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              className="input-field"
              value={user.email}
              disabled
              style={{ opacity: 0.5 }}
            />
          </div>
          <button className="btn btn-primary" onClick={handleSave}>
            {saved ? '✅ Сохранено!' : 'Сохранить'}
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">📊 Статистика</h3>
        </div>
        <div style={styles.statsGrid}>
          <div style={styles.statItem}>
            <span style={styles.statValue}>{user.history?.length || 0}</span>
            <span style={styles.statLabel}>Оценок проведено</span>
          </div>
          <div style={styles.statItem}>
            <span style={styles.statValue}>
              {user.history?.length
                ? user.history[user.history.length - 1].averageScore
                : '—'}
            </span>
            <span style={styles.statLabel}>Последний средний балл</span>
          </div>
          <div style={styles.statItem}>
            <span style={styles.statValue}>
              {user.history?.length >= 2
                ? (() => {
                    const last = user.history[user.history.length - 1].averageScore
                    const prev = user.history[user.history.length - 2].averageScore
                    const diff = (last - prev).toFixed(1)
                    return diff > 0 ? `+${diff}` : diff
                  })()
                : '—'}
            </span>
            <span style={styles.statLabel}>Динамика</span>
          </div>
          <div style={styles.statItem}>
            <span style={styles.statValue}>
              {user.history?.length
                ? (() => {
                    const last = user.history[user.history.length - 1]
                    const sorted = [...last.spheres].sort((a, b) => b.value - a.value)
                    return sorted[0].name
                  })()
                : '—'}
            </span>
            <span style={styles.statLabel}>Сильнейшая сфера</span>
          </div>
        </div>
      </div>

      {/* History */}
      {user.history?.length > 0 && (
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">📅 История оценок</h3>
          </div>
          <div style={styles.historyList}>
            {[...user.history].reverse().map(entry => (
              <div key={entry.id} style={styles.historyItem}>
                <div style={styles.historyDate}>
                  {format(new Date(entry.date), 'd MMM yyyy, HH:mm', { locale: ru })}
                </div>
                <div style={styles.historySpheres}>
                  {entry.spheres.map(s => (
                    <span
                      key={s.id}
                      style={{
                        ...styles.historyBadge,
                        background: s.value <= 4
                          ? 'rgba(239, 68, 68, 0.15)'
                          : s.value <= 6
                            ? 'rgba(245, 158, 11, 0.15)'
                            : 'rgba(16, 185, 129, 0.15)',
                        color: s.value <= 4
                          ? 'var(--danger)'
                          : s.value <= 6
                            ? 'var(--warning)'
                            : 'var(--success)',
                      }}
                    >
                      {s.name}: {s.value}
                    </span>
                  ))}
                </div>
                <div style={styles.historyAvg}>
                  Среднее: <strong>{entry.averageScore}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Export */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">💾 Данные</h3>
        </div>
        <p style={styles.exportText}>
          Скачайте все ваши данные в формате JSON. Вы можете использовать их
          для резервного копирования или анализа.
        </p>
        <button className="btn btn-secondary" onClick={exportData}>
          📥 Экспорт данных
        </button>
      </div>
    </div>
  )
}

const styles = {
  page: {
    maxWidth: 800,
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
  },
  profileHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 24,
  },
  avatarLarge: {
    width: 72,
    height: 72,
    borderRadius: '50%',
    background: 'var(--accent-gradient)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 28,
    fontWeight: 800,
    color: 'white',
    flexShrink: 0,
  },
  profileName: {
    fontSize: 22,
    fontWeight: 700,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: 'var(--text-secondary)',
    marginBottom: 2,
  },
  profileDate: {
    fontSize: 12,
    color: 'var(--text-muted)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    maxWidth: 400,
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
    gap: 16,
  },
  statItem: {
    padding: 16,
    background: 'var(--bg-input)',
    borderRadius: 'var(--radius-md)',
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    textAlign: 'center',
  },
  statValue: {
    fontSize: 22,
    fontWeight: 700,
    color: 'var(--accent-primary)',
  },
  statLabel: {
    fontSize: 12,
    color: 'var(--text-muted)',
  },
  historyList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    maxHeight: 400,
    overflowY: 'auto',
  },
  historyItem: {
    padding: 16,
    background: 'var(--bg-input)',
    borderRadius: 'var(--radius-md)',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  historyDate: {
    fontSize: 13,
    fontWeight: 600,
    color: 'var(--text-primary)',
  },
  historySpheres: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 6,
  },
  historyBadge: {
    padding: '3px 8px',
    borderRadius: 12,
    fontSize: 11,
    fontWeight: 500,
  },
  historyAvg: {
    fontSize: 13,
    color: 'var(--text-secondary)',
  },
  exportText: {
    fontSize: 14,
    color: 'var(--text-secondary)',
    lineHeight: 1.6,
    marginBottom: 16,
  },
}