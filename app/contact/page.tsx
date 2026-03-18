"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    toast.success("Message sent! We'll get back to you soon.");
    setForm({ name: "", email: "", subject: "", message: "" });
    setLoading(false);
  };

  const contacts = [
    { icon: Phone, label: "Call Us", value: "+91-7737872585", href: "tel:+917737872585", desc: "Mon–Sat, 9am–6pm" },
    { icon: Mail, label: "Email", value: "support@voiceforhelp.com", href: "mailto:support@voiceforhelp.com", desc: "We reply within 24 hrs" },
    { icon: MessageSquare, label: "WhatsApp", value: "+91-7737872585", href: "https://wa.me/917737872585", desc: "Quick response" },
    { icon: MapPin, label: "Address", value: "Rajasthan, India", href: "#", desc: "Serving across India" },
  ];

  return (
    <>
      {/* Page hero */}
      <section className="bg-linear-to-b from-amber-50 to-white py-14 sm:py-20 md:py-28 border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block text-gold text-xs sm:text-sm font-semibold uppercase tracking-widest mb-3">
            Reach Out
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            Contact Us
          </h1>
          <p className="text-gray-500 text-base sm:text-lg max-w-xl mx-auto">
            We&apos;d love to hear from you — questions, partnerships, or just to say hello.
          </p>
        </div>
      </section>

      {/* Contact content */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {/* Contact info */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-5 sm:mb-6">Get in Touch</h2>
              <div className="space-y-3 sm:space-y-4">
                {contacts.map((c, i) => (
                  <a
                    key={i}
                    href={c.href}
                    className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 bg-white rounded-xl border border-gray-100 hover:border-gold/40 hover:bg-white/80 transition-all duration-200 group min-h-18"
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gold/15 text-gold flex items-center justify-center shrink-0 group-hover:bg-gold/25 transition-colors">
                      <c.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] sm:text-xs text-gray-500 font-medium">{c.label}</p>
                      <p className="font-semibold text-gray-900 text-sm sm:text-base truncate">{c.value}</p>
                      <p className="text-[10px] sm:text-xs text-gray-600">{c.desc}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Contact form */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 md:p-8 border border-gray-100">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-5 sm:mb-6">Send a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Full Name"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  required
                  className="bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-gold h-11 sm:h-12"
                />
                <Input
                  label="Email Address"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  required
                  className="bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-gold h-11 sm:h-12"
                />
                <Input
                  label="Subject"
                  value={form.subject}
                  onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                  required
                  className="bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-gold h-11 sm:h-12"
                />
                <Textarea
                  label="Your Message"
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  required
                  className="bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-gold resize-none"
                />
                <Button type="submit" size="lg" className="w-full h-12 sm:h-13 font-semibold" disabled={loading}>
                  {loading ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" /> Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
