import React from "react";

const INSTAGRAM_POSTS = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=350&q=80",
    alt: "Fresh salad bowl",
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=350&q=80",
    alt: "Organic produce harvest",
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=350&q=80",
    alt: "Citrus and berries",
  },
  {
    id: "4",
    image: "https://images.unsplash.com/photo-1506617420156-8e4536971650?auto=format&fit=crop&w=350&q=80",
    alt: "Healthy lifestyle greens",
  },
  {
    id: "5",
    image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=350&q=80",
    alt: "Chinese cabbage harvest",
  },
  {
    id: "6",
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=350&q=80",
    alt: "Fresh seasonal vegetables",
  },
];

export const InstagramFeed: React.FC = () => {
  return (
    <section className="w-full bg-white py-12 sm:py-16" aria-label="Instagram Feed">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 space-y-1">
          <h2 className="text-2xl sm:text-3xl font-bold font-sans text-gray-900 tracking-tight">
            Follow us on Instagram
          </h2>
          <p className="text-xs text-gray-400 font-body">
            @ecobazar_organic
          </p>
        </div>

        {/* 6 Square Photos */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {INSTAGRAM_POSTS.map((item) => (
            <a
              key={item.id}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center cursor-pointer shadow-xs"
            >
              <img
                src={item.image}
                alt={item.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                <svg
                  className="w-6 h-6 fill-none stroke-current"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
