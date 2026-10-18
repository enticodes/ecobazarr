import React from "react";
import { TEAM_MEMBERS } from "@/data/team";
import {
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
  PinterestIcon,
} from "@/components/common";

export const AboutTeam: React.FC = () => {
  return (
    <section className="py-14 sm:py-20 bg-gray-50/60 border-t border-gray-100" aria-label="Our Team">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            Leadership
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-sans text-gray-900 tracking-tight">
            Our Awesome Team
          </h2>
          <p className="text-sm text-gray-500">
            Meet the dedicated individuals committed to delivering fresh, healthy food to your family.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.id}
              className="group bg-white rounded-xl border border-gray-100 overflow-hidden shadow-xs hover:shadow-card transition-all duration-200 flex flex-col"
            >
              {/* Photo with Overlay Socials */}
              <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3">
                  <a
                    href={member.socials?.facebook || "#"}
                    aria-label={`${member.name} Facebook`}
                    className="w-9 h-9 rounded-full bg-white text-gray-800 hover:bg-primary hover:text-white flex items-center justify-center transition-colors shadow-sm"
                  >
                    <FacebookIcon className="w-3.5 h-3.5 fill-current" />
                  </a>
                  <a
                    href={member.socials?.twitter || "#"}
                    aria-label={`${member.name} Twitter`}
                    className="w-9 h-9 rounded-full bg-white text-gray-800 hover:bg-primary hover:text-white flex items-center justify-center transition-colors shadow-sm"
                  >
                    <TwitterIcon className="w-3.5 h-3.5 fill-current" />
                  </a>
                  <a
                    href={member.socials?.instagram || "#"}
                    aria-label={`${member.name} Instagram`}
                    className="w-9 h-9 rounded-full bg-white text-gray-800 hover:bg-primary hover:text-white flex items-center justify-center transition-colors shadow-sm"
                  >
                    <InstagramIcon className="w-3.5 h-3.5 fill-none stroke-current" />
                  </a>
                  <a
                    href={member.socials?.pinterest || "#"}
                    aria-label={`${member.name} Pinterest`}
                    className="w-9 h-9 rounded-full bg-white text-gray-800 hover:bg-primary hover:text-white flex items-center justify-center transition-colors shadow-sm"
                  >
                    <PinterestIcon className="w-3.5 h-3.5 fill-current" />
                  </a>
                </div>
              </div>

              {/* Info */}
              <div className="p-5 text-center space-y-1">
                <h3 className="text-base font-bold text-gray-900 font-sans group-hover:text-primary transition-colors">
                  {member.name}
                </h3>
                <p className="text-xs font-medium text-gray-400">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
