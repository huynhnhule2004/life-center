import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center">
              <Image 
                src="/images/logo.png" 
                alt="Life Center" 
                width={160} 
                height={48}
                className="object-contain h-12 sm:h-14 w-auto"
              />
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Khơi nguồn tri thức, kiến tạo tương lai cùng Life Center
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-base">Liên kết nhanh</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/khoa-hoc" className="text-muted-foreground hover:text-primary transition-colors">
                  Khóa học
                </Link>
              </li>
              <li>
                <Link href="/gioi-thieu" className="text-muted-foreground hover:text-primary transition-colors">
                  Về chúng tôi
                </Link>
              </li>
              <li>
                <Link href="/giao-vien" className="text-muted-foreground hover:text-primary transition-colors">
                  Giáo viên
                </Link>
              </li>
              <li>
                <Link href="/lien-he" className="text-muted-foreground hover:text-primary transition-colors">
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4 text-base">Hỗ trợ</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/tro-giup" className="text-muted-foreground hover:text-primary transition-colors">
                  Trung tâm trợ giúp
                </Link>
              </li>
              <li>
                <Link href="/cau-hoi-thuong-gap" className="text-muted-foreground hover:text-primary transition-colors">
                  Câu hỏi thường gặp
                </Link>
              </li>
              <li>
                <Link href="/dieu-khoan" className="text-muted-foreground hover:text-primary transition-colors">
                  Điều khoản sử dụng
                </Link>
              </li>
              <li>
                <Link href="/chinh-sach-bao-mat" className="text-muted-foreground hover:text-primary transition-colors">
                  Chính sách bảo mật
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="font-semibold mb-4 text-base">Liên hệ</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <a href="tel:+84123456789" className="hover:text-primary transition-colors">
                  +84 123 456 789
                </a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <a href="mailto:info@lifecenter.vn" className="hover:text-primary transition-colors">
                  info@lifecenter.vn
                </a>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>123 Đường ABC, Quận XYZ, TP. HCM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-6 sm:pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Life Center. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
