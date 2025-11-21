import { useState } from 'react'
import Hero from './components/Hero'
import Programs from './components/Programs'
import BookingForm from './components/BookingForm'

function App() {
  const [selected, setSelected] = useState(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <Hero />
      <Programs onSelect={setSelected} />
      <BookingForm selectedProgram={selected} />
      <footer className="text-center text-xs text-slate-500 py-8">© Детский центр, {new Date().getFullYear()}</footer>
    </div>
  )
}

export default App
