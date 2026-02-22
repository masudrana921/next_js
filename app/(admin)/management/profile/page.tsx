// app/profile/page.tsx
import Image from 'next/image';
import { Mail, Phone, MapPin, Calendar, Briefcase, Globe, Github, Linkedin, Twitter } from 'lucide-react';

export default function ProfilePage() {

  // login user data

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6">
      <div className="max-w-10xl mx-auto">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Cover Photo */}
          <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 relative">
            <div className="absolute -bottom-16 left-8">
              <div className="relative">
                <Image
                  src="/api/placeholder/128/128"
                  alt="Profile"
                  width={128}
                  height={128}
                  className="rounded-full border-4 border-white shadow-lg"
                />
                <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="pt-20 px-8 pb-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-900"></h1>
                <p className="text-lg text-gray-600 mt-1">Senior Software Engineer</p>
                <p className="text-sm text-gray-500 mt-1">@johndoe</p>
              </div>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
                Edit Profile
              </button>
            </div>

            {/* Bio */}
            <div className="mt-6">
              <p className="text-gray-700 leading-relaxed">
                Passionate software engineer with 8+ years of experience in full-stack development. 
                Love building scalable applications and solving complex problems. 
                Open source contributor and tech enthusiast.
              </p>
            </div>

            {/* Contact Info Grid */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 text-gray-600">
                <Mail className="w-5 h-5 text-gray-400" />
                <span>john.doe@example.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <Phone className="w-5 h-5 text-gray-400" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <MapPin className="w-5 h-5 text-gray-400" />
                <span>San Francisco, CA</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <Calendar className="w-5 h-5 text-gray-400" />
                <span>Joined March 2020</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <Briefcase className="w-5 h-5 text-gray-400" />
                <span>Tech Corp Inc.</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <Globe className="w-5 h-5 text-gray-400" />
                <span>johndoe.com</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-8 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-gray-600 transition">
                <Github className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600 transition">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600 transition">
                <Twitter className="w-6 h-6" />
              </a>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 my-8"></div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <p className="text-3xl font-bold text-blue-600">156</p>
                <p className="text-sm text-gray-600 mt-1">Projects Completed</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <p className="text-3xl font-bold text-blue-600">8+</p>
                <p className="text-sm text-gray-600 mt-1">Years Experience</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <p className="text-3xl font-bold text-blue-600">24</p>
                <p className="text-sm text-gray-600 mt-1">Happy Clients</p>
              </div>
            </div>

            {/* Skills Section */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Skills & Expertise</h2>
              <div className="flex flex-wrap gap-2">
                {['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker', 'GraphQL', 'MongoDB', 'PostgreSQL'].map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-100 transition cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Briefcase className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900 font-medium">Completed project: E-commerce Platform</p>
                      <p className="text-sm text-gray-500 mt-1">2 hours ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}