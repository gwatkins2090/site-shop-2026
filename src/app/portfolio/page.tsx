'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail } from 'lucide-react';
import { sampleArtworks, artworkCategories, categoryDescriptions } from '@/lib/sample-data';
import { Artwork } from '@/types';

// Grid size configuration (12-column grid)
const sizeConfig = {
  featured: { colSpan: 'col-span-12 md:col-span-8', aspect: 'aspect-[16/10]' },
  large: { colSpan: 'col-span-12 md:col-span-6', aspect: 'aspect-[4/3]' },
  medium: { colSpan: 'col-span-6 md:col-span-4', aspect: 'aspect-square' },
  small: { colSpan: 'col-span-6 md:col-span-3', aspect: 'aspect-[3/4]' },
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const filterVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

// Lightbox Component
function Lightbox({ artwork, onClose }: { artwork: Artwork; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-8"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative w-full max-w-6xl max-h-[90vh] bg-warm-white dark:bg-off-black rounded-lg overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 dark:bg-black/90 hover:bg-white dark:hover:bg-black transition-colors"
          aria-label="Close lightbox"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col md:flex-row h-full max-h-[90vh]">
          {/* Image Panel */}
          <div className="relative w-full md:w-2/3 h-64 md:h-auto min-h-[300px] md:min-h-[500px] bg-muted">
            <Image
              src={typeof artwork.image === 'string' ? artwork.image : artwork.image.src}
              alt={artwork.title}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 66vw"
              priority
            />
          </div>

          {/* Details Panel */}
          <div className="w-full md:w-1/3 p-6 md:p-8 overflow-y-auto">
            <div className="space-y-4">
              {/* Category Badge */}
              <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase bg-gallery-gold/10 text-gallery-gold rounded-full">
                {artwork.category}
              </span>

              {/* Title */}
              <h2 className="text-2xl md:text-3xl font-serif font-light text-foreground">
                {artwork.title}
              </h2>

              {/* Medium & Year */}
              <p className="text-sm text-muted-foreground">
                {artwork.medium}
              </p>
              <p className="text-sm text-muted-foreground">
                {artwork.year} · {artwork.dimensions}
              </p>

              {/* Description */}
              {artwork.description && (
                <p className="text-base text-muted-foreground leading-relaxed pt-4 border-t border-border">
                  {artwork.description}
                </p>
              )}

              {/* Inquire Button */}
              <div className="pt-6">
                <a
                  href={`mailto:jen@theconchetta.com?subject=Inquiry: ${artwork.title}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gallery-gold hover:bg-gallery-gold/90 text-off-black font-medium rounded-lg transition-all duration-200 hover:shadow-lg"
                >
                  <Mail className="w-4 h-4" />
                  Inquire About This Piece
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Portfolio Item Component
function PortfolioItem({ artwork, onClick }: { artwork: Artwork; onClick: () => void }) {
  const size = artwork.size || 'medium';
  const config = sizeConfig[size];

  return (
    <motion.div
      variants={itemVariants}
      className={`${config.colSpan} group cursor-pointer`}
      onClick={onClick}
    >
      <div className={`relative ${config.aspect} overflow-hidden rounded-lg bg-muted`}>
        {/* Image */}
        <Image
          src={typeof artwork.image === 'string' ? artwork.image : artwork.image.src}
          alt={artwork.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes={
            size === 'featured' ? '(max-width: 768px) 100vw, 66vw' :
            size === 'large' ? '(max-width: 768px) 100vw, 50vw' :
            size === 'medium' ? '(max-width: 768px) 50vw, 33vw' :
            '(max-width: 768px) 50vw, 25vw'
          }
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Content Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
          {/* Category Badge */}
          <span className="inline-block px-2 py-0.5 mb-2 text-[10px] font-medium tracking-wider uppercase text-white/90 bg-white/20 backdrop-blur-sm rounded">
            {artwork.category}
          </span>

          {/* Title */}
          <h3 className="text-lg md:text-xl font-serif font-light text-white mb-1">
            {artwork.title}
          </h3>

          {/* Description (truncated) */}
          {artwork.description && (
            <p className="text-sm text-white/80 line-clamp-2 hidden md:block">
              {artwork.description}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// Main Portfolio Page
export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);

  const filteredArtworks = useMemo(() => {
    if (activeCategory === 'All') {
      return sampleArtworks;
    }
    return sampleArtworks.filter(artwork => artwork.category === activeCategory);
  }, [activeCategory]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Page Header */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light mb-4">
              Portfolio
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A curated collection of handcrafted works
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sticky Filter Bar */}
      <div className="sticky top-16 z-40 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4">
          {/* Category Pills */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {artworkCategories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-gallery-gold text-off-black shadow-md'
                    : 'bg-muted hover:bg-muted/80 text-foreground'
                }`}
              >
                {category === 'All' ? 'All Works' : category}
              </button>
            ))}
          </div>

          {/* Category Description */}
          <AnimatePresence mode="wait">
            <motion.p
              key={activeCategory}
              variants={filterVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="text-center text-sm text-muted-foreground mt-4 max-w-2xl mx-auto"
            >
              {categoryDescriptions[activeCategory]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      {/* Masonry Grid */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="grid grid-cols-12 gap-3 md:gap-4 auto-rows-auto"
              style={{ gridAutoFlow: 'dense' }}
            >
              {filteredArtworks.map((artwork) => (
                <PortfolioItem
                  key={artwork.id}
                  artwork={artwork}
                  onClick={() => setSelectedArtwork(artwork)}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty State */}
          {filteredArtworks.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <h3 className="text-xl font-medium mb-2">No artworks found</h3>
              <p className="text-muted-foreground">
                No pieces available in this category yet.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Results Count */}
      <section className="py-8 border-t">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            Showing {filteredArtworks.length} of {sampleArtworks.length} works
          </p>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedArtwork && (
          <Lightbox
            artwork={selectedArtwork}
            onClose={() => setSelectedArtwork(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
