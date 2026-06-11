import React from 'react';
import { useDesignStore } from '../store/designStore';
import { useProjectStore } from '../store/projectStore';
import UploadCard from '../components/shared/UploadCard';
import RoomViewer from '../components/canvas/RoomViewer';
import Button from '../components/ui/button';
import { DESIGN_STYLES } from '../utils/mockData';
import { Sparkles, Layers, Sliders, Check, Eye, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const DesignStudioPage = () => {
  const {
    uploadedImage,
    selectedStyle,
    budget,
    roomType,
    isGenerating,
    activeDesign,
    roomAnalysis,
    generatedImageUrl,
    comparisonImageUrl,
    error,
    setUploadedImage,
    setSelectedStyle,
    setBudget,
    setRoomType,
    generateDesign,
    regenerateDesign,
    resetStudio
  } = useDesignStore();

  const { addProject } = useProjectStore();
  const [activeVisualTab, setActiveVisualTab] = React.useState('canvas');

  // Automatically switch tab when AI image finishes generating
  React.useEffect(() => {
    if (generatedImageUrl) {
      setActiveVisualTab('render');
    } else {
      setActiveVisualTab('canvas');
    }
  }, [generatedImageUrl]);

  const handleSaveToProjects = async () => {
    if (!activeDesign) return;
    const styleMeta = DESIGN_STYLES.find(s => s.id === selectedStyle);
    await addProject({
      name: `${styleMeta?.name || 'Modern'} Concept Studio`,
      style: styleMeta?.name || 'Modern',
      budget: budget || activeDesign.budget?.split(' - ')[0] || null,
      image: generatedImageUrl || uploadedImage || 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&auto=format&fit=crop&q=80',
      analysis: {
        roomType: roomType || 'Living Room',
        lighting: roomAnalysis?.lighting_analysis?.classification?.replace('_', ' ') || 'Diagnosed natural light',
        detectedObjects: roomAnalysis?.detected_objects?.objects || (activeDesign.furniture || []).map(f => f.name),
        spaceUtilization: '85%',
        score: 90
      }
    });
    alert('Project successfully saved to Saved Projects archive!');
  };

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-6xl mx-auto select-none">
      
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <Sliders size={18} className="text-primary" />
            <span>AI Design Studio</span>
          </h2>
          <p className="text-xs text-muted">Configure parameters, select style profiles, and generate photorealistic designs</p>
        </div>

        {activeDesign && (
          <div className="flex gap-2.5">
            <Button variant="glass" size="sm" onClick={resetStudio}>
              Reset Studio
            </Button>
            <Button variant="primary" size="sm" onClick={handleSaveToProjects}>
              Save Workspace
            </Button>
          </div>
        )}
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl flex items-center gap-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping shrink-0" />
          <span className="font-medium">{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side Settings Form: Upload & Styling Options */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Upload panel */}
          <div className="glass-panel p-5 rounded-xl space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">01. Room Blueprint</h3>
            <UploadCard
              previewImage={uploadedImage}
              onFileSelected={setUploadedImage}
              onClear={resetStudio}
            />
          </div>

          {/* Configuration Settings */}
          <div className="glass-panel p-5 rounded-xl space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">02. Configuration Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-muted uppercase tracking-wider block mb-1.5">Room Type</label>
                <select
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                  disabled={isGenerating}
                  className="w-full bg-zinc-900 border border-border rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-primary transition-colors cursor-pointer"
                >
                  <option value="living room">Living Room</option>
                  <option value="bedroom">Bedroom</option>
                  <option value="kitchen">Kitchen</option>
                  <option value="dining room">Dining Room</option>
                  <option value="home office">Home Office</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-muted uppercase tracking-wider block mb-1.5">Estimated Budget (INR)</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs text-muted font-bold">₹</span>
                  <input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="e.g. 200000"
                    disabled={isGenerating}
                    className="w-full bg-zinc-900 border border-border rounded-lg pl-7 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Style selector grid */}
          <div className="glass-panel p-5 rounded-xl space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              {activeDesign ? '03. Style Regeneration' : '03. Design Style Profile'}
            </h3>
            
            <div className="grid grid-cols-2 gap-2">
              {DESIGN_STYLES.map((style) => (
                <button
                  key={style.id}
                  onClick={() => {
                    if (activeDesign) {
                      regenerateDesign(style.id);
                    } else {
                      setSelectedStyle(style.id);
                    }
                  }}
                  disabled={isGenerating}
                  className={`p-3 rounded-lg border text-left flex flex-col justify-between transition-all select-none duration-300 relative overflow-hidden h-[76px] ${
                    selectedStyle === style.id
                      ? 'border-primary bg-zinc-800 text-white shadow-glow'
                      : 'border-border bg-surface/40 text-muted hover:text-primary hover:border-border'
                  }`}
                >
                  <span className="text-xs font-bold">{style.name}</span>
                  <span className="text-[9px] text-muted mt-1 line-clamp-2 leading-tight">{style.desc}</span>
                  {selectedStyle === style.id && (
                    <div className="absolute right-2 top-2 text-primary">
                      <Check size={12} />
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Trigger Button */}
            {!activeDesign && (
              <Button
                className="w-full mt-4"
                variant="primary"
                size="lg"
                loading={isGenerating}
                disabled={isGenerating || !uploadedImage}
                onClick={generateDesign}
                icon={<Sparkles size={16} />}
              >
                Generate AI Concept
              </Button>
            )}
          </div>

        </div>

        {/* Right Side Canvas & Recommendations Output */}
        <div className="lg:col-span-2 space-y-6">
          <AnimatePresence mode="wait">
            
            {/* 1. Loading active state */}
            {isGenerating && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="glass-panel rounded-xl h-[450px] md:h-[500px] flex flex-col items-center justify-center space-y-4 border border-border shadow-glow"
              >
                <div className="relative flex items-center justify-center">
                  <span className="absolute w-16 h-16 rounded-full border-2 border-primary/25 border-t-primary animate-spin" />
                  <span className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white">
                    <Sparkles size={16} className="animate-pulse" />
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white tracking-wider uppercase">Generating room parameters...</h4>
                <p className="text-xs text-muted max-w-xs text-center leading-relaxed">
                  Scanning architectural walls, estimating light diffusion grids, and rendering spatial catalog designs (10-30 seconds).
                </p>
              </motion.div>
            )}

            {/* 2. Empty state */}
            {!isGenerating && !activeDesign && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-panel rounded-xl h-[450px] md:h-[500px] flex flex-col items-center justify-center space-y-3 p-8 border border-border"
              >
                <div className="p-4 rounded-full bg-surface/85 border border-border text-muted">
                  <Layers size={28} />
                </div>
                <h4 className="text-sm font-bold text-white">Interactive Workspace Standby</h4>
                <p className="text-xs text-muted max-w-xs text-center leading-relaxed">
                  Please upload a room image snapshot on the left panel, configure your target style/budget, and execute the generator.
                </p>
              </motion.div>
            )}

            {/* 3. Render results generated workspace */}
            {!isGenerating && activeDesign && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                
                {/* Visual Tabbed Panel */}
                <div className="glass-panel rounded-xl overflow-hidden border border-border">
                  <div className="flex border-b border-border bg-zinc-900/60 p-2 justify-between items-center flex-wrap gap-2">
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => setActiveVisualTab('render')}
                        disabled={!generatedImageUrl}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          !generatedImageUrl
                            ? 'text-muted/40 cursor-not-allowed'
                            : activeVisualTab === 'render'
                            ? 'bg-primary text-white shadow-glow'
                            : 'text-muted hover:text-white'
                        }`}
                      >
                        AI Photo Render
                      </button>
                      <button
                        onClick={() => setActiveVisualTab('comparison')}
                        disabled={!comparisonImageUrl}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          !comparisonImageUrl
                            ? 'text-muted/40 cursor-not-allowed'
                            : activeVisualTab === 'comparison'
                            ? 'bg-primary text-white shadow-glow'
                            : 'text-muted hover:text-white'
                        }`}
                      >
                        Before & After
                      </button>
                      <button
                        onClick={() => setActiveVisualTab('canvas')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          activeVisualTab === 'canvas'
                            ? 'bg-primary text-white shadow-glow'
                            : 'text-muted hover:text-white'
                        }`}
                      >
                        3D Canvas Space
                      </button>
                    </div>

                    {generatedImageUrl && (
                      <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-md border border-emerald-500/20 font-bold uppercase tracking-wider animate-pulse flex items-center gap-1">
                        <Sparkles size={10} />
                        AI Render Live
                      </span>
                    )}
                  </div>

                  <div className="p-2 bg-zinc-950/80">
                    <AnimatePresence mode="wait">
                      {activeVisualTab === 'canvas' && (
                        <motion.div
                          key="canvas"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <RoomViewer styleName={selectedStyle} />
                        </motion.div>
                      )}

                      {activeVisualTab === 'render' && generatedImageUrl && (
                        <motion.div
                          key="render"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="relative aspect-video w-full rounded-lg overflow-hidden border border-border flex items-center justify-center bg-zinc-900"
                        >
                          <img
                            src={generatedImageUrl}
                            alt="AI Generated Design Render"
                            className="w-full h-full object-cover"
                          />
                        </motion.div>
                      )}

                      {activeVisualTab === 'comparison' && comparisonImageUrl && (
                        <motion.div
                          key="comparison"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="relative aspect-video w-full rounded-lg overflow-hidden border border-border flex items-center justify-center bg-zinc-900"
                        >
                          <img
                            src={comparisonImageUrl}
                            alt="Before and After Comparison"
                            className="w-full h-full object-cover"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* AI Design Reports */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Space Optimisation card */}
                  <div className="glass-panel p-5 rounded-xl space-y-2.5">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-wider">Spatial Routing</span>
                    <h4 className="text-xs font-bold text-white">Space clearance guidelines</h4>
                    <p className="text-xs text-muted leading-relaxed">{activeDesign.space}</p>
                  </div>

                  {/* Palette and Budget card */}
                  <div className="glass-panel p-5 rounded-xl flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold text-secondary uppercase tracking-wider">Color Scheme</span>
                      <div className="flex gap-2 items-center">
                        {activeDesign.palette.map((color, idx) => (
                          <div
                            key={idx}
                            className="w-5 h-5 rounded-full border border-border"
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center border-t border-border pt-3">
                      <span className="text-[10px] text-muted font-semibold uppercase">Est. Budget</span>
                      <strong className="text-sm font-bold text-success">{activeDesign.budget}</strong>
                    </div>
                  </div>

                  {/* Furniture Recommendations card */}
                  <div className="glass-panel p-5 rounded-xl space-y-3">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-wider">Catalog Matches</span>
                    <div className="space-y-2">
                      {activeDesign.furniture.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center bg-background/40 border border-border p-2 rounded-lg text-xs">
                          <span className="text-white font-medium">{item.name}</span>
                          <span className="text-primary font-bold">{item.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Decor suggestions card */}
                  <div className="glass-panel p-5 rounded-xl space-y-2">
                    <span className="text-[10px] font-bold text-secondary uppercase tracking-wider">Accent Decor</span>
                    <ul className="space-y-1.5 list-disc pl-4 text-xs text-muted">
                      {activeDesign.decor.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>

                </div>

                {/* AI Room Diagnosis Details */}
                {roomAnalysis && (
                  <div className="glass-panel p-5 rounded-xl space-y-4">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-wider block">AI Room Diagnosis</span>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Lighting */}
                      <div className="bg-background/40 border border-border p-3 rounded-lg space-y-1">
                        <span className="text-[9px] font-bold text-muted uppercase tracking-wider">Lighting Profile</span>
                        <div className="text-xs text-white font-bold capitalize">
                          {roomAnalysis.lighting_analysis?.classification?.replace('_', ' ') || 'Unknown'}
                        </div>
                        {roomAnalysis.lighting_analysis?.brightness && (
                          <div className="text-[10px] text-muted">
                            Brightness: {parseFloat(roomAnalysis.lighting_analysis.brightness).toFixed(1)} lx
                          </div>
                        )}
                      </div>

                      {/* Objects Detected */}
                      <div className="bg-background/40 border border-border p-3 rounded-lg space-y-1">
                        <span className="text-[9px] font-bold text-muted uppercase tracking-wider">Objects Scanned</span>
                        <div className="text-[10px] text-white font-semibold line-clamp-2 leading-relaxed">
                          {roomAnalysis.detected_objects?.objects?.join(', ') || 'None'}
                        </div>
                      </div>
                    </div>

                    {/* Color Palette */}
                    {roomAnalysis.color_analysis?.dominant_colors && (
                      <div className="space-y-2">
                        <span className="text-[9px] font-bold text-muted uppercase tracking-wider block">Dominant Surface Colors</span>
                        <div className="flex flex-wrap gap-2">
                          {roomAnalysis.color_analysis.dominant_colors.map((color, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-1.5 bg-background/50 border border-border py-1 px-2.5 rounded-lg text-[10px]"
                            >
                              <div
                                className="w-3.5 h-3.5 rounded border border-border/40"
                                style={{ backgroundColor: color.hex }}
                              />
                              <span className="text-white font-mono uppercase">{color.hex}</span>
                              <span className="text-muted font-bold">({Math.round(color.percentage)}%)</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* AI Explanation details banner */}
                <div className="glass-panel p-5 rounded-xl border border-border relative overflow-hidden bg-gradient-to-r from-zinc-900 to-primary/5">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-wider">AI Copilot Analysis</span>
                  <p className="text-xs text-text mt-2 leading-relaxed">{activeDesign.explanation}</p>
                </div>

              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

export default DesignStudioPage;
