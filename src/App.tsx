import { useState, useEffect } from 'react'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import { Toaster } from '@/components/ui/toaster'
import { AppSidebar } from '@/components/layout/AppSidebar'
import { Header } from '@/components/layout/Header'
import { Dashboard } from '@/pages/Dashboard'
import { DealRegistry } from '@/pages/DealRegistry'
import { PartnerDirectory } from '@/pages/PartnerDirectory'
import { PartnerOnboarding } from '@/pages/PartnerOnboarding'
import { Resources } from '@/pages/Resources'
import { Leads } from '@/pages/Leads'
import { Contacts } from '@/pages/Contacts'
import { DealsPipeline } from '@/pages/DealsPipeline'
import { Activities } from '@/pages/Activities'
import { Analytics } from '@/pages/Analytics'
import { Settings } from '@/pages/Settings'
import { EmailMarketing } from '@/pages/EmailMarketing'
import { UserManagement } from '@/pages/UserManagement'
import { blink } from '@/blink/client'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('Dashboard')

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setLoading(state.isLoading)
    })
    return unsubscribe
  }, [])

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-primary">Partner Sales Portal</h1>
          <p className="text-muted-foreground">Please sign in to continue</p>
          <button 
            onClick={() => blink.auth.login()}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Sign In
          </button>
        </div>
      </div>
    )
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return <Dashboard />
      // Partner Portal Pages
      case 'Deal Registry':
        return <DealRegistry />
      case 'Partner Directory':
        return <PartnerDirectory />
      case 'Resources':
        return <Resources />
      case 'Partner Onboarding':
        return <PartnerOnboarding />
      // Internal CRM Pages
      case 'Leads':
        return <Leads />
      case 'Contacts':
        return <Contacts />
      case 'Deals Pipeline':
        return <DealsPipeline />
      case 'Activities':
        return <Activities />
      // Shared Pages
      case 'Analytics':
        return <Analytics />
      case 'Settings':
        return <Settings />
      case 'User Management':
        return <UserManagement />
      default:
        return <Dashboard />
    }
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <SidebarInset className="flex-1">
          <Header user={user} />
          <main className="flex-1 overflow-auto p-6 bg-background">
            {renderContent()}
          </main>
        </SidebarInset>
      </div>
      <Toaster />
    </SidebarProvider>
  )
}

export default App