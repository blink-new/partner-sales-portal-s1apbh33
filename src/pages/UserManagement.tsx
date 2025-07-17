import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Users, 
  UserPlus, 
  Shield, 
  Settings,
  Mail,
  Phone,
  Calendar,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  UserCheck,
  UserX,
  Crown,
  Key,
  Building2,
  Filter,
  Search,
  Download,
  Upload
} from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Checkbox } from '@/components/ui/checkbox'
import type { User } from '@/types'

const mockUsers: User[] = [
  {
    id: 'user_1',
    email: 'john.smith@company.com',
    displayName: 'John Smith',
    role: 'admin',
    department: 'Sales',
    status: 'active',
    lastLogin: '2024-01-15T10:30:00Z',
    createdAt: '2023-06-15T00:00:00Z',
    permissions: ['manage_users', 'manage_partners', 'manage_deals', 'view_analytics', 'manage_settings']
  },
  {
    id: 'user_2',
    email: 'sarah.johnson@company.com',
    displayName: 'Sarah Johnson',
    role: 'manager',
    department: 'Partner Success',
    status: 'active',
    lastLogin: '2024-01-14T16:45:00Z',
    createdAt: '2023-08-20T00:00:00Z',
    permissions: ['manage_partners', 'manage_deals', 'view_analytics']
  },
  {
    id: 'user_3',
    email: 'mike.wilson@company.com',
    displayName: 'Mike Wilson',
    role: 'user',
    department: 'Sales',
    status: 'active',
    lastLogin: '2024-01-15T09:15:00Z',
    createdAt: '2023-11-10T00:00:00Z',
    permissions: ['manage_deals', 'view_analytics']
  },
  {
    id: 'user_4',
    email: 'lisa.brown@company.com',
    displayName: 'Lisa Brown',
    role: 'user',
    department: 'Marketing',
    status: 'inactive',
    lastLogin: '2023-12-20T14:20:00Z',
    createdAt: '2023-09-05T00:00:00Z',
    permissions: ['view_analytics']
  },
  {
    id: 'user_5',
    email: 'david.garcia@company.com',
    displayName: 'David Garcia',
    role: 'manager',
    department: 'Operations',
    status: 'pending',
    lastLogin: null,
    createdAt: '2024-01-10T00:00:00Z',
    permissions: ['manage_partners', 'view_analytics']
  }
]

const rolePermissions = {
  admin: {
    label: 'Administrator',
    description: 'Full access to all features and settings',
    permissions: ['manage_users', 'manage_partners', 'manage_deals', 'view_analytics', 'manage_settings', 'manage_integrations'],
    color: 'bg-red-100 text-red-800'
  },
  manager: {
    label: 'Manager',
    description: 'Manage partners, deals, and view analytics',
    permissions: ['manage_partners', 'manage_deals', 'view_analytics'],
    color: 'bg-blue-100 text-blue-800'
  },
  user: {
    label: 'User',
    description: 'Basic access to deals and analytics',
    permissions: ['manage_deals', 'view_analytics'],
    color: 'bg-green-100 text-green-800'
  }
}

const allPermissions = [
  { id: 'manage_users', label: 'Manage Users', description: 'Add, edit, and remove users' },
  { id: 'manage_partners', label: 'Manage Partners', description: 'Add, edit, and manage partner relationships' },
  { id: 'manage_deals', label: 'Manage Deals', description: 'Create, edit, and track deals' },
  { id: 'view_analytics', label: 'View Analytics', description: 'Access reports and analytics dashboard' },
  { id: 'manage_settings', label: 'Manage Settings', description: 'Configure portal settings and preferences' },
  { id: 'manage_integrations', label: 'Manage Integrations', description: 'Configure CRM and other integrations' }
]

export function UserManagement() {
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [filteredUsers, setFilteredUsers] = useState<User[]>(mockUsers)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [roleFilter, setRoleFilter] = useState<string>('all')
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [isAddUserOpen, setIsAddUserOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)

  const [newUser, setNewUser] = useState({
    email: '',
    displayName: '',
    role: 'user' as User['role'],
    department: '',
    permissions: [] as string[]
  })

  // Filter users based on search and filters
  useEffect(() => {
    let filtered = users

    if (searchTerm) {
      filtered = filtered.filter(user => 
        user.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.department?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(user => user.status === statusFilter)
    }

    if (roleFilter !== 'all') {
      filtered = filtered.filter(user => user.role === roleFilter)
    }

    setFilteredUsers(filtered)
  }, [users, searchTerm, statusFilter, roleFilter])

  const handleAddUser = () => {
    const user: User = {
      id: `user_${Date.now()}`,
      email: newUser.email,
      displayName: newUser.displayName,
      role: newUser.role,
      department: newUser.department,
      status: 'pending',
      permissions: newUser.permissions,
      createdAt: new Date().toISOString()
    }

    setUsers([...users, user])
    setNewUser({
      email: '',
      displayName: '',
      role: 'user',
      department: '',
      permissions: []
    })
    setIsAddUserOpen(false)
  }

  const handleUpdateUser = (updatedUser: User) => {
    setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user))
    setEditingUser(null)
  }

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId))
  }

  const handleBulkAction = (action: string) => {
    switch (action) {
      case 'activate':
        setUsers(users.map(user => 
          selectedUsers.includes(user.id) ? { ...user, status: 'active' as const } : user
        ))
        break
      case 'deactivate':
        setUsers(users.map(user => 
          selectedUsers.includes(user.id) ? { ...user, status: 'inactive' as const } : user
        ))
        break
      case 'delete':
        setUsers(users.filter(user => !selectedUsers.includes(user.id)))
        break
    }
    setSelectedUsers([])
  }

  const getRoleIcon = (role: User['role']) => {
    switch (role) {
      case 'admin':
        return <Crown className="h-4 w-4" />
      case 'manager':
        return <Shield className="h-4 w-4" />
      default:
        return <Users className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: User['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'inactive':
        return 'bg-gray-100 text-gray-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground">
            Manage team members, roles, and permissions for your partner portal
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>
                  Create a new user account and assign roles and permissions
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newUser.email}
                      onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                      placeholder="user@company.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="displayName">Full Name</Label>
                    <Input
                      id="displayName"
                      value={newUser.displayName}
                      onChange={(e) => setNewUser({ ...newUser, displayName: e.target.value })}
                      placeholder="John Smith"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select value={newUser.role} onValueChange={(value) => setNewUser({ ...newUser, role: value as User['role'] })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(rolePermissions).map(([role, config]) => (
                          <SelectItem key={role} value={role}>
                            <div className="flex items-center space-x-2">
                              {getRoleIcon(role as User['role'])}
                              <span>{config.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select value={newUser.department} onValueChange={(value) => setNewUser({ ...newUser, department: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Sales">Sales</SelectItem>
                        <SelectItem value="Marketing">Marketing</SelectItem>
                        <SelectItem value="Partner Success">Partner Success</SelectItem>
                        <SelectItem value="Operations">Operations</SelectItem>
                        <SelectItem value="IT">IT</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Permissions</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {allPermissions.map((permission) => (
                      <div key={permission.id} className="flex items-start space-x-2">
                        <Checkbox
                          id={permission.id}
                          checked={newUser.permissions.includes(permission.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setNewUser({
                                ...newUser,
                                permissions: [...newUser.permissions, permission.id]
                              })
                            } else {
                              setNewUser({
                                ...newUser,
                                permissions: newUser.permissions.filter(p => p !== permission.id)
                              })
                            }
                          }}
                        />
                        <div className="space-y-1">
                          <Label htmlFor={permission.id} className="text-sm font-medium">
                            {permission.label}
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            {permission.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddUser}>
                    Add User
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-xs text-muted-foreground">
              +2 from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {users.filter(u => u.status === 'active').length}
            </div>
            <p className="text-xs text-muted-foreground">
              {Math.round((users.filter(u => u.status === 'active').length / users.length) * 100)}% of total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Administrators</CardTitle>
            <Crown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {users.filter(u => u.role === 'admin').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Full system access
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Invites</CardTitle>
            <UserX className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {users.filter(u => u.status === 'pending').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Awaiting activation
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
          <TabsTrigger value="activity">Activity Log</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-6">
          {/* Filters and Search */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-4 flex-1">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={roleFilter} onValueChange={setRoleFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="user">User</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {selectedUsers.length > 0 && (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">
                      {selectedUsers.length} selected
                    </span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          Bulk Actions
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => handleBulkAction('activate')}>
                          <UserCheck className="mr-2 h-4 w-4" />
                          Activate Users
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleBulkAction('deactivate')}>
                          <UserX className="mr-2 h-4 w-4" />
                          Deactivate Users
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleBulkAction('delete')} className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Users
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Users Table */}
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>
                Manage user accounts, roles, and permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={selectedUsers.length === filteredUsers.length}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedUsers(filteredUsers.map(u => u.id))
                          } else {
                            setSelectedUsers([])
                          }
                        }}
                      />
                    </TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedUsers.includes(user.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedUsers([...selectedUsers, user.id])
                            } else {
                              setSelectedUsers(selectedUsers.filter(id => id !== user.id))
                            }
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback>
                              {user.displayName?.split(' ').map(n => n[0]).join('') || user.email[0].toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{user.displayName || 'No name'}</div>
                            <div className="text-sm text-muted-foreground">{user.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getRoleIcon(user.role)}
                          <Badge className={rolePermissions[user.role!]?.color}>
                            {rolePermissions[user.role!]?.label}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Building2 className="h-4 w-4 text-muted-foreground" />
                          <span>{user.department || 'Not assigned'}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(user.status)}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            {user.lastLogin 
                              ? new Date(user.lastLogin).toLocaleDateString()
                              : 'Never'
                            }
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setEditingUser(user)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit User
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Key className="mr-2 h-4 w-4" />
                              Reset Password
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDeleteUser(user.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            {Object.entries(rolePermissions).map(([role, config]) => (
              <Card key={role}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    {getRoleIcon(role as User['role'])}
                    <span>{config.label}</span>
                  </CardTitle>
                  <CardDescription>{config.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Permissions</h4>
                    <div className="space-y-2">
                      {config.permissions.map((permission) => {
                        const permissionConfig = allPermissions.find(p => p.id === permission)
                        return (
                          <div key={permission} className="flex items-center space-x-2">
                            <Checkbox checked disabled />
                            <span className="text-sm">{permissionConfig?.label}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  <div className="pt-2 border-t">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Users with this role</span>
                      <span className="font-medium">
                        {users.filter(u => u.role === role).length}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>User Activity Log</CardTitle>
              <CardDescription>
                Track user actions and system events
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    id: '1',
                    user: 'John Smith',
                    action: 'User login',
                    details: 'Logged in from Chrome on macOS',
                    timestamp: '2024-01-15T10:30:00Z',
                    type: 'login'
                  },
                  {
                    id: '2',
                    user: 'Sarah Johnson',
                    action: 'Partner created',
                    details: 'Created new partner: TechCorp Solutions',
                    timestamp: '2024-01-15T09:45:00Z',
                    type: 'create'
                  },
                  {
                    id: '3',
                    user: 'Mike Wilson',
                    action: 'Deal updated',
                    details: 'Updated deal status to "Closed Won"',
                    timestamp: '2024-01-15T09:15:00Z',
                    type: 'update'
                  },
                  {
                    id: '4',
                    user: 'John Smith',
                    action: 'User created',
                    details: 'Created new user account for David Garcia',
                    timestamp: '2024-01-14T16:20:00Z',
                    type: 'create'
                  },
                  {
                    id: '5',
                    user: 'Lisa Brown',
                    action: 'Settings updated',
                    details: 'Updated notification preferences',
                    timestamp: '2024-01-14T14:30:00Z',
                    type: 'update'
                  }
                ].map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                      {activity.type === 'login' && <UserCheck className="h-4 w-4" />}
                      {activity.type === 'create' && <UserPlus className="h-4 w-4" />}
                      {activity.type === 'update' && <Edit className="h-4 w-4" />}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{activity.action}</p>
                        <span className="text-sm text-muted-foreground">
                          {new Date(activity.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{activity.details}</p>
                      <p className="text-xs text-muted-foreground">by {activity.user}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit User Dialog */}
      {editingUser && (
        <Dialog open={!!editingUser} onOpenChange={() => setEditingUser(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
              <DialogDescription>
                Update user information, role, and permissions
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="editEmail">Email Address</Label>
                  <Input
                    id="editEmail"
                    type="email"
                    value={editingUser.email}
                    onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editDisplayName">Full Name</Label>
                  <Input
                    id="editDisplayName"
                    value={editingUser.displayName || ''}
                    onChange={(e) => setEditingUser({ ...editingUser, displayName: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="editRole">Role</Label>
                  <Select 
                    value={editingUser.role} 
                    onValueChange={(value) => setEditingUser({ ...editingUser, role: value as User['role'] })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(rolePermissions).map(([role, config]) => (
                        <SelectItem key={role} value={role}>
                          <div className="flex items-center space-x-2">
                            {getRoleIcon(role as User['role'])}
                            <span>{config.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editDepartment">Department</Label>
                  <Select 
                    value={editingUser.department} 
                    onValueChange={(value) => setEditingUser({ ...editingUser, department: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Sales">Sales</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Partner Success">Partner Success</SelectItem>
                      <SelectItem value="Operations">Operations</SelectItem>
                      <SelectItem value="IT">IT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editStatus">Status</Label>
                  <Select 
                    value={editingUser.status} 
                    onValueChange={(value) => setEditingUser({ ...editingUser, status: value as User['status'] })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-3">
                <Label>Permissions</Label>
                <div className="grid grid-cols-2 gap-3">
                  {allPermissions.map((permission) => (
                    <div key={permission.id} className="flex items-start space-x-2">
                      <Checkbox
                        id={`edit_${permission.id}`}
                        checked={editingUser.permissions?.includes(permission.id) || false}
                        onCheckedChange={(checked) => {
                          const currentPermissions = editingUser.permissions || []
                          if (checked) {
                            setEditingUser({
                              ...editingUser,
                              permissions: [...currentPermissions, permission.id]
                            })
                          } else {
                            setEditingUser({
                              ...editingUser,
                              permissions: currentPermissions.filter(p => p !== permission.id)
                            })
                          }
                        }}
                      />
                      <div className="space-y-1">
                        <Label htmlFor={`edit_${permission.id}`} className="text-sm font-medium">
                          {permission.label}
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          {permission.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setEditingUser(null)}>
                  Cancel
                </Button>
                <Button onClick={() => handleUpdateUser(editingUser)}>
                  Save Changes
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}