import { Artwork, Artist, SiteSettings, Exhibition, Award } from '@/types';
import ArtistPortrait from '../../public/images/artist/artist-portrait.jpg.png';

// Portfolio artwork data with Unsplash placeholder images
export const sampleArtworks: Artwork[] = [
  // ENAMELS
  {
    id: '1',
    title: 'Bayou Sunrise Pendant',
    slug: 'bayou-sunrise-pendant',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80',
    images: ['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1600&q=90'],
    medium: 'Cloisonné enamel on copper with sterling silver',
    year: 2025,
    dimensions: '2" x 1.5"',
    price: 285,
    description: 'Inspired by the golden light breaking over Louisiana\'s wetlands, this cloisonné pendant captures the warmth and mystery of a bayou morning. Fine silver wire forms the delicate landscape, filled with layers of vitreous enamel fired multiple times to achieve luminous depth.',
    category: 'Enamels',
    featured: true,
    available: true,
    width: 800,
    height: 1000,
    size: 'featured'
  },
  {
    id: '2',
    title: 'Garden District Cuff',
    slug: 'garden-district-cuff',
    image: 'https://images.unsplash.com/photo-1603561596112-0a132b757442?w=800&q=80',
    medium: 'Champlevé enamel on copper with brass',
    year: 2024,
    dimensions: '1.5" W, adjustable',
    price: 320,
    description: 'The ornate ironwork of Garden District gates inspired this bold cuff bracelet. Champlevé technique creates recessed cells filled with jewel-toned vitreous enamel, fired at over 1400°F to create glass-like permanence.',
    category: 'Enamels',
    featured: true,
    available: true,
    width: 800,
    height: 600,
    size: 'large'
  },
  {
    id: '3',
    title: 'Metalwork Brooch',
    slug: 'metalwork-brooch',
    image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&q=80',
    medium: 'Enamel on copper with silver findings',
    year: 2024,
    dimensions: '1.25" diameter',
    price: 195,
    description: 'A contemporary take on traditional enameling, featuring geometric patterns that catch and reflect light. Each piece requires multiple firings to achieve the depth of color.',
    category: 'Enamels',
    featured: false,
    available: true,
    width: 800,
    height: 800,
    size: 'small'
  },
  {
    id: '4',
    title: 'Magnolia Pendant',
    slug: 'magnolia-pendant',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80',
    medium: 'Cloisonné enamel on fine silver',
    year: 2025,
    dimensions: '1.75" x 1.25"',
    price: 265,
    description: 'The Louisiana state flower rendered in luminous enamel, with delicate silver wire forming each petal. A wearable tribute to Southern beauty.',
    category: 'Enamels',
    featured: false,
    available: true,
    width: 800,
    height: 1000,
    size: 'medium'
  },
  {
    id: '5',
    title: 'Crescent Moon Earrings',
    slug: 'crescent-moon-earrings',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80',
    medium: 'Enamel on copper with gold-filled hooks',
    year: 2025,
    dimensions: '1.5" drop',
    price: 145,
    description: 'Delicate crescent shapes filled with midnight blue enamel, reminiscent of New Orleans evenings. Lightweight and elegant for everyday wear.',
    category: 'Enamels',
    featured: false,
    available: true,
    width: 800,
    height: 1000,
    size: 'small'
  },

  // CERAMICS
  {
    id: '6',
    title: 'French Quarter Vessel',
    slug: 'french-quarter-vessel',
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80',
    images: ['https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1600&q=90'],
    medium: 'Stoneware with iron oxide glaze',
    year: 2025,
    dimensions: '10" H x 6" W',
    price: 175,
    description: 'Wheel-thrown stoneware inspired by the wrought iron balconies of the French Quarter. The iron oxide glaze creates rich, earthy tones that shift from rust to deep brown depending on the light.',
    category: 'Ceramics',
    featured: true,
    available: true,
    width: 800,
    height: 1200,
    size: 'large'
  },
  {
    id: '7',
    title: 'Glazed Stoneware Bowl',
    slug: 'glazed-stoneware-bowl',
    image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&q=80',
    medium: 'High-fire stoneware with ash glaze',
    year: 2024,
    dimensions: '4" H x 8" W',
    price: 125,
    description: 'A functional serving bowl with organic ash glaze that pools beautifully in the interior. Each firing produces unique results.',
    category: 'Ceramics',
    featured: false,
    available: true,
    width: 800,
    height: 800,
    size: 'medium'
  },
  {
    id: '8',
    title: 'Artisan Mug Set',
    slug: 'artisan-mug-set',
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&q=80',
    medium: 'Stoneware with celadon glaze',
    year: 2025,
    dimensions: '4" H x 3.5" W each',
    price: 85,
    description: 'Set of two hand-thrown mugs perfect for morning coffee or evening tea. The celadon glaze brings a quiet elegance to everyday rituals.',
    category: 'Ceramics',
    featured: false,
    available: true,
    width: 800,
    height: 800,
    size: 'small'
  },
  {
    id: '9',
    title: 'Sculptural Vase Collection',
    slug: 'sculptural-vase-collection',
    image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&q=80',
    medium: 'Porcelain with layered glazes',
    year: 2024,
    dimensions: 'Various sizes, 6"-12" H',
    price: 450,
    description: 'A trio of hand-built vases exploring form and negative space. The layered glazes create depth and movement across the surfaces.',
    category: 'Ceramics',
    featured: true,
    available: true,
    width: 800,
    height: 1000,
    size: 'featured'
  },
  {
    id: '10',
    title: 'Raku Tea Bowl',
    slug: 'raku-tea-bowl',
    image: 'https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?w=800&q=80',
    medium: 'Raku-fired stoneware',
    year: 2024,
    dimensions: '3.5" H x 5" W',
    price: 165,
    description: 'Traditional Japanese-inspired tea bowl created using the dramatic raku firing process. Metallic lusters and crackling patterns emerge from the flames.',
    category: 'Ceramics',
    featured: false,
    available: true,
    width: 800,
    height: 800,
    size: 'medium'
  },
  {
    id: '11',
    title: 'Earth-Toned Nesting Bowls',
    slug: 'earth-toned-nesting-bowls',
    image: 'https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?w=800&q=80',
    medium: 'Stoneware with natural glazes',
    year: 2025,
    dimensions: 'Set of 3, 4"-8" W',
    price: 195,
    description: 'Functional nesting bowls in warm, natural tones. Perfect for serving or display, these pieces bring organic warmth to any table.',
    category: 'Ceramics',
    featured: false,
    available: true,
    width: 800,
    height: 800,
    size: 'small'
  },

  // LEATHERWORK
  {
    id: '12',
    title: 'Crescent City Journal Cover',
    slug: 'crescent-city-journal-cover',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&q=80',
    medium: 'Hand-tooled vegetable-tanned leather',
    year: 2025,
    dimensions: '6" x 8" (fits A5 notebook)',
    price: 145,
    description: 'Hand-carved floral motifs reminiscent of New Orleans\' lush gardens adorn this refillable journal cover. The vegetable-tanned leather will develop a rich patina over years of use.',
    category: 'Leatherwork',
    featured: false,
    available: true,
    width: 1000,
    height: 800,
    size: 'large'
  },
  {
    id: '13',
    title: 'Artisan Tote Bag',
    slug: 'artisan-tote-bag',
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80',
    medium: 'Full-grain vegetable-tanned leather',
    year: 2024,
    dimensions: '14" W x 12" H x 4" D',
    price: 385,
    description: 'A timeless tote crafted from premium vegetable-tanned leather. Hand-stitched with waxed thread for durability that will last generations.',
    category: 'Leatherwork',
    featured: true,
    available: true,
    width: 800,
    height: 1000,
    size: 'featured'
  },
  {
    id: '14',
    title: 'Bifold Wallet',
    slug: 'bifold-wallet',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80',
    medium: 'Bridle leather with brass hardware',
    year: 2025,
    dimensions: '4.5" x 3.5" folded',
    price: 125,
    description: 'Classic bifold design with six card slots and a bill compartment. The bridle leather is renowned for its durability and beautiful aging.',
    category: 'Leatherwork',
    featured: false,
    available: true,
    width: 800,
    height: 800,
    size: 'small'
  },
  {
    id: '15',
    title: 'Hand-Stitched Belt',
    slug: 'hand-stitched-belt',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
    medium: 'Harness leather with solid brass buckle',
    year: 2024,
    dimensions: '1.5" W, custom length',
    price: 165,
    description: 'Each belt is cut from a single piece of premium harness leather and hand-stitched with a saddle stitch that will never unravel.',
    category: 'Leatherwork',
    featured: false,
    available: true,
    width: 800,
    height: 600,
    size: 'medium'
  },
  {
    id: '16',
    title: 'Leather Catch-All Tray',
    slug: 'leather-catch-all-tray',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80',
    medium: 'Vegetable-tanned leather',
    year: 2025,
    dimensions: '6" x 6" x 2"',
    price: 75,
    description: 'A practical valet tray for keys, change, and everyday carry. The corners are secured with brass rivets for a clean, minimal aesthetic.',
    category: 'Leatherwork',
    featured: false,
    available: true,
    width: 800,
    height: 800,
    size: 'small'
  },

  // PAINTINGS
  {
    id: '17',
    title: 'Jazz & Magnolias',
    slug: 'jazz-and-magnolias',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80',
    images: ['https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1600&q=90'],
    medium: 'Acrylic and gold leaf on canvas',
    year: 2024,
    dimensions: '24" x 36"',
    price: 850,
    description: 'An abstract celebration of New Orleans\' spirit—the movement of music meeting the stillness of Southern gardens. Layers of deep greens and warm golds build depth.',
    category: 'Paintings',
    featured: true,
    available: true,
    width: 600,
    height: 800,
    size: 'featured'
  },
  {
    id: '18',
    title: 'Impressionist Landscape',
    slug: 'impressionist-landscape',
    image: 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=800&q=80',
    medium: 'Oil on linen',
    year: 2024,
    dimensions: '18" x 24"',
    price: 625,
    description: 'Soft, luminous brushwork captures the atmospheric quality of Louisiana\'s wetlands at golden hour. Painted en plein air over multiple sessions.',
    category: 'Paintings',
    featured: false,
    available: true,
    width: 800,
    height: 600,
    size: 'large'
  },
  {
    id: '19',
    title: 'Textural Study I',
    slug: 'textural-study-i',
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&q=80',
    medium: 'Mixed media on panel',
    year: 2025,
    dimensions: '12" x 12"',
    price: 425,
    description: 'Exploring the boundaries between painting and sculpture, this piece features thick impasto and embedded materials that create shadow and depth.',
    category: 'Paintings',
    featured: false,
    available: true,
    width: 800,
    height: 800,
    size: 'medium'
  },
  {
    id: '20',
    title: 'Abstract Botanicals',
    slug: 'abstract-botanicals',
    image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&q=80',
    medium: 'Acrylic on canvas',
    year: 2024,
    dimensions: '30" x 40"',
    price: 975,
    description: 'Large-scale abstract work inspired by the wild gardens of the Garden District. Bold gestural marks in verdant greens and earthy tones.',
    category: 'Paintings',
    featured: true,
    available: true,
    width: 800,
    height: 1000,
    size: 'large'
  },
  {
    id: '21',
    title: 'Contemporary Color Study',
    slug: 'contemporary-color-study',
    image: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800&q=80',
    medium: 'Oil on canvas',
    year: 2025,
    dimensions: '16" x 20"',
    price: 550,
    description: 'An exploration of color relationships and emotional resonance. Subtle shifts in hue create a meditative viewing experience.',
    category: 'Paintings',
    featured: false,
    available: true,
    width: 800,
    height: 1000,
    size: 'small'
  },
  {
    id: '22',
    title: 'Waterfront at Dusk',
    slug: 'waterfront-at-dusk',
    image: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800&q=80',
    medium: 'Oil on linen',
    year: 2024,
    dimensions: '20" x 30"',
    price: 725,
    description: 'The Mississippi River at twilight, captured in rich purples and warm oranges. The water reflects the dying light of another New Orleans evening.',
    category: 'Paintings',
    featured: false,
    available: true,
    width: 800,
    height: 600,
    size: 'medium'
  },

  // TEXTILES
  {
    id: '23',
    title: 'Heirloom Table Runner',
    slug: 'heirloom-table-runner',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=90'],
    medium: 'Hand-dyed linen with embroidered details',
    year: 2025,
    dimensions: '14" x 72"',
    price: 225,
    description: 'Natural linen hand-dyed with indigo and walnut creates a gradient reminiscent of twilight over the Mississippi. Delicate hand-embroidered botanical motifs trace the edges.',
    category: 'Textiles',
    featured: true,
    available: true,
    width: 900,
    height: 1200,
    size: 'large'
  },
  {
    id: '24',
    title: 'Indigo Shibori Wall Hanging',
    slug: 'indigo-shibori-wall-hanging',
    image: 'https://images.unsplash.com/photo-1606722590583-6951b5ea92ad?w=800&q=80',
    medium: 'Natural indigo dye on cotton',
    year: 2024,
    dimensions: '36" x 48"',
    price: 385,
    description: 'Traditional Japanese shibori technique meets Louisiana indigo heritage. Each fold and tie creates organic patterns that are never repeated.',
    category: 'Textiles',
    featured: true,
    available: true,
    width: 800,
    height: 1000,
    size: 'featured'
  },
  {
    id: '25',
    title: 'Woven Wall Tapestry',
    slug: 'woven-wall-tapestry',
    image: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=800&q=80',
    medium: 'Handwoven wool and cotton',
    year: 2025,
    dimensions: '24" x 36"',
    price: 525,
    description: 'A contemporary tapestry woven on a floor loom, featuring abstract geometric patterns in earthy neutrals with pops of terracotta.',
    category: 'Textiles',
    featured: false,
    available: true,
    width: 800,
    height: 1200,
    size: 'large'
  },
  {
    id: '26',
    title: 'Hand-Embroidered Pillow',
    slug: 'hand-embroidered-pillow',
    image: 'https://images.unsplash.com/photo-1603513492128-ba7bc9b3e143?w=800&q=80',
    medium: 'Linen with cotton embroidery',
    year: 2024,
    dimensions: '18" x 18"',
    price: 145,
    description: 'Botanical embroidery inspired by Louisiana wildflowers adorns this throw pillow. Each stitch is placed by hand over many hours of meditative work.',
    category: 'Textiles',
    featured: false,
    available: true,
    width: 800,
    height: 800,
    size: 'medium'
  },
  {
    id: '27',
    title: 'Macramé Plant Hanger',
    slug: 'macrame-plant-hanger',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80',
    medium: 'Natural cotton cord',
    year: 2025,
    dimensions: '42" L, fits 6" pot',
    price: 65,
    description: 'Modern macramé design with clean lines and organic texture. Perfect for displaying trailing plants or ceramic vessels.',
    category: 'Textiles',
    featured: false,
    available: true,
    width: 800,
    height: 1200,
    size: 'small'
  },
  {
    id: '28',
    title: 'Naturally Dyed Yarn Collection',
    slug: 'naturally-dyed-yarn-collection',
    image: 'https://images.unsplash.com/photo-1590845947698-8924d7409b56?w=800&q=80',
    medium: 'Wool dyed with botanical extracts',
    year: 2025,
    dimensions: 'Set of 5 skeins, 100g each',
    price: 125,
    description: 'Hand-dyed with locally foraged plants—indigo, marigold, avocado, and walnut create a harmonious palette for fiber artists.',
    category: 'Textiles',
    featured: false,
    available: true,
    width: 800,
    height: 800,
    size: 'small'
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

// Categories for filtering with descriptions
export const artworkCategories = [
  'All',
  'Enamels',
  'Ceramics',
  'Leatherwork',
  'Paintings',
  'Textiles'
];

// Category descriptions for portfolio page
export const categoryDescriptions: Record<string, string> = {
  'All': 'A curated collection of handcrafted works spanning five distinct disciplines, each piece created with intention and care.',
  'Enamels': 'Ancient vitreous enamel techniques—cloisonné and champlevé—transformed into contemporary wearable art. Each piece is fired multiple times at over 1400°F.',
  'Ceramics': 'Wheel-thrown and hand-built stoneware and porcelain, finished with natural glazes developed in-house. Functional art for everyday rituals.',
  'Leatherwork': 'Hand-tooled and hand-stitched leather goods crafted from premium vegetable-tanned hides. Built to develop character over a lifetime of use.',
  'Paintings': 'Oil and acrylic works on canvas and panel, exploring the intersection of Southern landscape, abstract expression, and material exploration.',
  'Textiles': 'Hand-woven, naturally dyed, and embroidered fiber art celebrating traditional techniques and the meditative process of working with thread.'
};

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
