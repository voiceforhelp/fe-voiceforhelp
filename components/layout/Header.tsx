"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Mail, User, LogOut, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { NAV_LINKS, SOCIAL_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Logo from "@/components/common/Logo";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();

  return (
    <>
      {/* Top contact bar - hidden on mobile */}
      <div className="bg-[#111111] text-gray-400 text-xs py-1.5 hidden md:block border-b border-gray-800/50">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <a href="tel:+919024408325" className="flex items-center gap-1 hover:text-[#d4a843] transition-colors">
              <Phone className="h-3 w-3" /> +91-9024408325
            </a>
            <a href="mailto:info@voiceforhelp.org" className="flex items-center gap-1 hover:text-[#d4a843] transition-colors">
              <Mail className="h-3 w-3" /> info@voiceforhelp.org
            </a>
          </div>
          <div className="flex items-center gap-3">
            <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-[#d4a843] transition-colors">WhatsApp</a>
            <span className="text-gray-600">|</span>
            <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-[#d4a843] transition-colors">Instagram</a>
            <span className="text-gray-600">|</span>
            <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-[#d4a843] transition-colors">Facebook</a>
          </div>
        </div>
      </div>

      {/* Main header - sticky */}
      <header className="sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-md border-b border-gray-800/50 shadow-lg shadow-black/20">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Logo size="sm" className="sm:hidden" />
              <Logo size="md" className="hidden sm:flex" />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-2.5 xl:px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap",
                    pathname === link.href
                      ? "text-[#d4a843] bg-[#d4a843]/10"
                      : "text-gray-300 hover:text-[#d4a843] hover:bg-white/5"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Donate Now CTA */}
              <Link href="/donate">
                <Button size="sm" className="hidden sm:flex items-center gap-1 text-xs sm:text-sm">
                  Donate Now
                </Button>
              </Link>

              {isAuthenticated ? (
                <div className="hidden md:flex items-center gap-1.5">
                  {isAdmin && (
                    <Link href="/admin"><Button variant="ghost" size="sm" className="text-gray-300">Admin</Button></Link>
                  )}
                  <Link href="/profile">
                    <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-300">
                      <User className="h-4 w-4" /> <span className="hidden xl:inline">{user?.name?.split(" ")[0]}</span>
                    </Button>
                  </Link>
                  <Button variant="ghost" size="icon" onClick={logout} className="text-gray-500 h-9 w-9 hover:text-red-400">
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="hidden md:flex items-center gap-1.5">
                  <Link href="/login"><Button variant="ghost" size="sm" className="text-gray-300">Login</Button></Link>
                  <Link href="/register"><Button variant="outline" size="sm">Register</Button></Link>
                </div>
              )}

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors text-gray-300"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile nav drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden border-t border-gray-800 bg-[#1a1a1a] overflow-hidden"
            >
              <div className="container mx-auto px-4 py-3 space-y-1 max-h-[70vh] overflow-y-auto">
                {/* Mobile contact info */}
                <div className="flex flex-wrap gap-3 px-4 py-2 text-xs text-gray-500 mb-2">
                  <a href="tel:+919024408325" className="flex items-center gap-1"><Phone className="h-3 w-3" /> +91-9024408325</a>
                  <a href="mailto:info@voiceforhelp.org" className="flex items-center gap-1"><Mail className="h-3 w-3" /> info@voiceforhelp.org</a>
                </div>

                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "block px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                      pathname === link.href ? "text-[#d4a843] bg-[#d4a843]/10" : "text-gray-300 hover:bg-white/5"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}

                <Link href="/donate" onClick={() => setMobileOpen(false)}>
                  <div className="px-4 py-3 rounded-lg bg-[#d4a843]/10 text-[#d4a843] font-semibold text-sm flex items-center gap-2">
                    <Zap className="h-4 w-4" /> Donate Now
                  </div>
                </Link>

                <div className="border-t border-gray-800 pt-3 mt-3 flex gap-2">
                  {isAuthenticated ? (
                    <>
                      {isAdmin && (
                        <Link href="/admin" className="flex-1" onClick={() => setMobileOpen(false)}>
                          <Button variant="outline" className="w-full text-sm">Admin</Button>
                        </Link>
                      )}
                      <Link href="/profile" className="flex-1" onClick={() => setMobileOpen(false)}>
                        <Button variant="outline" className="w-full text-sm">Profile</Button>
                      </Link>
                      <Button variant="ghost" onClick={() => { logout(); setMobileOpen(false); }} className="flex-1 text-sm text-gray-400">Logout</Button>
                    </>
                  ) : (
                    <>
                      <Link href="/login" className="flex-1" onClick={() => setMobileOpen(false)}>
                        <Button variant="outline" className="w-full text-sm">Login</Button>
                      </Link>
                      <Link href="/register" className="flex-1" onClick={() => setMobileOpen(false)}>
                        <Button className="w-full text-sm">Register</Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
