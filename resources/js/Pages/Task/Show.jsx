import { Head, Link, useForm, usePage } from '@inertiajs/react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { TASK_PRIORITY_CLASS_MAP, TASK_PRIORITY_LABEL_MAP, TASK_STATUS_CLASS_MAP, TASK_STATUS_LABEL_MAP } from '@/Constant';


export default function Show({ task, comments }) {

  const user = usePage().props.auth.user;

  const { flash } = usePage().props;
  //console.table(comments.data)
  const { data, setData, post, processing, errors } = useForm({
    comment: '',
  })




  const addComment = (e) => {
    e.preventDefault()
    post(route('comment.store', task.id), {
      preserveScroll: true,
      preserveState: false
    })

  }


  const { processing: deleteProcess, delete: destroy } = useForm()

  const deleteComment = (id) => {
    if (confirm("Are you sure you want to delete this comment?")) {
      destroy(route('comment.destroy', id), {
        preserveScroll: true,
      })
    }
  }

  return (
    <AuthenticatedLayout
      header={
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold leading-tight text-white">
            {`Task "${task.name}"`}
          </h2>
          <Link href={route('task.index')} className="bg-sky-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-sky-700">Back</Link>
        </div>
      }
    >

      {flash.success && (
        <div className="bg-emerald-500 py-2 text-black text-2xl rounded mb-4 px-3 h-15">
          {flash.success}
        </div>
      )}
      <Head title={`Task "${task.name}"`} />
      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden dark:bg-gray-900 bg-white shadow-sm sm:rounded-lg">
            <div>
              <img src={task.image_path} alt=""
                className='w-full h-96 object-cover'
              />
            </div>
            <div className='p-6 text-gray-900 dark:text-gray-100'>
              <div className='grid gap-1 grid-cols-2 mt-2 '>

                <div>
                  <div>
                    <label className='font-bold text-lg'>Task ID </label>
                    <p className='mt-1'>{task.id}</p>
                  </div>
                  <div className='mt-4'>
                    <label className='font-bold text-lg'>Task Name </label>
                    <p className='mt-1'>{task.name}</p>
                  </div>
                  <div className='mt-4'>
                    <label className='font-bold text-lg'>Task Status </label>
                    <p className='mt-2'>
                      <span className={"px-2 py-1 rounded text-white " + TASK_STATUS_CLASS_MAP[task.status]}>
                        {TASK_STATUS_LABEL_MAP[task.status]}
                      </span>
                    </p>
                  </div>
                  <div className='mt-4'>
                    <label className='font-bold text-lg'>Task Priority </label>
                    <p className='mt-2'>
                      <span className={"px-2 py-1 rounded text-white " + TASK_PRIORITY_CLASS_MAP[task.priority]}>
                        {TASK_PRIORITY_LABEL_MAP[task.priority]}
                      </span>
                    </p>

                  </div>
                  <div className='mt-4'>
                    <label className='font-bold text-lg'>Created By </label>
                    <p className='mt-1'>
                      {task.createdBy.name}
                    </p>
                  </div>

                </div>
                <div>


                  <div className='mt-4'>
                    <label className='font-bold text-lg'>Project Name </label>
                    <p className='mt-1'>
                      {task.project.name}
                    </p>
                  </div>
                  <div className='mt-4'>
                    <label className='font-bold text-lg'>Assigned User Name</label>
                    <p className='mt-1'>
                      {task.assignedUser.name}
                    </p>
                  </div>
                  <div className='mt-4'>
                    <label className='font-bold text-lg'>Assigned User Email </label>
                    <p className='mt-1'>
                      {task.assignedUser.email}
                    </p>
                  </div>
                  <div className='mt-4'>
                    <label className='font-bold text-lg'>Due Date </label>
                    <p className='mt-1'>
                      {task.due_date}
                    </p>
                  </div>

                  <div className='mt-4'>
                    <label className='font-bold text-lg'>Created At </label>
                    <p className='mt-1'>
                      {task.created_at}
                    </p>
                  </div>


                  <div className='mt-4'>
                    <label className='font-bold text-lg'>Updated By </label>
                    <p className='mt-1'>
                      {task.updatedBy.name}
                    </p>
                  </div>


                </div>
              </div>

              <div className='mt-4'>
                <label className='font-bold text-lg'>Task Description </label>
                <p className='mt-1'>
                  {task.description}
                </p>
              </div>


              {/* comment section  */}
              <div className='mt-8 border-t pt-6'>
                <h2 className='text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4'>Comments</h2>

                {/* Comment Form */}
                <form className='mb-6' onSubmit={addComment} >
                  <label htmlFor='comment' className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                    Add a comment
                  </label>
                  <textarea
                    id='comment'
                    name='comment'
                    onChange={e => setData('comment', e.target.value)}
                    rows='3'
                    className='mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:text-gray-100 p-3'
                    placeholder='Write your comment here...'
                  ></textarea>

                  {errors.content && (
                    <p className='text-red-500 text-sm mt-1'>{errors.content}</p>
                  )}


                  <button
                    type='submit'
                    disabled={processing}
                    className='mt-3 inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-md shadow-sm'
                  >
                    Post Comment
                  </button>
                </form>

                {/* Comment List */}
                <div className='space-y-6'>
                  {/* Static Comment */}

                  {
                    comments.data.map((comment, index) => {

                      return (
                        <div className='border border-gray-200 dark:border-gray-700 rounded-lg p-2 bg-gray-50 dark:bg-gray-800' key={index}>
                          <div className='flex justify-between items-start' >
                            <div className="flex gap-3 mb-1">
                              {/* Avatar */}
                              <div className="flex-shrink-0">
                                <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-semibold">
                                  {comment.user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                </div>
                              </div>

                              {/* Comment content */}
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <p className="text-gray-800 dark:text-gray-100 font-semibold hover:underline">
                                    {comment.user.name}
                                  </p>

                                </div>
                                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 whitespace-pre-line">
                                  {comment.content}
                                </p>
                                <p className="text-xs text-gray-500 font-medium mt-3 dark:text-gray-400">
                                  {comment.created_at}
                                </p>
                              </div>
                            </div>

                            {
                              user.id === comment.user.id && (
                                <div className='flex space-x-2'>
                                  <button className='text-sm text-indigo-600 hover:underline'>Edit</button>
                                  <Link className='text-sm text-red-600 hover:underline' onClick={() => deleteComment(comment.id)}>Delete</Link>
                                </div>
                              )
                            }

                          </div>
                        </div>
                      )
                    })
                  }

                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

    </AuthenticatedLayout>
  )
}