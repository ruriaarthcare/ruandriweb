import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Check, Sparkles } from "lucide-react";

interface PlanFeatures {
  duration: string;
  price: string;
  skinDescription: string;
  hairDescription: string;
  features: string[];
  popular?: boolean;
}

const plans: PlanFeatures[] = [
  {
    duration: "1 Month Trial",
    price: "₹2,499",
    skinDescription: "Starter kit + consult",
    hairDescription: "Starter care + insight",
    features: ["Initial consultation", "Starter product kit", "Baseline assessment", "Email support"]
  },
  {
    duration: "3 Months",
    price: "₹6,899",
    skinDescription: "Care cycle + follow-up",
    hairDescription: "Strengthens roots",
    features: ["Monthly check-ins", "Customized treatment plan", "Product refills", "Priority support"],
    popular: true
  },
  {
    duration: "6 Months",
    price: "₹13,199",
    skinDescription: "Skin correction",
    hairDescription: "Regrowth support",
    features: ["Bi-weekly consultations", "Advanced treatment protocols", "Progress tracking", "Dedicated specialist"]
  },
  {
    duration: "9 Months",
    price: "₹18,299",
    skinDescription: "Hormonal balance + glow",
    hairDescription: "Hormonal rebalancing",
    features: ["Hormonal assessment", "Holistic wellness plan", "Nutritional guidance", "24/7 chat support"]
  },
  {
    duration: "12 Months",
    price: "₹22,699",
    skinDescription: "Ongoing wellness",
    hairDescription: "Hair transformation",
    features: ["Complete transformation program", "Quarterly in-depth reviews", "Lifestyle coaching", "VIP support"]
  }
];

const Subscription = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { type, answers, notes } = location.state || {};

  const handleSelectPlan = (plan: PlanFeatures) => {
    navigate("/booking", {
      state: {
        type,
        answers,
        notes,
        plan: {
          duration: plan.duration,
          price: plan.price,
          description: type === "skin" ? plan.skinDescription : plan.hairDescription
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <div className="text-center mb-12">
            <Badge className="mb-4 bg-gradient-primary" variant="secondary">
              <Sparkles className="w-3 h-3 mr-1" />
              Personalized for Your {type === "skin" ? "Skin" : "Hair"} Goals
            </Badge>
            <h1 className="text-5xl font-bold mb-4 text-foreground">
              Choose Your Care Plan
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Select the plan that best fits your journey to healthier {type}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {plans.map((plan) => (
              <Card
                key={plan.duration}
                className={`relative p-6 flex flex-col shadow-soft hover:shadow-medium transition-all ${
                  plan.popular ? "border-primary border-2 scale-105" : ""
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-secondary">
                    Most Popular
                  </Badge>
                )}

                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2 text-foreground">
                    {plan.duration}
                  </h3>
                  <div className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                    {plan.price}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {type === "skin" ? plan.skinDescription : plan.hairDescription}
                  </p>
                </div>

                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handleSelectPlan(plan)}
                  className={
                    plan.popular
                      ? "w-full bg-gradient-primary hover:opacity-90"
                      : "w-full"
                  }
                  variant={plan.popular ? "default" : "outline"}
                >
                  Select Plan
                </Button>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Card className="p-6 bg-muted/50 border-none inline-block">
              <p className="text-sm text-muted-foreground">
                All plans include personalized care and professional guidance
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
