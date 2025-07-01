import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_LABEL_MAP } from "@/Constant";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import TableHeader from "@/Components/TableHeader";


export default function Index({ projects, queryPrams = null }) {

  const { flash } = usePage().props

  const queryParams = queryPrams || {};
  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value
    } else {
      delete queryParams[name];
    }

    router.get(route('project.index'), queryParams)
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
    router.get(route('project.index'), queryParams)
  }


  const { processing, delete: destroy } = useForm()

  const destoryProject = (id) => {
    if (confirm("Are you sure you want to delete this project?")) {
      destroy(route('project.destroy', id))
    }
  }



  return (
    <AuthenticatedLayout
      header={
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold leading-tight text-white ">
            Project
          </h2>
          <Link href={route('project.create')} className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">Add New</Link>
        </div>
      }
    >
      <Head title="Project" />
      <div className="py-12 bg-gray-900">
        <div className="border m-8 overflow-auto shadow">

          {flash.errors && (
            <div className="bg-red-500 py-2 text-black rounded mb-4 px-3 h-15">
              {flash.errors}
            </div>
          )}

          {flash.success && (
            <div className="bg-emerald-500 py-2 text-black text-2xl rounded mb-4 px-3 h-15">
              {flash.success}
            </div>
          )}

          {
            projects.data.length > 0 && (
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

                    <th className="px-6 py-3 text-sm">IMAGE</th>
                    <TableHeader
                      name='name'
                      sort_field={queryParams.sort_field}
                      sort_direction={queryParams.sort_direction}
                      sortField={sortField}
                    >
                      NAME
                    </TableHeader>

                    <TableHeader
                      name='status'
                      sort_field={queryParams.sort_field}
                      sort_direction={queryParams.sort_direction}
                      sortField={sortField}
                    >
                      STATUS
                    </TableHeader>
                    <TableHeader
                      name='created_at'
                      sort_field={queryParams.sort_field}
                      sort_direction={queryParams.sort_direction}
                      sortField={sortField}
                    >
                      CREATED AT
                    </TableHeader>

                    <TableHeader
                      name='due_date'
                      sort_field={queryParams.sort_field}
                      sort_direction={queryParams.sort_direction}
                      sortField={sortField}
                    >
                      DUE DATE
                    </TableHeader>

                    <th className="px-6 py-3 text-sm text-nowrap">CREATED BY</th>
                    <th className="px-6 py-3 text-sm text-right">ACTIONS</th>
                  </tr>
                </thead>


                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th className="px-6 py-3"></th>
                    <th className="px-6 py-3"></th>

                    <th className="px-6 py-3">
                      <TextInput className='w-full'
                        defaultValue={queryParams.name}
                        placeholder="Project Name"
                        onBlur={e => searchFieldChanged('name', e.target.value)}
                        onKeyPress={e => onKeyPress('name', e)}
                      />
                    </th>

                    <th className="px-6 py-3">
                      <SelectInput className='w-100 text-black'
                        defaultValue={queryParams.status}
                        onChange={e => searchFieldChanged('status', e.target.value)}

                      >
                        <option value="">Select Status</option>
                        <option value="pending">Pending</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </SelectInput>
                    </th>

                    <th className="px-6 py-3"></th>
                    <th className="px-6 py-3"></th>
                    <th className="px-6 py-3 text-nowrap"></th>
                    <th className="px-6 py-3 text-right"></th>
                  </tr>
                </thead>
                <tbody>

                  {projects.data.map((project) => (
                    <tr
                      key={project.id}
                      className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {project.id}
                      </th>
                      <td className="px-6 py-4">
                        <img
                          src={project.image_path}
                          style={{ width: 60 }}
                        />
                      </td>
                      <th className="px-6 py-4">
                        <Link
                          href={route('project.show', project.id)}
                          className="font-medium text-gray-100 hover:underline">
                          {project.name}
                        </Link>
                      </th>
                      <td>
                        <span className={"px-3 py-2 rounded text-white " + PROJECT_STATUS_CLASS_MAP[project.status]}>
                          {PROJECT_STATUS_LABEL_MAP[project.status]}
                        </span>

                      </td>
                      <td className="px-6 py-4 text-nowrap">{project.created_at}</td>
                      <td className="px-6 py-4 text-nowrap">{project.due_date}</td>
                      <td className="px-6 py-4 text-nowrap">{project.createdBy.name}</td>
                      <td className="px-6 py-4">
                        <a
                          href={route('project.edit', project.id)}
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          Edit
                        </a>
                        <Link
                          onClick={() => destoryProject(project.id)}
                          disabled={processing}
                          className="font-medium text-red-600 dark:text-red-500 hover:underline ml-2"
                        >
                          Delete
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

            )}

          {
            projects.data.length == 0 && (

              <p className="font-bold text-center text-4xl text-cyan-100 py-5">No Data</p>
            )}
        </div>

        {
          projects.data.length > 0 && (
            <Pagination links={projects.meta.links} />
          )
        }



      </div>

    </AuthenticatedLayout>
  );
}