export interface Partner {
  id: string
  name: string
  email: string
  company: string
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum'
  status: 'Active' | 'Inactive' | 'Pending'
  joinedAt: string
  totalDeals: number
  totalRevenue: number
  avatar?: string
  phone?: string
  website?: string
  address?: string
  notes?: string
  userId: string
}

export interface Deal {
  id: string
  title: string
  partnerId?: string
  partnerName?: string
  clientName: string
  clientEmail: string
  clientPhone?: string
  clientCompany?: string
  value: number
  status: 'Draft' | 'Submitted' | 'Approved' | 'Rejected' | 'Closed Won' | 'Closed Lost'
  stage: 'Prospecting' | 'Qualification' | 'Proposal' | 'Negotiation' | 'Closing'
  probability: number
  expectedCloseDate?: string
  actualCloseDate?: string
  description?: string
  source: 'Partner' | 'Internal'
  createdAt: string
  updatedAt: string
  userId: string
}

export interface Contact {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  position?: string
  partnerId?: string
  dealId?: string
  status: 'Lead' | 'Prospect' | 'Customer'
  lastContact?: string
  notes?: string
  createdAt: string
  updatedAt: string
  userId: string
}

export interface Activity {
  id: string
  type: 'deal_created' | 'deal_updated' | 'deal_closed' | 'partner_joined' | 'partner_updated' | 'contact_added' | 'contact_updated' | 'meeting_scheduled' | 'email_sent' | 'call_made'
  title: string
  description?: string
  userId: string
  entityId?: string
  entityType?: 'deal' | 'partner' | 'contact'
  createdAt: string
}

export interface User {
  id: string
  email: string
  displayName?: string
  avatar?: string
  role?: 'admin' | 'manager' | 'user'
  permissions?: string[]
  department?: string
  lastLogin?: string
  status?: 'active' | 'inactive' | 'pending'
  createdAt?: string
  updatedAt?: string
}

export interface DashboardStats {
  totalRevenue: number
  partnerRevenue: number
  internalRevenue: number
  activePartners: number
  totalPartners: number
  partnerDeals: number
  internalDeals: number
  totalDeals: number
  closedDeals: number
  totalContacts: number
  leads: number
  prospects: number
  customers: number
}