const sampleListings = [
  {
    title: "Cozy Beachfront Cottage",
    description:
      "Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach.",
    image:
      "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    price: 1500,
    location: "Malibu",
    country: "United States",
    reviews: [
      {
        comment: "Great stay, wonderful service!",
        rating: 5,
        createdAt: "2023-10-15T10:30:00.000Z",
      },
      {
        comment: "Enjoyed the amenities, but room cleanliness could improve.",
        rating: 4,
        createdAt: "2023-09-20T14:45:00.000Z",
      },
      {
        comment: "Average experience, nothing exceptional.",
        rating: 3,
        createdAt: "2023-11-05T08:00:00.000Z",
      },
    ],
  },
  {
    title: "Mountain Retreat",
    description:
      "Unplug and unwind in this peaceful mountain cabin. Surrounded by nature, it's a perfect place to recharge.",
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    price: 1000,
    location: "Aspen",
    country: "United States",
    reviews: [
      {
        comment: "Beautiful location but service was lacking.",
        rating: 3,
        createdAt: "2023-08-18T19:20:00.000Z",
      },
      {
        comment: "Outstanding amenities and exceptional staff!",
        rating: 5,
        createdAt: "2023-12-01T12:00:00.000Z",
      },
      {
        comment: "Adequate stay, nothing to complain about.",
        rating: 4,
        createdAt: "2023-06-25T16:30:00.000Z",
      },
    ],
  },
  {
    title: "Historic Villa in Tuscany",
    description:
      "Experience the charm of Tuscany in this beautifully restored villa. Explore the rolling hills and vineyards.",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    price: 2500,
    location: "Florence",
    country: "Italy",
    reviews: [
      {
        comment: "Disappointing experience overall.",
        rating: 2,
        createdAt: "2023-07-08T09:45:00.000Z",
      },
      {
        comment: "Good location but room service needs improvement.",
        rating: 3,
        createdAt: "2023-09-10T11:20:00.000Z",
      },
      {
        comment: "Lovely stay, friendly staff!",
        rating: 4,
        createdAt: "2023-08-05T08:00:00.000Z",
      },
    ],
  },
  {
    title: "Secluded Treehouse Getaway",
    description:
      "Live among the treetops in this unique treehouse retreat. A true nature lover's paradise.",
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    price: 800,
    location: "Portland",
    country: "United States",
    reviews: [
      {
        comment: "Exceptional service, highly recommended!",
        rating: 5,
        createdAt: "2023-12-12T14:00:00.000Z",
      },
      {
        comment: "Average amenities, good for a short stay.",
        rating: 3,
        createdAt: "2023-11-20T17:30:00.000Z",
      },
      {
        comment: "Exquisite experience, will definitely return!",
        rating: 5,
        createdAt: "2023-10-08T10:00:00.000Z",
      },
    ],
  },
  {
    title: "Beachfront Paradise",
    description:
      "Step out of your door onto the sandy beach. This beachfront condo offers the ultimate relaxation.",
    image:
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    price: 2000,
    location: "Cancun",
    country: "Mexico",
    reviews: [
      {
        comment: "Decent stay, could be better.",
        rating: 3,
        createdAt: "2023-09-18T20:45:00.000Z",
      },
      {
        comment: "Amazing service, exceeded expectations!",
        rating: 5,
        createdAt: "2023-07-30T15:15:00.000Z",
      },
      {
        comment: "Good overall experience, recommended for families.",
        rating: 4,
        createdAt: "2023-11-28T12:30:00.000Z",
      },
    ],
  },
  {
    title: "Rustic Cabin by the Lake",
    description:
      "Spend your days fishing and kayaking on the serene lake. This cozy cabin is perfect for outdoor enthusiasts.",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    price: 900,
    location: "Lake Tahoe",
    country: "United States",
    reviews: [
      {
        comment: "Satisfactory stay, nothing extraordinary.",
        rating: 3,
        createdAt: "2023-12-05T09:00:00.000Z",
      },
      {
        comment: "Above-average amenities, pleasant stay overall.",
        rating: 4,
        createdAt: "2023-10-22T08:30:00.000Z",
      },
      {
        comment: "Loved the location, but the room needed maintenance.",
        rating: 3,
        createdAt: "2023-08-12T14:45:00.000Z",
      },
    ],
  },
  {
    title: "Luxury Penthouse with City Views",
    description:
      "Indulge in luxury living with panoramic city views from this stunning penthouse apartment.",
    image:
      "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2t5JTIwdmFjYXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    price: 3500,
    location: "Los Angeles",
    country: "United States",
    reviews: [
      {
        comment: "Exceptional service and amenities!",
        rating: 5,
        createdAt: "2023-07-05T11:00:00.000Z",
      },
      {
        comment: "Below-average experience, wouldn't recommend.",
        rating: 2,
        createdAt: "2023-06-18T10:30:00.000Z",
      },
      {
        comment: "Good stay, attentive staff!",
        rating: 4,
        createdAt: "2023-09-15T16:00:00.000Z",
      },
    ],
  },
  {
    title: "Ski-In/Ski-Out Chalet",
    description:
      "Hit the slopes right from your doorstep in this ski-in/ski-out chalet in the Swiss Alps.",
    image:
      "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNreSUyMHZhY2F0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    price: 3000,
    location: "Verbier",
    country: "Switzerland",
    reviews: [
      {
        comment: "An okay experience, nothing stood out.",
        rating: 3,
        createdAt: "2023-10-30T19:45:00.000Z",
      },
      {
        comment: "Lovely amenities, great for relaxation!",
        rating: 4,
        createdAt: "2023-11-10T14:00:00.000Z",
      },
      {
        comment: "Poor service, disappointing stay.",
        rating: 2,
        createdAt: "2023-08-08T08:30:00.000Z",
      },
    ],
  },
  {
    title: "Safari Lodge in the Serengeti",
    description:
      "Experience the thrill of the wild in a comfortable safari lodge. Witness the Great Migration up close.",
    image:
      "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    price: 4000,
    location: "Serengeti National Park",
    country: "Tanzania",
    reviews: [
      {
        comment: "Beautiful property, needs better maintenance.",
        rating: 3,
        createdAt: "2023-12-20T10:15:00.000Z",
      },
      {
        comment: "Exceptional stay, every detail was perfect!",
        rating: 5,
        createdAt: "2023-09-25T12:00:00.000Z",
      },
      {
        comment: "Average experience, good for a short trip.",
        rating: 3,
        createdAt: "2023-07-18T09:30:00.000Z",
      },
    ],
  },
  {
    title: "Historic Canal House",
    description:
      "Stay in a piece of history in this beautifully preserved canal house in Amsterdam's iconic district.",
    image:
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FtcGluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    price: 1800,
    location: "Amsterdam",
    country: "Netherlands",
    reviews: [
      {
        comment: "Lovely location, but service was lacking.",
        rating: 3,
        createdAt: "2023-10-05T15:00:00.000Z",
      },
      {
        comment: "Outstanding service and amenities!",
        rating: 5,
        createdAt: "2023-11-22T11:30:00.000Z",
      },
      {
        comment: "Disappointing stay overall.",
        rating: 2,
        createdAt: "2023-12-08T08:00:00.000Z",
      },
    ],
  },
  {
    title: "Private Island Retreat",
    description:
      "Have an entire island to yourself for a truly exclusive and unforgettable vacation experience.",
    image:
      "https://images.unsplash.com/photo-1618140052121-39fc6db33972?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bG9kZ2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    price: 10000,
    location: "Fiji",
    country: "Fiji",
    reviews: [
      {
        comment: "Good amenities, average service.",
        rating: 3,
        createdAt: "2023-09-03T13:45:00.000Z",
      },
      {
        comment: "Pleasant stay, would visit again.",
        rating: 4,
        createdAt: "2023-08-28T16:15:00.000Z",
      },
      {
        comment: "Decent service, location was fantastic!",
        rating: 4,
        createdAt: "2023-10-18T09:00:00.000Z",
      },
    ],
  },
  {
    title: "Charming Cottage in the Cotswolds",
    description:
      "Escape to the picturesque Cotswolds in this quaint and charming cottage with a thatched roof.",
    image:
      "https://images.unsplash.com/photo-1602088113235-229c19758e9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmVhY2glMjB2YWNhdGlvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    price: 1200,
    location: "Cotswolds",
    country: "United Kingdom",
    reviews: [
      {
        comment: "Average experience, nothing exceptional.",
        rating: 3,
        createdAt: "2023-11-15T12:30:00.000Z",
      },
      {
        comment: "Beautiful property, disappointing service.",
        rating: 3,
        createdAt: "2023-12-10T18:00:00.000Z",
      },
      {
        comment: "Exceptional stay, everything was perfect!",
        rating: 5,
        createdAt: "2023-09-12T10:45:00.000Z",
      },
    ],
  },
  {
    title: "Historic Brownstone in Boston",
    description:
      "Step back in time in this elegant historic brownstone located in the heart of Boston.",
    image:
      "https://images.unsplash.com/photo-1533619239233-6280475a633a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNreSUyMHZhY2F0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    price: 2200,
    location: "Boston",
    country: "United States",
    reviews: [
      {
        comment: "Average amenities, but fantastic views!",
        rating: 3,
        createdAt: "2023-08-20T14:00:00.000Z",
      },
      {
        comment: "Great service, lovely stay overall!",
        rating: 4,
        createdAt: "2023-10-01T11:30:00.000Z",
      },
      {
        comment: "Below-average experience, wouldn't recommend.",
        rating: 2,
        createdAt: "2023-12-28T08:45:00.000Z",
      },
    ],
  },
  {
    title: "Beachfront Bungalow in Bali",
    description:
      "Relax on the sandy shores of Bali in this beautiful beachfront bungalow with a private pool.",
    image:
      "https://images.unsplash.com/photo-1602391833977-358a52198938?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGNhbXBpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    price: 1800,
    location: "Bali",
    country: "Indonesia",
    reviews: [
      {
        comment: "Average stay, good for a short trip.",
        rating: 3,
        createdAt: "2023-07-25T16:00:00.000Z",
      },
      {
        comment: "Good location, service needs improvement.",
        rating: 3,
        createdAt: "2023-09-08T09:15:00.000Z",
      },
      {
        comment: "Lovely amenities, satisfactory stay!",
        rating: 4,
        createdAt: "2023-11-02T14:30:00.000Z",
      },
    ],
  },
  {
    title: "Mountain View Cabin in Banff",
    description:
      "Enjoy breathtaking mountain views from this cozy cabin in the Canadian Rockies.",
    image:
      "https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    price: 1500,
    location: "Banff",
    country: "Canada",
    reviews: [
      {
        comment: "Disappointing service, average amenities.",
        rating: 2,
        createdAt: "2023-08-15T08:00:00.000Z",
      },
      {
        comment: "Beautiful property, lackluster service.",
        rating: 3,
        createdAt: "2023-12-25T10:45:00.000Z",
      },
      {
        comment: "Exceptional stay, exceeded expectations!",
        rating: 5,
        createdAt: "2023-09-30T12:30:00.000Z",
      },
    ],
  },
  {
    title: "Art Deco Apartment in Miami",
    description:
      "Step into the glamour of the 1920s in this stylish Art Deco apartment in South Beach.",
    image:
      "https://plus.unsplash.com/premium_photo-1670963964797-942df1804579?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    price: 1600,
    location: "Miami",
    country: "United States",
    reviews: [
      {
        comment: "Average amenities, satisfactory service.",
        rating: 3,
        createdAt: "2023-07-22T08:45:00.000Z",
      },
      {
        comment: "Good stay, great location!",
        rating: 4,
        createdAt: "2023-10-10T14:00:00.000Z",
      },
      {
        comment: "Average experience, nothing extraordinary.",
        rating: 3,
        createdAt: "2023-11-20T10:15:00.000Z",
      },
    ],
  },
  {
    title: "Tropical Villa in Phuket",
    description:
      "Escape to a tropical paradise in this luxurious villa with a private infinity pool in Phuket.",
    image:
      "https://images.unsplash.com/photo-1470165301023-58dab8118cc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    price: 3000,
    location: "Phuket",
    country: "Thailand",
    reviews: [
      {
        comment: "Beautiful property, service was lacking.",
        rating: 3,
        createdAt: "2023-12-15T12:00:00.000Z",
      },
      {
        comment: "Exceptional stay, every detail was perfect!",
        rating: 5,
        createdAt: "2023-09-10T14:45:00.000Z",
      },
      {
        comment: "Great service and comfortable stay.",
        rating: 4,
        createdAt: "2023-10-15T08:30:00.000Z",
      },
    ],
  },
  {
    title: "Historic Castle in Scotland",
    description:
      "Live like royalty in this historic castle in the Scottish Highlands. Explore the rugged beauty of the area.",
    image:
      "https://images.unsplash.com/photo-1585543805890-6051f7829f98?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGJlYWNoJTIwdmFjYXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    price: 4000,
    location: "Scottish Highlands",
    country: "United Kingdom",
    reviews: [
      {
        comment: "Exceptional experience, highly recommended!",
        rating: 5,
        createdAt: "2023-09-20T14:45:00.000Z",
      },
      {
        comment: "Decent place but could improve on cleanliness.",
        rating: 3,
        createdAt: "2023-11-05T11:00:00.000Z",
      },
      {
        comment: "Beautiful location with friendly staff.",
        rating: 4,
        createdAt: "2023-08-18T19:20:00.000Z",
      },
    ],
  },
  {
    title: "Desert Oasis in Dubai",
    description:
      "Experience luxury in the middle of the desert in this opulent oasis in Dubai with a private pool.",
    image:
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZHViYWl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    price: 5000,
    location: "Dubai",
    country: "United Arab Emirates",
    reviews: [
      {
        comment: "Fantastic amenities and stunning views!",
        rating: 5,
        createdAt: "2023-12-01T10:00:00.000Z",
      },
      {
        comment: "Disappointing stay, poor service.",
        rating: 2,
        createdAt: "2023-07-28T15:30:00.000Z",
      },
      {
        comment: "Lovely ambiance, but overpriced for the service.",
        rating: 3,
        createdAt: "2023-06-10T09:45:00.000Z",
      },
    ],
  },
  {
    title: "Rustic Log Cabin in Montana",
    description:
      "Unplug and unwind in this cozy log cabin surrounded by the natural beauty of Montana.",
    image:
      "https://images.unsplash.com/photo-1586375300773-8384e3e4916f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    price: 1100,
    location: "Montana",
    country: "United States",
    reviews: [
      {
        comment: "A memorable experience, will definitely return!",
        rating: 5,
        createdAt: "2023-05-05T17:00:00.000Z",
      },
      {
        comment: "Pleasant stay, courteous staff.",
        rating: 4,
        createdAt: "2023-04-22T13:15:00.000Z",
      },
      {
        comment: "Average accommodation, nothing extraordinary.",
        rating: 3,
        createdAt: "2023-03-18T08:30:00.000Z",
      },
    ],
  },
  {
    title: "Beachfront Villa in Greece",
    description:
      "Enjoy the crystal-clear waters of the Mediterranean in this beautiful beachfront villa on a Greek island.",
    image:
      "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dmlsbGF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    price: 2500,
    location: "Mykonos",
    country: "Greece",
    reviews: [
      {
        comment: "Outstanding hospitality, a truly luxurious experience!",
        rating: 5,
        createdAt: "2023-02-14T11:45:00.000Z",
      },
      {
        comment: "Satisfactory stay with good amenities.",
        rating: 4,
        createdAt: "2023-01-09T09:00:00.000Z",
      },
      {
        comment: "Poor service quality and disappointing experience.",
        rating: 2,
        createdAt: "2022-12-25T12:30:00.000Z",
      },
    ],
  },
  {
    title: "Eco-Friendly Treehouse Retreat",
    description:
      "Stay in an eco-friendly treehouse nestled in the forest. It's the perfect escape for nature lovers.",
    image:
      "https://images.unsplash.com/photo-1488462237308-ecaa28b729d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c2t5JTIwdmFjYXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    price: 750,
    location: "Costa Rica",
    country: "Costa Rica",
    reviews: [
      {
        comment: "An okay place for a short stay.",
        rating: 3,
        createdAt: "2022-11-30T14:45:00.000Z",
      },
      {
        comment: "Exceptional service, worth every penny!",
        rating: 5,
        createdAt: "2022-10-27T18:00:00.000Z",
      },
      {
        comment: "Cozy atmosphere, could improve on amenities.",
        rating: 3,
        createdAt: "2022-09-22T08:15:00.000Z",
      },
    ],
  },
  {
    title: "Historic Cottage in Charleston",
    description:
      "Experience the charm of historic Charleston in this beautifully restored cottage with a private garden.",
    image:
      "https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    price: 1600,
    location: "Charleston",
    country: "United States",
    reviews: [
      {
        comment: "Excellent stay, stunning views!",
        rating: 5,
        createdAt: "2022-08-18T10:30:00.000Z",
      },
      {
        comment: "Average experience, needs better maintenance.",
        rating: 3,
        createdAt: "2022-07-14T15:45:00.000Z",
      },
      {
        comment: "Exceptional service, truly memorable!",
        rating: 5,
        createdAt: "2022-06-10T17:00:00.000Z",
      },
    ],
  },
  {
    title: "Modern Apartment in Tokyo",
    description:
      "Explore the vibrant city of Tokyo from this modern and centrally located apartment.",
    image:
      "https://images.unsplash.com/photo-1480796927426-f609979314bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHRva3lvfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    price: 2000,
    location: "Tokyo",
    country: "Japan",
    reviews: [
      {
        comment: "Good location but lacking in service quality.",
        rating: 3,
        createdAt: "2022-05-05T12:00:00.000Z",
      },
      {
        comment: "Great hospitality, exceeded expectations.",
        rating: 4,
        createdAt: "2022-04-01T09:30:00.000Z",
      },
      {
        comment: "Poorly maintained, disappointing stay.",
        rating: 2,
        createdAt: "2022-03-02T08:15:00.000Z",
      },
    ],
  },
  {
    title: "Lakefront Cabin in New Hampshire",
    description:
      "Spend your days by the lake in this cozy cabin in the scenic White Mountains of New Hampshire.",
    image:
      "https://images.unsplash.com/photo-1578645510447-e20b4311e3ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fGNhbXBpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    price: 1200,
    location: "New Hampshire",
    country: "United States",
    reviews: [
      {
        comment: "Comfortable stay, helpful staff.",
        rating: 4,
        createdAt: "2022-02-01T11:00:00.000Z",
      },
      {
        comment: "Overpriced for the quality of service.",
        rating: 3,
        createdAt: "2022-01-01T13:45:00.000Z",
      },
      {
        comment: "Exceptional experience, highly recommend!",
        rating: 5,
        createdAt: "2021-12-01T16:30:00.000Z",
      },
    ],
  },
  {
    title: "Luxury Villa in the Maldives",
    description:
      "Indulge in luxury in this overwater villa in the Maldives with stunning views of the Indian Ocean.",
    image:
      "https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGFrZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    price: 6000,
    location: "Maldives",
    country: "Maldives",
    reviews: [
      {
        comment: "Adequate stay, needs improvement in cleanliness.",
        rating: 3,
        createdAt: "2021-11-01T18:45:00.000Z",
      },
      {
        comment: "Excellent service, splendid location!",
        rating: 5,
        createdAt: "2021-10-02T14:00:00.000Z",
      },
      {
        comment: "Disappointing stay, won't return.",
        rating: 2,
        createdAt: "2021-09-05T12:15:00.000Z",
      },
    ],
  },
  {
    title: "Ski Chalet in Aspen",
    description:
      "Hit the slopes in style with this luxurious ski chalet in the world-famous Aspen ski resort.",
    image:
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGxha2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    price: 4000,
    location: "Aspen",
    country: "United States",
    reviews: [
      {
        comment: "Pleasant ambiance, average service.",
        rating: 3,
        createdAt: "2021-08-09T09:30:00.000Z",
      },
      {
        comment: "Exceptional hospitality and amenities!",
        rating: 5,
        createdAt: "2021-07-13T08:00:00.000Z",
      },
      {
        comment: "Average experience, nothing special.",
        rating: 3,
        createdAt: "2021-06-18T10:45:00.000Z",
      },
    ],
  },
  {
    title: "Secluded Beach House in Costa Rica",
    description:
      "Escape to a secluded beach house on the Pacific coast of Costa Rica. Surf, relax, and unwind.",
    image:
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhY2glMjBob3VzZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    price: 1800,
    location: "Costa Rica",
    country: "Costa Rica",
    reviews: [
      {
        comment: "Great location, needs improvement in service.",
        rating: 4,
        createdAt: "2021-05-22T14:20:00.000Z",
      },
      {
        comment: "Fantastic stay, exceeded expectations!",
        rating: 5,
        createdAt: "2021-04-25T18:00:00.000Z",
      },
      {
        comment: "Good service, but cleanliness was lacking.",
        rating: 3,
        createdAt: "2021-03-30T15:30:00.000Z",
      },
    ],
  },
];
const reviews = [
  {
    comment: "Great stay, wonderful service!",
    rating: 5,
    createdAt: "2023-10-15T10:30:00.000Z",
  },
  {
    comment: "Enjoyed the amenities, but room cleanliness could improve.",
    rating: 4,
    createdAt: "2023-09-20T14:45:00.000Z",
  },
  {
    comment: "Average experience, nothing exceptional.",
    rating: 3,
    createdAt: "2023-11-05T08:00:00.000Z",
  },
  {
    comment: "Beautiful location but service was lacking.",
    rating: 3,
    createdAt: "2023-08-18T19:20:00.000Z",
  },
  {
    comment: "Outstanding amenities and exceptional staff!",
    rating: 5,
    createdAt: "2023-12-01T12:00:00.000Z",
  },
  {
    comment: "Adequate stay, nothing to complain about.",
    rating: 4,
    createdAt: "2023-06-25T16:30:00.000Z",
  },
  {
    comment: "Disappointing experience overall.",
    rating: 2,
    createdAt: "2023-07-08T09:45:00.000Z",
  },
  {
    comment: "Good location but room service needs improvement.",
    rating: 3,
    createdAt: "2023-09-10T11:20:00.000Z",
  },
  {
    comment: "Lovely stay, friendly staff!",
    rating: 4,
    createdAt: "2023-08-05T08:00:00.000Z",
  },
  {
    comment: "Exceptional service, highly recommended!",
    rating: 5,
    createdAt: "2023-12-12T14:00:00.000Z",
  },
  {
    comment: "Average amenities, good for a short stay.",
    rating: 3,
    createdAt: "2023-11-20T17:30:00.000Z",
  },
  {
    comment: "Exquisite experience, will definitely return!",
    rating: 5,
    createdAt: "2023-10-08T10:00:00.000Z",
  },
  {
    comment: "Decent stay, could be better.",
    rating: 3,
    createdAt: "2023-09-18T20:45:00.000Z",
  },
  {
    comment: "Amazing service, exceeded expectations!",
    rating: 5,
    createdAt: "2023-07-30T15:15:00.000Z",
  },
  {
    comment: "Good overall experience, recommended for families.",
    rating: 4,
    createdAt: "2023-11-28T12:30:00.000Z",
  },
  {
    comment: "Satisfactory stay, nothing extraordinary.",
    rating: 3,
    createdAt: "2023-12-05T09:00:00.000Z",
  },
  {
    comment: "Above-average amenities, pleasant stay overall.",
    rating: 4,
    createdAt: "2023-10-22T08:30:00.000Z",
  },
  {
    comment: "Loved the location, but the room needed maintenance.",
    rating: 3,
    createdAt: "2023-08-12T14:45:00.000Z",
  },
  {
    comment: "Exceptional service and amenities!",
    rating: 5,
    createdAt: "2023-07-05T11:00:00.000Z",
  },
  {
    comment: "Below-average experience, wouldn't recommend.",
    rating: 2,
    createdAt: "2023-06-18T10:30:00.000Z",
  },
  {
    comment: "Good stay, attentive staff!",
    rating: 4,
    createdAt: "2023-09-15T16:00:00.000Z",
  },
  {
    comment: "An okay experience, nothing stood out.",
    rating: 3,
    createdAt: "2023-10-30T19:45:00.000Z",
  },
  {
    comment: "Lovely amenities, great for relaxation!",
    rating: 4,
    createdAt: "2023-11-10T14:00:00.000Z",
  },
  {
    comment: "Poor service, disappointing stay.",
    rating: 2,
    createdAt: "2023-08-08T08:30:00.000Z",
  },
  {
    comment: "Beautiful property, needs better maintenance.",
    rating: 3,
    createdAt: "2023-12-20T10:15:00.000Z",
  },
  {
    comment: "Exceptional stay, every detail was perfect!",
    rating: 5,
    createdAt: "2023-09-25T12:00:00.000Z",
  },
  {
    comment: "Average experience, good for a short trip.",
    rating: 3,
    createdAt: "2023-07-18T09:30:00.000Z",
  },
  {
    comment: "Lovely location, but service was lacking.",
    rating: 3,
    createdAt: "2023-10-05T15:00:00.000Z",
  },
  {
    comment: "Outstanding service and amenities!",
    rating: 5,
    createdAt: "2023-11-22T11:30:00.000Z",
  },
  {
    comment: "Disappointing stay overall.",
    rating: 2,
    createdAt: "2023-12-08T08:00:00.000Z",
  },
  {
    comment: "Good amenities, average service.",
    rating: 3,
    createdAt: "2023-09-03T13:45:00.000Z",
  },
  {
    comment: "Pleasant stay, would visit again.",
    rating: 4,
    createdAt: "2023-08-28T16:15:00.000Z",
  },
  {
    comment: "Decent service, location was fantastic!",
    rating: 4,
    createdAt: "2023-10-18T09:00:00.000Z",
  },
  {
    comment: "Average experience, nothing exceptional.",
    rating: 3,
    createdAt: "2023-11-15T12:30:00.000Z",
  },
  {
    comment: "Beautiful property, disappointing service.",
    rating: 3,
    createdAt: "2023-12-10T18:00:00.000Z",
  },
  {
    comment: "Exceptional stay, everything was perfect!",
    rating: 5,
    createdAt: "2023-09-12T10:45:00.000Z",
  },
  {
    comment: "Average amenities, but fantastic views!",
    rating: 3,
    createdAt: "2023-08-20T14:00:00.000Z",
  },
  {
    comment: "Great service, lovely stay overall!",
    rating: 4,
    createdAt: "2023-10-01T11:30:00.000Z",
  },
  {
    comment: "Below-average experience, wouldn't recommend.",
    rating: 2,
    createdAt: "2023-12-28T08:45:00.000Z",
  },
  {
    comment: "Average stay, good for a short trip.",
    rating: 3,
    createdAt: "2023-07-25T16:00:00.000Z",
  },
  {
    comment: "Good location, service needs improvement.",
    rating: 3,
    createdAt: "2023-09-08T09:15:00.000Z",
  },
  {
    comment: "Lovely amenities, satisfactory stay!",
    rating: 4,
    createdAt: "2023-11-02T14:30:00.000Z",
  },
  {
    comment: "Disappointing service, average amenities.",
    rating: 2,
    createdAt: "2023-08-15T08:00:00.000Z",
  },
  {
    comment: "Beautiful property, lackluster service.",
    rating: 3,
    createdAt: "2023-12-25T10:45:00.000Z",
  },
  {
    comment: "Exceptional stay, exceeded expectations!",
    rating: 5,
    createdAt: "2023-09-30T12:30:00.000Z",
  },
  {
    comment: "Average amenities, satisfactory service.",
    rating: 3,
    createdAt: "2023-07-22T08:45:00.000Z",
  },
  {
    comment: "Good stay, great location!",
    rating: 4,
    createdAt: "2023-10-10T14:00:00.000Z",
  },
  {
    comment: "Average experience, nothing extraordinary.",
    rating: 3,
    createdAt: "2023-11-20T10:15:00.000Z",
  },
  {
    comment: "Beautiful property, service was lacking.",
    rating: 3,
    createdAt: "2023-12-15T12:00:00.000Z",
  },
  {
    comment: "Exceptional stay, every detail was perfect!",
    rating: 5,
    createdAt: "2023-09-10T14:45:00.000Z",
  },
  {
    comment: "Great service and comfortable stay.",
    rating: 4,
    createdAt: "2023-10-15T08:30:00.000Z",
  },
  {
    comment: "Exceptional experience, highly recommended!",
    rating: 5,
    createdAt: "2023-09-20T14:45:00.000Z",
  },
  {
    comment: "Decent place but could improve on cleanliness.",
    rating: 3,
    createdAt: "2023-11-05T11:00:00.000Z",
  },
  {
    comment: "Beautiful location with friendly staff.",
    rating: 4,
    createdAt: "2023-08-18T19:20:00.000Z",
  },
  {
    comment: "Fantastic amenities and stunning views!",
    rating: 5,
    createdAt: "2023-12-01T10:00:00.000Z",
  },
  {
    comment: "Disappointing stay, poor service.",
    rating: 2,
    createdAt: "2023-07-28T15:30:00.000Z",
  },
  {
    comment: "Lovely ambiance, but overpriced for the service.",
    rating: 3,
    createdAt: "2023-06-10T09:45:00.000Z",
  },
  {
    comment: "A memorable experience, will definitely return!",
    rating: 5,
    createdAt: "2023-05-05T17:00:00.000Z",
  },
  {
    comment: "Pleasant stay, courteous staff.",
    rating: 4,
    createdAt: "2023-04-22T13:15:00.000Z",
  },
  {
    comment: "Average accommodation, nothing extraordinary.",
    rating: 3,
    createdAt: "2023-03-18T08:30:00.000Z",
  },
  {
    comment: "Outstanding hospitality, a truly luxurious experience!",
    rating: 5,
    createdAt: "2023-02-14T11:45:00.000Z",
  },
  {
    comment: "Satisfactory stay with good amenities.",
    rating: 4,
    createdAt: "2023-01-09T09:00:00.000Z",
  },
  {
    comment: "Poor service quality and disappointing experience.",
    rating: 2,
    createdAt: "2022-12-25T12:30:00.000Z",
  },
  {
    comment: "An okay place for a short stay.",
    rating: 3,
    createdAt: "2022-11-30T14:45:00.000Z",
  },
  {
    comment: "Exceptional service, worth every penny!",
    rating: 5,
    createdAt: "2022-10-27T18:00:00.000Z",
  },
  {
    comment: "Cozy atmosphere, could improve on amenities.",
    rating: 3,
    createdAt: "2022-09-22T08:15:00.000Z",
  },
  {
    comment: "Excellent stay, stunning views!",
    rating: 5,
    createdAt: "2022-08-18T10:30:00.000Z",
  },
  {
    comment: "Average experience, needs better maintenance.",
    rating: 3,
    createdAt: "2022-07-14T15:45:00.000Z",
  },
  {
    comment: "Exceptional service, truly memorable!",
    rating: 5,
    createdAt: "2022-06-10T17:00:00.000Z",
  },
  {
    comment: "Good location but lacking in service quality.",
    rating: 3,
    createdAt: "2022-05-05T12:00:00.000Z",
  },
  {
    comment: "Great hospitality, exceeded expectations.",
    rating: 4,
    createdAt: "2022-04-01T09:30:00.000Z",
  },
  {
    comment: "Poorly maintained, disappointing stay.",
    rating: 2,
    createdAt: "2022-03-02T08:15:00.000Z",
  },
  {
    comment: "Comfortable stay, helpful staff.",
    rating: 4,
    createdAt: "2022-02-01T11:00:00.000Z",
  },
  {
    comment: "Overpriced for the quality of service.",
    rating: 3,
    createdAt: "2022-01-01T13:45:00.000Z",
  },
  {
    comment: "Exceptional experience, highly recommend!",
    rating: 5,
    createdAt: "2021-12-01T16:30:00.000Z",
  },
  {
    comment: "Adequate stay, needs improvement in cleanliness.",
    rating: 3,
    createdAt: "2021-11-01T18:45:00.000Z",
  },
  {
    comment: "Excellent service, splendid location!",
    rating: 5,
    createdAt: "2021-10-02T14:00:00.000Z",
  },
  {
    comment: "Disappointing stay, won't return.",
    rating: 2,
    createdAt: "2021-09-05T12:15:00.000Z",
  },
  {
    comment: "Pleasant ambiance, average service.",
    rating: 3,
    createdAt: "2021-08-09T09:30:00.000Z",
  },
  {
    comment: "Exceptional hospitality and amenities!",
    rating: 5,
    createdAt: "2021-07-13T08:00:00.000Z",
  },
  {
    comment: "Average experience, nothing special.",
    rating: 3,
    createdAt: "2021-06-18T10:45:00.000Z",
  },
  {
    comment: "Great location, needs improvement in service.",
    rating: 4,
    createdAt: "2021-05-22T14:20:00.000Z",
  },
  {
    comment: "Fantastic stay, exceeded expectations!",
    rating: 5,
    createdAt: "2021-04-25T18:00:00.000Z",
  },
  {
    comment: "Good service, but cleanliness was lacking.",
    rating: 3,
    createdAt: "2021-03-30T15:30:00.000Z",
  },
];

// let j = 0;
// while (j < 28) {
//   sampleListings[j].reviews.listing = sampleListings[j].id;
//   j++;
// }
// console.log(sampleListings);

module.exports = { sampleListings,reviews };