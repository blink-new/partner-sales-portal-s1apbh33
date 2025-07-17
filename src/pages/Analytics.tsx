import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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
  Activity,
  Filter,
  RefreshCw
} from 'lucide-react'
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart
} from 'recharts'

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

const monthlyTrends = [
  { month: 'Jan', deals: 12, revenue: 245000, partnerDeals: 7, internalDeals: 5 },
  { month: 'Feb', deals: 18, revenue: 380000, partnerDeals: 11, internalDeals: 7 },
  { month: 'Mar', deals: 15, revenue: 320000, partnerDeals: 9, internalDeals: 6 },
  { month: 'Apr', deals: 22, revenue: 450000, partnerDeals: 14, internalDeals: 8 },
  { month: 'May', deals: 19, revenue: 395000, partnerDeals: 12, internalDeals: 7 },
  { month: 'Jun', deals: 25, revenue: 520000, partnerDeals: 16, internalDeals: 9 }
]

const dealsByStage = [
  { stage: 'Prospecting', count: 12, value: 450000, color: '#8884d8' },
  { stage: 'Qualification', count: 8, value: 320000, color: '#82ca9d' },
  { stage: 'Proposal', count: 15, value: 680000, color: '#ffc658' },
  { stage: 'Negotiation', count: 6, value: 290000, color: '#ff7300' },
  { stage: 'Closing', count: 4, value: 180000, color: '#00ff00' }
]

const partnerPerformance = [
  { name: 'CloudFirst Solutions', deals: 15, revenue: 680000, growth: 25 },
  { name: 'TechSolutions Inc.', deals: 12, revenue: 450000, growth: 18 },
  { name: 'Digital Partners LLC', deals: 8, revenue: 280000, growth: 12 },
  { name: 'DataDriven Analytics', deals: 6, revenue: 195000, growth: 8 },
  { name: 'Innovation Hub', deals: 5, revenue: 150000, growth: 15 }
]

const conversionFunnel = [
  { stage: 'Leads', count: 1000, percentage: 100 },
  { stage: 'Qualified', count: 650, percentage: 65 },
  { stage: 'Proposals', count: 320, percentage: 32 },
  { stage: 'Negotiations', count: 180, percentage: 18 },
  { stage: 'Closed Won', count: 120, percentage: 12 }
]

const revenueBySource = [
  { name: 'Partner Channel', value: 1680000, percentage: 59 },
  { name: 'Direct Sales', value: 1167500, percentage: 41 }
]

export function Analytics() {
  const [timeRange, setTimeRange] = useState('30days')
  const [isLoading, setIsLoading] = useState(false)

  const handleRefresh = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsLoading(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Advanced Analytics</h1>
          <p className="text-muted-foreground">
            Comprehensive insights and performance metrics across your partner ecosystem
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
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
          <Button variant="outline" onClick={handleRefresh} disabled={isLoading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.title} className="relative overflow-hidden">
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
            <div className={`absolute bottom-0 left-0 h-1 w-full ${metric.trend === 'up' ? 'bg-green-500' : 'bg-red-500'}`} />
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="partners">Partners</TabsTrigger>
          <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Revenue Trends */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>Revenue Trends</span>
                </CardTitle>
                <CardDescription>Monthly revenue and deal count over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={monthlyTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip 
                      formatter={(value, name) => [
                        name === 'revenue' ? `$${(value as number).toLocaleString()}` : value,
                        name === 'revenue' ? 'Revenue' : 'Deals'
                      ]}
                    />
                    <Legend />
                    <Area
                      yAxisId="left"
                      type="monotone"
                      dataKey="revenue"
                      fill="#2563eb"
                      fillOpacity={0.3}
                      stroke="#2563eb"
                      name="Revenue"
                    />
                    <Bar yAxisId="right" dataKey="deals" fill="#f59e0b" name="Deals" />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Deal Pipeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <PieChart className="h-5 w-5" />
                  <span>Deal Pipeline Distribution</span>
                </CardTitle>
                <CardDescription>Deals by stage with values</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={dealsByStage}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ stage, percentage }) => `${stage} (${percentage}%)`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {dealsByStage.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [value, 'Deals']} />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Partner vs Internal Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5" />
                <span>Partner vs Internal Performance</span>
              </CardTitle>
              <CardDescription>Comparison of partner-sourced vs internally-sourced deals</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="partnerDeals" stackId="a" fill="#2563eb" name="Partner Deals" />
                  <Bar dataKey="internalDeals" stackId="a" fill="#f59e0b" name="Internal Deals" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Revenue by Source */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue by Source</CardTitle>
                <CardDescription>Partner channel vs direct sales contribution</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={revenueBySource}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percentage }) => `${name} (${percentage}%)`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      <Cell fill="#2563eb" />
                      <Cell fill="#f59e0b" />
                    </Pie>
                    <Tooltip formatter={(value) => [`$${(value as number).toLocaleString()}`, 'Revenue']} />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Monthly Revenue Growth */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Revenue Growth</CardTitle>
                <CardDescription>Revenue growth rate month over month</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${(value as number).toLocaleString()}`, 'Revenue']} />
                    <Line 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#2563eb" 
                      strokeWidth={3}
                      dot={{ fill: '#2563eb', strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Revenue Breakdown Table */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue Breakdown</CardTitle>
              <CardDescription>Detailed revenue analysis by month and source</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Month</th>
                      <th className="text-right p-2">Total Revenue</th>
                      <th className="text-right p-2">Partner Revenue</th>
                      <th className="text-right p-2">Internal Revenue</th>
                      <th className="text-right p-2">Growth Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {monthlyTrends.map((month, index) => {
                      const prevRevenue = index > 0 ? monthlyTrends[index - 1].revenue : month.revenue
                      const growthRate = ((month.revenue - prevRevenue) / prevRevenue * 100).toFixed(1)
                      const partnerRevenue = Math.round(month.revenue * 0.6)
                      const internalRevenue = month.revenue - partnerRevenue
                      
                      return (
                        <tr key={month.month} className="border-b">
                          <td className="p-2 font-medium">{month.month}</td>
                          <td className="p-2 text-right">${month.revenue.toLocaleString()}</td>
                          <td className="p-2 text-right">${partnerRevenue.toLocaleString()}</td>
                          <td className="p-2 text-right">${internalRevenue.toLocaleString()}</td>
                          <td className="p-2 text-right">
                            <span className={index === 0 ? 'text-muted-foreground' : growthRate.startsWith('-') ? 'text-red-600' : 'text-green-600'}>
                              {index === 0 ? '-' : `${growthRate}%`}
                            </span>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="partners" className="space-y-6">
          {/* Top Partners Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Partner Performance Ranking</CardTitle>
              <CardDescription>Revenue and deal count by partner</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={partnerPerformance} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={150} />
                  <Tooltip 
                    formatter={(value, name) => [
                      name === 'revenue' ? `$${(value as number).toLocaleString()}` : value,
                      name === 'revenue' ? 'Revenue' : name === 'deals' ? 'Deals' : 'Growth %'
                    ]}
                  />
                  <Legend />
                  <Bar dataKey="revenue" fill="#2563eb" name="Revenue" />
                  <Bar dataKey="deals" fill="#f59e0b" name="Deals" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Partner Growth Trends */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Partner Growth Rate</CardTitle>
                <CardDescription>Year-over-year growth by partner</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={partnerPerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value}%`, 'Growth Rate']} />
                    <Bar dataKey="growth" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Partner Tier Distribution</CardTitle>
                <CardDescription>Partners by tier level</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { tier: 'Platinum', count: 3, color: 'bg-purple-500' },
                    { tier: 'Gold', count: 8, color: 'bg-yellow-500' },
                    { tier: 'Silver', count: 15, color: 'bg-gray-400' },
                    { tier: 'Bronze', count: 21, color: 'bg-orange-600' }
                  ].map((tier) => (
                    <div key={tier.tier} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`h-4 w-4 rounded ${tier.color}`}></div>
                        <span className="font-medium">{tier.tier}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-semibold">{tier.count}</span>
                        <span className="text-sm text-muted-foreground ml-1">partners</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="pipeline" className="space-y-6">
          {/* Conversion Funnel */}
          <Card>
            <CardHeader>
              <CardTitle>Sales Conversion Funnel</CardTitle>
              <CardDescription>Lead to customer conversion rates</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={conversionFunnel}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="stage" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value, name) => [
                      value,
                      name === 'count' ? 'Count' : 'Percentage'
                    ]}
                  />
                  <Bar dataKey="count" fill="#2563eb" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Pipeline Health */}
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Pipeline Velocity</CardTitle>
                <CardDescription>Average time in each stage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { stage: 'Prospecting', days: 14 },
                    { stage: 'Qualification', days: 7 },
                    { stage: 'Proposal', days: 21 },
                    { stage: 'Negotiation', days: 12 },
                    { stage: 'Closing', days: 5 }
                  ].map((stage) => (
                    <div key={stage.stage} className="flex justify-between">
                      <span className="text-sm">{stage.stage}</span>
                      <Badge variant="outline">{stage.days} days</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Win Rate by Stage</CardTitle>
                <CardDescription>Probability of closing deals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { stage: 'Prospecting', rate: 15 },
                    { stage: 'Qualification', rate: 35 },
                    { stage: 'Proposal', rate: 65 },
                    { stage: 'Negotiation', rate: 85 },
                    { stage: 'Closing', rate: 95 }
                  ].map((stage) => (
                    <div key={stage.stage} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{stage.stage}</span>
                        <span>{stage.rate}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${stage.rate}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Deal Size Distribution</CardTitle>
                <CardDescription>Average deal value by stage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {dealsByStage.map((stage) => (
                    <div key={stage.stage} className="flex justify-between">
                      <span className="text-sm">{stage.stage}</span>
                      <Badge variant="outline">
                        ${Math.round(stage.value / stage.count).toLocaleString()}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          {/* Performance Metrics */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Avg Deal Size</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$18,250</div>
                <div className="text-xs text-green-600 flex items-center">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  +8.2% vs last month
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Sales Cycle</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45 days</div>
                <div className="text-xs text-green-600 flex items-center">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  -3 days vs last month
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Partner Satisfaction</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.8/5</div>
                <div className="text-xs text-green-600 flex items-center">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  +0.2 vs last quarter
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Lead Response Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.4 hrs</div>
                <div className="text-xs text-green-600 flex items-center">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  -0.8 hrs vs last month
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Trends */}
          <Card>
            <CardHeader>
              <CardTitle>Key Performance Indicators</CardTitle>
              <CardDescription>Track important metrics over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={monthlyTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="deals" 
                    stroke="#2563eb" 
                    strokeWidth={2}
                    name="Total Deals"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="partnerDeals" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    name="Partner Deals"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="internalDeals" 
                    stroke="#f59e0b" 
                    strokeWidth={2}
                    name="Internal Deals"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}