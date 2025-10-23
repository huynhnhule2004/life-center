export interface BlogPostCategories {
  post_id: string;
  category_id: string;
}

export interface BlogPosts {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: Record<string, unknown>;
  cover_url?: string;
  status: string; // Assuming publish_status enum, e.g., 'DRAFT' | 'PUBLISHED'
  published_at?: Date;
  seo_title?: string;
  seo_description?: string;
  seo_og_image?: string;
  created_at: Date;
  updated_at: Date;
}

export interface Categories {
  id: string;
  name: string;
  slug: string;
  kind: string;
  created_at: Date;
}

export interface CourseCategories {
  course_id: string;
  category_id: string;
}

export interface CourseInstances {
  id: string;
  course_id: string;
  code?: string;
  start_date?: Date;
  end_date?: Date;
  schedule?: Record<string, unknown>;
  timezone: string;
  seats?: number;
  enrolled: number;
  price_override?: number;
  sale_price_override?: number;
  sale_starts_at?: Date;
  sale_ends_at?: Date;
  status: string; // Assuming instance_status enum, e.g., 'PLANNED' | 'ACTIVE'
  note?: string;
  created_at: Date;
  updated_at: Date;
}

export interface Courses {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content?: Record<string, unknown>;
  cover_url?: string;
  mode?: string;
  duration_wk?: number;
  price?: number;
  sale_price?: number;
  sale_starts_at?: Date;
  sale_ends_at?: Date;
  status: string; // Assuming publish_status enum
  published_at?: Date;
  seo_title?: string;
  seo_description?: string;
  seo_og_image?: string;
  created_at: Date;
  updated_at: Date;
}

export interface Leads {
  id: string;
  name: string;
  phone: string;
  email?: string;
  student?: string;
  age?: number;
  interest?: string;
  course_id?: string;
  message?: string;
  source?: string;
  consent: boolean;
  created_at: Date;
}

export interface Profiles {
  id: string;
  full_name?: string;
  is_admin: boolean;
  created_at: Date;
}

export interface Teachers {
  id: string;
  name: string;
  slug: string;
  bio: string;
  avatar_url?: string;
  socials?: Record<string, unknown>;
  created_at: Date;
  updated_at: Date;
}
