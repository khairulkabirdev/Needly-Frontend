import React, { useState, useEffect } from "react";
import Layout from "./app/layout";
import HomePage from "./app/home/page";
import ProductDetailPage from "./app/product/product-detail/page";
import CheckoutPage from "./app/checkout/page";
import WishlistPage from "./app/wishlist/page";
import SmartphonesPage from "./app/product/page";

import { Product, CartItem } from "./types";
import { FLASH_DEALS, CHOICE_DEALS, SMARTPHONES_DATA } from "./data";

export default function App() {
  const [currentPath, setCurrentPath] = useState("/");
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  const getSlug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  // Synchronize dynamic URL on mount and browser back/forward buttons (popstate)
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname;
      if (path === "/products" || path === "/products/") {
        setCurrentPath("/smartphones");
      } else if (path.startsWith("/products/") || path.startsWith("/proucts/")) {
        const slug = path.split("/").pop() || "";
        if (!slug || slug === "products") {
          setCurrentPath("/smartphones");
        } else {
          const mappedSmartphones = SMARTPHONES_DATA.map((phone) => ({
            id: phone.id,
            name: phone.name,
            price: phone.price,
            originalPrice: phone.originalPrice,
            discountBadge: phone.discountBadge,
            rating: phone.rating,
            reviewsCount: `${phone.reviewsCount}`,
            imageUrl: phone.imageUrl,
            category: "electronics"
          }));
          const allProducts = [...FLASH_DEALS, ...CHOICE_DEALS, ...mappedSmartphones];
          const matched = allProducts.find((p) => getSlug(p.name) === slug || p.id === slug);
          if (matched) {
            setActiveProduct(matched);
            setCurrentPath("/product");
          } else {
            setCurrentPath("/smartphones");
          }
        }
      } else if (path === "/wishlist") {
        setCurrentPath("/wishlist");
      } else if (path === "/checkout") {
        setCurrentPath("/checkout");
      } else if (path === "/smartphones") {
        setCurrentPath("/smartphones");
      } else {
        setCurrentPath("/");
      }
    };

    // Parse URL on initial render
    handleLocationChange();

    window.addEventListener("popstate", handleLocationChange);
    return () => {
      window.removeEventListener("popstate", handleLocationChange);
    };
  }, []);

  const handleNavigateHome = () => {
    setCurrentPath("/");
    window.history.pushState({ type: "home" }, "", "/");
  };

  const handleNavigateToWishlist = () => {
    setCurrentPath("/wishlist");
    window.history.pushState({ type: "wishlist" }, "", "/wishlist");
  };

  const handleNavigateToCheckout = () => {
    setCurrentPath("/checkout");
    window.history.pushState({ type: "checkout" }, "", "/checkout");
  };

  // Core database state
  const [cart, setCart] = useState<CartItem[]>([
    { product: FLASH_DEALS[0], quantity: 10, selectedColor: "Original Slate" },
    { product: CHOICE_DEALS[5], quantity: 10, selectedColor: "Original Slate" }
  ]);
  const [wishlist, setWishlist] = useState<Product[]>([
    ...FLASH_DEALS,
    ...CHOICE_DEALS.slice(0, 5)
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [activeNavTab, setActiveNavTab] = useState("deals");

  // Nav click action transitions
  const handleNavTabChange = (tab: string) => {
    setActiveNavTab(tab);
    handleNavigateHome();
    setTimeout(() => {
      if (tab === "brands") {
        document.getElementById("top-brands-section")?.scrollIntoView({ behavior: "smooth" });
      } else if (tab === "choice") {
        document.getElementById("top-choice-section")?.scrollIntoView({ behavior: "smooth" });
      } else if (tab === "deals") {
        document.getElementById("flash-deals-row")?.scrollIntoView({ behavior: "smooth" });
      }
    }, 150);
  };

  // Announcements and alerts
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState(0);

  // Drawer triggers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Dynamic feedback toast message states
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  // Scroll to top whenever router changes route path
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPath]);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2800);
  };

  // State modifiers
  const handleAddToCart = (product: Product, quantity: number = 1, color?: string) => {
    const selectedColorName = color || "Original Slate";
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id && item.selectedColor === selectedColorName
      );
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.selectedColor === selectedColorName
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, selectedColor: selectedColorName }];
    });
    triggerToast(`Added ${quantity}x ${product.name} (${selectedColorName}) to bag!`);
  };

  const handleRemoveFromCart = (productId: string, color?: string) => {
    const colorName = color || "Original Slate";
    setCart((prev) =>
      prev.filter((item) => !(item.product.id === productId && item.selectedColor === colorName))
    );
    triggerToast("Item removed from shopping bag");
  };

  const handleUpdateCartQty = (productId: string, delta: number, color?: string) => {
    const colorName = color || "Original Slate";
    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === productId && item.selectedColor === colorName) {
          const nextQty = item.quantity + delta;
          return { ...item, quantity: nextQty < 1 ? 1 : nextQty };
        }
        return item;
      })
    );
  };

  const handleAddToWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        triggerToast(`Removed ${product.name} from Wishlist`);
        return prev.filter((item) => item.id !== product.id);
      } else {
        triggerToast(`Added ${product.name} to Wishlist!`);
        return [...prev, product];
      }
    });
  };

  const handleApplyCoupon = (discount: number) => {
    setIsCouponApplied(true);
    setCouponDiscount(discount);
    triggerToast("Successfully applied $10 New User Voucher!");
  };

  const handleCategorySelect = (categoryName: string) => {
    const isPhone = categoryName.toLowerCase().includes("phone") || 
                    categoryName.toLowerCase().includes("smartphone") || 
                    categoryName.toLowerCase().includes("mobile");
    if (isPhone) {
      setCurrentPath("/smartphones");
      window.history.pushState({ type: "smartphones" }, "", "/products");
      triggerToast("Loaded Smartphones Category Grid");
    } else {
      setSelectedCategory(categoryName);
      if (categoryName) {
        setTimeout(() => {
          document.getElementById("top-choice-section")?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  };

  const handleSearchSubmit = (term: string) => {
    const cleanTerm = term.toLowerCase().trim();
    if (cleanTerm === "smartphones" || cleanTerm === "smartphone" || cleanTerm === "phones" || cleanTerm === "phone" || cleanTerm === "mobile") {
      setCurrentPath("/smartphones");
      window.history.pushState({ type: "smartphones" }, "", "/products");
      triggerToast(`Loaded Smartphones category for "${term}"`);
      return;
    }

    setSearchTerm(term);
    setSelectedCategory("");
    setCurrentPath("/");
    
    if (term.trim() !== "") {
      triggerToast(`Showing results for search: "${term}"`);
      setTimeout(() => {
        document.getElementById("top-choice-section")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  const handleBrandClick = (brandName: string) => {
    const isPhoneBrand = ["Apple", "Samsung", "Xiaomi", "Realme", "OnePlus", "Oppo"].includes(brandName);
    if (isPhoneBrand) {
      setCurrentPath("/smartphones");
      window.history.pushState({ type: "smartphones" }, "", "/products");
      triggerToast(`Loaded Smartphones category filtered by ${brandName}`);
      return;
    }

    setSearchTerm(brandName);
    setSelectedCategory("");
    setCurrentPath("/");

    if (brandName) {
      triggerToast(`Loaded official ${brandName} catalog`);
      setTimeout(() => {
        document.getElementById("top-choice-section")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  const handleSelectProduct = (product: Product) => {
    setActiveProduct(product);
    setCurrentPath("/product");
    const slug = getSlug(product.name);
    window.history.pushState({ type: "product", id: product.id }, "", `/products/${slug}`);
  };

  // Computations
  const cartSubtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const totalItemsCount = cart.reduce((total, item) => total + item.quantity, 0);
  const wishlistIds = wishlist.map((item) => item.id);

  // Simple Router Switcher
  const renderPageContent = () => {
    switch (currentPath) {
      case "/product":
        if (!activeProduct) {
          handleNavigateHome();
          return null;
        }
        return (
          <ProductDetailPage
            product={activeProduct}
            wishlistIds={wishlistIds}
            onAddToCart={handleAddToCart}
            onAddToWishlist={handleAddToWishlist}
            onNavigateBack={handleNavigateHome}
            onSelectProduct={handleSelectProduct}
          />
        );

      case "/smartphones":
        return (
          <SmartphonesPage
            wishlistIds={wishlistIds}
            onAddToCart={handleAddToCart}
            onAddToWishlist={handleAddToWishlist}
            onSelectProduct={handleSelectProduct}
            onNavigateHome={handleNavigateHome}
          />
        );

      case "/checkout":
        return (
          <CheckoutPage
            cart={cart}
            cartSubtotal={cartSubtotal}
            couponDiscount={couponDiscount}
            isCouponApplied={isCouponApplied}
            onApplyCoupon={handleApplyCoupon}
            onClearCart={() => setCart([])}
            onNavigateBack={handleNavigateHome}
          />
        );

      case "/wishlist":
        return (
          <WishlistPage
            wishlist={wishlist}
            onAddToCart={(p) => handleAddToCart(p, 1)}
            onRemoveFromWishlist={handleAddToWishlist}
            onSelectProduct={handleSelectProduct}
            onNavigateBack={handleNavigateHome}
          />
        );

      case "/":
      default:
        return (
          <HomePage
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory}
            setSelectedCategory={handleCategorySelect}
            wishlistIds={wishlistIds}
            onAddToCart={(p) => handleAddToCart(p, 1)}
            onAddToWishlist={handleAddToWishlist}
            onSelectProduct={handleSelectProduct}
            onOpenAuth={() => setIsAuthOpen(true)}
            isCouponApplied={isCouponApplied}
            onApplyCoupon={handleApplyCoupon}
            onSearchSubmit={handleSearchSubmit}
            onBrandClick={handleBrandClick}
            activeNavTab={activeNavTab}
            setActiveNavTab={handleNavTabChange}
          />
        );
    }
  };

  return (
    <Layout
      cart={cart}
      cartSubtotal={cartSubtotal}
      totalItemsCount={totalItemsCount}
      wishlistCount={wishlist.length}
      onNavigateHome={handleNavigateHome}
      onNavigateToWishlist={handleNavigateToWishlist}
      onNavigateToCheckout={handleNavigateToCheckout}
      isCartOpen={isCartOpen}
      setIsCartOpen={setIsCartOpen}
      isAuthOpen={isAuthOpen}
      setIsAuthOpen={setIsAuthOpen}
      onRemoveFromCart={handleRemoveFromCart}
      onUpdateCartQty={handleUpdateCartQty}
      onSearchSubmit={handleSearchSubmit}
      toastMessage={toastMessage}
      showToast={showToast}
      currentPath={currentPath}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      activeNavTab={activeNavTab}
      setActiveNavTab={handleNavTabChange}
    >
      {renderPageContent()}
    </Layout>
  );
}
