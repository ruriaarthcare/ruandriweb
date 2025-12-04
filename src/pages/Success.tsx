import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Calendar, Clock, Mail, Phone, User, ArrowRight, Home } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { closeSession } from "@/services/session.service";

const Success = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { type, plan, userInfo, selectedDate, selectedTime } = location.state || {};

  const handleReturnHome = async () => {
  try {
    const closed = await closeSession();

    localStorage.removeItem("session");

    if (closed) {
      toast.success("Session closed");
    } else {
      toast.warning("Session may not have closed properly");
    }

    // Navigate home
    navigate("/");
    
  } catch (err) {
    console.error(err);
    toast.error("Error closing session");
    localStorage.removeItem("session");

    navigate("/");
  }
};


  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col">
      <Header />
      <div className="container mx-auto px-4 py-12 flex-1 relative">
        {/* Return to Home Button - Top Right */}
        <div className="absolute top-4 right-4 z-10">
          <Button
            onClick={handleReturnHome}
            className="bg-gradient-primary hover:opacity-90"
            size="lg"
          >
            <Home className="mr-2 h-5 w-5" />
            Return to Home
          </Button>
        </div>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
              <CheckCircle2 className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Thank You! 🌸
            </h1>
            <p className="text-xl text-muted-foreground mb-2">
              Your consultation has been successfully booked!
            </p>
            <p className="text-muted-foreground">
              We'll send you a confirmation email shortly with all the details.
            </p>
          </div>

          <Card className="p-8 shadow-xl mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <h2 className="text-2xl font-bold mb-6 text-foreground">
              Booking Confirmation
            </h2>
            
            <div className="space-y-6">
              {/* User Information */}
              <div className="space-y-3">
                <h3 className="font-semibold text-lg text-foreground border-b pb-2">
                  Your Information
                </h3>
                <div className="grid gap-3">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-primary" />
                    <span className="text-foreground">{userInfo?.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-primary" />
                    <span className="text-foreground">{userInfo?.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-primary" />
                    <span className="text-foreground">{userInfo?.phone}</span>
                  </div>
                </div>
              </div>

              {/* Appointment Details */}
              <div className="space-y-3">
                <h3 className="font-semibold text-lg text-foreground border-b pb-2">
                  Appointment Details
                </h3>
                <div className="grid gap-3">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-primary" />
                    <span className="text-foreground">
                      {selectedDate ? new Date(selectedDate).toLocaleDateString('en-IN', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      }) : 'Not selected'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-primary" />
                    <span className="text-foreground">{selectedTime || 'Not selected'}</span>
                  </div>
                </div>
              </div>

              {/* Plan Details */}
              <div className="space-y-3">
                <h3 className="font-semibold text-lg text-foreground border-b pb-2">
                  Subscription Plan
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Plan Duration</span>
                    <span className="font-semibold text-foreground">{plan?.duration}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Consultation Type</span>
                    <span className="font-medium capitalize text-foreground">{type}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t">
                    <span className="text-lg font-semibold text-foreground">Total Amount</span>
                    <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                      {plan?.price}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-primary text-primary-foreground mb-8 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <h3 className="font-semibold mb-3 text-lg">What Happens Next?</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="mt-1">📧</span>
                <span>You'll receive a confirmation email with your booking details and next steps</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1">💬</span>
                <span>We'll send you a reminder 24 hours before your appointment</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1">🌿</span>
                <span>Get ready to start your personalized hair wellness journey with Ru & Ri!</span>
              </li>
            </ul>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Success;
