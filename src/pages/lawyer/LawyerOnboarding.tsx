import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Upload,
  Trophy,
  Scale,
  Clock,
  DollarSign,
  Award,
  Users,
  Target,
  Camera,
  Shield,
  BadgeCheck,
  FileUp,
  Gavel,
  Eye,
  EyeOff,
  Save,
  CheckCircle2,
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  GraduationCap,
  Lock,
  Globe,
  CreditCard,
  Banknote,
  FileText,
  RefreshCw,
  Video,
  Briefcase,
  Heart,
  Landmark,
  Zap
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardContent } from '../../components/ui/Card';
import { cn } from '../../utils/cn';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';


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
  profilePhotoUrl?: string;
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


const weekDays = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
];

export default function LawyerOnboarding() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);


  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showIdNumber, setShowIdNumber] = useState(false);

  // Support deep-linking: /lawyer/onboarding?step=8
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const stepParam = searchParams.get('step');
    if (stepParam) {
      const idx = parseInt(stepParam, 10);
      if (!Number.isNaN(idx) && idx >= 0 && idx < steps.length) {
        setCurrentStep(idx);
      }
    }
  }, [searchParams]);

  const [data, setData] = useState<OnboardingData>({
    // Initialize with default values
    consentTerms: false,
    consentMarketing: false,
    consentReviews: false,
    fullName: '',
    professionalTitle: '',
    pronouns: '',
    profilePhotoUrl: '',
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
    if (!user) return;
    try {
      setIsAutoSaving(true);
      const payload = {
        user_id: user.id,
        full_name: data.fullName || null,
        email: user.email,
        phone_number: data.mobileNumber || null,
        firm_name: data.firmName || null,
        practice_areas: (data.primaryPracticeAreas || []).map(p => p.area).filter(Boolean),
        expertise_description: (data.primaryPracticeAreas || []).map(p => p.summary).filter(Boolean).join(' ') || null,
        professional_bio: data.professionalBio || null,
        hourly_rate: data.hourlyRate ? Number(data.hourlyRate) : 0,
        consultation_fee: data.consultationFee ? Number(data.consultationFee) : 0,
        free_consultation: !!data.freeFirstConsult,
        availability_status: data.currentStatus || null,
        response_time: data.responseTime || null,
        profile_photo_url: data.profilePhotoUrl || null,
        location: (data.officeLocations && data.officeLocations[0]) || null,
        years_experience: data.totalYearsExperience ? Number(data.totalYearsExperience) : 0,
        languages_spoken: data.languages || [],
      } as const;

      const { error: upsertErr } = await supabase
        .from('lawyer_profiles')
        .upsert(payload, { onConflict: 'user_id' });
      if (upsertErr) throw upsertErr;

      setLastSaved(new Date());
      showToast('Progress saved', 'success');
    } catch (e) {
      console.error('Autosave failed', e);
    } finally {
      setIsAutoSaving(false);
    }
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
  const handleProfilePhotoSelected = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!user) {
      showToast('Please sign in again', 'error');
      navigate('/login');
      return;
    }
    setIsUploadingPhoto(true);
    try {
      const path = `${user.id}/${Date.now()}_${file.name}`;
      const { error: upErr } = await supabase
        .storage
        .from('profile-photos')
        .upload(path, file, { upsert: true });
      if (upErr) throw upErr;
      const { data: pub } = supabase
        .storage
        .from('profile-photos')
        .getPublicUrl(path);
      const url = pub.publicUrl;
      updateData('profilePhotoUrl', url);
      await supabase
        .from('lawyer_profiles')
        .update({ profile_photo_url: url })
        .eq('user_id', user.id);
      showToast('Photo uploaded', 'success');
    } catch (err) {
      console.error('Photo upload failed', err);
      showToast('Upload failed', 'error');
    } finally {
      setIsUploadingPhoto(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
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
    return () => { document.head.removeChild(style); };
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
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-rose-600" />
                    {city}
                  </span>
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
                  <span className="inline-flex items-center gap-1">
                    <Globe className="h-3 w-3 text-indigo-600" />
                    {language}
                  </span>
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
            {data.profilePhotoUrl ? (
              <img src={data.profilePhotoUrl} alt="Profile" className="mx-auto mb-4 h-24 w-24 rounded-full object-cover" />
            ) : (
              <p className="text-gray-600 mb-4">A professional photo increases client trust by 40%</p>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleProfilePhotoSelected}
            />
            <Button variant="outline" onClick={() => fileInputRef.current?.click()} disabled={isUploadingPhoto}>
              <Upload className="h-4 w-4 mr-2" />
              {isUploadingPhoto ? 'Uploading...' : (data.profilePhotoUrl ? 'Change Photo' : 'Choose Photo')}
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

  const renderStep3 = () => {
    const courtLevels = [
      "Magistrates' Court",
      'Regional Court',
      'High Court',
      'Labour Court',
      'Constitutional Court'
    ];

    return (
      <div className="space-y-8 animate-slide-in">
        <div className="text-center">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Scale className="h-8 w-8 text-emerald-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Right to Practise</h2>
          <p className="text-gray-600">Your legal credentials and practising status</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="LPC / Practice Number"
            value={data.lpcNumber}
            onChange={(e) => updateData('lpcNumber', e.target.value)}
            placeholder="e.g. LP1234567"
            required
            error={errors.lpcNumber}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bar / Practising Status <span className="text-red-600">*</span>
            </label>
            <select
              value={data.barStatus}
              onChange={(e) => updateData('barStatus', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select status</option>
              <option value="Practising">Practising</option>
              <option value="Non-practising">Non-practising</option>
              <option value="In good standing">In good standing</option>
              <option value="Suspended">Suspended</option>
            </select>
            {errors.barStatus && (
              <p className="text-red-600 text-sm mt-1">{errors.barStatus}</p>
            )}
          </div>

          <Input
            label="Admission Date"
            type="date"
            value={data.admissionDate}
            onChange={(e) => updateData('admissionDate', e.target.value)}
            required
            error={errors.admissionDate}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Provinces Admitted <span className="text-red-600">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              {provinces.map((prov) => (
                <button
                  key={prov}
                  type="button"
                  onClick={() => {
                    if (data.provincesAdmitted.includes(prov)) {
                      removeFromArray('provincesAdmitted', prov);
                    } else {
                      addToArray('provincesAdmitted', prov);
                    }
                  }}
                  className={cn(
                    'p-2 rounded-lg border-2 transition-all text-sm',
                    data.provincesAdmitted.includes(prov)
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                      : 'border-gray-200 hover:border-gray-300'
                  )}
                >
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-emerald-600" />
                    {prov}
                  </span>
                </button>
              ))}
            </div>
            {errors.provincesAdmitted && (
              <p className="text-red-600 text-sm mt-1">{errors.provincesAdmitted}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Right of Appearance
          </label>
          <div className="flex flex-wrap gap-2">
            {courtLevels.map((lvl) => (
              <button
                key={lvl}
                type="button"
                onClick={() => {
                  if (data.rightOfAppearance.includes(lvl)) {
                    removeFromArray('rightOfAppearance', lvl);
                  } else {
                    addToArray('rightOfAppearance', lvl);
                  }
                }}
                className={cn(
                  'px-3 py-2 rounded-full border text-sm transition-all',
                  data.rightOfAppearance.includes(lvl)
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                )}
              >
                <span className="inline-flex items-center gap-1">
                  <Scale className="h-3 w-3 text-emerald-600" />
                  {lvl}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="isNotary"
                checked={data.isNotary}
                onChange={(e) => updateData('isNotary', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="isNotary" className="text-sm font-medium text-gray-700">
                Notary Public
              </label>
            </div>
            {data.isNotary && (
              <Input
                label="Year Commissioned (Notary)"
                value={data.notaryYear}
                onChange={(e) => updateData('notaryYear', e.target.value)}
                placeholder="e.g. 2018"
              />
            )}
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="isConveyancer"
                checked={data.isConveyancer}
                onChange={(e) => updateData('isConveyancer', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="isConveyancer" className="text-sm font-medium text-gray-700">
                Conveyancer
              </label>
            </div>
            {data.isConveyancer && (
              <Input
                label="Year Admitted (Conveyancer)"
                value={data.conveyancerYear}
                onChange={(e) => updateData('conveyancerYear', e.target.value)}
                placeholder="e.g. 2020"
              />
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Trust Account Bank"
            value={data.trustAccountBank}
            onChange={(e) => updateData('trustAccountBank', e.target.value)}
            placeholder="e.g. Nedbank"
          />
          <Input
            label="Trust Account Type"
            value={data.trustAccountType}
            onChange={(e) => updateData('trustAccountType', e.target.value)}
            placeholder="e.g. Section 86(1)"
          />
          <Input
            label="PI Insurer"
            value={data.piInsurer}
            onChange={(e) => updateData('piInsurer', e.target.value)}
            placeholder="e.g. Aon"
          />
          <Input
            label="PI Policy Number"
            value={data.piPolicyNumber}
            onChange={(e) => updateData('piPolicyNumber', e.target.value)}
            placeholder="Policy #"
          />
          <Input
            label="PI Cover Amount (R)"
            value={data.piCoverAmount}
            onChange={(e) => updateData('piCoverAmount', e.target.value)}
            placeholder="e.g. 5,000,000"
          />
          <Input
            label="PI Expiry Date"
            type="date"
            value={data.piExpiryDate}
            onChange={(e) => updateData('piExpiryDate', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Disciplinary History</label>
          <textarea
            value={data.disciplinaryDetails}
            onChange={(e) => updateData('disciplinaryDetails', e.target.value)}
            placeholder="If any, briefly describe"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px]"
          />
        </div>

        {/* Document upload placeholders */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Certificates</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors">
              <FileUp className="h-8 w-8 text-gray-400 mx-auto mb-3" />
              <h4 className="font-medium mb-2">Certificate of Good Standing</h4>
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Upload
              </Button>
            </div>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors">
              <FileUp className="h-8 w-8 text-gray-400 mx-auto mb-3" />
              <h4 className="font-medium mb-2">Fidelity Fund Certificate</h4>
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Upload
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };



  // Step 4: Education & Training
  const renderStep4 = () => (
    <div className="space-y-8 animate-slide-in">
      <div className="text-center">
        <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <GraduationCap className="h-8 w-8 text-indigo-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Education & Training</h2>
        <p className="text-gray-600">Your academic background and recent CPD</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Highest Degree"
          value={data.highestDegree}
          onChange={(e) => updateData('highestDegree', e.target.value)}
          placeholder="LLB, LLM, etc."
        />
        <Input
          label="University"
          value={data.university}
          onChange={(e) => updateData('university', e.target.value)}
          placeholder="e.g. University of Cape Town"
        />
        <Input
          label="Graduation Year"
          value={data.graduationYear}
          onChange={(e) => updateData('graduationYear', e.target.value)}
          placeholder="e.g. 2016"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Additional Qualifications (comma-separated)"
          value={(data.additionalQualifications || []).join(', ')}
          onChange={(e) => updateData('additionalQualifications', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
          placeholder="e.g. Notary Public, Compliance Cert"
        />
        <Input
          label="Recent CPD Topics (comma-separated)"
          value={(data.recentCpdTopics || []).join(', ')}
          onChange={(e) => updateData('recentCpdTopics', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
          placeholder="e.g. Labour Law Updates, POPIA"
        />
      </div>
    </div>
  );

  // Step 5: Practice Areas & Sectors (minimal)
  const renderStep5 = () => (
    <div className="space-y-8 animate-slide-in">
      <div className="text-center">
        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Gavel className="h-8 w-8 text-purple-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Practice Areas</h2>
        <p className="text-gray-600">Tell us where you practise and sectors you serve</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Secondary Areas</label>
          <div className="flex flex-wrap gap-2">
            {["Labour","Commercial","Litigation","Family","Property","Corporate","Tax","IP","Immigration","Criminal","Environmental"].map((area) => (
              <button
                key={area}
                type="button"
                onClick={() => {
                  if (data.secondaryAreas.includes(area)) {
                    removeFromArray('secondaryAreas', area);
                  } else {
                    addToArray('secondaryAreas', area);
                  }
                }}
                className={cn(
                  'px-3 py-1 rounded-full border text-sm',
                  data.secondaryAreas.includes(area)
                    ? 'border-purple-500 bg-purple-50 text-purple-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                )}
              >
                <span className="inline-flex items-center gap-1">
                  <Gavel className="h-3 w-3 text-purple-600" />
                  {area}
                </span>
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Industries Served</label>
          <div className="flex flex-wrap gap-2">
            {["SMEs","Startups","Healthcare","Finance","Real Estate","Technology","Manufacturing","Retail","Government","Non-profit"].map((ind) => (
              <button
                key={ind}
                type="button"
                onClick={() => {
                  if (data.industriesServed.includes(ind)) {
                    removeFromArray('industriesServed', ind);
                  } else {
                    addToArray('industriesServed', ind);
                  }
                }}
                className={cn(
                  'px-3 py-1 rounded-full border text-sm',
                  data.industriesServed.includes(ind)
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                )}
              >
                <span className="inline-flex items-center gap-1">
                  <Briefcase className="h-3 w-3 text-indigo-600" />
                  {ind}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Input
          label="Matters Not Taken"
          value={data.mattersNotTaken}
          onChange={(e) => updateData('mattersNotTaken', e.target.value)}
          placeholder="Anything you prefer not to handle"
        />
        <Input
          label="Regulatory Strengths (comma-separated)"
          value={(data.regulatoryStrengths || []).join(', ')}
          onChange={(e) => updateData('regulatoryStrengths', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
          placeholder="e.g. Companies Act, Labour Relations Act"
        />
      </div>
    </div>
  );

  // Step 6: Experience & Bio
  const renderStep6 = () => (
    <div className="space-y-8 animate-slide-in">
      <div className="text-center">
        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Award className="h-8 w-8 text-amber-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Experience & Bio</h2>
        <p className="text-gray-600">Summarise your experience and achievements</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Total Years Experience"
          value={data.totalYearsExperience}
          onChange={(e) => updateData('totalYearsExperience', e.target.value)}
          placeholder="e.g. 8"
        />
        <Input
          label="Roles and Teams"
          value={data.rolesAndTeams}
          onChange={(e) => updateData('rolesAndTeams', e.target.value)}
          placeholder="e.g. Associate, Team Lead"
        />
        <Input
          label="Notable Matters (comma-separated)"
          value={(data.notableMatters || []).join(', ')}
          onChange={(e) => updateData('notableMatters', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
          placeholder="e.g. CCMA case for XYZ"
        />
        <Input
          label="Achievements (comma-separated)"
          value={(data.achievements || []).join(', ')}
          onChange={(e) => updateData('achievements', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
          placeholder="e.g. Top 40 under 40"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Professional Bio</label>
        <textarea
          value={data.professionalBio}
          onChange={(e) => updateData('professionalBio', e.target.value)}
          placeholder="Short professional biography"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px]"
        />
      </div>
    </div>
  );

  // Step 7: Client Fit & Scope
  const renderStep7 = () => (
    <div className="space-y-8 animate-slide-in">
      <div className="text-center">
        <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Target className="h-8 w-8 text-teal-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Client Fit & Scope</h2>
        <p className="text-gray-600">Preferred client types and engagement preferences</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Client Types</label>
          <div className="flex flex-wrap gap-2">
            {['Individuals','SMEs','Startups','Corporates','Non-profits','Government'].map((ct) => (
              <button
                key={ct}
                type="button"
                onClick={() => {
                  if (data.clientTypes.includes(ct)) {
                    removeFromArray('clientTypes', ct);
                  } else {
                    addToArray('clientTypes', ct);
                  }
                }}
                className={cn(
                  'px-3 py-1 rounded-full border text-sm',
                  data.clientTypes.includes(ct)
                    ? 'border-teal-500 bg-teal-50 text-teal-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                )}
              >
                <span className="inline-flex items-center gap-1">
                  {ct === 'Individuals' && <Users className="h-3 w-3 text-indigo-600" />}
                  {(ct === 'SMEs' || ct === 'Startups' || ct === 'Corporates') && <Briefcase className="h-3 w-3 text-amber-600" />}
                  {ct === 'Non-profits' && <Heart className="h-3 w-3 text-rose-600" />}
                  {ct === 'Government' && <Landmark className="h-3 w-3 text-emerald-600" />}
                  {ct}
                </span>
              </button>
            ))}
          </div>
        </div>
        <Input
          label="Minimum Brief Value (R)"
          value={data.minimumBriefValue}
          onChange={(e) => updateData('minimumBriefValue', e.target.value)}
          placeholder="e.g. 2000"
        />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Meeting Modes</label>
          <div className="flex flex-wrap gap-2">
            {['Video','In-person','Phone','Chat'].map((mm) => (
              <button
                key={mm}
                type="button"
                onClick={() => {
                  if (data.meetingModes.includes(mm)) {
                    removeFromArray('meetingModes', mm);
                  } else {
                    addToArray('meetingModes', mm);
                  }
                }}
                className={cn(
                  'px-3 py-1 rounded-full border text-sm',
                  data.meetingModes.includes(mm)
                    ? 'border-violet-500 bg-violet-50 text-violet-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                )}
              >
                <span className="inline-flex items-center gap-1">
                  {mm === 'Video' && <Video className="h-3 w-3 text-violet-600" />}
                  {mm === 'In-person' && <Users className="h-3 w-3 text-emerald-600" />}
                  {mm === 'Phone' && <Phone className="h-3 w-3 text-sky-600" />}
                  {mm === 'Chat' && <MessageSquare className="h-3 w-3 text-amber-600" />}
                  {mm}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Matter Value Bands</label>
          <div className="flex flex-wrap gap-2">
            {["< R50k","R50k - R250k","R250k - R1m","> R1m"].map((band) => (
              <button
                key={band}
                type="button"
                onClick={() => {
                  if (data.matterValueBands.includes(band)) {
                    removeFromArray('matterValueBands', band);
                  } else {
                    addToArray('matterValueBands', band);
                  }
                }}
                className={cn(
                  'px-3 py-1 rounded-full border text-sm',
                  data.matterValueBands.includes(band)
                    ? 'border-amber-500 bg-amber-50 text-amber-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                )}
              >
                <span className="inline-flex items-center gap-1">
                  <DollarSign className="h-3 w-3 text-amber-600" />
                  {band}
                </span>
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Urgency Accepted</label>
          <div className="flex flex-wrap gap-2">
            {["Same day","24 hours","2-3 days","Flexible"].map((u) => (
              <button
                key={u}
                type="button"
                onClick={() => {
                  if (data.urgencyAccepted.includes(u)) {
                    removeFromArray('urgencyAccepted', u);
                  } else {
                    addToArray('urgencyAccepted', u);
                  }
                }}
                className={cn(
                  'px-3 py-1 rounded-full border text-sm',
                  data.urgencyAccepted.includes(u)
                    ? 'border-sky-500 bg-sky-50 text-sky-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                )}
              >
                <span className="inline-flex items-center gap-1">
                  {u === 'Same day' ? (
                    <Zap className="h-3 w-3 text-rose-600" />
                  ) : (
                    <Clock className="h-3 w-3 text-sky-600" />
                  )}
                  {u}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="travelAvailable"
              checked={data.travelAvailable}
              onChange={(e) => updateData('travelAvailable', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="travelAvailable" className="text-sm font-medium text-gray-700">
              Available to travel
            </label>
          </div>
          {data.travelAvailable && (
            <Input
              label="Max Travel (km)"
              value={data.maxTravelKm}
              onChange={(e) => updateData('maxTravelKm', e.target.value)}
              placeholder="e.g. 50"
            />
          )}
        </div>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="travelBillable"
              checked={data.travelBillable}
              onChange={(e) => updateData('travelBillable', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="travelBillable" className="text-sm font-medium text-gray-700">
              Billable travel
            </label>
          </div>
          {data.travelBillable && (
            <Input
              label="Travel Rate (R/km)"
              value={data.travelRate}
              onChange={(e) => updateData('travelRate', e.target.value)}
              placeholder="e.g. 6.50"
            />
          )}
        </div>
      </div>
    </div>
  );

  // Step 8: Fees & Packages
  const renderStep8 = () => (
    <div className="space-y-8 animate-slide-in">
      <div className="text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <DollarSign className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Fees & Packages</h2>
        <p className="text-gray-600">Set up your pricing structure</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Billing Models</label>
          <div className="flex flex-wrap gap-2">
            {['Hourly', 'Fixed fee', 'Retainer'].map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => {
                  if (data.billingModels.includes(m)) {
                    removeFromArray('billingModels', m);
                  } else {
                    addToArray('billingModels', m);
                  }
                }}
                className={cn(
                  'px-3 py-1 rounded-full border text-sm',
                  data.billingModels.includes(m)
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                )}
              >
                <span className="inline-flex items-center gap-1">
                  {m === 'Hourly' && <Clock className="h-3 w-3 text-green-600" />}
                  {m === 'Fixed fee' && <FileText className="h-3 w-3 text-blue-600" />}
                  {m === 'Retainer' && <RefreshCw className="h-3 w-3 text-amber-600" />}
                  {m}
                </span>
              </button>
            ))}
          </div>
        </div>

        <Input
          label="Hourly Rate (R/hr)"
          value={data.hourlyRate}
          onChange={(e) => updateData('hourlyRate', e.target.value)}
          placeholder="e.g. 1500"
        />

        <Input
          label="Consultation Fee (R)"
          value={data.consultationFee}
          onChange={(e) => updateData('consultationFee', e.target.value)}
          placeholder="e.g. 750"
        />

        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="freeFirstConsult"
            checked={data.freeFirstConsult}
            onChange={(e) => updateData('freeFirstConsult', e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="freeFirstConsult" className="text-sm font-medium text-gray-700">
            Offer free first consultation
          </label>
        </div>


      {/* Consultations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Consultation Duration</label>
          <select
            value={data.consultationDuration}
            onChange={(e) => updateData('consultationDuration', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select duration</option>
            <option value="30">30 minutes</option>
            <option value="45">45 minutes</option>
            <option value="60">60 minutes</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Consultation Covers</label>
          <textarea
            value={data.consultationCovers}
            onChange={(e) => updateData('consultationCovers', e.target.value)}
            placeholder="e.g. Issue triage, next steps, scope for quote"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px]"
          />
        </div>
      </div>

      {/* Fixed-Fee Packages */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Fixed-Fee Packages</h3>
        <p className="text-sm text-gray-600">Create transparent packages for common matters</p>

        {(data.fixedFeePackages || []).map((pkg, i) => (
          <Card key={i} className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="Package Name"
                value={pkg.name}
                onChange={(e) => setData(prev => {
                  const next = [...(prev.fixedFeePackages || [])];
                  next[i] = { ...next[i], name: e.target.value };
                  return { ...prev, fixedFeePackages: next };
                })}
                placeholder="e.g. Lease Agreement Review"
              />
              <Input
                label="Price (R)"
                value={pkg.price}
                onChange={(e) => setData(prev => {
                  const next = [...(prev.fixedFeePackages || [])];
                  next[i] = { ...next[i], price: e.target.value };
                  return { ...prev, fixedFeePackages: next };
                })}
                placeholder="e.g. 2500"
              />
              <Input
                label="Turnaround"
                value={pkg.turnaround}
                onChange={(e) => setData(prev => {
                  const next = [...(prev.fixedFeePackages || [])];
                  next[i] = { ...next[i], turnaround: e.target.value };
                  return { ...prev, fixedFeePackages: next };
                })}
                placeholder="e.g. 3 business days"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Included</label>
                <textarea
                  value={pkg.included}
                  onChange={(e) => setData(prev => {
                    const next = [...(prev.fixedFeePackages || [])];
                    next[i] = { ...next[i], included: e.target.value };
                    return { ...prev, fixedFeePackages: next };
                  })}
                  placeholder="What’s included"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg min-h-[80px]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Excluded</label>
                <textarea
                  value={pkg.excluded}
                  onChange={(e) => setData(prev => {
                    const next = [...(prev.fixedFeePackages || [])];
                    next[i] = { ...next[i], excluded: e.target.value };
                    return { ...prev, fixedFeePackages: next };
                  })}
                  placeholder="What’s excluded"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg min-h-[80px]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Preconditions</label>
                <textarea
                  value={pkg.preconditions}
                  onChange={(e) => setData(prev => {
                    const next = [...(prev.fixedFeePackages || [])];
                    next[i] = { ...next[i], preconditions: e.target.value };
                    return { ...prev, fixedFeePackages: next };
                  })}
                  placeholder="Any prerequisites"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg min-h-[80px]"
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <Button variant="outline" onClick={() => setData(prev => ({
                ...prev,
                fixedFeePackages: (prev.fixedFeePackages || []).filter((_, idx) => idx !== i)
              }))}>Remove</Button>
            </div>
          </Card>
        ))}

        <Button
          variant="ghost"
          onClick={() => setData(prev => ({
            ...prev,
            fixedFeePackages: [
              ...((prev.fixedFeePackages || [])),
              { name: '', included: '', excluded: '', turnaround: '', price: '', preconditions: '' }
            ]
          }))}
        >
          + Add Package
        </Button>
      </div>

      {/* Retainer Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Retainer</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Monthly Hours"
            value={data.retainerMonthlyHours}
            onChange={(e) => updateData('retainerMonthlyHours', e.target.value)}
            placeholder="e.g. 10"
          />
          <Input
            label="Monthly Fee (R)"
            value={data.retainerFee}
            onChange={(e) => updateData('retainerFee', e.target.value)}
            placeholder="e.g. 12000"
          />
          <Input
            label="Overage Rate (R/hr)"
            value={data.retainerOverageRate}
            onChange={(e) => updateData('retainerOverageRate', e.target.value)}
            placeholder="e.g. 1400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Scope</label>
          <textarea
            value={data.retainerScope}
            onChange={(e) => updateData('retainerScope', e.target.value)}
            placeholder="What’s covered under the retainer"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px]"
          />
        </div>
      </div>

      {/* Payments & Policies */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Payments & Policies</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="depositRequired"
              checked={data.depositRequired}
              onChange={(e) => updateData('depositRequired', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="depositRequired" className="text-sm font-medium text-gray-700">
              Deposit required
            </label>
          </div>
          {data.depositRequired && (
            <Input
              label="Deposit %"
              value={data.depositPercentage}
              onChange={(e) => updateData('depositPercentage', e.target.value)}
              placeholder="e.g. 50%"
            />
          )}
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="displayPricesIncVat"
              checked={data.displayPricesIncVat}
              onChange={(e) => updateData('displayPricesIncVat', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="displayPricesIncVat" className="text-sm font-medium text-gray-700">
              Display prices incl. VAT
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Accepted Payment Methods</label>
          <div className="flex flex-wrap gap-2">
            {['Card', 'EFT', 'Cash'].map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => {
                  if (data.paymentMethods.includes(m)) {
                    removeFromArray('paymentMethods', m);
                  } else {
                    addToArray('paymentMethods', m);
                  }
                }}
                className={cn(
                  'px-3 py-1 rounded-full border text-sm',
                  data.paymentMethods.includes(m)
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                )}
              >
                <span className="inline-flex items-center gap-1">
                  {m === 'Card' && <CreditCard className="h-3 w-3 text-purple-600" />}
                  {m === 'EFT' && <Banknote className="h-3 w-3 text-blue-600" />}
                  {m === 'Cash' && <Banknote className="h-3 w-3 text-green-600" />}
                  {m}
                </span>
              </button>
            ))}
          </div>
        </div>

        <Input
          label="Refund Policy"
          value={data.refundPolicy}
          onChange={(e) => updateData('refundPolicy', e.target.value)}
          placeholder="e.g. Refunds only if no work performed"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Cancellation Policy</label>
          <textarea
            value={data.cancellationPolicy}
            onChange={(e) => updateData('cancellationPolicy', e.target.value)}
            placeholder="e.g. 24 hours notice required for cancellations"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg min-h-[80px]"
          />
        </div>
      </div>

      </div>
    </div>
  );

  // Step 9: Availability & Service Levels
  const renderStep9 = () => (
    <div className="space-y-8 animate-slide-in">
      <div className="text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Clock className="h-8 w-8 text-blue-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Availability</h2>
        <p className="text-gray-600">Your current status and response times</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <select
            value={data.currentStatus}
            onChange={(e) => updateData('currentStatus', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select status</option>
            <option value="Available">Available</option>
            <option value="Limited availability">Limited availability</option>
            <option value="Unavailable">Unavailable</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Typical Response Time</label>
          <select
            value={data.responseTime}
            onChange={(e) => updateData('responseTime', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select response time</option>
            <option value="Within 4 hours">Within 4 hours</option>
            <option value="Within 24 hours">Within 24 hours</option>
            <option value="Within 2 business days">Within 2 business days</option>
          </select>
        </div>
      </div>
    </div>
  );

  // Step 10: Ethics & Conflicts
  const renderStep10 = () => (
    <div className="space-y-8 animate-slide-in">
      <div className="text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Shield className="h-8 w-8 text-red-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Ethics & Conflicts</h2>
        <p className="text-gray-600">Professional standards and conflict checks</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="conflictCheckProcess"
            checked={data.conflictCheckProcess}
            onChange={(e) => updateData('conflictCheckProcess', e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="conflictCheckProcess" className="text-sm font-medium text-gray-700">
            I maintain a documented conflict check process
          </label>
        </div>
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="runConflictChecks"
            checked={data.runConflictChecks}
            onChange={(e) => updateData('runConflictChecks', e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="runConflictChecks" className="text-sm font-medium text-gray-700">
            I will run conflict checks on new matters
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">High-risk or Declined Areas</label>
          <textarea
            value={data.highRiskAreas}
            onChange={(e) => updateData('highRiskAreas', e.target.value)}
            placeholder="e.g. certain regulated industries"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Conflict Check Description</label>
          <textarea
            value={data.conflictCheckDescription}
            onChange={(e) => updateData('conflictCheckDescription', e.target.value)}
            placeholder="Briefly describe your process"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px]"
          />
        </div>
      </div>
    </div>
  );

  // Step 11: Documents
  const renderStep11 = () => (
    <div className="space-y-8 animate-slide-in">
      <div className="text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FileUp className="h-8 w-8 text-gray-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Documents</h2>
        <p className="text-gray-600">Upload supporting certificates (optional here)</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
          <FileUp className="h-8 w-8 text-gray-400 mx-auto mb-3" />
          <h4 className="font-medium mb-2">Proof of Identity</h4>
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </Button>
        </div>
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
          <FileUp className="h-8 w-8 text-gray-400 mx-auto mb-3" />
          <h4 className="font-medium mb-2">Proof of Address</h4>
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </Button>
        </div>
      </div>
    </div>
  );

  // Step 12: References & Reviews
  const renderStep12 = () => (
    <div className="space-y-8 animate-slide-in">
      <div className="text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Users className="h-8 w-8 text-blue-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">References</h2>
        <p className="text-gray-600">You can add professional references now or later</p>
      </div>

      <Card className="p-6">
        <p className="text-sm text-gray-600">
          Optional: Provide colleagues or clients who can vouch for your work. You can also skip and add these on your dashboard later.
        </p>
      </Card>
    </div>
  );

  // Step 13: Pro Bono & Community
  const renderStep13 = () => (
    <div className="space-y-8 animate-slide-in">
      <div className="text-center">
        <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Trophy className="h-8 w-8 text-yellow-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Pro Bono</h2>
        <p className="text-gray-600">Community and public interest</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="proBonoInterest"
            checked={data.proBonoInterest}
            onChange={(e) => updateData('proBonoInterest', e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="proBonoInterest" className="text-sm font-medium text-gray-700">
            I am interested in pro bono work
          </label>
        </div>
        <Input
          label="Monthly Pro Bono Capacity (hours)"
          value={data.proBonoCapacity}
          onChange={(e) => updateData('proBonoCapacity', e.target.value)}
          placeholder="e.g. 4"
        />
        <Input
          label="Causes or Clinics"
          value={data.causesOrClinics}
          onChange={(e) => updateData('causesOrClinics', e.target.value)}
          placeholder="e.g. Housing, Consumer Protection"
        />
      </div>
    </div>
  );

  // Step 14: Public Profile Controls
  const renderStep14 = () => (
    <div className="space-y-8 animate-slide-in">
      <div className="text-center">
        <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Eye className="h-8 w-8 text-indigo-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Profile Controls</h2>
        <p className="text-gray-600">Choose what to show publicly</p>
      </div>

      <div className="space-y-3">
        {[
          { key: 'showHourlyRatePublic', label: 'Show hourly rate on public profile' },
          { key: 'showFixedFeePackages', label: 'Show fixed-fee packages' },
          { key: 'showQuickBookButton', label: 'Enable quick book button' },
          { key: 'showLanguagesLocations', label: 'Show languages and locations' },
        ].map((item) => (
          <div key={item.key} className="flex items-center space-x-3">
            <input
              type="checkbox"
              id={item.key}
              checked={(data as any)[item.key]}
              onChange={(e) => updateData(item.key, e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor={item.key} className="text-sm font-medium text-gray-700">
              {item.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  // Step 15: Review & Sign
  const renderStep15 = () => (
    <div className="space-y-8 animate-slide-in">
      <div className="text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Review & Sign</h2>
        <p className="text-gray-600">Final confirmation</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="confirmTrueInfo"
            checked={data.confirmTrueInfo}
            onChange={(e) => updateData('confirmTrueInfo', e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="confirmTrueInfo" className="text-sm font-medium text-gray-700">
            I confirm the information is true and correct
          </label>
        </div>
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="notifyChanges"
            checked={data.notifyChanges}
            onChange={(e) => updateData('notifyChanges', e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="notifyChanges" className="text-sm font-medium text-gray-700">
            I will notify of any material changes
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Input
            label="Full Name"
            value={data.signatureName}
            onChange={(e) => updateData('signatureName', e.target.value)}
            placeholder="Your full name"
          />
          <Input
            label="Place"
            value={data.signaturePlace}
            onChange={(e) => updateData('signaturePlace', e.target.value)}
            placeholder="City"
          />
          <Input
            label="Date"
            type="date"
            value={data.signatureDate}
            onChange={(e) => updateData('signatureDate', e.target.value)}
          />
        </div>

        <Input
          label="eSignature (type your name)"
          value={data.eSignature}
          onChange={(e) => updateData('eSignature', e.target.value)}
          placeholder="/s/ Your Name"
        />
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0: return renderStep0();
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      case 4: return renderStep4();
      case 5: return renderStep5();
      case 6: return renderStep6();
      case 7: return renderStep7();
      case 8: return renderStep8();
      case 9: return renderStep9();
      case 10: return renderStep10();
      case 11: return renderStep11();
      case 12: return renderStep12();
      case 13: return renderStep13();
      case 14: return renderStep14();
      case 15: return renderStep15();
      default: return renderStep0();
    }
  };

  const handleSubmit = async () => {
    if (!user) {
      showToast('Please sign in again', 'error');
      navigate('/login');
      return;
    }
    try {
      const payload = {
        user_id: user.id,
        full_name: data.fullName || 'Unnamed',
        email: user.email,
        phone_number: data.mobileNumber || null,
        firm_name: data.firmName || null,
        practice_areas: (data.primaryPracticeAreas || []).map((p) => p.area).filter(Boolean),
        expertise_description: (data.primaryPracticeAreas || []).map((p) => p.summary).filter(Boolean).join(' ')
          || null,
        professional_bio: data.professionalBio || null,
        hourly_rate: data.hourlyRate ? Number(data.hourlyRate) : 0,
        consultation_fee: data.consultationFee ? Number(data.consultationFee) : 0,
        free_consultation: !!data.freeFirstConsult,
        availability_status: data.currentStatus || 'Available',
        response_time: data.responseTime || 'Within 24 hours',
        profile_photo_url: data.profilePhotoUrl || null,
        location: (data.officeLocations && data.officeLocations[0]) || 'South Africa',
        years_experience: data.totalYearsExperience ? Number(data.totalYearsExperience) : 0,
        languages_spoken: data.languages || [],
      } as const;

      const { error } = await supabase
        .from('lawyer_profiles')
        .upsert(payload, { onConflict: 'user_id' });
      if (error) throw error;

      showToast('Profile saved', 'success');
      navigate('/lawyer/dashboard');
    } catch (err) {
      console.error('Failed to save profile', err);
      showToast('Failed to save profile', 'error');
    }
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