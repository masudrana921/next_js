"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  Globe,
  Github,
  Linkedin,
  Twitter,
  Award,
  Clock,
  DollarSign,
  Star,
  Users,
  CheckCircle,
  FileText,
  Download,
  Share2,
  MoreHorizontal,
  Edit,
  MessageCircle,
  Shield,
  Languages,
  GraduationCap,
  Heart,
  Settings,
  LogOut,
  Sun,
  Moon
} from "lucide-react";
import api from "@/services/api/axiosClient";

interface Profile {
  id: number;
  profile_image: string | null;
  user: string;
  email: string | null;
  bio: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  postal_code: string | null;
  gender: string | null;
  date_of_birth: string | null;
  phone: string | null;
  country: string | null;
  created_at: string;
  updated_at: string;

  // Additional freelancer fields
  title?: string;
  hourly_rate?: number;
  skills?: string[];
  languages?: { language: string; proficiency: string }[];
  education?: { degree: string; institution: string; year: string }[];
  certifications?: { name: string; issuer: string; year: string }[];
  portfolio_items?: { title: string; image: string; link: string }[];
  social_links?: { github?: string; linkedin?: string; twitter?: string; website?: string };
  completed_projects?: number;
  total_earnings?: number;
  rating?: number;
  total_reviews?: number;
  availability?: "available" | "busy" | "not_available";
  member_since?: string;
  hourly_rate_range?: { min: number; max: number };
  preferred_work?: string[];
  work_history?: { client: string; project: string; duration: string; description: string }[];
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check for saved theme preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/profile-details/");
        // Mock data for demonstration - replace with actual API response
        setProfile({
          ...res.data,
          title: "Senior Full Stack Developer & UI/UX Designer",
          hourly_rate: 65,
          skills: ["React", "Next.js", "TypeScript", "Node.js", "Python", "Django", "PostgreSQL", "TailwindCSS", "Figma", "AWS"],
          languages: [
            { language: "English", proficiency: "Native" },
            { language: "Spanish", proficiency: "Professional" },
            { language: "French", proficiency: "Conversational" }
          ],
          education: [
            { degree: "M.S. in Computer Science", institution: "Stanford University", year: "2018-2020" },
            { degree: "B.S. in Software Engineering", institution: "MIT", year: "2014-2018" }
          ],
          certifications: [
            { name: "AWS Certified Solutions Architect", issuer: "Amazon Web Services", year: "2023" },
            { name: "Professional Scrum Master I", issuer: "Scrum.org", year: "2022" },
            { name: "Google UX Design Certificate", issuer: "Google", year: "2021" }
          ],
          portfolio_items: [
            { title: "E-commerce Platform", image: "/api/placeholder/300/200", link: "#" },
            { title: "Healthcare Dashboard", image: "/api/placeholder/300/200", link: "#" },
            { title: "Mobile Banking App", image: "/api/placeholder/300/200", link: "#" }
          ],
          social_links: {
            github: "https://github.com/johndoe",
            linkedin: "https://linkedin.com/in/johndoe",
            twitter: "https://twitter.com/johndoe",
            website: "https://johndoe.dev"
          },
          completed_projects: 87,
          total_earnings: 245000,
          rating: 4.95,
          total_reviews: 234,
          availability: "available",
          member_since: "2020",
          hourly_rate_range: { min: 55, max: 85 },
          preferred_work: ["Web Development", "Mobile Apps", "Cloud Architecture", "UI/UX Design"],
          work_history: [
            { client: "TechCorp Inc.", project: "Cloud Migration", duration: "6 months", description: "Led the migration of legacy systems to AWS cloud infrastructure." },
            { client: "StartupXYZ", project: "Mobile App Development", duration: "4 months", description: "Developed a cross-platform mobile app using React Native." }
          ]
        });
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Top Navigation Bar */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">FreelancerHub</h1>
              <nav className="hidden md:flex space-x-1">
                <button className="px-3 py-2 text-sm font-medium text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 rounded-lg">Profile</button>
                <button className="px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">Projects</button>
                <button className="px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">Messages</button>
                <button className="px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">Analytics</button>
              </nav>
            </div>
            <div className="flex items-center space-x-3">
              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className="p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                <MessageCircle className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                <Settings className="w-5 h-5" />
              </button>
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6">
        {/* Profile Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-6 transition-colors duration-300">
          {/* Cover Photo with Gradient */}
          <div className="h-64 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative">
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <div className="absolute -bottom-20 left-8 flex items-end space-x-6">
              <div className="relative">
                <div className="relative group">
                  <Image
                    src={profile.profile_image || "/api/placeholder/160/160"}
                    alt={profile.user}
                    width={160}
                    unoptimized
                    height={160}
                    className="rounded-2xl border-4 border-white dark:border-gray-800 shadow-2xl"
                  />
                  <button className="absolute bottom-2 right-2 bg-blue-600 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition shadow-lg hover:bg-blue-700">
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
                <div className="absolute -top-2 -right-2">
                  <div className="bg-green-500 w-5 h-5 rounded-full border-2 border-white dark:border-gray-800"></div>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex items-center space-x-3">
                  <h1 className="text-3xl font-bold text-black dark:text-white drop-shadow-md">
                    {profile.user}
                  </h1>
                  <div className="bg-white/60 backdrop-blur-sm px-3 py-1 rounded-full text-sm text-gray-800 dark:bg-gray-800/60 dark:text-white flex items-center shadow-md">
                    <Shield className="w-4 h-4 mr-1" />
                    Verified
                  </div>
                </div>
                <p className="text-xl text-gray-800 dark:text-white/90 drop-shadow-md mt-1">
                  {profile.title}
                </p>
              </div>
            </div>
          </div>

          {/* Profile Info Bar */}
          <div className="pt-24 px-8 pb-6">
            <div className="flex flex-wrap justify-between items-center gap-4">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="ml-1 font-semibold text-gray-900 dark:text-white">{profile.rating}</span>
                  </div>
                  <span className="text-gray-400 dark:text-gray-500">({profile.total_reviews} reviews)</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <Briefcase className="w-5 h-5" />
                  <span>{profile.completed_projects} projects completed</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <Users className="w-5 h-5" />
                  <span>Member since {profile.member_since}</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-medium flex items-center shadow-lg shadow-blue-200 dark:shadow-none">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </button>
                <button className="p-2 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  <Share2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
                <button className="p-2 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  <MoreHorizontal className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
              </div>
            </div>

            {/* Availability Badge */}
            <div className="mt-4 flex items-center">
              <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${
                profile.availability === 'available' 
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                  : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
              }`}>
                <Clock className="w-4 h-4 mr-1" />
                {profile.availability === 'available' ? 'Available for work' : 'Currently busy'}
              </div>
              <div className="ml-3 px-3 py-1 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 rounded-full text-sm font-medium flex items-center">
                <DollarSign className="w-4 h-4 mr-1" />
                ${profile.hourly_rate_range?.min} - ${profile.hourly_rate_range?.max}/hr
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid - Moved outside of profile header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Details */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-colors duration-300">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contact Information</h2>
              <div className="space-y-4">
                {profile.email && (
                  <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400 group hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                    <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                      <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-500">Email</p>
                      <p className="font-medium text-gray-900 dark:text-white">{profile.email}</p>
                    </div>
                  </div>
                )}
                {profile.phone && (
                  <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400 group hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                    <div className="w-10 h-10 bg-green-50 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                      <Phone className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-500">Phone</p>
                      <p className="font-medium text-gray-900 dark:text-white">{profile.phone}</p>
                    </div>
                  </div>
                )}
                {(profile.city || profile.country) && (
                  <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                    <div className="w-10 h-10 bg-red-50 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-500">Location</p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {[profile.city, profile.state, profile.country].filter(Boolean).join(', ')}
                      </p>
                    </div>
                  </div>
                )}
                {profile.created_at && (
                  <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                    <div className="w-10 h-10 bg-purple-50 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-500">Member Since</p>
                      <p className="font-medium text-gray-900 dark:text-white">{new Date(profile.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Languages Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-colors duration-300">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Languages className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                Languages
              </h2>
              <div className="space-y-3">
                {profile.languages?.map((lang, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-gray-700 dark:text-gray-300">{lang.language}</span>
                    <span className="text-sm px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-400">
                      {lang.proficiency}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Education Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-colors duration-300">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <GraduationCap className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                Education
              </h2>
              <div className="space-y-4">
                {profile.education?.map((edu, index) => (
                  <div key={index} className="border-l-2 border-blue-200 dark:border-blue-800 pl-3">
                    <p className="font-medium text-gray-900 dark:text-white">{edu.degree}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{edu.institution}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{edu.year}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-colors duration-300">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Award className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                Certifications
              </h2>
              <div className="space-y-3">
                {profile.certifications?.map((cert, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{cert.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{cert.issuer} • {cert.year}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-colors duration-300">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Social Profiles</h2>
              <div className="flex space-x-3">
                {profile.social_links?.github && (
                  <a href={profile.social_links.github} className="w-10 h-10 bg-gray-900 dark:bg-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-800 dark:hover:bg-gray-600 transition">
                    <Github className="w-5 h-5 text-white" />
                  </a>
                )}
                {profile.social_links?.linkedin && (
                  <a href={profile.social_links.linkedin} className="w-10 h-10 bg-blue-600 dark:bg-blue-700 rounded-lg flex items-center justify-center hover:bg-blue-700 dark:hover:bg-blue-600 transition">
                    <Linkedin className="w-5 h-5 text-white" />
                  </a>
                )}
                {profile.social_links?.twitter && (
                  <a href={profile.social_links.twitter} className="w-10 h-10 bg-sky-500 dark:bg-sky-600 rounded-lg flex items-center justify-center hover:bg-sky-600 dark:hover:bg-sky-500 transition">
                    <Twitter className="w-5 h-5 text-white" />
                  </a>
                )}
                {profile.social_links?.website && (
                  <a href={profile.social_links.website} className="w-10 h-10 bg-purple-600 dark:bg-purple-700 rounded-lg flex items-center justify-center hover:bg-purple-700 dark:hover:bg-purple-600 transition">
                    <Globe className="w-5 h-5 text-white" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tabs */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-colors duration-300">
              <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="flex space-x-8 px-6" aria-label="Tabs">
                  {["overview", "portfolio", "work history", "reviews"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition ${
                        activeTab === tab
                          ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                          : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === "overview" && (
                  <div className="space-y-6">
                    {/* Bio */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">About Me</h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {profile.bio || "No bio provided"}
                      </p>
                    </div>

                    {/* Skills */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Skills & Expertise</h3>
                      <div className="flex flex-wrap gap-2">
                        {profile.skills?.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-400 rounded-lg text-sm font-medium border border-blue-100 dark:border-blue-800"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Preferred Work */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Preferred Work</h3>
                      <div className="flex flex-wrap gap-2">
                        {profile.preferred_work?.map((work, index) => (
                          <span
                            key={index}
                            className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium"
                          >
                            {work}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Work History */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Recent Work History</h3>
                      <div className="space-y-4">
                        {profile.work_history?.map((work, index) => (
                          <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-semibold text-gray-900 dark:text-white">{work.project}</h4>
                              <span className="text-sm text-gray-500 dark:text-gray-400">{work.duration}</span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Client: {work.client}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{work.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-4 pt-4">
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-lg p-4 text-center">
                        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{profile.completed_projects}+</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Projects</p>
                      </div>
                      <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 rounded-lg p-4 text-center">
                        <p className="text-2xl font-bold text-green-600 dark:text-green-400">{profile.total_reviews}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Reviews</p>
                      </div>
                      <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 rounded-lg p-4 text-center">
                        <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">100%</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Success</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "portfolio" && (
                  <div className="grid grid-cols-2 gap-4">
                    {profile.portfolio_items?.map((item, index) => (
                      <div key={index} className="group relative rounded-lg overflow-hidden shadow-md">
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={300}
                          height={200}
                          className="w-full h-48 object-cover group-hover:scale-110 transition duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent opacity-0 group-hover:opacity-100 transition">
                          <div className="absolute bottom-0 left-0 right-0 p-4">
                            <h4 className="text-white font-semibold">{item.title}</h4>
                            <a href={item.link} className="text-sm text-blue-300 hover:text-blue-200">View Project →</a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "reviews" && (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <Star className="w-12 h-12 mx-auto mb-3 text-gray-400 dark:text-gray-600" />
                    <p>Reviews will appear here</p>
                  </div>
                )}

                {activeTab === "work history" && (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <Briefcase className="w-12 h-12 mx-auto mb-3 text-gray-400 dark:text-gray-600" />
                    <p>Work history will appear here</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}