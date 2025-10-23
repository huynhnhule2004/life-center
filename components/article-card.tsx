import Image from 'next/image'
import { Calendar, Clock, User, ArrowRight } from 'lucide-react'

interface ArticleCardProps {
  data: {
    id: string
    slug: string
    title: string
    excerpt: string
    thumbnail_url: string
    category: string
    author: string
    published_at: string
    read_time: number
  }
}

export function ArticleCard({ data }: ArticleCardProps) {
  return (
    <a
      href={`/bai-viet/${data.slug}`}
      className="group block bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 hover:shadow-xl transition-all duration-300"
    >
      {/* Thumbnail */}
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={data.thumbnail_url}
          alt={data.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/90 text-primary-foreground text-xs font-medium backdrop-blur-sm">
            {data.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        {/* Title */}
        <h3 className="text-lg font-semibold line-clamp-2 group-hover:text-primary transition-colors">
          {data.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {data.excerpt}
        </p>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground pt-2 border-t border-border">
          <div className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5" />
            <span>{data.author}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>{new Date(data.published_at).toLocaleDateString('vi-VN')}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>{data.read_time} phút</span>
          </div>
        </div>

        {/* Read More */}
        <div className="flex items-center gap-2 text-sm font-medium text-primary pt-2">
          <span>Đọc thêm</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </a>
  )
}
