import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { format } from 'date-fns';
import { InsertAppointment, TimeSlot, Service } from '@shared/schema';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/lib/utils/constants';

export interface UseAppointmentProps {
  defaultDate?: Date;
}

export function useAppointment({ defaultDate = new Date() }: UseAppointmentProps = {}) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // State for appointment form
  const [selectedDate, setSelectedDate] = useState<Date>(defaultDate);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [selectedServiceCategory, setSelectedServiceCategory] = useState<string>("in_home_visit");
  
  // Format date for API calls
  const formattedDate = format(selectedDate, 'yyyy-MM-dd');
  
  // Query available time slots
  const {
    data: timeSlots,
    isLoading: isSlotsLoading,
    error: slotsError
  } = useQuery<TimeSlot[]>({
    queryKey: [`/api/time-slots/available?date=${formattedDate}`],
  });
  
  // Query services by category
  const {
    data: categoryServices,
    isLoading: isServicesLoading,
    error: servicesError
  } = useQuery<Service[]>({
    queryKey: [`/api/services/category/${selectedServiceCategory}`],
  });
  
  // Mutation for booking an appointment
  const appointmentMutation = useMutation({
    mutationFn: (appointmentData: InsertAppointment) => {
      return apiRequest("POST", "/api/appointments", appointmentData);
    },
    onSuccess: () => {
      toast({
        title: "Appointment Booked",
        description: SUCCESS_MESSAGES.APPOINTMENT_BOOKED,
        variant: "default",
      });
      
      // Reset form state
      setSelectedTimeSlot(null);
      
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: [`/api/time-slots/available?date=${formattedDate}`] });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: `${ERROR_MESSAGES.APPOINTMENT.SUBMISSION_FAILED} ${error.message}`,
        variant: "destructive",
      });
    }
  });
  
  // Validate and submit appointment
  const submitAppointment = (formData: Omit<InsertAppointment, 'serviceId' | 'date'>) => {
    // Validate service selection
    if (!selectedService) {
      toast({
        title: "Error",
        description: ERROR_MESSAGES.APPOINTMENT.SERVICE_REQUIRED,
        variant: "destructive",
      });
      return false;
    }
    
    // Validate time slot selection
    if (!selectedTimeSlot) {
      toast({
        title: "Error",
        description: ERROR_MESSAGES.APPOINTMENT.TIME_REQUIRED,
        variant: "destructive",
      });
      return false;
    }
    
    // Find the time slot object to get the actual date
    const timeSlot = timeSlots?.find(slot => slot.id === selectedTimeSlot);
    if (!timeSlot) {
      toast({
        title: "Error",
        description: "Selected time slot is no longer available.",
        variant: "destructive",
      });
      return false;
    }
    
    // Submit the appointment with the selected service and time
    const appointmentData: InsertAppointment = {
      ...formData,
      serviceId: selectedService,
      date: new Date(timeSlot.date)
    };
    
    appointmentMutation.mutate(appointmentData);
    return true;
  };
  
  // Get first service from category as default
  const defaultService = categoryServices && categoryServices.length > 0 ? categoryServices[0] : null;
  
  return {
    // State
    selectedDate,
    selectedTimeSlot,
    selectedService: selectedService || (defaultService?.id || null),
    selectedServiceCategory,
    
    // Setters
    setSelectedDate,
    setSelectedTimeSlot,
    setSelectedService,
    setSelectedServiceCategory,
    
    // Data
    timeSlots,
    categoryServices,
    
    // Loading states
    isSlotsLoading,
    isServicesLoading,
    isSubmitting: appointmentMutation.isPending,
    
    // Errors
    slotsError,
    servicesError,
    
    // Actions
    submitAppointment
  };
}

export default useAppointment;
