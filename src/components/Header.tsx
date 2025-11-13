import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <img 
            src={logo} 
            alt="DermaCare Logo" 
            className="h-12 cursor-pointer" 
            onClick={() => navigate("/")}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
