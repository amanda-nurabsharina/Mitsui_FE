export interface MasterMenu {
  id: number;
  parent_id?: number | null;
  children?: MasterMenu[];
  name: string;
  slug: string;
  type: string;
  url: string;
  sort_order: number;
  target: string;
  icon?: string;
  is_visible: boolean;
  status: string;
}

export interface PageSection {
  id: number;
  page_slug: string;
  section_code: string;
  badge_text: string;
  title: string;
  description: string;
  content_payload?: string;
  sort_order: number;
  is_published: boolean;
}

export interface BannerSlide {
  id: number;
  title: string;
  badge_text: string;
  description: string;
  image_url: string;
  cta_primary_text: string;
  cta_primary_url: string;
  cta_secondary_text: string;
  cta_secondary_url: string;
  sort_order: number;
  status: string;
}

export interface ArticleCategory {
  id: number;
  name: string;
  slug: string;
}

export interface Article {
  id: number;
  category_id: number;
  category?: ArticleCategory;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  thumbnail_url: string;
  read_time: string;
  author_name: string;
  badge_text: string;
  status: string;
  published_at: string;
}

export interface HomepageData {
  menus: MasterMenu[];
  sections: Record<string, PageSection>;
  banners: BannerSlide[];
  articles: Article[];
  logo_url?: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1';
const API_SECRET_KEY = process.env.NEXT_PUBLIC_API_KEY || 'secret-mitsui-api-key-2026';

export async function fetchHomepageData(): Promise<HomepageData | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/public/homepage`, {
      headers: {
        'X-API-Key': API_SECRET_KEY,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      console.error(`Failed to fetch homepage data: ${res.status} ${res.statusText}`);
      return null;
    }

    const json = await res.json();
    if (json.success && json.data) {
      return json.data as HomepageData;
    }
    return null;
  } catch (error) {
    console.error('Error fetching homepage data:', error);
    return null;
  }
}
