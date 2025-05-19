import { 
  Stethoscope, 
  Video, 
  CalendarClock, 
  Home, 
  HeartPulse, 
  Clock 
} from "lucide-react";

const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description,
  colorClass = "bg-primary-100 text-primary-700" 
}: { 
  icon: React.ElementType; 
  title: string; 
  description: string;
  colorClass?: string;
}) => {
  return (
    <div className="gradient-card rounded-xl p-8 transition hover:shadow-lg">
      <div className={`${colorClass} w-14 h-14 flex items-center justify-center rounded-full mb-6`}>
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-xl font-bold font-heading mb-3">{title}</h3>
      <p className="text-gray-600">
        {description}
      </p>
    </div>
  );
};

const Features = () => {
  const features = [
    {
      icon: Stethoscope,
      title: "Qualified Professionals",
      description: "Our team consists of certified healthcare professionals with years of experience providing quality care.",
      colorClass: "bg-primary-100 text-primary-700"
    },
    {
      icon: Video,
      title: "Online Consultations",
      description: "Can't make it in person? Connect with our healthcare providers through secure video consultations.",
      colorClass: "bg-secondary-100 text-secondary-700"
    },
    {
      icon: CalendarClock,
      title: "Flexible Scheduling",
      description: "Book appointments at times that suit your schedule, including evenings and weekends.",
      colorClass: "bg-accent/20 text-accent"
    },
    {
      icon: Home,
      title: "Comfortable Environment",
      description: "Receive care in the familiar and comfortable environment of your own home.",
      colorClass: "bg-primary-100 text-primary-700"
    },
    {
      icon: HeartPulse,
      title: "Personalized Care Plans",
      description: "We develop customized care plans tailored to your specific health needs and goals.",
      colorClass: "bg-secondary-100 text-secondary-700"
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Our support team is available 24/7 to address any concerns or questions you may have.",
      colorClass: "bg-accent/20 text-accent"
    }
  ];

  return (
    <section className="py-16 bg-white relative">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary-200 rounded-full"></div>
        <div className="absolute bottom-1/3 right-1/3 w-40 h-40 bg-secondary-300 rounded-full"></div>
        <div className="absolute bottom-1/4 left-1/2 w-24 h-24 bg-accent/30 rounded-full"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text font-heading mb-4">Why Choose Our Home Healthcare Services?</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We provide comprehensive healthcare solutions tailored to meet your specific needs, right in the comfort of your own home.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index} 
              icon={feature.icon} 
              title={feature.title} 
              description={feature.description} 
              colorClass={feature.colorClass}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
