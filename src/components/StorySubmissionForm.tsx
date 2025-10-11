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
    <section id="share" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Share Your Story in the Next Neurospicy Book!
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Have you ever thought about sharing your journey with ADHD or Dyslexia?
          </p>
          <p className="text-lg text-gray-700 mb-8">
            Maybe you've faced challenges, had unique experiences, or discovered unexpected strengths along the way. Now is your chance to become a published author—no writing experience needed!
          </p>
        </div>

        {/* Why Your Story Matters */}
        <div className="bg-blue-50 rounded-lg p-8 mb-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Why Your Story Matters
          </h3>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            The next Neurospicy book will be a collection of real-life experiences from people just like you. We want raw, honest, and powerful stories—whether they're inspiring, funny, heartbreaking, or eye-opening. This book isn't about perfect writing; it's about real voices and real experiences.
          </p>
        </div>

        {/* How It Works */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-green-50 rounded-lg p-6">
            <h4 className="text-xl font-bold text-gray-800 mb-4">Submit Your Story</h4>
            <p className="text-gray-700">
              Send us your experience, no matter the format or style. Don't worry about spelling or grammar—we care about your story, not how polished it is.
            </p>
          </div>
          <div className="bg-purple-50 rounded-lg p-6">
            <h4 className="text-xl font-bold text-gray-800 mb-4">Review & Selection</h4>
            <p className="text-gray-700">
              Our team will review all submissions. If your story is selected, we'll work with you to refine it, ensuring it stays true to your voice.
            </p>
          </div>
          <div className="bg-orange-50 rounded-lg p-6">
            <h4 className="text-xl font-bold text-gray-800 mb-4">We Cover Everything</h4>
            <p className="text-gray-700">
              Publishing, editing, marketing, printing—we take care of it all. There are no costs to you.
            </p>
          </div>
          <div className="bg-pink-50 rounded-lg p-6">
            <h4 className="text-xl font-bold text-gray-800 mb-4">You Earn Royalties</h4>
            <p className="text-gray-700">
              If your story is included, you'll own a percentage of the book's royalties, meaning you'll share in its success!
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-gray-50 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            No Experience? No Problem!
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Submit Your Story
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Follow us:</h4>
          <div className="flex justify-center space-x-4">
            <a href="#" className="text-blue-600 hover:text-blue-800 text-2xl">📘</a>
            <a href="#" className="text-blue-400 hover:text-blue-600 text-2xl">🐦</a>
            <a href="#" className="text-pink-600 hover:text-pink-800 text-2xl">📷</a>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            ©2025 Design Agency. All Rights Reserved
          </p>
        </div>
      </div>
    </section>
  )
}
