import Navigation from '@/components/Navigation'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pt-16">
        {children}
      </main>
    </div>
  )
}
