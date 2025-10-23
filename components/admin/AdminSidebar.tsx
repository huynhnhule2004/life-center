'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  BookOpen,
  MessageSquare,
  Settings,
  FileText,
  Calendar,
  GraduationCap,
  Tags,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const menuItems = [
  {
    title: 'Dashboard',
    href: '/admin/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Khóa học',
    href: '/admin/courses',    icon: BookOpen,
  },
  {
    title: 'Giáo viên',
    href: '/admin/teachers',
    icon: GraduationCap,
  },
  {
    title: 'Khóa học hiện tại',
    href: '/admin/course-instances',
    icon: Calendar,
  },
  {
    title: 'Tin nhắn',
    href: '/admin/leads',
    icon: MessageSquare,
  },
  {
    title: 'Danh mục',
    href: '/admin/categories',
    icon: Tags,
  },
  {
    title: 'Bài viết',
    href: '/admin/blog-posts',
    icon: FileText,
  },
  {
    title: 'Cài đặt',
    href: '/admin/cai-dat',
    icon: Settings,
  },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen sticky top-0 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <Link href="/admin" className="flex items-center space-x-2">
          <GraduationCap className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="font-bold text-lg text-gray-900">ELC Admin</h1>
            <p className="text-xs text-gray-500">Quản trị hệ thống</p>
          </div>
        </Link>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            return (
              <li key={item.title}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors',
                    isActive
                      ? 'bg-blue-50 text-blue-600 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.title}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* User Info */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3 px-4 py-3">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
            A
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">Admin User</p>
            <p className="text-xs text-gray-500">admin@elc.com</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
