const placeholderImages = {
  'Health and Fitness': [
    '/images/health1.jpeg',
    '/images/health2.jpeg',
    '/images/health3.jpeg',
  ],
  'Romantic Life': [
    '/images/romantic-1.jpg',
    '/images/romantic-2.jpg',
    '/images/romantic-3.jpg',
  ],
  'Environment': [
    '/images/environment-1.jpg',
    '/images/environment-2.jpg',
    '/images/environment-3.jpg',
  ],
  'Personal Growth': [
    '/images/growth1.jpeg',
    '/images/growth2.jpeg',
    '/images/growth3.jpeg',
  ],
  'Work': [
    '/images/work-1.jpg',
    '/images/work-2.jpg',
    '/images/work-3.jpg',
  ],
  'Money': [
    '/images/money-1.jpg',
    '/images/money-2.jpg',
    '/images/money-3.jpg',
  ],
  'Family': [
    '/images/family-1.jpg',
    '/images/family-2.jpg',
    '/images/family-3.jpg',
  ],
  'default': [
    '/images/default-1.jpg',
    '/images/default-2.jpg',
    '/images/default-3.jpg',
  ]
} as const;

export function getRandomPlaceholderImage(category: string): string {
  const images = placeholderImages[category as keyof typeof placeholderImages] || placeholderImages.default;
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
}

export function isValidImageUrl(url: string): boolean {
  try {
    new URL(url);
    return url.match(/\.(jpg|jpeg|jpeg|webp|avif|gif|svg)$/) !== null;
  } catch {
    return false;
  }
} 