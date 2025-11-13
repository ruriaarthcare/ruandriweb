import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, User, Heart, Leaf } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Index = () => {
  const navigate = useNavigate();

  const handleConsultation = (type: "skin" | "hair") => {
    navigate("/consultation", { state: { type } });
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">Personalized Wellness Journey</span>

              </div>

              <h1 className="text-6xl font-bold leading-tight text-foreground">
                Welcome to
                <span className="block bg-gradient-primary bg-clip-text text-transparent">
                  Ru & Ri
                </span>
              </h1>

              <p className="text-xl text-muted-foreground max-w-xl">
                Start your transformation journey today with personalized care plans.
              </p>


            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-3xl rounded-full"></div>
              <img
                src={heroImage}
                alt="Dermatology consultation"
                className="relative rounded-3xl shadow-strong w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Selection */}
      <section className="container mx-auto  py-0">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-foreground">
            Begin Your Journey
          </h2>
          <p className="text-xl text-muted-foreground">
            Choose your consultation type to get started
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          <Card className="group p-8 shadow-soft hover:shadow-strong transition-all duration-300 cursor-pointer border-2 hover:border-primary">
            <div className="text-center space-y-6">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-primary flex items-center justify-center shadow-medium group-hover:scale-110 transition-transform">
                <Sparkles className="w-10 h-10 text-primary-foreground" />
              </div>

              <div>
                <h3 className="text-3xl font-bold mb-3 text-foreground">
                  Skin  Concern
                </h3>
                <p className="text-muted-foreground mb-6">
                  Expert guidance for acne, pigmentation, anti-aging, and more. 
                </p>
              </div>

              <Button
                onClick={() => handleConsultation("skin")}
                className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
                size="lg"
              >
                Start Skin Questionnaire
              </Button>
            </div>
          </Card>

          <Card className="group p-8 shadow-soft hover:shadow-strong transition-all duration-300 cursor-pointer border-2 hover:border-secondary">
            <div className="text-center space-y-6">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-secondary flex items-center justify-center shadow-medium group-hover:scale-110 transition-transform">
                <Heart className="w-10 h-10 text-secondary-foreground" />
              </div>

              <div>
                <h3 className="text-3xl font-bold mb-3 text-foreground">
                  Hair Concern
                </h3>
                <p className="text-muted-foreground mb-6">
                  Address hair fall, thinning, dandruff, and scalp health.
                  Achieve stronger, healthier hair.
                </p>
              </div>

              <Button
                onClick={() => handleConsultation("hair")}
                className="w-full bg-gradient-secondary hover:opacity-90 transition-opacity"
                size="lg"
              >
                Start Hair Questionnaire
              </Button>
            </div>
          </Card>
        </div>
      </section>



      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            Why Choose Ru & Ri?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="bg-primary/10 p-4 rounded-full">
                  <User className="w-8 h-8 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Personalized</h3>
              <p className="text-muted-foreground">
                Every recommendation is tailored to your unique needs and lifestyle
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="bg-primary/10 p-4 rounded-full">
                  <Leaf className="w-8 h-8 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Vitality</h3>
              <p className="text-muted-foreground">
                Dermatology-tested formulations paired with nutrition for complete inner and outer wellness.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="bg-primary/10 p-4 rounded-full">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Expert-Backed</h3>
              <p className="text-muted-foreground">
                Curated by wellness experts and gynecologists when needed
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* Footer */}
      <Footer />



    </div>
  );
};

export default Index;
