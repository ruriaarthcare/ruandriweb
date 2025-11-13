import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PrivacyAndReturns = () => {
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

        <div className="max-w-4xl mx-auto space-y-10">

          {/* ---------------- PRIVACY POLICY SECTION ---------------- */}
          <div>
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4 text-foreground">
                Privacy Policy
              </h1>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>1. Introduction</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Ruri Aarth Care LLP (“we”, “our”, or “us”) operates Ru & Ri and
                  is committed to protecting your personal data. This Privacy
                  Policy explains how we collect, use, and safeguard your
                  information in accordance with the Digital Personal Data
                  Protection Act, 2023 (India).
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. Data We Collect</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We collect information required to provide and personalize your
                  wellness experience, including:
                </p>
                <ul className="list-disc ml-6 text-muted-foreground">
                  <li>Personal details: name, email, phone number, address</li>
                  <li>
                    Health and wellness information voluntarily shared (skin or
                    hair concerns)
                  </li>
                  <li>
                    Payment information (processed securely; we do not store card details)
                  </li>
                  <li>Technical data: IP address, browser type, usage patterns</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. How We Use Your Data</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Your data is used to:</p>
                <ul className="list-disc ml-6 text-muted-foreground">
                  <li>Process and deliver your orders</li>
                  <li>Personalize your Ru & Ri wellness kit</li>
                  <li>Communicate updates, recommendations, and offers</li>
                  <li>Improve website functionality</li>
                </ul>
                <p className="text-muted-foreground mt-2">
                  We never sell or share your data for third-party marketing.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. Data Sharing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">We share limited data only with:</p>
                <ul className="list-disc ml-6 text-muted-foreground">
                  <li>Delivery and logistics partners</li>
                  <li>Payment processors</li>
                  <li>Authorized wellness professionals</li>
                  <li>Legal authorities when required</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. Data Security</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We use reasonable technical and administrative measures to protect your information.
                  However, no online platform can guarantee absolute security.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. Data Retention</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Your data is retained only as long as required to provide services or comply with legal obligations.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>7. Cookies</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We use cookies for performance, analytics, and improving user experience.
                  Disabling cookies may affect website functionality.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>8. Your Rights</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">You have the right to:</p>
                <ul className="list-disc ml-6 text-muted-foreground">
                  <li>Access your data</li>
                  <li>Request corrections</li>
                  <li>Request deletion</li>
                  <li>Withdraw consent</li>
                </ul>
                <p className="text-muted-foreground mt-2">
                  Email <strong>ruriaarthcare@gmail.com</strong> with subject “Data Request”.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>9. Third-Party Links</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our site may contain external links. We are not responsible for their content or practices.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>10. Updates to Privacy Policy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  This policy may be updated anytime. Continued use of our site indicates acceptance of the revised policy.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* ---------------- RETURNS / REFUND POLICY SECTION ---------------- */}
          <div>
            <div className="text-center mb-10 pt-6">
              <h1 className="text-4xl font-bold mb-4 text-foreground">
                Customer Support & Returns Policy
              </h1>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>1. Customer Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  For all queries, customers can reach us via:
                </p>
                <ul className="list-disc ml-6 text-muted-foreground">
                  <li>Contact Form on our website (preferred)</li>
                  <li>Email: ruriaarthcare@gmail.com</li>
                </ul>
                <p className="text-muted-foreground mt-2">
                  Response time: <strong>24–48 business hours</strong>.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. Order Processing & Shipping</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Estimated dispatch timeline: <strong>7–10 business days</strong>.
                  Tracking details will be emailed after dispatch.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. Returns, Refunds & Cancellations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Since kits are personalized, <strong>refunds, returns, and cancellations are not allowed</strong>.
                </p>
                <p className="text-muted-foreground mt-2">
                  Customers should review their questionnaire carefully before ordering.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. Replacement Eligibility</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Replacements allowed if:</p>
                <ul className="list-disc ml-6 text-muted-foreground">
                  <li>Damaged items received</li>
                  <li>Incorrect items received</li>
                </ul>
                <p className="text-muted-foreground mt-2">
                  Raise a request within <strong>48 hours</strong> with photos + order number:
                </p>
                <p className="text-muted-foreground font-semibold">
                  Email: ruriaarthcare@gmail.com
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. Lost or Delayed Shipment</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We coordinate with delivery partners to resolve lost or delayed shipments 
                  and arrange reshipment if required.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. Allergies & Sensitivities</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Customers must provide accurate allergy information. Our experts review your questionnaire 
                  before curating your kit.
                </p>
              </CardContent>
            </Card>

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
              </CardContent>
            </Card>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyAndReturns;
