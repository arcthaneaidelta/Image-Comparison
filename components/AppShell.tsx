"use client";

import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Files, 
  Columns, 
  Settings, 
  Clock, 
  Bell, 
  Search, 
  User,
  LogOut,
  ChevronRight,
  Menu,
  X,
  FileCheck
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface AppShellProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function AppShell({ children, activeTab, setActiveTab }: AppShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const navItems = [
    { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { id: "projects", icon: Files, label: "Projects" },
    { id: "compare", icon: Columns, label: "Compare" },
    { id: "annotate", icon: FileCheck, label: "Annotate" },
    { id: "activity", icon: Clock, label: "Activity" },
    { id: "settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div className="flex h-screen bg-[#F8FAFC]">
      {/* Sidebar */}
      <aside 
        className={cn(
          "bg-white border-r border-slate-200 transition-all duration-300 flex flex-col",
          isSidebarOpen ? "w-64" : "w-20"
        )}
      >
        <div className="h-16 flex items-center px-6 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold shrink-0 shadow-sm shadow-primary/20">O</div>
            {isSidebarOpen && <span className="font-bold text-lg tracking-tight whitespace-nowrap">OpticSync</span>}
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group",
                activeTab === item.id 
                  ? "bg-primary/5 text-primary" 
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5 shrink-0",
                activeTab === item.id ? "text-primary" : "text-slate-400 group-hover:text-slate-600"
              )} />
              {isSidebarOpen && <span className="text-sm font-semibold whitespace-nowrap">{item.label}</span>}
              {activeTab === item.id && isSidebarOpen && (
                <motion.div layoutId="active" className="ml-auto w-1 h-4 bg-primary rounded-full" />
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button className="w-full flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-red-500 transition-colors">
            <LogOut className="w-5 h-5" />
            {isSidebarOpen && <span className="text-sm font-semibold">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-4 flex-1">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"
            >
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="relative max-w-md w-full hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search projects, audits, or files..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-slate-600 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-px bg-slate-200 mx-2"></div>
            <div className="flex items-center gap-3 pl-2">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-slate-900 leading-none">Alex Rivera</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Admin Level</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 font-bold overflow-hidden shadow-inner">
                <img src="https://ui-avatars.com/api/?name=Alex+Rivera&background=0D8ABC&color=fff" alt="User" />
              </div>
            </div>
          </div>
        </header>

        {/* Page Area */}
        <div className="flex-1 overflow-y-auto p-8 relative">
          {children}
        </div>
      </main>
    </div>
  );
}
