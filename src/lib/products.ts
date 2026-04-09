export type Product = {
  id: number;
  name: string;
  desc: string;
  price: number;
  tag: string;
  cat: string;
  img: string;
};

export const PRODUCTS: Product[] = [
  { id: 1, name: "Red Wine & Pomegranate Soap", desc: "Revitalizing & rich in antioxidants.", price: 300, tag: "Antioxidant", cat: "Soaps", img: "/images/red_wine_soap.jpg" },
  { id: 2, name: "Detox Charcoal Camel Milk Soap", desc: "Luxuriously creamy & collagen boosting.", price: 250, tag: "Collagen", cat: "Soaps", img: "/images/charcoal_soap.jpg" },
  { id: 3, name: "Coconut Lemon \u2013 Tangy/Citrus", desc: "Made with fresh coconut milk \u2014 hydrating & anti-aging.", price: 260, tag: "Anti-Aging", cat: "Soaps", img: "/images/coconut_soap.jpg" },
  { id: 4, name: "Blueberry Menthol Cool Soap", desc: "Cooling & revitalizing, perfect after a workout.", price: 270, tag: "Cooling", cat: "Soaps", img: "/images/blueberry_soap.jpg" },
  { id: 5, name: "Peaceful Lavender Soap", desc: "Luxurious, relaxing and soothing to the senses.", price: 310, tag: "Relaxing", cat: "Soaps", img: "/images/lavender_soap.jpg" },
  { id: 6, name: "Honey & Almond Soap", desc: "Hydrating & skin nourishing, 100% pure honey.", price: 220, tag: "Nourishing", cat: "Soaps", img: "/images/honey_soap.jpg" },
  { id: 7, name: "Neem Herbal Soap", desc: "Antibacterial & anti-inflammatory, purifies skin.", price: 200, tag: "Antibacterial", cat: "Soaps", img: "/images/neem_soap.jpg" },
  { id: 8, name: "Sandalwood Soap", desc: "Reduces wrinkles & fine lines, made with sandalwood oil.", price: 310, tag: "Anti-Aging", cat: "Soaps", img: "/images/sandalwood_soap.jpg" },
  { id: 9, name: "Papaya Soap", desc: "Brightening & even skin tone, radiant glow.", price: 280, tag: "Brightening", cat: "Soaps", img: "/images/papaya_soap.jpg" },
  { id: 10, name: "Rose Shea Butter Soap", desc: "Deep nourishment, perfect for dry & sensitive skin.", price: 310, tag: "Deep Moisture", cat: "Soaps", img: "/images/rose_soap.jpg" },
  { id: 11, name: "Coffee & Oat Milk Robust", desc: "Reduces hormonal acne, rich in antioxidants.", price: 300, tag: "Antioxidant", cat: "Soaps", img: "/images/coffee_soap.jpg" },
  { id: 12, name: "Herbal VapoRub", desc: "Eucalyptus, cajeput & peppermint \u2014 clear congestion. 17g", price: 150, tag: "Herbal", cat: "Body", img: "/images/vaporub.jpg" },
  { id: 13, name: "Goat Milk & Honey Almond Lotion", desc: "Deeply nourishes, hydrates & softens skin. 120ml", price: 450, tag: "Hydrating", cat: "Body", img: "/images/lotion.jpg" },
  { id: 14, name: "Hibiscus Shampoo & Conditioner", desc: "Pearl-infused formula for silky, shiny hair. 200ml", price: 500, tag: "Pearl-Infused", cat: "Hair", img: "/images/hibiscus_shampoo.jpg" },
  { id: 15, name: "Amla & Bhringraj Shampoo & Conditioner", desc: "Prevents premature greying, controls dandruff. 200ml", price: 500, tag: "Anti-Greying", cat: "Hair", img: "/images/amla_shampoo.jpg" },
  { id: 16, name: "Strawberry Orange Shampoo & Conditioner", desc: "Strengthens follicles, reduces breakage. 200ml", price: 500, tag: "Anti-Breakage", cat: "Hair", img: "/images/strawberry_shampoo.jpg" },
  { id: 17, name: "Red Wine Hydrating Shower Gel", desc: "Antioxidants rejuvenate, improves elasticity. 200ml", price: 500, tag: "Antioxidant", cat: "Body", img: "/images/shower_gel.jpg" },
  { id: 18, name: "Rosemary Lavender Hair Oil", desc: "Strengthens roots, promotes thicker growth. 100ml", price: 350, tag: "Growth Oil", cat: "Hair", img: "/images/hair_oil.jpg" },
];

export const CATEGORIES = ["All", "Soaps", "Body", "Hair"] as const;
