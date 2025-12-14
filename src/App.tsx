import { useEffect } from "react";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import Consultation from "./pages/Consultation";
import Subscription from "./pages/Subscription";
import Booking from "./pages/Booking";
import ConsultationSummary from "./pages/ConsultationSummary";
import AboutUs from "./pages/AboutUs";
import Terms from "./pages/Terms";
import PrivacyAndRefundPolicy from "./pages/PrivacyAndRefundPolicy";
import FAQ from "./pages/FAQ";
import Feedback from "./pages/Feedback";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";

// 🔥 IMPORT SESSION SERVICE
import { createSession, validateSession } from "@/services/session.service";

const queryClient = new QueryClient();

const App = () => {

  // 🔥 AUTO CREATE + VALIDATE SESSION ON APP LOAD
  useEffect(() => {
    const initSession = async () => {
      const isValid = await validateSession();

      if (!isValid) {
        console.log("⚠ No valid session → creating new session...");
        await createSession();
      }
    };

    initSession();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        <BrowserRouter>
          <ScrollToTop />

          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/consultation" element={<Consultation />} />
            <Route path="/consultation-summary" element={<ConsultationSummary />} />
            <Route path="/subscription" element={<Subscription />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy-policy" element={<PrivacyAndRefundPolicy />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/success" element={<Success />} />
            <Route path="/admin" element={<AdminLogin />} />

            <Route
              path="/admin/dashboard"
              element={
                <ProtectedAdminRoute>
                  <AdminDashboard />
                </ProtectedAdminRoute>
              }
/>
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>

        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
