import React, { useMemo } from 'react'
import ReactECharts from 'echarts-for-react'

export default function WheelChart({ spheres }) {
  const option = useMemo(() => ({
    tooltip: {
      trigger: 'item',
      backgroundColor: '#1a1a2e',
      borderColor: '#2a2a45',
      textStyle: { color: '#e8e8f0', fontSize: 13 },
      formatter: (params) => {
        const sphere = spheres[params.dataIndex]
        return `${sphere.icon} ${sphere.name}: <strong>${sphere.value}</strong>/10`
      },
    },
    radar: {
      shape: 'circle',
      radius: '70%',
      indicator: spheres.map(s => ({
        name: `${s.icon} ${s.name}`,
        max: 10,
      })),
      axisName: {
        color: '#8888a8',
        fontSize: 12,
        fontFamily: 'Inter',
      },
      splitArea: {
        areaStyle: {
          color: [
            'rgba(108, 92, 231, 0.02)',
            'rgba(108, 92, 231, 0.04)',
            'rgba(108, 92, 231, 0.06)',
            'rgba(108, 92, 231, 0.08)',
            'rgba(108, 92, 231, 0.10)',
          ],
        },
      },
      splitLine: {
        lineStyle: { color: 'rgba(42, 42, 69, 0.8)' },
      },
      axisLine: {
        lineStyle: { color: 'rgba(42, 42, 69, 0.5)' },
      },
    },
    series: [
      {
        type: 'radar',
        data: [
          {
            value: spheres.map(s => s.value),
            name: 'Текущие оценки',
            areaStyle: {
              color: {
                type: 'linear',
                x: 0, y: 0, x2: 0, y2: 1,
                colorStops: [
                  { offset: 0, color: 'rgba(108, 92, 231, 0.4)' },
                  { offset: 1, color: 'rgba(168, 85, 247, 0.1)' },
                ],
              },
            },
            lineStyle: {
              color: '#6c5ce7',
              width: 2,
            },
            itemStyle: {
              color: '#a855f7',
              borderColor: '#6c5ce7',
              borderWidth: 2,
            },
            symbol: 'circle',
            symbolSize: 8,
          },
        ],
      },
    ],
    animation: true,
    animationDuration: 800,
    animationEasing: 'cubicOut',
  }), [spheres])

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">🎯 Ваше Колесо По Жизни</h3>
        <span className="badge badge-info">
          Среднее: {(spheres.reduce((s, v) => s + v.value, 0) / spheres.length).toFixed(1)}
        </span>
      </div>
      <ReactECharts
        option={option}
        style={{ height: 450, width: '100%' }}
        notMerge={true}
      />
    </div>
  )
}