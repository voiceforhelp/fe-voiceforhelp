"use client";

import { useState } from "react";
import { HandHeart, Calendar, MapPin, Clock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import SectionHeading from "@/components/common/SectionHeading";
import { volunteerService } from "@/services/volunteerService";
import { AVAILABILITY_TYPES } from "@/lib/constants";
import toast from "react-hot-toast";

export default function VolunteerPage() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", availabilityType: "",
    date: "", time: "", location: "", notes: "",
  });
  const [loading, setLoading] = useState(false);

  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.availabilityType) {
      toast.error("Please fill all required fields");
      return;
    }
    setLoading(true);
    try {
      await volunteerService.createVolunteer(form);
      toast.success("Volunteer application submitted! We'll reach out soon.");
      setForm({ name: "", email: "", phone: "", availabilityType: "", date: "", time: "", location: "", notes: "" });
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const benefits = [
    { icon: HandHeart, title: "Make Direct Impact", desc: "Work in the field and see the change firsthand" },
    { icon: Calendar, title: "Flexible Schedule", desc: "Choose weekends, festivals or specific dates" },
    { icon: MapPin, title: "Local Community", desc: "Serve in your own city and neighborhood" },
    { icon: Clock, title: "Any Time Works", desc: "Even a few hours can make a big difference" },
  ];

  return (
    <>
      {/* Page hero */}
      <section className="bg-linear-to-b from-amber-50 to-white py-14 sm:py-20 md:py-28 border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block text-gold text-xs sm:text-sm font-semibold uppercase tracking-widest mb-3">
            Join Our Team
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            Become a Volunteer
          </h1>
          <p className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Join our team and make a direct impact in the community
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 max-w-5xl mx-auto">
            {/* Benefits side */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-5 sm:mb-6">Why Volunteer With Us?</h2>
              <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                {benefits.map((b, i) => (
                  <div
                    key={i}
                    className="flex gap-3 sm:gap-4 p-4 sm:p-5 bg-amber-50 border border-amber-100 rounded-xl hover:border-gold/40 transition-colors"
                  >
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gold/20 text-gold flex items-center justify-center shrink-0">
                      <b.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{b.title}</h3>
                      <p className="text-xs sm:text-sm text-gray-500 mt-0.5 leading-snug">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Extra trust block */}
              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <h3 className="text-sm font-bold text-gray-900 mb-3">What to expect</h3>
                <ul className="space-y-2">
                  {[
                    "Orientation call within 48 hours",
                    "Field training provided",
                    "Certificate of appreciation",
                    "Join a community of changemakers",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs sm:text-sm text-gray-500">
                      <CheckCircle2 className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Form side */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 md:p-8 border border-gray-100">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-5 sm:mb-6">Volunteer Application</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Full Name *"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  required
                  className="h-11 sm:h-12"
                />
                <Input
                  label="Email Address *"
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  required
                  className="h-11 sm:h-12"
                />
                <Input
                  label="Phone Number *"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  required
                  className="h-11 sm:h-12"
                />

                <div>
                  <Label className="mb-1.5 block text-sm font-medium">Availability Type *</Label>
                  <select
                    value={form.availabilityType}
                    onChange={(e) => update("availabilityType", e.target.value)}
                    className="flex h-11 sm:h-12 w-full rounded-lg border border-gray-200 bg-white px-3 sm:px-4 py-2 text-sm text-gray-900 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-colors"
                    required
                  >
                    <option value="">Select availability</option>
                    {AVAILABILITY_TYPES.map((t) => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                </div>

                {/* Date and time — stacked on very small screens */}
                <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4">
                  <Input
                    label="Preferred Date"
                    type="date"
                    value={form.date}
                    onChange={(e) => update("date", e.target.value)}
                    className="h-11 sm:h-12"
                  />
                  <Input
                    label="Preferred Time"
                    type="time"
                    value={form.time}
                    onChange={(e) => update("time", e.target.value)}
                    className="h-11 sm:h-12"
                  />
                </div>

                <Input
                  label="Location / City"
                  placeholder="Your city"
                  value={form.location}
                  onChange={(e) => update("location", e.target.value)}
                  className="h-11 sm:h-12"
                />
                <Textarea
                  label="Additional Notes"
                  placeholder="Tell us anything you'd like us to know..."
                  value={form.notes}
                  onChange={(e) => update("notes", e.target.value)}
                  className="resize-none"
                  rows={3}
                />
                <Button
                  type="submit"
                  size="lg"
                  className="w-full h-12 sm:h-13 font-semibold text-sm sm:text-base"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit Application"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
