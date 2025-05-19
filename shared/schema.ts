import { pgTable, text, serial, integer, boolean, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  phone: text("phone"),
  address: text("address"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  firstName: true,
  lastName: true,
  phone: true,
  address: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Service categories
export const serviceTypeEnum = pgEnum('service_type', [
  'in_home_visit',
  'online_consultation',
  'specialized_care'
]);

// Services schema
export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  category: serviceTypeEnum("category").notNull(),
  duration: integer("duration").notNull(), // in minutes
});

export const insertServiceSchema = createInsertSchema(services).pick({
  title: true,
  description: true,
  imageUrl: true,
  category: true,
  duration: true,
});

export type InsertService = z.infer<typeof insertServiceSchema>;
export type Service = typeof services.$inferSelect;

// Appointment schema
export const appointments = pgTable("appointments", {
  id: serial("id").primaryKey(),
  serviceId: integer("service_id").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  address: text("address").notNull(),
  date: timestamp("date").notNull(),
  reason: text("reason"),
  status: text("status").notNull().default("pending"), // pending, confirmed, cancelled
});

export const insertAppointmentSchema = createInsertSchema(appointments).pick({
  serviceId: true,
  firstName: true,
  lastName: true,
  email: true,
  phone: true,
  address: true,
  date: true,
  reason: true,
});

export type InsertAppointment = z.infer<typeof insertAppointmentSchema>;
export type Appointment = typeof appointments.$inferSelect;

// Blog post schema
export const blogCategories = pgEnum('blog_category', [
  'healthcare_tips',
  'telehealth',
  'caregiving',
  'medical_research',
  'news'
]);

export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  summary: text("summary").notNull(),
  imageUrl: text("image_url"),
  category: blogCategories("category").notNull(),
  publishedAt: timestamp("published_at").notNull().defaultNow(),
  author: text("author").notNull(),
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).pick({
  title: true,
  content: true,
  summary: true,
  imageUrl: true,
  category: true,
  publishedAt: true,
  author: true,
});

export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;

// Contact messages schema
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).pick({
  name: true,
  email: true,
  phone: true,
  subject: true,
  message: true,
});

export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;

// Available Time Slots
export const timeSlots = pgTable("time_slots", {
  id: serial("id").primaryKey(),
  time: text("time").notNull(), // Stored as string like "09:00"
  date: timestamp("date").notNull(),
  available: boolean("available").notNull().default(true),
});

export const insertTimeSlotSchema = createInsertSchema(timeSlots).pick({
  time: true,
  date: true,
  available: true,
});

export type InsertTimeSlot = z.infer<typeof insertTimeSlotSchema>;
export type TimeSlot = typeof timeSlots.$inferSelect;

// Testimonials
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  content: text("content").notNull(),
  rating: integer("rating").notNull(),
});

export const insertTestimonialSchema = createInsertSchema(testimonials).pick({
  name: true,
  role: true,
  content: true,
  rating: true,
});

export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type Testimonial = typeof testimonials.$inferSelect;
