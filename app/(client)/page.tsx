import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { CourseCard } from "@/components/course-card";
import { getFeaturedCourses, getTestimonials, getFeaturedTeachers } from "@/lib/supabase/queries";
import { BookOpen, Users, Award, ArrowRight, Star, GraduationCap, Target, Clock, CheckCircle2, Sparkles, TrendingUp } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const [courses, testimonials, teachers] = await Promise.all([
    getFeaturedCourses(3),
    getTestimonials(),
    getFeaturedTeachers(4)
  ]);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-24 md:py-32 lg:py-40">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25" />
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        
        <div className="container relative mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4 animate-fade-in">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Nền tảng học tập hàng đầu Việt Nam</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-600 to-primary animate-fade-in-up">
              Khơi Nguồn Tri Thức,<br />
              <span className="text-foreground">Kiến Tạo Tương Lai</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
              Nền tảng học tập hiện đại với đội ngũ giảng viên chuyên nghiệp, 
              giúp bạn phát triển kỹ năng và đạt được mục tiêu của mình.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up animation-delay-400">
              <Button size="lg" className="group shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all h-14 px-8 text-base" asChild>
                <Link href="/khoa-hoc">
                  Khám phá khóa học
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-base border-2 hover:bg-accent" asChild>
                <Link href="/contact">Đăng ký tư vấn miễn phí</Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-8 pt-8 text-sm text-muted-foreground animate-fade-in-up animation-delay-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>5000+ Học viên</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>200+ Khóa học</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>98% Hài lòng</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-purple-600 text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center space-y-2">
              <div className="text-4xl md:text-5xl font-bold">5K+</div>
              <div className="text-sm md:text-base opacity-90">Học viên đã đào tạo</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl md:text-5xl font-bold">200+</div>
              <div className="text-sm md:text-base opacity-90">Khóa học chất lượng</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl md:text-5xl font-bold">50+</div>
              <div className="text-sm md:text-base opacity-90">Giảng viên giỏi</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl md:text-5xl font-bold">98%</div>
              <div className="text-sm md:text-base opacity-90">Đánh giá tích cực</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-2">
              <GraduationCap className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Khóa học nổi bật</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold">Các Khóa Học Được Yêu Thích</h2>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
              Khám phá những khóa học được học viên đánh giá cao nhất
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {courses.map((course) => (
              <div key={course.id} className="transform transition-all duration-300 hover:-translate-y-2">
                <CourseCard data={course} />
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button variant="outline" size="lg" className="group border-2 h-12 px-8" asChild>
              <Link href="/khoa-hoc">
                Xem tất cả khóa học
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-2">
              <Target className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Ưu điểm vượt trội</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold">Tại Sao Chọn Life Center?</h2>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
              Những lợi ích độc quyền dành riêng cho học viên
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="group hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 border-2 hover:border-primary/50 hover:-translate-y-2">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-6 w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">Chương Trình Đào Tạo Chất Lượng</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-base leading-relaxed">
                  Nội dung được thiết kế bài bản, cập nhật liên tục theo xu hướng mới nhất,
                  đảm bảo kiến thức thực tế và ứng dụng cao.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 border-2 hover:border-primary/50 hover:-translate-y-2">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-6 w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">Đội Ngũ Giảng Viên Chuyên Nghiệp</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-base leading-relaxed">
                  Được giảng dạy bởi các chuyên gia hàng đầu với nhiều năm kinh nghiệm thực chiến
                  trong các lĩnh vực chuyên môn.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 border-2 hover:border-primary/50 hover:-translate-y-2">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-6 w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/30 group-hover:scale-110 transition-transform">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">Chứng Chỉ Được Công Nhận</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-base leading-relaxed">
                  Nhận chứng chỉ hoàn thành khóa học được công nhận, 
                  giúp nâng cao giá trị CV và cơ hội nghề nghiệp của bạn.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 border-2 hover:border-primary/50 hover:-translate-y-2">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-6 w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/30 group-hover:scale-110 transition-transform">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">Học Linh Hoạt 24/7</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-base leading-relaxed">
                  Học mọi lúc mọi nơi với nền tảng online hiện đại,
                  phù hợp với lịch trình bận rộn của bạn.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 border-2 hover:border-primary/50 hover:-translate-y-2">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-6 w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center shadow-lg shadow-pink-500/30 group-hover:scale-110 transition-transform">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">Hỗ Trợ Tận Tình</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-base leading-relaxed">
                  Đội ngũ hỗ trợ luôn sẵn sàng giải đáp thắc mắc và
                  đồng hành cùng bạn trong suốt quá trình học tập.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 border-2 hover:border-primary/50 hover:-translate-y-2">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-6 w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-cyan-500/30 group-hover:scale-110 transition-transform">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">Cộng Đồng Học Viên</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-base leading-relaxed">
                  Kết nối với hàng nghìn học viên, chia sẻ kinh nghiệm và
                  phát triển mạng lưới quan hệ chuyên nghiệp.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-2">
              <Star className="h-4 w-4 text-primary fill-primary" />
              <span className="text-sm font-medium text-primary">Đánh giá 5 sao</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold">Cảm Nhận Học Viên</h2>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
              Những chia sẻ chân thực từ học viên thành công
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <Carousel className="w-full">
              <CarouselContent className="-ml-4">
                {testimonials.map((testimonial) => (
                  <CarouselItem key={testimonial.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <Card className="h-full border-2 hover:border-primary/50 hover:shadow-xl transition-all duration-300">
                      <CardHeader className="pb-4">
                        <div className="flex items-start gap-4">
                          <Avatar className="h-14 w-14 border-2 border-primary/20">
                            <AvatarImage src={testimonial.avatar_url} />
                            <AvatarFallback className="text-lg bg-gradient-to-br from-primary to-purple-600 text-white">
                              {testimonial.student_name?.[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <CardTitle className="text-lg mb-1">{testimonial.student_name}</CardTitle>
                            <div className="flex gap-0.5">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground leading-relaxed">&quot;{testimonial.content}&quot;</p>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>
          </div>
        </div>
      </section>

      {/* Teachers */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-2">
              <Users className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Chuyên gia hàng đầu</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold">Đội Ngũ Giảng Viên</h2>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
              Gặp gỡ những người dẫn đường tri thức của bạn
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-5xl mx-auto">
            {teachers.map((teacher) => (
              <Card key={teacher.id} className="group text-center border-2 hover:border-primary/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardContent className="pt-8 pb-6 space-y-4">
                  <Avatar className="w-28 h-28 mx-auto border-4 border-primary/20 group-hover:border-primary/40 transition-colors shadow-lg">
                    <AvatarImage src={teacher.avatar_url} alt={teacher.full_name} />
                    <AvatarFallback className="text-3xl bg-gradient-to-br from-primary to-purple-600 text-white">
                      {teacher.full_name?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                      {teacher.full_name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {teacher.specialization}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <Card className="relative overflow-hidden border-0 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-purple-600 to-primary" />
            <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
            <CardContent className="relative py-16 md:py-20 text-center space-y-8 text-primary-foreground">
              <div className="space-y-6 max-w-3xl mx-auto">
                <h2 className="text-4xl md:text-6xl font-bold leading-tight">
                  Sẵn Sàng Bắt Đầu<br />Hành Trình Học Tập?
                </h2>
                <p className="text-lg md:text-2xl opacity-95 leading-relaxed">
                  Đăng ký ngay hôm nay để nhận <span className="font-bold">ưu đãi 50%</span> khóa học đầu tiên
                  và truy cập miễn phí tài liệu học tập!
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                <Button 
                  size="lg" 
                  variant="secondary" 
                  className="group h-14 px-10 text-base font-semibold shadow-xl hover:shadow-2xl transition-all"
                  asChild
                >
                  <Link href="/register">
                    Đăng ký ngay - Miễn phí
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="h-14 px-10 text-base font-semibold bg-white/10 backdrop-blur-sm border-2 border-white/50 text-white hover:bg-white/20 hover:border-white transition-all"
                  asChild
                >
                  <Link href="/contact">Liên hệ tư vấn miễn phí</Link>
                </Button>
              </div>

              <div className="flex flex-wrap justify-center gap-6 pt-6 text-sm opacity-90">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5" />
                  <span>Không cần thẻ tín dụng</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5" />
                  <span>Hủy bất cứ lúc nào</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5" />
                  <span>Hỗ trợ 24/7</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
