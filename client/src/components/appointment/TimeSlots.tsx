import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { TimeSlot } from "@shared/schema";

interface TimeSlotsProps {
  selectedDate: Date;
  selectedTimeSlot: number | null;
  onTimeSlotSelect: (id: number) => void;
}

const TimeSlots = ({ selectedDate, selectedTimeSlot, onTimeSlotSelect }: TimeSlotsProps) => {
  const formattedDate = format(selectedDate, 'yyyy-MM-dd');
  
  const { data: timeSlots, isLoading, error } = useQuery<TimeSlot[]>({
    queryKey: [`/api/time-slots/available?date=${formattedDate}`],
  });
  
  return (
    <div className="mb-8">
      <h4 className="font-medium mb-4">Available Times for {format(selectedDate, 'MMM d')}</h4>
      
      {isLoading ? (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {[...Array(8)].map((_, index) => (
            <Skeleton key={index} className="h-10" />
          ))}
        </div>
      ) : error ? (
        <p className="text-red-500">Failed to load available time slots.</p>
      ) : timeSlots?.length === 0 ? (
        <p className="text-gray-500">No available time slots for this date. Please select another date.</p>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {timeSlots?.map((slot) => (
            <button
              key={slot.id}
              className={`py-2 px-3 border rounded-lg text-center transition 
                ${selectedTimeSlot === slot.id 
                  ? 'border-primary-600 bg-primary-50 text-primary-700' 
                  : 'border-gray-200 hover:border-primary-600 hover:bg-primary-50'
                }
                ${!slot.available ? 'opacity-50 cursor-not-allowed' : ''}
              `}
              onClick={() => slot.available && onTimeSlotSelect(slot.id)}
              disabled={!slot.available}
            >
              {slot.time}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TimeSlots;
