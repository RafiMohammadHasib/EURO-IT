import { Copyright } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full py-6 mt-auto">
      <div className="container mx-auto text-center text-muted-foreground text-sm flex items-center justify-center gap-2">
        <Copyright className="h-4 w-4" />
        <span>{new Date().getFullYear()} Euro IT Vision. All Rights Reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;
