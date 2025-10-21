'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Calendar, User, ArrowLeft } from 'lucide-react';

export default function BlogDetail() {
  const params = useParams();
  const router = useRouter();

  // Safely extract ID
  const id = params?.id as string | undefined;

  const [blog, setBlog] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && id) {
      const storedBlogs = JSON.parse(localStorage.getItem('blogs') || '[]');

      // Ensure the ID is a string before comparing
      const foundBlog = storedBlogs.find((b: any) => b.id?.toString() === id.toString());

      setBlog(foundBlog || null);
    }
  }, [id]);

  // If id is missing or blog not found
  if (!id) {
    return (
      <main className="pt-16">
        <section className="py-16 text-center">
          <h2 className="text-2xl font-bold text-gray-800">Invalid Blog ID</h2>
          <p className="text-gray-600 mt-2">
            The blog ID is missing or invalid.
          </p>
          <button
            onClick={() => router.push('/blog')}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Back to Blog
          </button>
        </section>
      </main>
    );
  }

  if (!blog) {
    return (
      <main className="pt-16">
        <section className="py-16 text-center">
          <h2 className="text-2xl font-bold text-gray-800">Blog Not Found</h2>
          <p className="text-gray-600 mt-2">
            This blog post may have been removed or doesn't exist.
          </p>
          <button
            onClick={() => router.push('/blog')}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Back to Blog
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="pt-16">
      <section className="py-10 bg-gradient-to-br from-green-50 to-orange-50">
        <div className="max-w-4xl mx-auto px-4">
          <button
            onClick={() => router.push('/blog')}
            className="mb-4 flex items-center text-green-700 hover:underline"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Blog
          </button>

          {/* Blog Header */}
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{blog.title}</h1>
          <div className="flex items-center space-x-4 text-gray-600 mb-6">
            <div className="flex items-center text-sm">
              <User className="w-4 h-4 mr-1 text-green-600" />
              <span>{blog.author}</span>
            </div>
            <div className="flex items-center text-sm">
              <Calendar className="w-4 h-4 mr-1 text-green-600" />
              <span>{blog.date}</span>
            </div>
          </div>

          {/* Blog Image */}
          {blog.image && (
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-80 object-cover rounded-lg mb-6"
            />
          )}

          {/* Blog Content */}
          <div className="prose prose-green max-w-none">
            <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
              {blog.content || blog.excerpt || 'No content available for this blog.'}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
