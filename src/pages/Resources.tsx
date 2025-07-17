import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Search, 
  Filter, 
  Plus, 
  FileText, 
  Video, 
  Download,
  Eye,
  BookOpen,
  PlayCircle,
  FileImage,
  Link,
  Calendar,
  User
} from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const documents = [
  {
    id: '1',
    title: 'Partner Onboarding Guide',
    type: 'PDF',
    category: 'Training',
    description: 'Complete guide for new partner onboarding process',
    size: '2.4 MB',
    downloads: 156,
    uploadedBy: 'Admin',
    uploadedAt: '2024-01-10',
    tags: ['onboarding', 'guide', 'training']
  },
  {
    id: '2',
    title: 'Sales Playbook 2024',
    type: 'PDF',
    category: 'Sales',
    description: 'Updated sales strategies and best practices',
    size: '5.1 MB',
    downloads: 89,
    uploadedBy: 'Sales Team',
    uploadedAt: '2024-01-08',
    tags: ['sales', 'playbook', 'strategy']
  },
  {
    id: '3',
    title: 'Product Catalog',
    type: 'PDF',
    category: 'Product',
    description: 'Complete product specifications and pricing',
    size: '8.7 MB',
    downloads: 234,
    uploadedBy: 'Product Team',
    uploadedAt: '2024-01-05',
    tags: ['product', 'catalog', 'pricing']
  }
]

const videos = [
  {
    id: '1',
    title: 'Partner Portal Overview',
    duration: '12:34',
    category: 'Training',
    description: 'Introduction to using the partner portal effectively',
    thumbnail: '/api/placeholder/300/200',
    views: 245,
    uploadedBy: 'Training Team',
    uploadedAt: '2024-01-12',
    tags: ['portal', 'overview', 'training']
  },
  {
    id: '2',
    title: 'Deal Registration Process',
    duration: '8:45',
    category: 'Process',
    description: 'Step-by-step guide to registering deals',
    thumbnail: '/api/placeholder/300/200',
    views: 189,
    uploadedBy: 'Sales Team',
    uploadedAt: '2024-01-09',
    tags: ['deals', 'registration', 'process']
  },
  {
    id: '3',
    title: 'CRM Best Practices',
    duration: '15:22',
    category: 'Training',
    description: 'How to effectively use the CRM features',
    thumbnail: '/api/placeholder/300/200',
    views: 167,
    uploadedBy: 'Training Team',
    uploadedAt: '2024-01-07',
    tags: ['crm', 'best-practices', 'training']
  }
]

const links = [
  {
    id: '1',
    title: 'Company Website',
    url: 'https://company.com',
    category: 'External',
    description: 'Main company website with latest updates',
    clicks: 456,
    addedBy: 'Admin',
    addedAt: '2024-01-15'
  },
  {
    id: '2',
    title: 'Support Portal',
    url: 'https://support.company.com',
    category: 'Support',
    description: 'Technical support and documentation',
    clicks: 234,
    addedBy: 'Support Team',
    addedAt: '2024-01-12'
  },
  {
    id: '3',
    title: 'Partner Community Forum',
    url: 'https://community.company.com',
    category: 'Community',
    description: 'Connect with other partners and share insights',
    clicks: 189,
    addedBy: 'Community Manager',
    addedAt: '2024-01-10'
  }
]

export function Resources() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return <FileText className="h-5 w-5 text-red-600" />
      case 'video':
        return <Video className="h-5 w-5 text-blue-600" />
      case 'image':
        return <FileImage className="h-5 w-5 text-green-600" />
      default:
        return <FileText className="h-5 w-5 text-gray-600" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Training':
        return 'bg-blue-100 text-blue-800'
      case 'Sales':
        return 'bg-green-100 text-green-800'
      case 'Product':
        return 'bg-purple-100 text-purple-800'
      case 'Process':
        return 'bg-orange-100 text-orange-800'
      case 'Support':
        return 'bg-red-100 text-red-800'
      case 'Community':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Resources</h1>
          <p className="text-muted-foreground">
            Access training materials, documentation, and helpful links
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Add Resource
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Resource</DialogTitle>
              <DialogDescription>
                Upload a new resource for partners
              </DialogDescription>
            </DialogHeader>
            <div className="text-center py-8">
              <p className="text-muted-foreground">Resource upload form coming soon...</p>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="documents" className="space-y-6">
        <TabsList>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="links">Links</TabsTrigger>
        </TabsList>

        <TabsContent value="documents" className="space-y-6">
          {/* Search and Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search documents..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="training">Training</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="product">Product</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Documents Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {documents.map((doc) => (
              <Card key={doc.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      {getFileIcon(doc.type)}
                      <div>
                        <CardTitle className="text-lg">{doc.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">{doc.type} • {doc.size}</p>
                      </div>
                    </div>
                    <Badge className={getCategoryColor(doc.category)}>
                      {doc.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{doc.description}</p>
                  
                  <div className="flex flex-wrap gap-1">
                    {doc.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <User className="h-3 w-3" />
                      <span>{doc.uploadedBy}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(doc.uploadedAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{doc.downloads} downloads</span>
                  </div>

                  <div className="flex space-x-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="mr-2 h-4 w-4" />
                      Preview
                    </Button>
                    <Button size="sm" className="flex-1">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="videos" className="space-y-6">
          {/* Videos Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {videos.map((video) => (
              <Card key={video.id} className="hover:shadow-md transition-shadow">
                <div className="relative">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-black/50 rounded-full p-3">
                      <PlayCircle className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{video.title}</CardTitle>
                    <Badge className={getCategoryColor(video.category)}>
                      {video.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{video.description}</p>
                  
                  <div className="flex flex-wrap gap-1">
                    {video.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <User className="h-3 w-3" />
                      <span>{video.uploadedBy}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(video.uploadedAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{video.views} views</span>
                  </div>

                  <Button className="w-full">
                    <PlayCircle className="mr-2 h-4 w-4" />
                    Watch Video
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="links" className="space-y-6">
          {/* Links List */}
          <div className="space-y-4">
            {links.map((link) => (
              <Card key={link.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 mt-1">
                        <Link className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold">{link.title}</h3>
                          <Badge className={getCategoryColor(link.category)}>
                            {link.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{link.description}</p>
                        <a 
                          href={link.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline"
                        >
                          {link.url}
                        </a>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <User className="h-3 w-3" />
                            <span>Added by {link.addedBy}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3" />
                            <span>{new Date(link.addedAt).toLocaleDateString()}</span>
                          </div>
                          <span>{link.clicks} clicks</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Visit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}