import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/16/solid'

export default function TableHeader({ name, sort_field, sort_direction,children,sortField=()=>{} }) {

  return (
    <th onClick={(e) => sortField(name)} className="px-6 py-3 cursor-pointer">

      <div className="flex items-center gap-1 text-sm">
        {children}
        <div className="flex flex-col -space-y-2">
          <ChevronUpIcon className={"w-4 " + ((sort_field === name && sort_direction === 'asc') ? "text-white" : '')} />
          <ChevronDownIcon className={"w-4 " + ((sort_field === name && sort_direction === 'desc') ? "text-white" : '')} />
        </div>
      </div>
    </th>
  )
}