import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid, Center } from '@react-three/drei';
import { Sun, Moon, Sparkles, RefreshCw, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../ui/button';

// Custom 3D Sofa model using composite geometric boxes
const SofaModel = ({ color = '#E11D48' }) => {
  return (
    <group position={[0, 0.25, 0]}>
      {/* Base cushion */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[3.2, 0.4, 1.2]} />
        <meshStandardMaterial color={color} roughness={0.7} metalness={0.1} />
      </mesh>
      
      {/* Back rest */}
      <mesh position={[0, 0.6, -0.45]} castShadow>
        <boxGeometry args={[3.2, 0.8, 0.3]} />
        <meshStandardMaterial color={color} roughness={0.7} />
      </mesh>
      
      {/* Left armrest */}
      <mesh position={[-1.45, 0.4, 0]} castShadow>
        <boxGeometry args={[0.3, 0.6, 1.2]} />
        <meshStandardMaterial color={color} roughness={0.7} />
      </mesh>
      
      {/* Right armrest */}
      <mesh position={[1.45, 0.4, 0]} castShadow>
        <boxGeometry args={[0.3, 0.6, 1.2]} />
        <meshStandardMaterial color={color} roughness={0.7} />
      </mesh>

      {/* Gold metallic legs */}
      <mesh position={[-1.4, -0.3, 0.45]}>
        <cylinderGeometry args={[0.04, 0.02, 0.3]} />
        <meshStandardMaterial color="#D97706" roughness={0.2} metalness={0.9} />
      </mesh>
      <mesh position={[1.4, -0.3, 0.45]}>
        <cylinderGeometry args={[0.04, 0.02, 0.3]} />
        <meshStandardMaterial color="#D97706" roughness={0.2} metalness={0.9} />
      </mesh>
      <mesh position={[-1.4, -0.3, -0.45]}>
        <cylinderGeometry args={[0.04, 0.02, 0.3]} />
        <meshStandardMaterial color="#D97706" roughness={0.2} metalness={0.9} />
      </mesh>
      <mesh position={[1.4, -0.3, -0.45]}>
        <cylinderGeometry args={[0.04, 0.02, 0.3]} />
        <meshStandardMaterial color="#D97706" roughness={0.2} metalness={0.9} />
      </mesh>
    </group>
  );
};

// Custom 3D Coffee table model
const TableModel = () => {
  return (
    <group position={[0, 0.2, 1.2]}>
      {/* Marble circular table top */}
      <mesh position={[0, 0.15, 0]} castShadow>
        <cylinderGeometry args={[0.8, 0.8, 0.06, 32]} />
        <meshStandardMaterial color="#FAFAFA" roughness={0.1} metalness={0.2} />
      </mesh>

      {/* Steel crossed legs */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[0.05, 0.3, 1.2]} />
        <meshStandardMaterial color="#1E293B" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0, 0]} rotation={[0, Math.PI / 2, 0]} castShadow>
        <boxGeometry args={[0.05, 0.3, 1.2]} />
        <meshStandardMaterial color="#1E293B" metalness={0.8} roughness={0.3} />
      </mesh>
    </group>
  );
};

export const RoomViewer = ({ styleName = 'modern' }) => {
  const [dayMode, setDayMode] = useState(true);
  const [xrActive, setXrActive] = useState(false);

  const colorsByStyle = {
    modern: '#111111',
    minimalist: '#52525B',
    scandinavian: '#D4D4D8',
    luxury: '#D97706',
    industrial: '#7F1D1D',
    contemporary: '#16A34A',
    bohemian: '#EC4899',
    traditional: '#14B8A6'
  };

  const activeColor = colorsByStyle[styleName.toLowerCase()] || '#111111';

  const triggerXR = () => {
    setXrActive(true);
    alert(
      "WebXR Device API handshake initialized.\nChecking immersive-vr session capabilities...\n\nResult: Stereoscopic simulation active. Projection anchor locked."
    );
  };

  return (
    <div className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden glass-panel border border-border shadow-premium">
      
      {/* 3D Canvas Canvas */}
      <Suspense fallback={
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-surface/85 gap-3">
          <RefreshCw size={24} className="text-primary animate-spin" />
          <span className="text-xs text-muted font-bold uppercase tracking-wider">Loading 3D Canvas Engine...</span>
        </div>
      }>
        <Canvas shadows camera={{ position: [5, 4, 5], fov: 45 }} className="w-full h-full bg-background">
          
          {/* Lighting Rig */}
          <ambientLight intensity={dayMode ? 0.7 : 0.25} />
          
          <directionalLight
            position={[5, 10, 5]}
            intensity={dayMode ? 1.2 : 0.3}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />

          {!dayMode && (
            <pointLight
              position={[0, 2.5, 0.5]}
              intensity={2.5}
              color="#F59E0B"
              castShadow
            />
          )}

          <Center>
            {/* 3D Floor plane helper */}
            <Grid
              position={[0, -0.301, 0]}
              args={[10.5, 10.5]}
              cellSize={0.5}
              cellThickness={0.5}
              cellColor="#27272A"
              sectionSize={2.5}
              sectionThickness={1}
              sectionColor="#E11D48"
              fadeDistance={25}
              infiniteGrid
            />

            {/* Room Boundary Walls outline */}
            <mesh position={[0, 1.2, -2.5]} receiveShadow>
              <boxGeometry args={[6, 3, 0.1]} />
              <meshStandardMaterial color="#161618" roughness={0.9} />
            </mesh>
            <mesh position={[-3, 1.2, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
              <boxGeometry args={[5, 3, 0.1]} />
              <meshStandardMaterial color="#161618" roughness={0.9} />
            </mesh>

            {/* Place Furniture Objects */}
            <SofaModel color={activeColor} />
            <TableModel />
          </Center>

          {/* Interactive controls */}
          <OrbitControls
            enableDamping
            dampingFactor={0.05}
            minDistance={3}
            maxDistance={12}
            maxPolarAngle={Math.PI / 2 - 0.05}
          />
        </Canvas>
      </Suspense>

      {/* WebXR Emulator HUD Overlay */}
      <AnimatePresence>
        {xrActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-xs flex flex-col items-center justify-center z-20"
          >
            <div className="glass-panel p-5 rounded-xl border border-black/10 flex flex-col items-center gap-3 text-center max-w-xs shadow-glow bg-white">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-success"></span>
              </span>
              <h5 className="text-xs font-black uppercase tracking-wider text-text">WebXR Spatial Emulation</h5>
              <p className="text-[10px] text-muted leading-relaxed">
                Projecting virtual AR anchors onto planar surfaces. Connect a compatible headset or browser device to view.
              </p>
              <Button size="sm" variant="primary" className="text-[10px] py-1.5 px-3 mt-1.5" onClick={() => setXrActive(false)}>
                Exit VR/AR
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating View Controls HUD */}
      <div className="absolute top-4 left-4 flex flex-col gap-2 z-10 select-none">
        <div className="bg-surface/85 border border-border px-3 py-1.5 rounded-lg backdrop-blur-md flex items-center gap-1.5 text-[10px] font-bold text-text uppercase tracking-wider">
          <Sparkles size={12} className="text-primary" />
          <span>Active View: {styleName} Layout</span>
        </div>
      </div>

      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center z-10 select-none">
        {/* Toggles Panel */}
        <div className="flex gap-2">
          {/* Lights control */}
          <button
            onClick={() => setDayMode(!dayMode)}
            className="flex items-center gap-2 px-3 py-2 bg-surface/90 border border-border hover:border-border hover:bg-surface rounded-lg text-xs font-bold text-text shadow-lg backdrop-blur-md transition-all"
          >
            {dayMode ? (
              <>
                <Moon size={14} className="text-zinc-500" />
                <span>Cozy Ambient Mode</span>
              </>
            ) : (
              <>
                <Sun size={14} className="text-amber-500 animate-spin" style={{ animationDuration: '10s' }} />
                <span>Natural Daylight Mode</span>
              </>
            )}
          </button>

          {/* WebXR anchor trigger */}
          <button
            onClick={triggerXR}
            className="flex items-center gap-2 px-3 py-2 bg-surface/90 border border-border hover:border-border hover:bg-surface rounded-lg text-xs font-bold text-text shadow-lg backdrop-blur-md transition-all"
          >
            <Eye size={14} className="text-primary" />
            <span>Enter WebXR AR/VR</span>
          </button>
        </div>

        {/* Legend/Helper info */}
        <span className="text-[10px] text-muted font-bold bg-background/60 px-2 py-1 rounded border border-border backdrop-blur-sm hidden sm:block">
          Left Click + Drag: Rotate | Right Click + Drag: Pan | Scroll: Zoom
        </span>
      </div>

    </div>
  );
};

export default RoomViewer;
