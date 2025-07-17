import { 
  BarChart3, 
  Building2, 
  FileText, 
  Home, 
  Settings, 
  Users, 
  Handshake,
  BookOpen,
  UserPlus,
  Briefcase,
  Target,
  Phone,
  TrendingUp,
  Mail,
  UserCog
} from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

const menuItems = [
  {
    title: 'Dashboard',
    url: '#',
    icon: Home,
  }
]

const partnerMenuItems = [
  {
    title: 'Deal Registry',
    url: '#',
    icon: Handshake,
  },
  {
    title: 'Partner Directory',
    url: '#',
    icon: Building2,
  },
  {
    title: 'Resources',
    url: '#',
    icon: BookOpen,
  },
  {
    title: 'Partner Onboarding',
    url: '#',
    icon: UserPlus,
  }
]

const crmMenuItems = [
  {
    title: 'Leads',
    url: '#',
    icon: Target,
  },
  {
    title: 'Contacts',
    url: '#',
    icon: Users,
  },
  {
    title: 'Deals Pipeline',
    url: '#',
    icon: Briefcase,
  },
  {
    title: 'Activities',
    url: '#',
    icon: Phone,
  },
  {
    title: 'Email Marketing',
    url: '#',
    icon: Mail,
  }
]

const sharedMenuItems = [
  {
    title: 'Analytics',
    url: '#',
    icon: TrendingUp,
  },
  {
    title: 'User Management',
    url: '#',
    icon: UserCog,
  },
  {
    title: 'Settings',
    url: '#',
    icon: Settings,
  }
]

interface AppSidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function AppSidebar({ activeTab, onTabChange }: AppSidebarProps) {
  return (
    <Sidebar>
      <SidebarContent>
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg font-semibold text-primary mb-4">
            Partner Sales Portal
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    onClick={() => onTabChange(item.title)}
                    isActive={activeTab === item.title}
                    className="w-full justify-start"
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Partner Portal Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm font-medium text-muted-foreground">
            Partner Portal
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {partnerMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    onClick={() => onTabChange(item.title)}
                    isActive={activeTab === item.title}
                    className="w-full justify-start"
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Internal CRM Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm font-medium text-muted-foreground">
            Internal CRM
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {crmMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    onClick={() => onTabChange(item.title)}
                    isActive={activeTab === item.title}
                    className="w-full justify-start"
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Shared Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm font-medium text-muted-foreground">
            Shared
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sharedMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    onClick={() => onTabChange(item.title)}
                    isActive={activeTab === item.title}
                    className="w-full justify-start"
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}