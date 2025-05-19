import { useState } from "react";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "wouter";
import { Mail, Phone, ArrowRight, Star, GraduationCap, Clock, Award, Stethoscope } from "lucide-react";

// Define professional team members with more detailed information
const professionals = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    role: "Medical Director",
    category: "doctors",
    specialty: "Internal Medicine",
    experience: "15+ years",
    education: "M.D. from Johns Hopkins University",
    certifications: ["American Board of Internal Medicine", "Geriatric Medicine Certification"],
    bio: "Dr. Johnson has over 15 years of experience in internal medicine and geriatric care. She oversees all medical aspects of our home healthcare services and is passionate about improving healthcare accessibility for all patients.",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=700&q=80",
    availableForOnline: true,
    languages: ["English", "Spanish"]
  },
  {
    id: 2,
    name: "Michael Roberts",
    role: "Head Nurse",
    category: "nurses",
    specialty: "Geriatric Nursing",
    experience: "10+ years",
    education: "BSN from University of California",
    certifications: ["Registered Nurse (RN)", "Certified Geriatric Nurse"],
    bio: "With over a decade of experience in home healthcare, Michael leads our nursing team, ensuring all care protocols meet the highest standards. He specializes in geriatric care and chronic disease management.",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=700&q=80",
    availableForOnline: true,
    languages: ["English"]
  },
  {
    id: 3,
    name: "Emily Williams",
    role: "Physical Therapy Director",
    category: "therapists",
    specialty: "Rehabilitation Therapy",
    experience: "12+ years",
    education: "DPT from Northwestern University",
    certifications: ["Licensed Physical Therapist", "Orthopedic Specialist Certification"],
    bio: "Emily specializes in rehabilitation therapy and has helped hundreds of patients regain mobility and independence in their homes. She develops customized physical therapy programs for patients with varying mobility challenges.",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=700&q=80",
    availableForOnline: false,
    languages: ["English", "French"]
  },
  {
    id: 4,
    name: "Dr. James Chen",
    role: "Telehealth Specialist",
    category: "doctors",
    specialty: "Family Medicine",
    experience: "8+ years",
    education: "M.D. from Stanford University",
    certifications: ["American Board of Family Medicine", "Telehealth Certification"],
    bio: "Dr. Chen specializes in telehealth consultations, making healthcare accessible to patients unable to travel. He has pioneered several telehealth protocols and believes in leveraging technology to improve patient outcomes.",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=700&q=80",
    availableForOnline: true,
    languages: ["English", "Mandarin"]
  },
  {
    id: 5,
    name: "Rebecca Martinez",
    role: "Occupational Therapist",
    category: "therapists",
    specialty: "Activities of Daily Living",
    experience: "7+ years",
    education: "OTD from Boston University",
    certifications: ["Registered Occupational Therapist", "Home Modification Specialist"],
    bio: "Rebecca helps patients regain independence in daily activities. She specializes in adapting home environments to accommodate patients' unique needs and abilities, making daily life safer and more manageable.",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=700&q=80",
    availableForOnline: true,
    languages: ["English", "Spanish"]
  },
  {
    id: 6,
    name: "Nurse Robert Thompson",
    role: "Specialized Care Nurse",
    category: "nurses",
    specialty: "Wound Care & Diabetes Management",
    experience: "9+ years",
    education: "BSN from University of Michigan",
    certifications: ["Registered Nurse (RN)", "Wound Care Certification", "Diabetes Educator"],
    bio: "Robert specializes in wound care and diabetes management. His expertise ensures patients with complex medical needs receive the specialized attention required for optimal healing and health management.",
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=700&q=80",
    availableForOnline: false,
    languages: ["English"]
  },
  {
    id: 7,
    name: "Dr. Amelia Patel",
    role: "Geriatric Specialist",
    category: "doctors",
    specialty: "Geriatric Medicine",
    experience: "14+ years",
    education: "M.D. from Yale School of Medicine",
    certifications: ["American Board of Internal Medicine", "Geriatric Medicine Certification"],
    bio: "Dr. Patel specializes in the unique healthcare needs of elderly patients. Her holistic approach to senior care addresses both medical and quality of life aspects, helping patients maintain independence while managing age-related conditions.",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=700&q=80",
    availableForOnline: true,
    languages: ["English", "Hindi", "Gujarati"]
  },
  {
    id: 8,
    name: "Thomas Wilson",
    role: "Speech Therapist",
    category: "therapists",
    specialty: "Communication Disorders",
    experience: "6+ years",
    education: "MS in Speech-Language Pathology from USC",
    certifications: ["Licensed Speech-Language Pathologist", "Swallowing Disorders Specialist"],
    bio: "Thomas helps patients overcome communication disorders and swallowing difficulties. His expertise is particularly vital for stroke recovery patients and those with neurological conditions affecting speech and swallowing.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=700&q=80",
    availableForOnline: true,
    languages: ["English"]
  }
];

const ProfessionalCard = ({ professional }: { professional: typeof professionals[0] }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
      <div className="relative">
        <img 
          src={professional.image} 
          alt={professional.name} 
          className="w-full h-[300px] object-cover"
        />
        {professional.availableForOnline && (
          <div className="absolute top-4 right-4 bg-primary-600 text-white text-xs px-3 py-1 rounded-full">
            Available Online
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-1">{professional.name}</h3>
        <p className="text-primary-600 font-medium mb-2">{professional.role}</p>
        <p className="text-gray-600 mb-4 text-sm">
          <span className="font-medium">Specialty:</span> {professional.specialty} • <span className="font-medium">Experience:</span> {professional.experience}
        </p>
        <p className="text-gray-600 mb-4 line-clamp-3">{professional.bio}</p>
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <Link 
              href={`/professionals/${professional.id}`} 
              className="text-primary-600 text-sm font-medium flex items-center gap-1 hover:text-primary-700"
            >
              View Profile
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <Link href={`/appointment?professional=${professional.id}`}>
            <Button size="sm">Book Appointment</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const ProfessionalsPage = () => {
  const [activeTab, setActiveTab] = useState("all");

  // Filter professionals based on active tab
  const filteredProfessionals = activeTab === "all" 
    ? professionals 
    : professionals.filter(p => p.category === activeTab);

  // Get counts for each category
  const counts = {
    all: professionals.length,
    doctors: professionals.filter(p => p.category === "doctors").length,
    nurses: professionals.filter(p => p.category === "nurses").length,
    therapists: professionals.filter(p => p.category === "therapists").length,
  };

  return (
    <>
      <Helmet>
        <title>Our Healthcare Professionals | CarePlus</title>
        <meta name="description" content="Meet our team of qualified healthcare professionals, including doctors, nurses, and therapists dedicated to providing exceptional care in your home or through online consultations." />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-primary-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 font-heading mb-6">Our Healthcare Professionals</h1>
            <p className="text-lg text-gray-600 mb-8">
              Meet our team of qualified healthcare experts dedicated to providing exceptional care. 
              Each professional brings specialized skills and compassionate service to meet your unique needs.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Our Professionals */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex items-start gap-3">
              <div className="bg-primary-100 text-primary-700 w-12 h-12 flex items-center justify-center rounded-full shrink-0">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold mb-2">Highly Qualified</h3>
                <p className="text-gray-600 text-sm">All our professionals have advanced degrees and certifications in their fields</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-primary-100 text-primary-700 w-12 h-12 flex items-center justify-center rounded-full shrink-0">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold mb-2">Experienced</h3>
                <p className="text-gray-600 text-sm">Our team brings years of practical experience in varied healthcare settings</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-primary-100 text-primary-700 w-12 h-12 flex items-center justify-center rounded-full shrink-0">
                <Award className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold mb-2">Continuously Trained</h3>
                <p className="text-gray-600 text-sm">We ensure all staff receive ongoing education in the latest healthcare practices</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-primary-100 text-primary-700 w-12 h-12 flex items-center justify-center rounded-full shrink-0">
                <Stethoscope className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold mb-2">Specialized Expertise</h3>
                <p className="text-gray-600 text-sm">Each professional brings specialized knowledge to address specific health conditions</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professionals Directory */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {/* Filtering Tabs */}
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-12">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All ({counts.all})</TabsTrigger>
              <TabsTrigger value="doctors">Doctors ({counts.doctors})</TabsTrigger>
              <TabsTrigger value="nurses">Nurses ({counts.nurses})</TabsTrigger>
              <TabsTrigger value="therapists">Therapists ({counts.therapists})</TabsTrigger>
            </TabsList>
          </Tabs>
          
          {/* Professional Cards */}
          {filteredProfessionals.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProfessionals.map(professional => (
                <ProfessionalCard key={professional.id} professional={professional} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No professionals found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Join Our Team CTA */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 font-heading mb-6">Interested in Joining Our Team?</h2>
              <p className="text-lg text-gray-600 mb-8">
                We're always looking for talented healthcare professionals who are passionate about providing exceptional care. 
                If you're interested in joining our team, we'd love to hear from you.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <Mail className="text-primary-600 h-5 w-5" />
                  <span>Send your resume to <a href="mailto:careers@careplus.com" className="text-primary-600 hover:underline">careers@careplus.com</a></span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="text-primary-600 h-5 w-5" />
                  <span>Call us at <a href="tel:+18005551234" className="text-primary-600 hover:underline">(800) 555-1234</a> ext. 5</span>
                </div>
              </div>
              <Button asChild size="lg">
                <Link href="/contact?subject=careers">Contact HR Department</Link>
              </Button>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1544027993-37dbfe43562a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                alt="Healthcare team meeting" 
                className="rounded-xl shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfessionalsPage;