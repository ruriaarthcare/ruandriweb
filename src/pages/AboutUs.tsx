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
          
          {/* Page Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-foreground">About Ru & Ri</h1>
            <p className="text-lg text-muted-foreground">
              Mindfully Curated. Soulfully Yours.
            </p>
          </div>

          {/* ABOUT US SECTION */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary" />
                About Us
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Welcome to Ru & Ri, where wellness meets care, and routines turn into rituals.
                We believe every woman deserves to feel seen, heard, and understood — not overwhelmed
                by complicated routines or endless trial-and-error products.
                <br /><br />
                At Ru & Ri, we don’t guess your needs. We listen to them.
                Through a personalised consultation, we understand your concerns, daily habits,
                lifestyle, nutrition patterns, stress levels, sleep cycles, and hormonal cues.
                <br /><br />
                Your skin and hair aren’t just physical — they’re a reflection of your body, mind,
                and emotions.
                <br /><br />
                Your subscription kit is curated exclusively for you using high-performance
                professional products from trusted brands, chosen by trained experts.
                <br /><br />
                We pair this with nutrition or dietary guidance, and if needed, a gynaecology
                consultation. Your first gynaecologist consultation is complimentary —
                because sometimes skin and hair concerns need deeper understanding, not just
                surface-level products.
                <br /><br />
                We are here to support you, not sell to you. We suggest supplements only if prescribed
                by experts.
              </p>
            </CardContent>
          </Card>

          {/* WHY I STARTED RU & RI */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Why I Started Ru & Ri
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Ru & Ri was born from a very real place — struggle.
                <br /><br />
                For years, I kept trying different products and routines, hoping something would
                finally work for my skin and hair. What hurt more than breakouts or hair fall was the
                lack of guidance. Nobody understood the emotional weight behind those concerns.
                <br /><br />
                Every consultation felt clinical. Every recommendation felt transactional. Every
                product felt like a gamble.
                <br /><br />
                There was no one to ask:
              </p>

              <ul className="list-disc ml-6 mt-4 text-muted-foreground">
                <li>“Why is this happening to me?”</li>
                <li>“Is this hormonal?”</li>
                <li>“Is this because I’m exhausted?”</li>
                <li>“Is this nutrition-related?”</li>
              </ul>

              <p className="text-muted-foreground leading-relaxed mt-4">
                At some point, juggling responsibilities — work, family, emotions — I stopped choosing
                myself. My wellbeing became last on my list.
                <br /><br />
                Then it hit me: Women don’t struggle because solutions don’t exist.  
                We struggle because we don’t have guided, personalised care.
                <br /><br />
                That day, Ru & Ri was born.
                <br /><br />
                Ru & Ri is my way of giving women what I wish someone had given me:
              </p>

              <ul className="list-disc ml-6 mt-4 text-muted-foreground">
                <li>Personal care without judgment</li>
                <li>Guidance without confusion</li>
                <li>Support without pressure</li>
              </ul>

              <p className="text-muted-foreground leading-relaxed mt-4">
                A space where every woman feels prioritised, cared for, and understood.
              </p>
            </CardContent>
          </Card>

          {/* WHAT MAKES US DIFFERENT */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                What Makes Ru & Ri Different
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc ml-6 text-muted-foreground leading-relaxed">
                <li>Personalised, not generic — every kit is curated only after understanding YOU.</li>
                <li>Expert-backed — professionals curate your kit and guide your journey.</li>
                <li>Nutrition & lifestyle guidance — because real results come from within.</li>
                <li>Women-first health support — first gynaecologist consultation is complimentary.</li>
                <li>No unnecessary supplements — recommended only if prescribed by experts.</li>
              </ul>
            </CardContent>
          </Card>

          {/* MISSION */}
          <Card>
            <CardHeader>
              <CardTitle>Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To help women feel confident, supported, and cared for — inside and out.
              </p>
            </CardContent>
          </Card>

          {/* VISION */}
          <Card>
            <CardHeader>
              <CardTitle>Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground ">
                To simplify skin and hair wellness by blending professional expertise with
                personalised care.
                <div className="text-center">
                  <br /><br />
                <strong>Mindfully Curated. Soulfully Yours.</strong>
                <br />
                Ru & Ri
                </div>
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
