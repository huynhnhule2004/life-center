"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center">
          <Image 
            src="/images/logo.png" 
            alt="Life Center" 
            width={160} 
            height={48}
            className="object-contain h-10 sm:h-12 w-auto"
            priority
          />
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/khoa-hoc" className="text-sm font-medium hover:text-primary transition-colors">
            Khóa học
          </Link>
          <Link href="/gioi-thieu" className="text-sm font-medium hover:text-primary transition-colors">
            Về chúng tôi
          </Link>
          <Link href="/giao-vien" className="text-sm font-medium hover:text-primary transition-colors">
            Giáo viên
          </Link>
          <Link href="/bai-viet" className="text-sm font-medium hover:text-primary transition-colors">
            Bài viết
          </Link>
          <Link href="/lien-he" className="text-sm font-medium hover:text-primary transition-colors">
            Liên hệ
          </Link>
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dang-nhap">Đăng nhập</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/dang-ky">Đăng ký</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link 
              href="/khoa-hoc" 
              className="text-sm font-medium hover:text-primary transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Khóa học
            </Link>
            <Link 
              href="/gioi-thieu" 
              className="text-sm font-medium hover:text-primary transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Về chúng tôi
            </Link>
            <Link 
              href="/giao-vien" 
              className="text-sm font-medium hover:text-primary transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Giáo viên
            </Link>
            <Link 
              href="/lien-he" 
              className="text-sm font-medium hover:text-primary transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Liên hệ
            </Link>
            <div className="flex flex-col gap-2 pt-4 border-t">
              <Button variant="ghost" size="sm" asChild className="w-full">
                <Link href="/dang-nhap" onClick={() => setMobileMenuOpen(false)}>Đăng nhập</Link>
              </Button>
              <Button size="sm" asChild className="w-full">
                <Link href="/dang-ky" onClick={() => setMobileMenuOpen(false)}>Đăng ký</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
