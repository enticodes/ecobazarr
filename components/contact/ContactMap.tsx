import React from "react";
import { MapPin, Clock, Navigation } from "lucide-react";

export const ContactMap: React.FC = () => {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-gray-100 shadow-xs bg-gray-100 min-h-[380px] sm:min-h-[440px] flex items-end sm:items-center p-4 sm:p-8">
      {/* Background Stylized Map Pattern */}
      <div
        className="absolute inset-0 bg-cover bg-center grayscale opacity-85"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1600&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-linear-to-r from-black/50 via-black/25 to-transparent" />

      {/* Center Simulated Location Pin */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none hidden sm:flex flex-col items-center">
        <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg animate-bounce">
          <MapPin className="w-6 h-6 fill-white" />
        </div>
        <span className="mt-2 bg-gray-900 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md whitespace-nowrap">
          Ecobazar Main Hub
        </span>
      </div>

      {/* Floating Info Card */}
      <div className="relative z-10 w-full sm:w-auto sm:max-w-sm bg-white/95 backdrop-blur-md p-6 rounded-xl shadow-lg border border-white/60 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-primary block">
              Flagship Hub
            </span>
            <h3 className="text-sm font-bold text-gray-900 font-sans">
              Ecobazar Organic Store
            </h3>
          </div>
        </div>

        <p className="text-xs text-gray-600 leading-relaxed">
          2715 Ash Dr. San Jose, South Dakota 83475, United States
        </p>

        <div className="space-y-2 pt-2 border-t border-gray-100 text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-400 shrink-0" />
            <span>Mon – Fri: 8:00 AM – 8:00 PM</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-400 shrink-0" />
            <span>Sat – Sun: 9:00 AM – 6:00 PM</span>
          </div>
        </div>

        <div className="pt-1">
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:text-primary-dark transition-colors"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Open in Google Maps</span>
          </a>
        </div>
      </div>
    </div>
  );
};
