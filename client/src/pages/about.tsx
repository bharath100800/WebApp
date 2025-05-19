import { useState } from "react";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle } from "lucide-react";

const AboutPage = () => {
  const [activeTab, setActiveTab] = useState("mission");

  const missionItems = [
    "Provide high-quality healthcare services in the comfort of patients' homes",
    "Make healthcare accessible to those with mobility challenges",
    "Offer flexible scheduling and personalized care plans",
    "Maintain the highest standards of care and professionalism",
    "Foster a supportive, compassionate relationship with every patient"
  ];

  const teamMembers = [
    {
      name: "Dr. Sarah Johnson",
      role: "Medical Director",
      bio: "Dr. Johnson has over 15 years of experience in internal medicine and geriatric care. She oversees all medical aspects of our home healthcare services.",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80"
    },
    {
      name: "Michael Roberts, RN",
      role: "Head Nurse",
      bio: "With 10+ years of experience in home healthcare, Michael leads our nursing team, ensuring all care protocols meet the highest standards.",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80"
    },
    {
      name: "Emily Williams, PT",
      role: "Physical Therapy Director",
      bio: "Emily specializes in rehabilitation therapy and has helped hundreds of patients regain mobility and independence in their homes.",
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80"
    },
    {
      name: "David Chen, MSW",
      role: "Patient Care Coordinator",
      bio: "David works closely with patients and families to create personalized care plans and ensure a seamless healthcare experience.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80"
    }
  ];

  return (
    <>
      <Helmet>
        <title>About Us | CarePlus Home Healthcare</title>
        <meta name="description" content="Learn about CarePlus's mission, our dedicated healthcare team, and our commitment to providing exceptional home healthcare services." />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-primary-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 font-heading mb-6">About CarePlus Home Healthcare</h1>
            <p className="text-lg text-gray-600 mb-8">
              At CarePlus, we're committed to providing exceptional healthcare services in the comfort of your own home. Our team of qualified professionals brings the care you need directly to you.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Sidebar */}
            <div className="lg:col-span-2">
              <img 
                src="https://images.unsplash.com/photo-1576765608866-5b51f8d9f0e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=1000" 
                alt="CarePlus healthcare professional with patient" 
                className="rounded-xl shadow-lg w-full h-auto mb-8"
              />
              
              <div className="bg-primary-50 rounded-xl p-8">
                <h3 className="text-xl font-bold mb-4">Why Choose CarePlus?</h3>
                <ul className="space-y-3">
                  {missionItems.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="text-primary-600 h-5 w-5 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <Tabs defaultValue="mission" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="mission">Our Mission</TabsTrigger>
                  <TabsTrigger value="history">Our History</TabsTrigger>
                  <TabsTrigger value="team">Our Team</TabsTrigger>
                </TabsList>
                
                <TabsContent value="mission" className="mt-6">
                  <h2 className="text-3xl font-bold text-gray-900 font-heading mb-6">Our Mission & Values</h2>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      CarePlus was founded with a clear mission: to provide compassionate, high-quality healthcare in the comfort of patients' homes. We believe that healing happens best in familiar surroundings, and our services are designed to bring professional medical care directly to you.
                    </p>
                    <p className="mb-4">
                      Our core values guide everything we do:
                    </p>
                    <ul className="mb-4">
                      <li><strong>Patient-Centered Care:</strong> We prioritize your unique needs and preferences.</li>
                      <li><strong>Excellence:</strong> We maintain the highest standards in healthcare delivery.</li>
                      <li><strong>Compassion:</strong> We approach every patient with empathy and understanding.</li>
                      <li><strong>Accessibility:</strong> We make quality healthcare available to all who need it.</li>
                      <li><strong>Integrity:</strong> We operate with transparency and ethical principles.</li>
                    </ul>
                    <p>
                      These values aren't just words on a page—they're put into action every day by our dedicated team of healthcare professionals.
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="history" className="mt-6">
                  <h2 className="text-3xl font-bold text-gray-900 font-heading mb-6">Our History</h2>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      CarePlus was established in 2010 by Dr. Sarah Johnson, who recognized the growing need for quality home healthcare services. After years of working in traditional healthcare settings, Dr. Johnson witnessed firsthand how many patients struggled with hospital visits, especially the elderly and those with mobility challenges.
                    </p>
                    <p className="mb-4">
                      What began as a small team of dedicated nurses has grown into a comprehensive home healthcare provider serving thousands of patients across the region. Throughout our growth, we've maintained our commitment to personalized care and building lasting relationships with our patients.
                    </p>
                    <p className="mb-4">
                      Key milestones in our journey:
                    </p>
                    <ul className="mb-4">
                      <li><strong>2010:</strong> CarePlus founded with a focus on basic nursing services</li>
                      <li><strong>2013:</strong> Expanded to include specialized care for chronic conditions</li>
                      <li><strong>2016:</strong> Introduced physical therapy and rehabilitation services</li>
                      <li><strong>2019:</strong> Launched our telehealth consultation platform</li>
                      <li><strong>2022:</strong> Recognized as a leading home healthcare provider in the region</li>
                    </ul>
                    <p>
                      Today, we continue to innovate and expand our services to meet the evolving needs of our community.
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="team" className="mt-6">
                  <h2 className="text-3xl font-bold text-gray-900 font-heading mb-6">Our Healthcare Team</h2>
                  <p className="text-lg text-gray-600 mb-8">
                    Our team consists of licensed healthcare professionals with extensive training and experience in home healthcare.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {teamMembers.map((member, index) => (
                      <div key={index} className="flex flex-col bg-gray-50 rounded-xl overflow-hidden">
                        <img 
                          src={member.image} 
                          alt={member.name} 
                          className="w-full h-64 object-cover"
                        />
                        <div className="p-6">
                          <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                          <p className="text-primary-600 font-medium mb-4">{member.role}</p>
                          <p className="text-gray-600">{member.bio}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 font-heading mb-6">Experience Our Care Firsthand</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Ready to learn more about how our services can support you or your loved ones? Contact us today to discuss your healthcare needs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg">
              <a href="/appointment">Book an Appointment</a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="/contact">Contact Our Team</a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
