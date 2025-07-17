import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useToast } from '@/hooks/use-toast'
import { blink } from '@/blink/client'
import { 
  Plus, 
  Search, 
  Filter, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  User,
  Building2,
  Mail,
  Phone,
  Calendar,
  FileText,
  Video,
  Users,
  Target,
  Loader2,
  Play,
  Pause,
  RotateCcw,
  Eye,
  Edit,
  MoreHorizontal
} from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

interface OnboardingStep {
  id: string
  name: string
  description: string
  type: 'document' | 'video' | 'form' | 'meeting' | 'task'
  order: number
  estimatedTime: number // in minutes
  required: boolean
  resourceUrl?: string
}

interface PartnerOnboarding {
  id: string
  partnerId: string
  partnerName: string
  partnerEmail: string
  status: 'not_started' | 'in_progress' | 'completed' | 'paused'
  currentStep: number
  completedSteps: string[]
  startedAt?: string
  completedAt?: string
  progress: number
  userId: string
}

const defaultOnboardingSteps: OnboardingStep[] = [
  {
    id: 'welcome',
    name: 'Welcome & Introduction',
    description: 'Welcome video and program overview',
    type: 'video',
    order: 1,
    estimatedTime: 15,
    required: true,
    resourceUrl: 'https://example.com/welcome-video'
  },
  {
    id: 'agreement',
    name: 'Partner Agreement',
    description: 'Review and sign partner agreement',
    type: 'document',
    order: 2,
    estimatedTime: 30,
    required: true,
    resourceUrl: 'https://example.com/partner-agreement.pdf'
  },
  {
    id: 'profile',
    name: 'Complete Partner Profile',
    description: 'Fill out detailed partner information',
    type: 'form',
    order: 3,
    estimatedTime: 20,
    required: true
  },
  {
    id: 'training',
    name: 'Product Training',
    description: 'Complete product knowledge training',
    type: 'video',
    order: 4,
    estimatedTime: 60,
    required: true,
    resourceUrl: 'https://example.com/product-training'
  },
  {
    id: 'certification',
    name: 'Sales Certification',
    description: 'Pass sales certification exam',
    type: 'form',
    order: 5,
    estimatedTime: 45,
    required: true
  },
  {
    id: 'kickoff',
    name: 'Kickoff Meeting',
    description: 'Schedule and attend kickoff meeting',
    type: 'meeting',
    order: 6,
    estimatedTime: 60,
    required: true
  },
  {
    id: 'resources',
    name: 'Access Resources',
    description: 'Review sales materials and resources',
    type: 'document',
    order: 7,
    estimatedTime: 30,
    required: false,
    resourceUrl: 'https://example.com/sales-resources'
  }
]

export function PartnerOnboarding() {
  const [activeTab, setActiveTab] = useState('overview')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [onboardings, setOnboardings] = useState<PartnerOnboarding[]>([])
  const [steps, setSteps] = useState<OnboardingStep[]>(defaultOnboardingSteps)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    partnerName: '',
    partnerEmail: '',
    partnerCompany: '',
    startDate: ''
  })
  const { toast } = useToast()

  useEffect(() => {
    loadOnboardingData()
  }, [])

  const loadOnboardingData = async () => {
    try {
      setLoading(true)
      const user = await blink.auth.me()
      
      // Try to load from localStorage first, then fallback to mock data
      const savedOnboardings = localStorage.getItem(`onboardings_${user.id}`)
      if (savedOnboardings) {
        setOnboardings(JSON.parse(savedOnboardings))
      } else {
        // Initialize with sample data
        const initialOnboardings: PartnerOnboarding[] = [
          {
            id: 'onboard_1',
            partnerId: 'partner_1',
            partnerName: 'Local Tech Partners',
            partnerEmail: 'contact@localtechpartners.com',
            status: 'completed',
            currentStep: 7,
            completedSteps: ['welcome', 'agreement', 'profile', 'training', 'certification', 'kickoff', 'resources'],
            startedAt: '2024-01-10T00:00:00Z',
            completedAt: '2024-01-25T00:00:00Z',
            progress: 100,
            userId: user.id
          },
          {
            id: 'onboard_2',
            partnerId: 'partner_2',
            partnerName: 'Design Studio Co',
            partnerEmail: 'hello@designstudio.co',
            status: 'in_progress',
            currentStep: 4,
            completedSteps: ['welcome', 'agreement', 'profile'],
            startedAt: '2024-01-15T00:00:00Z',
            progress: 43,
            userId: user.id
          },
          {
            id: 'onboard_3',
            partnerId: 'partner_3',
            partnerName: 'Marketing Pros',
            partnerEmail: 'team@marketingpros.com',
            status: 'not_started',
            currentStep: 1,
            completedSteps: [],
            progress: 0,
            userId: user.id
          }
        ]
        setOnboardings(initialOnboardings)
        localStorage.setItem(`onboardings_${user.id}`, JSON.stringify(initialOnboardings))
      }
    } catch (error) {
      console.error('Error loading onboarding data:', error)
      toast({
        title: "Error",
        description: "Failed to load onboarding data",
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
      if (!formData.partnerName || !formData.partnerEmail) {
        toast({
          title: "Validation Error",
          description: "Please fill in all required fields",
          variant: "destructive"
        })
        return
      }

      // Create new onboarding
      const newOnboarding: PartnerOnboarding = {
        id: `onboard_${Date.now()}`,
        partnerId: `partner_${Date.now()}`,
        partnerName: formData.partnerName,
        partnerEmail: formData.partnerEmail,
        status: 'not_started',
        currentStep: 1,
        completedSteps: [],
        startedAt: formData.startDate ? new Date(formData.startDate).toISOString() : undefined,
        progress: 0,
        userId: user.id
      }

      // Add to onboardings list (optimistic update)
      const updatedOnboardings = [newOnboarding, ...onboardings]
      setOnboardings(updatedOnboardings)
      
      // Save to localStorage
      localStorage.setItem(`onboardings_${user.id}`, JSON.stringify(updatedOnboardings))
      
      // Reset form
      setFormData({
        partnerName: '',
        partnerEmail: '',
        partnerCompany: '',
        startDate: ''
      })
      
      setIsDialogOpen(false)
      
      toast({
        title: "Success",
        description: "Partner onboarding created successfully"
      })
      
    } catch (error) {
      console.error('Error creating onboarding:', error)
      toast({
        title: "Error",
        description: "Failed to create onboarding",
        variant: "destructive"
      })
    } finally {
      setSubmitting(false)
    }
  }

  const updateOnboardingStatus = async (onboardingId: string, newStatus: string) => {
    const updatedOnboardings = onboardings.map(onboarding => 
      onboarding.id === onboardingId 
        ? { 
            ...onboarding, 
            status: newStatus as any,
            startedAt: newStatus === 'in_progress' && !onboarding.startedAt 
              ? new Date().toISOString() 
              : onboarding.startedAt,
            completedAt: newStatus === 'completed' 
              ? new Date().toISOString() 
              : undefined
          }
        : onboarding
    )
    setOnboardings(updatedOnboardings)
    
    const user = await blink.auth.me()
    localStorage.setItem(`onboardings_${user.id}`, JSON.stringify(updatedOnboardings))
    
    toast({
      title: "Status Updated",
      description: `Onboarding status changed to ${newStatus.replace('_', ' ')}`
    })
  }

  const completeStep = async (onboardingId: string, stepId: string) => {
    const updatedOnboardings = onboardings.map(onboarding => {
      if (onboarding.id === onboardingId) {
        const newCompletedSteps = [...onboarding.completedSteps, stepId]
        const progress = Math.round((newCompletedSteps.length / steps.length) * 100)
        const nextStep = Math.min(onboarding.currentStep + 1, steps.length)
        
        return {
          ...onboarding,
          completedSteps: newCompletedSteps,
          currentStep: nextStep,
          progress,
          status: progress === 100 ? 'completed' as const : 'in_progress' as const,
          completedAt: progress === 100 ? new Date().toISOString() : undefined
        }
      }
      return onboarding
    })
    
    setOnboardings(updatedOnboardings)
    
    const user = await blink.auth.me()
    localStorage.setItem(`onboardings_${user.id}`, JSON.stringify(updatedOnboardings))
    
    toast({
      title: "Step Completed",
      description: `Step "${steps.find(s => s.id === stepId)?.name}" marked as complete`
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'in_progress':
        return 'bg-blue-100 text-blue-800'
      case 'paused':
        return 'bg-yellow-100 text-yellow-800'
      case 'not_started':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStepIcon = (type: string) => {
    switch (type) {
      case 'document':
        return FileText
      case 'video':
        return Video
      case 'form':
        return User
      case 'meeting':
        return Calendar
      case 'task':
        return Target
      default:
        return FileText
    }
  }

  const getStepTypeColor = (type: string) => {
    switch (type) {
      case 'document':
        return 'bg-blue-100 text-blue-800'
      case 'video':
        return 'bg-purple-100 text-purple-800'
      case 'form':
        return 'bg-green-100 text-green-800'
      case 'meeting':
        return 'bg-orange-100 text-orange-800'
      case 'task':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredOnboardings = onboardings.filter(onboarding =>
    searchTerm === '' ||
    onboarding.partnerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    onboarding.partnerEmail.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const stats = {
    total: onboardings.length,
    completed: onboardings.filter(o => o.status === 'completed').length,
    inProgress: onboardings.filter(o => o.status === 'in_progress').length,
    notStarted: onboardings.filter(o => o.status === 'not_started').length,
    avgProgress: onboardings.length > 0 
      ? Math.round(onboardings.reduce((sum, o) => sum + o.progress, 0) / onboardings.length)
      : 0
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Partner Onboarding</h1>
          <p className="text-muted-foreground">
            Manage partner onboarding process and track progress
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Start Onboarding
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Start Partner Onboarding</DialogTitle>
              <DialogDescription>
                Begin the onboarding process for a new partner
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="partnerName">Partner Name *</Label>
                  <Input 
                    id="partnerName" 
                    placeholder="Partner contact name"
                    value={formData.partnerName}
                    onChange={(e) => setFormData(prev => ({ ...prev, partnerName: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="partnerEmail">Partner Email *</Label>
                  <Input 
                    id="partnerEmail" 
                    type="email" 
                    placeholder="partner@company.com"
                    value={formData.partnerEmail}
                    onChange={(e) => setFormData(prev => ({ ...prev, partnerEmail: e.target.value }))}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="partnerCompany">Company</Label>
                <Input 
                  id="partnerCompany" 
                  placeholder="Partner company name"
                  value={formData.partnerCompany}
                  onChange={(e) => setFormData(prev => ({ ...prev, partnerCompany: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date (Optional)</Label>
                <Input 
                  id="startDate" 
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={submitting}>
                {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Start Onboarding
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Partners</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">
              In onboarding process
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completed}</div>
            <p className="text-xs text-muted-foreground">
              Fully onboarded
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.inProgress}</div>
            <p className="text-xs text-muted-foreground">
              Currently onboarding
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Not Started</CardTitle>
            <AlertCircle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.notStarted}</div>
            <p className="text-xs text-muted-foreground">
              Waiting to begin
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Progress</CardTitle>
            <Target className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgProgress}%</div>
            <p className="text-xs text-muted-foreground">
              Across all partners
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="steps">Onboarding Steps</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Search and Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search partners..."
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
                    <SelectItem value="not_started">Not Started</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="paused">Paused</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Onboarding List */}
          <Card>
            <CardHeader>
              <CardTitle>Partner Onboarding Progress</CardTitle>
              <CardDescription>
                Track the onboarding progress of all partners
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin" />
                  <span className="ml-2">Loading onboarding data...</span>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredOnboardings.map((onboarding) => (
                    <div key={onboarding.id} className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                            <User className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium">{onboarding.partnerName}</h4>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <Mail className="h-3 w-3" />
                              <span>{onboarding.partnerEmail}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <div className="text-sm font-medium">Progress</div>
                          <div className="flex items-center space-x-2 mt-1">
                            <Progress value={onboarding.progress} className="w-24" />
                            <span className="text-sm text-muted-foreground">{onboarding.progress}%</span>
                          </div>
                        </div>
                        
                        <div className="text-center">
                          <div className="text-sm font-medium">Step</div>
                          <div className="text-sm text-muted-foreground mt-1">
                            {onboarding.currentStep} of {steps.length}
                          </div>
                        </div>
                        
                        <div className="text-center">
                          <div className="text-sm font-medium">Status</div>
                          <Badge className={`mt-1 ${getStatusColor(onboarding.status)}`}>
                            {onboarding.status.replace('_', ' ')}
                          </Badge>
                        </div>
                        
                        <div className="text-center">
                          <div className="text-sm font-medium">Started</div>
                          <div className="text-sm text-muted-foreground mt-1">
                            {onboarding.startedAt 
                              ? new Date(onboarding.startedAt).toLocaleDateString()
                              : 'Not started'
                            }
                          </div>
                        </div>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => updateOnboardingStatus(onboarding.id, 'in_progress')}>
                              <Play className="mr-2 h-4 w-4" />
                              Start/Resume
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => updateOnboardingStatus(onboarding.id, 'paused')}>
                              <Pause className="mr-2 h-4 w-4" />
                              Pause
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => updateOnboardingStatus(onboarding.id, 'completed')}>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Mark Complete
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => updateOnboardingStatus(onboarding.id, 'not_started')}>
                              <RotateCcw className="mr-2 h-4 w-4" />
                              Reset
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="steps" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Onboarding Steps Configuration</CardTitle>
              <CardDescription>
                Manage the steps in your partner onboarding process
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {steps.map((step, index) => {
                  const StepIcon = getStepIcon(step.type)
                  return (
                    <div key={step.id} className="flex items-center justify-between p-4 rounded-lg border">
                      <div className="flex items-center space-x-4">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
                          {step.order}
                        </div>
                        <div className={`p-2 rounded-lg ${getStepTypeColor(step.type)}`}>
                          <StepIcon className="h-4 w-4" />
                        </div>
                        <div>
                          <h4 className="font-medium">{step.name}</h4>
                          <p className="text-sm text-muted-foreground">{step.description}</p>
                          <div className="flex items-center space-x-4 mt-1">
                            <Badge variant="outline" className={getStepTypeColor(step.type)}>
                              {step.type}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              ~{step.estimatedTime} min
                            </span>
                            {step.required && (
                              <Badge variant="outline" className="bg-red-100 text-red-800">
                                Required
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {step.resourceUrl && (
                          <Button variant="outline" size="sm">
                            <Eye className="mr-2 h-4 w-4" />
                            View Resource
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Onboarding Templates</CardTitle>
              <CardDescription>
                Pre-built onboarding templates for different partner types
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">Standard Partner</CardTitle>
                    <CardDescription>
                      Default onboarding for most partners
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Steps:</span>
                        <span>7 steps</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Duration:</span>
                        <span>~4 hours</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Required:</span>
                        <span>6 steps</span>
                      </div>
                    </div>
                    <Button className="w-full mt-4" variant="outline">
                      Use Template
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">Enterprise Partner</CardTitle>
                    <CardDescription>
                      Extended onboarding for enterprise partners
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Steps:</span>
                        <span>12 steps</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Duration:</span>
                        <span>~8 hours</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Required:</span>
                        <span>10 steps</span>
                      </div>
                    </div>
                    <Button className="w-full mt-4" variant="outline">
                      Use Template
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Start</CardTitle>
                    <CardDescription>
                      Simplified onboarding for experienced partners
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Steps:</span>
                        <span>4 steps</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Duration:</span>
                        <span>~2 hours</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Required:</span>
                        <span>3 steps</span>
                      </div>
                    </div>
                    <Button className="w-full mt-4" variant="outline">
                      Use Template
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}