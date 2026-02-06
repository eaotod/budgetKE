"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { PlayIcon, Cancel01Icon } from "@hugeicons/core-free-icons";
import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    name: "John Kamau",
    role: "Retail Shop Owner",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
    video: "/videos/proofs/proof-1.mp4",
  },
  {
    name: "Sarah Mwangi",
    role: "Freelance Consultant",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop",
    video: "/videos/proofs/proof-2.mp4",
  },
  {
    name: "David Ochieng",
    role: "Tech Entrepreneur",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop",
    video: "/videos/proofs/proof-3.mp4",
  },
  {
    name: "Faith Kyallo",
    role: "Financial Advisor",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=800&auto=format&fit=crop",
    video: "/videos/proofs/proof-4.mp4",
  },
];

export function SocialProof() {
  const [activeTeaser, setActiveTeaser] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState<
    (typeof testimonials)[0] | null
  >(null);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (selectedVideo || !hasMounted) return;

    const timer = setInterval(() => {
      setActiveTeaser((prev) => (prev + 1) % testimonials.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [selectedVideo, hasMounted]);

  const handleCardClick = useCallback((video: (typeof testimonials)[0]) => {
    setSelectedVideo(video);
  }, []);

  return (
    <section className="relative overflow-hidden bg-white py-20 lg:py-32">
      {/* Decorative Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb),0.03)_0%,transparent_100%)] -z-10" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16 lg:mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-widest mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Wall of Love
          </div>
          <h2 className="max-w-2xl mx-auto">
            Trusted by the best in the business.
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {testimonials.map((item, index) => {
            const isActive = activeTeaser === index && !selectedVideo;

            return (
              <div
                key={index}
                className="group relative cursor-pointer"
                onClick={() => handleCardClick(item)}
              >
                {/* Portrait Video Card */}
                <div
                  className={cn(
                    "relative aspect-3/4 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden bg-gray-900 border transition-all duration-700",
                    isActive
                      ? "border-primary shadow-2xl shadow-primary/20 scale-[1.02]"
                      : "border-gray-100 shadow-sm group-hover:border-primary/20",
                  )}
                >
                  {/* Poster Image */}
                  <div
                    className={cn(
                      "absolute inset-0 bg-cover bg-center transition-all duration-1000 z-10",
                      isActive
                        ? "opacity-0 scale-110"
                        : "opacity-100 scale-100",
                    )}
                    style={{ backgroundImage: `url(${item.image})` }}
                  />

                  {/* Teaser Video */}
                  {hasMounted && isActive && (
                    <video
                      src={item.video}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover scale-105"
                    />
                  )}

                  {/* Dark Overlay */}
                  <div
                    className={cn(
                      "absolute inset-0 z-20 transition-colors duration-500",
                      isActive
                        ? "bg-black/40"
                        : "bg-black/20 group-hover:bg-black/30",
                    )}
                  />

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center z-30">
                    <div
                      className={cn(
                        "w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all duration-500",
                        isActive
                          ? "bg-primary text-white scale-110 shadow-lg shadow-primary/30"
                          : "bg-white/20 backdrop-blur-md text-white border border-white/30 group-hover:scale-110 group-hover:bg-white/30",
                      )}
                    >
                      <HugeiconsIcon
                        icon={PlayIcon}
                        size={24}
                        className="ml-1 fill-current"
                      />
                    </div>
                  </div>

                  {/* Metadata Overlay (Bottom Left) */}
                  <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 text-white z-30">
                    <div className="text-base md:text-lg font-bold mb-0.5 tracking-tight group-hover:text-primary transition-colors">
                      {item.name}
                    </div>
                    <div className="text-[9px] md:text-[10px] font-medium text-white/70 uppercase tracking-widest">
                      {item.role}
                    </div>
                  </div>

                  {/* Active Indicator */}
                  {isActive && (
                    <div className="absolute top-4 right-4 md:top-6 md:right-6 flex items-center gap-1.5 px-2 py-1 rounded-full bg-primary z-30 shadow-lg">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                      <span className="text-[8px] font-bold text-white uppercase tracking-wider">
                        Watching
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Full Video Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-200"
          onClick={() => setSelectedVideo(null)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-3xl" />

          {/* Content Container */}
          <div
            className="relative w-full max-w-lg aspect-3/4 bg-black rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Actual Full Video */}
            {hasMounted && selectedVideo && (
              <video
                src={selectedVideo.video}
                autoPlay
                controls
                playsInline
                className="w-full h-full object-contain"
              />
            )}

            {/* Close Button */}
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-6 right-6 md:top-8 md:right-8 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all z-50 overflow-hidden group"
            >
              <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
              <HugeiconsIcon
                icon={Cancel01Icon}
                size={24}
                className="relative z-10"
              />
            </button>

            {/* Meta Info (Bottom) */}
            <div className="absolute bottom-0 inset-x-0 p-8 md:p-12 bg-linear-to-t from-black via-black/40 to-transparent pointer-events-none">
              <div className="text-xl md:text-2xl font-bold text-white mb-1">
                {selectedVideo.name}
              </div>
              <div className="text-xs md:text-sm font-medium text-white/60 uppercase tracking-widest">
                {selectedVideo.role}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
