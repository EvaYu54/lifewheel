import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { articles } from '../../data/articles'

export default function ArticlePage() {
  const { id } = useParams()
  const article = articles.find(a => a.id === Number(id))

  if (!article) {
    return (
      <div style={styles.notFound}>
        <h2>Статья не найдена</h2>
        <Link to="/knowledge" className="btn btn-primary">
          Вернуться к базе знаний
        </Link>
      </div>
    )
  }

  // Simple markdown-like rendering
  const renderContent = (content) => {
    const lines = content.trim().split('\n')
    const elements = []
    let inList = false
    let listItems = []

    const flushList = () => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={`list-${elements.length}`} style={styles.list}>
            {listItems.map((item, i) => (
              <li key={i} style={styles.listItem}>{item}</li>
            ))}
          </ul>
        )
        listItems = []
        inList = false
      }
    }

    lines.forEach((line, idx) => {
      const trimmed = line.trim()

      if (trimmed.startsWith('## ')) {
        flushList()
        elements.push(
          <h2 key={idx} style={styles.h2}>{trimmed.replace('## ', '')}</h2>
        )
      } else if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
        flushList()
        elements.push(
          <p key={idx} style={styles.bold}>{trimmed.replace(/\*\*/g, '')}</p>
        )
      } else if (trimmed.startsWith('- ') || trimmed.match(/^\d+\.\s/)) {
        const text = trimmed.replace(/^[-\d.]\s+/, '')
        // Handle **bold** within list items
        const formatted = text.replace(/\*\*(.*?)\*\*/g, '$1')
        listItems.push(formatted)
        inList = true
      } else if (trimmed === '') {
        flushList()
      } else {
        flushList()
        // Handle **bold** inline
        const parts = trimmed.split(/(\*\*.*?\*\*)/)
        const formatted = parts.map((part, i) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={i}>{part.replace(/\*\*/g, '')}</strong>
          }
          return part
        })
        elements.push(
          <p key={idx} style={styles.paragraph}>{formatted}</p>
        )
      }
    })

    flushList()
    return elements
  }

  const currentIndex = articles.findIndex(a => a.id === article.id)
  const prevArticle = articles[currentIndex - 1]
  const nextArticle = articles[currentIndex + 1]

  return (
    <div style={styles.page} className="animate-fade">
      <Link to="/knowledge" style={styles.backLink}>
        ← Назад к базе знаний
      </Link>

      <div style={styles.articleHeader}>
        <span style={styles.section}>{article.section}</span>
        <h1 style={styles.title}>
          {article.icon} {article.title}
        </h1>
        <p style={styles.description}>{article.description}</p>
        <div style={styles.meta}>
          <span>📖 {article.readTime} мин чтения</span>
        </div>
      </div>

      <div style={styles.content}>
        {renderContent(article.content)}
      </div>

      {/* Navigation */}
      <div style={styles.navRow}>
        {prevArticle ? (
          <Link to={`/knowledge/${prevArticle.id}`} style={styles.navCard}>
            <span style={styles.navLabel}>← Предыдущая</span>
            <span style={styles.navTitle}>{prevArticle.title}</span>
          </Link>
        ) : <div />}
        {nextArticle ? (
          <Link to={`/knowledge/${nextArticle.id}`} style={{ ...styles.navCard, textAlign: 'right' }}>
            <span style={styles.navLabel}>Следующая →</span>
            <span style={styles.navTitle}>{nextArticle.title}</span>
          </Link>
        ) : <div />}
      </div>
    </div>
  )
}

const styles = {
  page: {
    maxWidth: 720,
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
  },
  backLink: {
    fontSize: 13,
    color: 'var(--text-secondary)',
    textDecoration: 'none',
  },
  articleHeader: {
    borderBottom: '1px solid var(--border-color)',
    paddingBottom: 24,
  },
  section: {
    fontSize: 12,
    fontWeight: 600,
    color: 'var(--accent-primary)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    display: 'block',
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 800,
    lineHeight: 1.3,
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: 'var(--text-secondary)',
    lineHeight: 1.5,
    marginBottom: 16,
  },
  meta: {
    fontSize: 13,
    color: 'var(--text-muted)',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  h2: {
    fontSize: 20,
    fontWeight: 700,
    color: 'var(--text-primary)',
    marginTop: 16,
    paddingBottom: 8,
    borderBottom: '1px solid var(--border-color)',
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 1.8,
    color: 'var(--text-secondary)',
  },
  bold: {
    fontSize: 15,
    fontWeight: 600,
    color: 'var(--text-primary)',
    lineHeight: 1.6,
  },
  list: {
    paddingLeft: 24,
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  },
  listItem: {
    fontSize: 15,
    lineHeight: 1.7,
    color: 'var(--text-secondary)',
  },
  navRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 16,
    marginTop: 32,
    paddingTop: 24,
    borderTop: '1px solid var(--border-color)',
  },
  navCard: {
    padding: 16,
    background: 'var(--bg-card)',
    border: '1px solid var(--border-color)',
    borderRadius: 'var(--radius-md)',
    textDecoration: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    transition: 'all 0.2s',
  },
  navLabel: {
    fontSize: 12,
    color: 'var(--text-muted)',
  },
  navTitle: {
    fontSize: 14,
    fontWeight: 600,
    color: 'var(--text-primary)',
  },
  notFound: {
    textAlign: 'center',
    padding: 60,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    alignItems: 'center',
  },
}