import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, ArrowRight, Sparkles, CheckCircle } from "lucide-react";

const ConsultationSummary = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { type, answers } = location.state as { type: "skin" | "hair"; answers: Record<string, string | string[]> };
  
  const [additionalNotes, setAdditionalNotes] = useState("");

  const handleContinue = () => {
    navigate("/subscription", { state: { type, answers, notes: additionalNotes } });
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <Button
            variant="ghost"
            onClick={handleBack}
            className="mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <Card className="p-8 md:p-12 shadow-medium">
            {/* Success Header */}
            <div className="text-center mb-8">
              <div className="mb-4 flex justify-center">
                <div className="bg-gradient-primary p-4 rounded-full shadow-soft">
                  <CheckCircle className="w-12 h-12 text-white" />
                </div>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Thank You for Sharing! 🌸
              </h1>
              
              <p className="text-lg text-muted-foreground">
                We've received your {type === "skin" ? "skin" : "hair"} wellness consultation responses
              </p>
            </div>

            {/* Summary Card */}
            <div className="p-6 bg-gradient-primary/10 rounded-xl border-2 border-primary/20 mb-8">
              <div className="flex items-start gap-3">
                <Sparkles className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="text-foreground font-medium mb-2">
                    Based on your answers, we'll curate your personalized Ru & Ri{" "}
                    {type === "skin" ? "Skin" : "Hair"} Wellness Kit 🌿💙
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Your custom kit will include products and nutrition guidance tailored specifically to your needs.
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Notes Section */}
            <div className="mb-8">
              <Label htmlFor="notes" className="text-lg font-semibold mb-3 block">
                Any additional notes or concerns? (Optional)
              </Label>
              <p className="text-sm text-muted-foreground mb-4">
                Share any additional information that might help us understand your needs better...
              </p>
              <Textarea
                id="notes"
                placeholder="For example: specific product preferences, allergies, previous treatments tried, lifestyle factors, or anything else you'd like us to know..."
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                className="min-h-40 text-base"
              />
            </div>

            {/* Next Steps Info */}
            <div className="bg-accent/10 rounded-lg p-6 mb-8 border border-accent/20">
              <h3 className="font-semibold text-foreground mb-3">What's Next?</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>
                  <span>Review subscription plans tailored to your needs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>
                  <span>Receive your personalized wellness kit</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>
                  <span>Start your journey to healthier {type === "skin" ? "skin" : "hair"}</span>
                </li>
              </ul>
            </div>

            {/* Continue Button */}
            <Button
              onClick={handleContinue}
              className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
              size="lg"
            >
              View Subscription Plans
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <p className="text-center text-sm text-muted-foreground mt-4">
              You can modify your responses before finalizing your subscription
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ConsultationSummary;
