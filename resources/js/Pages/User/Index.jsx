import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_LABEL_MAP } from "@/Constant";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import TableHeader from "@/Components/TableHeader";


export default function Index({ users, queryPrams = null }) {

  console.log(users)

  const { flash } = usePage().props

  const queryParams = queryPrams || {};
  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value
    } else {
      delete queryParams[name];
    }

    router.get(route('user.index'), queryParams)
  }

  const onKeyPress = (name, e) => {
    if (e.key !== 'Enter') return

    searchFieldChanged(name, e.target.value);
  }

  const sortField = (name) => {
    if (name === queryParams.sort_field) {
      if (queryParams.sort_direction === 'asc') {
        queryParams.sort_direction = 'desc';
      } else {
        queryParams.sort_direction = 'asc';
      }
    } else {
      queryParams.sort_field = name;
      queryParams.sort_direction = 'asc';
    }
    router.get(route('user.index'), queryParams)
  }


  const { processing, delete: destroy } = useForm()

  const destoryUser = (id) => {
    if (confirm("Are you sure you want to delete this user?")) {
      destroy(route('user.destroy', id))
    }
  }



  return (
    <AuthenticatedLayout
      header={
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold leading-tight text-white ">
            User
          </h2>
          <Link href={route('user.create')} className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">Add New</Link>
        </div>
      }
    >
      <Head title="User" />
      <div className="py-12 bg-gray-900">
        <div className="border m-8 overflow-auto shadow">
          {
            flash.error && (
              <div className="rounded-lg bg-red-500 p-4 text-white">
                {flash.error}
              </div>
            )
          }

          {flash.success && (
            <div className="bg-emerald-500 py-2 text-black text-2xl rounded mb-4 px-3 h-15">
              {flash.success}
            </div>
          )}

          {
            users.data.length > 0 && (

              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">

                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <TableHeader
                      name='id'
                      sort_field={queryParams.sort_field}
                      sort_direction={queryParams.sort_direction}
                      sortField={sortField}
                    >
                      ID
                    </TableHeader>


                    <TableHeader
                      name='name'
                      sort_field={queryParams.sort_field}
                      sort_direction={queryParams.sort_direction}
                      sortField={sortField}
                    >
                      NAME
                    </TableHeader>

                    <TableHeader
                      name='email'
                      sort_field={queryParams.sort_field}
                      sort_direction={queryParams.sort_direction}
                      sortField={sortField}
                    >
                      EMAIL
                    </TableHeader>


                    <tr/>

                    {/* <th className="px-6 py-3 text-sm">ACTIONS</th> */}
                  </tr>
                </thead>


                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th className="px-6 py-3"></th>


                    <th className="px-6 py-3">
                      <TextInput className='w-22'
                        defaultValue={queryParams.search_user}
                        placeholder="Serach User"
                        onBlur={e => searchFieldChanged('search_user', e.target.value)}
                        onKeyPress={e => onKeyPress('search_user', e)}
                      />
                    </th>

                    <th className="px-6 py-3"></th>

                    <th className="px-6 py-3"></th>
                  </tr>
                </thead>
                <tbody>

                  {users.data.map((user) => (
                    <tr
                      key={user.id}
                      className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {user.id}
                      </th>


                      <th className="px-6 py-4">
                        <Link
                          href={route('user.show', user.id)}
                          className="font-medium text-gray-100 hover:underline">
                          {user.name}
                        </Link>
                      </th>

                      <td className="px-6 py-4 text-nowrap hover:underline hover:text-white">{user.email}</td>

                     <tr/>

                      {/* <td className="px-6 py-4">
                        <a
                          href={route('user.edit', user.id)}
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          Edit
                        </a>
                        <Link
                          onClick={() => destoryUser(user.id)}
                          disabled={processing}
                          className="font-medium text-red-600 dark:text-red-500 hover:underline ml-2"
                        >
                          Delete
                        </Link>
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}


            {
              users.data.length == 0 && (
                 <p className="font-bold text-center text-4xl text-cyan-100 py-5">No Data</p>
              )
            }
        </div>


        {
          users.data.length > 0 && (
            <Pagination links={users.meta.links} />
          )
        }




      </div>

    </AuthenticatedLayout>
  );
}