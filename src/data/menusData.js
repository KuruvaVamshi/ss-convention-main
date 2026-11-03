export const extraItemCharges = [
  { item: "Welcome Drinks", price: 25 },
  { item: "Salad", price: 20 },
  { item: "Veg Starter", price: 35 },
  { item: "Paneer Starter", price: 40 },
  { item: "Chicken Starter", price: 55 },
  { item: "Veg Curry", price: 45 },
  { item: "Paneer Curry", price: 50 },
  { item: "Chicken Curry", price: 70 },
  { item: "Mutton Curry / Biryani", price: 80 },
  { item: "Fish Fry", price: 75 },
  { item: "Sweet", price: 45 }
];

export const cateringMenus = {
  veg: [
    {
      id: "regular-veg-100",
      title: "Regular Veg Menu",
      minPax: 100,
      badge: "Popular for Small Events",
      image: "/assets/03_food_and_catering_menus/menu_01_regular_veg_100pax.jpeg",
      sections: [
        { name: "Welcome Drinks (Any 1)", items: ["Watermelon Juice", "Muskmelon Juice", "Soft Drinks", "Butter Milk"] },
        { name: "Veg Starter (Any 1)", items: ["Veg Bullet", "Veg Manchurian", "Veg 65", "Crispy Vegetable"] },
        { name: "Hot Fry (Any 1)", items: ["Cut Mirchi", "Palak Pakoda", "Gobi Pakoda", "Onion Pakkoda"] },
        { name: "Veg Curries (Any 1)", items: ["Paneer Butter Masala", "Kadai Paneer", "Kadai Veg", "Veg Chatpat", "Paneer Chatpat", "Nizami Handi"] },
        { name: "Flavoured Rice (Any 1)", items: ["Veg Pulao", "Jeera Pulao", "Bagara Rice", "Corn Pulao"] },
        { name: "Bread (Any 1)", items: ["Rumali Roti"] },
        { name: "Dal (Any 1)", items: ["Palak Dal", "Tomato Dal", "Dosakaya Pappu", "Mango Dal*"] },
        { name: "Accompaniments", items: ["Plain Rice", "Sambar", "Raitha", "Papad", "Fryms", "Curd Chilly"] },
        { name: "Pickles & Chutneys (Any 1 each)", items: ["Mango / Tomato Pickle", "Tomato / Gongura Chutney", "Putnala Podi / Kandi Podi"] },
        { name: "Dessert & Ice Cream (Any 1 each)", items: ["Gulab Jamun / Kala Jamun", "Vanilla / Strawberry Ice Cream"] }
      ]
    },
    {
      id: "standard-veg-100",
      title: "Standard Veg Menu",
      minPax: 100,
      badge: "Traditional & Balanced",
      image: "/assets/03_food_and_catering_menus/menu_02_standard_veg_100pax_with_policies.jpeg",
      sections: [
        { name: "Welcome Drinks (Any 1)", items: ["Watermelon Juice", "Muskmelon Juice", "Soft Drinks", "Butter Milk"] },
        { name: "Veg Starter (Any 1)", items: ["Veg Bullet", "Veg Manchurian", "Veg 65", "Crispy Vegetable"] },
        { name: "Hot Fry (Any 1)", items: ["Cut Mirchi", "Palak Pakoda", "Gobi Pakoda", "Onion Pakkoda"] },
        { name: "Veg Curries (Any 1)", items: ["Paneer Butter Masala", "Kadai Paneer", "Kadai Veg", "Veg Chatpat", "Paneer Chatpat", "Nizami Handi"] },
        { name: "Flavoured Rice (Any 1)", items: ["Veg Pulao", "Jeera Pulao", "Bagara Rice", "Corn Pulao"] },
        { name: "Bread (Any 1)", items: ["Rumali Roti"] },
        { name: "Dal (Any 1)", items: ["Palak Dal", "Tomato Dal", "Dosakaya Pappu", "Mango Dal*"] },
        { name: "Accompaniments", items: ["Plain Rice", "Sambar", "Raitha", "Papad", "Fryms", "Curd Chilly"] },
        { name: "Traditional Pickles & Podulu", items: ["Mango / Tomato Pickle", "Tomato / Gongura Chutney", "Putnala / Kandi Podi"] },
        { name: "Sweets & Ice Cream (Any 1 each)", items: ["Gulab Jamun / Kala Jamun", "Vanilla / Strawberry Ice Cream"] }
      ]
    },
    {
      id: "premium-veg-200",
      title: "Premium Veg Menu",
      minPax: 200,
      badge: "Grand Celebrations",
      image: "/assets/03_food_and_catering_menus/menu_03_premium_veg_200pax.jpeg",
      sections: [
        { name: "Welcome Drinks (Any 1)", items: ["Butter Milk", "Assorted Soft Drinks", "Fruit Punch", "Badam Milk (Cold/Hot)", "Watermelon Juice", "Pineapple Juice"] },
        { name: "Veg Starters (Any 1)", items: ["Veg Manchuria", "Veg Bullet", "Chilli Baby Corn", "Mini Samosa / Corn Samosa"] },
        { name: "Salads (Any 1)", items: ["Green Salad", "Sprout Salad", "Aloo Chana Chat", "Peanut Chat"] },
        { name: "Hot Fry & Fry Curry (Any 1 each)", items: ["Mirchi Bajji", "Palak Pakoda", "Gobi Pakoda", "Aloo Bajji", "Bendi Fry with Peanut", "Donda Fry with Peanut", "Vankaya Green Peas Fry"] },
        { name: "Veg Curries (Any 2 - 1 Paneer + 1 Veg)", items: ["Paneer Butter Masala", "Paneer Chatpat", "Methi Chaman", "Palak Paneer", "Kadai Paneer", "Baby Corn Masala", "Bagara Baigan", "Capsicum Masala", "Tomato Munakkaya", "Mix Veg Curry", "Nizami Handi"] },
        { name: "Breads (Any 1)", items: ["Poori", "Palak Poori", "Masala Poori", "Rumali Roti", "Butter Naan", "Roti"] },
        { name: "Biryani / Pulaos (Any 1)", items: ["Veg Dum Biryani", "Bagara Rice", "Veg Pulao", "Corn Pulao", "Jeera Pulao", "Mutter Pulao"] },
        { name: "Accompaniments with Pure Ghee", items: ["Plain Rice", "Sambar", "Curd", "Raitha", "Pure Ghee", "Papad", "Fryms", "Curd Chilly"] },
        { name: "Pickles, Chutneys & Podulu", items: ["Mango / Lemon / Gongura / Tomato Pickle", "Dosakaya Mukkala Pickle", "Beerakaya / Pudina Chutney", "Putnala / Kandi Podi"] },
        { name: "Grand Sweets & Ice Cream", items: ["Gulab Jamun", "Kaddu Ka Kheer", "Double Ka Meeta", "Carrot Halwa", "Moongdal Halwa", "Ice Creams (Vanilla/Strawberry/Mango/Butterscotch)"] }
      ]
    },
    {
      id: "special-veg-250",
      title: "Special Veg Menu (with Noodles)",
      minPax: 250,
      badge: "Royal Wedding Feast",
      image: "/assets/03_food_and_catering_menus/menu_04_special_veg_250pax_noodles.jpeg",
      sections: [
        { name: "Welcome Drinks (Any 2)", items: ["Fruit Punch", "Assorted Soft Drinks", "Butter Milk", "Badam Milk (Cold/Hot)", "Watermelon Juice", "Pineapple Juice"] },
        { name: "Veg Starters (Any 2)", items: ["Veg Manchuria", "Veg Bullet", "Gobi Manchuria", "Chilli Baby Corn", "Mini Samosa / Corn Samosa"] },
        { name: "Salads (Any 2)", items: ["Green Salad", "Sprout Salad", "Aloo Chana Chat", "Peanut Chat"] },
        { name: "Hot Fry & Fry Curry (Any 1 each)", items: ["Mirchi Bajji", "Palak Pakoda", "Gobi Pakoda", "Cut Mirchi", "Bendi Fry with Peanut", "Donda Fry with Peanut", "Vankaya Green Peas Fry"] },
        { name: "Veg Curries (Any 2 - 1 Paneer + 1 Veg)", items: ["Paneer Butter Masala", "Kadai Paneer", "Methi Chaman", "Palak Paneer", "Baby Corn Masala", "Bagara Baigan", "Capsicum Masala", "Nizami Handi", "Aloo Tomato Capsicum", "Mix Veg Curry"] },
        { name: "Oriental Noodles Special", items: ["Soft Noodles", "Hakka Noodles", "Szechwan Noodles"] },
        { name: "Breads & Biryani (Any 1 each)", items: ["Poori / Palak Poori / Masala Poori / Rumali Roti / Butter Naan", "Veg Dum Biryani / Bagara Rice / Jeera Pulao / Mutter Pulao"] },
        { name: "Accompaniments with Ghee", items: ["Palak Dal / Tomato Dal / Dosakaya Pappu / Mango Dal", "Plain Rice", "Sambar", "Curd", "Pure Ghee", "Raitha", "Papad", "Fryms", "Curd Chilly"] },
        { name: "Pachhadulu, Chutneys & Podulu", items: ["Tomato / Beerakaya / Gongura / Dosakaya / Coconut / Pudina / Kothimeera Pachhadi", "Putnala Podi", "Kandi Podi"] },
        { name: "Royal Sweets & Ice Cream", items: ["Gulab Jamun", "Kala Jamun", "Kaddu Ka Kheer", "Double Ka Meeta", "Carrot Halwa", "Moongdal Halwa", "Ice Creams (Vanilla/Strawberry/Mango/Butterscotch/Pista)"] }
      ]
    }
  ],
  nonVeg: [
    {
      id: "standard-non-veg-100",
      title: "Standard Non-Veg Menu",
      minPax: 100,
      badge: "Chicken Specialties",
      image: "/assets/03_food_and_catering_menus/menu_05_standard_non_veg_100pax.jpeg",
      sections: [
        { name: "Welcome Drinks (Any 1)", items: ["Watermelon Juice", "Muskmelon Juice", "Soft Drinks", "Butter Milk"] },
        { name: "Veg Starter (Any 1)", items: ["Veg Bullet", "Veg Manchurian", "Veg 65", "Crispy Vegetable"] },
        { name: "Chicken Specialty (Any 2)", items: ["Hyderabadi Chicken Dum Biryani", "Butter Chicken", "Kadai Chicken", "Dum Ka Chicken", "Chicken Fry", "Telangana Chicken Curry"] },
        { name: "Hot Fry & Veg Curry (Any 1 each)", items: ["Cut Mirchi", "Palak Pakoda", "Gobi Pakoda", "Paneer Butter Masala", "Kadai Paneer", "Kadai Veg", "Nizami Handi"] },
        { name: "Rice & Breads (Any 1 each)", items: ["Veg Pulao", "Jeera Pulao", "Bagara Rice", "Corn Pulao", "Rumali Roti"] },
        { name: "Dal & Accompaniments", items: ["Palak Dal / Tomato Dal / Dosakaya Pappu", "Plain Rice", "Sambar", "Curd", "Raitha", "Papad", "Fryms", "Curd Chilly"] },
        { name: "Pickles, Chutneys & Desserts", items: ["Mango / Tomato Pickle", "Tomato / Gongura Chutney", "Gulab Jamun / Kala Jamun", "Vanilla / Strawberry Ice Cream"] }
      ]
    },
    {
      id: "premium-non-veg-200",
      title: "Premium Non-Veg Menu",
      minPax: 200,
      badge: "Chicken & Mutton Feast",
      image: "/assets/03_food_and_catering_menus/menu_06_premium_non_veg_200pax.jpeg",
      sections: [
        { name: "Welcome Drinks (Any 1)", items: ["Sweet Lassi", "Watermelon Juice", "Pineapple Juice", "Soft Drinks", "Badam Milk", "Fruit Punch"] },
        { name: "Veg Starter & Salads (Any 1 each)", items: ["Veg Bullet", "Veg Shanghai Rolls", "Veg Manchurian", "Gobi Manchurian", "Chilli Baby Corn", "Green Salad / Russian Salad / Peanut Chat"] },
        { name: "Non-Veg Grand Specialties (Any 2 - Chicken + Mutton)", items: ["Chicken Dum Biryani", "Mutton Dum Biryani", "Andhra Mutton", "Telangana Mutton Curry", "Kadai Mutton", "Mutton Rogan Josh", "Mutton Masala", "Gongura Mutton", "Butter Chicken", "Dum Ka Chicken", "Methi Chicken", "Chicken Fry"] },
        { name: "Hot Fry & Fry Curry (Any 1 each)", items: ["Mirchi Bajji", "Palak Pakoda", "Gobi Pakoda", "Bendi Fry with Peanut", "Donda Fry with Peanut", "Vankaya Green Peas Fry"] },
        { name: "Veg Curry, Rice & Breads", items: ["Paneer Butter Masala / Kadai Paneer / Veg Jaipuri / Nizami Handi", "Veg Dum Biryani / Bagara Rice / Paneer Peas Pulao / Kaju Paneer Pulao", "Butter Naan / Rumali Roti / Poori"] },
        { name: "Dal, Ghee & Traditional Accompaniments", items: ["Palak Dal / Dosakaya Pappu / Gongura Pappu", "Plain Rice", "Sambar", "Pure Ghee", "Plain Curd", "Raitha", "Papad", "Curd Chilly"] },
        { name: "Royal Sweets & Ice Cream", items: ["Gulab Jamun / Kala Jamun", "Kaddu Ka Kheer", "Carrot Halwa", "Double Ka Meeta", "Moongdal Halwa", "Ice Creams (Vanilla/Strawberry/Mango/Butterscotch)"] }
      ]
    },
    {
      id: "special-non-veg-250",
      title: "Special Non-Veg Royal Menu",
      minPax: 250,
      badge: "Mutton + Chicken + Fish Fry",
      image: "/assets/03_food_and_catering_menus/menu_07_special_non_veg_250pax.jpeg",
      sections: [
        { name: "Welcome Drinks (Any 2) & Non-Veg Soup (Any 1)", items: ["Fruit Punch", "Watermelon Juice", "Pineapple Juice", "Badam Milk", "Sweet Lassi", "Chicken Manchow Soup", "Chicken Hot & Sour Soup"] },
        { name: "Veg & Non-Veg Starters (Any 1 each)", items: ["Chicken 65", "Chilly Chicken", "Pepper Chicken", "Chicken Majestic", "Chicken Manchuria", "Veg Bullet", "Baby Corn Majestic", "Crispy Vegetable"] },
        { name: "Fish Specialty", items: ["Fish Fry (Boneless) - Included!"] },
        { name: "Non-Veg Royal Curries & Biryani (Any 2)", items: ["Mutton Dum Biryani", "Chicken Dum Biryani", "Andhra Mutton", "Telangana Mutton Curry", "Kadai Mutton", "Mutton Rogan Josh", "Gongura Mutton", "Butter Chicken", "Dum Ka Chicken", "Kadai Chicken", "Chicken Fry"] },
        { name: "Hot Fry, Fry Curry & Veg Curry", items: ["Mirchi Bajji / Palak Pakoda / Aloo Bajji", "Bendi Fry with Peanut / Donda Fry with Peanut", "Paneer Butter Masala / Kadai Paneer / Paneer Chatpat / Methi Chaman / Nizami Handi"] },
        { name: "Pulao / Biryani & Breads", items: ["Veg Dum Biryani / Bagara Rice / Kaju Paneer Pulao / Mushroom Corn Pulao", "Butter Naan / Plain Naan / Rumali Roti / Masala Poori"] },
        { name: "Accompaniments & Chutneys", items: ["Dal (Palak / Dosakaya / Gongura / Totakura)", "Plain Rice", "Sambar", "Pure Ghee", "Curd", "Raitha", "Papad", "Fryms", "Curd Chilly", "Tomato / Beerakaya / Gongura / Pudina Chutney", "Putnala & Kandi Podi"] },
        { name: "Royal Desserts & Premium Ice Creams", items: ["Gulab Jamun / Kala Jamun", "Kaddu Ka Kheer", "Double Ka Meeta", "Carrot Halwa", "Moongdal Halwa", "Ice Creams (Vanilla/Strawberry/Chocolate/Mango/Butterscotch/Pista)"] }
      ]
    }
  ]
};

