// Types
interface Course {
  id: string
  title: string
  description: string
  thumbnail_url: string
  duration_hours: number
  level: string
  price: number
  is_published: boolean
  category?: string
  created_at?: string
}

interface Testimonial {
  id: string
  student_name: string
  content: string
  avatar_url: string
  rating: number
}

interface Teacher {
  id: string
  full_name: string
  specialization: string
  avatar_url: string
}

// Fake data for development
const FAKE_COURSES: Course[] = [
  {
    id: '1',
    title: 'English for Beginners',
    description: 'Khóa học tiếng Anh cơ bản dành cho người mới bắt đầu',
    thumbnail_url: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=500',
    duration_hours: 40,
    level: 'Beginner',
    price: 0,
    is_published: true
  },
  {
    id: '2',
    title: 'Business English',
    description: 'Nâng cao kỹ năng tiếng Anh trong môi trường công sở',
    thumbnail_url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500',
    duration_hours: 60,
    level: 'Intermediate',
    price: 1500000,
    is_published: true
  },
  {
    id: '3',
    title: 'IELTS Preparation',
    description: 'Chuẩn bị kỹ lưỡng cho kỳ thi IELTS',
    thumbnail_url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500',
    duration_hours: 80,
    level: 'Advanced',
    price: 2000000,
    is_published: true
  }
]

const FAKE_TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    student_name: 'Nguyễn Văn A',
    content: 'Khóa học rất bổ ích, giáo viên nhiệt tình. Tôi đã cải thiện được kỹ năng tiếng Anh của mình rất nhiều.',
    avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
    rating: 5
  },
  {
    id: '2',
    student_name: 'Trần Thị B',
    content: 'Chương trình học được thiết kế rất khoa học. Sau khóa học, tôi tự tin hơn rất nhiều khi giao tiếp tiếng Anh.',
    avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2',
    rating: 5
  },
  {
    id: '3',
    student_name: 'Lê Văn C',
    content: 'Môi trường học tập chuyên nghiệp, giáo viên tận tâm. Đây là lựa chọn tuyệt vời cho ai muốn học tiếng Anh.',
    avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3',
    rating: 5
  },
  {
    id: '4',
    student_name: 'Phạm Thị D',
    content: 'Tôi rất hài lòng với khóa học. Nội dung phong phú, thực tế và dễ hiểu.',
    avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=4',
    rating: 5
  }
]

const FAKE_TEACHERS: Teacher[] = [
  {
    id: '1',
    full_name: 'John Smith',
    specialization: 'IELTS Expert',
    avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=teacher1'
  },
  {
    id: '2',
    full_name: 'Sarah Johnson',
    specialization: 'Business English',
    avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=teacher2'
  },
  {
    id: '3',
    full_name: 'Michael Brown',
    specialization: 'Conversation Expert',
    avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=teacher3'
  },
  {
    id: '4',
    full_name: 'Emily Davis',
    specialization: 'Grammar Specialist',
    avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=teacher4'
  }
]

// Fake data for course details
const FAKE_COURSE_DETAILS = [
  {
    id: '1',
    title: 'English for Beginners',
    description: `Khóa học tiếng Anh cơ bản dành cho người mới bắt đầu. Chương trình được thiết kế khoa học, giúp bạn nắm vững nền tảng tiếng Anh từ con số 0.

## Bạn sẽ học được gì?

- **Từ vựng cơ bản**: Học 1000+ từ vựng thông dụng nhất trong giao tiếp hàng ngày
- **Ngữ pháp nền tảng**: Nắm vững các thì cơ bản, cấu trúc câu đơn giản
- **Phát âm chuẩn**: Luyện phát âm từng âm tiết, giọng chuẩn Anh - Mỹ
- **Giao tiếp thực tế**: Thực hành các tình huống giao tiếp hàng ngày

## Phương pháp học

Khóa học kết hợp lý thuyết và thực hành, với nhiều bài tập tương tác, video minh họa sinh động.

## Đối tượng phù hợp

- Người mới bắt đầu học tiếng Anh
- Người muốn xây dựng nền tảng vững chắc
- Học viên cần cải thiện kỹ năng giao tiếp cơ bản`,
    thumbnail_url: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800',
    category: 'Cơ bản',
    price: 0,
    level: 'Beginner',
    duration_hours: 40,
    teacher_id: '1',
    student_count: 1250,
    is_published: true
  },
  {
    id: '2',
    title: 'Business English',
    description: `Nâng cao kỹ năng tiếng Anh trong môi trường công sở chuyên nghiệp.

## Nội dung chính

- **Email công việc**: Viết email chuyên nghiệp, rõ ràng và hiệu quả
- **Thuyết trình**: Kỹ năng trình bày ý tưởng, báo cáo công việc
- **Đàm phán**: Từ vựng và cấu trúc câu trong đàm phán kinh doanh
- **Họp hành**: Cách tham gia và điều hành cuộc họp bằng tiếng Anh

## Đối tượng phù hợp

- Nhân viên văn phòng muốn nâng cao kỹ năng tiếng Anh
- Người chuẩn bị đi làm tại công ty nước ngoài
- Quản lý cần giao tiếp với đối tác quốc tế`,
    thumbnail_url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
    category: 'Doanh nghiệp',
    price: 1500000,
    level: 'Intermediate',
    duration_hours: 60,
    teacher_id: '2',
    student_count: 890,
    is_published: true
  },
  {
    id: '3',
    title: 'IELTS Preparation',
    description: `Chuẩn bị kỹ lưỡng cho kỳ thi IELTS với đội ngũ giảng viên chuyên môn cao.

## Cấu trúc khóa học

### Listening (Nghe)
- Các dạng bài thi IELTS Listening
- Kỹ thuật nghe và ghi chú hiệu quả
- Luyện nghe với đề thi thật

### Reading (Đọc)
- Phương pháp đọc hiểu nhanh
- Các dạng câu hỏi thường gặp
- Chiến lược làm bài tối ưu

### Writing (Viết)
- Task 1: Mô tả biểu đồ, quy trình
- Task 2: Viết bài luận học thuật
- Từ vựng và cấu trúc band cao

### Speaking (Nói)
- 3 phần thi Speaking IELTS
- Mock test với giám khảo
- Phản hồi chi tiết và cải thiện

## Cam kết đầu ra

- Band 6.5+ sau 3 tháng học
- Tài liệu học tập độc quyền
- Luyện đề mới nhất hàng tuần`,
    thumbnail_url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800',
    category: 'Luyện thi',
    price: 2000000,
    level: 'Advanced',
    duration_hours: 80,
    teacher_id: '1',
    student_count: 2100,
    is_published: true
  }
]

export async function getFeaturedCourses(limit: number = 3): Promise<Course[]> {
  await new Promise(resolve => setTimeout(resolve, 100)) // Simulate API delay
  return FAKE_COURSES.slice(0, limit)
}

export async function getTestimonials(): Promise<Testimonial[]> {
  await new Promise(resolve => setTimeout(resolve, 100))
  return FAKE_TESTIMONIALS
}

export async function getFeaturedTeachers(limit: number = 4): Promise<Teacher[]> {
  await new Promise(resolve => setTimeout(resolve, 100))
  return FAKE_TEACHERS.slice(0, limit)
}

export async function getCourseById(id: string) {
  await new Promise(resolve => setTimeout(resolve, 100))
  return FAKE_COURSE_DETAILS.find(course => course.id === id) || null
}

export async function getAllCourseIds() {
  await new Promise(resolve => setTimeout(resolve, 100))
  return FAKE_COURSE_DETAILS.filter(c => c.is_published).map(course => course.id)
}

export async function getTeacherById(id: string) {
  await new Promise(resolve => setTimeout(resolve, 100))
  return FAKE_TEACHERS.find(teacher => teacher.id === id) || null
}
