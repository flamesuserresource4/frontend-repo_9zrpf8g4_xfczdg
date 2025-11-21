import React, { useEffect, useState } from 'react'

function Programs({ onSelect }) {
  const [programs, setPrograms] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      try {
        const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const res = await fetch(`${baseUrl}/api/programs`)
        if (!res.ok) throw new Error('Не удалось загрузить программы')
        const data = await res.json()
        setPrograms(data)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) return <p className="text-center text-slate-600">Загрузка...</p>
  if (error) return <p className="text-center text-red-600">{error}</p>

  return (
    <section className="max-w-6xl mx-auto px-6 py-8">
      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Тематические программы</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {programs.map(p => (
          <div key={p.key} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
            <div className="h-40 bg-gradient-to-br from-pink-200 to-purple-200 flex items-center justify-center text-slate-700 font-semibold">
              {p.title}
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <p className="text-slate-600 text-sm mb-3">{p.description}</p>
              <div className="text-xs text-slate-500 mb-4">
                Возраст: {p.recommended_age} • {p.duration_minutes} мин • {p.animators.join(', ')}
              </div>
              <div className="mt-auto flex items-center justify-between">
                <div className="text-lg font-bold text-slate-900">{p.price.toLocaleString()} ₽</div>
                <button onClick={() => onSelect(p)} className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-colors">
                  Выбрать
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Programs
