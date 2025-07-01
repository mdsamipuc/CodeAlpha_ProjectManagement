import { Link } from '@inertiajs/react'


export default function Pagination({ links }) {
  return (

       <nav className='text-center mt-3 mb-5 text-white bg-gray-500'>

        {
          links.map(link=>(
            <Link
            href={link.url || ""}
            disabled={!link.url}
            preserveScroll
            className={
              link.active?
              "relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              :
              "relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            }
            key={link.label}
            dangerouslySetInnerHTML={{ __html:link.label }}
            ></Link>

          ))
        }

       </nav>
  )
}
