import { VibeUser, CurrentUserProfile, ChatThread, PricingPlan } from '../types';

export const INITIAL_CURRENT_USER: CurrentUserProfile = {
  id: 'me',
  name: 'Devika Patel',
  age: 25,
  gender: 'female',
  location: 'Indiranagar, Bengaluru',
  profession: 'Brand Strategist & Creative',
  bio: 'Big on cold brew, rooftop film screenings, analog photography, and spontaneous weekend road trips to Coorg. Looking for good energy and genuine chemistry.',
  likes: ['Cold Brew', 'Analog Photography', 'House Music', 'Rooftop Cafes', 'Trekking', 'Indie Gigs'],
  photo: '/src/assets/images/match_ananya_portrait_1792045969038.jpg',
  isVIP: true,
  isFreeGirlVIP: true,
  isFaceVerified: true,
  verifiedGender: 'female',
  vipExpiry: 'Lifetime Free VIP (Girl Power Access)'
};

export const AVAILABLE_LIKES_TAGS = [
  'Cold Brew',
  'House Music',
  'Indie Gigs',
  'Analog Photography',
  'Rooftop Cafes',
  'Trekking',
  'Vinyl Records',
  'Late Night Drives',
  'Street Food Hopping',
  'Bouldering',
  'Board Games',
  'Sci-Fi Novels',
  'Dog Lover',
  'Cat Person',
  'Art Galleries',
  'Standup Comedy',
  'Badminton',
  'Pilates & Yoga',
  'Techno Nights',
  'Craft Beer'
];

export const MOCK_USERS: VibeUser[] = [
  {
    id: 'user-zoya',
    name: 'Zoya Akhtar',
    age: 24,
    gender: 'female',
    location: 'Bandra West, Mumbai',
    profession: 'UX Designer & Visual Artist',
    photos: ['/src/assets/images/vibe_zoya_portrait_1792050775172.jpg'],
    bio: 'Designing apps by day, hunting down aesthetic sourdough bakeries by weekend. If you have Spotify playlists with obscure Japanese city pop, we will get along instantly.',
    likes: ['Coffee Cupping', 'Art Galleries', 'Indie Gigs', 'Vinyl Records', 'Late Night Drives'],
    isOnline: true,
    lastActive: 'Active now',
    distance: '3 km away',
    statusVibe: '☕ Looking for cozy cafe talks',
    likedMe: true,
    visitedAt: '12 mins ago'
  },
  {
    id: 'user-kabir',
    name: 'Kabir Roy',
    age: 27,
    gender: 'male',
    location: 'Koramangala, Bengaluru',
    profession: 'Music Producer & Guitarist',
    photos: ['/src/assets/images/vibe_kabir_portrait_1792050777775.jpg'],
    bio: 'Always got my acoustic guitar in the backseat. Big fan of sunset runs, filter coffee with chicory, and debating Nolan movie endings over craft beer.',
    likes: ['House Music', 'Late Night Drives', 'Trekking', 'Craft Beer', 'Dog Lover'],
    isOnline: true,
    lastActive: 'Active now',
    distance: '1.5 km away',
    statusVibe: '🎧 Anyone up for live gig this Friday?',
    likedMe: true,
    visitedAt: '25 mins ago'
  },
  {
    id: 'user-tanya',
    name: 'Tanya Sen',
    age: 26,
    gender: 'female',
    location: 'Hauz Khas, New Delhi',
    profession: 'Tech Lead & Pottery Enthusiast',
    photos: ['/src/assets/images/vibe_tanya_portrait_1792050778952.jpg'],
    bio: 'Minimalist mindset with a maximalist love for indoor plants and street food. Looking for someone who can match my banter and loves long heritage walks.',
    likes: ['Rooftop Cafes', 'Street Food Hopping', 'Art Galleries', 'Board Games', 'Cat Person'],
    isOnline: false,
    lastActive: 'Active 18m ago',
    distance: '4 km away',
    statusVibe: '🌿 Repotting monsteras and making matcha',
    likedMe: false,
    visitedAt: '1 hour ago'
  },
  {
    id: 'user-dev',
    name: 'Dev Mathur',
    age: 28,
    gender: 'male',
    location: 'Jubilee Hills, Hyderabad',
    profession: 'Architectural Photographer',
    photos: ['/src/assets/images/vibe_dev_portrait_1792050778918.jpg'],
    bio: 'I capture shadows and brutalist structures. On days off, you will find me cooking artisanal pasta from scratch or camping under dark skies.',
    likes: ['Analog Photography', 'Trekking', 'Sci-Fi Novels', 'Late Night Drives', 'Craft Beer'],
    isOnline: true,
    lastActive: 'Active now',
    distance: '5 km away',
    statusVibe: '📸 Scouting golden hour spots in the old city',
    likedMe: true,
    visitedAt: '3 hours ago'
  },
  {
    id: 'user-meera',
    name: 'Meera Nair',
    age: 27,
    gender: 'female',
    location: 'Indiranagar, Bengaluru',
    profession: 'Pediatric Consultant',
    photos: ['/src/assets/images/match_meera_portrait_1792045968754.jpg'],
    bio: 'Calm energy with a goofy sense of humor. Weekends are reserved for badminton tournaments, classical vocals, and trying new sourdough toast spots.',
    likes: ['Badminton', 'Cold Brew', 'Standup Comedy', 'Indie Gigs', 'Dog Lover'],
    isOnline: true,
    lastActive: 'Active now',
    distance: '2 km away',
    statusVibe: '🏸 Playing badminton at Domlur court',
    likedMe: false,
    visitedAt: '4 hours ago'
  },
  {
    id: 'user-rohan',
    name: 'Rohan Mehta',
    age: 29,
    gender: 'male',
    location: 'Khar, Mumbai',
    profession: 'Fintech Founder',
    photos: ['/src/assets/images/match_rohan_portrait_1792045969419.jpg'],
    bio: 'Building products that scale. Marathon trainee, coffee snob, and occasional vinyl collector. Let us swap favorite travel stories over flat whites.',
    likes: ['Cold Brew', 'Vinyl Records', 'Bouldering', 'Late Night Drives'],
    isOnline: false,
    lastActive: 'Active 2h ago',
    distance: '6 km away',
    statusVibe: '🏃 Training for half marathon',
    likedMe: true,
    visitedAt: 'Yesterday'
  },
  {
    id: 'user-arjun',
    name: 'Arjun Kapoor',
    age: 30,
    gender: 'male',
    location: 'Cyber City, Gurugram',
    profession: 'Design Director',
    photos: ['/src/assets/images/match_arjun_portrait_1792045969682.jpg'],
    bio: 'Typography geek, collector of vintage timepieces, and avid home cook. Seeking someone genuine who values deep conversations as much as silly memes.',
    likes: ['Art Galleries', 'Craft Beer', 'Sci-Fi Novels', 'Vinyl Records', 'Dog Lover'],
    isOnline: true,
    lastActive: 'Active now',
    distance: '7 km away',
    statusVibe: '🍷 Cooking sourdough pizza tonight',
    likedMe: false,
    visitedAt: 'Yesterday'
  }
];

export const INITIAL_CHAT_THREADS: ChatThread[] = [
  {
    id: 'thread-zoya',
    userId: 'user-zoya',
    lastMessage: 'Totally agree! That cafe on 16th road makes the best cinnamon cruffins.',
    lastMessageTime: '10:45 AM',
    unreadCount: 1,
    isRequest: false,
    messages: [
      {
        id: 'msg-z1',
        threadId: 'thread-zoya',
        senderId: 'user-zoya',
        text: 'Hey Devika! Loved your vibe and that analog camera shot on your profile.',
        timestamp: 'Yesterday, 8:12 PM',
        isRead: true
      },
      {
        id: 'msg-z2',
        threadId: 'thread-zoya',
        senderId: 'me',
        text: 'Thank you Zoya! That was shot on an Olympus OM-1 during a trek. What camera do you shoot with?',
        timestamp: 'Yesterday, 8:40 PM',
        isRead: true
      },
      {
        id: 'msg-z3',
        threadId: 'thread-zoya',
        senderId: 'user-zoya',
        text: 'Totally agree! That cafe on 16th road makes the best cinnamon cruffins. We should check it out sometime this week!',
        timestamp: '10:45 AM',
        isRead: false
      }
    ]
  },
  {
    id: 'thread-kabir-req',
    userId: 'user-kabir',
    lastMessage: 'Hey! Saw you like House Music & live gigs. Fred Again just dropped a new live set, let me know if you want the link!',
    lastMessageTime: '11:15 AM',
    unreadCount: 1,
    isRequest: true,
    requestStatus: 'pending',
    messages: [
      {
        id: 'msg-k1',
        threadId: 'thread-kabir-req',
        senderId: 'user-kabir',
        text: 'Hey! Saw you like House Music & live gigs. Fred Again just dropped a new live set, let me know if you want the link!',
        timestamp: '11:15 AM',
        isRead: false
      }
    ]
  },
  {
    id: 'thread-dev-req',
    userId: 'user-dev',
    lastMessage: 'Hi Devika! Your rooftop coffee recommendations look top tier. Would love to connect and exchange photo notes.',
    lastMessageTime: 'Yesterday',
    unreadCount: 1,
    isRequest: true,
    requestStatus: 'pending',
    messages: [
      {
        id: 'msg-d1',
        threadId: 'thread-dev-req',
        senderId: 'user-dev',
        text: 'Hi Devika! Your rooftop coffee recommendations look top tier. Would love to connect and exchange photo notes.',
        timestamp: 'Yesterday, 6:30 PM',
        isRead: false
      }
    ]
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: '1_month',
    duration: '1 Month',
    price: 399,
    formattedPrice: '₹399',
    perMonth: '₹399/mo',
    savings: undefined
  },
  {
    id: '3_months',
    duration: '3 Months',
    price: 1199,
    formattedPrice: '₹1,199',
    perMonth: '₹399/mo',
    savings: 'Save 15%',
    popular: true
  },
  {
    id: '6_months',
    duration: '6 Months',
    price: 2299,
    formattedPrice: '₹2,299',
    perMonth: '₹383/mo',
    savings: 'Save 25%'
  },
  {
    id: '1_year',
    duration: '1 Year',
    price: 4999,
    formattedPrice: '₹4,999',
    perMonth: '₹416/mo',
    savings: 'Save 30%'
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif-1',
    type: 'visitor' as const,
    title: 'New Profile Visitor',
    description: 'Zoya Akhtar visited your profile and checked your vibe!',
    timestamp: '12 mins ago',
    avatar: '/src/assets/images/vibe_zoya_portrait_1792050775172.jpg',
    userId: 'user-zoya',
    isRead: false
  },
  {
    id: 'notif-2',
    type: 'message' as const,
    title: 'New Message Received',
    description: 'Dev Sen sent you a message request: "Hi Devika! Your rooftop coffee..."',
    timestamp: 'Yesterday',
    avatar: '/src/assets/images/vibe_dev_portrait_1792050778918.jpg',
    userId: 'user-dev',
    threadId: 'thread-dev-req',
    isRead: false
  },
  {
    id: 'notif-3',
    type: 'visitor' as const,
    title: 'New Profile Visitor',
    description: 'Kabir Roy visited your profile 35 mins ago.',
    timestamp: '35 mins ago',
    avatar: '/src/assets/images/vibe_kabir_portrait_1792050777775.jpg',
    userId: 'user-kabir',
    isRead: true
  }
];
