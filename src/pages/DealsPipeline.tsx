import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useToast } from '@/hooks/use-toast'
import { blink } from '@/blink/client'
import { 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  MoreHorizontal,
  DollarSign,
  Calendar,
  User,
  Building2,
  Loader2,
  TrendingUp
} from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

const pipelineStages = [
  { id: 'prospecting', name: 'Prospecting', color: 'bg-gray-100 text-gray-800' },
  { id: 'qualification', name: 'Qualification', color: 'bg-blue-100 text-blue-800' },
  { id: 'proposal', name: 'Proposal', color: 'bg-yellow-100 text-yellow-800' },
  { id: 'negotiation', name: 'Negotiation', color: 'bg-orange-100 text-orange-800' },
  { id: 'closing', name: 'Closing', color: 'bg-green-100 text-green-800' },
  { id: 'won', name: 'Won', color: 'bg-emerald-100 text-emerald-800' },
  { id: 'lost', name: 'Lost', color: 'bg-red-100 text-red-800' }
]

export function DealsPipeline() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [deals, setDeals] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    value: '',
    contactName: '',
    contactEmail: '',
    company: '',
    stage: 'prospecting',
    probability: '',
    expectedCloseDate: '',
    description: ''
  })
  const { toast } = useToast()

  useEffect(() => {
    loadDeals()
  }, [])

  const loadDeals = async () => {
    try {
      setLoading(true)
      const user = await blink.auth.me()
      // Mock data for internal deals
      setDeals([
        {
          id: 'INT-001',
          title: 'Enterprise Software License',
          contactName: 'John Smith',
          contactEmail: 'john@techcorp.com',
          company: 'TechCorp Inc.',
          value: 150000,
          stage: 'negotiation',
          probability: 80,
          expectedCloseDate: '2024-02-20',
          createdAt: '2024-01-10',
          lastActivity: '2024-01-16',
          source: 'Inbound'
        },
        {
          id: 'INT-002',
          title: 'Marketing Automation Platform',
          contactName: 'Sarah Johnson',
          contactEmail: 'sarah@startupxyz.com',
          company: 'StartupXYZ',
          value: 75000,
          stage: 'proposal',
          probability: 65,
          expectedCloseDate: '2024-02-28',
          createdAt: '2024-01-12',
          lastActivity: '2024-01-15',
          source: 'Cold Outreach'
        },
        {
          id: 'INT-003',
          title: 'Cloud Infrastructure Setup',
          contactName: 'Mike Chen',
          contactEmail: 'mike@megacorp.com',
          company: 'MegaCorp Ltd',
          value: 200000,
          stage: 'qualification',
          probability: 45,
          expectedCloseDate: '2024-03-15',
          createdAt: '2024-01-14',
          lastActivity: '2024-01-14',
          source: 'Referral'
        },
        {
          id: 'INT-004',
          title: 'Custom Development Project',
          contactName: 'Lisa Wang',
          contactEmail: 'lisa@innovate.com',
          company: 'Innovate Solutions',
          value: 95000,
          stage: 'prospecting',
          probability: 30,
          expectedCloseDate: '2024-03-30',
          createdAt: '2024-01-16',
          lastActivity: '2024-01-16',
          source: 'Website'
        }
      ])
    } catch (error) {
      console.error('Error loading deals:', error)
      toast({
        title: "Error",
        description: "Failed to load deals",
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
      
      // Validate required fields
      if (!formData.title || !formData.value || !formData.contactName || !formData.company) {
        toast({
          title: "Validation Error",
          description: "Please fill in all required fields",
          variant: "destructive"
        })
        return
      }

      // Create new deal
      const newDeal = {
        id: `INT-${Date.now()}`,
        title: formData.title,
        contactName: formData.contactName,
        contactEmail: formData.contactEmail,
        company: formData.company,
        value: parseInt(formData.value),
        stage: formData.stage,
        probability: parseInt(formData.probability) || 50,
        expectedCloseDate: formData.expectedCloseDate,
        createdAt: new Date().toISOString().split('T')[0],
        lastActivity: new Date().toISOString().split('T')[0],
        source: 'Manual'
      }

      // Add to deals list (optimistic update)
      setDeals(prev => [newDeal, ...prev])
      
      // Reset form
      setFormData({
        title: '',
        value: '',
        contactName: '',
        contactEmail: '',
        company: '',
        stage: 'prospecting',
        probability: '',
        expectedCloseDate: '',
        description: ''
      })
      
      setIsDialogOpen(false)
      
      toast({
        title: "Success",
        description: "Deal created successfully"
      })
      
    } catch (error) {
      console.error('Error creating deal:', error)
      toast({
        title: "Error",
        description: "Failed to create deal",
        variant: "destructive"
      })
    } finally {
      setSubmitting(false)
    }
  }

  const getStageInfo = (stageId: string) => {
    return pipelineStages.find(stage => stage.id === stageId) || pipelineStages[0]
  }

  const getProbabilityColor = (probability: number) => {
    if (probability >= 80) return 'text-green-600'
    if (probability >= 60) return 'text-yellow-600'
    if (probability >= 40) return 'text-orange-600'
    return 'text-red-600'
  }

  const dealsByStage = pipelineStages.reduce((acc, stage) => {
    acc[stage.id] = deals.filter(deal => deal.stage === stage.id)
    return acc
  }, {} as Record<string, any[]>)

  const totalPipelineValue = deals.reduce((sum, deal) => sum + deal.value, 0)
  const weightedPipelineValue = deals.reduce((sum, deal) => sum + (deal.value * deal.probability / 100), 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Deals Pipeline</h1>
          <p className="text-muted-foreground">
            Manage your internal sales pipeline
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              New Deal
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Deal</DialogTitle>
              <DialogDescription>
                Add a new deal to your pipeline
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Deal Title *</Label>
                  <Input 
                    id="title" 
                    placeholder="Enter deal title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="value">Deal Value *</Label>
                  <Input 
                    id="value" 
                    type="number" 
                    placeholder="0"
                    value={formData.value}
                    onChange={(e) => setFormData(prev => ({ ...prev, value: e.target.value }))}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactName">Contact Name *</Label>
                  <Input 
                    id="contactName" 
                    placeholder="John Smith"
                    value={formData.contactName}
                    onChange={(e) => setFormData(prev => ({ ...prev, contactName: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input 
                    id="contactEmail" 
                    type="email" 
                    placeholder="john@company.com"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData(prev => ({ ...prev, contactEmail: e.target.value }))}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company *</Label>
                <Input 
                  id="company" 
                  placeholder="Company name"
                  value={formData.company}
                  onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="stage">Deal Stage</Label>
                  <Select value={formData.stage} onValueChange={(value) => setFormData(prev => ({ ...prev, stage: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select stage" />
                    </SelectTrigger>
                    <SelectContent>
                      {pipelineStages.slice(0, -2).map((stage) => (
                        <SelectItem key={stage.id} value={stage.id}>{stage.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="probability">Probability (%)</Label>
                  <Input 
                    id="probability" 
                    type="number" 
                    min="0" 
                    max="100" 
                    placeholder="50"
                    value={formData.probability}
                    onChange={(e) => setFormData(prev => ({ ...prev, probability: e.target.value }))}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="expectedClose">Expected Close Date</Label>
                <Input 
                  id="expectedClose" 
                  type="date"
                  value={formData.expectedCloseDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, expectedCloseDate: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Describe the deal opportunity..."
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={submitting}>
                {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Deal
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Pipeline Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pipeline Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalPipelineValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Across {deals.length} deals
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weighted Pipeline</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${Math.round(weightedPipelineValue).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Based on probability
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Deal Size</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${deals.length > 0 ? Math.round(totalPipelineValue / deals.length).toLocaleString() : '0'}
            </div>
            <p className="text-xs text-muted-foreground">
              Per deal
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Pipeline Kanban View */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        {pipelineStages.slice(0, -2).map((stage) => (
          <Card key={stage.id} className="min-h-[400px]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">{stage.name}</CardTitle>
                <Badge variant="outline" className={stage.color}>
                  {dealsByStage[stage.id]?.length || 0}
                </Badge>
              </div>
              <CardDescription>
                ${(dealsByStage[stage.id]?.reduce((sum, deal) => sum + deal.value, 0) || 0).toLocaleString()}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {loading ? (
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>
              ) : (
                dealsByStage[stage.id]?.map((deal) => (
                  <Card key={deal.id} className="p-3 hover:shadow-sm transition-shadow cursor-pointer">
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">{deal.title}</h4>
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <User className="h-3 w-3" />
                        <span>{deal.contactName}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <Building2 className="h-3 w-3" />
                        <span>{deal.company}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1 text-sm font-medium">
                          <DollarSign className="h-3 w-3" />
                          <span>{deal.value.toLocaleString()}</span>
                        </div>
                        <span className={`text-xs font-medium ${getProbabilityColor(deal.probability)}`}>
                          {deal.probability}%
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(deal.expectedCloseDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}