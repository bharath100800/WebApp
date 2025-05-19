import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertAppointmentSchema,
  insertContactMessageSchema
} from "@shared/schema";
import { z } from "zod";
import { format } from "date-fns";

export async function registerRoutes(app: Express): Promise<Server> {
  // Services routes
  app.get("/api/services", async (req, res) => {
    try {
      const services = await storage.getServices();
      res.json(services);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch services" });
    }
  });

  app.get("/api/services/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid service ID" });
      }
      
      const service = await storage.getServiceById(id);
      if (!service) {
        return res.status(404).json({ error: "Service not found" });
      }
      
      res.json(service);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch service" });
    }
  });

  app.get("/api/services/category/:category", async (req, res) => {
    try {
      const category = req.params.category;
      const services = await storage.getServicesByCategory(category);
      res.json(services);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch services by category" });
    }
  });

  // Blog post routes
  app.get("/api/blog-posts", async (req, res) => {
    try {
      const blogPosts = await storage.getBlogPosts();
      res.json(blogPosts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/blog-posts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid blog post ID" });
      }
      
      const blogPost = await storage.getBlogPostById(id);
      if (!blogPost) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      
      res.json(blogPost);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blog post" });
    }
  });

  app.get("/api/blog-posts/category/:category", async (req, res) => {
    try {
      const category = req.params.category;
      const blogPosts = await storage.getBlogPostsByCategory(category);
      res.json(blogPosts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blog posts by category" });
    }
  });

  // Appointment routes
  app.post("/api/appointments", async (req, res) => {
    try {
      const appointmentData = insertAppointmentSchema.parse(req.body);
      const appointment = await storage.createAppointment(appointmentData);
      res.status(201).json(appointment);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create appointment" });
    }
  });

  app.get("/api/appointments/user/:email", async (req, res) => {
    try {
      const email = req.params.email;
      const appointments = await storage.getAppointmentsByEmail(email);
      res.json(appointments);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch appointments" });
    }
  });

  // Time slot routes
  app.get("/api/time-slots", async (req, res) => {
    try {
      const dateStr = req.query.date as string;
      if (!dateStr) {
        return res.status(400).json({ error: "Date parameter is required" });
      }
      
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) {
        return res.status(400).json({ error: "Invalid date format" });
      }
      
      const timeSlots = await storage.getTimeSlots(date);
      res.json(timeSlots);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch time slots" });
    }
  });

  app.get("/api/time-slots/available", async (req, res) => {
    try {
      const dateStr = req.query.date as string;
      if (!dateStr) {
        return res.status(400).json({ error: "Date parameter is required" });
      }
      
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) {
        return res.status(400).json({ error: "Invalid date format" });
      }
      
      const availableTimeSlots = await storage.getAvailableTimeSlots(date);
      res.json(availableTimeSlots);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch available time slots" });
    }
  });

  // Contact message routes
  app.post("/api/contact", async (req, res) => {
    try {
      const contactData = insertContactMessageSchema.parse(req.body);
      const contactMessage = await storage.createContactMessage(contactData);
      res.status(201).json(contactMessage);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create contact message" });
    }
  });

  // Testimonials routes
  app.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials = await storage.getTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch testimonials" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
