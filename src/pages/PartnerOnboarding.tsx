import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Progress } from '@/components/ui/progress'
import { 
  CheckCircle, 
  Circle, 
  ArrowRight, 
  ArrowLeft,
  Building2,
  User,
  FileText,
  Settings,
  Handshake,
  Upload,
  Globe,
  Phone,
  Mail,
  MapPin
} from 'lucide-react'

const steps = [
  {
    id: 1,
    title: 'Company Information',
    description: 'Basic company details and contact information',
    icon: Building2
  },
  {
    id: 2,
    title: 'Contact Details',
    description: 'Primary contact person and communication preferences',
    icon: User
  },
  {
    id: 3,
    title: 'Business Profile',
    description: 'Business focus, specializations, and target markets',
    icon: FileText
  },
  {
    id: 4,
    title: 'Partnership Terms',
    description: 'Partnership tier, commission structure, and agreements',
    icon: Handshake
  },
  {
    id: 5,
    title: 'Setup & Verification',
    description: 'Account setup and document verification',
    icon: Settings
  }
]

export function PartnerOnboarding() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Company Information
    companyName: '',
    companyWebsite: '',
    companySize: '',
    industry: '',
    yearEstablished: '',
    businessType: '',
    
    // Contact Details
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    contactTitle: '',
    address: '',
    city: '',
    state: '',
    country: '',
    
    // Business Profile
    specializations: [],
    targetMarkets: [],
    annualRevenue: '',
    salesTeamSize: '',
    existingPartners: '',
    
    // Partnership Terms
    preferredTier: '',
    commissionExpectation: '',
    agreementsSigned: false,
    
    // Setup
    portalAccess: false,
    trainingCompleted: false,
    documentsUploaded: false
  })

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const progress = (currentStep / steps.length) * 100

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name *</Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => updateFormData('companyName', e.target.value)}
                  placeholder="Enter company name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="companyWebsite">Company Website</Label>
                <Input
                  id="companyWebsite"
                  value={formData.companyWebsite}
                  onChange={(e) => updateFormData('companyWebsite', e.target.value)}
                  placeholder="https://company.com"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="industry">Industry *</Label>
                <Select onValueChange={(value) => updateFormData('industry', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="companySize">Company Size</Label>
                <Select onValueChange={(value) => updateFormData('companySize', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select company size" />
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

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="yearEstablished">Year Established</Label>
                <Input
                  id="yearEstablished"
                  type="number"
                  value={formData.yearEstablished}
                  onChange={(e) => updateFormData('yearEstablished', e.target.value)}
                  placeholder="2020"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessType">Business Type</Label>
                <Select onValueChange={(value) => updateFormData('businessType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select business type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="reseller">Reseller</SelectItem>
                    <SelectItem value="integrator">System Integrator</SelectItem>
                    <SelectItem value="consultant">Consultant</SelectItem>
                    <SelectItem value="distributor">Distributor</SelectItem>
                    <SelectItem value="referral">Referral Partner</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contactName">Contact Name *</Label>
                <Input
                  id="contactName"
                  value={formData.contactName}
                  onChange={(e) => updateFormData('contactName', e.target.value)}
                  placeholder="John Smith"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactTitle">Job Title</Label>
                <Input
                  id="contactTitle"
                  value={formData.contactTitle}
                  onChange={(e) => updateFormData('contactTitle', e.target.value)}
                  placeholder="VP of Sales"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contactEmail">Email Address *</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => updateFormData('contactEmail', e.target.value)}
                  placeholder="john@company.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactPhone">Phone Number</Label>
                <Input
                  id="contactPhone"
                  value={formData.contactPhone}
                  onChange={(e) => updateFormData('contactPhone', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Business Address</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => updateFormData('address', e.target.value)}
                placeholder="123 Business St"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => updateFormData('city', e.target.value)}
                  placeholder="San Francisco"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State/Province</Label>
                <Input
                  id="state"
                  value={formData.state}
                  onChange={(e) => updateFormData('state', e.target.value)}
                  placeholder="CA"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select onValueChange={(value) => updateFormData('country', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="au">Australia</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Specializations *</Label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  'Enterprise Software',
                  'Cloud Solutions',
                  'Cybersecurity',
                  'Data Analytics',
                  'Digital Marketing',
                  'E-commerce',
                  'Mobile Development',
                  'AI/Machine Learning'
                ].map((spec) => (
                  <div key={spec} className="flex items-center space-x-2">
                    <Checkbox
                      id={spec}
                      checked={formData.specializations.includes(spec)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          updateFormData('specializations', [...formData.specializations, spec])
                        } else {
                          updateFormData('specializations', formData.specializations.filter(s => s !== spec))
                        }
                      }}
                    />
                    <Label htmlFor={spec} className="text-sm">{spec}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Target Markets</Label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  'Small Business',
                  'Mid-Market',
                  'Enterprise',
                  'Government',
                  'Healthcare',
                  'Education',
                  'Non-Profit',
                  'Startups'
                ].map((market) => (
                  <div key={market} className="flex items-center space-x-2">
                    <Checkbox
                      id={market}
                      checked={formData.targetMarkets.includes(market)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          updateFormData('targetMarkets', [...formData.targetMarkets, market])
                        } else {
                          updateFormData('targetMarkets', formData.targetMarkets.filter(m => m !== market))
                        }
                      }}
                    />
                    <Label htmlFor={market} className="text-sm">{market}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="annualRevenue">Annual Revenue</Label>
                <Select onValueChange={(value) => updateFormData('annualRevenue', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select revenue range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under-1m">Under $1M</SelectItem>
                    <SelectItem value="1m-5m">$1M - $5M</SelectItem>
                    <SelectItem value="5m-10m">$5M - $10M</SelectItem>
                    <SelectItem value="10m-50m">$10M - $50M</SelectItem>
                    <SelectItem value="over-50m">Over $50M</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="salesTeamSize">Sales Team Size</Label>
                <Select onValueChange={(value) => updateFormData('salesTeamSize', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select team size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-5">1-5 people</SelectItem>
                    <SelectItem value="6-10">6-10 people</SelectItem>
                    <SelectItem value="11-25">11-25 people</SelectItem>
                    <SelectItem value="26-50">26-50 people</SelectItem>
                    <SelectItem value="50+">50+ people</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="existingPartners">Existing Partnerships</Label>
              <Textarea
                id="existingPartners"
                value={formData.existingPartners}
                onChange={(e) => updateFormData('existingPartners', e.target.value)}
                placeholder="List any existing technology partnerships or vendor relationships..."
                rows={3}
              />
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Partnership Tier Selection</h3>
              <div className="grid gap-4">
                {[
                  {
                    tier: 'Bronze',
                    commission: '10%',
                    benefits: ['Basic training', 'Marketing materials', 'Standard support'],
                    color: 'border-orange-200 bg-orange-50'
                  },
                  {
                    tier: 'Silver',
                    commission: '15%',
                    benefits: ['Advanced training', 'Co-marketing opportunities', 'Priority support'],
                    color: 'border-gray-200 bg-gray-50'
                  },
                  {
                    tier: 'Gold',
                    commission: '20%',
                    benefits: ['Expert training', 'Joint sales calls', 'Dedicated support'],
                    color: 'border-yellow-200 bg-yellow-50'
                  },
                  {
                    tier: 'Platinum',
                    commission: '25%',
                    benefits: ['Executive training', 'Strategic planning', 'White-glove support'],
                    color: 'border-purple-200 bg-purple-50'
                  }
                ].map((option) => (
                  <div
                    key={option.tier}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      formData.preferredTier === option.tier
                        ? 'border-primary bg-primary/5'
                        : option.color
                    }`}
                    onClick={() => updateFormData('preferredTier', option.tier)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">{option.tier} Partner</h4>
                        <p className="text-sm text-muted-foreground">
                          {option.commission} commission rate
                        </p>
                        <ul className="text-xs text-muted-foreground mt-2">
                          {option.benefits.map((benefit, index) => (
                            <li key={index}>• {benefit}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex-shrink-0">
                        {formData.preferredTier === option.tier ? (
                          <CheckCircle className="h-6 w-6 text-primary" />
                        ) : (
                          <Circle className="h-6 w-6 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="commissionExpectation">Commission Expectations</Label>
              <Textarea
                id="commissionExpectation"
                value={formData.commissionExpectation}
                onChange={(e) => updateFormData('commissionExpectation', e.target.value)}
                placeholder="Any specific commission structure requests or expectations..."
                rows={3}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="agreements"
                checked={formData.agreementsSigned}
                onCheckedChange={(checked) => updateFormData('agreementsSigned', checked)}
              />
              <Label htmlFor="agreements" className="text-sm">
                I agree to the Partner Terms and Conditions and Privacy Policy
              </Label>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto" />
              <h3 className="text-2xl font-bold">Almost Done!</h3>
              <p className="text-muted-foreground">
                Complete these final steps to activate your partner account
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                    formData.portalAccess ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    {formData.portalAccess ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <Circle className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium">Portal Access Setup</h4>
                    <p className="text-sm text-muted-foreground">
                      Configure your partner portal access
                    </p>
                  </div>
                </div>
                <Button
                  variant={formData.portalAccess ? "outline" : "default"}
                  size="sm"
                  onClick={() => updateFormData('portalAccess', !formData.portalAccess)}
                >
                  {formData.portalAccess ? 'Completed' : 'Setup'}
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                    formData.trainingCompleted ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    {formData.trainingCompleted ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <Circle className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium">Complete Training</h4>
                    <p className="text-sm text-muted-foreground">
                      Watch required partner training videos
                    </p>
                  </div>
                </div>
                <Button
                  variant={formData.trainingCompleted ? "outline" : "default"}
                  size="sm"
                  onClick={() => updateFormData('trainingCompleted', !formData.trainingCompleted)}
                >
                  {formData.trainingCompleted ? 'Completed' : 'Start Training'}
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                    formData.documentsUploaded ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    {formData.documentsUploaded ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <Circle className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium">Upload Documents</h4>
                    <p className="text-sm text-muted-foreground">
                      Upload business license and tax documents
                    </p>
                  </div>
                </div>
                <Button
                  variant={formData.documentsUploaded ? "outline" : "default"}
                  size="sm"
                  onClick={() => updateFormData('documentsUploaded', !formData.documentsUploaded)}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  {formData.documentsUploaded ? 'Uploaded' : 'Upload'}
                </Button>
              </div>
            </div>

            {formData.portalAccess && formData.trainingCompleted && formData.documentsUploaded && (
              <div className="text-center p-6 bg-green-50 rounded-lg border border-green-200">
                <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-green-800">Ready to Submit!</h4>
                <p className="text-green-700">
                  All requirements completed. Your application will be reviewed within 2-3 business days.
                </p>
              </div>
            )}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Partner Onboarding</h1>
        <p className="text-muted-foreground">
          Welcome! Let's get you set up as a partner in just a few steps.
        </p>
      </div>

      {/* Progress Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Step {currentStep} of {steps.length}</span>
              <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Steps Navigation */}
      <div className="grid grid-cols-5 gap-2">
        {steps.map((step) => {
          const StepIcon = step.icon
          const isActive = step.id === currentStep
          const isCompleted = step.id < currentStep
          
          return (
            <div
              key={step.id}
              className={`p-3 rounded-lg border text-center cursor-pointer transition-all ${
                isActive
                  ? 'border-primary bg-primary/5'
                  : isCompleted
                  ? 'border-green-200 bg-green-50'
                  : 'border-gray-200 bg-gray-50'
              }`}
              onClick={() => setCurrentStep(step.id)}
            >
              <div className="flex flex-col items-center space-y-2">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                  isActive
                    ? 'bg-primary text-white'
                    : isCompleted
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {isCompleted ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <StepIcon className="h-5 w-5" />
                  )}
                </div>
                <div>
                  <p className="text-xs font-medium">{step.title}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Step Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            {(() => {
              const StepIcon = steps[currentStep - 1].icon
              return <StepIcon className="h-5 w-5" />
            })()}
            <span>{steps[currentStep - 1].title}</span>
          </CardTitle>
          <CardDescription>
            {steps[currentStep - 1].description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {renderStepContent()}
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 1}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        
        {currentStep === steps.length ? (
          <Button
            className="bg-green-600 hover:bg-green-700"
            disabled={!formData.portalAccess || !formData.trainingCompleted || !formData.documentsUploaded}
          >
            Submit Application
            <CheckCircle className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={nextStep}>
            Next
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}