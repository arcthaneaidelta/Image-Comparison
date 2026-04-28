"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Layers, Search, Zap, Shield, FileCheck } from "lucide-react";

export default function LandingPage({ onLaunch }: { onLaunch: () => void }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-primary/10">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">O</div>
            <span className="font-bold text-xl tracking-tight">OpticSync</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#" className="hover:text-primary transition-colors">Platform</a>
            <a href="#" className="hover:text-primary transition-colors">Solutions</a>
            <a href="#" className="hover:text-primary transition-colors">Enterprise</a>
            <a href="#" className="hover:text-primary transition-colors">Pricing</a>
          </div>
          <button 
            onClick={onLaunch}
            className="px-5 py-2.5 bg-slate-900 text-white rounded-full text-sm font-semibold hover:bg-slate-800 transition-all shadow-sm active:scale-95"
          >
            Launch Demo
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-6">
              <Zap className="w-3 h-3" /> AI-Powered Visual Auditing
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1]">
              Compare images with <br />
              <span className="text-gradient">mathematical precision.</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-500 mb-10 leading-relaxed">
              OpticSync is the gold standard for visual verification. Automate difference detection, 
              streamline annotations, and audit assets with unparalleled accuracy.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={onLaunch}
                className="group w-full sm:w-auto px-8 py-4 bg-primary text-white rounded-xl font-bold text-lg hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
              >
                Start Demo Workspace <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="w-full sm:w-auto px-8 py-4 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all">
                Talk to Sales
              </button>
            </div>
          </motion.div>

          {/* Floating UI Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-20 relative max-w-5xl mx-auto"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-50 p-2">
              <div className="rounded-xl overflow-hidden border border-slate-200 shadow-inner">
                <img 
                  src="/dashboard_preview.png" 
                  alt="OpticSync Dashboard" 
                  className="w-full object-cover"
                  onError={(e) => {
                    // Fallback to a placeholder if image generation hasn't moved the file yet
                    e.currentTarget.src = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426";
                  }}
                />
              </div>
              
              {/* Decorative Floating Elements */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-10 -right-10 hidden lg:block p-4 bg-white rounded-2xl shadow-xl border border-slate-100"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-50 rounded-lg"><CheckCircle2 className="w-6 h-6 text-green-500" /></div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-tight">Audit Status</p>
                    <p className="text-sm font-bold text-slate-900">98% Verified</p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-10 -left-10 hidden lg:block p-4 bg-white rounded-2xl shadow-xl border border-slate-100"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/5 rounded-lg"><Search className="w-6 h-6 text-primary" /></div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-tight">AI Detection</p>
                    <p className="text-sm font-bold text-slate-900">4 Changes Found</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Built for high-stakes workflows</h2>
            <p className="text-slate-500">Every pixel matters. We make sure none are missed.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Layers, title: "Side-by-Side Sync", desc: "Lock views across multiple versions to pinpoint even the most subtle layout shifts." },
              { icon: FileCheck, title: "Annotation Suite", desc: "Collaborative markers, sticky notes, and drawing tools for pixel-perfect feedback." },
              { icon: Shield, title: "Audit Trail", desc: "Full history of every change, comment, and approval for compliance-ready reporting." }
            ].map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm transition-all"
              >
                <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:row items-center justify-between gap-6">
          <div className="flex items-center gap-2 grayscale opacity-50">
            <div className="h-6 w-6 bg-slate-900 rounded flex items-center justify-center text-white font-bold text-xs">O</div>
            <span className="font-bold text-lg tracking-tight">OpticSync</span>
          </div>
          <p className="text-sm text-slate-400">© 2026 OpticSync Visual Intelligence. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
