import Image from 'next/image'
import { Award, BookOpen, Globe, Star } from 'lucide-react'

interface TeacherCardProps {
  name: string
  title: string
  image: string
  specialization: string[]
  experience: string
  education: string
  rating: number
  studentsCount: number
  languages: string[]
  bio: string
}

export default function TeacherCard({
  name,
  title,
  image,
  specialization,
  experience,
  education,
  rating,
  studentsCount,
  languages,
  bio
}: TeacherCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group">
      {/* Teacher Image */}
      <div className="relative h-64 sm:h-72 bg-gradient-to-br from-blue-50 to-indigo-50 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Rating Badge */}
        <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1.5 shadow-md flex items-center space-x-1 z-20">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          <span className="text-sm font-semibold text-gray-900">{rating}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Name and Title */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-1">{name}</h3>
          <p className="text-sm text-blue-600 font-medium">{title}</p>
        </div>

        {/* Bio */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{bio}</p>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-gray-100">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{studentsCount}+</div>
            <div className="text-xs text-gray-500">Học viên</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{experience}</div>
            <div className="text-xs text-gray-500">Kinh nghiệm</div>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-3 mb-4">
          <div className="flex items-start space-x-3">
            <Award className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <div className="text-xs text-gray-500 mb-1">Chuyên môn</div>
              <div className="flex flex-wrap gap-1">
                {specialization.map((spec, index) => (
                  <span
                    key={index}
                    className="inline-block bg-purple-50 text-purple-700 text-xs px-2 py-1 rounded-full"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <BookOpen className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <div className="text-xs text-gray-500 mb-1">Học vấn</div>
              <div className="text-sm text-gray-700">{education}</div>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Globe className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <div className="text-xs text-gray-500 mb-1">Ngôn ngữ</div>
              <div className="text-sm text-gray-700">{languages.join(', ')}</div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200">
          Xem chi tiết
        </button>
      </div>
    </div>
  )
}
