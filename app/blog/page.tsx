'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  Calendar,
  User,
  ArrowRight,
  TrendingUp,
  BookOpen,
} from 'lucide-react';

export default function Blog() {
  const [blogPosts, setBlogPosts] = useState<any[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedBlogs = JSON.parse(localStorage.getItem('blogs') || '[]');
      setBlogPosts(storedBlogs);
    }
  }, []);

  const categories = [
    'All',
    'Technology',
    'Grounds',
    'Umpiring',
    'Streaming',
    'Scoring',
    'Community',
  ];

  if (!blogPosts || blogPosts.length === 0) {
    return (
      <main className="pt-16">
        <section className="py-16 text-center">
          <h2 className="text-2xl font-bold text-gray-800">No Blogs Found</h2>
          <p className="text-gray-600 mt-2">
            Admin has not added any blogs yet. Please check back later.
          </p>
        </section>
      </main>
    );
  }

  return (
    <main className="pt-16">
      {/* Hero Section */}
      <section className="py-14 bg-gradient-to-br from-green-50 to-orange-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Cricket</span>{' '}
            <span className="text-gray-800">Stories & News</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest cricket insights and news from the
            professional cricket services world.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-6 bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-1.5 rounded-full border border-green-200 text-green-700 text-sm hover:bg-green-500 hover:text-white transition-all duration-300"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Story */}
      <section className="py-14 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <span className="text-green-600 font-semibold text-xs uppercase tracking-wide">
              Featured Story
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Featured Story - Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-green-50 to-orange-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
                {blogPosts[0].image && (
                  <img
                    src={blogPosts[0].image}
                    alt={blogPosts[0].title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}
                <div className="flex items-center space-x-3 mb-3">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                    {blogPosts[0].category}
                  </span>
                  <div className="flex items-center text-gray-500 text-xs">
                    <Calendar className="w-3 h-3 mr-1" />
                    {blogPosts[0].date}
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  {blogPosts[0].title}
                </h2>

                {/* Author Display */}
                <div className="flex items-center space-x-2 mb-4">
                  <User className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">
                    By <strong>{blogPosts[0].author}</strong>
                  </span>
                </div>

                {/* Excerpt */}
                <p className="text-sm text-gray-600 mb-4">
                  {blogPosts[0].excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <Link
                    href={`/blog/${blogPosts[0].id}`}
                    className="bg-green-600 text-white px-4 py-2 text-xs rounded-full hover:bg-green-700 transition-all duration-300 flex items-center space-x-1"
                  >
                    <span>Read Full Story</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Featured Story - Sidebar Info */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-orange-100 to-red-100 rounded-xl p-6 h-full flex flex-col items-center justify-center text-center shadow-md">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center mb-4">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Editor&apos;s Pick
                </h3>
                <p className="text-gray-600 text-xs leading-relaxed">
                  Our most engaging story this week, handpicked by our editorial
                  team.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vertical Blog Cards Section */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Latest Stories</h2>
            <p className="text-gray-600 text-sm">
              Insights and updates from the cricket world
            </p>
          </div>

          {/* Vertical Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.slice(1).map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
              >
                {/* Blog Image */}
                {post.image && (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-40 object-cover"
                  />
                )}

                {/* Blog Content */}
                <div className="p-4 flex-1 flex flex-col">
                  {/* Category and Date */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                    <div className="flex items-center text-gray-400 text-xs">
                      <Calendar className="w-3 h-3 mr-1" />
                      {post.date}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 hover:text-green-600 transition-colors">
                    <Link href={`/blog/${post.id}`}>{post.title}</Link>
                  </h3>

                  {/* Author */}
                  <div className="flex items-center text-xs text-gray-700 mb-3">
                    <User className="w-3 h-3 mr-1 text-green-600" />
                    <span>By {post.author}</span>
                  </div>

                  {/* Excerpt */}
                  <p className="text-gray-600 text-sm line-clamp-2 flex-1">
                    {post.excerpt}
                  </p>

                  {/* Read More Button */}
                  <div className="mt-3">
                    <Link
                      href={`/blog/${post.id}`}
                      className="text-green-600 hover:text-green-700 font-medium text-xs flex items-center space-x-1"
                    >
                      <span>Read More</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
