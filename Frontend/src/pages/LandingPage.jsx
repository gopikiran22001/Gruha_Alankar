import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Camera, Layers, Activity, ShoppingBag, MessageSquare, ArrowRight, ShieldCheck, Zap, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../components/ui/button';

export const LandingPage = () => {
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  const features = [
    { title: 'Room Analysis', desc: 'Scan lighting levels, ceiling clearances, and spatial utilization metrics instantly.', icon: Activity },
    { title: 'AI Design Generation', desc: 'Instantly restyle rooms under Modern, Scandinavian, Industrial, or Luxury modes.', icon: Sparkles },
    { title: 'Live Camera Insights', desc: 'Point your webcam to scan physical items and calculate spacing errors in real-time.', icon: Camera },
    { title: 'Furniture Recommendations', desc: 'Browse catalog matches sized precisely to fit your room dimensions.', icon: ShoppingBag },
    { title: '3D Room Rendering', desc: 'Interact, zoom, and rotate furniture setups on a WebGL canvas before booking.', icon: Layers },
    { title: 'AI Buddy Copilot', desc: 'A global companion ready to answer questions, explain designs, and translate languages.', icon: MessageSquare }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      {/* Decorative Grid Pattern */}
      <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none" />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 md:px-8 max-w-6xl mx-auto flex flex-col items-center text-center space-y-6">
        
        {/* Glow Tagline */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-1.5 px-3 py-1 bg-primary/10 border border-border rounded-full text-xs font-bold text-primary uppercase tracking-widest"
        >
          <Sparkles size={12} className="animate-pulse" />
          <span>Agentic AI Interior Design</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight max-w-4xl text-gradient"
        >
          Transform Your Space <br />
          with <span className="text-gradient-purple">Agentic AI</span>
        </motion.h1>

        {/* Subhead */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-muted text-sm sm:text-lg max-w-2xl leading-relaxed"
        >
          Generate photo-realistic design layouts, identify spatial bottlenecks, and order custom catalog furniture in seconds. Built for next-gen spatial planning.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 items-center"
        >
          <Link to="/register">
            <Button size="lg" variant="primary" icon={<ArrowRight size={16} />}>
              Start Designing Free
            </Button>
          </Link>
          <Link to="/catalog">
            <Button size="lg" variant="glass">
              Browse Furniture
            </Button>
          </Link>
        </motion.div>

        {/* Floating preview cards mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full max-w-4xl mt-12 rounded-2xl overflow-hidden border border-border shadow-premium relative aspect-video"
        >
          <img
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&auto=format&fit=crop&q=80"
            alt="Dashboard Mockup"
            className="w-full h-full object-cover filter brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          
          {/* Mock Floating HUD overlay */}
          <div className="absolute top-4 left-4 glass-panel border border-border p-3 rounded-xl flex items-center gap-3 backdrop-blur-md">
            <div className="w-2.5 h-2.5 rounded-full bg-success animate-ping" />
            <span className="text-[10px] font-bold text-white uppercase tracking-wider">AI Engine Synchronized</span>
          </div>
        </motion.div>
      </section>

      {/* Feature Cards Grid */}
      <section className="max-w-6xl mx-auto py-16 px-4 md:px-8 border-t border-border">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">Platform Capabilities</h2>
          <p className="text-muted text-xs sm:text-sm">Every feature is connected directly to our global AI copilot, orchestrating spatial geometry, logistics, and rendering.</p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="glass-card p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="p-3 rounded-xl bg-primary/10 border border-border text-primary w-fit">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-sm font-bold text-white tracking-tight mt-4">{feat.title}</h3>
                  <p className="text-xs text-muted mt-2 leading-relaxed">{feat.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* Workflow Section */}
      <section className="max-w-6xl mx-auto py-16 px-4 md:px-8 border-t border-border bg-background/20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">How It Works</h2>
          <p className="text-muted text-xs sm:text-sm mt-2">Go from camera snapshot to finalized room delivery in 4 steps.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {[
            { step: '01', title: 'Capture Room', desc: 'Upload a wide photo or capture it directly using your laptop camera.', icon: Camera },
            { step: '02', title: 'Analyze Spatial Stats', desc: 'AI reviews lighting levels, room square footage, and spacing gaps.', icon: Activity },
            { step: '03', title: 'Restyle in 3D', desc: 'Select design styles and preview layout fits on an interactive canvas.', icon: Layers },
            { step: '04', title: 'Secure Checkout', desc: 'Order pieces directly from the catalog. Track logistics timelines.', icon: ShieldCheck }
          ].map((item, idx) => (
            <div key={idx} className="glass-card p-5 relative flex flex-col justify-between">
              <div>
                <span className="text-2xl font-black text-primary/20 absolute right-4 top-4">{item.step}</span>
                <h4 className="text-sm font-bold text-white tracking-tight mt-2">{item.title}</h4>
                <p className="text-xs text-muted mt-2 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Footer */}
      <section className="max-w-4xl mx-auto text-center py-20 px-4 space-y-6">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Ready to Elevate Your Home?</h2>
        <p className="text-muted text-sm max-w-lg mx-auto">
          Start collaborating with our Agentic AI Buddy to sketch, configure, and purchase your ideal interior.
        </p>
        <Link to="/register" className="inline-block">
          <Button variant="primary" size="lg" icon={<ArrowRight size={16} />}>
            Create Free Account
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4 text-center text-xs text-muted max-w-6xl mx-auto">
        <div className="flex justify-between items-center flex-col sm:flex-row gap-4">
          <div className="flex items-center gap-1.5">
            <Sparkles size={14} className="text-primary" />
            <span className="font-bold text-white tracking-wider uppercase">Gruha Alankara</span>
          </div>
          <span>&copy; {new Date().getFullYear()} Gruha Alankara. All Rights Reserved.</span>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
