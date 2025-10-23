import { Users, BookOpen, DollarSign, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const stats = [
  {
    title: 'Tổng học viên',
    value: '1,234',
    change: '+12%',
    icon: Users,
    color: 'bg-blue-500',
  },
  {
    title: 'Khóa học',
    value: '45',
    change: '+3',
    icon: BookOpen,
    color: 'bg-green-500',
  },
  {
    title: 'Doanh thu tháng',
    value: '125M',
    change: '+8%',
    icon: DollarSign,
    color: 'bg-yellow-500',
  },
  {
    title: 'Tăng trưởng',
    value: '23%',
    change: '+5%',
    icon: TrendingUp,
    color: 'bg-purple-500',
  },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Tổng quan hệ thống English Life Center</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-green-600 mt-1">{stat.change} so với tháng trước</p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Students */}
        <Card>
          <CardHeader>
            <CardTitle>Học viên mới</CardTitle>
            <CardDescription>Danh sách học viên đăng ký gần đây</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                    HV{i}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Học viên {i}</p>
                    <p className="text-sm text-gray-500">Đăng ký: {i} giờ trước</p>
                  </div>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Mới</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Courses */}
        <Card>
          <CardHeader>
            <CardTitle>Khóa học phổ biến</CardTitle>
            <CardDescription>Các khóa học có nhiều học viên nhất</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded bg-green-100 flex items-center justify-center text-green-600 font-medium">
                      {i}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Khóa học {i}</p>
                      <p className="text-sm text-gray-500">{20 + i} học viên</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{100 - i * 5}%</p>
                    <p className="text-xs text-gray-500">Đạt được</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
