import React, { useState } from 'react';
import { Star, Heart, BookmarkCheck, ArrowLeftRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../ui/button';

export const FurnitureCard = ({
  product,
  onBookNow,
  onAddToWishlist,
  onCompare,
  isWishlisted = false,
  isCompared = false,
  className = ''
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`glass-card overflow-hidden group flex flex-col justify-between h-full ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div>
        {/* Product Image and Overlay Tags */}
        <div className="relative aspect-[4/3] overflow-hidden bg-background">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Shadow Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-60" />

          {/* Top badges */}
          <div className="absolute top-3 left-3 right-3 flex justify-between items-center">
            <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 bg-surface/85 border border-border rounded-md backdrop-blur-sm text-primary">
              {product.style}
            </span>
            <div className="flex gap-1.5">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={(e) => { e.stopPropagation(); onAddToWishlist(product); }}
                className={`p-1.5 rounded-md backdrop-blur-sm border transition-colors ${
                  isWishlisted 
                    ? 'bg-red-500/10 border-red-500/20 text-red-500' 
                    : 'bg-background/85 border-border text-muted hover:text-primary'
                }`}
              >
                <Heart size={13} fill={isWishlisted ? 'currentColor' : 'none'} />
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={(e) => { e.stopPropagation(); onCompare(product); }}
                className={`p-1.5 rounded-md backdrop-blur-sm border transition-colors ${
                  isCompared 
                    ? 'bg-primary/10 border-primary/30 text-primary' 
                    : 'bg-background/85 border-border text-muted hover:text-primary'
                }`}
              >
                <ArrowLeftRight size={13} />
              </motion.button>
            </div>
          </div>

          {/* Price Label */}
          <div className="absolute bottom-3 right-3 bg-surface/90 border border-border rounded-lg px-2.5 py-1 text-xs font-bold text-white shadow-lg backdrop-blur-md">
            ${product.price}
          </div>
        </div>

        {/* Details Section */}
        <div className="p-4 flex flex-col space-y-2">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-semibold text-muted uppercase tracking-wider">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-xs font-bold text-amber-400">
              <Star size={12} fill="currentColor" />
              <span>{product.rating}</span>
            </div>
          </div>

          <h4 className="text-sm font-bold text-white tracking-tight line-clamp-1 group-hover:text-primary transition-colors">
            {product.name}
          </h4>

          <p className="text-xs text-muted line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>
      </div>

      {/* Action footer */}
      <div className="p-4 pt-0 border-t border-border mt-4 flex gap-2">
        <Button
          variant="glass"
          size="sm"
          className="flex-1 text-[11px]"
          onClick={() => alert(`Details:\nDimensions: ${product.dimensions}\nMaterials: ${product.materials}`)}
        >
          Details
        </Button>
        <Button
          variant="primary"
          size="sm"
          className="flex-1 text-[11px]"
          onClick={() => onBookNow(product)}
        >
          Book Now
        </Button>
      </div>
    </div>
  );
};

export default FurnitureCard;
