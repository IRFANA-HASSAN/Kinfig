export const moments = [
  {
    id: '1',
    userId: 'u2',
    stories: [
      { image: require('../../assets/images/onbard1.jpg'), time: '2 hours ago' },
      { image: require('../../assets/images/onbard2.jpg'), time: '1 hour ago' }
    ]
  },
  {
    id: '2',
    userId: 'u3',
    stories: [
      { image: require('../../assets/images/onbard3.jpg'), time: 'just now' },
      { image: require('../../assets/images/onbard4.jpg'), time: '5 minutes ago' }
    ]
  }
];

export const users = [
  {
    id: '1',
    name: 'David Richard',
    family: 'Thekkan Family',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  // Add more users as needed
];

export const posts = [
  {
    id: '101',
    userId: '1',
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80'
    ],
    likes: 7860,
    comments: 879,
    content: '<b>Birthday Celebration</b> amet consectetur accumsan, nibh exsollicitudin metus, volutpat lacinia arcu nibh vexl ante.',
    commentsList: [
      { id: 'c1', userId: '1', text: 'Happy Birthday!', time: '2h ago' },
      // Add more comments as needed
    ]
  },
  // Add more posts as needed
]; 