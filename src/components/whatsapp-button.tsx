"use client";

import Link from "next/link";
import WhatsAppIcon from "./icons/whatsapp-icon";

const WhatsAppButton = () => {
  return (
    <Link
      href="https://wa.me/8801339844255"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-transform duration-300 hover:scale-110 hover:bg-green-600"
      aria-label="Chat on WhatsApp"
    >
      <div className="w-8 h-8">
        <WhatsAppIcon />
      </div>
    </Link>
  );
};

export default WhatsAppButton;
