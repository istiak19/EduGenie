'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const FeaturedBlogs = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [blogs, setBlogs] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === '' || content === '') {
      setError('Both title and content are required!');
    } else {
      setError('');
      console.log({ title, content });
      setSuccessMessage('Blog submitted successfully!');
      setTitle('');
      setContent('');
    }
  };

  useEffect(() => {
    const fetchedBlogs = [
      {
        id: 1,
        title: 'Understanding Education in the Digital Age',
        description: 'A deep dive into how technology is transforming traditional education methods and learning environments.',
        image: 'https://www.tbsnews.net/sites/default/files/styles/big_3/public/images/2020/07/12/online-class.png',
        link: '/blog/1'
      },
      {
        id: 2,
        title: 'The Future of Online Learning',
        description: 'Exploring the growing trends in eLearning and its potential to revolutionize how we acquire new skills.',
        image: 'https://cdn.prod.website-files.com/6763a77a64cba1af04cf2867/67a1d9e3c078783dbaf9dc23_64e6bc1b0a20df3f2c56818a_what-is-e-learning-and-what-are-its-benefits.png',
        link: '/blog/2'
      },
      {
        id: 3,
        title: 'How to Balance Work and Study',
        description: 'Practical tips and strategies to help students manage their time effectively between work and academics.',
        image: 'https://trainingindustry.com/content/uploads/2020/01/Workplace-Learning-Trends-1.27.20-2.jpg',
        link: '/blog/3'
      },
    ];
    setBlogs(fetchedBlogs);
  }, []);

  return (
    <div className="mx-auto py-10 container">
      <section className="mb-12">
        <h2 className="mb-8 font-semibold text-gray-800 text-4xl text-center">Featured Blog Posts</h2>
        <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <div key={blog.id} className="bg-white shadow-xl hover:shadow-2xl rounded-lg overflow-hidden transition-shadow duration-300">
              <img src={blog.image} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="font-semibold text-gray-800 hover:text-teal-600 text-2xl transition-colors duration-200">{blog.title}</h3>
                <p className="mt-4 text-gray-600">{blog.description}</p>
                <Link href={blog.link} className="inline-block mt-6 font-medium text-teal-600 hover:text-teal-800 transition-colors duration-200">Read More</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12 text-center">
        <h2 className="mb-6 font-semibold text-gray-800 text-4xl">Share Your Knowledge</h2>
        <p className="mb-8 text-gray-600 text-lg">Are you a student or educator with a passion for writing? We would love to feature your blog!</p>
      </section>

      <section className="bg-white shadow-xl hover:shadow-2xl mx-auto mb-12 p-8 rounded-lg max-w-2xl transition-shadow duration-300">
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block mb-2 font-semibold text-gray-800 text-lg">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 w-full transition-all duration-200"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="block mb-2 font-semibold text-gray-800 text-lg">Content</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows="6"
              className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 w-full transition-all duration-200"
            ></textarea>
            <div className="mt-2 text-gray-600 text-sm">
              {content.length}/500 characters
            </div>
          </div>
          {error && <div className="mt-2 text-red-600 text-sm">{error}</div>}
          {successMessage && <div className="mt-2 text-green-600 text-sm">{successMessage}</div>}
          <button type="submit" className="bg-teal-600 hover:bg-teal-700 py-3 rounded-md w-full text-white transition-all duration-200">Submit Blog</button>
        </form>
      </section>
    </div>
  );
};


export default FeaturedBlogs;
