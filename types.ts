export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  isNew?: boolean;
}

export interface TeamMember {
  id?: string;
  name: string;
  role: string;
  image: string;
  quote?: string;
}

export interface FAQItem {
  id?: string;
  question: string;
  answer: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}