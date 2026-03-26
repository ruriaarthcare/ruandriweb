import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import Header from "@/components/Header";

import { updateSession } from "@/services/session.service";
import { toast } from "@/components/ui/sonner";

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
    multiSelect: true,
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
    multiSelect: true,
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
    multiSelect: true,
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
    multiSelect: true,
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
    multiSelect: true,
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
  }
];

const hairQuestions: Question[] = [
  // Section 1: Hair Goals & Concerns
  {
    id: "hairGoal",
    section: "Section 1: Hair Goals & Concerns",
    sectionIcon: "✨",
    question: "What is your primary hair goal?",
    multiSelect: true,
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
  {
    id: "scalpType",
    section: "Section 1: Hair Goals & Concerns",
    question: "How would you describe your scalp type?",
    multiSelect: true,
    options: ["Dry / itchy", "Oily / greasy", "Normal / balanced", "Sensitive"]
  },
  {
    id: "hairTexture",
    section: "Section 1: Hair Goals & Concerns",
    question: "How would you describe your hair texture?",
    options: ["Straight", "Wavy", "Curly", "Coily"]
  },
  {
    id: "hairIssues",
    section: "Section 1: Hair Goals & Concerns",
    question: "Do you experience any of the following? (You can select more than one)",
    multiSelect: true,
    options: [
      "Split ends",
      "Thinning / reduced density",
      "Premature greying",
      "Dandruff / flaking",
      "Hair breakage",
      "Slow growth"
    ]
  },
  // Section 2: Lifestyle & Habits
  {
    id: "washFrequency",
    section: "Section 2: Lifestyle & Habits",
    sectionIcon: "✨",
    question: "How often do you wash your hair?",
    options: ["Daily", "Every 2-3 days", "Once a week", "Less often"]
  },
  {
    id: "heatChemical",
    section: "Section 2: Lifestyle & Habits",
    question: "Do you regularly use heat or chemical treatments?",
    options: [
      "Yes, often (straightening, coloring, perming, etc.)",
      "Sometimes",
      "Rarely",
      "Never"
    ]
  },
  {
    id: "diet",
    section: "Section 2: Lifestyle & Habits",
    question: "Which best describes your diet? 🌿",
    multiSelect: true,
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
    options: ["Less than 1 litre", "1-2 litres", "More than 2 litres"]
  },
  // Section 3: Wellness & Safety
  {
    id: "supplements",
    section: "Section 3: Wellness & Safety",
    sectionIcon: "✨",
    question: "Do you take any supplements for hair health?",
    options: ["Yes, regularly", "Sometimes", "No, never"]
  },
  {
    id: "hormonal",
    section: "Section 3: Wellness & Safety",
    question: "Do you face any hormonal concerns that affect your hair?",
    options: ["Yes (PCOS, thyroid, menopause, etc.)", "Not sure", "No"]
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
    question: "Do you have any known scalp conditions or allergies?",
    options: ["Yes (psoriasis, dermatitis, ingredient allergies, etc.)", "No"]
  },
  {
    id: "medication",
    section: "Section 3: Wellness & Safety",
    question: "Are you currently on any long-term medication (for hormones, thyroid, etc.)?",
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
    options: ["Less than 5 hours", "5-7 hours", "7-9 hours", "More than 9 hours"]
  },
  // Section 4: Your Ru & Ri Journey
  {
    id: "hairCare",
    section: "Section 4: Your Ru & Ri Journey",
    sectionIcon: "✨",
    question: "How often do you oil or treat your hair at home?",
    options: ["Weekly", "Occasionally", "Rarely", "Never"]
  }
];

const Consultation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const consultationType = location.state?.type as "skin" | "hair";

  const [currentStep, setCurrentStep] = useState(-1);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: ""
  });

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

  const handleNext = async () => {
  try {
    // Step -1 (User info step)
    if (currentStep === -1) {
      // Save user personal details inside userDATA map
      await updateSession("userData.name", userInfo.name);
      await updateSession("userData.email", userInfo.email);
      await updateSession("userData.phone", userInfo.phone);

      // advance to first question
      setCurrentStep(0);
      return;
    }

    // Question steps: currentStep 0 => Q1, 1 => Q2, ...
    if (currentStep <= questions.length - 1) {
      const q = currentQuestion!;
      const answerValue = answers[q.id];

      // Compute Q key. currentStep 0 => Q1
      const qKey = `Q${currentStep + 1}`;

      // For multiSelect, ensure array; else pass string
      const payload = currentQuestion!.multiSelect
        ? (Array.isArray(answerValue) ? answerValue : [])
        : (answerValue ?? "");

      await updateSession(qKey, payload);

      // move to next question or finish
      if (currentStep < questions.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        // final question answered -> go to summary
        navigate("/consultation-summary", {
          state: {
            type: consultationType,
            answers,
            userInfo,
          },
        });
      }
      return;
    }

  } catch (err) {
    toast.error("Failed to save session. Please try again.");
  }
};

  
  const handleBack = () => {
    if (currentStep > -1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate("/");
    }
  };

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userInfo.email);
    const isValidPhone = /^[0-9]{10}$/.test(userInfo.phone);

    const isUserInfoComplete =
      userInfo.name.trim() !== "" &&
      isValidEmail &&
      isValidPhone;

  // For question steps
  const currentQuestion = currentStep >= 0 ? questions[currentStep] : null;
  const isAnswered = currentQuestion ? (currentQuestion.multiSelect 
    ? Array.isArray(answers[currentQuestion.id]) && (answers[currentQuestion.id] as string[]).length > 0
    : !!answers[currentQuestion.id]) : false;
  
  const showSectionHeader = currentQuestion?.sectionIcon;

  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col">
      <Header />
      <div className="container mx-auto px-4 flex-1 flex items-center justify-center py-8">
        <div className="w-full max-w-3xl">
          <Button
            variant="ghost"
            onClick={handleBack}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <Card className="p-6 shadow-medium flex flex-col max-h-[85vh]">
            {currentStep === -1 ? (
              // User Info Step
              <>
                <div className="mb-4">
                  <Badge className="bg-gradient-primary mb-2">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Your Information
                  </Badge>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm text-muted-foreground">
                      Step 1 of {questions.length + 1}
                    </span>
                    <span className="text-sm font-medium text-primary capitalize">
                      🌿 Ru & Ri – {consultationType} Consultation
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-primary transition-all duration-500"
                      style={{ width: `${(1 / (questions.length + 1)) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="flex-1 flex flex-col min-h-0">
                  <h2 className="text-xl font-bold mb-4 text-foreground flex-shrink-0">
                    Let's start with your basic information
                  </h2>

                  <div className="flex-1 overflow-y-auto pr-2 -mr-2 mb-4">
                    <div className="space-y-4 p-3">
                      <div>
                        <Label htmlFor="name" className="text-sm mb-2 block">
                          Full Name *
                        </Label>
                        <Input
                          id="name"
                          placeholder="Enter your full name"
                          value={userInfo.name}
                          onChange={(e) => setUserInfo(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full "
                        />
                      </div>

                      <div>
                        <Label htmlFor="email" className="text-sm mb-2 block">
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          value={userInfo.email}
                          onChange={(e) => setUserInfo((prev) => ({ ...prev, email: e.target.value }))}
                          className="w-full"
                          required
                        />
                      </div>

                      <div>
                      <Label htmlFor="phone" className="text-sm mb-2 block">
                        Phone Number *
                      </Label>
                      <div className="flex items-center">
                        <span className="px-3 py-2 border border-border bg-muted rounded-l-md text-sm text-muted-foreground select-none">
                          +91
                        </span>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="Enter 10-digit phone number"
                          value={userInfo.phone}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, ""); // removes non-digits
                            if (value.length <= 10) {
                              setUserInfo((prev) => ({ ...prev, phone: value }));
                            }
                          }}
                          className="w-full rounded-l-none"
                          maxLength={10}
                        />
                      </div>
                    </div>

                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleNext}
                  disabled={!isUserInfoComplete}
                  className="w-full bg-gradient-primary hover:opacity-90 transition-opacity flex-shrink-0"
                  size="lg"
                >
                  Continue to Questions
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </>
            ) : (
              // Question Steps
              <>
                {showSectionHeader && (
                  <div className="mb-4">
                    <Badge className="bg-gradient-primary mb-2">
                      <Sparkles className="w-3 h-3 mr-1" />
                      {currentQuestion!.sectionIcon} {currentQuestion!.section}
                    </Badge>
                  </div>
                )}

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm text-muted-foreground">
                      Step {currentStep + 2} of {questions.length + 1}
                    </span>
                    <span className="text-sm font-medium text-primary capitalize">
                      🌿 Ru & Ri – {consultationType} Concern Quiz
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-primary transition-all duration-500"
                      style={{ width: `${((currentStep + 2) / (questions.length + 1)) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="flex-1 flex flex-col min-h-0">
                  <h2 className="text-xl font-bold mb-4 text-foreground flex-shrink-0">
                    {currentQuestion!.question}
                  </h2>

                  <div className="flex-1 overflow-y-auto pr-2 -mr-2 mb-4">
                    {currentQuestion!.multiSelect ? (
                      <div className="space-y-3">
                        {currentQuestion!.options.map((option) => {
                          const selectedOptions = (answers[currentQuestion!.id] as string[]) || [];
                          const isChecked = selectedOptions.includes(option);
                          
                          return (
                            <div
                              key={option}
                              className={`flex items-center space-x-3 p-3 rounded-lg border-2 transition-all cursor-pointer ${
                                isChecked ? "border-primary bg-primary/5" : "border-border hover:border-primary"
                              }`}
                            >
                              <Checkbox
                                id={option}
                                checked={isChecked}
                                onCheckedChange={(checked) => 
                                  handleMultiSelect(currentQuestion!.id, option, checked as boolean)
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
                        value={answers[currentQuestion!.id] as string || ""}
                        onValueChange={(value) => handleAnswer(currentQuestion!.id, value)}
                        className="space-y-3"
                      >
                        {currentQuestion!.options.map((option) => (
                          <div
                            key={option}
                            className="flex items-center space-x-3 p-3 rounded-lg border-2 border-border hover:border-primary transition-all cursor-pointer"
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

                  
                  </div>
                </div>

                <Button
                  onClick={handleNext}
                  disabled={!isAnswered}
                  className="w-full bg-gradient-primary hover:opacity-90 transition-opacity flex-shrink-0"
                  size="lg"
                >
                  {currentStep < questions.length - 1 ? (
                    <>
                      Continue
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  ) : (
                    "Continue"
                  )}
                </Button>
              </>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Consultation;