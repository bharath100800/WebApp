import { 
  type User, type InsertUser, users,
  type Service, type InsertService, services,
  type Appointment, type InsertAppointment, appointments,
  type BlogPost, type InsertBlogPost, blogPosts,
  type ContactMessage, type InsertContactMessage, contactMessages,
  type TimeSlot, type InsertTimeSlot, timeSlots,
  type Testimonial, type InsertTestimonial, testimonials
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Service methods
  getServices(): Promise<Service[]>;
  getServiceById(id: number): Promise<Service | undefined>;
  getServicesByCategory(category: string): Promise<Service[]>;
  createService(service: InsertService): Promise<Service>;
  
  // Appointment methods
  getAppointments(): Promise<Appointment[]>;
  getAppointmentById(id: number): Promise<Appointment | undefined>;
  getAppointmentsByEmail(email: string): Promise<Appointment[]>;
  createAppointment(appointment: InsertAppointment): Promise<Appointment>;
  updateAppointmentStatus(id: number, status: string): Promise<Appointment | undefined>;
  
  // Blog post methods
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPostById(id: number): Promise<BlogPost | undefined>;
  getBlogPostsByCategory(category: string): Promise<BlogPost[]>;
  createBlogPost(blogPost: InsertBlogPost): Promise<BlogPost>;
  
  // Contact message methods
  getContactMessages(): Promise<ContactMessage[]>;
  createContactMessage(contactMessage: InsertContactMessage): Promise<ContactMessage>;
  
  // Time slot methods
  getTimeSlots(date: Date): Promise<TimeSlot[]>;
  getAvailableTimeSlots(date: Date): Promise<TimeSlot[]>;
  createTimeSlot(timeSlot: InsertTimeSlot): Promise<TimeSlot>;
  updateTimeSlotAvailability(id: number, available: boolean): Promise<TimeSlot | undefined>;
  
  // Testimonial methods
  getTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private services: Map<number, Service>;
  private appointments: Map<number, Appointment>;
  private blogPosts: Map<number, BlogPost>;
  private contactMessages: Map<number, ContactMessage>;
  private timeSlots: Map<number, TimeSlot>;
  private testimonials: Map<number, Testimonial>;
  
  private userId: number;
  private serviceId: number;
  private appointmentId: number;
  private blogPostId: number;
  private contactMessageId: number;
  private timeSlotId: number;
  private testimonialId: number;

  constructor() {
    this.users = new Map();
    this.services = new Map();
    this.appointments = new Map();
    this.blogPosts = new Map();
    this.contactMessages = new Map();
    this.timeSlots = new Map();
    this.testimonials = new Map();
    
    this.userId = 1;
    this.serviceId = 1;
    this.appointmentId = 1;
    this.blogPostId = 1;
    this.contactMessageId = 1;
    this.timeSlotId = 1;
    this.testimonialId = 1;
    
    // Initialize with sample data
    this.initializeServices();
    this.initializeBlogPosts();
    this.initializeTimeSlots();
    this.initializeTestimonials();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Service methods
  async getServices(): Promise<Service[]> {
    return Array.from(this.services.values());
  }

  async getServiceById(id: number): Promise<Service | undefined> {
    return this.services.get(id);
  }

  async getServicesByCategory(category: string): Promise<Service[]> {
    return Array.from(this.services.values()).filter(
      (service) => service.category === category,
    );
  }

  async createService(insertService: InsertService): Promise<Service> {
    const id = this.serviceId++;
    const service: Service = { ...insertService, id };
    this.services.set(id, service);
    return service;
  }

  // Appointment methods
  async getAppointments(): Promise<Appointment[]> {
    return Array.from(this.appointments.values());
  }

  async getAppointmentById(id: number): Promise<Appointment | undefined> {
    return this.appointments.get(id);
  }

  async getAppointmentsByEmail(email: string): Promise<Appointment[]> {
    return Array.from(this.appointments.values()).filter(
      (appointment) => appointment.email === email,
    );
  }

  async createAppointment(insertAppointment: InsertAppointment): Promise<Appointment> {
    const id = this.appointmentId++;
    const appointment: Appointment = { ...insertAppointment, id, status: "pending" };
    this.appointments.set(id, appointment);
    
    // Update the time slot availability
    const date = new Date(appointment.date);
    const timeSlots = await this.getTimeSlots(date);
    const timeSlot = timeSlots.find(slot => {
      const slotDate = new Date(slot.date);
      return slotDate.getHours() === date.getHours() && 
             slotDate.getMinutes() === date.getMinutes();
    });
    
    if (timeSlot) {
      await this.updateTimeSlotAvailability(timeSlot.id, false);
    }
    
    return appointment;
  }

  async updateAppointmentStatus(id: number, status: string): Promise<Appointment | undefined> {
    const appointment = this.appointments.get(id);
    if (!appointment) return undefined;
    
    const updatedAppointment = { ...appointment, status };
    this.appointments.set(id, updatedAppointment);
    return updatedAppointment;
  }

  // Blog post methods
  async getBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values());
  }

  async getBlogPostById(id: number): Promise<BlogPost | undefined> {
    return this.blogPosts.get(id);
  }

  async getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values()).filter(
      (blogPost) => blogPost.category === category,
    );
  }

  async createBlogPost(insertBlogPost: InsertBlogPost): Promise<BlogPost> {
    const id = this.blogPostId++;
    const blogPost: BlogPost = { ...insertBlogPost, id };
    this.blogPosts.set(id, blogPost);
    return blogPost;
  }

  // Contact message methods
  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values());
  }

  async createContactMessage(insertContactMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = this.contactMessageId++;
    const contactMessage: ContactMessage = { 
      ...insertContactMessage, 
      id, 
      createdAt: new Date() 
    };
    this.contactMessages.set(id, contactMessage);
    return contactMessage;
  }

  // Time slot methods
  async getTimeSlots(date: Date): Promise<TimeSlot[]> {
    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0);
    
    const nextDate = new Date(targetDate);
    nextDate.setDate(nextDate.getDate() + 1);
    
    return Array.from(this.timeSlots.values()).filter(
      (timeSlot) => {
        const slotDate = new Date(timeSlot.date);
        return slotDate >= targetDate && slotDate < nextDate;
      }
    );
  }

  async getAvailableTimeSlots(date: Date): Promise<TimeSlot[]> {
    const slots = await this.getTimeSlots(date);
    return slots.filter(slot => slot.available);
  }

  async createTimeSlot(insertTimeSlot: InsertTimeSlot): Promise<TimeSlot> {
    const id = this.timeSlotId++;
    const timeSlot: TimeSlot = { ...insertTimeSlot, id };
    this.timeSlots.set(id, timeSlot);
    return timeSlot;
  }

  async updateTimeSlotAvailability(id: number, available: boolean): Promise<TimeSlot | undefined> {
    const timeSlot = this.timeSlots.get(id);
    if (!timeSlot) return undefined;
    
    const updatedTimeSlot = { ...timeSlot, available };
    this.timeSlots.set(id, updatedTimeSlot);
    return updatedTimeSlot;
  }

  // Testimonial methods
  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.testimonialId++;
    const testimonial: Testimonial = { ...insertTestimonial, id };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }

  // Initialize sample data
  private initializeServices() {
    const sampleServices: InsertService[] = [
      {
        title: "In-Home Nursing Care",
        description: "Professional nursing services including medication administration, wound care, vital monitoring, and more.",
        imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
        category: "in_home_visit",
        duration: 60,
      },
      {
        title: "Telehealth Consultations",
        description: "Virtual consultations with healthcare providers through secure video technology from your home.",
        imageUrl: "https://images.unsplash.com/photo-1576089172869-4f5f6f315620?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
        category: "online_consultation",
        duration: 30,
      },
      {
        title: "In-Home Physical Therapy",
        description: "Specialized physical therapy services to improve mobility, strength, and overall function.",
        imageUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
        category: "specialized_care",
        duration: 45,
      },
      {
        title: "Elder Care Services",
        description: "Compassionate care for seniors, including assistance with daily activities and medication management.",
        imageUrl: "https://images.unsplash.com/photo-1574279606130-09958dc756f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
        category: "in_home_visit",
        duration: 120,
      },
      {
        title: "Medical Equipment & Supplies",
        description: "Delivery and setup of necessary medical equipment and supplies for home healthcare needs.",
        imageUrl: "https://images.unsplash.com/photo-1583324113626-70df0f4deaab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
        category: "specialized_care",
        duration: 60,
      },
      {
        title: "Health Education & Coaching",
        description: "Personalized education and coaching to help you manage chronic conditions and improve health outcomes.",
        imageUrl: "https://images.unsplash.com/photo-1504439468489-c8920d796a29?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
        category: "online_consultation",
        duration: 45,
      },
    ];

    sampleServices.forEach((service) => this.createService(service));
  }

  private initializeBlogPosts() {
    const sampleBlogPosts: InsertBlogPost[] = [
      {
        title: "Managing Chronic Conditions at Home: A Comprehensive Guide",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor, magna in sodales malesuada, eros nisi finibus lectus, vel suscipit nulla sapien vel magna. Phasellus auctor, magna in sodales malesuada, eros nisi finibus lectus, vel suscipit nulla sapien vel magna.",
        summary: "Learn effective strategies for managing chronic health conditions in the comfort of your own home with our expert tips.",
        imageUrl: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
        category: "healthcare_tips",
        publishedAt: new Date("2023-09-05"),
        author: "Dr. Sarah Johnson",
      },
      {
        title: "The Rise of Telehealth: Benefits and How to Make the Most of Virtual Care",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor, magna in sodales malesuada, eros nisi finibus lectus, vel suscipit nulla sapien vel magna. Phasellus auctor, magna in sodales malesuada, eros nisi finibus lectus, vel suscipit nulla sapien vel magna.",
        summary: "Discover how telehealth is transforming healthcare delivery and how you can benefit from virtual consultations.",
        imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
        category: "telehealth",
        publishedAt: new Date("2023-08-28"),
        author: "Dr. Michael Roberts",
      },
      {
        title: "Essential Tips for Family Caregivers: Support, Resources, and Self-Care",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor, magna in sodales malesuada, eros nisi finibus lectus, vel suscipit nulla sapien vel magna. Phasellus auctor, magna in sodales malesuada, eros nisi finibus lectus, vel suscipit nulla sapien vel magna.",
        summary: "Practical advice for family caregivers on providing effective care while maintaining their own well-being.",
        imageUrl: "https://images.unsplash.com/photo-1521493959102-bdd6677fdd81?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
        category: "caregiving",
        publishedAt: new Date("2023-08-15"),
        author: "Emily Williams, RN",
      },
    ];

    sampleBlogPosts.forEach((blogPost) => this.createBlogPost(blogPost));
  }

  private initializeTimeSlots() {
    // Create time slots for the next 7 days
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (let day = 0; day < 7; day++) {
      const date = new Date(today);
      date.setDate(today.getDate() + day);
      
      // Create slots from 9 AM to 5 PM
      for (let hour = 9; hour <= 17; hour++) {
        if (hour !== 12) { // Skip lunch hour
          const slotDate = new Date(date);
          slotDate.setHours(hour, 0, 0, 0);
          
          this.createTimeSlot({
            time: `${hour > 12 ? hour - 12 : hour}:00 ${hour >= 12 ? 'PM' : 'AM'}`,
            date: slotDate,
            available: Math.random() > 0.3, // Randomly make some slots unavailable
          });
        }
      }
    }
  }

  private initializeTestimonials() {
    const sampleTestimonials: InsertTestimonial[] = [
      {
        name: "Sarah Johnson",
        role: "Post-surgery care patient",
        content: "The care I received from CarePlus has been exceptional. The nurses were professional, compassionate, and really listened to my concerns. Having healthcare professionals come to my home made recovery much more comfortable.",
        rating: 5,
      },
      {
        name: "Michael Roberts",
        role: "Family caregiver",
        content: "As a caregiver for my elderly mother, CarePlus has been a lifesaver. Their telehealth option allows us to get medical advice quickly without the hassle of transportation. The staff is always kind and patient with her.",
        rating: 5,
      },
      {
        name: "David Chen",
        role: "Physical therapy patient",
        content: "The physical therapy services from CarePlus have made a huge difference in my recovery. Having sessions at home meant I could focus on healing without the stress of travel. My therapist was knowledgeable and encouraging.",
        rating: 5,
      },
    ];

    sampleTestimonials.forEach((testimonial) => this.createTestimonial(testimonial));
  }
}

export const storage = new MemStorage();
