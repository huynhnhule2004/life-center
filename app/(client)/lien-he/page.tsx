import ContactForm from '@/components/ContactForm'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export const metadata = {
  title: 'Liên hệ - English Life Center',
  description: 'Liên hệ với English Life Center để được tư vấn và hỗ trợ',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Simple and Clean */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Liên hệ với chúng tôi
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Hãy để lại thông tin, chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column: Contact Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Information Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Thông tin liên hệ</h2>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 mb-1">Địa chỉ</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      123 Đường ABC, Phường XYZ<br />
                      Quận 1, TP. Hồ Chí Minh
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 mb-1">Số điện thoại</h3>
                    <a 
                      href="tel:0123456789" 
                      className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      0123 456 789
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 mb-1">Email</h3>
                    <a 
                      href="mailto:contact@englishlifecenter.com" 
                      className="text-sm text-gray-600 hover:text-blue-600 transition-colors break-all"
                    >
                      contact@englishlifecenter.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-orange-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 mb-1">Giờ làm việc</h3>
                    <p className="text-sm text-gray-600">
                      Thứ 2 - Thứ 6: 8:00 - 20:00<br />
                      Thứ 7 - CN: 8:00 - 17:00
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps Card - Hidden on mobile, shown on lg+ */}
            <div className="hidden lg:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Vị trí</h2>
              </div>
              <div className="p-4">
                <div className="aspect-square w-full rounded-lg overflow-hidden border border-gray-200">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4948839108746!2d106.69525731533436!3d10.77264899230295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f4b3330bcc9%3A0xebc3c0e9b5b7c203!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBLaG9hIGjhu41jIFThu7Egbmhpw6pu!5e0!3m2!1svi!2s!4v1234567890123!5m2!1svi!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Google Maps Location"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow h-full">
              <div className="bg-gray-50 px-6 py-4 sm:px-8 sm:py-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Gửi tin nhắn cho chúng tôi</h2>
                <p className="text-gray-600 mt-1 text-sm">
                  Điền thông tin bên dưới và chúng tôi sẽ phản hồi trong vòng 24 giờ
                </p>
              </div>
              <div className="p-6 sm:p-8">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>

        {/* Google Maps - Shown only on mobile/tablet */}
        <div className="lg:hidden mt-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Vị trí của chúng tôi</h2>
            </div>
            <div className="p-4">
              <div className="aspect-video w-full rounded-lg overflow-hidden border border-gray-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4948839108746!2d106.69525731533436!3d10.77264899230295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f4b3330bcc9%3A0xebc3c0e9b5b7c203!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBLaG9hIGjhu41jIFThu7Egbmhpw6pu!5e0!3m2!1svi!2s!4v1234567890123!5m2!1svi!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Maps Location"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
