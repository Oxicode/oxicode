/* eslint-disable @next/next/no-html-link-for-pages */
import { BiErrorCircle } from 'react-icons/bi'
import { RiHomeSmileFill } from 'react-icons/ri'

export default function Custom404 () {
  return <>
    <div className="w-9/12 m-auto py-16 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg pb-8">
        <div className="border-t border-gray-200 text-center pt-8 px-20">
          <h1 className="text-9xl font-bold "><BiErrorCircle className='inline-block align-bottom' /> 404</h1>
          <h1 className="text-6xl font-medium py-8">oops! Page not found</h1>
          <p className="text-2xl pb-8 px-12 font-medium">
            Oops! The page you are looking for does not exist. <br />
            It might have been moved or deleted.
          </p>
          <a
            href="/?utm_source=internal&utm_medium=404"
            className="bg-black hover:bg-gray-900 text-white py-2 px-4 rounded inline-flex items-center"
          >
            <RiHomeSmileFill /> {' '} Home
          </a>
        </div>
      </div>
    </div>
  </>
}
