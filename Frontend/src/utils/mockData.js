// Premium Mock Data for Gruha Alankara Platform

export const DESIGN_STYLES = [
  { id: 'modern', name: 'Modern', desc: 'Clean lines, geometric shapes, and functional simplicity.', color: '#E11D48', icon: 'Sparkles' },
  { id: 'minimalist', name: 'Minimalist', desc: 'Sparse decor, neutral tones, and maximum space optimization.', color: '#F43F5E', icon: 'Layers' },
  { id: 'scandinavian', name: 'Scandinavian', desc: 'Light woods, cozy textiles, and natural light focus.', color: '#3B82F6', icon: 'Compass' },
  { id: 'luxury', name: 'Luxury', desc: 'Velvet, marble, metallic accents, and rich bold palettes.', color: '#F59E0B', icon: 'Crown' },
  { id: 'industrial', name: 'Industrial', desc: 'Exposed bricks, dark steel, concrete, and raw wood elements.', color: '#6B7280', icon: 'Wrench' },
  { id: 'contemporary', name: 'Contemporary', desc: 'Sleek surfaces, state-of-the-art tech integration, and fluid forms.', color: '#10B981', icon: 'Tv' },
  { id: 'bohemian', name: 'Bohemian', desc: 'Rattan furniture, warm earthy tones, plants, and vintage rugs.', color: '#EC4899', icon: 'Flame' },
  { id: 'traditional', name: 'Traditional', desc: 'Classic moldings, symmetrical layouts, and rich mahogany furniture.', color: '#14B8A6', icon: 'Bookmark' }
];

export const CATALOG_PRODUCTS = [
  {
    id: 'prod-1',
    name: 'Aurelia Velvet Lounge Sofa',
    price: 1249,
    rating: 4.8,
    reviews: 142,
    category: 'Sofa',
    style: 'luxury',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&auto=format&fit=crop&q=80',
    description: 'An elegant plush sofa upholstered in premium royal-purple velvet, featuring high-density memory foam cushioning and brushed gold brass stiletto legs.',
    dimensions: '220cm W x 95cm D x 85cm H',
    materials: 'Velvet, Beechwood frame, Gold plating'
  },
  {
    id: 'prod-2',
    name: 'Nordic Oak Dining Table',
    price: 899,
    rating: 4.9,
    reviews: 89,
    category: 'Tables',
    style: 'scandinavian',
    image: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=600&auto=format&fit=crop&q=80',
    description: 'Solid European White Oak dining table featuring sleek tapered legs and a smooth polyurethane protective lacquer. Sits up to 8 people comfortably.',
    dimensions: '180cm W x 90cm D x 75cm H',
    materials: 'Solid White Oak'
  },
  {
    id: 'prod-3',
    name: 'Astrid Minimalist Lounge Chair',
    price: 450,
    rating: 4.7,
    reviews: 210,
    category: 'Chairs',
    style: 'minimalist',
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&auto=format&fit=crop&q=80',
    description: 'Ergonomically shaped accent chair with molded plywood frame and premium linen cushioning in oatmeal grey. The epitome of modern form and comfort.',
    dimensions: '82cm W x 78cm D x 75cm H',
    materials: 'Molded plywood, Premium linen fabric'
  },
  {
    id: 'prod-4',
    name: 'Calacatta Marble Coffee Table',
    price: 649,
    rating: 4.6,
    reviews: 64,
    category: 'Tables',
    style: 'modern',
    image: 'https://images.unsplash.com/photo-1581428982868-e410dd047a90?w=600&auto=format&fit=crop&q=80',
    description: 'Luxurious coffee table topped with genuine Italian Calacatta marble, resting on a matte black architectural steel cross frame.',
    dimensions: '100cm Diameter x 42cm H',
    materials: 'Calacatta Marble, Structural Steel'
  },
  {
    id: 'prod-5',
    name: 'Helix Industrial Bookshelf',
    price: 520,
    rating: 4.7,
    reviews: 47,
    category: 'Shelves',
    style: 'industrial',
    image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600&auto=format&fit=crop&q=80',
    description: 'A 5-tier open bookshelf featuring reclaimed ash wood boards supported by a sturdy powder-coated black iron pipes structure.',
    dimensions: '120cm W x 35cm D x 190cm H',
    materials: 'Reclaimed Ash Wood, Powder-coated Iron'
  },
  {
    id: 'prod-6',
    name: 'Eclipse Pendant Drop Light',
    price: 189,
    rating: 4.8,
    reviews: 115,
    category: 'Lighting',
    style: 'contemporary',
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600&auto=format&fit=crop&q=80',
    description: 'A floating celestial dome pendant light emitting a soft warm light halo, wrapped in an anodized brushed copper body. Fully dimmable.',
    dimensions: '45cm Diameter x Max 150cm Cord Drop',
    materials: 'Brushed Copper, LED core'
  },
  {
    id: 'prod-7',
    name: 'Marrakesh Tufted Wool Rug',
    price: 349,
    rating: 4.9,
    reviews: 58,
    category: 'Decor',
    style: 'bohemian',
    image: 'https://images.unsplash.com/photo-1575414003591-ece8d0416c7a?w=600&auto=format&fit=crop&q=80',
    description: 'Thick pile hand-woven organic wool rug featuring classic Moroccan diamond motifs, braided tassels, and an incredibly soft sensory underfoot experience.',
    dimensions: '160cm x 230cm',
    materials: '100% Organic Wool'
  },
  {
    id: 'prod-8',
    name: 'Florence Fluted Walnut Credenza',
    price: 999,
    rating: 4.8,
    reviews: 32,
    category: 'Cabinets',
    style: 'traditional',
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600&auto=format&fit=crop&q=80',
    description: 'Mid-century traditional walnut cabinet featuring beautiful fluted door faces, soft-close magnetic push latches, and ample interior storage compartments.',
    dimensions: '160cm W x 45cm D x 78cm H',
    materials: 'Walnut veneer, Solid Walnut legs'
  }
];

export const MOCK_PROJECTS = [
  {
    id: 'proj-1',
    name: 'Sunset Heights Living Room',
    style: 'Luxury',
    date: '2026-05-18',
    budget: '$12,500',
    status: 'Completed',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&auto=format&fit=crop&q=80',
    analysis: {
      roomType: 'Living Room',
      lighting: 'Abundant Natural Light (East Facing)',
      detectedObjects: ['Sofa', 'Coffee Table', 'Pendant Light', 'Planter'],
      spaceUtilization: '85% (Optimized flow)',
      score: 92
    }
  },
  {
    id: 'proj-2',
    name: 'Metropolitan Studio Flat',
    style: 'Minimalist',
    date: '2026-06-01',
    budget: '$6,800',
    status: 'In Progress',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&auto=format&fit=crop&q=80',
    analysis: {
      roomType: 'Studio / Compact Space',
      lighting: 'Moderate (North Facing Window)',
      detectedObjects: ['Daybed', 'Folding Desk', 'Accent Chair'],
      spaceUtilization: '94% (Space-saving items)',
      score: 88
    }
  },
  {
    id: 'proj-3',
    name: 'Aero Industrial Loft Office',
    style: 'Industrial',
    date: '2026-06-05',
    budget: '$8,200',
    status: 'Planning',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&auto=format&fit=crop&q=80',
    analysis: {
      roomType: 'Home Office',
      lighting: 'Bright (Floor-to-ceiling windows)',
      detectedObjects: ['Steel Desk', 'Task Chair', 'Bookshelf'],
      spaceUtilization: '70% (Spacious layout)',
      score: 75
    }
  }
];

export const MOCK_BOOKINGS = [
  {
    id: 'book-101',
    productName: 'Aurelia Velvet Lounge Sofa',
    productImage: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&auto=format&fit=crop&q=80',
    date: '2026-06-06',
    price: 1249,
    status: 'Processing',
    history: [
      { status: 'Pending', date: '2026-06-06 10:14 AM', completed: true },
      { status: 'Confirmed', date: '2026-06-06 02:30 PM', completed: true },
      { status: 'Processing', date: '2026-06-07 09:00 AM', completed: true },
      { status: 'Delivered', date: '--', completed: false }
    ]
  },
  {
    id: 'book-102',
    productName: 'Eclipse Pendant Drop Light',
    productImage: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=200&auto=format&fit=crop&q=80',
    date: '2026-06-02',
    price: 189,
    status: 'Delivered',
    history: [
      { status: 'Pending', date: '2026-06-02 08:30 AM', completed: true },
      { status: 'Confirmed', date: '2026-06-02 11:12 AM', completed: true },
      { status: 'Processing', date: '2026-06-03 04:00 PM', completed: true },
      { status: 'Delivered', date: '2026-06-05 02:45 PM', completed: true }
    ]
  }
];

// Contextual Assistant Prompts mapping routes to array of suggestions
export const CONTEXTUAL_PROMPTS = {
  '/': [
    'How does the AI room scanning work?',
    'What interior design styles are supported?',
    'How do I book furniture with Gruha Alankara?'
  ],
  '/dashboard': [
    'How can I improve my Sunset Heights Living Room score?',
    'What furniture is recommended for my recent studio project?',
    'Give me a summary of my active bookings.'
  ],
  '/design-studio': [
    'Suggest a color palette for a cozy bohemian room.',
    'Recommend a space saving layout for minimalists.',
    'How do I arrange a rectangular 200 sq ft living room?'
  ],
  '/camera': [
    'How does real-time room lighting analysis work?',
    'Why is the spacing between my sofa and coffee table warning active?',
    'What objects are currently detected?'
  ],
  '/ai-analysis': [
    'Explain the spatial efficiency score of 92%.',
    'How can I optimize a room with low natural light?',
    'Explain the lighting distribution heatmap.'
  ],
  '/catalog': [
    'Which velvet sofas match a luxury design style?',
    'Recommend tables that pair well with Scandinavian oak chairs.',
    'Help me compare Aurelia Sofa and Astrid Chair dimensions.'
  ],
  '/booking': [
    'When will my Aurelia Velvet Sofa be delivered?',
    'How can I change my delivery address?',
    'What is the return policy for delivered products?'
  ],
  '/projects': [
    'Duplicate my Metropolitan Studio layout for a client draft.',
    'Suggest improvements to the Aero Industrial Office project.',
    'Create a new design workspace.'
  ],
  '/profile': [
    'Update my design style preference to Bohemian.',
    'How do I sync my Pinterest design ideas?',
    'Show my saved items.'
  ],
  '/settings': [
    'Switch language to Hindi (हिन्दी) / Kannada (ಕನ್ನಡ).',
    'How do I adjust AI assistant response length?',
    'Manage third-party camera integrations.'
  ]
};

// AI assistant response logic matching user questions
export const GET_AI_MOCK_RESPONSE = (messageText, currentPath) => {
  const query = messageText.toLowerCase();

  if (query.includes('light') || query.includes('lighting')) {
    return {
      status: 'Completed',
      text: `Based on current illumination diagnostics, natural light levels peak at **340 Lux** near east-facing portals, but decay to **45 Lux** in recessed alcoves. 

I recommend adding secondary ambient fixtures (like the *Eclipse Pendant Drop Light*) and incorporating satin or white reflective walls to scatter light across darker zones. Should I select lighting fixtures from our catalog for you?`,
      agentState: 'Recommending'
    };
  }

  if (query.includes('sofa') || query.includes('couch') || query.includes('aurelia')) {
    return {
      status: 'Completed',
      text: `The **Aurelia Velvet Lounge Sofa** is one of our flagship pieces. It measures **220cm W x 95cm D** and matches exceptionally well with **Luxury** and **Modern** aesthetics. 

Based on your active *Sunset Heights Living Room* space profile, this sofa would occupy 15% of your available floor space, keeping your circulation pathways at a healthy **1.2-meter** width. Would you like me to place it inside your 3D canvas?`,
      agentState: 'Recommending'
    };
  }

  if (query.includes('space') || query.includes('optimize') || query.includes('layout')) {
    return {
      status: 'Completed',
      text: `To maximize circulation flow in your room, I suggest implementing a **floating layout**—placing furniture away from the walls to draw visual weight towards the center. 

I've generated a spatial routing recommendation:
1. Position the main sofa facing the primary window.
2. Maintain a **45cm clearance gap** between the sofa and coffee table.
3. Reserve the wall spaces for vertical storage shelving to draw the eyes upward.`,
      agentState: 'Planning'
    };
  }

  if (query.includes('bohemian') || query.includes('boho') || query.includes('style')) {
    return {
      status: 'Completed',
      text: `Bohemian design centers on rich textures, organic elements, and global motifs. 
      
For your space, we can blend **Marrakesh Tufted Wool Rug** with light rattan accents, warm terracotta wall backdrops, and cascading floor plants (such as Monstera or Fiddle Leaf Fig) to create a relaxed, curated look.`,
      agentState: 'Completed'
    };
  }

  if (query.includes('kannada') || query.includes('ನಮಸ್ಕಾರ') || query.includes('ಕನ್ನಡ')) {
    return {
      status: 'Completed',
      text: `ನಮಸ್ಕಾರ! ಗೃಹ ಅಲಂಕಾರ AI ಸಹಾಯಕಕ್ಕೆ ಸುಸ್ವಾಗತ. ನಾನು ನಿಮಗೆ ಕನ್ನಡದಲ್ಲಿ ಸಹಾಯ ಮಾಡಬಲ್ಲೆ. ನಿಮ್ಮ ಕೋಣೆಯ ವಿನ್ಯಾಸವನ್ನು ಹೇಗೆ ಸುಧಾರಿಸಬೇಕೆಂದು ತಿಳಿಸಿ! (Hello! Welcome to Gruha Alankara AI. I can assist you in Kannada. Let me know how to decorate your room!)`,
      agentState: 'Completed'
    };
  }

  if (query.includes('hindi') || query.includes('नमस्ते') || query.includes('हिंदी')) {
    return {
      status: 'Completed',
      text: `नमस्ते! गृह अलंकार AI असिस्टेंट में आपका स्वागत है। मैं आपकी भाषा हिंदी में मदद कर सकता हूँ। क्या आप अपने लिविंग रूम का लेआउट बदलना चाहते हैं? (Hello! Welcome to Gruha Alankara AI. I can help you in Hindi. Would you like to update your living room layout?)`,
      agentState: 'Completed'
    };
  }

  // Default response fallback
  return {
    status: 'Completed',
    text: `I've analyzed your current focus on **${currentPath || 'the dashboard'}**. 

To assist your interior design workflow, I can:
* Perform a real-time lighting or spatial scan of your room
* Generate design suggestions for styles like *Scandinavian*, *Luxury*, or *Minimalist*
* Suggest furniture from our curated catalog that fits your physical space measurements.

What would you like to build or customize next?`,
    agentState: 'Completed'
  };
};
