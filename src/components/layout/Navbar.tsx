import Link from 'next/link'

export const Navbar = () => {
  return (
    <nav className="sticky top-0 bg-white border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold">
              KA
            </Link>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            <Link
              href="/knowledge"
              className="text-gray-900 hover:text-gray-700 px-3 py-2 text-sm font-medium"
            >
              Knowledge
            </Link>
            <Link
              href="/projects"
              className="text-gray-900 hover:text-gray-700 px-3 py-2 text-sm font-medium"
            >
              Projects
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar