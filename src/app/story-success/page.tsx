import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function StorySubmissionSuccess() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="pt-24 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            {/* Success Icon */}
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
              <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            {/* Success Message */}
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Thank You for Sharing Your Story!
            </h1>
            
            <p className="text-lg text-gray-600 mb-8">
              Your story submission has been received successfully.
            </p>

            {/* What Happens Next */}
            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">What Happens Next?</h2>
              <div className="grid md:grid-cols-3 gap-4 text-left">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="text-orange-600 font-bold text-lg mb-2">1. Review</div>
                  <p className="text-gray-700 text-sm">Our team will carefully review your story submission</p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="text-orange-600 font-bold text-lg mb-2">2. Selection</div>
                  <p className="text-gray-700 text-sm">If selected, we'll work with you to refine your story</p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="text-orange-600 font-bold text-lg mb-2">3. Publication</div>
                  <p className="text-gray-700 text-sm">Your story will be included in the next Neurospicy book</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/"
                className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Back to Home
              </Link>
              <Link 
                href="/checkout"
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Buy Current Book
              </Link>
            </div>

            {/* Contact Info */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Questions? Contact us at{' '}
                <a href="mailto:info@neurospicy.life" className="text-orange-600 hover:text-orange-800">
                  info@neurospicy.life
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer whiteBackground={true} />
    </div>
  )
}
