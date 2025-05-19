import { useQuery } from "@tanstack/react-query";
import { Testimonial } from "@shared/schema";
import { Star, User } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <div className="gradient-card rounded-xl p-8 shadow-md relative overflow-hidden group">
      {/* Decorative elements */}
      <div className="absolute -top-10 -right-10 w-20 h-20 bg-primary-100 rounded-full transition-transform duration-500 group-hover:scale-150"></div>
      <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-secondary-100 rounded-full transition-transform duration-500 group-hover:scale-150"></div>
      
      <div className="relative z-10">
        <div className="flex text-accent mb-4">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="h-5 w-5 fill-current" />
          ))}
        </div>
        <p className="text-gray-600 mb-6 relative">
          <span className="text-5xl absolute -top-6 -left-2 opacity-20 text-primary-400">"</span>
          <span className="relative">{testimonial.content}</span>
          <span className="text-5xl absolute -bottom-10 -right-2 opacity-20 text-primary-400">"</span>
        </p>
        <div className="flex items-center">
          <div className="bg-secondary-100 w-12 h-12 rounded-full flex items-center justify-center text-secondary-500 mr-4 shadow-sm">
            <User className="h-6 w-6" />
          </div>
          <div>
            <h4 className="font-medium text-primary-800">{testimonial.name}</h4>
            <p className="text-sm text-primary-600">{testimonial.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const TestimonialCardSkeleton = () => (
  <div className="bg-white rounded-xl p-8 shadow-sm">
    <div className="flex mb-4">
      <Skeleton className="h-5 w-5 mr-1" />
      <Skeleton className="h-5 w-5 mr-1" />
      <Skeleton className="h-5 w-5 mr-1" />
      <Skeleton className="h-5 w-5 mr-1" />
      <Skeleton className="h-5 w-5" />
    </div>
    <Skeleton className="h-4 w-full mb-2" />
    <Skeleton className="h-4 w-full mb-2" />
    <Skeleton className="h-4 w-3/4 mb-6" />
    <div className="flex items-center">
      <Skeleton className="w-12 h-12 rounded-full mr-4" />
      <div>
        <Skeleton className="h-4 w-24 mb-2" />
        <Skeleton className="h-3 w-32" />
      </div>
    </div>
  </div>
);

const Testimonials = () => {
  const { data: testimonials, isLoading, error } = useQuery<Testimonial[]>({
    queryKey: ['/api/testimonials'],
  });

  return (
    <section className="py-16 bg-primary-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 font-heading mb-4">What Our Patients Say</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Read about experiences from people who have benefited from our home healthcare services.
          </p>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <TestimonialCardSkeleton key={index} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-500">Failed to load testimonials. Please try again later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials?.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
