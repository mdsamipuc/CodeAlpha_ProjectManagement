import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_LABEL_MAP } from '@/Constant';
import TaskTable from '../Task/TaskTable';



export default function Show({ project, tasks, qureyprams = null }) {

  const queryParams = qureyprams || {};
  return (
    <AuthenticatedLayout
      header={
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold leading-tight text-white">
            {`Project "${project.name}"`}
          </h2>
          <Link href={route('project.index')} className="bg-sky-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-sky-700">Back</Link>
        </div>
      }
    >
      <Head title={`Project "${project.name}"`} />
      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden dark:bg-gray-900 bg-white shadow-sm sm:rounded-lg">
            <div>
              <img src={project.image_path} alt=""
                className='w-full h-[25rem] object-cover'
              />
            </div>
            <div className='p-6 text-gray-900 dark:text-gray-100'>
              <div className='grid gap-1 grid-cols-2 mt-2 '>

                <div>
                  <div>
                    <label className='font-bold text-lg'>Project ID </label>
                    <p className='mt-1'>{project.id}</p>
                  </div>
                  <div className='mt-4'>
                    <label className='font-bold text-lg'>Project Name </label>
                    <p className='mt-1'>{project.name}</p>
                  </div>
                  <div className='mt-4'>
                    <label className='font-bold text-lg'>Project Status </label>
                    <p className='mt-2'>
                      <span className={"px-2 py-1 rounded text-white " + PROJECT_STATUS_CLASS_MAP[project.status]}>
                        {PROJECT_STATUS_LABEL_MAP[project.status]}
                      </span>
                    </p>
                  </div>
                  <div className='mt-4'>
                    <label className='font-bold text-lg'>Created By </label>
                    <p className='mt-1'>
                      {project.createdBy.name}
                    </p>
                  </div>

                </div>
                <div>


                  <div className='mt-4'>
                    <label className='font-bold text-lg'>Due Date </label>
                    <p className='mt-1'>
                      {project.due_date}
                    </p>
                  </div>

                  <div className='mt-4'>
                    <label className='font-bold text-lg'>Created At </label>
                    <p className='mt-1'>
                      {project.created_at}
                    </p>
                  </div>


                  <div className='mt-4'>
                    <label className='font-bold text-lg'>Updated By </label>
                    <p className='mt-1'>
                      {project.updatedBy.name}
                    </p>
                  </div>


                </div>
              </div>

              <div className='mt-4'>
                <label className='font-bold text-lg'>Project Description </label>
                <p className='mt-1'>
                  {project.description}
                </p>
              </div>


            </div>
          </div>
        </div>
      </div>
      {
        tasks.data.length > 0 && (
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="overflow-hidden bg-gray-900 shadow-sm sm:rounded-lg">
              <div className="p-6 text-white">
                <h3 className='text-xl font-semibold mb-4'>Tasks</h3>
                <TaskTable tasks={tasks} queryParams={queryParams} hiddenProduct={true} />
              </div>
            </div>
          </div>
        )
      }

    </AuthenticatedLayout>
  )
}