import React, { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import WheelChart from './WheelChart'
import SphereSlider from './SphereSlider'
import StatsCards from './StatsCards'
import HistoryChart from './HistoryChart'

export default function Dashboard() {
  const { user, saveSpheres } = useAuth()
  const [spheres, setSpheres] = useState(user?.spheres || [])
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (user?.spheres) setSpheres(user.spheres)
  }, [user])

  const handleChange = (id, value) => {
    setSpheres(prev => prev.map(s => s.id === id ? { ...s, value } : s))
    setSaved(false)
  }

  const handleSave = () => {
    saveSpheres(spheres)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  if (!user) return null

  return (
    <div style={styles.page} className="animate-fade">
      {/* Stats */}
      <StatsCards spheres={spheres} history={user.history} />

      {/* Main Grid */}
      <div style={styles.mainGrid}>
        {/* Left — Wheel */}
        <div style={styles.wheelCol}>
          <WheelChart spheres={spheres} />
        </div>

        {/* Right — Sliders */}
        <div style={styles.slidersCol}>
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">⚙️ Оценки по сферам</h3>
            </div>
            <div style={styles.slidersList}>
              {spheres.map(sphere => (
                <SphereSlider
                  key={sphere.id}
                  sphere={sphere}
                  onChange={handleChange}
                />
              ))}
            </div>
            <div style={styles.saveRow}>
              <button
                className="btn btn-primary btn-lg btn-block"
                onClick={handleSave}
              >
                {saved ? '✅ Сохранено!' : '💾 Сохранить оценки'}
              </button>
              <p style={styles.saveHint}>
                Сохраняйте оценки регулярно для отслеживания динамики
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* History Chart */}
      <HistoryChart history={user.history} />

      {/* Tips */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">💡 Рекомендации</h3>
        </div>
        <div style={styles.tips}>
          {spheres
            .filter(s => s.value <= 4)
            .map(s => (
              <div key={s.id} style={styles.tip}>
                <span style={styles.tipIcon}>{s.icon}</span>
                <div>
                  <strong style={styles.tipTitle}>{s.name} ({s.value}/10)</strong>
                  <p style={styles.tipText}>
                    Эта сфера находится в критической зоне. Рекомендуем прочитать
                    статьи в базе знаний и определить 1 конкретное действие на эту неделю.
                  </p>
                </div>
              </div>
            ))}
          {spheres.filter(s => s.value <= 4).length === 0 && (
            <p style={styles.tipText}>
              🎉 Все сферы выше критического уровня. Продолжайте в том же духе!
              Сфокусируйтесь на самой низкой — <strong>
                {[...spheres].sort((a, b) => a.value - b.value)[0].name}
              </strong> — чтобы сбалансировать колесо.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

const styles = {
  page: {
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
  },
  mainGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 24,
    alignItems: 'start',
  },
  wheelCol: {},
  slidersCol: {},
  slidersList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    maxHeight: 500,
    overflowY: 'auto',
    paddingRight: 4,
  },
  saveRow: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  saveHint: {
    fontSize: 12,
    color: 'var(--text-muted)',
    textAlign: 'center',
  },
  tips: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  tip: {
    display: 'flex',
    gap: 14,
    padding: 16,
    background: 'rgba(245, 158, 11, 0.05)',
    border: '1px solid rgba(245, 158, 11, 0.2)',
    borderRadius: 'var(--radius-md)',
  },
  tipIcon: {
    fontSize: 24,
    flexShrink: 0,
  },
  tipTitle: {
    fontSize: 14,
    color: 'var(--text-primary)',
    display: 'block',
    marginBottom: 4,
  },
  tipText: {
    fontSize: 13,
    color: 'var(--text-secondary)',
    lineHeight: 1.6,
  },
}