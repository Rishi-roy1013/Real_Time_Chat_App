import { useEffect, useMemo, useState } from "react";

const animeImages = [
  "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?q=80&w=600",
  "https://images.unsplash.com/photo-1606112219348-204d7c3b46f1?q=80&w=600",
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600",
  "https://images.unsplash.com/photo-1535223289827-42f1e9919769?q=80&w=600",
  "https://images.unsplash.com/photo-1520975922321-9f94a5d7f2c1?q=80&w=600",
  "https://images.unsplash.com/photo-1558981001-5864b32527b4?q=80&w=600",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=600",
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=600",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600",
];

const shuffle = (arr) => [...arr].sort(() => 0.5 - Math.random());

const AuthImagePattern = ({ title, subtitle }) => {
  const [images, setImages] = useState(() => shuffle(animeImages).slice(0, 9));

  // 🔁 Auto change images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setImages(shuffle(animeImages).slice(0, 9));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
      <div className="max-w-md text-center">
        <div className="grid grid-cols-3 gap-3 mb-8">
          {images.map((img, i) => (
            <div
              key={i}
              className="group relative aspect-square rounded-2xl overflow-hidden shadow-lg"
            >
              {/* Image */}
              <img
                src={img}
                alt="anime"
                className="w-full h-full object-cover transition duration-500 group-hover:blur-sm scale-110"
                loading="lazy"
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-70" />

              {/* Hover Title Overlay */}
              <div className="absolute inset-0 flex items-end p-2 opacity-0 group-hover:opacity-100 transition">
                <span className="text-xs font-medium text-white bg-black/50 backdrop-blur px-2 py-1 rounded-md">
                  Anime Vibes ✨
                </span>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-base-content/60">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
