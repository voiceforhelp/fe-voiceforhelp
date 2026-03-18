"use client";

import { useState } from "react";
import { HandHeart, Calendar, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import SectionHeading from "@/components/common/SectionHeading";
import { volunteerService } from "@/services/volunteerService";
import { AVAILABILITY_TYPES } from "@/lib/constants";
import toast from "react-hot-toast";

export default function VolunteerPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", availabilityType: "", date: "", time: "", location: "", notes: "" });
  const [loading, setLoading] = useState(false);

  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.availabilityType) {
      toast.error("Please fill required fields");
      return;
    }
    setLoading(true);
    try {
      await volunteerService.createVolunteer(form);
      toast.success("Volunteer application submitted!");
      setForm({ name: "", email: "", phone: "", availabilityType: "", date: "", time: "", location: "", notes: "" });
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  const benefits = [
    { icon: HandHeart, title: "Make Direct Impact", desc: "Work in the field and see the change firsthand" },
    { icon: Calendar, title: "Flexible Schedule", desc: "Choose weekends, festivals, or specific dates" },
    { icon: MapPin, title: "Local Community", desc: "Serve in your own city and neighborhood" },
    { icon: Clock, title: "Any Time Works", desc: "Even a few hours can make a big difference" },
  ];

  return (
    <>
      <section className="bg-texture py-16 md:py-24 border-b border-gray-800/50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">Become a Volunteer</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">Join our team and make a direct impact in the community</p>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-texture-light">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Why Volunteer?</h2>
              <div className="space-y-4 mb-8">
                {benefits.map((b, i) => (
                  <div key={i} className="flex gap-4 p-4 bg-[#d4a843]/15 rounded-xl">
                    <div className="w-10 h-10 rounded-lg bg-[#d4a843]/20 text-[#d4a843] flex items-center justify-center flex-shrink-0">
                      <b.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-sm">{b.title}</h3>
                      <p className="text-xs text-gray-500">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#2a2a2a] rounded-2xl p-6 md:p-8 border border-gray-700/50">
              <h2 className="text-xl font-bold text-white mb-6">Volunteer Application</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input label="Full Name *" value={form.name} onChange={(e) => update("name", e.target.value)} required />
                <Input label="Email *" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} required />
                <Input label="Phone *" type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} required />
                <div>
                  <Label className="mb-1.5 block">Availability Type *</Label>
                  <select value={form.availabilityType} onChange={(e) => update("availabilityType", e.target.value)} className="flex h-11 w-full rounded-lg border border-gray-700 bg-[#1a1a1a] px-4 py-2 text-sm text-white focus:border-[#d4a843] focus:outline-none focus:ring-2 focus:ring-[#d4a843]/20" required>
                    <option value="">Select availability</option>
                    {AVAILABILITY_TYPES.map((t) => (<option key={t.value} value={t.value}>{t.label}</option>))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Preferred Date" type="date" value={form.date} onChange={(e) => update("date", e.target.value)} />
                  <Input label="Preferred Time" type="time" value={form.time} onChange={(e) => update("time", e.target.value)} />
                </div>
                <Input label="Location" placeholder="Your city" value={form.location} onChange={(e) => update("location", e.target.value)} />
                <Textarea label="Additional Notes" placeholder="Anything you'd like us to know..." value={form.notes} onChange={(e) => update("notes", e.target.value)} />
                <Button type="submit" size="lg" className="w-full" disabled={loading}>
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
