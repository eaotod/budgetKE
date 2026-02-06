import Image from "next/image";

const steps = [
  {
    title: "Choose Template",
    description:
      "Browse our curated collection of Kenyan-ready financial tools.",
    image: "/images/illustrations/step-1.png",
  },
  {
    title: "Instant Payment",
    description: "Pay securely via M-Pesa. Simple, fast, and automated.",
    image: "/images/illustrations/step-2.png",
  },
  {
    title: "Download Files",
    description: "Get immediate access to your Excel and Google Sheets files.",
    image: "/images/illustrations/step-3.png",
  },
  {
    title: "Master Money",
    description: "Follow our guides to take full control of your finances.",
    image: "/images/illustrations/step-4.png",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 lg:py-32 bg-gray-50/50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16 lg:mb-24">
          <h2 className="mb-6 max-w-2xl mx-auto">
            The easiest way to master your money
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 relative">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative flex flex-col items-center text-center group"
            >
              {/* Illustration Container */}
              <div className="w-40 h-40 mb-10 relative flex items-center justify-center">
                <div className="absolute inset-0 bg-white/50 rounded-full blur-3xl group-hover:bg-primary/5 transition-colors duration-500" />
                <Image
                  src={step.image}
                  alt={step.title}
                  width={160}
                  height={160}
                  className="relative z-10 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3"
                />
              </div>

              {/* Step Number */}
              <div className="mb-4 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                Step 0{index + 1}
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                {step.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed max-w-[200px] mx-auto">
                {step.description}
              </p>

              {/* Subtle Connector for Desktop */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-20 -right-8 w-16 h-px bg-linear-to-r from-gray-200 to-transparent" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
