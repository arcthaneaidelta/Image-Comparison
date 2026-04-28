"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  Columns, 
  Layers, 
  MousePointer2, 
  Pencil, 
  StickyNote, 
  Plus, 
  ChevronRight, 
  ChevronLeft,
  Maximize2,
  Download,
  Share2,
  CheckCircle2,
  AlertCircle,
  Eye,
  Settings2,
  Zap,
  MoreVertical,
  Minus,
  Maximize
} from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function Workspace() {
  const [activeTool, setActiveTool] = useState("select");
  const [showAI, setShowAI] = useState(false);
  const [annotations, setAnnotations] = useState<any[]>([]);
  const [zoom, setZoom] = useState(100);
  const [isExporting, setIsExporting] = useState(false);

  // Simulated AI markers
  const aiFindings = [
    { id: 1, x: 42, y: 35, type: "difference", label: "Structural Wall Shifted" },
    { id: 2, x: 65, y: 72, type: "note", label: "Material Specification Mismatch" },
  ];

  const tools = [
    { id: "select", icon: MousePointer2, label: "Select" },
    { id: "draw", icon: Pencil, label: "Draw" },
    { id: "note", icon: StickyNote, label: "Add Note" },
    { id: "highlight", icon: Layers, label: "Highlight Area" },
  ];

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert("Project exported as high-resolution PDF.");
    }, 3000);
  };

  return (
    <div className="h-[calc(100vh-140px)] flex gap-6 overflow-hidden">
      {/* Left Toolbar */}
      <div className="w-16 flex flex-col items-center gap-4 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm shrink-0">
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => setActiveTool(tool.id)}
            className={cn(
              "p-3 rounded-xl transition-all group relative",
              activeTool === tool.id ? "bg-primary text-white" : "text-slate-400 hover:bg-slate-50 hover:text-slate-900"
            )}
          >
            <tool.icon className="w-5 h-5" />
            <div className="absolute left-full ml-3 px-2 py-1 bg-slate-900 text-white text-[10px] font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
              {tool.label}
            </div>
          </button>
        ))}
        <div className="h-px w-8 bg-slate-100 my-2" />
        <button 
          onClick={() => setShowAI(!showAI)}
          className={cn(
            "p-3 rounded-xl transition-all relative group",
            showAI ? "bg-amber-500 text-white" : "text-amber-500 hover:bg-amber-50"
          )}
        >
          <Zap className="w-5 h-5" />
          <div className="absolute left-full ml-3 px-2 py-1 bg-slate-900 text-white text-[10px] font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
            Toggle AI Assist
          </div>
        </button>
      </div>

      {/* Main Viewer Area */}
      <div className="flex-1 flex flex-col bg-slate-200/50 rounded-3xl border border-slate-200 overflow-hidden relative">
        {/* Viewer Header */}
        <div className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Comparing</span>
              <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-lg">
                <span className="text-xs font-bold text-slate-900">Rev A</span>
                <ChevronRight className="w-3 h-3 text-slate-400" />
                <span className="text-xs font-bold text-primary">Rev B (Latest)</span>
              </div>
            </div>
            <div className="h-4 w-px bg-slate-200" />
            <div className="flex items-center gap-2">
              <button onClick={() => setZoom(z => Math.max(z - 10, 50))} className="p-1 hover:bg-slate-100 rounded text-slate-400"><Minus className="w-4 h-4" /></button>
              <span className="text-xs font-bold text-slate-600 w-10 text-center">{zoom}%</span>
              <button onClick={() => setZoom(z => Math.min(z + 10, 300))} className="p-1 hover:bg-slate-100 rounded text-slate-400"><Plus className="w-4 h-4" /></button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-900 transition-colors">
              <Share2 className="w-4 h-4" /> <span className="text-sm font-bold">Share</span>
            </button>
            <button 
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary-dark transition-all shadow-md shadow-primary/20"
            >
              <Download className="w-4 h-4" /> Export
            </button>
          </div>
        </div>

        {/* Dual Pane Viewer */}
        <div className="flex-1 flex overflow-hidden p-6 gap-6 relative">
          {/* Left Side: Original */}
          <div className="flex-1 bg-white rounded-2xl border border-slate-200 overflow-hidden relative group cursor-crosshair shadow-sm">
            <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-slate-900/80 text-white text-[10px] font-bold rounded-full backdrop-blur-sm">
              REV A (ORIGINAL)
            </div>
            <div className="w-full h-full flex items-center justify-center p-8">
              <img 
                src="/blueprint_before.png" 
                alt="Original" 
                className="max-w-full max-h-full object-contain transition-transform duration-200"
                style={{ transform: `scale(${zoom / 100})` }}
              />
            </div>
          </div>

          {/* Right Side: Current */}
          <div className="flex-1 bg-white rounded-2xl border border-slate-200 overflow-hidden relative group cursor-crosshair shadow-sm">
            <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-primary/90 text-white text-[10px] font-bold rounded-full backdrop-blur-sm">
              REV B (CURRENT)
            </div>
            <div className="w-full h-full flex items-center justify-center p-8 relative">
              <img 
                src="/blueprint_after.png" 
                alt="Latest" 
                className="max-w-full max-h-full object-contain transition-transform duration-200"
                style={{ transform: `scale(${zoom / 100})` }}
              />
              
              {/* Simulated AI Overlays */}
              <AnimatePresence>
                {showAI && aiFindings.map((finding) => (
                  <motion.div
                    key={finding.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute"
                    style={{ left: `${finding.x}%`, top: `${finding.y}%` }}
                  >
                    <div className="relative group/marker">
                      <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center text-white shadow-lg animate-pulse border-2 border-white">
                        <Zap className="w-3 h-3" />
                      </div>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg shadow-xl whitespace-nowrap opacity-0 group-hover/marker:opacity-100 transition-opacity z-50">
                        {finding.label}
                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* User Annotation Example */}
              <div className="absolute top-[20%] left-[30%]">
                <div className="flex flex-col items-center gap-2">
                   <div className="px-3 py-2 bg-blue-500 text-white text-xs font-bold rounded-lg shadow-lg relative">
                     Check plumbing alignment here
                     <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-blue-500 rotate-45" />
                   </div>
                   <div className="w-8 h-8 rounded-full border-2 border-blue-500 flex items-center justify-center">
                     <StickyNote className="w-4 h-4 text-blue-500" />
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sync Controls Footer */}
        <div className="h-12 bg-white/80 backdrop-blur-md border-t border-slate-200 flex items-center justify-center gap-4 shrink-0 px-6">
           <button className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-primary transition-colors">Lock Pan/Zoom</button>
           <div className="h-3 w-px bg-slate-200" />
           <button className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-primary transition-colors">Overlay Mode</button>
           <div className="h-3 w-px bg-slate-200" />
           <button className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-primary transition-colors">Reset View</button>
        </div>
      </div>

      {/* Right Workflow Panel */}
      <div className="w-80 flex flex-col gap-6 shrink-0">
        {/* Checklist */}
        <div className="flex-1 bg-white border border-slate-200 rounded-3xl shadow-sm flex flex-col overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-900">Audit Checklist</h3>
            <span className="text-[10px] font-bold px-2 py-1 bg-slate-100 text-slate-500 rounded-full">4 / 12 DONE</span>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {[
              { label: "Verify structural dimensions", status: "done" },
              { label: "Check wall thickness consistency", status: "done" },
              { label: "Audit material legends", status: "pending" },
              { label: "Review plumbing routing", status: "flagged" },
              { label: "Verify electrical panels", status: "pending" },
              { label: "Cross-check HVAC zones", status: "pending" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-50 transition-colors group cursor-pointer border border-transparent hover:border-slate-100">
                <div className={cn(
                  "w-5 h-5 rounded-md flex items-center justify-center shrink-0 border-2 transition-all",
                  item.status === 'done' ? "bg-green-500 border-green-500 text-white" :
                  item.status === 'flagged' ? "bg-red-50 border-red-200 text-red-500" :
                  "border-slate-200 text-transparent group-hover:border-primary"
                )}>
                  {item.status === 'done' ? <CheckCircle2 className="w-3 h-3" /> : 
                   item.status === 'flagged' ? <AlertCircle className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                </div>
                <span className={cn(
                  "text-sm font-semibold",
                  item.status === 'done' ? "text-slate-400 line-through" : "text-slate-700"
                )}>{item.label}</span>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-slate-100">
            <button className="w-full py-3 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all">
              Submit Audit for Review
            </button>
          </div>
        </div>

        {/* AI Suggestions Card */}
        <div className="bg-primary rounded-3xl p-6 text-white shadow-lg shadow-primary/20 relative overflow-hidden">
          <Zap className="w-12 h-12 absolute -top-2 -right-2 text-white/10 rotate-12" />
          <h4 className="font-bold mb-2 flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-300 fill-amber-300" /> AI Insights
          </h4>
          <p className="text-xs text-white/80 leading-relaxed mb-4">
            Our neural engine has detected 4 potential inconsistencies in layer geometry.
          </p>
          <button 
            onClick={() => setShowAI(true)}
            className="w-full py-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all"
          >
            Review Insights
          </button>
        </div>
      </div>

      {/* Export Modal Simulation */}
      <AnimatePresence>
        {isExporting && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white p-10 rounded-3xl shadow-2xl max-w-sm w-full text-center"
            >
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Download className="w-10 h-10 text-primary" />
                </motion.div>
              </div>
              <h3 className="text-2xl font-bold mb-2">Generating Export</h3>
              <p className="text-slate-500 mb-6 text-sm">Compiling all annotations and differences into a high-fidelity audit report...</p>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2.5 }}
                  className="h-full bg-primary"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
