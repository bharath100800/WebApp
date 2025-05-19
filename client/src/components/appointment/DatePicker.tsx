import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { format, addMonths, isAfter, isBefore, startOfDay } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DatePickerProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

const DatePicker = ({ selectedDate, onDateSelect }: DatePickerProps) => {
  const today = startOfDay(new Date());
  const threeMonthsFromNow = addMonths(today, 3);
  
  const [month, setMonth] = useState<Date>(today);
  
  const handlePreviousMonth = () => {
    const previousMonth = new Date(month);
    previousMonth.setMonth(previousMonth.getMonth() - 1);
    
    if (!isBefore(previousMonth, today)) {
      setMonth(previousMonth);
    }
  };
  
  const handleNextMonth = () => {
    const nextMonth = new Date(month);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    
    if (!isAfter(nextMonth, threeMonthsFromNow)) {
      setMonth(nextMonth);
    }
  };
  
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-medium">{format(month, 'MMMM yyyy')}</h4>
        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handlePreviousMonth}
            disabled={isBefore(new Date(month.getFullYear(), month.getMonth(), 1), today)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleNextMonth}
            disabled={isAfter(new Date(month.getFullYear(), month.getMonth() + 1, 0), threeMonthsFromNow)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={(date) => date && onDateSelect(date)}
        month={month}
        onMonthChange={setMonth}
        disabled={(date) => 
          isBefore(date, today) || 
          isAfter(date, threeMonthsFromNow) || 
          date.getDay() === 0 // Disable Sundays
        }
        className="rounded-md border"
      />
    </div>
  );
};

export default DatePicker;
