import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import InputError from "@/Components/InputError";
import TextAreaInput from "@/Components/TextAreaInput";


export default function Edit({ project }) {

  const { data, setData, post, processing, errors } = useForm({
    name: project.name || '',
    image: '',
    description: project.description || '',
    due_date: project.due_date || '',
    status: project.status || '',
    _method: 'PUT',
  })

  const updateProjectSubmit = (e) => {
    e.preventDefault()
    post(route('project.update', project.id))
    console.log(data)
  }

  return (
    <AuthenticatedLayout
      header={
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold leading-tight text-white">
            Update Project
          </h2>
          <Link href={route('project.index')} className="bg-sky-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-sky-700">Back</Link>
        </div>
      }
    >
      <Head title="Update Project" />

      <div className="py-12 bg-gray-900">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg">



            <form
              onSubmit={updateProjectSubmit}
              className="p-4 sm:p-8 bg-gray-600 dark:bg-gray-800 shadow sm:rounded-lg"
            >

              <div>
                <InputLabel
                  htmlFor="name"
                  value="Name"
                  className="mt-4 text-white"
                />
                <TextInput
                  id='name'
                  type="text"
                  name="name"
                  isFocused={true}
                  value={data.name}
                  onChange={(e) => setData('name', e.target.value)}
                  className="mt-1 block w-full"
                />
                <InputError message={errors.name} className="mt-2" />
              </div>

              <div>
                <InputLabel
                  htmlFor="description"
                  value="Description"
                  className=" mt-4 text-white"
                />
                <TextAreaInput
                  id='description'
                  name="description"
                  isFocused={true}
                  value={data.description}
                  onChange={(e) => setData('description', e.target.value)}
                  className="mt-1 block w-full"
                >{data.description}</TextAreaInput>
                <InputError message={errors.description} className="mt-2" />
              </div>

              <div>
                <InputLabel
                  htmlFor="status"
                  value="Status"
                  className=" mt-4 text-white"
                />
                <SelectInput
                  id='status'
                  name="status"
                  value={data.status}
                  onChange={(e) => setData('status', e.target.value)}
                  className="mt-1 block w-full"
                >

                  <option value="">Select Status</option>
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </SelectInput>
                <InputError message={errors.status} className="mt-2" />
              </div>


              <div>
                <InputLabel
                  htmlFor="dute_date"
                  value="Due Date"
                  className=" mt-4 text-white"
                />
                <TextInput
                  id='due_date'
                  type="date"
                  name="due_date"
                  isFocused={true}
                  value={(data.due_date)}
                  onChange={(e) => setData('due_date', e.target.value)}
                  className="mt-1 block w-full"
                />
                <InputError message={errors.due_date} className="mt-2" />
              </div>

              <div>
                <InputLabel
                  htmlFor="image"
                  value="Image"
                  className=" mt-4 text-white"
                />
                <TextInput
                  id='image'
                  type="file"
                  name="image"
                  onChange={(e) => setData('image', e.target.files[0])}
                  className="mt-1 block w-full text-white"
                />

                {project.image_path && (
                  <div className="mt-2">
                  <img
                    src={project.image_path}
                    alt="Project Image"
                    className="w-64 h-64 object-cover rounded"
                  />
                  </div>
                )}

                <InputError message={errors.image_path} className="mt-2" />
              </div>

              <div className="mt-4 text-right">
                <Link href={route('project.index')} className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2">Cancel</Link>

                <button disabled={processing} type="submit" className="bg-emerald-500 py-1 text-white rounded shadow transition-all hover:bg-emerald-600 px-3">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>

    </AuthenticatedLayout>
  )
}