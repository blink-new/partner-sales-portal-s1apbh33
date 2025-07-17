import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useToast } from '@/hooks/use-toast'
import { blink } from '@/blink/client'
import { 
  Plus, 
  Search, 
  Filter, 
  Mail, 
  Phone, 
  Globe,
  MapPin,
  Star,
  Users,
  TrendingUp,
  Loader2,
  Building2
} from 'lucide-react'

export function PartnerDirectory() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [partners, setPartners] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    website: '',
    tier: '',
    specialties: '',
    description: '',
    location: ''
  })
  const { toast } = useToast()

  useEffect(() => {
    loadPartners()
  }, [])

  const loadPartners = async () => {
    try {
      setLoading(true)
      const user = await blink.auth.me()
      
      // Try to load from localStorage first, then fallback to mock data
      const savedPartners = localStorage.getItem(`partners_${user.id}`)
      if (savedPartners) {
        setPartners(JSON.parse(savedPartners))
      } else {
        // Initialize with sample data
        const initialPartners = [
          {
            id: 'PARTNER-001',
            name: 'Local Tech Partners',
            email: 'contact@localtechpartners.com',
            phone: '+1 (555) 123-4567',
            company: 'Local Tech Partners LLC',
            website: 'https://localtechpartners.com',
            location: 'Austin, TX',
            tier: 'Gold',
            specialties: ['CRM Implementation', 'Business Automation'],
            description: 'Specializing in small business technology solutions',
            dealsCount: 5,
            totalRevenue: 42500,
            rating: 4.8,
            status: 'Active',
            joinedDate: '2023-06-15',
            userId: user.id
          },
          {
            id: 'PARTNER-002',
            name: 'Design Studio Co',
            email: 'hello@designstudio.co',
            phone: '+1 (555) 234-5678',
            company: 'Design Studio Co',
            website: 'https://designstudio.co',
            location: 'Portland, OR',
            tier: 'Silver',
            specialties: ['Web Design', 'Branding', 'UX/UI'],
            description: 'Creative design solutions for modern businesses',
            dealsCount: 3,
            totalRevenue: 28000,
            rating: 4.6,
            status: 'Active',
            joinedDate: '2023-08-22',
            userId: user.id
          },
          {
            id: 'PARTNER-003',
            name: 'Marketing Pros',
            email: 'team@marketingpros.com',
            phone: '+1 (555) 345-6789',
            company: 'Marketing Pros Inc',
            website: 'https://marketingpros.com',
            location: 'Denver, CO',
            tier: 'Bronze',
            specialties: ['Digital Marketing', 'SEO', 'Content Strategy'],
            description: 'Full-service digital marketing agency',
            dealsCount: 2,
            totalRevenue: 15000,
            rating: 4.4,
            status: 'Active',
            joinedDate: '2023-10-10',
            userId: user.id
          }
        ]
        setPartners(initialPartners)
        localStorage.setItem(`partners_${user.id}`, JSON.stringify(initialPartners))
      }
    } catch (error) {
      console.error('Error loading partners:', error)
      toast({
        title: "Error",
        description: "Failed to load partners",
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
      if (!formData.name || !formData.email || !formData.company) {
        toast({
          title: "Validation Error",
          description: "Please fill in all required fields",
          variant: "destructive"
        })
        return
      }

      // Create new partner
      const newPartner = {
        id: `PARTNER-${Date.now()}`,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        website: formData.website,
        location: formData.location,
        tier: formData.tier || 'Bronze',
        specialties: formData.specialties.split(',').map(s => s.trim()).filter(s => s),
        description: formData.description,
        dealsCount: 0,
        totalRevenue: 0,
        rating: 0,
        status: 'Active',
        joinedDate: new Date().toISOString().split('T')[0],
        userId: user.id
      }

      // Add to partners list (optimistic update)
      const updatedPartners = [newPartner, ...partners]
      setPartners(updatedPartners)
      
      // Save to localStorage
      localStorage.setItem(`partners_${user.id}`, JSON.stringify(updatedPartners))
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        website: '',
        tier: '',
        specialties: '',
        description: '',
        location: ''
      })
      
      setIsDialogOpen(false)
      
      toast({
        title: "Success",
        description: "Partner added successfully"
      })
      
    } catch (error) {
      console.error('Error creating partner:', error)
      toast({
        title: "Error",
        description: "Failed to add partner",
        variant: "destructive"
      })
    } finally {
      setSubmitting(false)
    }
  }

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Gold':
        return 'bg-yellow-100 text-yellow-800'
      case 'Silver':
        return 'bg-gray-100 text-gray-800'
      case 'Bronze':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800'
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'Inactive':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredPartners = partners.filter(partner =>
    searchTerm === '' ||
    partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    partner.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    partner.specialties.some(specialty => 
      specialty.toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Partner Directory</h1>
          <p className="text-muted-foreground">
            Manage your partner network and relationships
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Add Partner
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Partner</DialogTitle>
              <DialogDescription>
                Add a new partner to your network
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Contact Name *</Label>
                  <Input 
                    id="name" 
                    placeholder="John Smith"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="john@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input 
                    id="phone" 
                    placeholder="+1 (555) 123-4567"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company *</Label>
                  <Input 
                    id="company" 
                    placeholder="Company Name"
                    value={formData.company}
                    onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input 
                    id="website" 
                    placeholder="https://company.com"
                    value={formData.website}
                    onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input 
                    id="location" 
                    placeholder="City, State"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="tier">Partner Tier</Label>
                <Select onValueChange={(value) => setFormData(prev => ({ ...prev, tier: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select tier" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Bronze">Bronze</SelectItem>
                    <SelectItem value="Silver">Silver</SelectItem>
                    <SelectItem value="Gold">Gold</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="specialties">Specialties</Label>
                <Input 
                  id="specialties" 
                  placeholder="Web Design, SEO, Marketing (comma separated)"
                  value={formData.specialties}
                  onChange={(e) => setFormData(prev => ({ ...prev, specialties: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Brief description of the partner..."
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
                Add Partner
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

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
                <SelectValue placeholder="Tier" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tiers</SelectItem>
                <SelectItem value="gold">Gold</SelectItem>
                <SelectItem value="silver">Silver</SelectItem>
                <SelectItem value="bronze">Bronze</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Partners Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">Loading partners...</span>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPartners.map((partner) => (
            <Card key={partner.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${partner.name}`} />
                      <AvatarFallback>
                        <Building2 className="h-6 w-6" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{partner.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{partner.company}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    <Badge className={getTierColor(partner.tier)}>
                      {partner.tier}
                    </Badge>
                    <Badge className={getStatusColor(partner.status)}>
                      {partner.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{partner.description}</p>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {partner.location && (
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{partner.location}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>{partner.rating || 'N/A'}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{partner.dealsCount} deals</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    <span>${(partner.totalRevenue / 1000).toFixed(0)}k</span>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="truncate">{partner.email}</span>
                  </div>
                  {partner.phone && (
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{partner.phone}</span>
                    </div>
                  )}
                  {partner.website && (
                    <div className="flex items-center space-x-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <a href={partner.website} target="_blank" rel="noopener noreferrer" 
                         className="text-primary hover:underline truncate">
                        Website
                      </a>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-1">
                  {partner.specialties.map((specialty, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                </div>

                <div className="flex space-x-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Mail className="mr-2 h-4 w-4" />
                    Contact
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}