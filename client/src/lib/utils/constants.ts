// Service Categories
export const SERVICE_CATEGORIES = {
  IN_HOME_VISIT: "in_home_visit",
  ONLINE_CONSULTATION: "online_consultation",
  SPECIALIZED_CARE: "specialized_care"
};

// Blog Categories
export const BLOG_CATEGORIES = {
  HEALTHCARE_TIPS: "healthcare_tips",
  TELEHEALTH: "telehealth",
  CAREGIVING: "caregiving",
  MEDICAL_RESEARCH: "medical_research",
  NEWS: "news"
};

// Appointment Status
export const APPOINTMENT_STATUS = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  CANCELLED: "cancelled"
};

// Company Information
export const COMPANY_INFO = {
  NAME: "CarePlus Home Healthcare",
  PHONE: "(800) 555-1234",
  EMAIL: "info@careplus.com",
  ADDRESS: {
    STREET: "123 Healthcare Avenue",
    CITY: "Medical District",
    STATE: "CA",
    ZIP: "90210"
  },
  SOCIAL_MEDIA: {
    FACEBOOK: "https://facebook.com/careplus",
    TWITTER: "https://twitter.com/careplus",
    INSTAGRAM: "https://instagram.com/careplus",
    LINKEDIN: "https://linkedin.com/company/careplus"
  }
};

// Operating Hours
export const OPERATING_HOURS = {
  OFFICE: "Monday-Friday: 8am-6pm",
  SERVICE: "Available 24/7 for scheduled care",
  PHONE_SUPPORT: {
    WEEKDAY: "Monday-Friday: 7am-8pm",
    WEEKEND: "Saturday-Sunday: 9am-5pm"
  }
};

// Contact Form Subjects
export const CONTACT_SUBJECTS = [
  { value: "general", label: "General Inquiry" },
  { value: "service", label: "Service Information" },
  { value: "appointment", label: "Appointment Question" },
  { value: "billing", label: "Billing & Insurance" },
  { value: "other", label: "Other" }
];

// Error Messages
export const ERROR_MESSAGES = {
  APPOINTMENT: {
    SERVICE_REQUIRED: "Please select a service type",
    TIME_REQUIRED: "Please select an appointment time",
    SUBMISSION_FAILED: "Failed to book appointment. Please try again later."
  },
  CONTACT: {
    SUBMISSION_FAILED: "Failed to send message. Please try again later."
  },
  GENERAL: {
    LOAD_SERVICES: "Failed to load services. Please try again later.",
    LOAD_BLOG_POSTS: "Failed to load blog posts. Please try again later.",
    LOAD_TESTIMONIALS: "Failed to load testimonials. Please try again later.",
    LOAD_TIME_SLOTS: "Failed to load available time slots."
  }
};

// Success Messages
export const SUCCESS_MESSAGES = {
  APPOINTMENT_BOOKED: "Your appointment has been successfully scheduled.",
  MESSAGE_SENT: "Your message has been sent successfully. We'll get back to you soon."
};

// Testimonial Ratings
export const MAX_TESTIMONIAL_RATING = 5;

// Time Slot Format
export const TIME_SLOT_FORMAT = {
  AM: (hour: number) => `${hour}:00 AM`,
  PM: (hour: number) => `${hour > 12 ? hour - 12 : hour}:00 PM`
};

// SEO and Meta Tags
export const META_DESCRIPTIONS = {
  HOME: "Experience personalized medical care in the comfort of your home. Our team of qualified healthcare professionals is dedicated to providing quality care when and where you need it.",
  APPOINTMENT: "Schedule a consultation with our healthcare professionals at a time that works for you. Choose between in-home visits, online consultations, or specialized care services.",
  BLOG: "Stay informed with our latest articles on health tips, medical advancements, and care advice from healthcare professionals.",
  CONTACT: "Contact our healthcare team for questions about our services, appointments, or to request more information. We're here to help with all your home healthcare needs.",
  ABOUT: "Learn about CarePlus's mission, our dedicated healthcare team, and our commitment to providing exceptional home healthcare services."
};

// Feature Lists
export const HOME_CARE_FEATURES = [
  "Comprehensive health assessment",
  "Medication management and administration",
  "Vital signs monitoring",
  "Treatment and care plan development"
];

export const ONLINE_CONSULTATION_FEATURES = [
  "Secure video consultation platform",
  "Prescription renewal if needed",
  "Medical advice and guidance",
  "Follow-up communication"
];

export const SPECIALIZED_CARE_FEATURES = [
  "Specialized treatment protocols",
  "Advanced equipment and techniques",
  "Personalized recovery plans",
  "Coordination with specialists"
];
