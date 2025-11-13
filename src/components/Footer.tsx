import { Link } from "react-router-dom";
import { 
  FaEnvelope ,
  FaInstagram, 
  FaTwitter, 
  FaWhatsapp, 
  FaFacebook, 
  FaLinkedin 
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background/95 backdrop-blur mt-auto">
      <div className="container mx-auto px-4 py-8">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Brand */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Ru & Ri</h3>
            <p className="text-sm text-muted-foreground">
              Personalized skin and hair wellness solutions curated by dermatologists, nutritionists, 
              and gynecologists for holistic well-being.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                About Us
              </Link>
              <Link to="/faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                FAQ
              </Link>
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Terms & Conditions
              </Link>
              <Link to="/privacy-policy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy & Refund Policy
              </Link>
            
              <Link to="/feedback" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Feedback
              </Link>
            </nav>
          </div>

          {/* Social & Contact */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Stay Connected</h3>

            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <FaEnvelope  className="w-4 h-4" />
              <a href="mailto:ruriaarthcare@gmail.com" className="hover:text-primary transition-colors">
                ruriaarthcare@gmail.com
              </a>
            </div>

            <div className="flex gap-4">

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <FaInstagram className="w-5 h-5" />
              </a>

            
              {/* WhatsApp */}
              <a
                href="https://wa.me/91XXXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <FaWhatsapp className="w-5 h-5" />
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <FaFacebook className="w-5 h-5" />
              </a>

              
            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Ru & Ri. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
