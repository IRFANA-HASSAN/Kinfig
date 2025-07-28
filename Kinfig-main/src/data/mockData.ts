
export interface User {
  id: string;
  name: string;
  phone: string;
  avatar: string;
  family: string;
}

export interface Story {
  id: string;
  image: string;
  time: string;
  timestamp: number;
}

export interface Moment {
  id: string;
  userId: string;
  stories: Story[];
}

export interface Comment {
  id: string;
  userId: string;
  text: string;
  time: string;
  replies?: Comment[];
}

export interface Post {
  id: string;
  userId: string;
  content: string;
  images: string[];
  videos?: string[]; // Add videos array
  likes: number;
  comments: Comment[];
  createdAt: string;
}

// Current user data
export const currentUser: User = {
  id: 'current_user',
  name: 'You',
  phone: '+919876543210',
  avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
  family: 'Your Family'
};

// Users data
export const users: User[] = [
  {
    id: '1',
    name: 'David Richard',
    phone: '+919988776655',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    family: 'Thalakam Family'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    phone: '+919988776656',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    family: 'Johnson Family'
  },
  {
    id: '3',
    name: 'Mike Chen',
    phone: '+919988776657',
    avatar: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    family: 'Chen Family'
  },
  {
    id: '4',
    name: 'Emma Wilson',
    phone: '+919988776658',
    avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    family: 'Wilson Family'
  },
  {
    id: '5',
    name: 'Alex Rodriguez',
    phone: '+919988776659',
    avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    family: 'Rodriguez Family'
  },
  {
    id: '6',
    name: 'Lisa Thompson',
    phone: '+919988776660',
    avatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    family: 'Thompson Family'
  }
];

// Stories/Moments data
export const moments: Moment[] = [
  {
    id: '1',
    userId: '1',
    stories: [
      {
        id: 's1',
        image: 'https://images.pexels.com/photos/1303081/pexels-photo-1303081.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop',
        time: '2 hours ago',
        timestamp: Date.now() - 7200000
      },
      {
        id: 's2',
        image: 'https://images.pexels.com/photos/1128318/pexels-photo-1128318.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop',
        time: '1 hour ago',
        timestamp: Date.now() - 3600000
      }
    ]
  },
  {
    id: '2',
    userId: '2',
    stories: [
      {
        id: 's3',
        image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop',
        time: '30 minutes ago',
        timestamp: Date.now() - 1800000
      }
    ]
  },
  {
    id: '3',
    userId: '3',
    stories: [
      {
        id: 's4',
        image: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop',
        time: '45 minutes ago',
        timestamp: Date.now() - 2700000
      }
    ]
  },
  {
    id: '4',
    userId: '4',
    stories: [
      {
        id: 's5',
        image: 'https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop',
        time: '1 hour ago',
        timestamp: Date.now() - 3600000
      }
    ]
  }
];

// Posts data with enhanced content
export const posts: Post[] = [
  {
    id: '1',
    userId: '1',
    content: 'Birthday Celebration amet consectetur adipiscing, nibh vestibulum diam massa. ipsum vitae nunc vulputate lorem lacinia orci, mollis vel nunc. Proin dapibus dui quis cursus ut, blandit amet consectetur nisl vestibulum euis sed ipsum vestibulum lorem nisl, sed magna adipiscing elit. quis mollis euis.',
    images: [],
    videos: [
      require('@/assets/video/video1.mp4')
    ],
    likes: 786,
    comments: [
      {
        id: 'c1',
        userId: '2',
        text: 'Amazing celebration! Looks like so much fun 🎉 Hope you had a wonderful day with family and friends!',
        time: '2 hours ago',
        replies: [
          {
            id: 'r1',
            userId: '1',
            text: 'Thank you! It was absolutely wonderful! 🎂',
            time: '1 hour ago'
          }
        ]
      },
      {
        id: 'c2',
        userId: '3',
        text: 'Wish I could have been there! Happy birthday! 🎂 The decorations look absolutely beautiful.',
        time: '1 hour ago'
      },
      {
        id: 'c3',
        userId: '4',
        text: 'Beautiful family gathering ❤️ These are the moments that matter most in life.',
        time: '30 minutes ago'
      },
      {
        id: 'c4',
        userId: '5',
        text: 'Such joy and happiness in these photos! Blessed to have such wonderful family moments.',
        time: '15 minutes ago'
      }
    ],
    createdAt: '3 hours ago'
  },
  {
    id: '2',
    userId: '2',
    content: 'Sunday morning with the family ☀️ Nothing beats quality time together at home. These peaceful moments remind us what truly matters in life.',
    images: [],
    videos: [
      require('@/assets/video/video2.mp4')
    ],
    likes: 524,
    comments: [
      {
        id: 'c5',
        userId: '1',
        text: 'Such a cozy morning! Love the natural light in your home. Perfect way to start the day.',
        time: '45 minutes ago'
      },
      {
        id: 'c6',
        userId: '3',
        text: 'Family time is the best time 💕 These quiet moments are so precious.',
        time: '20 minutes ago'
      },
      {
        id: 'c7',
        userId: '6',
        text: 'This brings so much warmth to my heart. Beautiful family scene! 🏠',
        time: '10 minutes ago'
      }
    ],
    createdAt: '5 hours ago'
  },
  {
    id: '3',
    userId: '3',
    content: 'Weekend vibes with my little one 👶 These precious moments make everything worthwhile. Watching them discover the world is pure magic.',
    images: [
      'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
    ],
    likes: 892,
    comments: [
      {
        id: 'c8',
        userId: '1',
        text: 'So adorable! Kids grow up so fast ✨ Treasure every single moment like this.',
        time: '1 hour ago'
      },
      {
        id: 'c9',
        userId: '2',
        text: 'Precious moments indeed! Beautiful photo. The innocence in children is so heartwarming.',
        time: '30 minutes ago'
      },
      {
        id: 'c10',
        userId: '4',
        text: 'This melts my heart 🥰 Such a sweet bonding moment between parent and child.',
        time: '15 minutes ago'
      },
      {
        id: 'c11',
        userId: '5',
        text: 'Pure love captured in one frame! These are the memories you\'ll cherish forever.',
        time: '5 minutes ago'
      }
    ],
    createdAt: '6 hours ago'
  },
  {
    id: '4',
    userId: '4',
    content: 'Cooking together is our new favorite activity! Teaching the kids how to make their favorite pasta 🍝 Building memories one recipe at a time.',
    images: [
      'https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
    ],
    likes: 367,
    comments: [
      {
        id: 'c12',
        userId: '1',
        text: 'What a great way to bond! Kids love helping in the kitchen. Teaching them life skills early is wonderful.',
        time: '2 hours ago'
      },
      {
        id: 'c13',
        userId: '2',
        text: 'Teaching them young! That pasta looks delicious 😋 Family recipes are the best traditions.',
        time: '1 hour ago'
      },
      {
        id: 'c14',
        userId: '6',
        text: 'Love this! Cooking together creates such beautiful memories. The kitchen is the heart of the home.',
        time: '30 minutes ago'
      }
    ],
    createdAt: '8 hours ago'
  },
  {
    id: '5',
    userId: '5',
    content: 'Morning coffee and newspaper - some traditions never get old ☕📰 Taking time to appreciate the simple pleasures in life.',
    images: [
      'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
    ],
    likes: 445,
    comments: [
      {
        id: 'c15',
        userId: '2',
        text: 'There\'s something so peaceful about this routine. The simple moments are often the most meaningful.',
        time: '3 hours ago'
      },
      {
        id: 'c16',
        userId: '3',
        text: 'Classic morning ritual! Nothing beats a good cup of coffee and catching up on the news ☕',
        time: '2 hours ago'
      }
    ],
    createdAt: '10 hours ago'
  },
  {
    id: '6',
    userId: '6',
    content: 'Garden therapy session today 🌱 There\'s something so therapeutic about working with your hands and nurturing life. My little green sanctuary.',
    images: [
      'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
    ],
    likes: 321,
    comments: [
      {
        id: 'c17',
        userId: '1',
        text: 'Your garden looks amazing! Gardening is such a rewarding hobby. Those flowers are beautiful! 🌸',
        time: '4 hours ago'
      },
      {
        id: 'c18',
        userId: '4',
        text: 'I need to start a garden too! This looks so peaceful and fulfilling. Nature therapy at its best.',
        time: '2 hours ago'
      },
      {
        id: 'c19',
        userId: '5',
        text: 'Green thumb goals! 🌿 There\'s nothing quite like connecting with nature in your own backyard.',
        time: '1 hour ago'
      }
    ],
    createdAt: '12 hours ago'
  }
];

// Default export to fix the route warning
export default {
  users,
  moments,
  posts,
  currentUser
};