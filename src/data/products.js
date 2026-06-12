export const categories = [
  { name: "Hot Coffee", icon: "☕" },
  { name: "Cold Coffee", icon: "🧊" },
  { name: "Desserts", icon: "🍰" },
  { name: "Ice Cream", icon: "🍨" },
  { name: "Bakery", icon: "🥐" },
  { name: "Coffee Beans", icon: "🌱" },
  { name: "Refreshments", icon: "🥤" }
];

export const products = [
  // HOT COFFEE
  {
    id: 'hc-1',
    name: 'Espresso',
    category: 'Hot Coffee',
    description: 'A concentrated form of coffee served in small, strong shots.',
    price: 3.50,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=800&h=600&fit=crop',
    isSpecial: false,
    available: true
  },
  {
    id: 'hc-2',
    name: 'Cappuccino',
    category: 'Hot Coffee',
    description: 'Perfect balance of espresso, steamed milk, and rich foam.',
    price: 4.50,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=800&h=600&fit=crop',
    isSpecial: true,
    originalPrice: 5.50,
    available: true
  },
  {
    id: 'hc-3',
    name: 'Cafe Latte',
    category: 'Hot Coffee',
    description: 'Smooth and creamy coffee with a delicate layer of foam.',
    price: 4.00,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=800&h=600&fit=crop',
    isSpecial: false,
    available: true
  },
  {
    id: 'hc-4',
    name: 'Americano',
    category: 'Hot Coffee',
    description: 'Classic espresso diluted with hot water for a smooth finish.',
    price: 3.50,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1551030173-122aabc4489c?w=800&h=600&fit=crop',
    isSpecial: false,
    available: true
  },
  {
    id: 'hc-5',
    name: 'Mocha',
    category: 'Hot Coffee',
    description: 'Espresso combined with rich chocolate and steamed milk.',
    price: 5.00,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=800&h=600&fit=crop',
    isSpecial: false,
    available: true
  },
  {
    id: 'hc-6',
    name: 'Flat White',
    category: 'Hot Coffee',
    description: 'Espresso with microfoam (steamed milk with fine, velvety bubbles).',
    price: 4.25,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800&h=600&fit=crop',
    isSpecial: false,
    available: true
  },

  // COLD COFFEE
  {
    id: 'cc-1',
    name: 'Cold Coffee',
    category: 'Cold Coffee',
    description: 'Creamy and frothy blended cold coffee to cool you down.',
    price: 4.50,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&h=600&fit=crop',
    isSpecial: false,
    available: true
  },
  {
    id: 'cc-2',
    name: 'Iced Latte',
    category: 'Cold Coffee',
    description: 'Chilled espresso and milk over ice for a refreshing kick.',
    price: 4.75,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=800&h=600&fit=crop',
    isSpecial: false,
    available: true
  },
  {
    id: 'cc-3',
    name: 'Iced Americano',
    category: 'Cold Coffee',
    description: 'Espresso shots topped with cold water produce a light layer of crema.',
    price: 3.75,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1517959105821-eaf2591984ca?w=800&h=600&fit=crop',
    isSpecial: false,
    available: true
  },
  {
    id: 'cc-4',
    name: 'Cold Brew',
    category: 'Cold Coffee',
    description: 'Signature slow-steeped cold brew. Ultra smooth and naturally sweet.',
    price: 5.00,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=800&h=600&fit=crop',
    isSpecial: true,
    originalPrice: 6.50,
    available: true
  },
  {
    id: 'cc-5',
    name: 'Caramel Frappe',
    category: 'Cold Coffee',
    description: 'Blended caramel, coffee, milk, and ice topped with whipped cream.',
    price: 5.50,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?w=800&h=600&fit=crop',
    isSpecial: false,
    available: true
  },

  // DESSERTS
  {
    id: 'ds-1',
    name: 'Chocolate Brownie',
    category: 'Desserts',
    description: 'Warm, gooey, fudgy brownie with a rich chocolate center.',
    price: 4.00,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&h=600&fit=crop',
    isSpecial: false,
    available: true
  },
  {
    id: 'ds-2',
    name: 'Cheesecake',
    category: 'Desserts',
    description: 'Classic New York style cheesecake with a graham cracker crust.',
    price: 6.50,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800&h=600&fit=crop',
    isSpecial: false,
    available: true
  },
  {
    id: 'ds-3',
    name: 'Tiramisu',
    category: 'Desserts',
    description: 'Italian dessert made of savoiardi dipped in coffee, layered with mascarpone.',
    price: 7.00,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=800&h=600&fit=crop',
    isSpecial: false,
    available: true
  },
  {
    id: 'ds-4',
    name: 'Chocolate Pastry',
    category: 'Desserts',
    description: 'Flaky pastry filled with rich dark chocolate.',
    price: 4.50,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1603532648955-039310d9ed75?w=800&h=600&fit=crop',
    isSpecial: false,
    available: true
  },
  {
    id: 'ds-5',
    name: 'Red Velvet Cake',
    category: 'Desserts',
    description: 'Moist red velvet cake layers with cream cheese frosting.',
    price: 6.00,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?w=800&h=600&fit=crop',
    isSpecial: false,
    available: true
  },
  {
    id: 'ds-6',
    name: 'Coffee Cake',
    category: 'Desserts',
    description: 'Soft sponge cake infused with espresso and topped with walnuts.',
    price: 5.50,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?w=800&h=600&fit=crop',
    isSpecial: false,
    available: true
  },

  // ICE CREAM
  {
    id: 'ic-1',
    name: 'Vanilla Scoop',
    category: 'Ice Cream',
    description: 'Classic rich Madagascar vanilla bean ice cream.',
    price: 3.00,
    rating: 4.5,
    image: '/images/vanilla_scoop.png',
    isSpecial: false,
    available: true
  },
  {
    id: 'ic-2',
    name: 'Chocolate Scoop',
    category: 'Ice Cream',
    description: 'Double dark chocolate ice cream, extremely creamy.',
    price: 3.50,
    rating: 4.7,
    image: '/images/chocolate_scoop.png',
    isSpecial: false,
    available: true
  },
  {
    id: 'ic-3',
    name: 'Butterscotch',
    category: 'Ice Cream',
    description: 'Sweet butterscotch with crunchy praline bits.',
    price: 4.00,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=800&h=600&fit=crop',
    isSpecial: false,
    available: true
  },
  {
    id: 'ic-4',
    name: 'Belgian Chocolate',
    category: 'Ice Cream',
    description: 'Premium ice cream made with real Belgian dark chocolate.',
    price: 5.00,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1580915411954-282cb1b0d780?w=800&h=600&fit=crop',
    isSpecial: true,
    originalPrice: 6.50,
    available: true
  },
  {
    id: 'ic-5',
    name: 'Strawberry Delight',
    category: 'Ice Cream',
    description: 'Premium strawberry ice cream made with real fresh berries.',
    price: 4.50,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=800&h=600&fit=crop',
    isSpecial: false,
    available: true
  },
  {
    id: 'ic-6',
    name: 'Coffee Ice Cream',
    category: 'Ice Cream',
    description: 'Premium coffee-flavored ice cream with espresso notes.',
    price: 4.50,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1557142046-c704a3adf364?w=800&h=600&fit=crop',
    isSpecial: false,
    available: true
  },

  // BAKERY
  {
    id: 'bk-1',
    name: 'Croissant',
    category: 'Bakery',
    description: 'Buttery, flaky, and freshly baked every morning.',
    price: 3.50,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&h=600&fit=crop',
    isSpecial: false,
    available: true
  },
  {
    id: 'bk-2',
    name: 'Garlic Bread',
    category: 'Bakery',
    description: 'Oven-toasted baguette slices with garlic herb butter.',
    price: 4.00,
    rating: 4.6,
    image: '/images/garlic_bread.png',
    isSpecial: false,
    available: true
  },
  {
    id: 'bk-3',
    name: 'Blueberry Muffin',
    category: 'Bakery',
    description: 'Soft muffin packed with fresh blueberries and topped with streusel.',
    price: 3.50,
    rating: 4.7,
    image: '/images/blueberry_muffin.png',
    isSpecial: false,
    available: true
  },
  {
    id: 'bk-4',
    name: 'Choco Chip Cookies',
    category: 'Bakery',
    description: 'Warm, chewy cookies loaded with dark chocolate chips.',
    price: 2.50,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&h=600&fit=crop',
    isSpecial: false,
    available: true
  },

  // COFFEE BEANS
  {
    id: 'cb-1',
    name: 'Arabica Beans',
    category: 'Coffee Beans',
    description: 'Smooth, sweet taste with notes of chocolate and sugar.',
    price: 18.00,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=800&h=600&fit=crop',
    isSpecial: false,
    available: true
  },
  {
    id: 'cb-2',
    name: 'Robusta Beans',
    category: 'Coffee Beans',
    description: 'Strong, harsh, deep flavor profile. Double the caffeine.',
    price: 15.00,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?w=800&h=600&fit=crop',
    isSpecial: false,
    available: true
  },
  {
    id: 'cb-3',
    name: 'Premium Blend',
    category: 'Coffee Beans',
    description: 'Our secret house blend of Arabica and Robusta for the perfect espresso.',
    price: 22.00,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1611162458324-aae1eb4129a4?w=800&h=600&fit=crop',
    isSpecial: false,
    available: true
  },

  // REFRESHMENTS
  {
    id: 'rf-1',
    name: 'Lemon Mint',
    category: 'Refreshments',
    description: 'Icy cool lemonade infused with fresh mint leaves.',
    price: 4.50,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&h=600&fit=crop',
    isSpecial: false,
    available: true
  },
  {
    id: 'rf-2',
    name: 'Fresh Orange Juice',
    category: 'Refreshments',
    description: 'Freshly squeezed 100% natural orange juice.',
    price: 5.00,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=800&h=600&fit=crop',
    isSpecial: false,
    available: true
  },
  {
    id: 'rf-3',
    name: 'Watermelon Juice',
    category: 'Refreshments',
    description: 'Chilled watermelon juice, perfect for summer.',
    price: 4.50,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?w=800&h=600&fit=crop',
    isSpecial: false,
    available: true
  }
];
