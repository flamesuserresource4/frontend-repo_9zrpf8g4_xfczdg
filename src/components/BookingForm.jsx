import React, { useState } from 'react'

function BookingForm({ selectedProgram }) {
  const [form, setForm] = useState({
    parent_name: '',
    phone: '',
    preferred_date: '',
    child_name: '',
    child_age: '',
    comment: ''
  })
  const [status, setStatus] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('')
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const payload = {
        ...form,
        child_age: form.child_age ? Number(form.child_age) : undefined,
        preferred_date: form.preferred_date,
        program_key: selectedProgram?.key || 'custom'
      }
      const res = await fetch(`${baseUrl}/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!res.ok) throw new Error('Не удалось отправить заявку')
      setStatus('Заявка отправлена! Мы свяжемся с вами.')
      setForm({ parent_name: '', phone: '', preferred_date: '', child_name: '', child_age: '', comment: '' })
    } catch (e) {
      setStatus(`Ошибка: ${e.message}`)
    }
  }

  return (
    <section className="max-w-4xl mx-auto px-6 py-8">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-xl font-bold text-slate-900 mb-2">Оставить заявку</h3>
        {selectedProgram && (
          <p className="text-sm text-slate-600 mb-4">Программа: <span className="font-medium">{selectedProgram.title}</span></p>
        )}
        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
          <div className="md:col-span-1">
            <label className="block text-sm text-slate-600 mb-1">Ваше имя</label>
            <input name="parent_name" value={form.parent_name} onChange={handleChange} required className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300" />
          </div>
          <div className="md:col-span-1">
            <label className="block text-sm text-slate-600 mb-1">Телефон</label>
            <input name="phone" value={form.phone} onChange={handleChange} required className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300" placeholder="+7" />
          </div>
          <div className="md:col-span-1">
            <label className="block text-sm text-slate-600 mb-1">Дата праздника</label>
            <input type="date" name="preferred_date" value={form.preferred_date} onChange={handleChange} required className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300" />
          </div>
          <div className="md:col-span-1">
            <label className="block text-sm text-slate-600 mb-1">Имя ребёнка</label>
            <input name="child_name" value={form.child_name} onChange={handleChange} className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300" />
          </div>
          <div className="md:col-span-1">
            <label className="block text-sm text-slate-600 mb-1">Возраст ребёнка</label>
            <input type="number" name="child_age" value={form.child_age} onChange={handleChange} min="0" max="18" className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm text-slate-600 mb-1">Пожелания</label>
            <textarea name="comment" value={form.comment} onChange={handleChange} rows="3" className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300" />
          </div>
          <div className="md:col-span-2 flex items-center justify-between gap-4">
            <p className="text-sm text-slate-500">Оставьте телефон и удобную дату — мы перезвоним для подтверждения.</p>
            <button type="submit" className="px-5 py-2.5 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-colors">Отправить</button>
          </div>
        </form>
        {status && <p className="mt-4 text-sm {status.startsWith('Ошибка') ? 'text-red-600' : 'text-green-700'}">{status}</p>}
      </div>
    </section>
  )
}

export default BookingForm
