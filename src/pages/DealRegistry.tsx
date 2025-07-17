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
import { useToast } from '@/hooks/use-toast'
import { blink } from '@/blink/client'
import { 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  MoreHorizontal,
  Calendar,
  DollarSign,
  Loader2
} from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

const deals = [
  {
    id: 'DEAL-001',
    title: 'Enterprise CRM Implementation',
    partner: 'TechSolutions Inc.',
    client: 'Acme Corporation',
    value: 125000,
    status: 'Approved',
    stage: 'Negotiation',
    probability: 85,
    expectedClose: '2024-02-15',
    createdAt: '2024-01-10'
  },
  {
    id: 'DEAL-002',
    title: 'Marketing Automation Setup',
    partner: 'Digital Partners LLC',
    client: 'StartupXYZ',
    value: 45000,
    status: 'Submitted',
    stage: 'Proposal',
    probability: 60,
    expectedClose: '2024-02-28',
    createdAt: '2024-01-12'
  },
  {
    id: 'DEAL-003',
    title: 'Cloud Migration Project',
    partner: 'CloudFirst Solutions',
    client: 'MegaCorp Ltd',
    value: 89000,
    status: 'Draft',
    stage: 'Qualification',
    probability: 40,
    expectedClose: '2024-03-10',
    createdAt: '2024-01-15'
  }
]

export function DealRegistry() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [deals, setDeals] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    value: '',
    clientName: '',
    clientEmail: '',
    stage: '',
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
      // For now, use mock data since database isn't set up yet
      setDeals([
        {
          id: 'DEAL-001',
          title: 'Small Business CRM Setup',
          partnerName: 'Local Tech Partners',
          clientName: 'Smith & Co',
          value: 8500,
          status: 'Approved',
          stage: 'Closing',
          probability: 90,
          expectedCloseDate: '2024-02-15',
          createdAt: '2024-01-10'
        },
        {
          id: 'DEAL-002',
          title: 'Website Redesign Project',
          partnerName: 'Design Studio Co',
          clientName: 'Local Restaurant',
          value: 12000,
          status: 'Submitted',
          stage: 'Proposal',
          probability: 70,
          expectedCloseDate: '2024-02-28',
          createdAt: '2024-01-12'
        },
        {
          id: 'DEAL-003',
          title: 'Email Marketing Setup',
          partnerName: 'Marketing Pros',
          clientName: 'Fitness Studio',
          value: 3500,
          status: 'Draft',
          stage: 'Qualification',
          probability: 50,
          expectedCloseDate: '2024-03-10',
          createdAt: '2024-01-15'
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
      if (!formData.title || !formData.value || !formData.clientName || !formData.clientEmail) {
        toast({
          title: "Validation Error",
          description: "Please fill in all required fields",
          variant: "destructive"
        })
        return
      }

      // Create new deal
      const newDeal = {
        id: `DEAL-${Date.now()}`,
        title: formData.title,
        partnerName: user.displayName || user.email,
        clientName: formData.clientName,
        value: parseInt(formData.value),
        status: 'Draft',
        stage: formData.stage || 'Prospecting',
        probability: parseInt(formData.probability) || 50,
        expectedCloseDate: formData.expectedCloseDate,
        createdAt: new Date().toISOString().split('T')[0]
      }

      // Add to deals list (optimistic update)
      setDeals(prev => [newDeal, ...prev])
      
      // Reset form
      setFormData({
        title: '',
        value: '',
        clientName: '',
        clientEmail: '',
        stage: '',
        probability: '',
        expectedCloseDate: '',
        description: ''
      })
      
      setIsDialogOpen(false)
      
      toast({
        title: "Success",
        description: "Deal registered successfully"
      })
      
    } catch (error) {
      console.error('Error creating deal:', error)
      toast({
        title: "Error",
        description: "Failed to register deal",
        variant: "destructive"
      })
    } finally {
      setSubmitting(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800'
      case 'Submitted':
        return 'bg-blue-100 text-blue-800'
      case 'Draft':
        return 'bg-gray-100 text-gray-800'
      case 'Rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'Prospecting':
        return 'bg-purple-100 text-purple-800'
      case 'Qualification':
        return 'bg-blue-100 text-blue-800'
      case 'Proposal':
        return 'bg-orange-100 text-orange-800'
      case 'Negotiation':
        return 'bg-yellow-100 text-yellow-800'
      case 'Closing':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Deals</h1>
          <p className="text-muted-foreground">
            Register and track deals with your partners
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
                Add a new deal to track with your partner
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
                  <Label htmlFor="client">Client Name *</Label>
                  <Input 
                    id="client" 
                    placeholder="Client company name"
                    value={formData.clientName}
                    onChange={(e) => setFormData(prev => ({ ...prev, clientName: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clientEmail">Client Email *</Label>
                  <Input 
                    id="clientEmail" 
                    type="email" 
                    placeholder="client@company.com"
                    value={formData.clientEmail}
                    onChange={(e) => setFormData(prev => ({ ...prev, clientEmail: e.target.value }))}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="stage">Deal Stage</Label>
                  <Select onValueChange={(value) => setFormData(prev => ({ ...prev, stage: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select stage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Prospecting">Prospecting</SelectItem>
                      <SelectItem value="Qualification">Qualification</SelectItem>
                      <SelectItem value="Proposal">Proposal</SelectItem>
                      <SelectItem value="Negotiation">Negotiation</SelectItem>
                      <SelectItem value="Closing">Closing</SelectItem>
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

      {/* Filters and Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search deals..."
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
                <SelectItem value="submitted">Submitted</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stages</SelectItem>
                <SelectItem value="prospecting">Prospecting</SelectItem>
                <SelectItem value="qualification">Qualification</SelectItem>
                <SelectItem value="proposal">Proposal</SelectItem>
                <SelectItem value="negotiation">Negotiation</SelectItem>
                <SelectItem value="closing">Closing</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Deals Table */}
      <Card>
        <CardHeader>
          <CardTitle>Your Deals</CardTitle>
          <CardDescription>
            All deals and their current status
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin" />
              <span className="ml-2">Loading deals...</span>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Deal ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Partner</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Stage</TableHead>
                  <TableHead>Probability</TableHead>
                  <TableHead>Expected Close</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {deals.map((deal) => (
                  <TableRow key={deal.id}>
                    <TableCell className="font-medium">{deal.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{deal.title}</p>
                      </div>
                    </TableCell>
                    <TableCell>{deal.partnerName}</TableCell>
                    <TableCell>{deal.clientName}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <DollarSign className="mr-1 h-4 w-4 text-muted-foreground" />
                        {deal.value.toLocaleString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(deal.status)}>
                        {deal.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStageColor(deal.stage)}>
                        {deal.stage}
                      </Badge>
                    </TableCell>
                    <TableCell>{deal.probability}%</TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="mr-1 h-4 w-4" />
                        {new Date(deal.expectedCloseDate).toLocaleDateString()}
                      </div>
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
                            Edit Deal
                          </DropdownMenuItem>
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
    </div>
  )
}