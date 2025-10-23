import { ArticleCard } from '@/components/article-card'
import { BookOpen, Search, Filter } from 'lucide-react'
import Link from 'next/link'

// Fake data
const FAKE_ARTICLES = [
  {
    id: '1',
    slug: 'bi-quyet-hoc-tieng-anh-hieu-qua',
    title: 'Bí quyết học tiếng Anh hiệu quả cho người mới bắt đầu',
    excerpt: 'Khám phá những phương pháp học tiếng Anh đơn giản nhưng cực kỳ hiệu quả dành cho người mới bắt đầu.',
    thumbnail_url: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800',
    category: 'Học tập',
    author: 'Nguyễn Văn A',
    published_at: '2024-02-15',
    read_time: 5
  },
  {
    id: '2',
    slug: '10-cum-tu-tieng-anh-thuong-gap',
    title: '10 cụm từ tiếng Anh thường gặp trong giao tiếp hàng ngày',
    excerpt: 'Tổng hợp những cụm từ tiếng Anh phổ biến mà bạn có thể áp dụng ngay vào cuộc sống.',
    thumbnail_url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800',
    category: 'Giao tiếp',
    author: 'Trần Thị B',
    published_at: '2024-02-14',
    read_time: 7
  },
  {
    id: '3',
    slug: 'cach-luyen-phat-am-chuan',
    title: 'Cách luyện phát âm chuẩn như người bản ngữ',
    excerpt: 'Hướng dẫn chi tiết các bài tập luyện phát âm giúp bạn nói tiếng Anh tự tin hơn.',
    thumbnail_url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800',
    category: 'Phát âm',
    author: 'Lê Văn C',
    published_at: '2024-02-13',
    read_time: 6
  },
  {
    id: '4',
    slug: 'ielts-writing-task-2-tips',
    title: 'Tips chinh phục IELTS Writing Task 2 band 7.0+',
    excerpt: 'Những mẹo và chiến lược giúp bạn đạt điểm cao trong phần Writing Task 2 của kỳ thi IELTS.',
    thumbnail_url: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800',
    category: 'IELTS',
    author: 'Phạm Thị D',
    published_at: '2024-02-12',
    read_time: 10
  },
  {
    id: '5',
    slug: 'tu-vung-tieng-anh-chuyen-nganh',
    title: 'Từ vựng tiếng Anh chuyên ngành Business phổ biến',
    excerpt: 'Bộ từ vựng tiếng Anh thương mại cần thiết cho môi trường làm việc chuyên nghiệp.',
    thumbnail_url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
    category: 'Business',
    author: 'Hoàng Văn E',
    published_at: '2024-02-11',
    read_time: 8
  },
  {
    id: '6',
    slug: 'ngu-phap-tieng-anh-co-ban',
    title: 'Ngữ pháp tiếng Anh cơ bản: Thì hiện tại đơn',
    excerpt: 'Tìm hiểu cấu trúc, cách dùng và bài tập về thì hiện tại đơn trong tiếng Anh.',
    thumbnail_url: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800',
    category: 'Ngữ pháp',
    author: 'Nguyễn Thị F',
    published_at: '2024-02-10',
    read_time: 5
  },
]

function getAllArticles(category?: string, search?: string) {
  let filtered = FAKE_ARTICLES
  
  if (category && category !== 'all') {
    filtered = filtered.filter(article => article.category === category)
  }
  
  if (search) {
    const searchLower = search.toLowerCase()
    filtered = filtered.filter(article => 
      article.title.toLowerCase().includes(searchLower) ||
      article.excerpt.toLowerCase().includes(searchLower)
    )
  }
  
  return filtered.sort((a, b) => 
    new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
  )
}

function getCategories() {
  const categories = FAKE_ARTICLES
    .map(article => article.category)
  
  return [...new Set(categories)]
}

export default async function BaiVietPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string }>
}) {
  const params = await searchParams
  const selectedCategory = params.category || 'all'
  const searchQuery = params.search || ''
  
  const articles = getAllArticles(selectedCategory, searchQuery)
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
              Bài Viết
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Cập nhật kiến thức, mẹo học và tin tức về tiếng Anh mỗi ngày
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <div className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{FAKE_ARTICLES.length}</span> bài viết
              </div>
              <div className="hidden sm:block w-1 h-1 rounded-full bg-muted-foreground/30" />
              <div className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{categories.length}</span> chủ đề
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Search & Filter Section */}
        <div className="mb-8 md:mb-12 space-y-6">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <form action="/bai-viet" method="get" className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                name="search"
                defaultValue={searchQuery}
                placeholder="Tìm kiếm bài viết..."
                className="w-full pl-12 pr-4 py-3 md:py-4 rounded-full border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              />
              {selectedCategory !== 'all' && (
                <input type="hidden" name="category" value={selectedCategory} />
              )}
            </form>
          </div>

          {/* Category Filters */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Filter className="w-5 h-5 text-muted-foreground" />
              <h2 className="text-lg font-semibold">Chủ đề</h2>
            </div>
            
            <div className="relative">
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide md:flex-wrap">
                <a
                  href={`/bai-viet${searchQuery ? `?search=${encodeURIComponent(searchQuery)}` : ''}`}
                  className={`flex-shrink-0 px-4 md:px-6 py-2.5 md:py-3 rounded-full font-medium text-sm md:text-base transition-all duration-200 ${
                    selectedCategory === 'all'
                      ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-105'
                      : 'bg-card border border-border hover:border-primary/50 hover:shadow-md hover:scale-105'
                  }`}
                >
                  Tất cả
                </a>
                {categories.map((category) => (
                  <a
                    key={category}
                    href={`/bai-viet?category=${encodeURIComponent(category)}${searchQuery ? `&search=${encodeURIComponent(searchQuery)}` : ''}`}
                    className={`flex-shrink-0 px-4 md:px-6 py-2.5 md:py-3 rounded-full font-medium text-sm md:text-base transition-all duration-200 ${
                      selectedCategory === category
                        ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-105'
                        : 'bg-card border border-border hover:border-primary/50 hover:shadow-md hover:scale-105'
                    }`}
                  >
                    {category}
                  </a>
                ))}
              </div>
              <div className="absolute right-0 top-0 bottom-2 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none md:hidden" />
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            {searchQuery ? (
              <>Tìm thấy <span className="font-semibold text-foreground">{articles.length}</span> kết quả cho &quot;{searchQuery}&quot;</>
            ) : selectedCategory === 'all' ? (
              <>Hiển thị tất cả <span className="font-semibold text-foreground">{articles.length}</span> bài viết</>
            ) : (
              <>Tìm thấy <span className="font-semibold text-foreground">{articles.length}</span> bài viết trong chủ đề &quot;{selectedCategory}&quot;</>
            )}
          </p>
        </div>

        {/* Articles Grid */}
        {articles.length === 0 ? (
          <div className="text-center py-16 md:py-24">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-4">
              <BookOpen className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Không tìm thấy bài viết</h3>
            <p className="text-muted-foreground mb-6">
              Thử tìm kiếm với từ khóa khác hoặc chọn chủ đề khác
            </p>
            <Link
              href="/bai-viet"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Xem tất cả bài viết
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {articles.map((article, index) => (
              <div
                key={article.id}
                className="animate-in fade-in slide-in-from-bottom-4"
                style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'backwards' }}
              >
                <ArticleCard data={article} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
