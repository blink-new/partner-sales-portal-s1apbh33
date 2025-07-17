import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { 
  Search, 
  Filter, 
  Plus, 
  Building2, 
  Mail, 
  Phone, 
  Globe,
  Star,
  Users,
  TrendingUp,
  MapPin
} from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const partners = [
  {
    id: '1',
    name: 'Local Tech Partners',
    logo: '/api/placeholder/40/40',
    tier: 'Partner',
    status: 'Active',
    location: 'Austin, TX',
    industry: 'Technology',
    specialization: 'Small Business IT',
    contactName: 'John Smith',
    email: 'john@localtechpartners.com',
    phone: '+1 (555) 123-4567',
    website: 'https://localtechpartners.com',
    dealsCount: 3,
    totalRevenue: 24000,
    rating: 4.8,
    joinedDate: '2024-01-15'
  },
  {
    id: '2',
    name: 'Design Studio Co',
    logo: '/api/placeholder/40/40',
    tier: 'Partner',
    status: 'Active',
    location: 'Portland, OR',
    industry: 'Design',
    specialization: 'Web Design',
    contactName: 'Sarah Johnson',
    email: 'sarah@designstudio.co',
    phone: '+1 (555) 987-6543',
    website: 'https://designstudio.co',
    dealsCount: 2,
    totalRevenue: 18000,
    rating: 4.6,
    joinedDate: '2024-02-01'
  },
  {
    id: '3',
    name: 'Marketing Pros',
    logo: '/api/placeholder/40/40',
    tier: 'Partner',
    status: 'Active',
    location: 'Denver, CO',
    industry: 'Marketing',
    specialization: 'Digital Marketing',
    contactName: 'Mike Chen',
    email: 'mike@marketingpros.com',
    phone: '+1 (555) 456-7890',
    website: 'https://marketingpros.com',
    dealsCount: 4,
    totalRevenue: 15000,
    rating: 4.4,
    joinedDate: '2024-01-20'
  },
  {
    id: '4',
    name: 'Business Consultants LLC',
    logo: '/api/placeholder/40/40',
    tier: 'Partner',
    status: 'Pending',
    location: 'Phoenix, AZ',
    industry: 'Consulting',
    specialization: 'Business Strategy',
    contactName: 'Lisa Wang',
    email: 'lisa@bizconsultants.com',
    phone: '+1 (555) 321-0987',
    website: 'https://bizconsultants.com',
    dealsCount: 1,
    totalRevenue: 5000,
    rating: 4.2,
    joinedDate: '2024-02-10'
  }
]

export function PartnerDirectory() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Partner':
        return 'bg-blue-100 text-blue-800'
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Partners</h1>
          <p className="text-muted-foreground">
            Your partner network and contacts
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
                Invite a new partner to join your network
              </DialogDescription>
            </DialogHeader>
            <div className="text-center py-8">
              <p className="text-muted-foreground">Partner invitation form coming soon...</p>
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
                <SelectValue placeholder="Industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Industries</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="consulting">Consulting</SelectItem>
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
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {partners.map((partner) => (
          <Card key={partner.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={partner.logo} alt={partner.name} />
                    <AvatarFallback>
                      <Building2 className="h-6 w-6" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{partner.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{partner.specialization}</p>
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
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{partner.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span>{partner.rating}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{partner.dealsCount} deals</span>
                </div>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  <span>${partner.totalRevenue.toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{partner.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{partner.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <a 
                    href={partner.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {partner.website}
                  </a>
                </div>
              </div>

              <div className="flex space-x-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  View Profile
                </Button>
                <Button size="sm" className="flex-1">
                  Contact
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}