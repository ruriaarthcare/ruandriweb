import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Heart, Users, Award } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const AboutUs = () => {
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

        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-foreground">About Ru & Ri</h1>
            <p className="text-lg text-muted-foreground">
              Your trusted partner in personalized skin and hair wellness
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                At Ru & Ri, we believe that everyone deserves personalized care for their unique skin and hair needs. 
                Our mission is to provide expert dermatology consultations and curated wellness solutions that transform 
                lives through science-backed treatments and compassionate care.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Our Team
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Our team consists of 15+ board-certified dermatologists and skincare specialists with decades of 
                combined experience. We're passionate about helping you achieve your skin and hair goals through 
                personalized treatment plans and ongoing support.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                Our Approach
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We combine cutting-edge dermatological science with holistic wellness practices to create 
                comprehensive care plans. Every recommendation is tailored to your unique needs, lifestyle, 
                and goals, ensuring sustainable results that last.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;
