import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Clock, BookOpen, Award, Users, ArrowRight } from 'lucide-react'
import { getCourseById, getAllCourseIds, getTeacherById } from '@/lib/supabase/queries'
import Link from 'next/link'

export async function generateStaticParams() {
  const ids = await getAllCourseIds()
  return ids.map((id) => ({
    id: id,
  }))
}

interface CourseDetailPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function CourseDetailPage({ params }: CourseDetailPageProps) {
  const { id } = await params
  const course = await getCourseById(id)

  if (!course) {
    notFound()
  }

  const teacher = course.teacher_id ? await getTeacherById(course.teacher_id) : null

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-muted/50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <Link href="/khoa-hoc" className="hover:text-foreground">
                Khóa học
              </Link>
              <span>/</span>
              <span>{course.category}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{course.title}</h1>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4" />
                <span>{course.level}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{course.duration_hours} giờ</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>{course.student_count} học viên</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - 2/3 */}
            <div className="lg:col-span-2 space-y-8">
              {/* Course Image */}
              <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                <Image
                  src={course.thumbnail_url}
                  alt={course.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Course Description */}
              <div className="prose prose-slate max-w-none">
                <div className="whitespace-pre-line text-foreground">
                  {course.description}
                </div>
              </div>

              {/* What You'll Learn */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Nội dung khóa học
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-semibold text-primary">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Giới thiệu và làm quen</h4>
                      <p className="text-sm text-muted-foreground">Tổng quan khóa học và phương pháp học</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-semibold text-primary">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Kiến thức cơ bản</h4>
                      <p className="text-sm text-muted-foreground">Nền tảng từ vựng và ngữ pháp</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-semibold text-primary">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Thực hành nâng cao</h4>
                      <p className="text-sm text-muted-foreground">Bài tập và dự án thực tế</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-semibold text-primary">4</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Kiểm tra và chứng nhận</h4>
                      <p className="text-sm text-muted-foreground">Đánh giá cuối khóa và nhận chứng chỉ</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - 1/3 */}
            <div className="space-y-6">
              {/* Price Card */}
              <Card className="sticky top-4">
                <CardContent className="pt-6 space-y-6">
                  {/* Price */}
                  <div className="text-center pb-6 border-b">
                    {course.price === 0 ? (
                      <div>
                        <p className="text-4xl font-bold text-primary">Miễn phí</p>
                        <p className="text-sm text-muted-foreground mt-2">
                          Truy cập trọn đời
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-4xl font-bold">
                          {course.price.toLocaleString('vi-VN')}đ
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">
                          Thanh toán một lần
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Course Info */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Thời lượng</span>
                      <span className="font-semibold">{course.duration_hours} giờ</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Trình độ</span>
                      <span className="font-semibold">{course.level}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Học viên</span>
                      <span className="font-semibold">{course.student_count}+</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Chứng chỉ</span>
                      <span className="font-semibold">Có</span>
                    </div>
                  </div>

                  {/* Teacher Info */}
                  {teacher && (
                    <div className="pt-6 border-t">
                      <p className="text-sm text-muted-foreground mb-3">Giảng viên</p>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={teacher.avatar_url} alt={teacher.full_name} />
                          <AvatarFallback>{teacher.full_name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{teacher.full_name}</p>
                          <p className="text-sm text-muted-foreground">{teacher.specialization}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* CTA Button */}
                  <Button size="lg" className="w-full" asChild>
                    <Link href={`/dang-ky/${course.id}`}>
                      Đăng ký học ngay
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>

                  {/* Benefits */}
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Award className="h-4 w-4" />
                      <span>Chứng chỉ hoàn thành</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>Học mọi lúc mọi nơi</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <BookOpen className="h-4 w-4" />
                      <span>Tài liệu học tập đầy đủ</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
