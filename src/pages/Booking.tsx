import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Calendar as CalendarIcon, Clock } from "lucide-react";
import { toast } from "sonner";
import Header from "@/components/Header";

const timeSlots = [
  "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
];

const Booking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { type, plan, userInfo } = location.state || {};

  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime) {
      toast.error("Please select a date and time for your consultation");
      return;
    }

    navigate("/checkout", {
      state: {
        type,
        plan,
        userInfo,
        selectedDate,
        selectedTime
      }
    });
  };


  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="p-8 shadow-medium">
              <h2 className="text-3xl font-bold mb-6 text-foreground">
                Schedule Your Consultation
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label className="mb-3 flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4" />
                    Select Date
                  </Label>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date()}
                    className="rounded-md border w-full"
                  />
                </div>

                <div>
                  <Label className="mb-3 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Select Time
                  </Label>
                  <div className="grid grid-cols-4 gap-2">
                    {timeSlots.map((time) => (
                      <Button
                        key={time}
                        type="button"
                        variant={selectedTime === time ? "default" : "outline"}
                        className={selectedTime === time ? "bg-gradient-primary" : ""}
                        onClick={() => setSelectedTime(time)}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-primary hover:opacity-90"
                  size="lg"
                >
                  Confirm Booking
                </Button>
              </form>
            </Card>

            <div className="space-y-6">
              <Card className="p-6 shadow-soft">
                <h3 className="text-xl font-bold mb-4 text-foreground">
                  Booking Summary
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Consultation Type</span>
                    <span className="font-medium capitalize">{type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Plan</span>
                    <span className="font-medium">{plan?.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Description</span>
                      <span className="font-medium text-sm">{plan?.description}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Price</span>
                      <span className="font-medium">
                        ₹{parseInt(plan.price.replace(/[₹,]/g, "")).toLocaleString()}
                      </span>
                    </div>
                    {plan?.discount && (
                      <div className="flex justify-between text-primary">
                        <span className="text-muted-foreground">Discount</span>
                        <span className="font-medium">- ₹{plan.discount.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="pt-3 border-t">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold">Total Amount</span>
                        <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                        ₹{(parseInt(plan.price.replace(/[₹,]/g, "")) - (plan.discount || 0)).toLocaleString()}

                        </span>
                      </div>
                    </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-primary text-primary-foreground shadow-soft">
                <h4 className="font-semibold mb-3">Consultation Details</h4>
                <ul className="space-y-2 text-sm">
                  <li><strong>Duration:</strong> 15–20 minutes</li>
                  <li><strong>Format:</strong> Zoom call</li>
                  <li><strong>Includes:</strong></li>
                  <li className="ml-4">• Personalised skin or hair wellness guidance</li>
                  <li className="ml-4">• Nutrition support based on your concerns</li>
                  <li className="ml-4">• First gynecologist consultation is complimentary</li>
                </ul>
              </Card>

              <Card className="p-6 bg-muted/50 border-none shadow-soft">
                <p className="text-sm text-muted-foreground">
                  By booking, you agree to our terms of service and privacy policy.
                  You'll receive a confirmation email with consultation details.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
