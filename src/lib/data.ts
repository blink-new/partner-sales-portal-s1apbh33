import { blink } from '@/blink/client'
import type { Partner, Deal, Contact, Activity } from '@/types'

// Data management utilities
export class DataManager {
  // Partners
  static async getPartners(): Promise<Partner[]> {
    try {
      const partners = await blink.db.partners.list({
        where: { userId: (await blink.auth.me()).id },
        orderBy: { createdAt: 'desc' }
      })
      return partners.map(this.transformPartner)
    } catch (error) {
      console.error('Error fetching partners:', error)
      return this.getMockPartners()
    }
  }

  static async createPartner(data: Omit<Partner, 'id' | 'userId' | 'createdAt' | 'updatedAt'>): Promise<Partner> {
    try {
      const user = await blink.auth.me()
      const now = new Date().toISOString()
      const partner = await blink.db.partners.create({
        id: `partner_${Date.now()}`,
        userId: user.id,
        ...data,
        createdAt: now,
        updatedAt: now
      })
      return this.transformPartner(partner)
    } catch (error) {
      console.error('Error creating partner:', error)
      throw error
    }
  }

  static async updatePartner(id: string, data: Partial<Partner>): Promise<Partner> {
    try {
      const partner = await blink.db.partners.update(id, {
        ...data,
        updatedAt: new Date().toISOString()
      })
      return this.transformPartner(partner)
    } catch (error) {
      console.error('Error updating partner:', error)
      throw error
    }
  }

  // Deals
  static async getDeals(source?: 'Partner' | 'Internal'): Promise<Deal[]> {
    try {
      const user = await blink.auth.me()
      const where: any = { userId: user.id }
      if (source) where.source = source

      const deals = await blink.db.deals.list({
        where,
        orderBy: { createdAt: 'desc' }
      })
      return deals.map(this.transformDeal)
    } catch (error) {
      console.error('Error fetching deals:', error)
      return this.getMockDeals(source)
    }
  }

  static async createDeal(data: Omit<Deal, 'id' | 'userId' | 'createdAt' | 'updatedAt'>): Promise<Deal> {
    try {
      const user = await blink.auth.me()
      const now = new Date().toISOString()
      const deal = await blink.db.deals.create({
        id: `deal_${Date.now()}`,
        userId: user.id,
        ...data,
        createdAt: now,
        updatedAt: now
      })

      // Create activity
      await this.createActivity({
        type: 'deal_created',
        title: 'New deal created',
        description: `Deal "${data.title}" was created`,
        entityId: deal.id,
        entityType: 'deal'
      })

      return this.transformDeal(deal)
    } catch (error) {
      console.error('Error creating deal:', error)
      throw error
    }
  }

  static async updateDeal(id: string, data: Partial<Deal>): Promise<Deal> {
    try {
      const deal = await blink.db.deals.update(id, {
        ...data,
        updatedAt: new Date().toISOString()
      })

      // Create activity
      await this.createActivity({
        type: 'deal_updated',
        title: 'Deal updated',
        description: `Deal "${deal.title}" was updated`,
        entityId: id,
        entityType: 'deal'
      })

      return this.transformDeal(deal)
    } catch (error) {
      console.error('Error updating deal:', error)
      throw error
    }
  }

  // Contacts
  static async getContacts(): Promise<Contact[]> {
    try {
      const user = await blink.auth.me()
      const contacts = await blink.db.contacts.list({
        where: { userId: user.id },
        orderBy: { createdAt: 'desc' }
      })
      return contacts.map(this.transformContact)
    } catch (error) {
      console.error('Error fetching contacts:', error)
      return this.getMockContacts()
    }
  }

  static async createContact(data: Omit<Contact, 'id' | 'userId' | 'createdAt' | 'updatedAt'>): Promise<Contact> {
    try {
      const user = await blink.auth.me()
      const now = new Date().toISOString()
      const contact = await blink.db.contacts.create({
        id: `contact_${Date.now()}`,
        userId: user.id,
        ...data,
        createdAt: now,
        updatedAt: now
      })

      // Create activity
      await this.createActivity({
        type: 'contact_added',
        title: 'New contact added',
        description: `Contact "${data.name}" was added`,
        entityId: contact.id,
        entityType: 'contact'
      })

      return this.transformContact(contact)
    } catch (error) {
      console.error('Error creating contact:', error)
      throw error
    }
  }

  // Activities
  static async getActivities(limit = 50): Promise<Activity[]> {
    try {
      const user = await blink.auth.me()
      const activities = await blink.db.activities.list({
        where: { userId: user.id },
        orderBy: { createdAt: 'desc' },
        limit
      })
      return activities.map(this.transformActivity)
    } catch (error) {
      console.error('Error fetching activities:', error)
      return this.getMockActivities()
    }
  }

  static async createActivity(data: Omit<Activity, 'id' | 'userId' | 'createdAt'>): Promise<Activity> {
    try {
      const user = await blink.auth.me()
      const activity = await blink.db.activities.create({
        id: `activity_${Date.now()}`,
        userId: user.id,
        ...data,
        createdAt: new Date().toISOString()
      })
      return this.transformActivity(activity)
    } catch (error) {
      console.error('Error creating activity:', error)
      throw error
    }
  }

  // Analytics
  static async getDashboardStats() {
    try {
      const [partners, deals, contacts] = await Promise.all([
        this.getPartners(),
        this.getDeals(),
        this.getContacts()
      ])

      const partnerDeals = deals.filter(d => d.source === 'Partner')
      const internalDeals = deals.filter(d => d.source === 'Internal')
      const closedWonDeals = deals.filter(d => d.status === 'Closed Won')

      const totalRevenue = closedWonDeals.reduce((sum, deal) => sum + deal.value, 0)
      const partnerRevenue = partnerDeals.filter(d => d.status === 'Closed Won').reduce((sum, deal) => sum + deal.value, 0)
      const internalRevenue = internalDeals.filter(d => d.status === 'Closed Won').reduce((sum, deal) => sum + deal.value, 0)

      return {
        totalRevenue,
        partnerRevenue,
        internalRevenue,
        activePartners: partners.filter(p => p.status === 'Active').length,
        totalPartners: partners.length,
        partnerDeals: partnerDeals.length,
        internalDeals: internalDeals.length,
        totalDeals: deals.length,
        closedDeals: closedWonDeals.length,
        totalContacts: contacts.length,
        leads: contacts.filter(c => c.status === 'Lead').length,
        prospects: contacts.filter(c => c.status === 'Prospect').length,
        customers: contacts.filter(c => c.status === 'Customer').length
      }
    } catch (error) {
      console.error('Error getting dashboard stats:', error)
      return this.getMockStats()
    }
  }

  // Transform functions to handle camelCase conversion
  private static transformPartner(partner: any): Partner {
    return {
      id: partner.id,
      name: partner.name,
      email: partner.email,
      company: partner.company,
      tier: partner.tier,
      status: partner.status,
      joinedAt: partner.joinedAt || partner.joined_at,
      totalDeals: partner.totalDeals || partner.total_deals || 0,
      totalRevenue: partner.totalRevenue || partner.total_revenue || 0,
      avatar: partner.avatar,
      phone: partner.phone,
      website: partner.website,
      address: partner.address,
      notes: partner.notes,
      userId: partner.userId || partner.user_id
    }
  }

  private static transformDeal(deal: any): Deal {
    return {
      id: deal.id,
      title: deal.title,
      partnerId: deal.partnerId || deal.partner_id,
      partnerName: deal.partnerName || deal.partner_name,
      clientName: deal.clientName || deal.client_name,
      clientEmail: deal.clientEmail || deal.client_email,
      clientPhone: deal.clientPhone || deal.client_phone,
      clientCompany: deal.clientCompany || deal.client_company,
      value: deal.value,
      status: deal.status,
      stage: deal.stage,
      probability: deal.probability,
      expectedCloseDate: deal.expectedCloseDate || deal.expected_close_date,
      actualCloseDate: deal.actualCloseDate || deal.actual_close_date,
      description: deal.description,
      source: deal.source,
      createdAt: deal.createdAt || deal.created_at,
      updatedAt: deal.updatedAt || deal.updated_at,
      userId: deal.userId || deal.user_id
    }
  }

  private static transformContact(contact: any): Contact {
    return {
      id: contact.id,
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      company: contact.company,
      position: contact.position,
      partnerId: contact.partnerId || contact.partner_id,
      dealId: contact.dealId || contact.deal_id,
      status: contact.status,
      lastContact: contact.lastContact || contact.last_contact,
      notes: contact.notes,
      createdAt: contact.createdAt || contact.created_at,
      updatedAt: contact.updatedAt || contact.updated_at,
      userId: contact.userId || contact.user_id
    }
  }

  private static transformActivity(activity: any): Activity {
    return {
      id: activity.id,
      type: activity.type,
      title: activity.title,
      description: activity.description,
      userId: activity.userId || activity.user_id,
      entityId: activity.entityId || activity.entity_id,
      entityType: activity.entityType || activity.entity_type,
      createdAt: activity.createdAt || activity.created_at
    }
  }

  // Mock data for fallback
  private static getMockPartners(): Partner[] {
    return [
      {
        id: 'partner_1',
        name: 'Local Tech Partners',
        email: 'contact@localtechpartners.com',
        company: 'Local Tech Partners LLC',
        tier: 'Gold',
        status: 'Active',
        joinedAt: '2024-01-15T00:00:00Z',
        totalDeals: 5,
        totalRevenue: 45000,
        phone: '+1 (555) 123-4567',
        website: 'https://localtechpartners.com',
        userId: 'user_1'
      },
      {
        id: 'partner_2',
        name: 'Design Studio Co',
        email: 'hello@designstudio.co',
        company: 'Design Studio Co',
        tier: 'Silver',
        status: 'Active',
        joinedAt: '2024-02-01T00:00:00Z',
        totalDeals: 3,
        totalRevenue: 28000,
        phone: '+1 (555) 234-5678',
        website: 'https://designstudio.co',
        userId: 'user_1'
      }
    ]
  }

  private static getMockDeals(source?: string): Deal[] {
    const allDeals = [
      {
        id: 'deal_1',
        title: 'Small Business CRM Setup',
        partnerId: 'partner_1',
        partnerName: 'Local Tech Partners',
        clientName: 'Acme Corp',
        clientEmail: 'john@acmecorp.com',
        clientPhone: '+1 (555) 345-6789',
        clientCompany: 'Acme Corp',
        value: 8500,
        status: 'Approved' as const,
        stage: 'Closing' as const,
        probability: 90,
        expectedCloseDate: '2024-02-15T00:00:00Z',
        description: 'CRM implementation for small business',
        source: 'Partner' as const,
        createdAt: '2024-01-20T00:00:00Z',
        updatedAt: '2024-01-25T00:00:00Z',
        userId: 'user_1'
      },
      {
        id: 'deal_2',
        title: 'Website Redesign Project',
        partnerId: 'partner_2',
        partnerName: 'Design Studio Co',
        clientName: 'Tech Startup Inc',
        clientEmail: 'sarah@techstartup.com',
        clientPhone: '+1 (555) 456-7890',
        clientCompany: 'Tech Startup Inc',
        value: 12000,
        status: 'Submitted' as const,
        stage: 'Proposal' as const,
        probability: 70,
        expectedCloseDate: '2024-03-01T00:00:00Z',
        description: 'Complete website redesign and development',
        source: 'Partner' as const,
        createdAt: '2024-01-22T00:00:00Z',
        updatedAt: '2024-01-28T00:00:00Z',
        userId: 'user_1'
      },
      {
        id: 'deal_3',
        title: 'Enterprise Software License',
        partnerId: null,
        partnerName: null,
        clientName: 'Global Corp',
        clientEmail: 'procurement@globalcorp.com',
        clientPhone: '+1 (555) 567-8901',
        clientCompany: 'Global Corp',
        value: 25000,
        status: 'Approved' as const,
        stage: 'Negotiation' as const,
        probability: 85,
        expectedCloseDate: '2024-02-28T00:00:00Z',
        description: 'Annual software license renewal',
        source: 'Internal' as const,
        createdAt: '2024-01-18T00:00:00Z',
        updatedAt: '2024-01-30T00:00:00Z',
        userId: 'user_1'
      }
    ]

    if (source) {
      return allDeals.filter(deal => deal.source === source)
    }
    return allDeals
  }

  private static getMockContacts(): Contact[] {
    return [
      {
        id: 'contact_1',
        name: 'John Smith',
        email: 'john@acmecorp.com',
        phone: '+1 (555) 345-6789',
        company: 'Acme Corp',
        position: 'IT Director',
        partnerId: 'partner_1',
        dealId: 'deal_1',
        status: 'Prospect',
        lastContact: '2024-01-25T00:00:00Z',
        notes: 'Interested in CRM solution',
        createdAt: '2024-01-20T00:00:00Z',
        updatedAt: '2024-01-25T00:00:00Z',
        userId: 'user_1'
      },
      {
        id: 'contact_2',
        name: 'Sarah Johnson',
        email: 'sarah@techstartup.com',
        phone: '+1 (555) 456-7890',
        company: 'Tech Startup Inc',
        position: 'CEO',
        partnerId: 'partner_2',
        dealId: 'deal_2',
        status: 'Lead',
        lastContact: '2024-01-28T00:00:00Z',
        notes: 'Looking for website redesign',
        createdAt: '2024-01-22T00:00:00Z',
        updatedAt: '2024-01-28T00:00:00Z',
        userId: 'user_1'
      }
    ]
  }

  private static getMockActivities(): Activity[] {
    return [
      {
        id: 'activity_1',
        type: 'deal_created',
        title: 'New deal registered',
        description: 'Small Business CRM Setup by Local Tech Partners',
        userId: 'user_1',
        entityId: 'deal_1',
        entityType: 'deal',
        createdAt: '2024-01-20T00:00:00Z'
      },
      {
        id: 'activity_2',
        type: 'partner_joined',
        title: 'New partner joined',
        description: 'Design Studio Co joined the partner program',
        userId: 'user_1',
        entityId: 'partner_2',
        entityType: 'partner',
        createdAt: '2024-02-01T00:00:00Z'
      },
      {
        id: 'activity_3',
        type: 'deal_updated',
        title: 'Deal updated',
        description: 'Website Redesign Project status changed to Submitted',
        userId: 'user_1',
        entityId: 'deal_2',
        entityType: 'deal',
        createdAt: '2024-01-28T00:00:00Z'
      }
    ]
  }

  private static getMockStats() {
    return {
      totalRevenue: 45000,
      partnerRevenue: 20500,
      internalRevenue: 24500,
      activePartners: 8,
      totalPartners: 10,
      partnerDeals: 12,
      internalDeals: 8,
      totalDeals: 20,
      closedDeals: 3,
      totalContacts: 45,
      leads: 15,
      prospects: 20,
      customers: 10
    }
  }
}