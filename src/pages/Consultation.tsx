import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";

interface Question {
  id: string;
  section: string;
  sectionIcon?: string;
  question: string;
  options: string[];
  multiSelect?: boolean;
}

const skinQuestions: Question[] = [
  // Section 1: Skin Goals & Concerns
  {
    id: "skinGoal",
    section: "Section 1: Skin Goals & Concerns",
    sectionIcon: "✨",
    question: "What is your primary skin goal?",
    options: [
      "Reduce acne/pimples",
      "Control oil & shine",
      "Hydrate dry skin",
      "Reduce dark spots/pigmentation",
      "Anti-aging (fine lines/wrinkles)",
      "Brighten dull/tired skin",
      "Calm sensitive/irritated skin"
    ]
  },
  {
    id: "afterCleansing",
    section: "Section 1: Skin Goals & Concerns",
    question: "How does your skin usually feel after cleansing?",
    options: ["Tight and dry", "Fresh and balanced", "Oily within an hour", "Irritated or itchy"]
  },
  {
    id: "breakouts",
    section: "Section 1: Skin Goals & Concerns",
    question: "How often do you experience breakouts?",
    options: ["Rarely", "Occasionally (once a month)", "Frequently (a few times a month)", "Almost always"]
  },
  {
    id: "skinIssues",
    section: "Section 1: Skin Goals & Concerns",
    question: "Do you experience any of the following? (You can select more than one)",
    multiSelect: true,
    options: [
      "Blackheads/whiteheads",
      "Redness or sensitivity",
      "Uneven skin tone",
      "Fine lines/wrinkles",
      "Large pores",
      "Flaky or rough patches"
    ]
  },
  // Section 2: Lifestyle & Habits
  {
    id: "sunExposure",
    section: "Section 2: Lifestyle & Habits",
    sectionIcon: "✨",
    question: "How much sun exposure do you usually get?",
    options: [
      "Mostly indoors",
      "A few hours outdoors daily",
      "Long hours outdoors, little sun protection",
      "I always use sunscreen"
    ]
  },
  {
    id: "lifestyle",
    section: "Section 2: Lifestyle & Habits",
    question: "How would you describe your lifestyle?",
    options: [
      "Balanced diet & hydration conscious",
      "Busy, irregular routine",
      "High stress",
      "Lack of sleep",
      "Healthy but still facing skin issues"
    ]
  },
  {
    id: "diet",
    section: "Section 2: Lifestyle & Habits",
    question: "Which best describes your diet? 🌿",
    options: [
      "Vegetarian",
      "Vegan",
      "Non-vegetarian",
      "Eggetarian",
      "Plant-based, mostly",
      "No specific pattern / mixed diet"
    ]
  },
  {
    id: "waterIntake",
    section: "Section 2: Lifestyle & Habits",
    question: "How much water do you drink daily? 💧",
    options: ["Less than 1 litre", "1–2 litres", "More than 2 litres"]
  },
  // Section 3: Wellness & Safety
  {
    id: "supplements",
    section: "Section 3: Wellness & Safety",
    sectionIcon: "✨",
    question: "Do you take any supplements for skin health?",
    options: ["Yes, regularly", "Sometimes", "No, never"]
  },
  {
    id: "hormonal",
    section: "Section 3: Wellness & Safety",
    question: "Any hormonal concerns that affect your skin?",
    options: ["Yes (PCOS, irregular cycles, menopause, etc.)", "Not sure", "No"]
  },
  {
    id: "pregnancy",
    section: "Section 3: Wellness & Safety",
    question: "Are you currently pregnant or breastfeeding?",
    options: ["Yes", "No", "Planning pregnancy soon"]
  },
  {
    id: "conditions",
    section: "Section 3: Wellness & Safety",
    question: "Do you have any known skin conditions or allergies?",
    options: ["Yes (eczema, psoriasis, dermatitis, ingredient allergies, etc.)", "No"]
  },
  {
    id: "medication",
    section: "Section 3: Wellness & Safety",
    question: "Are you currently on any long-term medication (for skin, hormones, thyroid, etc.)?",
    options: ["Yes", "No"]
  },
  {
    id: "stress",
    section: "Section 3: Wellness & Safety",
    question: "How would you describe your stress levels?",
    options: ["Low", "Moderate", "High"]
  },
  {
    id: "sleep",
    section: "Section 3: Wellness & Safety",
    question: "On average, how many hours of sleep do you get daily? 😴",
    options: ["Less than 5 hours", "5–7 hours", "7–9 hours", "More than 9 hours"]
  },
  // Section 4: Your Ru & Ri Journey
  {
    id: "routine",
    section: "Section 4: Your Ru & Ri Journey",
    sectionIcon: "✨",
    question: "How often do you follow a skincare routine?",
    options: ["Twice daily (morning & night)", "Once a day", "Occasionally", "Rarely"]
  },
  {
    id: "helpWith",
    section: "Section 4: Your Ru & Ri Journey",
    question: "What would you like Ru & Ri to help you with?",
    options: [
      "A complete personalized kit (products + nutrition)",
      "Skincare products only",
      "Supplements/nutrition guidance only",
      "Both, with gynecological input if needed"
    ]
  }
];

const hairQuestions: Question[] = [
  // Section 1: Hair Goals & Concerns
  {
    id: "hairGoal",
    section: "Section 1: Hair Goals & Concerns",
    sectionIcon: "✨",
    question: "What is your primary hair goal?",
    options: [
      "Reduce hair fall",
      "Promote hair growth",
      "Control dandruff/flakiness",
      "Reduce scalp oiliness",
      "Improve hair thickness/volume",
      "Repair damaged hair (heat/chemical)",
      "Control frizz/manageability",
      "Enhance shine and softness"
    ]
  },
  // {
  //   id: "scalpType",
  //   section: "Section 1: Hair Goals & Concerns",
  //   question: "How would you describe your scalp type?",
  //   options: ["Dry / itchy", "Oily / greasy", "Normal / balanced", "Sensitive"]
  // },
  // {
  //   id: "hairTexture",
  //   section: "Section 1: Hair Goals & Concerns",
  //   question: "How would you describe your hair texture?",
  //   options: ["Straight", "Wavy", "Curly", "Coily"]
  // },
  // {
  //   id: "hairIssues",
  //   section: "Section 1: Hair Goals & Concerns",
  //   question: "Do you experience any of the following? (You can select more than one)",
  //   multiSelect: true,
  //   options: [
  //     "Split ends",
  //     "Thinning / reduced density",
  //     "Premature greying",
  //     "Dandruff / flaking",
  //     "Hair breakage",
  //     "Slow growth"
  //   ]
  // },
  // // Section 2: Lifestyle & Habits
  // {
  //   id: "washFrequency",
  //   section: "Section 2: Lifestyle & Habits",
  //   sectionIcon: "✨",
  //   question: "How often do you wash your hair?",
  //   options: ["Daily", "Every 2–3 days", "Once a week", "Less often"]
  // },
  // {
  //   id: "heatChemical",
  //   section: "Section 2: Lifestyle & Habits",
  //   question: "Do you regularly use heat or chemical treatments?",
  //   options: [
  //     "Yes, often (straightening, coloring, perming, etc.)",
  //     "Sometimes",
  //     "Rarely",
  //     "Never"
  //   ]
  // },
  // {
  //   id: "diet",
  //   section: "Section 2: Lifestyle & Habits",
  //   question: "Which best describes your diet? 🌿",
  //   options: [
  //     "Vegetarian",
  //     "Vegan",
  //     "Non-vegetarian",
  //     "Eggetarian",
  //     "Plant-based, mostly",
  //     "No specific pattern / mixed diet"
  //   ]
  // },
  // {
  //   id: "waterIntake",
  //   section: "Section 2: Lifestyle & Habits",
  //   question: "How much water do you drink daily? 💧",
  //   options: ["Less than 1 litre", "1–2 litres", "More than 2 litres"]
  // },
  // // Section 3: Wellness & Safety
  // {
  //   id: "supplements",
  //   section: "Section 3: Wellness & Safety",
  //   sectionIcon: "✨",
  //   question: "Do you take any supplements for hair health?",
  //   options: ["Yes, regularly", "Sometimes", "No, never"]
  // },
  // {
  //   id: "hormonal",
  //   section: "Section 3: Wellness & Safety",
  //   question: "Do you face any hormonal concerns that affect your hair?",
  //   options: ["Yes (PCOS, thyroid, menopause, etc.)", "Not sure", "No"]
  // },
  // {
  //   id: "pregnancy",
  //   section: "Section 3: Wellness & Safety",
  //   question: "Are you currently pregnant or breastfeeding?",
  //   options: ["Yes", "No", "Planning pregnancy soon"]
  // },
  // {
  //   id: "conditions",
  //   section: "Section 3: Wellness & Safety",
  //   question: "Do you have any known scalp conditions or allergies?",
  //   options: ["Yes (psoriasis, dermatitis, ingredient allergies, etc.)", "No"]
  // },
  // {
  //   id: "medication",
  //   section: "Section 3: Wellness & Safety",
  //   question: "Are you currently on any long-term medication (for hormones, thyroid, etc.)?",
  //   options: ["Yes", "No"]
  // },
  // {
  //   id: "stress",
  //   section: "Section 3: Wellness & Safety",
  //   question: "How would you describe your stress levels?",
  //   options: ["Low", "Moderate", "High"]
  // },
  // {
  //   id: "sleep",
  //   section: "Section 3: Wellness & Safety",
  //   question: "On average, how many hours of sleep do you get daily? 😴",
  //   options: ["Less than 5 hours", "5–7 hours", "7–9 hours", "More than 9 hours"]
  // },
  // // Section 4: Your Ru & Ri Journey
  // {
  //   id: "hairCare",
  //   section: "Section 4: Your Ru & Ri Journey",
  //   sectionIcon: "✨",
  //   question: "How often do you oil or treat your hair at home?",
  //   options: ["Weekly", "Occasionally", "Rarely", "Never"]
  // },
  // {
  //   id: "helpWith",
  //   section: "Section 4: Your Ru & Ri Journey",
  //   question: "What would you like Ru & Ri to help you with?",
  //   options: [
  //     "A complete personalized kit (products + nutrition)",
  //     "Haircare products only",
  //     "Supplements/nutrition guidance only",
  //     "Both, with gynecological input if needed"
  //   ]
  // }
];

const Consultation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const consultationType = location.state?.type as "skin" | "hair";

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [additionalNotes, setAdditionalNotes] = useState("");

  const questions = consultationType === "skin" ? skinQuestions : hairQuestions;

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleMultiSelect = (questionId: string, option: string, checked: boolean) => {
    setAnswers(prev => {
      const current = (prev[questionId] as string[]) || [];
      if (checked) {
        return { ...prev, [questionId]: [...current, option] };
      } else {
        return { ...prev, [questionId]: current.filter(item => item !== option) };
      }
    });
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate("/consultation-summary", { state: { type: consultationType, answers } });
    }
  };
  
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate("/");
    }
  };

  const currentQuestion = questions[currentStep];
  const isAnswered = currentQuestion.multiSelect
    ? Array.isArray(answers[currentQuestion.id]) && (answers[currentQuestion.id] as string[]).length > 0
    : !!answers[currentQuestion.id];

  const showSectionHeader = currentQuestion.sectionIcon;

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

          <Card className="p-8 shadow-medium">
            {showSectionHeader && (
              <div className="mb-6">
                <Badge className="bg-gradient-primary mb-2">
                  <Sparkles className="w-3 h-3 mr-1" />
                  {currentQuestion.sectionIcon} {currentQuestion.section}
                </Badge>
              </div>
            )}

            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-muted-foreground">
                  Question {currentStep + 1} of {questions.length}
                </span>
                <span className="text-sm font-medium text-primary capitalize">
                  🌿 Ru & Ri – {consultationType} Concern Quiz
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-primary transition-all duration-500"
                  style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-8 text-foreground">
              {currentQuestion.question}
            </h2>

            {currentQuestion.multiSelect ? (
              <div className="space-y-4">
                {currentQuestion.options.map((option) => {
                  const selectedOptions = (answers[currentQuestion.id] as string[]) || [];
                  const isChecked = selectedOptions.includes(option);

                  return (
                    <div
                      key={option}
                      className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer ${isChecked ? "border-primary bg-primary/5" : "border-border hover:border-primary"
                        }`}
                    >
                      <Checkbox
                        id={option}
                        checked={isChecked}
                        onCheckedChange={(checked) =>
                          handleMultiSelect(currentQuestion.id, option, checked as boolean)
                        }
                      />
                      <Label
                        htmlFor={option}
                        className="flex-1 cursor-pointer text-base"
                      >
                        {option}
                      </Label>
                    </div>
                  );
                })}
              </div>
            ) : (
              <RadioGroup
                value={answers[currentQuestion.id] as string || ""}
                onValueChange={(value) => handleAnswer(currentQuestion.id, value)}
                className="space-y-4"
              >
                {currentQuestion.options.map((option) => (
                  <div
                    key={option}
                    className="flex items-center  space-x-3 p-4 rounded-lg border-2 border-border hover:border-primary transition-all cursor-pointer"
                  >
                    <RadioGroupItem value={option} id={option} />
                    <Label
                      htmlFor={option}
                      className="flex-1 cursor-pointer text-base"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}


             

            <Button
              onClick={handleNext}
              disabled={!isAnswered}
              className="mt-8 w-full bg-gradient-primary hover:opacity-90 transition-opacity"
              size="lg"
            >
              {currentStep < questions.length - 1 ? (
                <>
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              ) : (
                <>
                  Complete Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Consultation;
