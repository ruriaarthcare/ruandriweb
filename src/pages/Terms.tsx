import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Terms = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-subtle">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-foreground">Terms & Conditions</h1>
            <p className="text-muted-foreground">Last updated: 12/11/2025</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>1. Introduction</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Welcome to Ru & Ri, a holistic skin and hair wellness brand owned and operated by 
                Ruri Aarth Care LLP, registered in Maharashtra, India. By using our website 
                (www.ruandricare.com) or purchasing from us, you agree to these Terms and Conditions. 
                If you do not agree, please discontinue using our website or services.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. Eligibility</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Customers must be 18 years or older to access or purchase products and subscription kits. 
                By placing an order, you confirm that all details provided are accurate and complete.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. Services Offered</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Ru & Ri offers personalized skin and hair wellness subscription kits curated by experts. 
                Each kit may include dermatologist-tested products from verified brands, nutrition and 
                supplement guidance, and expert input from skincare, nutrition, or gynecology professionals. 
                All content and guidance are for general wellness and not intended to diagnose, treat, or cure 
                medical conditions.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. Subscriptions and Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Subscription durations: 1, 3, 6, 9, and 12 months. Prices are listed in Indian Rupees (₹) 
                and include applicable taxes. Full payment must be made online through secure payment 
                gateways integrated via GoDaddy. Once the order is confirmed and dispatched, subscriptions 
                are non-refundable and non-transferable. Ruri Aarth Care LLP reserves the right to modify 
                plans, pricing, or discontinue services without prior notice.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5. Delivery and Shipping</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Orders are shipped within standard timelines through authorized courier partners. 
                Delivery duration may vary based on destination and logistics. Ruri Aarth Care LLP 
                is not responsible for delays caused by courier partners, incorrect addresses, or 
                uncontrollable events.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>6. Returns, Refunds & Replacements</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Due to hygiene and personalization, returns or cancellations are not accepted once 
                dispatched. Replacements are eligible only for products damaged during shipping or 
                incorrect items received. Requests must be sent to ruriaarthcare@gmail.com within 
                48 hours of delivery, with supporting images.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>7. Expert Consultations and Guidance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Consultations offered by our team are informative and general. They are not substitutes 
                for professional medical advice. Customers should consult licensed medical professionals 
                for specific medical issues or allergies.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>8. Use of Third-Party Products</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Some products in Ru & Ri kits may be sourced from third-party brands that meet our 
                quality standards. Ruri Aarth Care LLP is not liable for reactions, side effects, or 
                manufacturing issues related to such items.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>9. Personal Data and Privacy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We collect personal data only to fulfill your orders, personalize your wellness 
                experience, and improve our services. Please refer to our Privacy Policy for 
                complete details.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>10. Intellectual Property</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                All website content—including logos, text, visuals, and brand identity—belongs to 
                Ruri Aarth Care LLP. You may not copy or distribute any material without written consent.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>11. Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Ruri Aarth Care LLP and its representatives are not liable for allergic reactions, 
                adverse results, or damages arising from product use, or any indirect, incidental, 
                or consequential loss. Products and recommendations are provided "as is" without 
                warranties except where legally required.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>12. User Responsibilities</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Users must not misuse the website, provide false information, or engage in actions that 
                disrupt or harm its operation.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>13. Modifications to Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We may revise these Terms at any time. Updates take effect once posted on the website. 
                Continued use signifies acceptance of the latest version.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>14. Governing Law & Jurisdiction</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                These Terms are governed by the laws of India, and any disputes fall under the exclusive 
                jurisdiction of courts in Maharashtra, India.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>15. Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                For questions regarding these Terms, contact:  
                Email: ruriaarthcare@gmail.com  
                Website: www.ruandricare.com
              </p>
            </CardContent>
          </Card>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
