import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Check, Calendar as CalendarIcon, Clock, Mail, Phone, User, Import } from "lucide-react";
import { toast } from "sonner";
import Header from "@/components/Header";
import { RazorpayPaymentResponse, } from "@/types/razorpay";

import { updateSession } from "@/services/session.service";
import { getSession } from "@/utils/session.storage";


const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { type, plan, userInfo, selectedDate, selectedTime, address } = location.state || {};
  const storedSession = getSession();
  const sessionId = storedSession.sessionId

    function formatDate(date: Date) {
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    }

    const startPayment = async (
    amount: number,
    docId: string
  ) => {
    const res = await fetch(import.meta.env.VITE_CREATE_ORDER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, docId }),
    });

    if (!res.ok) {
      throw new Error("Failed to create payment order");
    }
    return res.json();
  };


const verifyPayment = async (payload: {
    docId: string;
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
    appointment: {
    date: string;
    time: string;
    address?: any;
  };
  }) => {
    
    const res = await fetch(import.meta.env.VITE_VERIFY_PAYMENT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    
  const data = await res.json(); 
    if (!res.ok) {
    throw new Error(data?.error || "Payment verification failed");
  }

  return data;
  };


 const handleConfirmBooking = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!sessionId) {
      toast.error("Booking session missing");
      return;
    }

    try {
      const price =
        parseInt(plan.price.replace(/[₹,]/g, "")) - (plan.discount || 0);

      // 🟢 STEP 1 — Create Razorpay order (BACKEND)
      const order = await startPayment(price, sessionId);

      // 🔴 HARD CHECK
      if (!(window as any).Razorpay) {
        console.error("Razorpay SDK missing");
        toast.error("Razorpay SDK not loaded");
        return ;
      }

      // 🟢 STEP 2 — Open Razorpay
      const options = {
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        order_id: order.orderId,

        name: "Consultation Booking",
        description: `${type} consultation`,
        prefill: {
          name: userInfo?.name,
          email: userInfo?.email,
          contact: userInfo?.phone,
        },

        handler: async (response: RazorpayPaymentResponse) => {
          try {
            // 🟢 STEP 3 — SEND PAYMENT TO BACKEND (CHANGE HERE)
            const verifyed = await verifyPayment({
              docId: sessionId,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              appointment: {
                date: selectedDate,
                time: selectedTime,
                address,
              },
            });



            toast.success("Payment successful!");

            // 🟢 STEP 4 — Navigate
            navigate("/success", {
              replace: true,
              state: {
                type,
                plan,
                userInfo,
                selectedDate,
                selectedTime,
                address
              },
            });
          } catch (err) {
            toast.error("Payment verification failed");
          }
        },  

        // 🟢 OPTIONAL SAFETY
        modal: {
          ondismiss: () => {
            toast.error("Payment cancelled");
          },
        },

        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      toast.error("Payment initiation failed");
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

              {/* Delivery Address */}
              {address && (
                <Card className="p-6 shadow-medium">
                  <h2 className="text-2xl font-bold mb-4 text-foreground">
                    Delivery Address
                  </h2>
                  <div className="space-y-2">
                    <p className="text-foreground font-medium">
                      {address.street}
                    </p>
                    <p className="text-muted-foreground">
                      {address.city} - {address.pincode}
                    </p>
                  </div>
                </Card>
              )}


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
