"use client";

import { useState, useEffect } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import LandingPage from "@/components/LandingPage";
import AppShell from "@/components/AppShell";
import Dashboard from "@/components/Dashboard";
import Workspace from "@/components/Workspace";
import { ActivityPage, SettingsPage } from "@/components/Pages";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  const [stage, setStage] = useState<"loading" | "landing" | "app">("loading");
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleFinishLoading = () => {
    setStage("landing");
  };

  const handleLaunchDemo = () => {
    setStage("app");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard onNewProject={() => setActiveTab("compare")} />;
      case "compare":
      case "annotate":
        return <Workspace />;
      case "activity":
        return <ActivityPage />;
      case "settings":
        return <SettingsPage />;
      case "projects":
        return (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
            <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center text-slate-300">
              <Search className="w-10 h-10" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">No Projects Found</h2>
              <p className="text-slate-500 max-w-xs mx-auto mt-2">You haven't created any audit projects yet. Start by comparing two files.</p>
            </div>
            <button 
              onClick={() => setActiveTab("compare")}
              className="px-6 py-3 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-all"
            >
              Start Your First Audit
            </button>
          </div>
        );
      default:
        return <Dashboard onNewProject={() => setActiveTab("compare")} />;
    }
  };

  return (
    <main>
      <AnimatePresence mode="wait">
        {stage === "loading" && (
          <LoadingScreen key="loading" onFinished={handleFinishLoading} />
        )}

        {stage === "landing" && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <LandingPage onLaunch={handleLaunchDemo} />
          </motion.div>
        )}

        {stage === "app" && (
          <motion.div
            key="app"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <AppShell activeTab={activeTab} setActiveTab={setActiveTab}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="h-full"
                >
                  {renderContent()}
                </motion.div>
              </AnimatePresence>
            </AppShell>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

// Minimal Search icon for the fallback page
function Search({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
    </svg>
  );
}
