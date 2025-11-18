import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Check, Sparkles } from "lucide-react";
import Header from "@/components/Header";

interface PlanFeatures {
  duration: string;
  price: string;
  monthlyPrice: string;
  months: number;
  skinDescription: string;
  hairDescription: string;
  features: string[];
  popular?: boolean;
  discount?: number;
}

const plans: PlanFeatures[] = [
  {
    duration: "1 Month",
    price: "₹2,499",
    monthlyPrice: "₹2,499",
    months: 1,
    skinDescription: "A gentle way to begin",
    hairDescription: "A gentle way to begin",
    features: [
      "A one-to-one conversation to understand you",
      "Your curated starter kit",
      "A thoughtful starting point based on what you share",
      "We're here whenever questions come up"
    ]
  },
  {
    duration: "3 Months ",
    price: "₹6,899",
    monthlyPrice: "₹2,300",
    months: 3,
    skinDescription: "Building consistency together",
    hairDescription: "Building consistency together",
    features: [
      "Monthly check-ins to see how you're feeling",
      "A routine shaped around your life",
      "Products delivered when you need them",
      "Priority support — we've got you"
    ],
    popular: true,
    discount: 1000
  },
  {
    duration: "6 Months ",
    price: "₹13,199",
    monthlyPrice: "₹2,200",
    months: 6,
    skinDescription: "Closer care as you deepen your practice",
    hairDescription: "Closer care as you deepen your practice",
    features: [
      "We connect every two weeks",
      "Gentle shifts as your needs evolve",
      "Notes to help you reflect and notice patterns",
      "Your dedicated guide, all the way through"
    ],
    discount: 2000
  },
  {
    duration: "9 Months",
    price: "₹18,299",
    monthlyPrice: "₹2,033",
    months: 9,
    skinDescription: "Space to breathe, grow, and adjust",
    hairDescription: "Space to breathe, grow, and adjust",
    features: [
      "A deeper look at what's serving you",
      "A flexible plan that moves with your life",
      "Nourishment guidance when it feels right",
      "Steady presence, always in your corner"
    ]
  },
  {
    duration: "12 Months",
    price: "₹22,699",
    monthlyPrice: "₹1,892",
    months: 12,
    skinDescription: "A year of partnership, presence, and care",
    hairDescription: "A year of partnership, presence, and care",
    features: [
      "A care plan that holds the whole year",
      "Seasonal check-ins to refine what's working",
      "Lifestyle support that feels like a conversation",
      "Ongoing guidance whenever clarity calls"
    ],
    discount: 4000
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
          description: type === "skin" ? plan.skinDescription : plan.hairDescription,
          discount: plan.discount
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
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
            <h1 className="text-5xl font-bold mb-4 text-foreground">
              Find your rhythm. We'll be here for every step.
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Every plan includes thoughtfully curated formulations, expert guidance, and care that honours the whole you — from the inside out.
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
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold text-foreground">
                      {plan.duration}
                    </h3>
                    {plan.discount && (
                      <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">
                        ₹{plan.discount.toLocaleString()} off
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 italic">
                    {type === "skin" ? plan.skinDescription : plan.hairDescription}
                  </p>
                  <div className="mb-2">
                    {plan.discount && (
                      <div className="text-base text-muted-foreground line-through mb-1">
                        ₹{(parseInt(plan.price.replace(/[₹,]/g, '')) + plan.discount).toLocaleString()}
                      </div>
                    )}
                    <div className="flex items-baseline gap-2">
                      <div className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                        {plan.price}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        ({plan.monthlyPrice}/month)
                      </p>
                    </div>
                  </div>
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