"use client";

import { useState, useEffect } from "react";
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
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  // Hide header on mobile when viewing video detail (reels mode)
  const isVideoDetail = /^\/videos\/[a-f0-9]{24}$/.test(pathname);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hide header completely on mobile video detail pages (reels experience)
  if (isVideoDetail && isMobile) return null;

  return (
    <>
      {/* Top contact bar */}
      <div className="bg-gray-900 text-gray-400 text-xs py-1.5 hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <a href="tel:+917737872585" className="flex items-center gap-1.5 hover:text-gold transition-colors">
              <Phone className="h-3 w-3" /> +91-7737872585
            </a>
            <a href="mailto:support@voiceforhelp.com" className="flex items-center gap-1.5 hover:text-gold transition-colors">
              <Mail className="h-3 w-3" /> support@voiceforhelp.com
            </a>
          </div>
          <div className="flex items-center gap-3">
            <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">WhatsApp</a>
            <span className="text-gray-700">|</span>
            <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">Instagram</a>
            <span className="text-gray-700">|</span>
            <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">Facebook</a>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header
        className={cn(
          "sticky top-0 z-50 bg-white border-b border-gray-100 transition-shadow duration-200",
          scrolled && "shadow-md shadow-black/5"
        )}
      >
        <div className="container mx-auto px-3 sm:px-4">
          <div className="flex items-center justify-between h-14 sm:h-16 md:h-17">
            {/* Logo */}
            <Link href="/" className="shrink-0 min-w-0">
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
                      ? "text-gold bg-gold/10"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Link href="/donate" className="hidden sm:block">
                <Button size="sm" className="h-9 sm:h-10 text-xs sm:text-sm px-3 sm:px-4 font-semibold">
                  Donate Now
                </Button>
              </Link>

              {isAuthenticated ? (
                <div className="hidden md:flex items-center gap-1">
                  {isAdmin && (
                    <Link href="/admin">
                      <Button variant="ghost" size="sm" className="text-gray-600 h-9">Admin</Button>
                    </Link>
                  )}
                  <Link href="/profile">
                    <Button variant="ghost" size="sm" className="flex items-center gap-1.5 text-gray-600 h-9">
                      <User className="h-4 w-4" />
                      <span className="hidden xl:inline text-sm">{user?.name?.split(" ")[0]}</span>
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={logout}
                    className="text-gray-400 h-9 w-9 hover:text-red-500"
                    aria-label="Logout"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="hidden md:flex items-center gap-1">
                  <Link href="/login">
                    <Button variant="ghost" size="sm" className="text-gray-600 h-9">Login</Button>
                  </Link>
                  <Link href="/register">
                    <Button variant="outline" size="sm" className="h-9 border-gray-200 text-gray-700">Register</Button>
                  </Link>
                </div>
              )}

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden flex items-center justify-center w-11 h-11 rounded-xl hover:bg-gray-100 active:bg-gray-200 transition-colors text-gray-600"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
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
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="lg:hidden border-t border-gray-100 bg-white overflow-hidden"
            >
              <div className="container mx-auto px-4 py-3 max-h-[75vh] overflow-y-auto">
                {/* Mobile contact info */}
                <div className="flex flex-wrap gap-x-4 gap-y-1 px-2 py-2.5 text-xs text-gray-500 border-b border-gray-100 mb-2">
                  <a href="tel:+917737872585" className="flex items-center gap-1.5 hover:text-gold">
                    <Phone className="h-3 w-3" /> +91-7737872585
                  </a>
                  <a href="mailto:support@voiceforhelp.com" className="flex items-center gap-1.5 hover:text-gold">
                    <Mail className="h-3 w-3" /> support@voiceforhelp.com
                  </a>
                </div>

                {/* Nav links */}
                <div className="space-y-0.5 mb-3">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex items-center px-3 py-3 rounded-xl text-sm font-medium transition-colors min-h-11",
                        pathname === link.href
                          ? "text-gold bg-gold/10"
                          : "text-gray-700 hover:bg-gray-50 active:bg-gray-100"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}

                  <Link href="/donate" onClick={() => setMobileOpen(false)}>
                    <div className="flex items-center gap-2 px-3 py-3 rounded-xl bg-gold/10 text-gold font-semibold text-sm min-h-11">
                      <Zap className="h-4 w-4" /> Donate Now
                    </div>
                  </Link>
                </div>

                {/* Auth buttons */}
                <div className="border-t border-gray-100 pt-3 flex gap-2">
                  {isAuthenticated ? (
                    <>
                      {isAdmin && (
                        <Link href="/admin" className="flex-1" onClick={() => setMobileOpen(false)}>
                          <Button variant="outline" className="w-full h-11 text-sm border-gray-200">Admin</Button>
                        </Link>
                      )}
                      <Link href="/profile" className="flex-1" onClick={() => setMobileOpen(false)}>
                        <Button variant="outline" className="w-full h-11 text-sm border-gray-200">Profile</Button>
                      </Link>
                      <Button
                        variant="ghost"
                        onClick={() => { logout(); setMobileOpen(false); }}
                        className="flex-1 h-11 text-sm text-gray-500"
                      >
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link href="/login" className="flex-1" onClick={() => setMobileOpen(false)}>
                        <Button variant="outline" className="w-full h-11 text-sm border-gray-200">Login</Button>
                      </Link>
                      <Link href="/register" className="flex-1" onClick={() => setMobileOpen(false)}>
                        <Button className="w-full h-11 text-sm">Register</Button>
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
