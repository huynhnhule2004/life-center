import { notFound } from 'next/navigation'
import { Calendar, Clock, User, Tag, ArrowLeft, Share2 } from 'lucide-react'
import { ArticleCard } from '@/components/article-card'
import Image from 'next/image'
import Link from 'next/link'

// Fake data
const FAKE_ARTICLES = [
  {
    id: '1',
    slug: 'bi-quyet-hoc-tieng-anh-hieu-qua',
    title: 'Bí quyết học tiếng Anh hiệu quả cho người mới bắt đầu',
    excerpt: 'Khám phá những phương pháp học tiếng Anh đơn giản nhưng cực kỳ hiệu quả dành cho người mới bắt đầu.',
    content: `
      <p>Học tiếng Anh hiệu quả không nhất thiết phải tốn nhiều thời gian và công sức. Với những phương pháp đúng đắn, bạn hoàn toàn có thể tiến bộ nhanh chóng.</p>
      
      <h2>1. Xác định mục tiêu rõ ràng</h2>
      <p>Trước khi bắt đầu, hãy tự hỏi bản thân: Tại sao bạn muốn học tiếng Anh? Để giao tiếp, du học, hay thăng tiến trong công việc? Mục tiêu rõ ràng sẽ giúp bạn có động lực và định hướng học tập đúng đắn.</p>
      
      <h2>2. Học từ vựng theo chủ đề</h2>
      <p>Thay vì học từ vựng một cách ngẫu nhiên, hãy học theo các chủ đề cụ thể như: gia đình, công việc, sở thích... Điều này giúp não bộ ghi nhớ tốt hơn và dễ dàng áp dụng trong thực tế.</p>
      
      <h2>3. Thực hành hàng ngày</h2>
      <p>Dành ít nhất 30 phút mỗi ngày để học tiếng Anh. Tính nhất quán quan trọng hơn việc học nhiều giờ một lần. Bạn có thể:</p>
      <ul>
        <li>Nghe podcast tiếng Anh trong lúc đi làm</li>
        <li>Xem phim có phụ đề tiếng Anh</li>
        <li>Đọc tin tức hoặc blog bằng tiếng Anh</li>
        <li>Ghi chú nhật ký bằng tiếng Anh</li>
      </ul>
      
      <h2>4. Đừng sợ mắc lỗi</h2>
      <p>Mắc lỗi là một phần tự nhiên của quá trình học. Hãy tự tin nói và viết, đừng lo lắng về việc sai sót. Mỗi lỗi sai là một cơ hội để học hỏi và tiến bộ.</p>
      
      <h2>5. Tìm partner học tập</h2>
      <p>Học cùng bạn bè hoặc tham gia các nhóm học tiếng Anh sẽ giúp bạn có thêm động lực và cơ hội thực hành. Bạn có thể:</p>
      <ul>
        <li>Tham gia câu lạc bộ tiếng Anh</li>
        <li>Tìm người nước ngoài để trao đổi ngôn ngữ</li>
        <li>Tham gia các diễn đàn online</li>
      </ul>
      
      <h2>Kết luận</h2>
      <p>Học tiếng Anh hiệu quả đòi hỏi sự kiên trì, phương pháp đúng và thái độ tích cực. Hãy bắt đầu từ hôm nay và bạn sẽ thấy sự tiến bộ rõ rệt!</p>
    `,
    thumbnail_url: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1200',
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
]

function getArticleBySlug(slug: string) {
  return FAKE_ARTICLES.find(article => article.slug === slug)
}

function getRelatedArticles(currentSlug: string, category: string, limit = 3) {
  return FAKE_ARTICLES
    .filter(article => article.slug !== currentSlug && article.category === category)
    .slice(0, limit)
}

export default async function BaiVietDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  
  if (!article) {
    notFound()
  }
  
  const relatedArticles = getRelatedArticles(article.slug, article.category)

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Back Button */}
      <div className="container mx-auto px-4 pt-6">
        <Link
          href="/bai-viet"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Quay lại danh sách
        </Link>
      </div>

      {/* Article Header */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <article className="max-w-4xl mx-auto">
          {/* Category Badge */}
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Tag className="w-3.5 h-3.5" />
              {article.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            {article.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-muted-foreground mb-8">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{new Date(article.published_at).toLocaleDateString('vi-VN')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{article.read_time} phút đọc</span>
            </div>
          </div>

          {/* Excerpt */}
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            {article.excerpt}
          </p>

          {/* Featured Image */}
          <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden mb-8">
            <Image
              src={article.thumbnail_url}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Share Button */}
          <div className="flex justify-end mb-8">
            <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-accent transition-colors">
              <Share2 className="w-4 h-4" />
              <span className="text-sm">Chia sẻ</span>
            </button>
          </div>

          {/* Content */}
          <div 
            className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-p:leading-relaxed prose-p:mb-4 prose-ul:my-4 prose-li:my-2"
            dangerouslySetInnerHTML={{ __html: article.content || '' }}
          />
        </article>
      </div>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <div className="bg-secondary/30 py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-8">Bài viết liên quan</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedArticles.map((relatedArticle) => (
                  <ArticleCard key={relatedArticle.id} data={relatedArticle} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
