"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you soon.");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  const contacts = [
    { icon: Phone, label: "Phone", value: "+91-9024408325", href: "tel:+919024408325" },
    { icon: Mail, label: "Email", value: "info@voiceforhelp.org", href: "mailto:info@voiceforhelp.org" },
    { icon: MessageSquare, label: "WhatsApp", value: "+91-9024408325", href: "https://wa.me/919024408325" },
    { icon: MapPin, label: "Address", value: "Rajasthan, India", href: "#" },
  ];

  return (
    <>
      <section className="bg-texture py-16 md:py-24 border-b border-gray-800/50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">Contact Us</h1>
          <p className="text-gray-400 text-lg">We'd love to hear from you</p>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-texture-light">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Get in Touch</h2>
              <div className="space-y-4 mb-8">
                {contacts.map((c, i) => (
                  <a key={i} href={c.href} className="flex items-center gap-4 p-4 bg-[#2a2a2a] rounded-xl border border-gray-700/50 hover:border-[#d4a843]/30 transition-all">
                    <div className="w-10 h-10 rounded-lg bg-[#d4a843]/15 text-[#d4a843] flex items-center justify-center flex-shrink-0">
                      <c.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">{c.label}</p>
                      <p className="font-semibold text-white text-sm">{c.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-[#2a2a2a] rounded-2xl p-6 md:p-8 border border-gray-700/50">
              <h2 className="text-xl font-bold text-white mb-6">Send a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input label="Name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} required className="bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500 focus:border-[#d4a843]" />
                <Input label="Email" type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} required className="bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500 focus:border-[#d4a843]" />
                <Input label="Subject" value={form.subject} onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))} required className="bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500 focus:border-[#d4a843]" />
                <Textarea label="Message" rows={5} value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))} required className="bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500 focus:border-[#d4a843]" />
                <Button type="submit" size="lg" className="w-full">Send Message</Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
