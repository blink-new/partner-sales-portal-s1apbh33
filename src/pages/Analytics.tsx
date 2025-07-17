import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  TrendingUp, 
  TrendingDown,
  Users, 
  Handshake, 
  DollarSign,
  Target,
  Calendar,
  Download,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react'

const metrics = [
  {
    title: 'Total Revenue',
    value: '$2,847,500',
    change: '+12.5%',
    trend: 'up',
    icon: DollarSign,
    color: 'text-green-600'
  },
  {
    title: 'Active Partners',
    value: '47',
    change: '+6.4%',
    trend: 'up',
    icon: Users,
    color: 'text-blue-600'
  },
  {
    title: 'Deals Closed',
    value: '156',
    change: '+18.2%',
    trend: 'up',
    icon: Handshake,
    color: 'text-purple-600'
  },
  {
    title: 'Conversion Rate',
    value: '68%',
    change: '-2.1%',
    trend: 'down',
    icon: Target,
    color: 'text-orange-600'
  }
]

const topPartners = [
  {
    name: 'CloudFirst Solutions',
    deals: 15,
    revenue: 680000,
    growth: '+25%'
  },
  {
    name: 'TechSolutions Inc.',
    deals: 12,
    revenue: 450000,
    growth: '+18%'
  },
  {
    name: 'Digital Partners LLC',
    deals: 8,
    revenue: 280000,
    growth: '+12%'
  },
  {
    name: 'DataDriven Analytics',
    deals: 6,
    revenue: 195000,
    growth: '+8%'
  }
]

const dealsByStage = [
  { stage: 'Prospecting', count: 12, value: 450000 },
  { stage: 'Qualification', count: 8, value: 320000 },
  { stage: 'Proposal', count: 15, value: 680000 },
  { stage: 'Negotiation', count: 6, value: 290000 },
  { stage: 'Closing', count: 4, value: 180000 }
]

const monthlyTrends = [
  { month: 'Jan', deals: 12, revenue: 245000 },
  { month: 'Feb', deals: 18, revenue: 380000 },
  { month: 'Mar', deals: 15, revenue: 320000 },
  { month: 'Apr', deals: 22, revenue: 450000 },
  { month: 'May', deals: 19, revenue: 395000 },
  { month: 'Jun', deals: 25, revenue: 520000 }
]

export function Analytics() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">
            Track performance and insights across your partner network
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Select defaultValue="30days">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="1year">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {metric.title}
              </CardTitle>
              <metric.icon className={`h-4 w-4 ${metric.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                {metric.trend === 'up' ? (
                  <TrendingUp className="mr-1 h-3 w-3 text-green-600" />
                ) : (
                  <TrendingDown className="mr-1 h-3 w-3 text-red-600" />
                )}
                <span className={metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}>
                  {metric.change}
                </span>
                <span className="ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Top Performing Partners */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Top Performing Partners</CardTitle>
                <CardDescription>
                  Partners with highest revenue contribution
                </CardDescription>
              </div>
              <Users className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPartners.map((partner, index) => (
                <div key={partner.name} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center space-x-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{partner.name}</p>
                      <p className="text-sm text-muted-foreground">{partner.deals} deals</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${partner.revenue.toLocaleString()}</p>
                    <div className="flex items-center text-sm text-green-600">
                      <TrendingUp className="mr-1 h-3 w-3" />
                      {partner.growth}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Deal Pipeline */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Deal Pipeline</CardTitle>
                <CardDescription>
                  Deals distribution by stage
                </CardDescription>
              </div>
              <PieChart className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dealsByStage.map((stage) => (
                <div key={stage.stage} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-3 w-3 rounded-full bg-primary"></div>
                    <span className="font-medium">{stage.stage}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{stage.count} deals</p>
                    <p className="text-sm text-muted-foreground">
                      ${stage.value.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Trends */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Monthly Trends</CardTitle>
              <CardDescription>
                Deal count and revenue over time
              </CardDescription>
            </div>
            <BarChart3 className="h-5 w-5 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-6 gap-4">
              {monthlyTrends.map((month) => (
                <div key={month.month} className="text-center">
                  <div className="space-y-2">
                    <div className="h-20 bg-primary/10 rounded flex items-end justify-center p-2">
                      <div 
                        className="w-full bg-primary rounded-sm"
                        style={{ height: `${(month.deals / 25) * 100}%` }}
                      ></div>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{month.month}</p>
                      <p className="text-xs text-muted-foreground">{month.deals} deals</p>
                      <p className="text-xs text-muted-foreground">
                        ${(month.revenue / 1000).toFixed(0)}k
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Insights */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5" />
              <span>Partner Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Most Active</span>
                <Badge variant="outline">CloudFirst Solutions</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">New This Month</span>
                <Badge variant="outline">3 partners</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Avg. Deal Size</span>
                <Badge variant="outline">$18,250</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5" />
              <span>Goals Progress</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Monthly Revenue</span>
                  <span>85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>New Partners</span>
                  <span>60%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Upcoming</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Deals Closing</span>
                <Badge>4 this week</Badge>
              </div>
              <div className="flex justify-between">
                <span>Partner Reviews</span>
                <Badge variant="outline">2 pending</Badge>
              </div>
              <div className="flex justify-between">
                <span>Renewals Due</span>
                <Badge variant="outline">6 next month</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}