import { AboutHero } from './sections/AboutHero'
import { AboutContrast } from './sections/AboutContrast'
import { AboutTeam } from './sections/AboutTeam'
import { AboutPrinciples } from './sections/AboutPrinciples'
import { Contact } from '../../components/Contact'

export function Nosotros() {
  return (
    <main>
      <AboutHero />
      <AboutContrast />
      <AboutTeam />
      <AboutPrinciples />
      <Contact />
    </main>
  )
}
