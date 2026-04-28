"use client";

import { motion } from "framer-motion";
import { Plus, Search, Filter, MoreHorizontal, ArrowUpRight, ArrowDownRight, Clock, CheckCircle2, AlertCircle, Files } from "lucide-react";

export default function Dashboard({ onNewProject }: { onNewProject: () => void }) {
  const stats = [
    { label: "Active Audits", value: "12", change: "+2", trending: "up", icon: Clock, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Differences Found", value: "148", change: "+12%", trending: "up", icon: AlertCircle, color: "text-amber-500", bg: "bg-amber-50" },
    { label: "Verified Assets", value: "1,204", change: "+84", trending: "up", icon: CheckCircle2, color: "text-green-500", bg: "bg-green-50" },
  ];

  const recentProjects = [
    { id: 1, name: "Skyline Tower Floor 4", status: "In Review", progress: 65, updated: "2h ago", users: 3 },
    { id: 2, name: "Central Park West - Rev B", status: "Completed", progress: 100, updated: "5h ago", users: 2 },
    { id: 3, name: "Luxury Villa - Interior Design", status: "Flagged", progress: 42, updated: "Yesterday", users: 5 },
    { id: 4, name: "Tech Hub - Structural Changes", status: "In Review", progress: 88, updated: "2 days ago", users: 4 },
  ];

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Workspace Dashboard</h1>
          <p className="text-slate-500 mt-1">Welcome back, Alex. Here's what's happening today.</p>
        </div>
        <button 
          onClick={onNewProject}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 active:scale-95"
        >
          <Plus className="w-5 h-5" /> New Audit Project
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={i}
            className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold ${stat.trending === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                {stat.change} {stat.trending === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              </div>
            </div>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{stat.label}</p>
            <p className="text-3xl font-bold text-slate-900 mt-1">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Projects Table */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-bold text-lg">Active Projects</h2>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 border border-slate-200 transition-colors">
              <Filter className="w-4 h-4" />
            </button>
            <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 border border-slate-200 transition-colors">
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs font-bold text-slate-400 uppercase tracking-widest bg-slate-50/50">
                <th className="px-6 py-4">Project Name</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Verification Progress</th>
                <th className="px-6 py-4">Last Activity</th>
                <th className="px-6 py-4">Team</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentProjects.map((project, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors group cursor-pointer">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400">
                        <Files className="w-5 h-5" />
                      </div>
                      <span className="font-bold text-slate-900">{project.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      project.status === 'Completed' ? 'bg-green-50 text-green-600' :
                      project.status === 'Flagged' ? 'bg-red-50 text-red-600' :
                      'bg-blue-50 text-blue-600'
                    }`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-full max-w-[120px] space-y-1.5">
                      <div className="flex items-center justify-between text-[10px] font-bold text-slate-400">
                        <span>{project.progress}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${project.progress}%` }}
                          transition={{ duration: 1, delay: i * 0.1 }}
                          className={`h-full rounded-full ${
                            project.progress === 100 ? 'bg-green-500' : 'bg-primary'
                          }`}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500 font-medium">
                    {project.updated}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex -space-x-2">
                      {[...Array(project.users)].map((_, j) => (
                        <div key={j} className="w-7 h-7 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center overflow-hidden">
                          <img src={`https://i.pravatar.cc/150?u=${project.id}-${j}`} alt="User" />
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-200 rounded-lg text-slate-400 transition-all">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
