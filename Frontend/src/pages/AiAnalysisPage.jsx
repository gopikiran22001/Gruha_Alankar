import React from 'react';
import Progress from '../components/ui/progress';
import { Activity, Sun, ShieldAlert, Sparkles, CheckCircle2, ChevronRight, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export const AiAnalysisPage = () => {
  return (
    <div className="p-4 md:p-6 space-y-6 max-w-6xl mx-auto select-none">
      
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
          <Activity size={18} className="text-primary" />
          <span>Spatial & Lighting Diagnostics</span>
        </h2>
        <p className="text-xs text-muted">Comprehensive AI telemetry, space efficiency grids, and illumination scores</p>
      </div>

      {/* Overview dials grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Dial 1: Space Optimization Score */}
        <div className="glass-panel p-5 rounded-xl flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] text-muted font-bold uppercase tracking-wider">Spatial Score</span>
            <h4 className="text-xl font-bold text-white">Highly Efficient</h4>
            <p className="text-[10px] text-muted">92% circulation clearance rate</p>
          </div>
          
          {/* SVG Circular Gauge */}
          <div className="relative w-16 h-16 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path className="text-zinc-800" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path className="text-primary" strokeWidth="3" strokeDasharray="92, 100" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
            <span className="absolute text-xs font-black text-white">92%</span>
          </div>
        </div>

        {/* Dial 2: Lighting Index */}
        <div className="glass-panel p-5 rounded-xl flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] text-muted font-bold uppercase tracking-wider">Natural Daylight</span>
            <h4 className="text-xl font-bold text-white">Luminance: Optimal</h4>
            <p className="text-[10px] text-muted">280 Lux average ambient light</p>
          </div>
          
          <div className="relative w-16 h-16 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path className="text-zinc-800" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path className="text-secondary" strokeWidth="3" strokeDasharray="78, 100" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
            <span className="absolute text-xs font-black text-white">78%</span>
          </div>
        </div>

        {/* Dial 3: Obstruction Ratio */}
        <div className="glass-panel p-5 rounded-xl flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] text-muted font-bold uppercase tracking-wider">Floor Clearance</span>
            <h4 className="text-xl font-bold text-white">Low Obstruction</h4>
            <p className="text-[10px] text-muted">14% total floor coverage ratio</p>
          </div>
          
          <div className="relative w-16 h-16 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path className="text-zinc-800" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path className="text-success" strokeWidth="3" strokeDasharray="14, 100" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
            <span className="absolute text-xs font-black text-white">14%</span>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Grid: Light Diffusion Heatmap & Object list */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Heatmap Grid */}
          <div className="glass-panel p-5 rounded-xl space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">Illumination Density Matrix</h3>
                <p className="text-[10px] text-muted">Calculated light levels mapping layout grids</p>
              </div>
              <span className="text-[9px] text-muted flex items-center gap-1">
                <Sun size={11} className="text-amber-400" /> Natural source: East
              </span>
            </div>

            {/* Heatmap Layout representation */}
            <div className="grid grid-cols-12 gap-1 bg-background/60 p-3 rounded-lg border border-border aspect-[3/1] items-stretch">
              {/* Generate a mock layout matrix grid with varying opacities */}
              {Array.from({ length: 36 }).map((_, idx) => {
                // Vary opacities based on grid coordinate (East is high, West is low)
                const opacity = 0.95 - (idx % 12) * 0.07;
                return (
                  <div
                    key={idx}
                    className="rounded-xs transition-colors hover:brightness-125 cursor-help"
                    style={{ backgroundColor: `rgba(124, 58, 237, ${Math.max(0.05, opacity)})` }}
                    title={`Grid #${idx + 1}: ${Math.round(opacity * 380)} Lux`}
                  />
                );
              })}
            </div>
            
            {/* Legend info */}
            <div className="flex justify-between items-center text-[10px] text-muted font-bold uppercase tracking-wider border-t border-border pt-3">
              <span>Low Light (&lt; 50 Lux)</span>
              <div className="flex gap-1 items-center">
                <div className="w-2.5 h-2.5 rounded bg-primary/10" />
                <div className="w-2.5 h-2.5 rounded bg-primary/40" />
                <div className="w-2.5 h-2.5 rounded bg-primary/70" />
                <div className="w-2.5 h-2.5 rounded bg-primary" />
              </div>
              <span>Daylight (&gt; 350 Lux)</span>
            </div>
          </div>

          {/* Object classifications classification list */}
          <div className="glass-panel p-5 rounded-xl space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Detected Classifications List</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-border text-muted font-bold uppercase tracking-wider">
                    <th className="pb-2">Object Name</th>
                    <th className="pb-2">Confidence</th>
                    <th className="pb-2">Dimensions</th>
                    <th className="pb-2 text-right">Clearance Rating</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[
                    { name: 'Aurelia Lounge Sofa', conf: '94%', size: '220 x 95 cm', rating: 'Excellent (1.2m gap)', positive: true },
                    { name: 'Calacatta Coffee Table', conf: '89%', size: '100 cm Diam.', rating: 'Warning (38cm clearance)', positive: false },
                    { name: 'Eclipse Pendant Lamp', conf: '82%', size: '45 cm Diam.', rating: 'Optimal height (2.1m clearance)', positive: true }
                  ].map((obj, idx) => (
                    <tr key={idx} className="hover:bg-white/5 transition-colors">
                      <td className="py-2.5 text-white font-semibold">{obj.name}</td>
                      <td className="py-2.5 text-muted">{obj.conf}</td>
                      <td className="py-2.5 text-muted">{obj.size}</td>
                      <td className={`py-2.5 text-right font-bold ${obj.positive ? 'text-success' : 'text-amber-500'}`}>
                        {obj.rating}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Right Grid: AI Reasoning Logs */}
        <div className="space-y-6">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">AI Reasoning Logs</h3>
          
          <div className="glass-panel p-5 rounded-xl space-y-4">
            <div className="flex gap-2.5 items-center text-primary font-bold text-xs uppercase tracking-wider border-b border-border pb-3">
              <Sparkles size={14} />
              <span>Diagnostic Checklist</span>
            </div>

            <div className="space-y-3.5">
              {[
                { title: 'Circulation clearances checks passed', desc: 'Walking paths exceed standard 90cm clearances.', status: 'pass' },
                { title: 'Contrast ratios optimized', desc: 'Deep purple velvet sofa creates excellent 4.5:1 color contrast with the light floor.', status: 'pass' },
                { title: 'Clearance warning identified', desc: 'Coffee table clearance is 38cm. Move 7cm further to prevent legroom overlap.', status: 'warn' },
                { title: 'Illumination deficits in Northeast alcove', desc: 'Light levels fall below 50 Lux. Task floor lamp recommended.', status: 'info' }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-3 items-start">
                  <div className={`p-1 rounded-full mt-0.5 ${
                    item.status === 'pass' ? 'bg-success/15 text-success' :
                    item.status === 'warn' ? 'bg-amber-500/15 text-amber-500' : 'bg-primary/15 text-primary'
                  }`}>
                    <CheckCircle2 size={12} />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white">{item.title}</h5>
                    <p className="text-[10px] text-muted mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-background/60 border border-border rounded-lg p-3 mt-4 text-[10px] text-muted leading-relaxed">
              Spatial logs update automatically after running Camera Frame analysis or editing structural layouts in the 3D studio.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AiAnalysisPage;
