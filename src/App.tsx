import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ScrollToTop, Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { FloatingWhatsApp } from './components/layout/FloatingWhatsApp'
import { Home } from './pages/Home'
import { Nosotros } from './pages/Nosotros'
import { ComingSoon } from './pages/ComingSoon'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen w-full">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resolvemos" element={<ComingSoon title="Qué resolvemos" />} />
          <Route path="/casos" element={<ComingSoon title="Casos" />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="*" element={<ComingSoon title="Página no encontrada" />} />
        </Routes>
        <Footer />
        <FloatingWhatsApp />
      </div>
    </BrowserRouter>
  )
}
