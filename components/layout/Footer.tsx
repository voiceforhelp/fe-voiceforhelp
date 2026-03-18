"use client";

import Link from "next/link";
import { useState } from "react";
import { Phone, Mail, MapPin, Instagram, Facebook, Youtube, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DONATION_AMOUNTS, SOCIAL_LINKS } from "@/lib/constants";
import Logo from "@/components/common/Logo";
import toast from "react-hot-toast";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Subscribed! You'll receive our impact updates.");
    setEmail("");
  };

  return (
    <footer>
      {/* Donation CTA banner */}
      <div className="bg-linear-to-r from-gold to-gold-dark py-5 sm:py-6">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <h3 className="text-base sm:text-xl md:text-2xl font-bold text-black text-center sm:text-left">
              Make a Difference, Donate Today!
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {DONATION_AMOUNTS.map((amt) => (
                <Link key={amt} href={`/donate?amount=${amt}`}>
                  <Button
                    variant="dark"
                    size="sm"
                    className="font-bold text-xs sm:text-sm bg-[#1e1c18] text-white hover:bg-[#2a2820] border-none h-9 sm:h-10 px-3 sm:px-4"
                  >
                    ₹{amt.toLocaleString("en-IN")}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="bg-[#141210] text-gray-400">
        <div className="container mx-auto px-4 sm:px-6 py-10 sm:py-12 md:py-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="mb-4">
                <Logo variant="light" size="sm" />
              </div>
              <p className="text-sm leading-relaxed mb-5 max-w-xs">
                Transparent donation platform where every rupee is accounted for through daily video proof of impact.
              </p>
              <div className="flex gap-2.5">
                {[
                  { href: SOCIAL_LINKS.instagram, Icon: Instagram, label: "Instagram" },
                  { href: SOCIAL_LINKS.facebook, Icon: Facebook, label: "Facebook" },
                  { href: SOCIAL_LINKS.youtube, Icon: Youtube, label: "YouTube" },
                ].map(({ href, Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-white/5 hover:bg-gold/20 hover:text-gold flex items-center justify-center transition-colors"
                    aria-label={label}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm sm:text-base">Quick Links</h4>
              <ul className="space-y-2.5 text-sm">
                {[
                  { label: "Home", href: "/" },
                  { label: "About Us", href: "/about" },
                  { label: "Our Impact", href: "/impact" },
                  { label: "Donate Now", href: "/donate" },
                  { label: "Videos", href: "/videos" },
                  { label: "Volunteer", href: "/volunteer" },
                  { label: "Contact", href: "/contact" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="hover:text-gold transition-colors hover:translate-x-0.5 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm sm:text-base">Contact Us</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="tel:+919024408325" className="flex items-start gap-2.5 hover:text-gold transition-colors group">
                    <Phone className="h-4 w-4 mt-0.5 text-gold shrink-0" />
                    +91-9024408325
                  </a>
                </li>
                <li>
                  <a href="mailto:info@voiceforhelp.org" className="flex items-start gap-2.5 hover:text-gold transition-colors">
                    <Mail className="h-4 w-4 mt-0.5 text-gold shrink-0" />
                    <span className="break-all">info@voiceforhelp.org</span>
                  </a>
                </li>
                <li className="flex items-start gap-2.5">
                  <MapPin className="h-4 w-4 mt-0.5 text-gold shrink-0" />
                  <span>Rajasthan, India</span>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm sm:text-base">Newsletter</h4>
              <p className="text-sm mb-4 leading-relaxed">Get updates on our impact and donation drives.</p>
              <form onSubmit={handleSubscribe}>
                <div className="flex flex-col gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                    className="w-full h-10 px-3 rounded-lg bg-white/5 border border-gray-700 text-white placeholder:text-gray-600 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30 text-sm transition-colors"
                  />
                  <Button type="submit" size="sm" className="h-10 font-semibold">
                    <Send className="h-3.5 w-3.5 mr-1.5" /> Subscribe
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800/60 py-4 sm:py-5">
          <div className="container mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-600">
            <p>&copy; {new Date().getFullYear()} VoiceForHelp. All Rights Reserved.</p>
            <div className="flex items-center gap-3 sm:gap-4">
              <Link href="/videos" className="hover:text-gray-400 transition-colors">Impact Videos</Link>
              <Link href="/contact" className="hover:text-gray-400 transition-colors">Contact</Link>
              <Link href="/about" className="hover:text-gray-400 transition-colors">About</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
