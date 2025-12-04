import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Check, Calendar as CalendarIcon, Clock, Mail, Phone, User } from "lucide-react";
import { toast } from "sonner";
import Header from "@/components/Header";

import { updateSession } from "@/services/session.service";


const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { type, plan, userInfo, selectedDate, selectedTime } = location.state || {};



    function formatDate(date: Date) {
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    }

 const handleConfirmBooking = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!selectedDate || !selectedTime) {
    toast.error("Please select a date and time for your consultation");
    return;
  }

  try {
    // FORMAT DATE as dd-mm-yyyy
    const formattedDate = formatDate(selectedDate);

    // SAVE DATE & TIME INTO SESSION
    await updateSession("booking.date", formattedDate);
    await updateSession("booking.time", selectedTime);

    toast.success("Booking details saved!");

    // MOVE TO CHECKOUT PAGE
    navigate("/success", {
      state: { type, plan, userInfo, selectedDate, selectedTime }
    });

  } catch (err) {
    console.error("Booking session save failed:", err);
    toast.error("Something went wrong while saving booking.");
  }
};

  const servicesIncluded = type === "hair" 
  ? [
      "Comprehensive consultation with Professional",
      "Personalized hair treatment plan tailored to your needs",
      "Follow-up care and hair progress monitoring",
      "Email support throughout your treatment",
      "Access to exclusive haircare resources",
      "Hair product recommendations and guidance"
    ]
  : [
      "Comprehensive consultation with Professional",
      "Personalized skin treatment plan tailored to your needs",
      "Follow-up care and skin progress monitoring",
      "Email support throughout your treatment",
      "Access to exclusive skincare resources",
      "Skincare product recommendations and guidance"
    ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2 text-foreground">
              Review Your Booking
            </h1>
            <p className="text-muted-foreground">
              Please review all details before confirming your booking
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* User Information */}
              <Card className="p-6 shadow-medium">
                <h2 className="text-2xl font-bold mb-4 text-foreground">
                  Your Information
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Full Name</p>
                      <p className="font-medium text-foreground">{userInfo?.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email Address</p>
                      <p className="font-medium text-foreground">{userInfo?.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Phone Number</p>
                      <p className="font-medium text-foreground">{userInfo?.phone}</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Appointment Details */}
              <Card className="p-6 shadow-medium">
                <h2 className="text-2xl font-bold mb-4 text-foreground">
                  Appointment Details
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CalendarIcon className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Date</p>
                      <p className="font-medium text-foreground">
                        {selectedDate ? new Date(selectedDate).toLocaleDateString('en-IN', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        }) : 'Not selected'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Time</p>
                      <p className="font-medium text-foreground">{selectedTime || 'Not selected'}</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Services Included */}
              <Card className="p-6 shadow-medium">
                <h2 className="text-2xl font-bold mb-4 text-foreground">
                  What's Included
                </h2>
                <ul className="space-y-3">
                  {servicesIncluded.map((service, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{service}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            <div className="space-y-6">
              {/* Subscription Summary */}
              <Card className="p-6 shadow-medium">
                <h2 className="text-xl font-bold mb-4 text-foreground">
                  Subscription Summary
                </h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Plan Duration</p>
                    <p className="font-semibold text-lg text-foreground">{plan?.duration}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Consultation Type</p>
                    <p className="font-medium capitalize text-foreground">{type}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Description</p>
                    <p className="text-sm text-foreground">{plan?.description}</p>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    {plan?.originalPrice && (
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Original Price</span>
                        <span className="line-through text-muted-foreground">
                          {plan.originalPrice}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Price</span>
                      <span className="font-medium">
                        ₹{parseInt(plan.price.replace(/[₹,]/g, "")).toLocaleString()}
                      </span>
                    </div>
                    {plan?.discount && (
                      <div className="flex justify-between items-center text-primary">
                        <span>Discount</span>
                        <span className="font-medium">- ₹{plan.discount.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-lg font-semibold text-foreground">Total Amount</span>
                      <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                        ₹{(parseInt(plan.price.replace(/[₹,]/g, "")) - (plan.discount || 0)).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-primary text-primary-foreground shadow-medium">
                <h3 className="font-semibold mb-3">Important Note</h3>
                <p className="text-sm">
                  By confirming this booking, you agree to our terms of service and privacy policy.
                  You'll receive a confirmation email with all the details.
                </p>
              </Card>

              <Button
                onClick={handleConfirmBooking}
                className="w-full bg-gradient-primary hover:opacity-90"
                size="lg"
              >
                Confirm & Book Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
