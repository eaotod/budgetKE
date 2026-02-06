"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BreadcrumbJsonLd } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  PaintBoardIcon,
  CodeCircleIcon,
  CheckmarkCircle01Icon,
  ArrowRight02Icon,
} from "@hugeicons/core-free-icons";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  serviceType: z.enum(["tier4", "tier5"] as const),
  projectType: z.string().min(1, "Please select a project type"),
  description: z
    .string()
    .min(20, "Please describe your project in more detail"),
  timeline: z.string().optional(),
  budget: z.string().optional(),
  features: z.array(z.string()),
});

export default function CustomTemplatePage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [pricingEstimate, setPricingEstimate] = useState<number | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      serviceType: "tier4",
      projectType: "",
      description: "",
      features: [],
    },
  });

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = form;
  const serviceType = watch("serviceType");

  // Dynamic pricing estimation (simplified)
  const calculateEstimate = (values: z.infer<typeof formSchema>) => {
    let base = values.serviceType === "tier4" ? 2999 : 499;
    // Add logic based on features or complexity if needed
    setPricingEstimate(base);
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    calculateEstimate(values);
    setIsSubmitted(true);
    // Here we would effectively send data to API/Email
  }

  const breadcrumbItems = [
    { label: "Custom Services", href: "/custom-template" },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <Navbar />

      <main className="md:pt-32 pt-28 pb-20 bg-gray-50/50 min-h-screen">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">
              Custom Solutions
            </h1>
            <p className="text-lg md:text-xl text-gray-500 font-medium leading-relaxed max-w-2xl mx-auto">
              Need something specific? We build custom Excel & Google Sheets
              systems tailored to your unique business needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div
              className={`p-8 rounded-3xl border-2 transition-all cursor-pointer ${serviceType === "tier4" ? "border-primary bg-primary/5" : "border-gray-200 bg-white hover:border-primary/30"}`}
              onClick={() => setValue("serviceType", "tier4")}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                <HugeiconsIcon icon={CodeCircleIcon} size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Custom Development (Tier 4)
              </h3>
              <p className="text-gray-500 text-sm mb-4">
                Built from scratch systems for specific business workflows.
              </p>
              <p className="text-primary font-bold">From KES 2,999</p>
            </div>

            <div
              className={`p-8 rounded-3xl border-2 transition-all cursor-pointer ${serviceType === "tier5" ? "border-purple-500 bg-purple-50" : "border-gray-200 bg-white hover:border-purple-200"}`}
              onClick={() => setValue("serviceType", "tier5")}
            >
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 mb-4">
                <HugeiconsIcon icon={PaintBoardIcon} size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Modifications (Tier 5)
              </h3>
              <p className="text-gray-500 text-sm mb-4">
                Tweaks and add-ons to our existing premium templates.
              </p>
              <p className="text-purple-600 font-bold">From KES 499</p>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-gray-200/50 border border-gray-100">
            {isSubmitted ? (
              <div className="text-center py-12 animate-in fade-in zoom-in-95 duration-300">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-6">
                  <HugeiconsIcon icon={CheckmarkCircle01Icon} size={40} />
                </div>
                <h2 className="text-2xl font-black text-gray-900 mb-4">
                  Request Received!
                </h2>
                <p className="text-gray-500 mb-8 max-w-md mx-auto">
                  Thanks {form.getValues("name")}. We've received your request.
                  Based on your selection, the estimated starting price is{" "}
                  <span className="text-gray-900 font-bold">
                    KES {pricingEstimate?.toLocaleString()}
                  </span>
                  . We'll be in touch within 24 hours to discuss details.
                </p>
                <Button onClick={() => setIsSubmitted(false)} variant="outline">
                  Start New Request
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <Field data-invalid={!!errors.name}>
                    <FieldLabel htmlFor="name">Full Name</FieldLabel>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      className="h-12 rounded-xl bg-gray-50 border-gray-200"
                      {...register("name")}
                    />
                    <FieldError errors={[errors.name]} />
                  </Field>

                  {/* Email */}
                  <Field data-invalid={!!errors.email}>
                    <FieldLabel htmlFor="email">Email Address</FieldLabel>
                    <Input
                      id="email"
                      placeholder="john@example.com"
                      className="h-12 rounded-xl bg-gray-50 border-gray-200"
                      {...register("email")}
                    />
                    <FieldError errors={[errors.email]} />
                  </Field>
                </div>

                {/* Phone */}
                <Field data-invalid={!!errors.phone}>
                  <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
                  <Input
                    id="phone"
                    placeholder="07XX XXX XXX"
                    className="h-12 rounded-xl bg-gray-50 border-gray-200"
                    {...register("phone")}
                  />
                  <FieldError errors={[errors.phone]} />
                </Field>

                {/* Project Type */}
                <Controller
                  control={control}
                  name="projectType"
                  render={({ field }) => (
                    <Field data-invalid={!!errors.projectType}>
                      <FieldLabel>Project Type</FieldLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="h-12 rounded-xl bg-gray-50 border-gray-200">
                          <SelectValue placeholder="Select type..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="inventory">
                            Inventory System
                          </SelectItem>
                          <SelectItem value="finance">
                            Financial Dashboard
                          </SelectItem>
                          <SelectItem value="hr">HR / Payroll</SelectItem>
                          <SelectItem value="automation">
                            Process Automation
                          </SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FieldError errors={[errors.projectType]} />
                    </Field>
                  )}
                />

                {/* Description */}
                <Field data-invalid={!!errors.description}>
                  <FieldLabel htmlFor="description">
                    Project Description
                  </FieldLabel>
                  <Textarea
                    id="description"
                    placeholder="Describe exactly what you need. What problem are you solving? What columns/data do you need to track?"
                    className="min-h-[150px] rounded-xl bg-gray-50 border-gray-200 resize-none"
                    {...register("description")}
                  />
                  <FieldDescription>
                    Please be as detailed as possible to get an accurate quote.
                  </FieldDescription>
                  <FieldError errors={[errors.description]} />
                </Field>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full h-14 text-lg font-bold rounded-xl"
                >
                  Submit Request
                  <HugeiconsIcon
                    icon={ArrowRight02Icon}
                    size={20}
                    className="ml-2"
                  />
                </Button>
              </form>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
