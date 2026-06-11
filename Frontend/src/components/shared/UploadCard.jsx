import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, X, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export const UploadCard = ({ onFileSelected, previewImage, onClear, className = '' }) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      processFile(file);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      processFile(file);
    }
  };

  const processFile = (file) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (PNG, JPG, WEBP).');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      onFileSelected(e.target.result, file);
    };
    reader.readAsDataURL(file);
  };

  const onButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className={`w-full ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept="image/*"
        onChange={handleChange}
      />

      {previewImage ? (
        // Preview State
        <div className="relative rounded-xl overflow-hidden border border-border glass-panel group aspect-video flex items-center justify-center">
          <img
            src={previewImage}
            alt="Room Preview"
            className="w-full h-full object-cover rounded-xl"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClear}
              className="p-3 bg-red-500 hover:bg-red-600 rounded-full text-white shadow-lg focus:outline-none"
            >
              <X size={20} />
            </motion.button>
          </div>
          <div className="absolute bottom-3 left-3 bg-surface/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-border flex items-center gap-1.5 text-xs font-semibold text-white">
            <ImageIcon size={14} className="text-primary" />
            <span>Room Snapshot Loaded</span>
          </div>
        </div>
      ) : (
        // Upload State
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={onButtonClick}
          className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-300 aspect-video glass-panel ${
            isDragActive
              ? 'border-primary bg-zinc-800 shadow-glow scale-102'
              : 'border-border hover:border-primary/45 hover:bg-surface/40'
          }`}
        >
          <div className="p-4 rounded-full bg-surface/85 border border-border text-muted group-hover:text-primary transition-colors">
            <Upload size={24} className={isDragActive ? 'text-primary' : ''} />
          </div>
          
          <div className="text-center">
            <p className="text-sm font-semibold text-white">
              Drag & drop your room photo
            </p>
            <p className="text-xs text-muted mt-1">
              or click to browse from system files
            </p>
          </div>

          <div className="flex items-center gap-2 mt-4 text-[10px] text-muted bg-zinc-800 px-3 py-1.5 rounded-lg border border-border">
            <AlertCircle size={12} className="text-primary" />
            <span>Supports JPG, PNG, WEBP files up to 10MB</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadCard;
