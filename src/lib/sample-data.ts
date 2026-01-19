import { Artwork, Artist, SiteSettings, Exhibition, Award } from '@/types';
import EtherealLandscapes from '../../public/images/artworks/landscapes.jpg';
import UrbanReflections from '../../public/images/artworks/urban-reflections.jpg';
import AbstractEmotions from '../../public/images/artworks/abstract-emotions.jpg';
import BotanicalStudies from '../../public/images/artworks/botanical-studies.jpg';
import CosmicDance from '../../public/images/artworks/cosmic-dance.jpg';
import MinimalistSerenity from '../../public/images/artworks/minimalist-serenity.jpg';
import ArtistPortrait from '../../public/images/artist/artist-portrait.jpg.png';


// Sample artwork data
export const sampleArtworks: Artwork[] = [
  {
    id: '1',
    title: 'Bayou Sunrise Pendant',
    slug: 'bayou-sunrise-pendant',
    image: EtherealLandscapes,
    images: [
      EtherealLandscapes
    ],
    medium: 'Cloisonné enamel on copper with sterling silver',
    year: 2025,
    dimensions: '2" x 1.5"',
    price: 285,
    description: 'Inspired by the golden light breaking over Louisiana\'s wetlands, this cloisonné pendant captures the warmth and mystery of a bayou morning. Fine silver wire forms the delicate landscape, filled with layers of vitreous enamel fired multiple times to achieve luminous depth. Each piece is unique—no two sunrises are ever the same.',
    category: 'Enamels',
    featured: true,
    available: true,
    width: 800,
    height: 1000
  },
  {
    id: '2',
    title: 'French Quarter Vessel',
    slug: 'french-quarter-vessel',
    image: UrbanReflections,
    medium: 'Stoneware with iron oxide glaze',
    year: 2025,
    dimensions: '10" H x 6" W',
    price: 175,
    description: 'Wheel-thrown stoneware inspired by the wrought iron balconies of the French Quarter. The iron oxide glaze creates rich, earthy tones that shift from rust to deep brown depending on the light. Functional as a vase or beautiful as a standalone sculptural piece.',
    category: 'Ceramics',
    featured: true,
    available: true,
    width: 800,
    height: 1200
  },
  {
    id: '3',
    title: 'Crescent City Journal Cover',
    slug: 'crescent-city-journal-cover',
    image: AbstractEmotions,
    medium: 'Hand-tooled vegetable-tanned leather',
    year: 2025,
    dimensions: '6" x 8" (fits A5 notebook)',
    price: 145,
    description: 'Hand-carved floral motifs reminiscent of New Orleans\' lush gardens adorn this refillable journal cover. The vegetable-tanned leather will develop a rich patina over years of use, becoming more beautiful with age. Includes snap closure and pen loop.',
    category: 'Leatherwork',
    featured: false,
    available: true,
    width: 1000,
    height: 800
  },
  {
    id: '4',
    title: 'Jazz & Magnolias',
    slug: 'jazz-and-magnolias',
    image: BotanicalStudies,
    medium: 'Acrylic and gold leaf on canvas',
    year: 2024,
    dimensions: '24" x 36"',
    price: 850,
    description: 'An abstract celebration of New Orleans\' spirit—the movement of music meeting the stillness of Southern gardens. Layers of deep greens and warm golds build depth, while genuine gold leaf catches the light like notes hanging in humid air. This piece brings life to any room.',
    category: 'Paintings',
    featured: true,
    available: true,
    width: 600,
    height: 800
  },
  {
    id: '5',
    title: 'Heirloom Table Runner',
    slug: 'heirloom-table-runner',
    image: CosmicDance,
    medium: 'Hand-dyed linen with embroidered details',
    year: 2025,
    dimensions: '14" x 72"',
    price: 225,
    description: 'Natural linen hand-dyed with indigo and walnut creates a gradient reminiscent of twilight over the Mississippi. Delicate hand-embroidered botanical motifs trace the edges. Machine washable, made to be used and loved for generations.',
    category: 'Textiles',
    featured: false,
    available: true,
    width: 900,
    height: 1200
  },
  {
    id: '6',
    title: 'Garden District Cuff',
    slug: 'garden-district-cuff',
    image: MinimalistSerenity,
    medium: 'Champlevé enamel on copper with brass',
    year: 2024,
    dimensions: '1.5" W, adjustable',
    price: 320,
    description: 'The ornate ironwork of Garden District gates inspired this bold cuff bracelet. Champlevé technique creates recessed cells filled with jewel-toned vitreous enamel, fired at over 1400°F to create glass-like permanence. A wearable piece of New Orleans history.',
    category: 'Enamels',
    featured: true,
    available: true,
    width: 800,
    height: 600
  }
];

// Artist information
export const artistInfo: Artist = {
  name: 'Jennifer Watkins',
  bio: 'Jennifer Watkins is a New Orleans-based mixed media artist whose work spans an extraordinary range of traditional crafts and contemporary expression. From the ancient art of enameling on copper to hand-stitched textile sculptures, her pieces celebrate the beauty found in mastering diverse materials and techniques.\n\nRooted in the rich cultural traditions of Louisiana, Jennifer draws inspiration from the vibrant colors of the French Quarter, the organic textures of the bayou, and the enduring spirit of craftsmanship passed down through generations. Her studio practice moves fluidly between the potter\'s wheel, the leather bench, the kiln, and the canvas—each medium informing the others.\n\nWith work held in private collections across the Gulf South and beyond, Jennifer is known for creating functional art objects and decorative pieces that bring warmth, texture, and soul into everyday spaces. She teaches workshops in enameling and ceramics, sharing her passion for handmade artistry with the next generation of makers.',
  image: ArtistPortrait,
  statement: 'I believe the hand that makes something leaves a piece of the soul within it. Whether I\'m firing enamel onto copper, shaping clay on the wheel, or stitching leather by hand, I\'m drawn to the alchemy of transforming raw materials into objects that carry meaning and purpose. My work is an invitation to slow down, to appreciate the handmade, and to reconnect with the timeless traditions of craft.',
  email: 'jen@theconchetta.com',
  phone: '(985) 302-XXXX',
  location: 'New Orleans, LA',
  website: 'https://theconchetta.com',
  socialMedia: {
    instagram: '@theconchetta',
    facebook: 'The Conchetta Studio',
    twitter: '@theconchetta'
  }
};

// Site settings
export const siteSettings: SiteSettings = {
  heroTitle: 'Jennifer Watkins',
  heroSubtitle: 'Mixed Media Artist',
  heroDescription: 'Handcrafted enamels, ceramics, leather goods, paintings, and textile art—created with intention in the heart of New Orleans.',
  ctaText: 'Explore the Studio',
  secondaryCtaText: 'Meet the Maker',
  artistStatement: 'Every piece I create is a conversation between fire, earth, and hand. I work across mediums—enamel, clay, leather, paint, and fiber—to craft objects that honor tradition while speaking to the present.',
  aboutDescription: 'Jennifer Watkins is a New Orleans-based mixed media artist working in enameling, ceramics, leatherwork, painting, and textile arts, creating handcrafted pieces that celebrate the beauty of traditional craftsmanship.',
  contactDescription: 'Whether you\'re looking for a custom piece, interested in workshop offerings, or simply want to connect about the craft—I\'d love to hear from you. Every conversation starts with a shared appreciation for the handmade.',
  seoTitle: 'Jennifer Watkins - Mixed Media Artist | New Orleans',
  seoDescription: 'New Orleans mixed media artist Jennifer Watkins creates handcrafted enamels, ceramics, leather goods, paintings, and textile art. Shop original works and commissions.',
  siteUrl: 'https://theconchetta.com'
};

// Sample exhibitions
export const sampleExhibitions: Exhibition[] = [
  {
    id: '1',
    title: 'Fire & Form: Works in Enamel and Clay',
    venue: 'The Ogden Museum of Southern Art',
    location: 'New Orleans, LA',
    startDate: '2025-09-15',
    endDate: '2025-11-30',
    description: 'A solo exhibition exploring the relationship between vitreous enamel and ceramic glazes—two ancient arts united by fire. Featuring over 30 works created specifically for this show.',
    type: 'solo',
    featured: true
  },
  {
    id: '2',
    title: 'Louisiana Craft Guild Annual Showcase',
    venue: 'New Orleans Jazz Museum',
    location: 'New Orleans, LA',
    startDate: '2024-05-01',
    endDate: '2024-06-15',
    description: 'Juried exhibition featuring the finest craft artists from across Louisiana. Selected works included a ceramic vessel collection and hand-tooled leather accessories.',
    type: 'group',
    featured: false
  },
  {
    id: '3',
    title: 'Makers Market at the Ace Hotel',
    venue: 'Ace Hotel New Orleans',
    location: 'New Orleans, LA',
    startDate: '2024-12-07',
    endDate: '2024-12-08',
    description: 'A curated marketplace featuring local artisans and makers. Showcased enameled jewelry, ceramic pieces, and hand-sewn textile works alongside 40 fellow artists.',
    type: 'group',
    featured: false
  }
];

// Sample awards
export const sampleAwards: Award[] = [
  {
    id: '1',
    title: 'Best in Show - Enamelwork',
    organization: 'Louisiana Crafts Guild',
    year: 2024,
    description: 'Awarded for the "Bayou Series" collection of cloisonné pendants at the annual juried exhibition.'
  },
  {
    id: '2',
    title: 'Artist Residency',
    organization: 'Penland School of Craft',
    year: 2023,
    description: 'Two-week summer residency focused on experimental enameling techniques with visiting master artists.'
  },
  {
    id: '3',
    title: 'Emerging Artist Grant',
    organization: 'Arts Council of New Orleans',
    year: 2022,
    description: 'Grant supporting the purchase of a larger kiln to expand ceramic and enamel production capacity.'
  }
];

// Featured artworks for homepage
export const featuredArtworks = sampleArtworks.filter(artwork => artwork.featured);

// Categories for filtering
export const artworkCategories = [
  'All',
  'Enamels',
  'Ceramics',
  'Leatherwork',
  'Paintings',
  'Textiles'
];

// Medium types
export const mediumTypes = [
  'All',
  'Cloisonné enamel on copper with sterling silver',
  'Champlevé enamel on copper with brass',
  'Stoneware with iron oxide glaze',
  'Hand-tooled vegetable-tanned leather',
  'Acrylic and gold leaf on canvas',
  'Hand-dyed linen with embroidered details'
];

// Year options for filtering
export const yearOptions = [
  'All',
  '2025',
  '2024',
  '2023',
  '2022',
  '2021',
  '2020'
];

// Sort options
export const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'title', label: 'Title A-Z' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' }
];
