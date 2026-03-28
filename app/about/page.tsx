"use client";

import { motion } from "framer-motion";
import { Heart, ShieldCheck, Video, Target, Eye, Handshake, CheckCircle2, Award, MapPin, Phone, Mail } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import CTABanner from "@/components/home/CTABanner";

const values = [
  { icon: Heart,       title: "Compassion First",  desc: "Every living being deserves dignity and care. Compassion drives every action we take in the field." },
  { icon: ShieldCheck, title: "Full Transparency", desc: "Every rupee is documented. We share video proof of all field work — no hidden fees, no false promises." },
  { icon: Video,       title: "Video-Verified",    desc: "We were among the first NGOs in Rajasthan to implement daily video documentation of donation impacts." },
  { icon: Handshake,   title: "Community-Driven",  desc: "We work alongside local communities, volunteers and field teams — not for them, but with them." },
];

const milestones = [
  { year: "2023", title: "Founded in Rajasthan",   desc: "Voice For Help Trust was established with one mission — create a 100% transparency donation platform where every rupee is accounted for." },
  { year: "2023", title: "First 100 Donations",    desc: "Within months of launch, we crossed 100 donations and began documenting daily impact through video proof — a practice that continues today." },
  { year: "2024", title: "Expanded to 7 Causes",   desc: "Grew from food distribution to 7 active causes: food, animal welfare, cow protection, child welfare, medical assistance, emergency help and plantation." },
  { year: "2024", title: "500+ Donors Milestone",  desc: "Reached 500+ active donors across Rajasthan. Our video proof model gained recognition as a gold standard for NGO transparency." },
  { year: "2025", title: "1,000+ Lives Impacted",  desc: "Documented over 1,000 direct beneficiaries. Every single impact has a video to prove it." },
];

const causes = [
  "🍱 Food Distribution", "🐾 Animal Welfare", "🐄 Cow Protection",
  "📚 Child Welfare", "💊 Medical Assistance", "🚨 Emergency Help", "🌱 Tree Plantation",
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-linear-to-b from-amber-50 via-orange-50/30 to-white py-14 sm:py-20 md:py-28 border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block text-gold text-xs sm:text-sm font-semibold uppercase tracking-widest mb-3">
            Our Story
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            About Voice For Help
          </h1>
          <p className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            A registered NGO from Jaipur , Rajasthan, India — built on one promise: every rupee you donate will be documented and proven through video.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            <span className="inline-flex items-center gap-1.5 bg-green-50 border border-green-200 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full">
              <CheckCircle2 className="h-3.5 w-3.5" /> Registered NGO
            </span>
            <span className="inline-flex items-center gap-1.5 bg-gold/10 border border-gold/25 text-amber-700 text-xs font-semibold px-3 py-1.5 rounded-full">
              <ShieldCheck className="h-3.5 w-3.5" /> 100% Transparency
            </span>
            <span className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full">
              <MapPin className="h-3.5 w-3.5" /> Jaipur , Rajasthan, India
            </span>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-14 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-linear-to-br from-amber-50 to-orange-50 rounded-2xl p-7 sm:p-8 border border-amber-100"
            >
              <div className="w-12 h-12 rounded-2xl bg-gold/20 flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-gold" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                To provide immediate and sustainable support to the underprivileged, abandoned animals and cows of India — while maintaining complete financial transparency through daily video documentation of every donation's impact.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-linear-to-br from-blue-50 to-indigo-50 rounded-2xl p-7 sm:p-8 border border-blue-100"
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center mb-4">
                <Eye className="h-6 w-6 text-blue-600" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Our Vision</h2>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                A future where no child goes to bed hungry, every injured animal receives care and every donor trusts their money is creating real change — because they can see it themselves.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-14 sm:py-16 md:py-20 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-12">
            <span className="inline-block text-gold text-xs sm:text-sm font-semibold uppercase tracking-widest mb-3">Our Values</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">What We Stand For</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 max-w-5xl mx-auto">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow text-center"
              >
                <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center mx-auto mb-4">
                  <v.icon className="h-6 w-6 text-gold" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">{v.title}</h3>
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="py-12 sm:py-14 bg-linear-to-br from-gray-900 to-gray-800">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-center">
            {[
              { value: "₹5L+",  label: "Total Raised",    sub: "By our community" },
              { value: "1,000+", label: "Lives Impacted",  sub: "Directly helped" },
              { value: "300+",  label: "Impact Videos",   sub: "Proof documented" },
              { value: "7",     label: "Active Causes",   sub: "All of India" },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.1 }} viewport={{ once: true }}>
                <p className="text-3xl sm:text-4xl font-extrabold text-gold mb-1">{s.value}</p>
                <p className="text-white font-semibold text-sm sm:text-base">{s.label}</p>
                <p className="text-gray-500 text-xs mt-0.5">{s.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Causes */}
      <section className="py-12 sm:py-14 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block text-gold text-xs sm:text-sm font-semibold uppercase tracking-widest mb-3">Our Work</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-3">7 Causes, One Mission</h2>
          <p className="text-gray-500 text-sm max-w-lg mx-auto mb-8">Every cause is supported with field teams, documented daily and proven through video.</p>
          <div className="flex flex-wrap items-center justify-center gap-3 max-w-2xl mx-auto">
            {causes.map((c, i) => (
              <span key={i} className="inline-flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-sm font-medium text-gray-700 hover:border-gold/40 hover:bg-amber-50 transition-colors">
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-14 sm:py-16 md:py-20 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-14">
            <span className="inline-block text-gold text-xs sm:text-sm font-semibold uppercase tracking-widest mb-3">Our Journey</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">How We've Grown</h2>
          </div>
          <div className="max-w-2xl mx-auto space-y-5">
            {milestones.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                viewport={{ once: true }}
                className="flex gap-4 sm:gap-5"
              >
                <div className="shrink-0 flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center shadow-md shadow-gold/20">
                    <span className="text-black font-extrabold text-[10px] text-center leading-tight">{m.year}</span>
                  </div>
                  {i < milestones.length - 1 && <div className="w-0.5 flex-1 bg-gold/20 mt-1" />}
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex-1 mb-2">
                  <h3 className="font-bold text-gray-900 mb-1 text-sm sm:text-base">{m.title}</h3>
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">{m.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-12 sm:py-14 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 text-center max-w-xl">
          <Award className="h-10 w-10 text-gold mx-auto mb-4" />
          <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-2">Want to Know More?</h2>
          <p className="text-gray-500 text-sm mb-6">
            Reach out to us directly — we are happy to share registration documents, bank statements and field reports.
          </p>
          <div className="flex flex-col xs:flex-row items-center justify-center gap-3">
            <a href="tel:+917737872585">
              <Button variant="outline" className="border-gray-200 h-11 px-5 text-sm gap-2">
                <Phone className="h-4 w-4" /> Call Us
              </Button>
            </a>
            <a href="mailto:info@voiceforhelp.com">
              <Button variant="outline" className="border-gray-200 h-11 px-5 text-sm gap-2">
                <Mail className="h-4 w-4" /> Email Us
              </Button>
            </a>
            <Link href="/donate">
              <Button className="h-11 px-6 text-sm font-bold">Donate Now</Button>
            </Link>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
