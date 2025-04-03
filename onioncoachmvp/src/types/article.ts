export interface Article {
  title: string;
  category: string;
  author: string | null;
  readTime: number | null;
  tags: string[];
  summary: string;
  relevanceScore?: number;
}
