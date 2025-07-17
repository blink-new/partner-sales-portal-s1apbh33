import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  User, 
  Building2, 
  Bell, 
  Shield, 
  Palette,
  Globe,
  Mail,
  Phone,
  MapPin,
  Save,
  Upload,
  Key,
  Users,
  Settings as SettingsIcon,
  Database,
  FileSpreadsheet,
  Link,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Download,
  Eye,
  Trash2,
  Plus
} from 'lucide-react'

export function Settings() {
  const [notifications, setNotifications] = useState({
    emailDeals: true,
    emailPartners: true,
    emailReports: false,
    pushDeals: true,
    pushPartners: false,
    pushReports: true
  })

  const [profile, setProfile] = useState({
    name: 'John Smith',
    email: 'john@company.com',
    phone: '+1 (555) 123-4567',
    title: 'Partner Manager',
    company: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    bio: 'Experienced partner manager with 5+ years in channel sales and business development.'
  })

  const [integrations, setIntegrations] = useState({
    salesforce: { connected: false, lastSync: null, apiKey: '' },
    hubspot: { connected: true, lastSync: '2024-01-15T10:30:00Z', apiKey: 'hb_***' },
    pipedrive: { connected: false, lastSync: null, apiKey: '' }
  })

  const [uploadHistory, setUploadHistory] = useState([
    {
      id: '1',
      filename: 'partners_q4_2023.csv',
      uploadedAt: '2024-01-15T14:30:00Z',
      status: 'completed',
      recordsProcessed: 156,
      recordsSuccess: 152,
      recordsError: 4
    },
    {
      id: '2',
      filename: 'partner_contacts.xlsx',
      uploadedAt: '2024-01-10T09:15:00Z',
      status: 'completed',
      recordsProcessed: 89,
      recordsSuccess: 89,
      recordsError: 0
    }
  ])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account preferences and portal configuration
          </p>
        </div>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="company">Company</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Profile Information</span>
              </CardTitle>
              <CardDescription>
                Update your personal information and profile details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/api/placeholder/80/80" alt="Profile" />
                  <AvatarFallback>
                    <User className="h-8 w-8" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm">
                    <Upload className="mr-2 h-4 w-4" />
                    Change Photo
                  </Button>
                  <p className="text-sm text-muted-foreground mt-1">
                    JPG, PNG or GIF. Max size 2MB.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title</Label>
                  <Input 
                    id="title" 
                    value={profile.title}
                    onChange={(e) => setProfile({...profile, title: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input 
                    id="phone" 
                    value={profile.phone}
                    onChange={(e) => setProfile({...profile, phone: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input 
                  id="location" 
                  value={profile.location}
                  onChange={(e) => setProfile({...profile, location: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea 
                  id="bio" 
                  value={profile.bio}
                  onChange={(e) => setProfile({...profile, bio: e.target.value})}
                  rows={3}
                />
              </div>

              <Button>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="company" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Building2 className="h-5 w-5" />
                <span>Company Information</span>
              </CardTitle>
              <CardDescription>
                Manage your company details and branding
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input id="companyName" value="TechCorp Inc." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" value="https://techcorp.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="size">Company Size</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 employees</SelectItem>
                      <SelectItem value="11-50">11-50 employees</SelectItem>
                      <SelectItem value="51-200">51-200 employees</SelectItem>
                      <SelectItem value="201-1000">201-1000 employees</SelectItem>
                      <SelectItem value="1000+">1000+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea id="address" rows={3} placeholder="Enter company address" />
              </div>

              <Button>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Partner Data Upload */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileSpreadsheet className="h-5 w-5" />
                  <span>Partner Data Upload</span>
                </CardTitle>
                <CardDescription>
                  Upload partner data from CSV or Excel files for self-serve onboarding
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm font-medium mb-1">Drop files here or click to browse</p>
                  <p className="text-xs text-muted-foreground mb-3">
                    Supports CSV, XLSX files up to 10MB
                  </p>
                  <Button variant="outline" size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Choose Files
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">Required Fields:</span>
                    <Button variant="ghost" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Download Template
                    </Button>
                  </div>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>• Partner Name, Email, Company (required)</p>
                    <p>• Phone, Website, Industry (optional)</p>
                    <p>• Tier, Territory, Contact Person (optional)</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CRM Integrations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="h-5 w-5" />
                  <span>CRM Integrations</span>
                </CardTitle>
                <CardDescription>
                  Connect your existing CRM systems for seamless data flow
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(integrations).map(([crm, config]) => (
                  <div key={crm} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 bg-muted rounded flex items-center justify-center">
                        <Database className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium capitalize">{crm}</p>
                        <p className="text-xs text-muted-foreground">
                          {config.connected 
                            ? `Last sync: ${new Date(config.lastSync).toLocaleDateString()}`
                            : 'Not connected'
                          }
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {config.connected ? (
                        <>
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <Button variant="outline" size="sm">
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Sync
                          </Button>
                          <Button variant="ghost" size="sm">
                            Disconnect
                          </Button>
                        </>
                      ) : (
                        <Button size="sm">
                          <Link className="mr-2 h-4 w-4" />
                          Connect
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
                
                <div className="pt-2">
                  <Button variant="outline" className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Custom Integration
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Upload History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileSpreadsheet className="h-5 w-5" />
                <span>Upload History</span>
              </CardTitle>
              <CardDescription>
                Track your recent partner data uploads and their processing status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {uploadHistory.map((upload) => (
                  <div key={upload.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 bg-muted rounded-lg flex items-center justify-center">
                        <FileSpreadsheet className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">{upload.filename}</p>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>Uploaded {new Date(upload.uploadedAt).toLocaleDateString()}</span>
                          <span>•</span>
                          <span>{upload.recordsProcessed} records processed</span>
                          {upload.recordsError > 0 && (
                            <>
                              <span>•</span>
                              <span className="text-amber-600">{upload.recordsError} errors</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        {upload.status === 'completed' ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-amber-500" />
                        )}
                        <span className="text-sm capitalize">{upload.status}</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              {uploadHistory.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <FileSpreadsheet className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No uploads yet</p>
                  <p className="text-sm">Upload your first partner data file to get started</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Integration Bridge Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Link className="h-5 w-5" />
                <span>Integration Bridge</span>
              </CardTitle>
              <CardDescription>
                Configure how this portal integrates with your main CRM system
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Sync Direction</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select sync direction" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bidirectional">Bidirectional Sync</SelectItem>
                      <SelectItem value="portal-to-crm">Portal → CRM Only</SelectItem>
                      <SelectItem value="crm-to-portal">CRM → Portal Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Sync Frequency</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="realtime">Real-time</SelectItem>
                      <SelectItem value="hourly">Every Hour</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="manual">Manual Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Field Mapping</h4>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="font-medium">Portal Field</div>
                    <div className="font-medium">CRM Field</div>
                    <div className="font-medium">Sync Rule</div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>Partner Name</div>
                    <div>Account Name</div>
                    <div>
                      <Select>
                        <SelectTrigger className="h-8">
                          <SelectValue placeholder="Rule" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="overwrite">Overwrite</SelectItem>
                          <SelectItem value="merge">Merge</SelectItem>
                          <SelectItem value="skip">Skip if exists</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>Partner Email</div>
                    <div>Primary Contact Email</div>
                    <div>
                      <Select>
                        <SelectTrigger className="h-8">
                          <SelectValue placeholder="Rule" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="overwrite">Overwrite</SelectItem>
                          <SelectItem value="merge">Merge</SelectItem>
                          <SelectItem value="skip">Skip if exists</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>Deal Value</div>
                    <div>Opportunity Amount</div>
                    <div>
                      <Select>
                        <SelectTrigger className="h-8">
                          <SelectValue placeholder="Rule" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="overwrite">Overwrite</SelectItem>
                          <SelectItem value="merge">Merge</SelectItem>
                          <SelectItem value="skip">Skip if exists</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Field Mapping
                </Button>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="space-y-1">
                  <p className="font-medium">Bridge Status</p>
                  <p className="text-sm text-muted-foreground">
                    Integration bridge is active and syncing data
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-medium text-green-600">Active</span>
                </div>
              </div>

              <Button>
                <Save className="mr-2 h-4 w-4" />
                Save Integration Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Notification Preferences</span>
              </CardTitle>
              <CardDescription>
                Choose how you want to be notified about important updates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>Email Notifications</span>
                </h4>
                <div className="space-y-3 ml-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Deal Updates</p>
                      <p className="text-sm text-muted-foreground">Get notified about deal status changes</p>
                    </div>
                    <Switch 
                      checked={notifications.emailDeals}
                      onCheckedChange={(checked) => setNotifications({...notifications, emailDeals: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Partner Activity</p>
                      <p className="text-sm text-muted-foreground">Updates about partner registrations and activity</p>
                    </div>
                    <Switch 
                      checked={notifications.emailPartners}
                      onCheckedChange={(checked) => setNotifications({...notifications, emailPartners: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Weekly Reports</p>
                      <p className="text-sm text-muted-foreground">Weekly summary of portal activity</p>
                    </div>
                    <Switch 
                      checked={notifications.emailReports}
                      onCheckedChange={(checked) => setNotifications({...notifications, emailReports: checked})}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium flex items-center space-x-2">
                  <Bell className="h-4 w-4" />
                  <span>Push Notifications</span>
                </h4>
                <div className="space-y-3 ml-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Deal Updates</p>
                      <p className="text-sm text-muted-foreground">Instant notifications for deal changes</p>
                    </div>
                    <Switch 
                      checked={notifications.pushDeals}
                      onCheckedChange={(checked) => setNotifications({...notifications, pushDeals: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Partner Activity</p>
                      <p className="text-sm text-muted-foreground">Real-time partner notifications</p>
                    </div>
                    <Switch 
                      checked={notifications.pushPartners}
                      onCheckedChange={(checked) => setNotifications({...notifications, pushPartners: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">System Updates</p>
                      <p className="text-sm text-muted-foreground">Important system announcements</p>
                    </div>
                    <Switch 
                      checked={notifications.pushReports}
                      onCheckedChange={(checked) => setNotifications({...notifications, pushReports: checked})}
                    />
                  </div>
                </div>
              </div>

              <Button>
                <Save className="mr-2 h-4 w-4" />
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Security Settings</span>
              </CardTitle>
              <CardDescription>
                Manage your account security and access controls
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium flex items-center space-x-2">
                  <Key className="h-4 w-4" />
                  <span>Password</span>
                </h4>
                <div className="space-y-3 ml-6">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                  <Button variant="outline">
                    Update Password
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Two-Factor Authentication</h4>
                <div className="ml-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Enable 2FA</p>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Active Sessions</h4>
                <div className="ml-6 space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Current Session</p>
                      <p className="text-sm text-muted-foreground">Chrome on macOS • San Francisco, CA</p>
                    </div>
                    <Button variant="outline" size="sm" disabled>
                      Current
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Mobile App</p>
                      <p className="text-sm text-muted-foreground">iOS App • Last active 2 hours ago</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Revoke
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <SettingsIcon className="h-5 w-5" />
                <span>Portal Preferences</span>
              </CardTitle>
              <CardDescription>
                Customize your portal experience and display settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium flex items-center space-x-2">
                  <Palette className="h-4 w-4" />
                  <span>Appearance</span>
                </h4>
                <div className="space-y-3 ml-6">
                  <div className="space-y-2">
                    <Label>Theme</Label>
                    <Select>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Select theme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Language</Label>
                    <Select>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium flex items-center space-x-2">
                  <Globe className="h-4 w-4" />
                  <span>Regional Settings</span>
                </h4>
                <div className="space-y-3 ml-6">
                  <div className="space-y-2">
                    <Label>Timezone</Label>
                    <Select>
                      <SelectTrigger className="w-64">
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
                        <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
                        <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
                        <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Date Format</Label>
                    <Select>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                        <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                        <SelectItem value="ymd">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Button>
                <Save className="mr-2 h-4 w-4" />
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}