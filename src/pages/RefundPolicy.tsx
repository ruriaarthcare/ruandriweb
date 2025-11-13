import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ReturnsPolicy = () => {
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
            <h1 className="text-4xl font-bold mb-4 text-foreground">
              Customer Support & Returns Policy
            </h1>
            <p className="text-muted-foreground">Last updated: {new Date().getFullYear()}</p>
          </div>

          {/* 1. Customer Support */}
          <Card>
            <CardHeader>
              <CardTitle>1. Customer Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                For all queries related to orders, subscriptions, consultations, or product guidance,
                customers can reach us through our Contact Form available on 
                <strong> www.ruandricare.com</strong>.
              </p>

              <p className="text-muted-foreground mt-3 font-semibold">Support Channels:</p>
              <ul className="list-disc ml-6 text-muted-foreground">
                <li>Contact Form on our Website (preferred)</li>
                <li>Email: ruriaarthcare@gmail.com</li>
              </ul>

              <p className="text-muted-foreground mt-3 font-semibold">Response Time:</p>
              <p className="text-muted-foreground">
                Our support team responds within 24–48 business hours (Monday to Friday, excluding public holidays).
              </p>
            </CardContent>
          </Card>

          {/* 2. Order Processing */}
          <Card>
            <CardHeader>
              <CardTitle>2. Order Processing & Shipping</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Once an order is confirmed, our experts begin curating your personalized wellness kit.
                Processing time may vary depending on your requirements.
              </p>

              <p className="text-muted-foreground mt-3">
                <strong>Estimated dispatch timeline:</strong> 7–10 business days.
              </p>

              <p className="text-muted-foreground">
                Shipping updates and tracking details will be shared via email once dispatched.
              </p>
            </CardContent>
          </Card>

          {/* 3. Returns / Refunds */}
          <Card>
            <CardHeader>
              <CardTitle>3. Returns, Refunds & Cancellations</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Every Ru & Ri wellness kit is customized for each customer. Therefore, refunds, returns,
                and cancellations are <strong>not applicable</strong> once an order is placed.
              </p>

              <p className="text-muted-foreground mt-3">
                Customers are encouraged to review their questionnaire responses carefully before submitting their order.
              </p>
            </CardContent>
          </Card>

          {/* 4. Replacement Eligibility */}
          <Card>
            <CardHeader>
              <CardTitle>4. Replacement Eligibility</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Replacements are eligible only if:</p>
              <ul className="list-disc ml-6 text-muted-foreground">
                <li>Damaged items are received</li>
                <li>Incorrect products are received</li>
              </ul>

              <p className="text-muted-foreground mt-3 font-semibold">
                To initiate a replacement:
              </p>
              <ul className="list-disc ml-6 text-muted-foreground">
                <li>Email: ruriaarthcare@gmail.com</li>
                <li>Include your order number</li>
                <li>Attach clear photos of the package and items</li>
              </ul>

              <p className="text-muted-foreground mt-2">
                Requests must be raised within <strong>48 hours</strong> of delivery.
              </p>
            </CardContent>
          </Card>

          {/* 5. Lost Shipment */}
          <Card>
            <CardHeader>
              <CardTitle>5. Lost or Delayed Shipment</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                In rare cases of lost or significantly delayed shipments, our support team will coordinate
                with the delivery partner to resolve the issue or arrange a reshipment if required.
              </p>
            </CardContent>
          </Card>

          {/* 6. Allergies */}
          <Card>
            <CardHeader>
              <CardTitle>6. Allergies & Sensitivities</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Before preparing your kit, our experts carefully review your questionnaire responses,
                including allergies and skin sensitivities. Customers must provide accurate health
                information to help us avoid adverse reactions.
              </p>
            </CardContent>
          </Card>

          {/* 7. Contact Info */}
          <Card>
            <CardHeader>
              <CardTitle>7. Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                <strong>Brand:</strong> Ru & Ri <br />
                <strong>Company:</strong> Ruri Aarth Care LLP <br />
                <strong>Email:</strong> ruriaarthcare@gmail.com <br />
                <strong>Website:</strong> www.ruandricare.com
              </p>

              <p className="text-muted-foreground mt-3">
                For smooth assistance, customers are requested to contact us mainly via the Contact Form or email.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ReturnsPolicy;
