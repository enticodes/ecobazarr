import React from "react";
import { MapPin, PhoneCall, Mail } from "lucide-react";

export const ContactInfoCards: React.FC = () => {
  const cards = [
    {
      icon: MapPin,
      title: "Store Location",
      primaryText: "2715 Ash Dr. San Jose, South Dakota 83475",
      secondaryText: "Visit our regional distribution hub & organic market.",
    },
    {
      icon: PhoneCall,
      title: "Call Us 24/7",
      primaryText: "(219) 555-0114 / (164) 333-0487",
      secondaryText: "Our friendly support specialists are ready to help.",
    },
    {
      icon: Mail,
      title: "Email Support",
      primaryText: "ecobazar.help@gmail.com",
      secondaryText: "We typically answer all inquiries within 2 hours.",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className="bg-white p-6 sm:p-7 rounded-xl border border-gray-100 shadow-xs hover:shadow-card transition-all duration-200 flex flex-col items-center text-center space-y-4"
          >
            <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <Icon className="w-6 h-6 stroke-[2.2]" />
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                {card.title}
              </span>
              <p className="text-base font-bold text-gray-900 font-sans leading-snug">
                {card.primaryText}
              </p>
              <p className="text-xs text-gray-500 leading-relaxed pt-1">
                {card.secondaryText}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
