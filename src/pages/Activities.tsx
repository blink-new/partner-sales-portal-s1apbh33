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
  Mail, 
  Phone, 
  Calendar,
  MessageSquare,
  Video,
  Clock,
  User,
  Building2,
  Loader2,
  CheckCircle,
  AlertCircle
} from 'lucide-react'

export function Activities() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    type: 'email',
    subject: '',
    contact: '',
    company: '',
    description: '',
    outcome: '',
    followUpDate: '',
    priority: 'medium'
  })
  const { toast } = useToast()

  useEffect(() => {
    loadActivities()
  }, [])

  const loadActivities = async () => {
    try {
      setLoading(true)
      const user = await blink.auth.me()
      // Mock data for activities
      setActivities([
        {
          id: '1',
          type: 'email',
          subject: 'Follow-up on Enterprise CRM proposal',
          contact: 'John Smith',
          company: 'TechCorp Inc.',
          description: 'Sent detailed proposal with pricing and implementation timeline',
          outcome: 'Positive response, scheduling demo next week',
          date: '2024-01-16',
          time: '10:30 AM',
          priority: 'high',
          status: 'completed',
          followUpDate: '2024-01-23'
        },
        {
          id: '2',
          type: 'call',
          subject: 'Discovery call with StartupXYZ',
          contact: 'Sarah Johnson',
          company: 'StartupXYZ',
          description: 'Initial discovery call to understand their marketing automation needs',
          outcome: 'Qualified lead, budget confirmed at $75k',
          date: '2024-01-15',
          time: '2:15 PM',
          priority: 'medium',
          status: 'completed',
          followUpDate: '2024-01-22'
        },
        {
          id: '3',
          type: 'meeting',
          subject: 'Product demo for MegaCorp',
          contact: 'Mike Chen',
          company: 'MegaCorp Ltd',
          description: 'Scheduled product demonstration of our cloud infrastructure solution',
          outcome: '',
          date: '2024-01-18',
          time: '11:00 AM',
          priority: 'high',
          status: 'scheduled',
          followUpDate: ''
        },
        {
          id: '4',
          type: 'email',
          subject: 'Pricing inquiry response',
          contact: 'Lisa Wang',
          company: 'Innovate Solutions',
          description: 'Responded to pricing inquiry for custom development project',
          outcome: 'Awaiting response',
          date: '2024-01-14',
          time: '4:45 PM',
          priority: 'medium',
          status: 'completed',
          followUpDate: '2024-01-21'
        },
        {
          id: '5',
          type: 'task',
          subject: 'Prepare proposal for TechCorp',
          contact: 'John Smith',
          company: 'TechCorp Inc.',
          description: 'Create comprehensive proposal including technical specifications and pricing',
          outcome: '',
          date: '2024-01-17',
          time: '9:00 AM',
          priority: 'high',
          status: 'pending',
          followUpDate: ''
        }
      ])
    } catch (error) {
      console.error('Error loading activities:', error)
      toast({
        title: "Error",
        description: "Failed to load activities",
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
      if (!formData.subject || !formData.contact || !formData.description) {
        toast({
          title: "Validation Error",
          description: "Please fill in all required fields",
          variant: "destructive"
        })
        return
      }

      // Create new activity
      const newActivity = {
        id: Date.now().toString(),
        type: formData.type,
        subject: formData.subject,
        contact: formData.contact,
        company: formData.company,
        description: formData.description,
        outcome: formData.outcome,
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        priority: formData.priority,
        status: 'completed',
        followUpDate: formData.followUpDate
      }

      // Add to activities list (optimistic update)
      setActivities(prev => [newActivity, ...prev])
      
      // Reset form
      setFormData({
        type: 'email',
        subject: '',
        contact: '',
        company: '',
        description: '',
        outcome: '',
        followUpDate: '',
        priority: 'medium'
      })
      
      setIsDialogOpen(false)
      
      toast({
        title: "Success",
        description: "Activity logged successfully"
      })
      
    } catch (error) {
      console.error('Error creating activity:', error)
      toast({
        title: "Error",
        description: "Failed to log activity",
        variant: "destructive"
      })
    } finally {
      setSubmitting(false)
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'email':
        return <Mail className="h-4 w-4 text-blue-600" />
      case 'call':
        return <Phone className="h-4 w-4 text-green-600" />
      case 'meeting':
        return <Video className="h-4 w-4 text-purple-600" />
      case 'task':
        return <CheckCircle className="h-4 w-4 text-orange-600" />
      default:
        return <MessageSquare className="h-4 w-4 text-gray-600" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'low':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'scheduled':
        return 'bg-blue-100 text-blue-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Activities</h1>
          <p className="text-muted-foreground">
            Track all your sales activities and interactions
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Log Activity
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Log New Activity</DialogTitle>
              <DialogDescription>
                Record a new sales activity or interaction
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Activity Type</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="call">Phone Call</SelectItem>
                      <SelectItem value="meeting">Meeting</SelectItem>
                      <SelectItem value="task">Task</SelectItem>
                      <SelectItem value="note">Note</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select value={formData.priority} onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject *</Label>
                <Input 
                  id="subject" 
                  placeholder="Brief description of the activity"
                  value={formData.subject}
                  onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contact">Contact *</Label>
                  <Input 
                    id="contact" 
                    placeholder="Contact name"
                    value={formData.contact}
                    onChange={(e) => setFormData(prev => ({ ...prev, contact: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input 
                    id="company" 
                    placeholder="Company name"
                    value={formData.company}
                    onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea 
                  id="description" 
                  placeholder="Detailed description of the activity..."
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="outcome">Outcome</Label>
                <Textarea 
                  id="outcome" 
                  placeholder="What was the result or outcome?"
                  value={formData.outcome}
                  onChange={(e) => setFormData(prev => ({ ...prev, outcome: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="followUpDate">Follow-up Date</Label>
                <Input 
                  id="followUpDate" 
                  type="date"
                  value={formData.followUpDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, followUpDate: e.target.value }))}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={submitting}>
                {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Log Activity
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
                placeholder="Search activities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="call">Phone Call</SelectItem>
                <SelectItem value="meeting">Meeting</SelectItem>
                <SelectItem value="task">Task</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Activities Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Activity Timeline</CardTitle>
          <CardDescription>
            All your sales activities and interactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin" />
              <span className="ml-2">Loading activities...</span>
            </div>
          ) : (
            <div className="space-y-4">
              {activities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                  <div className="flex-shrink-0 mt-1">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium">{activity.subject}</h4>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                          <div className="flex items-center space-x-1">
                            <User className="h-3 w-3" />
                            <span>{activity.contact}</span>
                          </div>
                          {activity.company && (
                            <div className="flex items-center space-x-1">
                              <Building2 className="h-3 w-3" />
                              <span>{activity.company}</span>
                            </div>
                          )}
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{activity.date} at {activity.time}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getPriorityColor(activity.priority)}>
                          {activity.priority}
                        </Badge>
                        <Badge className={getStatusColor(activity.status)}>
                          {activity.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                    
                    {activity.outcome && (
                      <div className="bg-muted p-3 rounded">
                        <p className="text-sm"><strong>Outcome:</strong> {activity.outcome}</p>
                      </div>
                    )}
                    
                    {activity.followUpDate && (
                      <div className="flex items-center space-x-2 text-sm">
                        <AlertCircle className="h-4 w-4 text-orange-500" />
                        <span className="text-orange-600">
                          Follow-up scheduled for {new Date(activity.followUpDate).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}