"use client";

import { motion } from "framer-motion";
import { Clock, Search, Filter, MoreVertical, User, ArrowUpRight } from "lucide-react";

export function ActivityPage() {
  const activities = [
    { user: "Alex Rivera", action: "approved", target: "Floor Plan Rev B", time: "12m ago", type: "success" },
    { user: "Sarah Chen", action: "added a note", target: "Section 4.2", time: "45m ago", type: "info" },
    { user: "AI Engine", action: "detected change", target: "Material Legend", time: "2h ago", type: "warning" },
    { user: "James Wilson", action: "uploaded", target: "Skyline Tower Rev C", time: "5h ago", type: "info" },
    { user: "Alex Rivera", action: "exported", target: "Audit Report #402", time: "Yesterday", type: "success" },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Activity Log</h1>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-slate-50 transition-all">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {activities.map((activity, i) => (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            key={i}
            className="p-4 bg-white border border-slate-200 rounded-2xl flex items-center justify-between group hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold overflow-hidden border border-slate-200">
                <img src={`https://i.pravatar.cc/150?u=${activity.user}`} alt="" />
              </div>
              <div>
                <p className="text-sm">
                  <span className="font-bold text-slate-900">{activity.user}</span>
                  <span className="text-slate-500 mx-1.5">{activity.action}</span>
                  <span className="font-bold text-primary">{activity.target}</span>
                </p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{activity.time}</p>
              </div>
            </div>
            <button className="p-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowUpRight className="w-4 h-4 text-slate-400" />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <h1 className="text-3xl font-bold">Workspace Settings</h1>
      
      <div className="space-y-8">
        <section className="space-y-4">
          <h2 className="text-lg font-bold pb-2 border-b border-slate-100">General Information</h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Workspace Name</label>
              <input type="text" defaultValue="OpticSync Design Lab" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Workspace URL</label>
              <div className="flex items-center">
                <span className="px-4 py-3 bg-slate-50 border border-r-0 border-slate-200 rounded-l-xl text-sm text-slate-400 font-medium">opticsync.ai/</span>
                <input type="text" defaultValue="design-lab" className="flex-1 px-4 py-3 bg-white border border-slate-200 rounded-r-xl text-sm outline-none" />
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-bold pb-2 border-b border-slate-100">AI Preferences</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-2xl">
              <div>
                <p className="font-bold text-slate-900">Automatic Difference Detection</p>
                <p className="text-xs text-slate-500">Enable neural engine to highlight changes automatically on upload.</p>
              </div>
              <div className="w-12 h-6 bg-primary rounded-full p-1 cursor-pointer">
                <div className="w-4 h-4 bg-white rounded-full ml-auto" />
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-2xl">
              <div>
                <p className="font-bold text-slate-900">Predictive Annotation</p>
                <p className="text-xs text-slate-500">Suggest comments based on historical audit patterns.</p>
              </div>
              <div className="w-12 h-6 bg-slate-200 rounded-full p-1 cursor-pointer">
                <div className="w-4 h-4 bg-white rounded-full" />
              </div>
            </div>
          </div>
        </section>
      </div>
      
      <div className="pt-6 border-t border-slate-100 flex justify-end gap-3">
        <button className="px-6 py-3 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all">Cancel</button>
        <button className="px-6 py-3 bg-primary text-white rounded-xl font-bold text-sm hover:bg-primary-dark transition-all shadow-lg shadow-primary/20">Save Changes</button>
      </div>
    </div>
  );
}
