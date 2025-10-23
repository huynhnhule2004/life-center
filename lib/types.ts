// Custom enum types inferred from schema defaults
export type PublishStatus = 'DRAFT' | 'PUBLISHED'; // Assuming based on default 'DRAFT'
export type InstanceStatus = 'PLANNED' | 'ACTIVE' | 'COMPLETED'; // Assuming based on default 'PLANNED'

export interface BlogPostCategories {
  post_id: string; // UUID
  category_id: string; // UUID
}

export interface BlogPosts {
  id: string; // UUID
  title: string;
  slug: string;
  excerpt?: string;
  content?: Record<string, unknown>; // jsonb
  cover_url?: string;
  status: PublishStatus;
  published_at?: string; // timestamp with time zone
  seo_title?: string;
  seo_description?: string;
  seo_og_image?: string;
  created_at: string; // timestamp with time zone
  updated_at: string; // timestamp with time zone
}

export interface Categories {
  id: string; // UUID
  name: string;
  slug: string;
  kind: string; // Default 'general'
  created_at: string; // timestamp with time zone
}

export interface CourseCategories {
  course_id: string; // UUID
  category_id: string; // UUID
}

export interface CourseInstances {
  id: string; // UUID
  course_id: string; // UUID
  code?: string;
  start_date?: string; // date
  end_date?: string; // date
  schedule?: Record<string, unknown>; // jsonb
  timezone: string; // Default 'Asia/Ho_Chi_Minh'
  seats?: number;
  enrolled: number; // Default 0
  price_override?: number;
  sale_price_override?: number;
  sale_starts_at?: string; // timestamp with time zone
  sale_ends_at?: string; // timestamp with time zone
  status: InstanceStatus;
  note?: string;
  created_at: string; // timestamp with time zone
  updated_at: string; // timestamp with time zone
}

export interface Courses {
  id: string; // UUID
  title: string;
  slug: string;
  summary: string;
  content?: Record<string, unknown>; // jsonb
  cover_url?: string;
  mode?: string;
  duration_wk?: number;
  price?: number;
  sale_price?: number;
  sale_starts_at?: string; // timestamp with time zone
  sale_ends_at?: string; // timestamp with time zone
  status: PublishStatus;
  published_at?: string; // timestamp with time zone
  seo_title?: string;
  seo_description?: string;
  seo_og_image?: string;
  created_at: string; // timestamp with time zone
  updated_at: string; // timestamp with time zone
}

export interface Leads {
  id: string; // UUID
  name: string;
  phone: string;
  email?: string;
  student?: string;
  age?: number;
  interest?: string;
  course_id?: string; // UUID
  message?: string;
  source?: string;
  consent: boolean; // Default false
  created_at: string; // timestamp with time zone
}

export interface Profiles {
  id: string; // UUID (references auth.users)
  full_name?: string;
  is_admin: boolean; // Default false
  created_at: string; // timestamp with time zone
}

export interface Teachers {
  id: string; // UUID
  name: string;
  slug: string;
  bio: string;
  avatar_url?: string;
  socials?: Record<string, string | null>; // jsonb
  created_at: string; // timestamp with time zone
  updated_at: string; // timestamp with time zone
}
