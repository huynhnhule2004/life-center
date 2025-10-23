import Link from 'next/link'
import { Card } from '@/components/ui/card'

interface CourseCardProps {
  data: {
    id: string
    title: string
    description?: string
    thumbnail_url?: string
    category?: string
    price?: number
    level?: string
    duration_hours?: number
    is_published?: boolean
    created_at?: string
  }
}

export function CourseCard({ data }: CourseCardProps) {
  return (
    <Link href={`/khoa-hoc/${data.id}`}>
      <Card className="overflow-hidden transition-all hover:shadow-lg cursor-pointer">
        {data.thumbnail_url && (
          <div className="aspect-video w-full overflow-hidden">
            <img
              src={data.thumbnail_url}
              alt={data.title}
              className="h-full w-full object-cover"
            />
          </div>
        )}
        <div className="p-4">
          {data.category && (
            <span className="text-xs text-muted-foreground uppercase">
              {data.category}
            </span>
          )}
          <h3 className="mt-2 font-semibold text-lg line-clamp-2">
            {data.title}
          </h3>
          {data.description && (
            <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
              {data.description}
            </p>
          )}
          <div className="mt-4 flex items-center justify-between">
            {data.level && (
              <span className="text-xs bg-secondary px-2 py-1 rounded">
                {data.level}
              </span>
            )}
            {data.price !== undefined && (
              <span className="font-semibold">
                {data.price === 0 ? 'Miễn phí' : `${data.price.toLocaleString('vi-VN')}đ`}
              </span>
            )}
          </div>
        </div>
      </Card>
    </Link>
  )
}
