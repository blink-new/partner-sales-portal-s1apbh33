import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useToast } from '@/hooks/use-toast'
import { blink } from '@/blink/client'
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  FileText,
  Video,
  Link,
  FileSpreadsheet,
  Star,
  Clock,
  Users,
  Loader2,
  Upload,
  Tag
} from 'lucide-react'

interface Resource {
  id: string
  title: string
  description: string
  type: 'document' | 'video' | 'link' | 'template'
  url?: string
  filePath?: string
  category: string
  tags: string[]
  accessLevel: 'all' | 'gold' | 'silver' | 'bronze'
  downloadCount: number
  createdAt: string
  updatedAt: string
  userId: string
}

const resourceCategories = [
  'Sales Materials',
  'Training',
  'Marketing',
  'Technical',
  'Legal',
  'Onboarding'
]

const accessLevels = [
  { value: 'all', label: 'All Partners', color: 'bg-blue-100 text-blue-800' },
  { value: 'bronze', label: 'Bronze+', color: 'bg-orange-100 text-orange-800' },
  { value: 'silver', label: 'Silver+', color: 'bg-gray-100 text-gray-800' },
  { value: 'gold', label: 'Gold Only', color: 'bg-yellow-100 text-yellow-800' }
]

export function Resources() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedType, setSelectedType] = useState('all')
  const [resources, setResources] = useState<Resource[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: '',
    url: '',
    category: '',
    tags: '',
    accessLevel: 'all'
  })
  const { toast } = useToast()

  useEffect(() => {
    loadResources()
  }, [])

  const loadResources = async () => {
    try {
      setLoading(true)
      const user = await blink.auth.me()
      
      // Try to load from localStorage first, then fallback to mock data
      const savedResources = localStorage.getItem(`resources_${user.id}`)
      if (savedResources) {
        setResources(JSON.parse(savedResources))
      } else {
        // Initialize with sample data
        const initialResources: Resource[] = [
          {
            id: 'resource_1',
            title: 'Partner Sales Playbook',
            description: 'Complete guide to selling our solutions effectively',
            type: 'document',
            url: 'https://example.com/playbook.pdf',
            category: 'Sales Materials',
            tags: ['sales', 'guide', 'best-practices'],
            accessLevel: 'all',
            downloadCount: 45,
            createdAt: '2024-01-15T00:00:00Z',
            updatedAt: '2024-01-15T00:00:00Z',
            userId: user.id
          },
          {
            id: 'resource_2',
            title: 'Product Demo Video',
            description: 'Comprehensive product demonstration for client presentations',
            type: 'video',
            url: 'https://example.com/demo-video',
            category: 'Sales Materials',
            tags: ['demo', 'video', 'presentation'],
            accessLevel: 'silver',
            downloadCount: 32,
            createdAt: '2024-01-20T00:00:00Z',
            updatedAt: '2024-01-20T00:00:00Z',
            userId: user.id
          },
          {
            id: 'resource_3',
            title: 'Technical Integration Guide',
            description: 'Step-by-step technical implementation documentation',
            type: 'document',
            url: 'https://example.com/tech-guide.pdf',
            category: 'Technical',
            tags: ['technical', 'integration', 'documentation'],
            accessLevel: 'gold',
            downloadCount: 18,
            createdAt: '2024-01-25T00:00:00Z',
            updatedAt: '2024-01-25T00:00:00Z',
            userId: user.id
          },
          {
            id: 'resource_4',
            title: 'Partner Training Portal',
            description: 'Access to our comprehensive partner training platform',
            type: 'link',
            url: 'https://training.example.com',
            category: 'Training',
            tags: ['training', 'certification', 'learning'],
            accessLevel: 'all',
            downloadCount: 67,
            createdAt: '2024-02-01T00:00:00Z',
            updatedAt: '2024-02-01T00:00:00Z',
            userId: user.id
          },
          {
            id: 'resource_5',
            title: 'Proposal Template',
            description: 'Professional proposal template with our branding',
            type: 'template',
            url: 'https://example.com/proposal-template.docx',
            category: 'Sales Materials',
            tags: ['template', 'proposal', 'branding'],
            accessLevel: 'bronze',
            downloadCount: 89,
            createdAt: '2024-02-05T00:00:00Z',
            updatedAt: '2024-02-05T00:00:00Z',
            userId: user.id
          },
          {
            id: 'resource_6',
            title: 'Marketing Asset Library',
            description: 'Logos, images, and marketing materials for co-marketing',
            type: 'link',
            url: 'https://assets.example.com',
            category: 'Marketing',
            tags: ['marketing', 'assets', 'branding', 'co-marketing'],
            accessLevel: 'silver',
            downloadCount: 23,
            createdAt: '2024-02-10T00:00:00Z',
            updatedAt: '2024-02-10T00:00:00Z',
            userId: user.id
          }
        ]
        setResources(initialResources)
        localStorage.setItem(`resources_${user.id}`, JSON.stringify(initialResources))
      }
    } catch (error) {
      console.error('Error loading resources:', error)
      toast({
        title: "Error",
        description: "Failed to load resources",
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
      if (!formData.title || !formData.type || !formData.category) {
        toast({
          title: "Validation Error",
          description: "Please fill in all required fields",
          variant: "destructive"
        })
        return
      }

      // Create new resource
      const newResource: Resource = {
        id: `resource_${Date.now()}`,
        title: formData.title,
        description: formData.description,
        type: formData.type as any,
        url: formData.url,
        category: formData.category,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        accessLevel: formData.accessLevel as any,
        downloadCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: user.id
      }

      // Add to resources list (optimistic update)
      const updatedResources = [newResource, ...resources]
      setResources(updatedResources)
      
      // Save to localStorage
      localStorage.setItem(`resources_${user.id}`, JSON.stringify(updatedResources))
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        type: '',
        url: '',
        category: '',
        tags: '',
        accessLevel: 'all'
      })
      
      setIsDialogOpen(false)
      
      toast({
        title: "Success",
        description: "Resource added successfully"
      })
      
    } catch (error) {
      console.error('Error creating resource:', error)
      toast({
        title: "Error",
        description: "Failed to add resource",
        variant: "destructive"
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleDownload = async (resource: Resource) => {
    // Simulate download and increment counter
    const updatedResources = resources.map(r => 
      r.id === resource.id 
        ? { ...r, downloadCount: r.downloadCount + 1 }
        : r
    )
    setResources(updatedResources)
    
    const user = await blink.auth.me()
    localStorage.setItem(`resources_${user.id}`, JSON.stringify(updatedResources))
    
    // Open URL in new tab
    if (resource.url) {
      window.open(resource.url, '_blank')
    }
    
    toast({
      title: "Download Started",
      description: `Downloading ${resource.title}`
    })
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'document':
        return FileText
      case 'video':
        return Video
      case 'link':
        return Link
      case 'template':
        return FileSpreadsheet
      default:
        return FileText
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'document':
        return 'bg-blue-100 text-blue-800'
      case 'video':
        return 'bg-purple-100 text-purple-800'
      case 'link':
        return 'bg-green-100 text-green-800'
      case 'template':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getAccessLevelColor = (level: string) => {
    return accessLevels.find(al => al.value === level)?.color || 'bg-gray-100 text-gray-800'
  }

  const filteredResources = resources.filter(resource => {
    const matchesSearch = searchTerm === '' || 
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory
    const matchesType = selectedType === 'all' || resource.type === selectedType
    
    return matchesSearch && matchesCategory && matchesType
  })

  const groupedResources = filteredResources.reduce((acc, resource) => {
    if (!acc[resource.category]) {
      acc[resource.category] = []
    }
    acc[resource.category].push(resource)
    return acc
  }, {} as Record<string, Resource[]>)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Resource Center</h1>
          <p className="text-muted-foreground">
            Access training materials, sales tools, and documentation
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
                Add a new resource to the partner library
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input 
                    id="title" 
                    placeholder="Resource title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Type *</Label>
                  <Select onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="document">Document</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                      <SelectItem value="link">Link</SelectItem>
                      <SelectItem value="template">Template</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Brief description of the resource"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="url">URL</Label>
                <Input 
                  id="url" 
                  placeholder="https://example.com/resource"
                  value={formData.url}
                  onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {resourceCategories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accessLevel">Access Level</Label>
                  <Select onValueChange={(value) => setFormData(prev => ({ ...prev, accessLevel: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select access level" />
                    </SelectTrigger>
                    <SelectContent>
                      {accessLevels.map(level => (
                        <SelectItem key={level.value} value={level.value}>{level.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input 
                  id="tags" 
                  placeholder="sales, guide, training (comma separated)"
                  value={formData.tags}
                  onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={submitting}>
                {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Add Resource
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
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {resourceCategories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="document">Documents</SelectItem>
                <SelectItem value="video">Videos</SelectItem>
                <SelectItem value="link">Links</SelectItem>
                <SelectItem value="template">Templates</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Resources Content */}
      {loading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">Loading resources...</span>
        </div>
      ) : (
        <Tabs defaultValue="grid" className="space-y-4">
          <TabsList>
            <TabsTrigger value="grid">Grid View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="category">By Category</TabsTrigger>
          </TabsList>

          <TabsContent value="grid" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredResources.map((resource) => {
                const TypeIcon = getTypeIcon(resource.type)
                return (
                  <Card key={resource.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg ${getTypeColor(resource.type)}`}>
                            <TypeIcon className="h-5 w-5" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{resource.title}</CardTitle>
                            <p className="text-sm text-muted-foreground">{resource.category}</p>
                          </div>
                        </div>
                        <Badge className={getAccessLevelColor(resource.accessLevel)}>
                          {accessLevels.find(al => al.value === resource.accessLevel)?.label}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">{resource.description}</p>
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center space-x-2">
                          <Download className="h-4 w-4" />
                          <span>{resource.downloadCount} downloads</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4" />
                          <span>{new Date(resource.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {resource.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            <Tag className="mr-1 h-3 w-3" />
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex space-x-2 pt-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => handleDownload(resource)}
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="mr-2 h-4 w-4" />
                          Preview
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="list" className="space-y-4">
            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  {filteredResources.map((resource) => {
                    const TypeIcon = getTypeIcon(resource.type)
                    return (
                      <div key={resource.id} className="p-4 hover:bg-muted/50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className={`p-2 rounded-lg ${getTypeColor(resource.type)}`}>
                              <TypeIcon className="h-5 w-5" />
                            </div>
                            <div>
                              <h3 className="font-medium">{resource.title}</h3>
                              <p className="text-sm text-muted-foreground">{resource.description}</p>
                              <div className="flex items-center space-x-4 mt-2">
                                <Badge variant="outline">{resource.category}</Badge>
                                <Badge className={getAccessLevelColor(resource.accessLevel)}>
                                  {accessLevels.find(al => al.value === resource.accessLevel)?.label}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  {resource.downloadCount} downloads
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleDownload(resource)}
                            >
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </Button>
                            <Button variant="outline" size="sm">
                              <Eye className="mr-2 h-4 w-4" />
                              Preview
                            </Button>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="category" className="space-y-6">
            {Object.entries(groupedResources).map(([category, categoryResources]) => (
              <Card key={category}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {category}
                    <Badge variant="outline">{categoryResources.length} resources</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {categoryResources.map((resource) => {
                      const TypeIcon = getTypeIcon(resource.type)
                      return (
                        <div key={resource.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                          <div className="flex items-start space-x-3">
                            <div className={`p-2 rounded-lg ${getTypeColor(resource.type)}`}>
                              <TypeIcon className="h-4 w-4" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium">{resource.title}</h4>
                              <p className="text-sm text-muted-foreground mt-1">{resource.description}</p>
                              <div className="flex items-center justify-between mt-3">
                                <Badge className={getAccessLevelColor(resource.accessLevel)}>
                                  {accessLevels.find(al => al.value === resource.accessLevel)?.label}
                                </Badge>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleDownload(resource)}
                                >
                                  <Download className="mr-1 h-3 w-3" />
                                  Download
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}