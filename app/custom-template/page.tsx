"use client";

import { useState } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTransition } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BreadcrumbJsonLd } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Field,
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
  CodeCircleIcon,
  CheckmarkCircle01Icon,
  ArrowRight02Icon,
  Settings02Icon,
  CheckmarkCircle02Icon,
} from "@hugeicons/core-free-icons";
import { getServicesByProductType } from "@/lib/data";
import { submitCustomRequest } from "./actions";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  productType: z.enum(["template", "advanced_solution"] as const),
  projectType: z.string().min(1, "Please select a project type"),
  description: z
    .string()
    .min(20, "Please describe your project in more detail"),
  budget: z.string().min(1, "Please provide your budget range"),
});

export default function CustomTemplatePage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      productType: "template",
      projectType: "",
      description: "",
      budget: "",
    },
  });

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = form;

  const productType = useWatch({ control, name: "productType" });
  const services = getServicesByProductType(productType);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      await submitCustomRequest(values);
      setIsSubmitted(true);
    });
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

          {/* Product Type Selector */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div
              className={`p-8 rounded-3xl border-2 transition-all cursor-pointer ${productType === "template" ? "border-primary bg-primary/5" : "border-gray-200 bg-white hover:border-primary/30"}`}
              onClick={() => setValue("productType", "template")}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                <HugeiconsIcon icon={CodeCircleIcon} size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Template Solutions
              </h3>
              <p className="text-gray-500 text-sm mb-4">
                Custom Excel & Google Sheets templates tailored to your needs.
              </p>
              <p className="text-primary font-bold">From KES 15,000</p>
            </div>

            <div
              className={`p-8 rounded-3xl border-2 transition-all cursor-pointer ${productType === "advanced_solution" ? "border-primary bg-primary/5" : "border-gray-200 bg-white hover:border-primary/30"}`}
              onClick={() => setValue("productType", "advanced_solution")}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                <HugeiconsIcon icon={Settings02Icon} size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Advanced Solutions
              </h3>
              <p className="text-gray-500 text-sm mb-4">
                PWAs, complex systems, and business consulting services.
              </p>
              <p className="text-primary font-bold">From KES 25,000</p>
            </div>
          </div>

          {/* Services Available */}
          {services.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-black text-gray-900 mb-6">
                Available Services
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                  <div
                    key={service.id}
                    className="group relative bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-[100px] -mr-4 -mt-4 transition-transform group-hover:scale-110" />

                    <div className="relative z-10">
                      <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                        <HugeiconsIcon
                          icon={CheckmarkCircle02Icon}
                          className="w-6 h-6"
                        />
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                        {service.name}
                      </h3>

                      <p className="text-gray-500 text-sm leading-relaxed mb-4">
                        {service.shortDescription}
                      </p>

                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50 mb-4">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                          Starting at
                        </span>
                        <span className="text-lg font-black text-gray-900">
                          KES {service.priceMin.toLocaleString()}
                        </span>
                      </div>

                      {service.timeline && (
                        <div className="mb-4">
                          <div className="text-xs text-gray-400 font-bold uppercase">
                            Timeline
                          </div>
                          <div className="text-sm font-bold text-gray-700">
                            {service.timeline}
                          </div>
                        </div>
                      )}

                      <ul className="space-y-2">
                        {service.features.slice(0, 3).map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-sm text-gray-600"
                          >
                            <HugeiconsIcon
                              icon={CheckmarkCircle02Icon}
                              size={16}
                              className="text-primary shrink-0 mt-0.5"
                            />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

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
                  Thanks {form.getValues("name")}. We&apos;ve received your
                  request and will review it carefully. We&apos;ll be in touch
                  within 24 hours to discuss details and provide a quote.
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

                {/* Budget */}
                <Field data-invalid={!!errors.budget}>
                  <FieldLabel htmlFor="budget">Budget Range</FieldLabel>
                  <Input
                    id="budget"
                    placeholder="e.g., KES 20,000 - 30,000 or KES 50,000+"
                    className="h-12 rounded-xl bg-gray-50 border-gray-200"
                    {...register("budget")}
                  />
                  <FieldDescription>
                    Provide your budget range to help us recommend the best
                    solution.
                  </FieldDescription>
                  <FieldError errors={[errors.budget]} />
                </Field>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isPending}
                  className="w-full h-14 text-lg font-bold rounded-xl"
                >
                  {isPending ? (
                    "Submitting..."
                  ) : (
                    <>
                      Submit Request
                      <HugeiconsIcon
                        icon={ArrowRight02Icon}
                        size={20}
                        className="ml-2"
                      />
                    </>
                  )}
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
