"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, Instagram, Facebook, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DONATION_AMOUNTS, SOCIAL_LINKS } from "@/lib/constants";
import Logo from "@/components/common/Logo";

export default function Footer() {
  return (
    <footer>
      {/* Donation CTA banner - golden */}
      <div className="bg-gradient-to-r from-[#d4a843] to-[#b8922e] py-5 sm:py-6">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-black text-center sm:text-left">Make a Difference, Donate Today!</h3>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {DONATION_AMOUNTS.map((amt) => (
              <Link key={amt} href={`/donate?amount=${amt}`}>
                <Button variant="dark" size="sm" className="font-bold text-xs sm:text-sm bg-[#1e1c18] text-white hover:bg-[#2a2820] border-none">
                  ₹{amt.toLocaleString("en-IN")}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer - warm dark */}
      <div className="bg-[#141210] text-gray-400">
        <div className="container mx-auto px-4 py-8 sm:py-10 md:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* About */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="mb-4">
                <Logo variant="light" size="sm" />
              </div>
              <p className="text-sm leading-relaxed mb-4">
                Transparent donation platform where every rupee is accounted for through daily video proof of impact.
              </p>
              <div className="flex gap-3">
                <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-[#d4a843]/20 hover:text-[#d4a843] transition-colors" aria-label="Instagram">
                  <Instagram className="h-4 w-4" />
                </a>
                <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-[#d4a843]/20 hover:text-[#d4a843] transition-colors" aria-label="Facebook">
                  <Facebook className="h-4 w-4" />
                </a>
                <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-[#d4a843]/20 hover:text-[#d4a843] transition-colors" aria-label="YouTube">
                  <Youtube className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm sm:text-base">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                {[
                  { label: "Home", href: "/" },
                  { label: "About Us", href: "/about" },
                  { label: "Our Impact", href: "/impact" },
                  { label: "Donate Now", href: "/donate" },
                  { label: "Videos", href: "/videos" },
                  { label: "Volunteer", href: "/volunteer" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="hover:text-[#d4a843] transition-colors">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm sm:text-base">Contact Us</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <Phone className="h-4 w-4 mt-0.5 text-[#d4a843] flex-shrink-0" />
                  <a href="tel:+919024408325" className="hover:text-[#d4a843]">+91-9024408325</a>
                </li>
                <li className="flex items-start gap-2">
                  <Mail className="h-4 w-4 mt-0.5 text-[#d4a843] flex-shrink-0" />
                  <a href="mailto:info@voiceforhelp.org" className="hover:text-[#d4a843] break-all">info@voiceforhelp.org</a>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 text-[#d4a843] flex-shrink-0" />
                  <span>Rajasthan, India</span>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm sm:text-base">Newsletter</h4>
              <p className="text-sm mb-3">Get updates on our impact and donation drives.</p>
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <Input placeholder="Your email" className="bg-white/5 border-gray-700 text-white placeholder:text-gray-600 focus:border-[#d4a843] h-10 text-sm flex-1 min-w-0" />
                <Button size="sm" className="shrink-0 text-xs sm:text-sm">Subscribe</Button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800/50 py-4">
          <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-600">
            <p>&copy; {new Date().getFullYear()} VoiceForHelp. All Rights Reserved.</p>
            <div className="flex gap-4">
              <Link href="/videos" className="hover:text-gray-400">Impact Videos</Link>
              <Link href="/contact" className="hover:text-gray-400">Contact</Link>
              <Link href="/about" className="hover:text-gray-400">About</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
