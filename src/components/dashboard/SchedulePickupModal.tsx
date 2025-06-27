
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { CalendarIcon, Clock, Loader2 } from "lucide-react";
import { format } from "date-fns";

interface SchedulePickupModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SchedulePickupModal: React.FC<SchedulePickupModalProps> = ({
  open,
  onOpenChange
}) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [formData, setFormData] = useState({
    time: '',
    address: '',
    items: '',
    notes: '',
    zapierWebhook: ''
  });

  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00',
    '14:00', '15:00', '16:00', '17:00'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !formData.time || !formData.address) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const pickupData = {
        date: format(selectedDate, 'yyyy-MM-dd'),
        time: formData.time,
        address: formData.address,
        items: formData.items,
        notes: formData.notes,
        timestamp: new Date().toISOString(),
        source: 'Pick & Give Dashboard'
      };

      // If user provided a Zapier webhook, use it
      if (formData.zapierWebhook) {
        const response = await fetch(formData.zapierWebhook, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          mode: "no-cors",
          body: JSON.stringify(pickupData),
        });

        toast({
          title: "Pickup Scheduled",
          description: "Your pickup has been scheduled successfully. You'll receive a confirmation soon.",
        });
      } else {
        // Fallback: Create a Google Calendar event URL
        const startDateTime = new Date(`${format(selectedDate, 'yyyy-MM-dd')}T${formData.time}:00`);
        const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000); // 1 hour later

        const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent('Pick & Give Pickup')}&dates=${startDateTime.toISOString().replace(/[-:]/g, '').split('.')[0]}Z/${endDateTime.toISOString().replace(/[-:]/g, '').split('.')[0]}Z&details=${encodeURIComponent(`Items: ${formData.items}\nAddress: ${formData.address}\nNotes: ${formData.notes}`)}&location=${encodeURIComponent(formData.address)}`;

        window.open(calendarUrl, '_blank');

        toast({
          title: "Calendar Event Created",
          description: "A Google Calendar event has been created. Please add your Zapier webhook for automated scheduling.",
        });
      }

      // Reset form
      setSelectedDate(undefined);
      setFormData({
        time: '',
        address: '',
        items: '',
        notes: '',
        zapierWebhook: ''
      });
      onOpenChange(false);
    } catch (error) {
      console.error('Error scheduling pickup:', error);
      toast({
        title: "Error",
        description: "Failed to schedule pickup. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Schedule Pickup</DialogTitle>
          <DialogDescription>
            Schedule a convenient time for us to pickup your donated items.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Pickup Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="time">Preferred Time</Label>
            <select
              id="time"
              value={formData.time}
              onChange={(e) => handleChange('time', e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            >
              <option value="">Select a time</option>
              {timeSlots.map(time => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Pickup Address</Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => handleChange('address', e.target.value)}
              placeholder="Enter your complete pickup address"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="items">Items to Pickup</Label>
            <Textarea
              id="items"
              value={formData.items}
              onChange={(e) => handleChange('items', e.target.value)}
              placeholder="Describe the items you want to donate"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes (Optional)</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              placeholder="Any special instructions or notes"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="zapierWebhook">Zapier Webhook URL (Optional)</Label>
            <Input
              id="zapierWebhook"
              type="url"
              value={formData.zapierWebhook}
              onChange={(e) => handleChange('zapierWebhook', e.target.value)}
              placeholder="https://hooks.zapier.com/hooks/catch/..."
            />
            <p className="text-xs text-gray-500">
              Add your Zapier webhook URL for automated calendar integration
            </p>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              <Clock className="mr-2 h-4 w-4" />
              Schedule Pickup
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SchedulePickupModal;
