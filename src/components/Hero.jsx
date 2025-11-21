import React from 'react'

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100" />
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-pink-300/30 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-blue-300/30 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight">
          Интерактивный детский центр
        </h1>
        <p className="mt-4 text-lg md:text-xl text-slate-600">
          Выбирайте тематические программы с аниматорами и бронируйте праздник в пару кликов
        </p>
      </div>
    </section>
  )
}

export default Hero
