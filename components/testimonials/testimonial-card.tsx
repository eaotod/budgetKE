import { HugeiconsIcon } from "@hugeicons/react";
import { QuoteDownIcon, StarIcon } from "@hugeicons/core-free-icons";
import { VideoPlayer } from "@/components/ui/video-player";
import NextImage from "next/image";
import type { Testimonial } from "@/lib/types";

// Single testimonial card
export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col h-full">
      {/* Quote icon */}
      <HugeiconsIcon
        icon={QuoteDownIcon}
        className="w-8 h-8 text-primary/20 mb-4"
      />

      {/* Stars */}
      <div className="flex items-center gap-0.5 mb-4">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <HugeiconsIcon
            key={i}
            icon={StarIcon}
            className="w-4 h-4 text-yellow-400"
          />
        ))}
      </div>

      {/* Content */}
      <p className="text-gray-600 leading-relaxed grow mb-6">
        &quot;{testimonial.shortQuote || testimonial.content}&quot;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden shrink-0">
          {testimonial.authorAvatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={testimonial.authorAvatar}
              alt={testimonial.authorName}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-lg font-bold text-gray-400">
              {testimonial.authorName.charAt(0)}
            </span>
          )}
        </div>
        <div>
          <p className="font-semibold text-gray-900">
            {testimonial.authorName}
          </p>
          <p className="text-sm text-gray-500">
            {testimonial.authorTitle}
            {testimonial.authorLocation && `, ${testimonial.authorLocation}`}
          </p>
        </div>
      </div>
    </div>
  );
}

// Video testimonial card
export function VideoTestimonialCard({
  testimonial,
}: {
  testimonial: Testimonial;
}) {
  if (!testimonial.videoUrl) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <VideoPlayer
        videoUrl={testimonial.videoUrl}
        thumbnailUrl={testimonial.videoThumbnail}
        title={`${testimonial.authorName} testimonial`}
        className="aspect-video"
      />

      <div className="p-6">
        {/* Quote */}
        <p className="text-gray-600 mb-4">
          &quot;{testimonial.shortQuote || testimonial.content}&quot;
        </p>

        {/* Author */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
            {testimonial.authorAvatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={testimonial.authorAvatar}
                alt={testimonial.authorName}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="font-bold text-gray-400">
                {testimonial.authorName.charAt(0)}
              </span>
            )}
          </div>
          <div>
            <p className="font-semibold text-gray-900">
              {testimonial.authorName}
            </p>
            <p className="text-sm text-gray-500">
              {testimonial.authorTitle}
              {testimonial.authorCompany && ` at ${testimonial.authorCompany}`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Wall of love - full section with testimonials
interface WallOfLoveProps {
  testimonials: Testimonial[];
  title?: string;
  description?: string;
}

export function WallOfLove({
  testimonials,
  title = "Wall of Love",
  description = "Hear from Kenyans who have transformed their financial lives with our templates.",
}: WallOfLoveProps) {
  const videoTestimonials = testimonials.filter((t) => t.hasVideo).slice(0, 5);

  return (
    <section className="py-24 bg-white border-t border-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="mb-6">{title}</h2>
          <div className="w-20 h-1.5 bg-primary mx-auto rounded-full mb-6" />
          <p className="max-w-2xl mx-auto">{description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videoTestimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-primary/20 transition-all group"
            >
              <VideoPlayer
                videoUrl={testimonial.videoUrl!}
                thumbnailUrl={testimonial.videoThumbnail}
                title={`${testimonial.authorName} testimonial`}
                className="aspect-video"
              />
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden">
                    {testimonial.authorAvatar ? (
                      <NextImage
                        src={testimonial.authorAvatar}
                        alt={testimonial.authorName}
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="font-black text-gray-400">
                        {testimonial.authorName.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="font-black text-gray-900 text-sm">
                      {testimonial.authorName}
                    </p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                      {testimonial.authorTitle}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed italic line-clamp-3 uppercase font-black tracking-tight">
                  &quot;{testimonial.shortQuote || testimonial.content}&quot;
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
