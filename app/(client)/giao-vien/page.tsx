'use client'

import TeacherCard from '@/components/TeacherCard'
import { useState } from 'react'
import { Search, Filter, Users, Award } from 'lucide-react'

export default function TeachersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')

  const teachers = [
    {
      name: 'Nguyễn Minh Anh',
      title: 'Giáo viên chính - IELTS Expert',
      image: '/images/teacher-1.jpg',
      specialization: ['IELTS', 'TOEFL', 'Business English'],
      experience: '10 năm',
      education: 'Thạc sĩ Ngôn ngữ Anh - University of Cambridge',
      rating: 4.9,
      studentsCount: 500,
      languages: ['Tiếng Việt', 'English (Native)', 'Tiếng Pháp'],
      bio: 'Chuyên gia IELTS với hơn 10 năm kinh nghiệm, đã đào tạo hơn 500 học viên đạt 7.5+ IELTS'
    },
    {
      name: 'Trần Văn Nam',
      title: 'Giáo viên - Academic English',
      image: '/images/teacher-2.jpg',
      specialization: ['Academic English', 'Grammar', 'Writing'],
      experience: '8 năm',
      education: 'Cử nhân Sư phạm Tiếng Anh - ĐH Sư phạm Hà Nội',
      rating: 4.8,
      studentsCount: 350,
      languages: ['Tiếng Việt', 'English (Fluent)'],
      bio: 'Chuyên về Tiếng Anh học thuật và kỹ năng viết, phương pháp giảng dạy sinh động và hiệu quả'
    },
    {
      name: 'Sarah Johnson',
      title: 'Native Teacher - Communication Expert',
      image: '/images/teacher-3.jpg',
      specialization: ['Speaking', 'Pronunciation', 'Communication'],
      experience: '7 năm',
      education: 'Bachelor of Education - University of Sydney',
      rating: 4.9,
      studentsCount: 420,
      languages: ['English (Native)', 'Tiếng Việt (Basic)'],
      bio: 'Giáo viên bản ngữ người Úc, chuyên phát triển kỹ năng giao tiếp và phát âm chuẩn'
    },
    {
      name: 'Lê Thị Hương',
      title: 'Giáo viên - Kids English Specialist',
      image: '/images/teacher-4.jpg',
      specialization: ['Kids English', 'Phonics', 'Interactive Learning'],
      experience: '6 năm',
      education: 'Thạc sĩ Giáo dục Mầm non - ĐH Giáo dục',
      rating: 5.0,
      studentsCount: 280,
      languages: ['Tiếng Việt', 'English (Fluent)'],
      bio: 'Chuyên gia giảng dạy Tiếng Anh cho trẻ em, phương pháp vui chơi học tập hiện đại'
    },
    {
      name: 'Michael Brown',
      title: 'Senior Teacher - Business English',
      image: '/images/teacher-5.jpg',
      specialization: ['Business English', 'Corporate Training', 'Presentation'],
      experience: '12 năm',
      education: 'MBA - Harvard Business School, CELTA Certified',
      rating: 4.9,
      studentsCount: 600,
      languages: ['English (Native)', 'Tiếng Nhật (Intermediate)'],
      bio: 'Chuyên gia Tiếng Anh thương mại với kinh nghiệm đào tạo cho các tập đoàn lớn'
    },
    {
      name: 'Phạm Thanh Tùng',
      title: 'Giáo viên - TOEIC Expert',
      image: '/images/teacher-6.jpg',
      specialization: ['TOEIC', 'Listening', 'Reading'],
      experience: '9 năm',
      education: 'Thạc sĩ Ngôn ngữ học - ĐH Quốc gia Hà Nội',
      rating: 4.8,
      studentsCount: 450,
      languages: ['Tiếng Việt', 'English (Fluent)', 'Tiếng Hàn (Basic)'],
      bio: 'Chuyên gia TOEIC, đã giúp hàng trăm học viên đạt điểm cao trong kỳ thi TOEIC'
    }
  ]

  const filters = [
    { id: 'all', label: 'Tất cả', icon: Users },
    { id: 'ielts', label: 'IELTS/TOEFL', icon: Award },
    { id: 'business', label: 'Business', icon: Award },
    { id: 'kids', label: 'Trẻ em', icon: Award },
  ]

  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         teacher.specialization.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesFilter = selectedFilter === 'all' || 
                         teacher.specialization.some(s => s.toLowerCase().includes(selectedFilter))
    
    return matchesSearch && matchesFilter
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Đội Ngũ Giáo Viên
            </h1>
            <p className="text-base sm:text-lg text-blue-100 max-w-2xl mx-auto mb-8">
              Đội ngũ giáo viên giàu kinh nghiệm, tận tâm và chuyên nghiệp
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl sm:text-3xl font-bold">20+</div>
                <div className="text-sm text-blue-100">Giáo viên</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl sm:text-3xl font-bold">10+</div>
                <div className="text-sm text-blue-100">Năm kinh nghiệm</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl sm:text-3xl font-bold">3000+</div>
                <div className="text-sm text-blue-100">Học viên</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl sm:text-3xl font-bold">4.9</div>
                <div className="text-sm text-blue-100">Đánh giá</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Search and Filter Section */}
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
            {/* Search Bar */}
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Tìm kiếm giáo viên theo tên hoặc chuyên môn..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Filters */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <Filter className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Lọc theo:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {filters.map((filter) => {
                  const Icon = filter.icon
                  return (
                    <button
                      key={filter.id}
                      onClick={() => setSelectedFilter(filter.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                        selectedFilter === filter.id
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{filter.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600">
            Hiển thị <span className="font-semibold text-gray-900">{filteredTeachers.length}</span> giáo viên
          </div>
        </div>

        {/* Teachers Grid */}
        {filteredTeachers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredTeachers.map((teacher, index) => (
              <TeacherCard key={index} {...teacher} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Không tìm thấy giáo viên
            </h3>
            <p className="text-gray-600">
              Vui lòng thử tìm kiếm với từ khóa khác hoặc điều chỉnh bộ lọc
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
