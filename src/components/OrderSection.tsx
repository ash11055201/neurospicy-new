export default function OrderSection() {
  return (
    <section id="order" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main CTA Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Don&apos;t miss it!
          </h2>
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto mb-8">
            <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
              Given that ADHD and Dyslexic individuals
            </h3>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
              can be highly effective in senior and leadership positions, and 30% to 40% of entrepreneurs are ADHD or Dyslexic, my aim is to highlight the advantages and disadvantages but always focusing on strengths of being <span className="font-bold text-blue-600">Spicy Brain</span>
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              Get The Book
            </button>
          </div>
        </div>

        {/* Book Description */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            This is not an autobiography as I don&apos;t think my life is that interesting, and not something to spend good money on when a bottle of wine could be more beneficial! It&apos;s about my 58 years of experience with dyslexia and ADHD, how I have changed – I have a far greater understanding and respect for my gift, my neurodivergence, spicy brain. I do tell a few stories of my life but mainly to draw attention to how and why those situations happened and how it relates to me having a very spicy brain.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            I hope this adventure can help others navigate the world of Dyslexia and ADHD in a positive way.
          </p>
          <div className="text-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 mr-4">
              GET THE BOOK
            </button>
          </div>
        </div>

        {/* Spicy Brain Message */}
        {/* <div className="bg-gradient-to-r from-orange-400 to-red-500 rounded-lg p-8 text-white text-center mb-12">
          <h3 className="text-3xl font-bold mb-4">
            Being a Spicy brain should be cool
          </h3>
          <p className="text-xl mb-6">
            not looked at as a disadvantage.
          </p>
          <button className="bg-white text-orange-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            GET THE BOOK
          </button>
        </div> */}

        {/* Purchase Options */}
        {/* <div className="bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            You can purchase the book from Audiobooks, with personal comments after each chapter from me, eBook's and limited number of hard copy directly from the web site shop.
          </h3>
          <div className="text-center">
            <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              Pre Order Now
            </button>
          </div>
        </div> */}

        {/* Book Details */}
        <div className="mt-12 bg-blue-50 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Neurospicy
          </h3>
          <div className="text-center space-y-4">
            <p className="text-lg text-gray-700">
              Will be available in print, e-book, and soon to be available in Audible.
            </p>
            <ul className="text-gray-700 space-y-2">
              <li>• The Audible edition will feature exclusive chapter reviews by the author, John O&apos;Shea.</li>
              <li>• The book will be self-published and retail for <span className="font-bold text-blue-600">$35 USD</span>. (Plus postage for print version)</li>
              <li>• Pre-orders are available at a 20% discount for <span className="font-bold text-green-600">$28 USD</span>.</li>
            </ul>
            <div className="mt-6">
              <p className="text-sm text-gray-600 mb-2">Use discount code:</p>
              <div className="bg-white rounded-lg p-4 inline-block">
                <span className="font-bold text-lg text-blue-600">EarlyBird</span>
              </div>
            </div>
            <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              Get The Book Now
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
