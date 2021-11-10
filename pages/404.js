/* eslint-disable @next/next/no-html-link-for-pages */
import { BiErrorCircle } from 'react-icons/bi'
import { RiHomeSmileFill } from 'react-icons/ri'

export default function Custom404 () {
  return <>
    <div className="flex items-center justify-center w-9/12 min-h-screen py-16 m-auto">
      <div className="pb-8 overflow-hidden bg-white shadow sm:rounded-lg">
        <div className="px-20 pt-8 text-center border-t border-gray-200">
          <h1 className="font-bold text-9xl "><BiErrorCircle className='inline-block align-bottom' /> 404</h1>
          <h1 className="py-8 text-6xl font-medium">oops! Page not found</h1>
          <p className="px-12 pb-8 text-2xl font-medium">
            Oops! The page you are looking for does not exist. <br />
            It might have been moved or deleted.
          </p>
          <a
            href="/?utm_source=internal&utm_medium=404"
            className="inline-flex items-center px-4 py-2 text-white bg-black rounded hover:bg-gray-900"
          >
            <RiHomeSmileFill /> {' '} Home
          </a>
        </div>
      </div>
    </div>
  </>
}
