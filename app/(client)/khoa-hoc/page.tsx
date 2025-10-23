import { CourseCard } from '@/components/course-card'
import { BookOpen, Filter } from 'lucide-react'
import Link from 'next/link'

// Fake data
const FAKE_COURSES = [
  {
    id: '1',
    title: 'English for Beginners',
    description: 'Khóa học tiếng Anh cơ bản dành cho người mới bắt đầu. Học từ vựng, ngữ pháp và giao tiếp hàng ngày.',
    thumbnail_url: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=500',
    category: 'Cơ bản',
    price: 0,
    level: 'Beginner',
    is_published: true,
    created_at: '2024-01-15'
  },
  {
    id: '2',
    title: 'Business English',
    description: 'Nâng cao kỹ năng tiếng Anh trong môi trường công sở. Học cách viết email, thuyết trình và đàm phán.',
    thumbnail_url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500',
    category: 'Doanh nghiệp',
    price: 1500000,
    level: 'Intermediate',
    is_published: true,
    created_at: '2024-01-20'
  },
  {
    id: '3',
    title: 'IELTS Preparation',
    description: 'Chuẩn bị kỹ lưỡng cho kỳ thi IELTS. Luyện tập 4 kỹ năng: Nghe, Nói, Đọc, Viết.',
    thumbnail_url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500',
    category: 'Luyện thi',
    price: 2000000,
    level: 'Advanced',
    is_published: true,
    created_at: '2024-01-25'
  },
  {
    id: '4',
    title: 'Conversation Practice',
    description: 'Luyện nói tiếng Anh giao tiếp hàng ngày với giáo viên bản ngữ. Tự tin giao tiếp trong mọi tình huống.',
    thumbnail_url: 'https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?w=500',
    category: 'Giao tiếp',
    price: 800000,
    level: 'Intermediate',
    is_published: true,
    created_at: '2024-02-01'
  },
  {
    id: '5',
    title: 'English Grammar Mastery',
    description: 'Nắm vững ngữ pháp tiếng Anh từ cơ bản đến nâng cao. Bài tập thực hành phong phú.',
    thumbnail_url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500',
    category: 'Cơ bản',
    price: 0,
    level: 'Beginner',
    is_published: true,
    created_at: '2024-02-05'
  },
  {
    id: '6',
    title: 'TOEIC 700+',
    description: 'Chinh phục điểm số TOEIC 700+ với chiến lược học tập hiệu quả và đề thi thử.',
    thumbnail_url: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=500',
    category: 'Luyện thi',
    price: 1800000,
    level: 'Intermediate',
    is_published: true,
    created_at: '2024-02-10'
  },
]

function getAllCourses(category?: string) {
  let filtered = FAKE_COURSES.filter(course => course.is_published)
  
  if (category && category !== 'all') {
    filtered = filtered.filter(course => course.category === category)
  }
  
  return filtered.sort((a, b) => 
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  )
}

function getCategories() {
  const categories = FAKE_COURSES
    .filter(course => course.is_published && course.category)
    .map(course => course.category!)
  
  return [...new Set(categories)]
}

export default async function KhoaHocPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const params = await searchParams
  const selectedCategory = params.category || 'all'
  
  const courses = getAllCourses(selectedCategory)
  const categories = getCategories()

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Hero Section */}
      <div className="bg-primary/5 border-b">
        <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <BookOpen className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              Khám Phá Khóa Học
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Nâng cao kỹ năng tiếng Anh của bạn với các khóa học chất lượng cao từ cơ bản đến nâng cao
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <div className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{courses.length}</span> khóa học
              </div>
              <div className="hidden sm:block w-1 h-1 rounded-full bg-muted-foreground/30" />
              <div className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{categories.length}</span> danh mục
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Filters Section */}
        <div className="mb-8 md:mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Filter className="w-5 h-5 text-muted-foreground" />
            <h2 className="text-lg font-semibold">Lọc theo danh mục</h2>
          </div>
          
          <div className="relative">
            {/* Mobile: Horizontal scroll */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide md:flex-wrap">
              <Link
                href="/khoa-hoc"
                className={`flex-shrink-0 px-4 md:px-6 py-2.5 md:py-3 rounded-full font-medium text-sm md:text-base transition-all duration-200 ${
                  selectedCategory === 'all'
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-105'
                    : 'bg-card border border-border hover:border-primary/50 hover:shadow-md hover:scale-105'
                }`}
              >
                Tất cả
              </Link>
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/khoa-hoc?category=${encodeURIComponent(category)}`}
                  className={`flex-shrink-0 px-4 md:px-6 py-2.5 md:py-3 rounded-full font-medium text-sm md:text-base transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-105'
                      : 'bg-card border border-border hover:border-primary/50 hover:shadow-md hover:scale-105'
                  }`}
                >
                  {category}
                </Link>
              ))}
            </div>
            
            {/* Gradient overlay for mobile scroll hint */}
            <div className="absolute right-0 top-0 bottom-2 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none md:hidden" />
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            {selectedCategory === 'all' 
              ? `Hiển thị tất cả ${courses.length} khóa học`
              : `Tìm thấy ${courses.length} khóa học trong danh mục "${selectedCategory}"`
            }
          </p>
        </div>

        {/* Courses Grid */}
        {courses.length === 0 ? (
          <div className="text-center py-16 md:py-24">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-4">
              <BookOpen className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Không tìm thấy khóa học</h3>
            <p className="text-muted-foreground mb-6">
              Thử chọn danh mục khác hoặc quay lại xem tất cả khóa học
            </p>
            <Link
              href="/khoa-hoc"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Xem tất cả khóa học
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {courses.map((course, index) => (
              <div
                key={course.id}
                className="animate-in fade-in slide-in-from-bottom-4"
                style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'backwards' }}
              >
                <CourseCard data={course} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
