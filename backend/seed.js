const mongoose = require("mongoose");
const Product = require("./src/models/Product");
require("dotenv").config();

const products = [
  // --- FOOD ---
  { 
    name: "Premium Dog Kibble (5kg)", 
    description: "High protein, grain-free kibble formulated for adult dogs of all breeds.", 
    price: 8500, 
    category: "food", 
    image: "https://images.pexels.com/photos/5749774/pexels-photo-5749774.jpeg?auto=compress&cs=tinysrgb&w=500", 
    inStock: true 
  },
  { 
    name: "Organic Salmon Cat Food (3kg)", 
    description: "Rich in Omega-3 fatty acids for healthy skin and shiny cat fur.", 
    price: 4200, 
    category: "food", 
    image: "https://images.pexels.com/photos/1741205/pexels-photo-1741205.jpeg?auto=compress&cs=tinysrgb&w=500", 
    inStock: true 
  },
  { 
    name: "Puppy Growth & Nutrition Bites", 
    description: "Essential vitamins and DHA for healthy brain and bone development in puppies.", 
    price: 3500, 
    category: "food", 
    image: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=500", 
    inStock: true 
  },
  { 
    name: "Gourmet Wet Cat Pouches (Pack of 12)", 
    description: "Delicious chicken and tuna in savory gravy. 100% natural ingredients.", 
    price: 2800, 
    category: "food", 
    image: "https://images.pexels.com/photos/66885/pexels-photo-66885.jpeg?auto=compress&cs=tinysrgb&w=500", 
    inStock: true 
  },
  { 
    name: "Crunchy Rawhide Dog Treats", 
    description: "Long-lasting dental chews that reduce tartar and clean teeth naturally.", 
    price: 1200, 
    category: "food", 
    image: "https://images.pexels.com/photos/825949/pexels-photo-825949.jpeg?auto=compress&cs=tinysrgb&w=500", 
    inStock: true 
  },

  // --- TOYS ---
  { 
    name: "Heavy-Duty Rubber Chew Bone", 
    description: "Virtually indestructible rubber bone designed for aggressive chewer dogs.", 
    price: 1500, 
    category: "toys", 
    image: "https://images.pexels.com/photos/3663082/pexels-photo-3663082.jpeg?auto=compress&cs=tinysrgb&w=500", 
    inStock: true 
  },
  { 
    name: "Interactive Cat Feather Wand", 
    description: "Flexible wand with natural feathers and bell to keep your cat active.", 
    price: 850, 
    category: "toys", 
    image: "https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=500", 
    inStock: true 
  },
  { 
    name: "Triple-Knot Cotton Rope Tug Toy", 
    description: "Great for playing fetch and tug-of-war while massaging dog gums.", 
    price: 1650, 
    category: "toys", 
    image: "https://images.pexels.com/photos/4587971/pexels-photo-4587971.jpeg?auto=compress&cs=tinysrgb&w=500", 
    inStock: true 
  },
  { 
    name: "Catnip Plush Mice (Set of 3)", 
    description: "Infused with organic premium catnip to spark playtime excitement.", 
    price: 950, 
    category: "toys", 
    image: "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=500", 
    inStock: true 
  },

  // --- EQUIPMENT ---
  { 
    name: "Handcrafted Leather Dog Collar", 
    description: "Durable genuine leather collar with heavy-duty brass hardware.", 
    price: 2400, 
    category: "equipment", 
    image: "https://images.pexels.com/photos/7310226/pexels-photo-7310226.jpeg?auto=compress&cs=tinysrgb&w=500", 
    inStock: true 
  },
  { 
    name: "Orthopedic Memory Foam Pet Bed", 
    description: "Ultra-soft plush pet bed providing joint support for cats and dogs.", 
    price: 6800, 
    category: "equipment", 
    image: "https://images.pexels.com/photos/4587971/pexels-photo-4587971.jpeg?auto=compress&cs=tinysrgb&w=500", 
    inStock: true 
  },
  { 
    name: "Heavy-Duty Retractable Leash (5m)", 
    description: "Tangle-free nylon tape with quick lock & unlock thumb button.", 
    price: 2950, 
    category: "equipment", 
    image: "https://images.pexels.com/photos/7310226/pexels-photo-7310226.jpeg?auto=compress&cs=tinysrgb&w=500", 
    inStock: true 
  },
  { 
    name: "Non-Slip Stainless Steel Bowl Set", 
    description: "Set of 2 anti-tip bowls with rubber base for food and water.", 
    price: 1850, 
    category: "equipment", 
    image: "https://images.pexels.com/photos/5749774/pexels-photo-5749774.jpeg?auto=compress&cs=tinysrgb&w=500", 
    inStock: true 
  },

  // --- COSMETICS & GROOMING ---
  { 
    name: "Soothing Oatmeal Pet Shampoo (500ml)", 
    description: "Hypoallergenic formula enriched with aloe vera for dry, itchy skin.", 
    price: 1750, 
    category: "cosmetics", 
    image: "https://images.pexels.com/photos/6816858/pexels-photo-6816858.jpeg?auto=compress&cs=tinysrgb&w=500", 
    inStock: true 
  },
  { 
    name: "Organic Paw & Nose Healing Balm", 
    description: "Moisturizes, heals, and protects dry, cracked paws and snouts.", 
    price: 1450, 
    category: "cosmetics", 
    image: "https://images.pexels.com/photos/7210748/pexels-photo-7210748.jpeg?auto=compress&cs=tinysrgb&w=500", 
    inStock: true 
  },
  { 
    name: "Self-Cleaning De-Shedding Slicker Brush", 
    description: "Gently removes loose fur, knots, and dander without scratching skin.", 
    price: 1950, 
    category: "cosmetics", 
    image: "https://images.pexels.com/photos/6816858/pexels-photo-6816858.jpeg?auto=compress&cs=tinysrgb&w=500", 
    inStock: true 
  },
  { 
    name: "Lavender Pet Deodorizing Spray", 
    description: "Instantly eliminates pet odors between baths with natural essential oils.", 
    price: 1350, 
    category: "cosmetics", 
    image: "https://images.pexels.com/photos/7210748/pexels-photo-7210748.jpeg?auto=compress&cs=tinysrgb&w=500", 
    inStock: true 
  }
];

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("Connected to DB");
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log("Database seeded successfully with realistic Rupee prices!");
    process.exit(0);
  })
  .catch(err => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  });
