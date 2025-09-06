import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Upload, 
  Star, 
  Trophy, 
  Briefcase,
  Scale,
  Clock,
  DollarSign,
  Calendar,
  Globe,
  Award,
  Users,
  Zap,
  Target,
  BookOpen,
  Camera,
  Shield,
  BadgeCheck,
  FileUp,
  Gavel,
  Info,
  Eye,
  EyeOff,
  Save,
  AlertCircle,
  CheckCircle2,
  X,
  Plus,
  Trash2,
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  Building,
  GraduationCap,
  FileText,
  Lock
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardContent } from '../../components/ui/Card';
import { cn } from '../../utils/cn';

// CSS Variables for theming
const cssVariables = `
:root {
  --brand-600: #2563eb;
  --accent-500: #10b981;
  --warn-500: #f59e0b;
  --error-600: #dc2626;
  --ink-900: #111827;
  --ink-600: #4b5563;
  --surface-50: #f9fafb;
  --surface-100: #f3f4f6;
  --surface-200: #e5e7eb;
  --radius: 12px;
}
`;

interface OnboardingData {
  // Step 0: Purpose & Consent
  consentTerms: boolean;
  consentMarketing: boolean;
  consentReviews: boolean;
  
  // Step 1: Essential Profile
  fullName: string;
  professionalTitle: string;
  pronouns: string;
  profilePhoto?: File;
  shortHeadline: string;
  firmName: string;
  firmWebsite: string;
  officeLocations: string[];
  serviceRadius: string;
  languages: string[];
  contactPreference: string[];
  
  // Step 2: Identity & Compliance
  idNumber: string;
  mobileNumber: string;
  cipcNumber: string;
  vatRegistered: boolean;
  vatNumber: string;
  bbbeeLevel: string;
  proofOfIdentity?: File;
  proofOfAddress?: File;
  policeClearance?: File;
  
  // Step 3: Right to Practise
  lpcNumber: string;
  barStatus: string;
  certificateGoodStanding?: File;
  fidelityFundCert?: File;
  admissionDate: string;
  provincesAdmitted: string[];
  rightOfAppearance: string[];
  isNotary: boolean;
  notaryYear: string;
  notaryCertificate?: File;
  isConveyancer: boolean;
  conveyancerYear: string;
  conveyancerCertificate?: File;
  trustAccountBank: string;
  trustAccountType: string;
  trustVerificationLetter?: File;
  piInsurer: string;
  piPolicyNumber: string;
  piCoverAmount: string;
  piExpiryDate: string;
  piCertificate?: File;
  disciplinaryHistory: string;
  disciplinaryDetails: string;
  
  // Step 4: Education & Training
  highestDegree: string;
  university: string;
  graduationYear: string;
  additionalQualifications: string[];
  recentCpdTopics: string[];
  
  // Step 5: Practice Areas & Sectors
  primaryPracticeAreas: Array<{
    area: string;
    expertiseLevel: string;
    yearsExperience: string;
    summary: string;
    typicalMatters: string[];
  }>;
  secondaryAreas: string[];
  industriesServed: string[];
  mattersNotTaken: string;
  regulatoryStrengths: string[];
  
  // Step 6: Experience & Bio
  totalYearsExperience: string;
  rolesAndTeams: string;
  notableMatters: string[];
  achievements: string[];
  professionalBio: string;
  
  // Step 7: Client Fit & Scope
  clientTypes: string[];
  matterValueBands: string[];
  minimumBriefValue: string;
  urgencyAccepted: string[];
  meetingModes: string[];
  travelAvailable: boolean;
  maxTravelKm: string;
  travelBillable: boolean;
  travelRate: string;
  
  // Step 8: Fees & Packages
  billingModels: string[];
  hourlyRate: string;
  showHourlyRate: boolean;
  consultationDuration: string;
  consultationFee: string;
  freeFirstConsult: boolean;
  consultationCovers: string;
  fixedFeePackages: Array<{
    name: string;
    included: string;
    excluded: string;
    turnaround: string;
    price: string;
    preconditions: string;
  }>;
  retainerScope: string;
  retainerMonthlyHours: string;
  retainerFee: string;
  retainerOverageRate: string;
  depositRequired: boolean;
  depositPercentage: string;
  refundPolicy: string;
  paymentMethods: string[];
  displayPricesIncVat: boolean;
  cancellationPolicy: string;
  
  // Step 9: Availability & Service Levels
  currentStatus: string;
  workingHours: Record<string, { available: boolean; start: string; end: string; lunch?: string; }>;
  responseTime: string;
  preferredContactWindow: string;
  handoverCover: string;
  handoverContact: string;
  
  // Step 10: Ethics & Conflicts
  conflictCheckProcess: boolean;
  conflictCheckDescription: string;
  runConflictChecks: boolean;
  highRiskAreas: string;
  dataHandlingAcknowledged: boolean;
  secureChannels: string[];
  thirdPartyTools: string[];
  
  // Step 11: Documents
  documents: Record<string, File>;
  
  // Step 12: References & Reviews
  professionalReferences: Array<{
    name: string;
    role: string;
    email: string;
    phone: string;
  }>;
  existingTestimonials: Array<{
    text: string;
    publishPermission: boolean;
  }>;
  
  // Step 13: Pro Bono & Community
  proBonoInterest: boolean;
  proBonoCapacity: string;
  causesOrClinics: string;
  
  // Step 14: Public Profile Controls
  showHourlyRatePublic: boolean;
  showFixedFeePackages: boolean;
  showQuickBookButton: boolean;
  showLanguagesLocations: boolean;
  
  // Step 15: Final Declarations
  confirmTrueInfo: boolean;
  notifyChanges: boolean;
  signatureName: string;
  signaturePlace: string;
  signatureDate: string;
  eSignature: string;
}

const steps = [
  { id: 0, title: 'Purpose & Consent', icon: Shield, description: 'Privacy and consent' },
  { id: 1, title: 'Essential Profile', icon: Users, description: 'Public profile information' },
  { id: 2, title: 'Identity & Compliance', icon: BadgeCheck, description: 'Verification documents' },
  { id: 3, title: 'Right to Practise', icon: Scale, description: 'Legal credentials' },
  { id: 4, title: 'Education & Training', icon: GraduationCap, description: 'Academic background' },
  { id: 5, title: 'Practice Areas', icon: Gavel, description: 'Legal specializations' },
  { id: 6, title: 'Experience & Bio', icon: Award, description: 'Professional history' },
  { id: 7, title: 'Client Fit & Scope', icon: Target, description: 'Service parameters' },
  { id: 8, title: 'Fees & Packages', icon: DollarSign, description: 'Pricing structure' },
  { id: 9, title: 'Availability', icon: Clock, description: 'Working hours' },
  { id: 10, title: 'Ethics & Conflicts', icon: Shield, description: 'Professional standards' },
  { id: 11, title: 'Documents', icon: FileUp, description: 'Upload certificates' },
  { id: 12, title: 'References', icon: Users, description: 'Professional references' },
  { id: 13, title: 'Pro Bono', icon: Trophy, description: 'Community service' },
  { id: 14, title: 'Profile Controls', icon: Eye, description: 'Visibility settings' },
  { id: 15, title: 'Review & Sign', icon: CheckCircle2, description: 'Final confirmation' }
];

const professionalTitles = [
  'Attorney',
  'Advocate (Referral)',
  'Advocate (Trust-Account)',
  'Notary',
  'Conveyancer',
  'Dual'
];

const cities = [
  'Cape Town', 'Johannesburg', 'Durban', 'Pretoria', 'Port Elizabeth',
  'Bloemfontein', 'East London', 'Pietermaritzburg', 'Kimberley', 'Polokwane',
  'Nelspruit', 'Rustenburg', 'George', 'Upington', 'Remote only'
];

const languages = [
  'English', 'Afrikaans', 'Zulu', 'Xhosa', 'Sotho', 'Tswana',
  'Venda', 'Tsonga', 'Swati', 'Ndebele', 'Other'
];

const contactPreferences = [
  'Phone', 'Email', 'WhatsApp', 'Portal messages'
];

const provinces = [
  'Gauteng', 'Western Cape', 'KwaZulu-Natal', 'Eastern Cape',
  'Free State', 'Limpopo', 'Mpumalanga', 'North West', 'Northern Cape',
  'All provinces'
];

const practiceAreas = [
  'Family', 'Criminal', 'Corporate', 'Property', 'Labour', 'Immigration',
  'Personal Injury', 'Intellectual Property', 'Tax', 'Constitutional',
  'Commercial', 'Estate Planning', 'Administrative', 'Environmental',
  'Tech/Privacy', 'Competition', 'Banking/Finance'
];

const universities = [
  'UCT', 'Wits', 'UP', 'SU', 'UKZN', 'UJ', 'UFS', 'Rhodes',
  'UWC', 'NMU', 'UNISA', 'NWU', 'Fort Hare', 'Limpopo', 'Venda', 'WSU', 'Other'
];

const degrees = [
  'LLB', 'BCom Law', 'BA Law', 'LLM', 'LLD', 'Other'
];

const weekDays = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
];

export default function LawyerOnboarding() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showIdNumber, setShowIdNumber] = useState(false);
  
  const [data, setData] = useState<OnboardingData>({
    // Initialize with default values
    consentTerms: false,
    consentMarketing: false,
    consentReviews: false,
    fullName: '',
    professionalTitle: '',
    pronouns: '',
    shortHeadline: '',
    firmName: '',
    firmWebsite: '',
    officeLocations: [],
    serviceRadius: '',
    languages: [],
    contactPreference: [],
    idNumber: '',
    mobileNumber: '',
    cipcNumber: '',
    vatRegistered: false,
    vatNumber: '',
    bbbeeLevel: '',
    lpcNumber: '',
    barStatus: '',
    admissionDate: '',
    provincesAdmitted: [],
    rightOfAppearance: [],
    isNotary: false,
    notaryYear: '',
    isConveyancer: false,
    conveyancerYear: '',
    trustAccountBank: '',
    trustAccountType: '',
    piInsurer: '',
    piPolicyNumber: '',
    piCoverAmount: '',
    piExpiryDate: '',
    disciplinaryHistory: 'None',
    disciplinaryDetails: '',
    highestDegree: '',
    university: '',
    graduationYear: '',
    additionalQualifications: [],
    recentCpdTopics: [],
    primaryPracticeAreas: [],
    secondaryAreas: [],
    industriesServed: [],
    mattersNotTaken: '',
    regulatoryStrengths: [],
    totalYearsExperience: '',
    rolesAndTeams: '',
    notableMatters: [],
    achievements: [],
    professionalBio: '',
    clientTypes: [],
    matterValueBands: [],
    minimumBriefValue: '',
    urgencyAccepted: [],
    meetingModes: [],
    travelAvailable: false,
    maxTravelKm: '',
    travelBillable: false,
    travelRate: '',
    billingModels: [],
    hourlyRate: '',
    showHourlyRate: false,
    consultationDuration: '',
    consultationFee: '',
    freeFirstConsult: false,
    consultationCovers: '',
    fixedFeePackages: [],
    retainerScope: '',
    retainerMonthlyHours: '',
    retainerFee: '',
    retainerOverageRate: '',
    depositRequired: false,
    depositPercentage: '',
    refundPolicy: '',
    paymentMethods: [],
    displayPricesIncVat: true,
    cancellationPolicy: '',
    currentStatus: '',
    workingHours: weekDays.reduce((acc, day) => ({
      ...acc,
      [day]: { available: false, start: '09:00', end: '17:00' }
    }), {}),
    responseTime: '',
    preferredContactWindow: '',
    handoverCover: '',
    handoverContact: '',
    conflictCheckProcess: false,
    conflictCheckDescription: '',
    runConflictChecks: false,
    highRiskAreas: '',
    dataHandlingAcknowledged: false,
    secureChannels: [],
    thirdPartyTools: [],
    documents: {},
    professionalReferences: [],
    existingTestimonials: [],
    proBonoInterest: false,
    proBonoCapacity: '',
    causesOrClinics: '',
    showHourlyRatePublic: false,
    showFixedFeePackages: true,
    showQuickBookButton: true,
    showLanguagesLocations: true,
    confirmTrueInfo: false,
    notifyChanges: false,
    signatureName: '',
    signaturePlace: '',
    signatureDate: '',
    eSignature: ''
  });

  const totalSteps = steps.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  // Auto-save functionality
  const autoSave = async () => {
    setIsAutoSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    setLastSaved(new Date());
    setIsAutoSaving(false);
    
    // Show toast
    showToast('Progress saved', 'success');
  };

  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    // Simple toast implementation
    const toast = document.createElement('div');
    toast.className = `fixed top-4 right-4 px-4 py-2 rounded-lg text-white z-50 transition-all duration-300 ${
      type === 'success' ? 'bg-green-500' : 
      type === 'error' ? 'bg-red-500' : 'bg-blue-500'
    }`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => document.body.removeChild(toast), 300);
    }, 1500);
  };

  const updateData = (field: string, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
    // Trigger auto-save after a delay
    setTimeout(autoSave, 1000);
  };

  const addToArray = (field: string, value: string) => {
    setData(prev => ({
      ...prev,
      [field]: [...(prev[field as keyof OnboardingData] as string[]), value]
    }));
  };

  const removeFromArray = (field: string, value: string) => {
    setData(prev => ({
      ...prev,
      [field]: (prev[field as keyof OnboardingData] as string[]).filter(item => item !== value)
    }));
  };

  const validateStep = (stepIndex: number): boolean => {
    const newErrors: Record<string, string> = {};
    
    switch (stepIndex) {
      case 0:
        if (!data.consentTerms) newErrors.consentTerms = 'You must agree to the terms to continue';
        break;
      case 1:
        if (!data.fullName) newErrors.fullName = 'Full name is required';
        if (!data.professionalTitle) newErrors.professionalTitle = 'Professional title is required';
        if (!data.shortHeadline) newErrors.shortHeadline = 'Short headline is required';
        if (data.languages.length === 0) newErrors.languages = 'At least one language is required';
        if (data.contactPreference.length === 0) newErrors.contactPreference = 'At least one contact preference is required';
        break;
      case 2:
        if (!data.idNumber) newErrors.idNumber = 'ID number is required';
        if (!data.mobileNumber) newErrors.mobileNumber = 'Mobile number is required';
        break;
      case 3:
        if (!data.lpcNumber) newErrors.lpcNumber = 'LPC number is required';
        if (!data.barStatus) newErrors.barStatus = 'Bar status is required';
        if (!data.admissionDate) newErrors.admissionDate = 'Admission date is required';
        if (data.provincesAdmitted.length === 0) newErrors.provincesAdmitted = 'At least one province is required';
        break;
      // Add more validation as needed
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps - 1) {
        setCompletedSteps([...completedSteps, currentStep]);
        setCurrentStep(currentStep + 1);
        autoSave();
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (stepIndex: number) => {
    if (stepIndex <= Math.max(...completedSteps, currentStep)) {
      setCurrentStep(stepIndex);
    }
  };

  // Inject CSS variables
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = cssVariables;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const renderStepIndicator = () => (
    <div className="mb-8">
      {/* Desktop stepper */}
      <div className="hidden lg:block">
        <div className="flex items-center justify-between mb-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === currentStep;
            const isCompleted = completedSteps.includes(index);
            const isClickable = index <= Math.max(...completedSteps, currentStep);
            
            return (
              <div key={step.id} className="flex items-center">
                <button
                  onClick={() => isClickable && goToStep(index)}
                  disabled={!isClickable}
                  className={cn(
                    'flex flex-col items-center space-y-2 p-3 rounded-lg transition-all duration-200',
                    isActive && 'bg-blue-50 scale-105',
                    isClickable && 'hover:bg-gray-50 cursor-pointer',
                    !isClickable && 'opacity-50 cursor-not-allowed'
                  )}
                >
                  <div
                    className={cn(
                      'w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 shadow-sm',
                      isActive
                        ? 'bg-blue-600 text-white scale-110 shadow-lg'
                        : isCompleted
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-600'
                    )}
                  >
                    {isCompleted ? <Check className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                  </div>
                  <div className="text-center">
                    <div className={cn(
                      'text-xs font-medium',
                      isActive ? 'text-blue-600' : 'text-gray-600'
                    )}>
                      {step.title}
                    </div>
                    <div className="text-xs text-gray-500">{step.description}</div>
                  </div>
                </button>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      'h-1 w-8 mx-2 transition-all duration-300',
                      isCompleted ? 'bg-green-500' : 'bg-gray-200'
                    )}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile stepper */}
      <div className="lg:hidden mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-medium text-gray-600">
            Step {currentStep + 1} of {totalSteps}
          </div>
          <div className="text-sm text-gray-500">
            {Math.round(progress)}% Complete
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-4 text-center">
          <h2 className="text-lg font-semibold text-gray-900">{steps[currentStep].title}</h2>
          <p className="text-sm text-gray-600">{steps[currentStep].description}</p>
        </div>
      </div>

      {/* Security notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-center space-x-2">
          <Lock className="h-5 w-5 text-blue-600" />
          <span className="text-sm font-medium text-blue-900">
            POPIA-aligned. Encrypted at rest and in transit.
          </span>
        </div>
      </div>
    </div>
  );

  const renderStep0 = () => (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Shield className="h-8 w-8 text-blue-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Purpose & Consent</h2>
        <p className="text-gray-600">We verify your identity and right to practise</p>
      </div>

      <Card className="p-6 bg-blue-50 border-blue-200">
        <div className="space-y-4">
          <h3 className="font-semibold text-blue-900">Important Notice</h3>
          <p className="text-sm text-blue-800">
            We verify your identity and right to practise. Certain fields are for internal checks only 
            and are not shown to clients. Your data is protected under POPIA and encrypted at rest and in transit.
          </p>
        </div>
      </Card>

      <div className="space-y-6">
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="consentTerms"
            checked={data.consentTerms}
            onChange={(e) => updateData('consentTerms', e.target.checked)}
            className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="consentTerms" className="text-sm text-gray-700">
            <span className="font-medium text-red-600">*</span> I agree to the{' '}
            <a href="#" className="text-blue-600 hover:underline">Marketplace Terms</a> and{' '}
            <a href="#" className="text-blue-600 hover:underline">Privacy Policy (POPIA)</a>
          </label>
        </div>
        {errors.consentTerms && (
          <p className="text-red-600 text-sm">{errors.consentTerms}</p>
        )}

        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="consentMarketing"
            checked={data.consentMarketing}
            onChange={(e) => updateData('consentMarketing', e.target.checked)}
            className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="consentMarketing" className="text-sm text-gray-700">
            Allow my public profile to be shown to clients
          </label>
        </div>

        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="consentReviews"
            checked={data.consentReviews}
            onChange={(e) => updateData('consentReviews', e.target.checked)}
            className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="consentReviews" className="text-sm text-gray-700">
            Allow verified client reviews on my profile
          </label>
        </div>
      </div>
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-8 animate-slide-in">
      <div className="text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Users className="h-8 w-8 text-blue-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Essential Profile</h2>
        <p className="text-gray-600">Information that will be shown to clients</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Full Name"
              value={data.fullName}
              onChange={(e) => updateData('fullName', e.target.value)}
              placeholder="John Doe"
              required
              error={errors.fullName}
            />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Professional Title <span className="text-red-600">*</span>
              </label>
              <select
                value={data.professionalTitle}
                onChange={(e) => updateData('professionalTitle', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select title</option>
                {professionalTitles.map((title) => (
                  <option key={title} value={title}>{title}</option>
                ))}
              </select>
              {errors.professionalTitle && (
                <p className="text-red-600 text-sm mt-1">{errors.professionalTitle}</p>
              )}
            </div>
            
            <Input
              label="Pronouns"
              value={data.pronouns}
              onChange={(e) => updateData('pronouns', e.target.value)}
              placeholder="they/them, she/her, he/him"
            />
            
            <Input
              label="Short Headline"
              value={data.shortHeadline}
              onChange={(e) => updateData('shortHeadline', e.target.value)}
              placeholder="Labour attorney for SMEs"
              required
              error={errors.shortHeadline}
            />
            
            <Input
              label="Firm Name"
              value={data.firmName}
              onChange={(e) => updateData('firmName', e.target.value)}
              placeholder="Doe & Associates"
            />
            
            <Input
              label="Firm Website"
              type="url"
              value={data.firmWebsite}
              onChange={(e) => updateData('firmWebsite', e.target.value)}
              placeholder="https://www.lawfirm.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Office Locations <span className="text-red-600">*</span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-40 overflow-y-auto">
              {cities.map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => {
                    if (data.officeLocations.includes(city)) {
                      removeFromArray('officeLocations', city);
                    } else {
                      addToArray('officeLocations', city);
                    }
                  }}
                  className={cn(
                    'p-2 rounded-lg border-2 transition-all text-sm',
                    data.officeLocations.includes(city)
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  )}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Languages <span className="text-red-600">*</span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {languages.map((language) => (
                <button
                  key={language}
                  type="button"
                  onClick={() => {
                    if (data.languages.includes(language)) {
                      removeFromArray('languages', language);
                    } else {
                      addToArray('languages', language);
                    }
                  }}
                  className={cn(
                    'p-2 rounded-lg border-2 transition-all text-sm',
                    data.languages.includes(language)
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  )}
                >
                  {language}
                </button>
              ))}
            </div>
            {errors.languages && (
              <p className="text-red-600 text-sm mt-1">{errors.languages}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Contact Preference <span className="text-red-600">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              {contactPreferences.map((preference) => (
                <button
                  key={preference}
                  type="button"
                  onClick={() => {
                    if (data.contactPreference.includes(preference)) {
                      removeFromArray('contactPreference', preference);
                    } else {
                      addToArray('contactPreference', preference);
                    }
                  }}
                  className={cn(
                    'p-3 rounded-lg border-2 transition-all text-sm flex items-center space-x-2',
                    data.contactPreference.includes(preference)
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  )}
                >
                  {preference === 'Phone' && <Phone className="h-4 w-4" />}
                  {preference === 'Email' && <Mail className="h-4 w-4" />}
                  {preference === 'WhatsApp' && <MessageSquare className="h-4 w-4" />}
                  {preference === 'Portal messages' && <MessageSquare className="h-4 w-4" />}
                  <span>{preference}</span>
                </button>
              ))}
            </div>
            {errors.contactPreference && (
              <p className="text-red-600 text-sm mt-1">{errors.contactPreference}</p>
            )}
          </div>

          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors">
            <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Upload Profile Photo</h3>
            <p className="text-gray-600 mb-4">A professional photo increases client trust by 40%</p>
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Choose Photo
            </Button>
          </div>
        </div>

        {/* Live Preview */}
        <div className="lg:col-span-1">
          <div className="sticky top-8">
            <Card className="p-6">
              <h3 className="font-semibold mb-4 flex items-center">
                <Eye className="h-5 w-5 mr-2 text-blue-600" />
                What clients will see
              </h3>
              <div className="space-y-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                  <Users className="h-8 w-8 text-gray-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {data.fullName || 'Your Name'}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {data.shortHeadline || 'Your headline will appear here'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {data.firmName || 'Firm name'}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1">
                  {data.languages.slice(0, 3).map((lang) => (
                    <span key={lang} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {lang}
                    </span>
                  ))}
                  {data.languages.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      +{data.languages.length - 3} more
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-1">
                  {data.officeLocations.slice(0, 2).map((location) => (
                    <span key={location} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {location}
                    </span>
                  ))}
                  {data.officeLocations.length > 2 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      +{data.officeLocations.length - 2} more
                    </span>
                  )}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-8 animate-slide-in">
      <div className="text-center">
        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <BadgeCheck className="h-8 w-8 text-amber-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Identity & Compliance</h2>
        <p className="text-gray-600">For verification purposes only - not shown to clients</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative">
          <Input
            label="South African ID Number or Passport"
            type={showIdNumber ? 'text' : 'password'}
            value={data.idNumber}
            onChange={(e) => updateData('idNumber', e.target.value)}
            placeholder="8001015009087"
            required
            error={errors.idNumber}
          />
          <button
            type="button"
            onClick={() => setShowIdNumber(!showIdNumber)}
            className="absolute right-3 top-8 text-gray-400 hover:text-gray-600"
          >
            {showIdNumber ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
          <p className="text-xs text-gray-500 mt-1">
            We use this to verify your identity. Clients won't see it.
          </p>
        </div>
        
        <Input
          label="Mobile Number"
          type="tel"
          value={data.mobileNumber}
          onChange={(e) => updateData('mobileNumber', e.target.value)}
          placeholder="+27 11 123 4567"
          required
          error={errors.mobileNumber}
        />
        
        <Input
          label="CIPC Entity Number"
          value={data.cipcNumber}
          onChange={(e) => updateData('cipcNumber', e.target.value)}
          placeholder="If incorporated"
        />
        
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="vatRegistered"
              checked={data.vatRegistered}
              onChange={(e) => updateData('vatRegistered', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="vatRegistered" className="text-sm font-medium text-gray-700">
              VAT Registered?
            </label>
          </div>
          {data.vatRegistered && (
            <Input
              label="VAT Number"
              value={data.vatNumber}
              onChange={(e) => updateData('vatNumber', e.target.value)}
              placeholder="4123456789"
            />
          )}
        </div>
        
        <Input
          label="B-BBEE Level"
          value={data.bbbeeLevel}
          onChange={(e) => updateData('bbbeeLevel', e.target.value)}
          placeholder="Level 1-8 or Exempt"
        />
      </div>

      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-900">Required Documents</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors">
            <FileUp className="h-8 w-8 text-gray-400 mx-auto mb-3" />
            <h4 className="font-medium mb-2">Proof of Identity</h4>
            <p className="text-sm text-gray-600 mb-4">ID document or passport</p>
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </Button>
          </div>
          
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors">
            <FileUp className="h-8 w-8 text-gray-400 mx-auto mb-3" />
            <h4 className="font-medium mb-2">Proof of Address</h4>
            <p className="text-sm text-gray-600 mb-4">≤3 months old</p>
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0: return renderStep0();
      case 1: return renderStep1();
      case 2: return renderStep2();
      // Add more steps as needed
      default: return renderStep0();
    }
  };

  const handleSubmit = () => {
    console.log('Submitting onboarding data:', data);
    navigate('/lawyer/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderStepIndicator()}
        
        <Card className="shadow-xl border-0">
          <CardContent className="p-8">
            {renderCurrentStep()}
            
            {/* Navigation */}
            <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className="flex items-center space-x-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Previous</span>
                </Button>
                
                <Button
                  variant="ghost"
                  className="flex items-center space-x-2 text-gray-600"
                >
                  <Save className="h-4 w-4" />
                  <span>Save & Finish Later</span>
                </Button>
              </div>
              
              <div className="flex items-center space-x-4">
                {isAutoSaving && (
                  <div className="flex items-center space-x-2 text-gray-500">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-500"></div>
                    <span className="text-sm">Saving...</span>
                  </div>
                )}
                
                {lastSaved && !isAutoSaving && (
                  <div className="flex items-center space-x-2 text-green-600">
                    <CheckCircle2 className="h-4 w-4" />
                    <span className="text-sm">Saved {lastSaved.toLocaleTimeString()}</span>
                  </div>
                )}
                
                {currentStep === totalSteps - 1 ? (
                  <Button
                    onClick={handleSubmit}
                    className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                  >
                    <Trophy className="h-4 w-4" />
                    <span>Complete Onboarding</span>
                  </Button>
                ) : (
                  <Button
                    onClick={nextStep}
                    className="flex items-center space-x-2"
                  >
                    <span>Next Step</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}