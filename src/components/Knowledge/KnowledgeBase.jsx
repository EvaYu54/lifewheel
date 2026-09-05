import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { articles, sections } from '../../data/articles'

export default function KnowledgeBase() {
  const [search, setSearch] = useState('')
  const [activeSection, setActiveSection] = useState(null)

  const filtered = articles.filter(a => {
    const matchesSearch = !search ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.description.toLowerCase().includes(search.toLowerCase())
    const matchesSection = !activeSection || a.section === activeSection
    return matchesSearch && matchesSection
  })

  return (
    <div style={styles.page} className="animate-fade">
      {/* Hero */}
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>📖 База знаний</h1>
        <p style={styles.heroSubtitle}>
          Всё, что нужно знать о Колесе Жизни, коучинге и личностном росте
        </p>
        <input
          type="text"
          className="input-field"
          placeholder="🔍 Поиск по статьям..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={styles.searchInput}
        />
      </div>

      {/* Sections Filter */}
      <div style={styles.sectionsRow}>
        <button
          onClick={() => setActiveSection(null)}
          style={{
            ...styles.sectionChip,
            ...(activeSection === null ? styles.sectionChipActive : {}),
          }}
        >
          Все
        </button>
        {sections.map(sec => (
          <button
            key={sec.name}
            onClick={() => setActiveSection(sec.name === activeSection ? null : sec.name)}
            style={{
              ...styles.sectionChip,
              ...(activeSection === sec.name ? styles.sectionChipActive : {}),
            }}
          >
            {sec.icon} {sec.name}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <div style={styles.grid}>
        {filtered.map(article => (
          <Link
            key={article.id}
            to={`/knowledge/${article.id}`}
            style={styles.articleCard}
          >
            <div style={styles.articleIcon}>{article.icon}</div>
            <div style={styles.articleSection}>{article.section}</div>
            <h3 style={styles.articleTitle}>{article.title}</h3>
            <p style={styles.articleDesc}>{article.description}</p>
            <div style={styles.articleMeta}>
              <span>📖 {article.readTime} мин</span>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={styles.empty}>
          <p>Ничего не найдено. Попробуйте другой запрос.</p>
        </div>
      )}
    </div>
  )
}

const styles = {
  page: {
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
  },
  hero: {
    textAlign: 'center',
    padding: '20px 0',
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 800,
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 15,
    color: 'var(--text-secondary)',
    marginBottom: 24,
  },
  searchInput: {
    maxWidth: 500,
    width: '100%',
    margin: '0 auto',
    display: 'block',
    fontSize: 15,
    padding: '14px 20px',
  },
  sectionsRow: {
    display: 'flex',
    gap: 8,
    flexWrap: 'wrap',
  },
  sectionChip: {
    padding: '8px 14px',
    borderRadius: 20,
    border: '1px solid var(--border-color)',
    background: 'var(--bg-card)',
    color: 'var(--text-secondary)',
    fontSize: 12,
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontFamily: 'inherit',
  },
  sectionChipActive: {
    background: 'rgba(108, 92, 231, 0.15)',
    borderColor: 'var(--accent-primary)',
    color: '#a855f7',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: 16,
  },
  articleCard: {
    background: 'var(--bg-card)',
    border: '1px solid var(--border-color)',
    borderRadius: 'var(--radius-lg)',
    padding: 24,
    textDecoration: 'none',
    transition: 'all 0.2s',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    cursor: 'pointer',
  },
  articleIcon: {
    fontSize: 32,
    marginBottom: 4,
  },
  articleSection: {
    fontSize: 11,
    fontWeight: 600,
    color: 'var(--accent-primary)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  articleTitle: {
    fontSize: 15,
    fontWeight: 600,
    color: 'var(--text-primary)',
    lineHeight: 1.4,
  },
  articleDesc: {
    fontSize: 13,
    color: 'var(--text-secondary)',
    lineHeight: 1.5,
    flex: 1,
  },
  articleMeta: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: 12,
    color: 'var(--text-muted)',
    marginTop: 8,
    paddingTop: 12,
    borderTop: '1px solid var(--border-color)',
  },
  empty: {
    textAlign: 'center',
    padding: 60,
    color: 'var(--text-muted)',
  },
}