// Product types
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  badge?: string | null;
  stock: number;
  benefits: string[];
  category: string[];
}

// Dummy products data
const products: Product[] = [
  // Top selling plants
  {
    id: 1,
    name: 'Monstera Deliciosa',
    description: 'The iconic Swiss Cheese Plant with unique split leaves that create a dramatic tropical statement.',
    price: 1299,
    oldPrice: 1499,
    image: 'flower4.png',
    rating: 4.9,
    reviewCount: 128,
    badge: 'Bestseller',
    stock: 15,
    benefits: ['Air purifying', 'Low maintenance', 'Stunning foliage'],
    category: ['indoor', 'tropical', 'popular']
  },
  {
    id: 2,
    name: 'Snake Plant',
    description: 'A virtually indestructible plant with striking upright leaves, perfect for beginners and busy plant parents.',
    price: 899,
    image: 'flower5.png',
    rating: 4.7,
    reviewCount: 98,
    badge: 'Easy Care',
    stock: 8,
    benefits: ['Air purifying', 'Low light tolerant', 'Drought resistant'],
    category: ['indoor', 'succulent', 'beginner-friendly']
  },
  {
    id: 3,
    name: 'Peace Lily',
    description: 'Elegant white blooms and glossy leaves make this air-purifying plant a timeless favorite.',
    price: 999,
    image: 'flower6.png',
    rating: 4.8,
    reviewCount: 112,
    badge: 'Air Purifier',
    stock: 12,
    benefits: ['Air purifying', 'Beautiful blooms', 'Low light tolerant'],
    category: ['indoor', 'flowering', 'air-purifying']
  },
  {
    id: 4,
    name: 'Fiddle Leaf Fig',
    description: 'The Instagram darling with large violin-shaped leaves that brings designer style to any room.',
    price: 1599,
    oldPrice: 1899,
    image: 'flower7.png',
    rating: 4.6,
    reviewCount: 87,
    badge: 'Trending',
    stock: 5,
    benefits: ['Statement plant', 'Architectural shape', 'Instagram favorite'],
    category: ['indoor', 'tropical', 'popular']
  },
  {
    id: 5,
    name: 'Pothos Golden',
    description: 'Fast-growing vining plant with heart-shaped leaves variegated in green and golden yellow.',
    price: 799,
    image: 'flower8.png',
    rating: 4.9,
    reviewCount: 156,
    stock: 20,
    benefits: ['Air purifying', 'Fast growing', 'Low maintenance'],
    category: ['indoor', 'hanging', 'beginner-friendly']
  },
  {
    id: 6,
    name: 'ZZ Plant',
    description: 'Virtually unkillable plant with glossy leaves that thrives in low light and requires minimal water.',
    price: 899,
    image: 'flower9.png',
    rating: 4.8,
    reviewCount: 92,
    stock: 10,
    benefits: ['Low maintenance', 'Low light tolerant', 'Drought resistant'],
    category: ['indoor', 'tropical', 'beginner-friendly']
  },
  
  // Trendy plants
  {
    id: 7,
    name: "Alocasia Zebrina",
    price: 1299,
    image: "flower2.png",
    description: "Known for its striking zebra-patterned stems and large arrow-shaped leaves, this tropical plant adds exotic drama to any space.",
    rating: 4.8,
    reviewCount: 94,
    badge: "Trending",
    stock: 7,
    benefits: ['Stunning zebra-patterned stems', 'Bold tropical look', 'Statement piece'],
    category: ['indoor', 'tropical', 'rare']
  },
  {
    id: 8,
    name: "Calathea Orbifolia",
    price: 799,
    image: "flower3.png",
    description: "Featuring large, round leaves with stunning silver and green stripes that move throughout the day. A true plant collector's favorite.",
    rating: 4.7,
    reviewCount: 87,
    badge: "Popular",
    stock: 12,
    benefits: ['Air purifying', 'Pet friendly', 'Decorative leaves'],
    category: ['indoor', 'tropical', 'pet-friendly']
  },
  {
    id: 9,
    name: "Philodendron Pink Princess",
    price: 1999,
    oldPrice: 2499,
    image: "flower2.png",
    description: "One of the most sought-after houseplants with stunning dark green leaves splashed with vibrant pink variegation.",
    rating: 4.9,
    reviewCount: 156,
    badge: "Rare Find",
    stock: 3,
    benefits: ['Stunning pink variegation', 'Collector\'s item', 'Fast growing'],
    category: ['indoor', 'tropical', 'rare']
  },
  {
    id: 10,
    name: "Hoya Kerrii",
    price: 599,
    image: "flower3.png",
    description: "The adorable heart-shaped leaf plant, perfect for adding a touch of love to any space. Low maintenance and long-lasting.",
    rating: 4.6,
    reviewCount: 78,
    badge: "Gift Favorite",
    stock: 18,
    benefits: ['Heart-shaped leaves', 'Long-lasting', 'Low maintenance'],
    category: ['indoor', 'succulent', 'gift']
  },
  {
    id: 11,
    name: "Pilea Peperomioides",
    price: 699,
    image: "flower2.png",
    description: "Chinese Money Plant with quirky coin-shaped leaves that brings a modern, minimalist aesthetic to any space.",
    rating: 4.8,
    reviewCount: 112,
    badge: "Bestseller",
    stock: 15,
    benefits: ['Unique coin-shaped leaves', 'Produces baby plants', 'Modern aesthetic'],
    category: ['indoor', 'unique', 'popular']
  },
  {
    id: 12,
    name: "String of Pearls",
    price: 549,
    image: "flower3.png",
    description: "This succulent features cascading stems of bead-like leaves, creating a waterfall effect perfect for hanging displays.",
    rating: 4.7,
    reviewCount: 94,
    badge: null,
    stock: 9,
    benefits: ['Drought tolerant', 'Unique trailing habit', 'Space-efficient'],
    category: ['indoor', 'succulent', 'hanging']
  }
];

// Get all products
export const getAllProducts = (): Product[] => {
  return products;
};

// Get products by category
export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category.includes(category));
};

// Get top selling products
export const getTopSellingProducts = (): Product[] => {
  return products.slice(0, 6);
};

// Get trendy products
export const getTrendyProducts = (): Product[] => {
  return products.slice(6, 12);
};

// Get a product by ID
export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
};

// Search products
export const searchProducts = (query: string): Product[] => {
  const searchTerm = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm) ||
    product.category.some(cat => cat.toLowerCase().includes(searchTerm))
  );
};

export default {
  getAllProducts,
  getProductsByCategory,
  getTopSellingProducts,
  getTrendyProducts,
  getProductById,
  searchProducts
}; 