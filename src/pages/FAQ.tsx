import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const FAQ = () => {
  const navigate = useNavigate();

  const faqs = [
    {
      question: "What is Ru & Ri?",
      answer:
        "Ru & Ri, a brand by Ruri Aarth Care LLP, offers personalized holistic skincare and haircare solutions for women. Each kit is curated by wellness experts and focuses on balancing your body, mind, and soul through dermatologist-tested products, nutritional guidance, and expert consultations.",
    },
    {
      question: "What do the Ru & Ri wellness kits include?",
      answer:
        "Each Ru & Ri kit is tailored to your individual skin or hair needs based on your responses to our concern questionnaire. Your kit may include: • Dermatologist-tested products • Nutrition guidance • First gynecologist consultation free • Supplements if prescribed by certified experts.",
    },
    {
      question: "Who are the experts behind Ru & Ri?",
      answer:
        "Your personalized kit is designed by a panel of qualified experts including skincare and haircare professionals, certified nutrition experts, and experienced gynecologists.",
    },
    {
      question: "How does the gynecologist consultation work?",
      answer:
        "Your first gynecologist consultation is complimentary with every subscription. Any follow-up consultations or treatments will be chargeable separately. Our team will assist you if you wish to continue further appointments.",
    },
    {
      question: "Is nutrition guidance included in my plan?",
      answer:
        "Yes. Nutrition guidance is part of your Ru & Ri subscription. Experts offer advice to support your wellness journey. Supplements or dietary additions will be provided only if prescribed.",
    },
    {
      question: "How do I know which kit is right for me?",
      answer:
        "Start by completing our Skin and Hair Concern Questionnaire on the website. Your responses help us understand your skin or hair needs and curate a personalized kit.",
    },
    {
      question: "Are the products dermatologist-tested?",
      answer:
        "Yes, every product in Ru & Ri kits is dermatologist-tested and selected based on professional standards for safety and effectiveness.",
    },
    {
      question: "Are Ru & Ri kits available only for women?",
      answer:
        "Yes, currently Ru & Ri kits are designed exclusively for women. More collections may be added in the future.",
    },
    {
      question: "How long does delivery take?",
      answer:
        "Once your order is confirmed, your kit will be shipped within 7–10 business days. You will receive tracking details via email after dispatch.",
    },
    {
      question: "Can I change my subscription plan later?",
      answer:
        "Yes, you can upgrade or extend your subscription anytime by contacting our customer care at ruriaarthcare@gmail.com.",
    },
    {
      question: "What if I have allergies or sensitive skin?",
      answer:
        "Experts review your questionnaire and consider your sensitivities before finalizing your kit. You may mention specific allergies to ensure safe ingredient selection.",
    },
    {
      question: "What is your refund or replacement policy?",
      answer:
        "Refunds are not applicable due to the personalized nature of the kits. However, damaged or incorrect products will be replaced at no extra cost.",
    },
    {
      question: "How can I contact Ru & Ri?",
      answer:
        "You can reach us via email at ruriaarthcare@gmail.com or through our website www.ruandricare.com. Our support team is ready to help you with any queries.",
    },
  ];

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

        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-foreground">Frequently Asked Questions</h1>
            <p className="text-lg text-muted-foreground">
              Find answers to common questions about our services
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border rounded-lg px-6 bg-card"
              >
                <AccordionTrigger className="text-left font-semibold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
