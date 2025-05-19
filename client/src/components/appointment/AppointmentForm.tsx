import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { insertAppointmentSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import DatePicker from "./DatePicker";
import TimeSlots from "./TimeSlots";
import ServiceType from "./ServiceType";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

const formSchema = insertAppointmentSchema.extend({
  terms: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms and conditions",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const AppointmentForm = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      reason: "",
      terms: false,
      serviceId: 0,
      date: new Date(),
    },
  });

  const appointmentMutation = useMutation({
    mutationFn: (data: FormValues) => {
      const appointmentData = {
        ...data,
        serviceId: selectedService || 1,
        date: selectedTimeSlot ? new Date(selectedTimeSlot) : selectedDate,
      };
      
      return apiRequest("POST", "/api/appointments", appointmentData);
    },
    onSuccess: () => {
      toast({
        title: "Appointment Booked",
        description: "Your appointment has been successfully scheduled.",
        variant: "default",
      });
      form.reset();
      setSelectedTimeSlot(null);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to book appointment: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormValues) => {
    if (!selectedService) {
      toast({
        title: "Error",
        description: "Please select a service type",
        variant: "destructive",
      });
      return;
    }

    if (!selectedTimeSlot) {
      toast({
        title: "Error",
        description: "Please select an appointment time",
        variant: "destructive",
      });
      return;
    }

    appointmentMutation.mutate(data);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
      <div>
        <h3 className="text-xl font-bold font-heading mb-6">Consultation Types</h3>
        
        <ServiceType selectedService={selectedService} onServiceSelect={setSelectedService} />
        
        <h3 className="text-xl font-bold font-heading mb-6 mt-10">Available Time Slots</h3>
        
        <DatePicker 
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
        />
        
        <TimeSlots 
          selectedDate={selectedDate}
          selectedTimeSlot={selectedTimeSlot}
          onTimeSlotSelect={setSelectedTimeSlot}
        />
      </div>
      
      <div>
        <h3 className="text-xl font-bold font-heading mb-6">Your Information</h3>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="john.doe@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="(123) 456-7890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Home Address</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Main St, City, State, ZIP" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reason for Appointment</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Please describe your symptoms or reason for seeking care"
                      className="resize-none"
                      rows={4}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="terms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      I agree to the <a href="#" className="text-primary-600 hover:underline">Terms of Service</a> and <a href="#" className="text-primary-600 hover:underline">Privacy Policy</a>
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full"
              disabled={appointmentMutation.isPending}
            >
              {appointmentMutation.isPending ? "Processing..." : "Confirm Appointment"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AppointmentForm;
