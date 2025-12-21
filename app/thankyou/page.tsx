import Link from "next/link";

export default function ThankYouPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white dark:bg-black text-black dark:text-white p-4">
      <div className="max-w-2xl text-center space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold">Thank You!</h1>
        </div>

        {/* Message from Awais */}
        <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-8 space-y-4 border border-black dark:border-white">
          <p className="text-lg leading-relaxed">
            Hey there! 👋
          </p>
          <p className="text-lg leading-relaxed">
            Thank you so much for checking out my project! I'm absolutely thrilled that you took the time to explore what I've built here.
          </p>
          <p className="text-lg leading-relaxed font-semibold">
            Cheers,<br />
            Awais
          </p>
        </div>


        {/* Navigation */}
        <div className="space-y-3 pt-8">
          <Link
            href="/"
            className="inline-block px-8 py-3 bg-black dark:bg-white text-white dark:text-black font-semibold rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-300"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
