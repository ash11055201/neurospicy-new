'use client'

import { useState } from 'react'

export default function StorySubmissionForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    bookFormat: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
    alert('Thank you for your submission! We will review your story and get back to you.')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <section id="share" className="py-20 bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Share Your Story in the Next <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Neurospicy</span> Book!
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Have you ever thought about sharing your journey with <span className="font-semibold text-red-600">ADHD</span> or <span className="font-semibold text-red-600">Dyslexia</span>?
          </p>
          <p className="text-lg text-gray-700 mb-8">
            Maybe you&apos;ve faced challenges, had unique experiences, or discovered unexpected strengths along the way. Now is your chance to become a published author—no writing experience needed!
          </p>
        </div>

        {/* Why Your Story Matters */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-8 mb-12 shadow-xl border-l-4 border-orange-500">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Why Your Story <span className="text-orange-600">Matters</span>
          </h3>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            The next Neurospicy book will be a collection of real-life experiences from people just like you. We want raw, honest, and powerful stories—whether they&apos;re inspiring, funny, heartbreaking, or eye-opening. This book isn&apos;t about perfect writing; it&apos;s about real voices and real experiences.
          </p>
        </div>

        {/* How It Works */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-6 shadow-xl border-l-4 border-yellow-500">
            <h4 className="text-xl font-bold text-gray-800 mb-4">📝 Submit Your Story</h4>
            <p className="text-gray-700">
              Send us your experience, no matter the format or style. Don&apos;t worry about spelling or grammar—we care about your story, not how polished it is.
            </p>
          </div>
          <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-6 shadow-xl border-l-4 border-orange-500">
            <h4 className="text-xl font-bold text-gray-800 mb-4">✨ Review & Selection</h4>
            <p className="text-gray-700">
              Our team will review all submissions. If your story is selected, we&apos;ll work with you to refine it, ensuring it stays true to your voice.
            </p>
          </div>
          <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-lg p-6 shadow-xl border-l-4 border-red-500">
            <h4 className="text-xl font-bold text-gray-800 mb-4">🎯 We Cover Everything</h4>
            <p className="text-gray-700">
              Publishing, editing, marketing, printing—we take care of it all. There are no costs to you.
            </p>
          </div>
          <div className="bg-gradient-to-r from-pink-50 to-yellow-50 rounded-lg p-6 shadow-xl border-l-4 border-pink-500">
            <h4 className="text-xl font-bold text-gray-800 mb-4">💰 You Earn Royalties</h4>
            <p className="text-gray-700">
              If your story is included, you&apos;ll own a percentage of the book&apos;s royalties, meaning you&apos;ll share in its success!
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-8 shadow-xl border-t-4 border-orange-500">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            No Experience? <span className="text-orange-600">No Problem!</span>
          </h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                  First name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent shadow-sm text-gray-900 bg-white"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                  Last name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent shadow-sm text-gray-900 bg-white"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent shadow-sm text-gray-900 bg-white"
              />
            </div>

            <div>
              <label htmlFor="bookFormat" className="block text-sm font-medium text-gray-700 mb-2">
                Choose an option *
              </label>
              <select
                id="bookFormat"
                name="bookFormat"
                required
                value={formData.bookFormat}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent shadow-sm text-gray-900 bg-white"
              >
                <option value="">Select an option</option>
                <option value="E-Book">E-Book</option>
                <option value="Hard Book">Hard Book</option>
                <option value="Audio Book">Audio Book</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                value={formData.message}
                onChange={handleChange}
                placeholder="Share your story here..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent shadow-sm text-gray-900 bg-white"
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Submit Your Story
              </button>
            </div>
          </form>
        </div>

        {/* Contact Section */}
        <div id="contact" className="mt-16 scroll-mt-20 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-8 shadow-xl border-l-4 border-orange-500">
          <div className="text-center">
            <h4 className="text-2xl font-bold text-gray-800 mb-6">Get in Touch</h4>
            <p className="text-lg text-gray-700 mb-6">
              Have questions about sharing your story? We&apos;d love to hear from you!
            </p>
            <div className="flex justify-center space-x-6 mb-6">
              <a href="#" className="text-orange-600 hover:text-orange-800 text-3xl transform hover:scale-110 transition-transform duration-300" title="Facebook">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="text-orange-600 hover:text-orange-800 text-3xl transform hover:scale-110 transition-transform duration-300" title="Instagram">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="text-orange-600 hover:text-orange-800 text-3xl transform hover:scale-110 transition-transform duration-300" title="LinkedIn">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
            <p className="text-sm text-gray-500">
              ©2025 Neurospicy. All Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
