import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TableHeader from "@/Components/TableHeader";
import TextInput from "@/Components/TextInput";
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_LABEL_MAP } from "@/Constant";
import { Link, router, useForm } from "@inertiajs/react";

export default function TaskTable({ tasks, queryParams = null, hiddenProduct = false, myTask = false, user }) {


  //const queryParams = queryPrams || {};
  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value
    } else {
      delete queryParams[name];
    }

    myTask ? router.get(route('mytask.index', user.id), queryParams) : router.get(route('task.index'), queryParams)
    // router.get(route('task.index'), queryParams)
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
    myTask ? router.get(route('mytask.index', user.id), queryParams) : router.get(route('task.index'), queryParams)
    //router.get(route('task.index'), queryParams)
  }


  const { processing, delete: destory } = useForm()

  const destorytask = (id) => {
    if (confirm('Are you sure you want to delete this task?')) {
      router.delete(route('task.destroy', id))

    }
  }

  return (
    <>

      <div className="relative overflow-x-auto shadow-md rounded ">

        {
          tasks.data.length > 0 && (

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

                  {
                    !hiddenProduct && (
                      <th className="px-6 py-3 text-sm text-nowrap">PROJECT NAME</th>
                    )
                  }



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

                  {!hiddenProduct && (
                    <th className="px-6 py-3"></th>
                  )}

                  <th className="px-6 py-3"></th>

                  <th className="px-6 py-3">
                    <TextInput className='w-full'
                      defaultValue={queryParams.name}
                      placeholder="Task Name"
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
                      {
                        !myTask ? <option value="completed">Completed</option> : " "
                      }

                    </SelectInput>
                  </th>

                  <th className="px-6 py-3"></th>
                  <th className="px-6 py-3"></th>
                  <th className="px-6 py-3 text-nowrap"></th>
                  <th className="px-6 py-3 text-right"></th>
                </tr>
              </thead>
              <tbody>

                {tasks.data.map((task) => (
                  <tr
                    key={task.id}
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {task.id}
                    </th>

                    {
                      !hiddenProduct && (
                        <th className="px-6 py-4 text-nowrap">
                          <Link
                            className="hover:underline hover:text-white"
                            href={route('project.show', task.project.id)}
                          >
                            {task.project.name}
                          </Link>
                        </th>
                      )
                    }


                    <td className="px-6 py-4">
                      {
                        task.image_path && (
                          <img
                            src={task.image_path}
                            style={{ width: 60 }}
                          />
                        )
                      }

                    </td>
                    <th className="px-6 py-4 text-nowrap">
                      <Link
                        className="hover:underline hover:text-white"
                        href={route('task.show', task.id)}
                      >
                        {task.name}
                      </Link>
                    </th>
                    <td>
                      <span className={"px-3 py-2 rounded text-white " + TASK_STATUS_CLASS_MAP[task.status]}>
                        {TASK_STATUS_LABEL_MAP[task.status]}
                      </span>

                    </td>
                    <td className="px-6 py-4 text-nowrap">{task.created_at}</td>
                    <td className="px-6 py-4 text-nowrap">{task.due_date}</td>
                    <td className="px-6 py-4 text-nowrap">{task.createdBy.name}</td>
                    <td className="px-6 py-4">
                      <a
                        href={route('task.edit', task.id)}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Edit
                      </a>
                      {
                        !myTask && (
                          <Link
                            onClick={() => destorytask(task.id)}
                            className="font-medium text-red-600 dark:text-red-500 hover:underline ml-2"
                          >
                            Delete
                          </Link>
                        )
                      }

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )

        }

        {
          tasks.data.length == 0 && (

            <p className="font-bold text-center text-4xl text-cyan-100 py-5">No Data</p>
        )}
      </div>


      {
        tasks.data.length > 0 && (
          <Pagination links={tasks.meta.links} />
        )
      }


    </>
  )
}