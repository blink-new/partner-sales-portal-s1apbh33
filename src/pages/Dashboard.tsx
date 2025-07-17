import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { blink } from '@/blink/client'
import { 
  TrendingUp, 
  Users, 
  Handshake, 
  DollarSign,
  Plus,
  ArrowUpRight,
  Clock,
  CheckCircle,
  Loader2
} from 'lucide-react'

const stats = [
  {
    title: 'Total Revenue',
    value: '$245,000',
    change: '+$45k this month',
    icon: DollarSign,
    color: 'text-green-600',
    description: 'Partner + Internal deals'
  },
  {
    title: 'Active Partners',
    value: '8',
    change: '+2 this month',
    icon: Users,
    color: 'text-blue-600',
    description: 'External partners'
  },
  {
    title: 'Partner Deals',
    value: '12',
    change: '+4 this month',
    icon: Handshake,
    color: 'text-orange-600',
    description: 'Registered by partners'
  },
  {
    title: 'Internal Pipeline',
    value: '$520k',
    change: '+$120k this month',
    icon: TrendingUp,
    color: 'text-purple-600',
    description: 'Our direct deals'
  }
]

const recentDeals = [
  {
    id: '1',
    title: 'Small Business CRM Setup',
    partner: 'Local Tech Partners',
    value: '$8,500',
    status: 'Approved',
    stage: 'Closing',
    probability: 90
  },
  {
    id: '2',
    title: 'Website Redesign Project',
    partner: 'Design Studio Co',
    value: '$12,000',
    status: 'Submitted',
    stage: 'Proposal',
    probability: 70
  },
  {
    id: '3',
    title: 'Email Marketing Setup',
    partner: 'Marketing Pros',
    value: '$3,500',
    status: 'Draft',
    stage: 'Qualification',
    probability: 50
  }
]

const recentActivity = [
  {
    id: '1',
    type: 'deal_created',
    title: 'New deal registered',
    description: 'Small Business CRM Setup by Local Tech Partners',
    time: '2 hours ago'
  },
  {
    id: '2',
    type: 'partner_joined',
    title: 'New partner joined',
    description: 'Marketing Pros joined the partner program',
    time: '1 day ago'
  },
  {
    id: '3',
    type: 'deal_updated',
    title: 'Deal closed',
    description: 'Website Redesign Project successfully closed',
    time: '2 days ago'
  }
]

export function Dashboard() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [dashboardData, setDashboardData] = useState({
    stats: [],
    recentDeals: [],
    recentActivity: []
  })

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      const currentUser = await blink.auth.me()
      setUser(currentUser)
      
      // Load dashboard data (using mock data for now)
      setDashboardData({
        stats: [
          {
            title: 'Total Revenue',
            value: '$45,000',
            change: '+$15k this month',
            icon: DollarSign,
            color: 'text-green-600'
          },
          {
            title: 'Active Partners',
            value: '8',
            change: '+2 this month',
            icon: Users,
            color: 'text-blue-600'
          },
          {
            title: 'Open Deals',
            value: '12',
            change: '+4 this month',
            icon: Handshake,
            color: 'text-orange-600'
          },
          {
            title: 'Deals Closed',
            value: '3',
            change: '+1 this month',
            icon: CheckCircle,
            color: 'text-purple-600'
          }
        ],
        recentDeals: [
          {
            id: '1',
            title: 'Small Business CRM Setup',
            partner: 'Local Tech Partners',
            value: '$8,500',
            status: 'Approved',
            stage: 'Closing',
            probability: 90
          },
          {
            id: '2',
            title: 'Website Redesign Project',
            partner: 'Design Studio Co',
            value: '$12,000',
            status: 'Submitted',
            stage: 'Proposal',
            probability: 70
          },
          {
            id: '3',
            title: 'Email Marketing Setup',
            partner: 'Marketing Pros',
            value: '$3,500',
            status: 'Draft',
            stage: 'Qualification',
            probability: 50
          }
        ],
        recentActivity: [
          {
            id: '1',
            type: 'deal_created',
            title: 'New deal registered',
            description: 'Small Business CRM Setup by Local Tech Partners',
            time: '2 hours ago'
          },
          {
            id: '2',
            type: 'partner_joined',
            title: 'New partner joined',
            description: 'Marketing Pros joined the partner program',
            time: '1 day ago'
          },
          {
            id: '3',
            type: 'deal_updated',
            title: 'Deal closed',
            description: 'Website Redesign Project successfully closed',
            time: '2 days ago'
          }
        ]
      })
    } catch (error) {
      console.error('Error loading dashboard:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading dashboard...</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back{user?.displayName ? `, ${user.displayName}` : ''}! Here's your partner portal and CRM overview.
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          New Deal
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {dashboardData.stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">{stat.change}</span> from last month
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Deals */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Deals</CardTitle>
                <CardDescription>
                  Latest deal registrations and updates
                </CardDescription>
              </div>
              <Button variant="ghost" size="sm">
                View All
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardData.recentDeals.map((deal) => (
                <div key={deal.id} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="space-y-1">
                    <p className="font-medium">{deal.title}</p>
                    <p className="text-sm text-muted-foreground">{deal.partner}</p>
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant={deal.status === 'Approved' ? 'default' : 
                                deal.status === 'Submitted' ? 'secondary' : 'outline'}
                      >
                        {deal.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {deal.probability}% probability
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{deal.value}</p>
                    <p className="text-sm text-muted-foreground">{deal.stage}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Activity Feed */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Latest updates from your partner network
                </CardDescription>
              </div>
              <Button variant="ghost" size="sm">
                View All
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardData.recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    {activity.type === 'deal_created' && (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                        <Handshake className="h-4 w-4 text-blue-600" />
                      </div>
                    )}
                    {activity.type === 'partner_joined' && (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                        <Users className="h-4 w-4 text-green-600" />
                      </div>
                    )}
                    {activity.type === 'deal_updated' && (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100">
                        <CheckCircle className="h-4 w-4 text-orange-600" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="mr-1 h-3 w-3" />
                      {activity.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}