import { Product, Category, Brand, FilterableSmartphone } from "./types";

export const CATEGORIES: Category[] = [
  { id: "electronics", name: "Electronics", imageUrl: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=300&auto=format&fit=crop&q=80" },
  { id: "phones", name: "Phones", imageUrl: "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=300&auto=format&fit=crop&q=80" },
  { id: "home", name: "Home & Kitchen", imageUrl: "https://images.unsplash.com/photo-1578643463396-0997cb5328c1?w=300&auto=format&fit=crop&q=80" },
  { id: "fashion", name: "Fashion", imageUrl: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=300&auto=format&fit=crop&q=80" },
  { id: "beauty", name: "Beauty", imageUrl: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=300&auto=format&fit=crop&q=80" },
  { id: "sports", name: "Sports", imageUrl: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=300&auto=format&fit=crop&q=80" },
  { id: "toys", name: "Toys & Games", imageUrl: "https://images.unsplash.com/photo-1559251606-c623743a6d76?w=300&auto=format&fit=crop&q=80" },
  { id: "automotive", name: "Automotive", imageUrl: "https://images.unsplash.com/photo-1615887023516-9b6bcd559e87?w=300&auto=format&fit=crop&q=80" },
];

export const ALL_SIDEBAR_CATEGORIES = [
  { id: "electronics", name: "Electronics", icon: "Laptop" },
  { id: "phones", name: "Mobile & Accessories", icon: "Smartphone" },
  { id: "computer", name: "Computer & Office", icon: "Cpu" },
  { id: "home", name: "Home & Kitchen", icon: "Home" },
  { id: "fashion", name: "Fashion", icon: "Shirt" },
  { id: "beauty", name: "Beauty & Health", icon: "Sparkles" },
  { id: "sports", name: "Sports & Outdoors", icon: "Bike" },
  { id: "toys", name: "Toys & Games", icon: "Gamepad" },
  { id: "automotive", name: "Automotive", icon: "Car" },
  { id: "watches", name: "Jewelry & Watches", icon: "Watch" },
  { id: "tools", name: "Tools & Home Improvement", icon: "Wrench" },
  { id: "baby", name: "Baby & Kids", icon: "Baby" },
];

export const FLASH_DEALS: Product[] = [
  {
    id: "fd1",
    name: "Wireless Earbuds",
    price: 19.99,
    originalPrice: 49.99,
    discountBadge: "-60%",
    rating: 4.8,
    reviewsCount: "2.4K",
    imageUrl: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=350&auto=format&fit=crop&q=80",
    category: "electronics",
    isFlashDeal: true
  },
  {
    id: "fd2",
    name: "Smart Watch",
    price: 32.99,
    originalPrice: 59.99,
    discountBadge: "-45%",
    rating: 4.7,
    reviewsCount: "1.8K",
    imageUrl: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=350&auto=format&fit=crop&q=80",
    category: "electronics",
    isFlashDeal: true
  },
  {
    id: "fd3",
    name: "Bluetooth Speaker",
    price: 24.99,
    originalPrice: 49.99,
    discountBadge: "-50%",
    rating: 4.6,
    reviewsCount: "950",
    imageUrl: "https://images.unsplash.com/photo-1608043512269-423dbba4e7e1?w=350&auto=format&fit=crop&q=80",
    category: "electronics",
    isFlashDeal: true
  },
  {
    id: "fd4",
    name: "Travel Backpack",
    price: 23.99,
    originalPrice: 39.99,
    discountBadge: "-40%",
    rating: 4.9,
    reviewsCount: "4.2K",
    imageUrl: "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=350&auto=format&fit=crop&q=80",
    category: "fashion",
    isFlashDeal: true
  },
  {
    id: "fd5",
    name: "Polarized Sunglasses",
    price: 13.99,
    originalPrice: 19.99,
    discountBadge: "-30%",
    rating: 4.5,
    reviewsCount: "1.1K",
    imageUrl: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=350&auto=format&fit=crop&q=80",
    category: "fashion",
    isFlashDeal: true
  }
];

export const CHOICE_DEALS: Product[] = [
  {
    id: "sony-wh1000xm5",
    name: "Sony WH-1000XM5 Wireless Noise Canceling Headphones",
    price: 299.99,
    originalPrice: 389.99,
    discountBadge: "-23%",
    discountPercent: 23,
    choice: true,
    rating: 4.8,
    reviewsCount: "1,256",
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80",
    category: "electronics"
  },
  {
    id: "cd1",
    name: "Xiaomi Redmi Buds 5",
    price: 28.99,
    originalPrice: 44.99,
    discountBadge: "-35%",
    choice: true,
    rating: 4.8,
    reviewsCount: "12.5K",
    imageUrl: "https://images.unsplash.com/photo-1608156639585-b3a032ef9689?w=300&auto=format&fit=crop&q=80",
    category: "electronics"
  },
  {
    id: "cd2",
    name: "Smart LED Desk Lamp",
    price: 18.99,
    originalPrice: 26.59,
    discountBadge: "-28%",
    choice: true,
    rating: 4.7,
    reviewsCount: "8.2K",
    imageUrl: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=300&auto=format&fit=crop&q=80",
    category: "home"
  },
  {
    id: "cd3",
    name: "Men's Casual Sneakers",
    price: 29.99,
    originalPrice: 42.99,
    discountBadge: "-30%",
    choice: true,
    rating: 4.6,
    reviewsCount: "15.1K",
    imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&auto=format&fit=crop&q=80",
    category: "fashion"
  },
  {
    id: "cd4",
    name: "Portable Blender",
    price: 23.99,
    originalPrice: 31.99,
    discountBadge: "-25%",
    choice: true,
    rating: 4.8,
    reviewsCount: "9.7K",
    imageUrl: "https://images.unsplash.com/photo-1578643463396-0997cb5328c1?w=300&auto=format&fit=crop&q=80",
    category: "home"
  },
  {
    id: "cd5",
    name: "Women's Handbag",
    price: 27.99,
    originalPrice: 46.99,
    discountBadge: "-40%",
    choice: true,
    rating: 4.9,
    reviewsCount: "11.3K",
    imageUrl: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300&auto=format&fit=crop&q=80",
    category: "fashion"
  },
  {
    id: "cd6",
    name: "Digital Camera 4K",
    price: 129.99,
    originalPrice: 199.99,
    discountBadge: "-35%",
    choice: true,
    rating: 4.7,
    reviewsCount: "6.3K",
    imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300&auto=format&fit=crop&q=80",
    category: "electronics"
  },
  {
    id: "cd7",
    name: "Dual Monitor Stand",
    price: 49.99,
    originalPrice: 79.99,
    discountBadge: "-37%",
    choice: true,
    rating: 4.8,
    reviewsCount: "2.1K",
    imageUrl: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=300&auto=format&fit=crop&q=80",
    category: "computer"
  },
  {
    id: "cd8",
    name: "Mechanical Keyboard",
    price: 59.99,
    originalPrice: 89.99,
    discountBadge: "-33%",
    choice: true,
    rating: 4.9,
    reviewsCount: "4.8K",
    imageUrl: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=300&auto=format&fit=crop&q=80",
    category: "computer"
  }
];

export const BRANDS: Brand[] = [
  { name: "Apple", logo: "🍎" },
  { name: "Samsung", logo: "📱" },
  { name: "Xiaomi", logo: "🍊" },
  { name: "Anker", logo: "🔋" },
  { name: "Nike", logo: "✔️" },
  { name: "Philips", logo: "💡" },
  { name: "Adidas", logo: "🎽" },
  { name: "Lenovo", logo: "💻" },
  { name: "DJI", logo: "🚁" },
  { name: "Ugreen", logo: "🔌" }
];

export const SMARTPHONES_DATA: FilterableSmartphone[] = [
  {
    id: "sp1",
    name: "Apple iPhone 15 Pro Max 256GB - Black Titanium",
    brand: "Apple",
    price: 999.00,
    originalPrice: 1169.00,
    discountBadge: "-15%",
    badgeType: "discount",
    rating: 5,
    reviewsCount: 128,
    imageUrl: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=450&auto=format&fit=crop&q=80",
    storage: "256GB",
    screenSize: "6.1-6.7"
  },
  {
    id: "sp2",
    name: "Samsung Galaxy S24 Ultra 12GB RAM, 256GB",
    brand: "Samsung",
    price: 899.00,
    originalPrice: 999.00,
    discountBadge: "-10%",
    badgeType: "discount",
    rating: 5,
    reviewsCount: 98,
    imageUrl: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=450&auto=format&fit=crop&q=80",
    storage: "256GB",
    screenSize: "above-6.7"
  },
  {
    id: "sp3",
    name: "Xiaomi 14 Ultra 5G 16GB RAM, 512GB",
    brand: "Xiaomi",
    price: 749.00,
    discountBadge: "New",
    badgeType: "new",
    rating: 4,
    reviewsCount: 76,
    imageUrl: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=450&auto=format&fit=crop&q=80",
    storage: "512GB",
    screenSize: "6.1-6.7"
  },
  {
    id: "sp4",
    name: "OnePlus 12R 5G 16GB RAM, 256GB",
    brand: "OnePlus",
    price: 599.00,
    originalPrice: 649.00,
    discountBadge: "-8%",
    badgeType: "discount",
    rating: 4,
    reviewsCount: 64,
    imageUrl: "https://images.unsplash.com/photo-1565630916779-e303be97b6f5?w=450&auto=format&fit=crop&q=80",
    storage: "256GB",
    screenSize: "6.1-6.7"
  },
  {
    id: "sp5",
    name: "Samsung Galaxy A55 5G 8GB RAM, 128GB",
    brand: "Samsung",
    price: 349.00,
    originalPrice: 399.00,
    discountBadge: "-12%",
    badgeType: "discount",
    rating: 4,
    reviewsCount: 112,
    imageUrl: "https://images.unsplash.com/photo-1610945415295-d9b23614590c?w=450&auto=format&fit=crop&q=80",
    storage: "128GB",
    screenSize: "6.1-6.7"
  },
  {
    id: "sp6",
    name: "Realme GT 6T 5G 8GB RAM, 256GB",
    brand: "Realme",
    price: 329.00,
    discountBadge: "New",
    badgeType: "new",
    rating: 4,
    reviewsCount: 88,
    imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=450&auto=format&fit=crop&q=80",
    storage: "256GB",
    screenSize: "6.1-6.7"
  },
  {
    id: "sp7",
    name: "POCO X6 Pro 5G 12GB RAM, 256GB",
    brand: "Xiaomi",
    price: 279.00,
    originalPrice: 309.00,
    discountBadge: "-9%",
    badgeType: "discount",
    rating: 4,
    reviewsCount: 95,
    imageUrl: "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=450&auto=format&fit=crop&q=80",
    storage: "256GB",
    screenSize: "6.1-6.7"
  },
  {
    id: "sp8",
    name: "Oppo Reno11 Pro 5G 12GB RAM, 256GB",
    brand: "Oppo",
    price: 399.00,
    badgeType: "none",
    rating: 4,
    reviewsCount: 72,
    imageUrl: "https://images.unsplash.com/photo-1605787020600-b9ebd5df1d07?w=450&auto=format&fit=crop&q=80",
    storage: "256GB",
    screenSize: "6.1-6.7"
  },
  {
    id: "sp9",
    name: "Vivo V30 5G 8GB RAM, 256GB",
    brand: "Oppo",
    price: 329.00,
    originalPrice: 355.00,
    discountBadge: "-7%",
    badgeType: "discount",
    rating: 4,
    reviewsCount: 58,
    imageUrl: "https://images.unsplash.com/photo-1573148195900-7845dcb9b127?w=450&auto=format&fit=crop&q=80",
    storage: "256GB",
    screenSize: "6.1-6.7"
  },
  {
    id: "sp10",
    name: "Nothing Phone (2a) 8GB RAM, 128GB",
    brand: "OnePlus",
    price: 279.00,
    discountBadge: "New",
    badgeType: "new",
    rating: 5,
    reviewsCount: 66,
    imageUrl: "https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=450&auto=format&fit=crop&q=80",
    storage: "128GB",
    screenSize: "6.1-6.7"
  },
  {
    id: "sp11",
    name: "iQOO Neo 9 Pro 5G 12GB RAM, 256GB",
    brand: "Oppo",
    price: 359.00,
    originalPrice: 409.00,
    discountBadge: "-13%",
    badgeType: "discount",
    rating: 4,
    reviewsCount: 61,
    imageUrl: "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=450&auto=format&fit=crop&q=80",
    storage: "256GB",
    screenSize: "6.1-6.7"
  },
  {
    id: "sp12",
    name: "Redmi Note 13 Pro+ 5G 8GB RAM, 256GB",
    brand: "Xiaomi",
    price: 299.00,
    badgeType: "none",
    rating: 4,
    reviewsCount: 80,
    imageUrl: "https://images.unsplash.com/photo-1533310266094-8898a03807dd?w=450&auto=format&fit=crop&q=80",
    storage: "256GB",
    screenSize: "6.1-6.7"
  }
];

