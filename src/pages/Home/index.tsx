import { Hero } from './sections/Hero'
import { Pains } from './sections/Pains'
import { Simplicity } from './sections/Simplicity'
import { Solutions } from './sections/Solutions'
import { Process } from './sections/Process'
import { Sectors } from './sections/Sectors'
import { BeforeAfter } from './sections/BeforeAfter'
import { Training } from './sections/Training'
import { SocialProof } from './sections/SocialProof'
import { Team } from './sections/Team'
import { Faq } from './sections/Faq'
import { Contact } from '../../components/Contact'

export function Home() {
  return (
    <main>
      <Hero />
      <Pains />
      <Simplicity />
      <Solutions />
      <Process />
      <Sectors />
      <BeforeAfter />
      <Training />
      <SocialProof />
      <Contact />
      <Team />
      <Faq />
    </main>
  )
}
