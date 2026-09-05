import React, { useMemo } from 'react'
import ReactECharts from 'echarts-for-react'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

export default function HistoryChart({ history }) {
  const option = useMemo(() => {
    if (!history || history.length < 2) return null

    const last10 = history.slice(-10)
    const dates = last10.map(h => format(new Date(h.date), 'd MMM', { locale: ru }))
    const averages = last10.map(h => h.averageScore)

    // Get all sphere names from first entry
    const sphereNames = last10[0].spheres.map(s => s.name)
    const sphereColors = ['#10b981', '#ec4899', '#3b82f6', '#f59e0b', '#f97316', '#8b5cf6', '#06b6d4', '#84cc16']

    return {
      tooltip: {
        trigger: 'axis',
        backgroundColor: '#1a1a2e',
        borderColor: '#2a2a45',
        textStyle: { color: '#e8e8f0', fontSize: 12 },
      },
      legend: {
        data: ['Средний балл', ...sphereNames],
        textStyle: { color: '#8888a8', fontSize: 11 },
        top: 0,
        type: 'scroll',
        pageTextStyle: { color: '#8888a8' },
      },
      grid: {
        left: 40,
        right: 20,
        top: 60,
        bottom: 30,
      },
      xAxis: {
        type: 'category',
        data: dates,
        axisLine: { lineStyle: { color: '#2a2a45' } },
        axisLabel: { color: '#8888a8', fontSize: 11 },
      },
      yAxis: {
        type: 'value',
        min: 0,
        max: 10,
        axisLine: { lineStyle: { color: '#2a2a45' } },
        axisLabel: { color: '#8888a8', fontSize: 11 },
        splitLine: { lineStyle: { color: 'rgba(42, 42, 69, 0.5)' } },
      },
      series: [
        {
          name: 'Средний балл',
          type: 'line',
          data: averages,
          smooth: true,
          lineStyle: { color: '#6c5ce7', width: 3 },
          itemStyle: { color: '#6c5ce7' },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(108, 92, 231, 0.3)' },
                { offset: 1, color: 'rgba(108, 92, 231, 0)' },
              ],
            },
          },
          z: 10,
        },
        ...sphereNames.map((name, idx) => ({
          name,
          type: 'line',
          data: last10.map(h => {
            const s = h.spheres.find(sp => sp.name === name)
            return s ? s.value : 0
          }),
          smooth: true,
          lineStyle: { color: sphereColors[idx], width: 1.5, opacity: 0.6 },
          itemStyle: { color: sphereColors[idx] },
          symbol: 'none',
        })),
      ],
      animation: true,
      animationDuration: 600,
    }
  }, [history])

  if (!option) {
    return (
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">📈 История изменений</h3>
        </div>
        <div style={styles.empty}>
          <p style={styles.emptyText}>
            Сохраните оценки минимум 2 раза, чтобы увидеть динамику
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">📈 История изменений</h3>
        <span className="badge badge-success">{history.length} записей</span>
      </div>
      <ReactECharts
        option={option}
        style={{ height: 350, width: '100%' }}
        notMerge={true}
      />
    </div>
  )
}

const styles = {
  empty: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
  },
  emptyText: {
    color: 'var(--text-muted)',
    fontSize: 14,
  },
}