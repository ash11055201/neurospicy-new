import Layout from '@/components/Layout'
import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import OrderSection from '@/components/OrderSection'
import StorySubmissionForm from '@/components/StorySubmissionForm'

export default function Home() {
  return (
    <Layout>
      <HeroSection />
      <AboutSection />
      <OrderSection />
      <StorySubmissionForm />
    </Layout>
  )
}