import { Award, Users, BookOpen, Heart, Target, Lightbulb, Shield, Zap } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Giới thiệu - English Life Center',
  description: 'Tìm hiểu về English Life Center - Trung tâm tiếng Anh uy tín với phương pháp giảng dạy hiện đại',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
          <div className="text-center">
            <div className="inline-block mb-4 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <span className="text-sm font-medium">Hơn 10 năm kinh nghiệm</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              English Life Center
            </h1>
            <p className="text-xl sm:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Nơi khơi nguồn đam mê học tiếng Anh và phát triển kỹ năng toàn diện
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/20">
                <div className="text-3xl font-bold">10+</div>
                <div className="text-sm text-blue-100">Năm kinh nghiệm</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/20">
                <div className="text-3xl font-bold">5000+</div>
                <div className="text-sm text-blue-100">Học viên</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/20">
                <div className="text-3xl font-bold">98%</div>
                <div className="text-sm text-blue-100">Hài lòng</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="inline-block mb-4 px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                Câu chuyện của chúng tôi
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Hành trình 10 năm xây dựng ước mơ
              </h2>
              <div className="prose prose-lg text-gray-600 space-y-4">
                <p>
                  English Life Center được thành lập vào năm 2014 với sứ mệnh mang đến chất lượng 
                  giáo dục tiếng Anh tốt nhất cho cộng đồng. Bắt đầu từ một lớp học nhỏ với 15 học viên, 
                  chúng tôi đã không ngừng phát triển và hoàn thiện phương pháp giảng dạy.
                </p>
                <p>
                  Với đội ngũ giáo viên giàu kinh nghiệm và tận tâm, chúng tôi đã đào tạo hơn 5000 học viên 
                  đạt được mục tiêu của mình. Từ việc chinh phục các kỳ thi quốc tế đến tự tin giao tiếp 
                  trong môi trường quốc tế.
                </p>
                <p>
                  Ngày nay, English Life Center tự hào là một trong những trung tâm tiếng Anh uy tín nhất, 
                  với cơ sở vật chất hiện đại và phương pháp giảng dạy tiên tiến, luôn đặt học viên làm trung tâm.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <div className="w-full h-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center">
                  <div className="text-white text-center p-8">
                    <BookOpen className="w-20 h-20 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium">Hình ảnh trung tâm</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-yellow-400 rounded-2xl -z-10" />
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-blue-200 rounded-full -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Sứ mệnh & Tầm nhìn
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Định hướng phát triển và giá trị cốt lõi của chúng tôi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
              <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Sứ mệnh</h3>
              <p className="text-gray-700 leading-relaxed">
                Trang bị cho học viên không chỉ kiến thức tiếng Anh vững chắc mà còn 
                kỹ năng giao tiếp tự tin, tư duy sáng tạo và khả năng thích ứng trong 
                môi trường đa văn hóa. Chúng tôi cam kết mang đến trải nghiệm học tập 
                chất lượng cao với chi phí hợp lý.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-100">
              <div className="w-14 h-14 bg-purple-600 rounded-xl flex items-center justify-center mb-6">
                <Lightbulb className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Tầm nhìn</h3>
              <p className="text-gray-700 leading-relaxed">
                Trở thành trung tâm tiếng Anh hàng đầu Việt Nam, được công nhận bởi 
                chất lượng giảng dạy xuất sắc, phương pháp đổi mới sáng tạo và môi 
                trường học tập tích cực. Chúng tôi hướng đến việc mở rộng mạng lưới 
                và tạo cơ hội cho hàng triệu người Việt.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Giá trị cốt lõi
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Những nguyên tắc dẫn dắt mọi hoạt động của chúng tôi
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Award,
                title: 'Chất lượng',
                description: 'Cam kết mang đến chương trình học chất lượng cao với đội ngũ giáo viên giỏi',
                color: 'blue'
              },
              {
                icon: Heart,
                title: 'Tận tâm',
                description: 'Quan tâm đến từng học viên, đồng hành trong suốt hành trình học tập',
                color: 'red'
              },
              {
                icon: Zap,
                title: 'Đổi mới',
                description: 'Không ngừng cải tiến phương pháp giảng dạy theo xu hướng hiện đại',
                color: 'yellow'
              },
              {
                icon: Shield,
                title: 'Uy tín',
                description: 'Xây dựng niềm tin thông qua kết quả học tập thực tế và minh bạch',
                color: 'green'
              }
            ].map((value, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`w-12 h-12 bg-${value.color}-100 rounded-lg flex items-center justify-center mb-4`}>
                  <value.icon className={`w-6 h-6 text-${value.color}-600`} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Đội ngũ của chúng tôi
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Những con người tận tâm đứng sau thành công của English Life Center
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Nguyễn Văn A',
                role: 'Giám đốc học thuật',
                description: 'Thạc sĩ Ngôn ngữ Anh, 15+ năm kinh nghiệm giảng dạy',
              },
              {
                name: 'Trần Thị B',
                role: 'Trưởng phòng đào tạo',
                description: 'Chứng chỉ CELTA, chuyên gia phát triển chương trình',
              },
              {
                name: 'Lê Văn C',
                role: 'Giảng viên cao cấp',
                description: 'IELTS 8.5, chuyên luyện thi và giao tiếp',
              },
            ].map((member, index) => (
              <div key={index} className="group">
                <div className="bg-gray-50 rounded-2xl p-6 text-center hover:bg-blue-50 transition-colors duration-300">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-16 h-16 text-white opacity-50" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Sẵn sàng bắt đầu hành trình của bạn?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Hãy để chúng tôi đồng hành cùng bạn trên con đường chinh phục tiếng Anh
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/lien-he"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Liên hệ tư vấn
            </a>
            <Link
              href="/khoa-hoc"
              className="inline-block bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Xem khóa học
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
