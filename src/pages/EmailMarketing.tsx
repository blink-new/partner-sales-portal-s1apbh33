import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useToast } from '@/hooks/use-toast'
import { blink } from '@/blink/client'
import { 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  MoreHorizontal,
  Mail,
  Send,
  Clock,
  Users,
  TrendingUp,
  BarChart3,
  Loader2,
  Play,
  Pause,
  Copy,
  Trash2,
  Settings,
  Target,
  MousePointer,
  ExternalLink
} from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

export function EmailMarketing() {
  const [activeTab, setActiveTab] = useState('campaigns')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [dialogType, setDialogType] = useState('campaign') // 'campaign', 'template', 'sequence'
  const [searchTerm, setSearchTerm] = useState('')
  const [campaigns, setCampaigns] = useState([])
  const [templates, setTemplates] = useState([])
  const [sequences, setSequences] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    content: '',
    type: 'one-time',
    audience: 'all',
    scheduleDate: '',
    templateId: ''
  })
  const { toast } = useToast()

  useEffect(() => {
    loadEmailData()
  }, [])

  const loadEmailData = async () => {
    try {
      setLoading(true)
      const user = await blink.auth.me()
      
      // Mock data for email marketing
      setCampaigns([
        {
          id: 'CAMP-001',
          name: 'Q1 Partner Onboarding',
          subject: 'Welcome to Our Partner Program',
          type: 'one-time',
          status: 'sent',
          audience: 'new_partners',
          sent: 45,
          delivered: 43,
          opened: 28,
          clicked: 12,
          sentDate: '2024-01-15',
          openRate: 65.1,
          clickRate: 27.9
        },
        {
          id: 'CAMP-002',
          name: 'Deal Registration Reminder',
          subject: 'Don\'t Forget to Register Your Deals',
          type: 'automated',
          status: 'active',
          audience: 'active_partners',
          sent: 128,
          delivered: 125,
          opened: 89,
          clicked: 34,
          sentDate: '2024-01-10',
          openRate: 71.2,
          clickRate: 38.2
        },
        {
          id: 'CAMP-003',
          name: 'Monthly Newsletter',
          subject: 'Partner Success Stories & Updates',
          type: 'recurring',
          status: 'scheduled',
          audience: 'all_partners',
          sent: 0,
          delivered: 0,
          opened: 0,
          clicked: 0,
          sentDate: '2024-01-20',
          openRate: 0,
          clickRate: 0
        }
      ])

      setTemplates([
        {
          id: 'TEMP-001',
          name: 'Welcome Email',
          subject: 'Welcome to Our Partner Program',
          category: 'onboarding',
          lastUsed: '2024-01-15',
          usage: 12
        },
        {
          id: 'TEMP-002',
          name: 'Deal Registration Reminder',
          subject: 'Register Your Deal for Better Support',
          category: 'reminders',
          lastUsed: '2024-01-12',
          usage: 8
        },
        {
          id: 'TEMP-003',
          name: 'Monthly Newsletter',
          subject: 'Partner Updates & Success Stories',
          category: 'newsletters',
          lastUsed: '2024-01-08',
          usage: 6
        }
      ])

      setSequences([
        {
          id: 'SEQ-001',
          name: 'Partner Onboarding Sequence',
          description: '5-email sequence for new partners',
          emails: 5,
          status: 'active',
          enrolled: 23,
          completed: 18,
          avgOpenRate: 68.5,
          avgClickRate: 32.1
        },
        {
          id: 'SEQ-002',
          name: 'Deal Follow-up Sequence',
          description: '3-email follow-up for registered deals',
          emails: 3,
          status: 'active',
          enrolled: 45,
          completed: 38,
          avgOpenRate: 72.3,
          avgClickRate: 28.7
        }
      ])
      
    } catch (error) {
      console.error('Error loading email data:', error)
      toast({
        title: "Error",
        description: "Failed to load email marketing data",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async () => {
    try {
      setSubmitting(true)
      const user = await blink.auth.me()
      
      if (!formData.name || !formData.subject) {
        toast({
          title: "Validation Error",
          description: "Please fill in all required fields",
          variant: "destructive"
        })
        return
      }

      if (dialogType === 'campaign') {
        const newCampaign = {
          id: `CAMP-${Date.now()}`,
          name: formData.name,
          subject: formData.subject,
          type: formData.type,
          status: 'draft',
          audience: formData.audience,
          sent: 0,
          delivered: 0,
          opened: 0,
          clicked: 0,
          sentDate: formData.scheduleDate || new Date().toISOString().split('T')[0],
          openRate: 0,
          clickRate: 0
        }
        setCampaigns(prev => [newCampaign, ...prev])
      }
      
      setFormData({
        name: '',
        subject: '',
        content: '',
        type: 'one-time',
        audience: 'all',
        scheduleDate: '',
        templateId: ''
      })
      
      setIsDialogOpen(false)
      
      toast({
        title: "Success",
        description: `${dialogType === 'campaign' ? 'Campaign' : 'Template'} created successfully`
      })
      
    } catch (error) {
      console.error('Error creating item:', error)
      toast({
        title: "Error",
        description: "Failed to create item",
        variant: "destructive"
      })
    } finally {
      setSubmitting(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent':
        return 'bg-green-100 text-green-800'
      case 'active':
        return 'bg-blue-100 text-blue-800'
      case 'scheduled':
        return 'bg-yellow-100 text-yellow-800'
      case 'draft':
        return 'bg-gray-100 text-gray-800'
      case 'paused':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const openDialog = (type: string) => {
    setDialogType(type)
    setIsDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Email Marketing</h1>
          <p className="text-muted-foreground">
            Create campaigns, manage templates, and track email performance
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={() => openDialog('template')}>
            <Plus className="mr-2 h-4 w-4" />
            New Template
          </Button>
          <Button className="bg-primary hover:bg-primary/90" onClick={() => openDialog('campaign')}>
            <Plus className="mr-2 h-4 w-4" />
            New Campaign
          </Button>
        </div>
      </div>

      {/* Email Marketing Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Campaigns</CardTitle>
            <Mail className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+3</span> this month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Emails Sent</CardTitle>
            <Send className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,847</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+18%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Open Rate</CardTitle>
            <Eye className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68.5%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+2.3%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Click Rate</CardTitle>
            <MousePointer className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32.8%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+1.2%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="sequences">Sequences</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="space-y-6">
          {/* Search and Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search campaigns..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="sent">Sent</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="one-time">One-time</SelectItem>
                    <SelectItem value="recurring">Recurring</SelectItem>
                    <SelectItem value="automated">Automated</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Campaigns Table */}
          <Card>
            <CardHeader>
              <CardTitle>Email Campaigns</CardTitle>
              <CardDescription>
                Manage your email campaigns and track performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin" />
                  <span className="ml-2">Loading campaigns...</span>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Campaign</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Audience</TableHead>
                      <TableHead>Sent</TableHead>
                      <TableHead>Open Rate</TableHead>
                      <TableHead>Click Rate</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {campaigns.map((campaign) => (
                      <TableRow key={campaign.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{campaign.name}</p>
                            <p className="text-sm text-muted-foreground">{campaign.subject}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{campaign.type}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(campaign.status)}>
                            {campaign.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{campaign.audience.replace('_', ' ')}</TableCell>
                        <TableCell>{campaign.sent}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <span>{campaign.openRate}%</span>
                            {campaign.openRate > 0 && (
                              <div className="w-16 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-blue-600 h-2 rounded-full" 
                                  style={{ width: `${Math.min(campaign.openRate, 100)}%` }}
                                ></div>
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <span>{campaign.clickRate}%</span>
                            {campaign.clickRate > 0 && (
                              <div className="w-16 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-green-600 h-2 rounded-full" 
                                  style={{ width: `${Math.min(campaign.clickRate, 100)}%` }}
                                ></div>
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          {new Date(campaign.sentDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Campaign
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Copy className="mr-2 h-4 w-4" />
                                Duplicate
                              </DropdownMenuItem>
                              {campaign.status === 'active' ? (
                                <DropdownMenuItem>
                                  <Pause className="mr-2 h-4 w-4" />
                                  Pause
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem>
                                  <Play className="mr-2 h-4 w-4" />
                                  Activate
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Templates</CardTitle>
              <CardDescription>
                Reusable email templates for your campaigns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {templates.map((template) => (
                  <Card key={template.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{template.name}</CardTitle>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              Preview
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="mr-2 h-4 w-4" />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <CardDescription>{template.subject}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Category:</span>
                          <Badge variant="outline">{template.category}</Badge>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Used:</span>
                          <span>{template.usage} times</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Last used:</span>
                          <span>{new Date(template.lastUsed).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <Button className="w-full mt-4" variant="outline">
                        Use Template
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sequences" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Sequences</CardTitle>
              <CardDescription>
                Automated email sequences and drip campaigns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sequences.map((sequence) => (
                  <div key={sequence.id} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="space-y-1">
                      <h4 className="font-medium">{sequence.name}</h4>
                      <p className="text-sm text-muted-foreground">{sequence.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>{sequence.emails} emails</span>
                        <span>•</span>
                        <span>{sequence.enrolled} enrolled</span>
                        <span>•</span>
                        <span>{sequence.completed} completed</span>
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <Badge className={getStatusColor(sequence.status)}>
                        {sequence.status}
                      </Badge>
                      <div className="text-sm text-muted-foreground">
                        <div>Open: {sequence.avgOpenRate}%</div>
                        <div>Click: {sequence.avgClickRate}%</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Campaign Performance</CardTitle>
                <CardDescription>
                  Email campaign metrics over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Open Rate Trend</span>
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="h-32 bg-muted rounded flex items-end justify-center">
                    <p className="text-muted-foreground">Chart visualization coming soon</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Performing Campaigns</CardTitle>
                <CardDescription>
                  Campaigns with highest engagement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {campaigns.slice(0, 3).map((campaign, index) => (
                    <div key={campaign.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-xs">
                          {index + 1}
                        </div>
                        <span className="text-sm font-medium">{campaign.name}</span>
                      </div>
                      <div className="text-right text-sm">
                        <div className="text-green-600">{campaign.openRate}% open</div>
                        <div className="text-blue-600">{campaign.clickRate}% click</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Create Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              Create New {dialogType === 'campaign' ? 'Campaign' : 'Template'}
            </DialogTitle>
            <DialogDescription>
              {dialogType === 'campaign' 
                ? 'Create a new email campaign to send to your partners'
                : 'Create a reusable email template'
              }
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input 
                id="name" 
                placeholder={`Enter ${dialogType} name`}
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject Line *</Label>
              <Input 
                id="subject" 
                placeholder="Enter email subject"
                value={formData.subject}
                onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
              />
            </div>
            {dialogType === 'campaign' && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Campaign Type</Label>
                    <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="one-time">One-time</SelectItem>
                        <SelectItem value="recurring">Recurring</SelectItem>
                        <SelectItem value="automated">Automated</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="audience">Audience</Label>
                    <Select value={formData.audience} onValueChange={(value) => setFormData(prev => ({ ...prev, audience: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select audience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Partners</SelectItem>
                        <SelectItem value="new_partners">New Partners</SelectItem>
                        <SelectItem value="active_partners">Active Partners</SelectItem>
                        <SelectItem value="inactive_partners">Inactive Partners</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="scheduleDate">Schedule Date (Optional)</Label>
                  <Input 
                    id="scheduleDate" 
                    type="datetime-local"
                    value={formData.scheduleDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, scheduleDate: e.target.value }))}
                  />
                </div>
              </>
            )}
            <div className="space-y-2">
              <Label htmlFor="content">Email Content</Label>
              <Textarea 
                id="content" 
                placeholder="Enter email content..."
                className="min-h-32"
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={submitting}>
              {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create {dialogType === 'campaign' ? 'Campaign' : 'Template'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}