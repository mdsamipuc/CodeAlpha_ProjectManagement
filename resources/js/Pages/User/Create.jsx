import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import InputError from "@/Components/InputError";
import TextAreaInput from "@/Components/TextAreaInput";


export default function Create() {

  const { data, setData, post, processing, errors } = useForm({
    name: '',
    email: '',
    password: '',
    confirm_password: '',
  })

  const createUserSubmit = (e) => {
    e.preventDefault()
    post(route('user.store'))
    //console.log(data)
  }

  return (
    <AuthenticatedLayout
      header={
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold leading-tight text-white">
            Create New User
          </h2>
          <Link href={route('user.index')} className="bg-sky-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-sky-700">Back</Link>
        </div>
      }
    >
      <Head title="Create User" />

      <div className="py-12 bg-gray-900">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg">



            <form
              onSubmit={createUserSubmit}
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
                  htmlFor="email"
                  value="Email"
                  className="mt-4 text-white"
                />
                <TextInput
                  id='email'
                  type="email"
                  name="email"
                  isFocused={true}
                  value={data.email}
                  onChange={(e) => setData('email', e.target.value)}
                  className="mt-1 block w-full"
                />
                <InputError message={errors.email} className="mt-2" />
              </div>


              <div>
                <InputLabel
                  htmlFor="password"
                  value="Password"
                  className=" mt-4 text-white"
                />
                <TextInput
                  id='password'
                  type="password"
                  name="password"
                  isFocused={true}
                  value={data.password}
                  onChange={(e) => setData('password', e.target.value)}
                  className="mt-1 block w-full"
                />
                <InputError message={errors.password} className="mt-2" />
              </div>

              <div>
                <InputLabel
                  htmlFor="confirm_password"
                  value="Confirm Password"
                  className=" mt-4 text-white"
                />
                <TextInput
                  id='confirm_password'
                  type="password"
                  name="confirm_password"
                  isFocused={true}
                  value={data.confirm_password}
                  onChange={(e) => setData('confirm_password', e.target.value)}
                  className="mt-1 block w-full"
                />
                <InputError message={errors.confirm_password} className="mt-2" />
              </div>



              <div className="mt-4 text-right">
                <Link href={route('user.index')} className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2">Cancel</Link>

                <button disabled={processing} type="submit" className="bg-emerald-500 py-1 text-white rounded shadow transition-all hover:bg-emerald-600 px-3">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>

    </AuthenticatedLayout>
  )
}