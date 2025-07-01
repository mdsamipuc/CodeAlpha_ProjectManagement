import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_LABEL_MAP } from "@/Constant";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, usePage } from '@inertiajs/react';
import TableHeader from "@/Components/TableHeader";
import TaskTable from "./TaskTable";


export default function MyTask({ tasks, queryPrams = null,mystatus }) {

  console.log(mystatus)

  const queryParams = queryPrams || {};
  const { flash } = usePage().props;
  const user = usePage().props.auth.user;
  return (
    <AuthenticatedLayout
      header={
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold leading-tight text-white ">
            My Active Task
          </h2>
        </div>
      }

    >
      <Head title="Task" />
      <div className="py-12 bg-gray-900">

        <div className="border m-8 overflow-auto shadow">
          <div className=" m-8 overflow-auto shadow bg-[#111827] p-4 flex justify-between rounded text-white">
            {/* Pending Tasks */}
            <div className="flex-1 text-center border-r border-emerald-400 px-4">
              <h2 className="text-orange-400 font-bold text-lg">Pending Tasks</h2>
              <p className="text-lg">{!mystatus.my_pending_tasks==0?mystatus.my_pending_tasks:0} / {mystatus.total_pending_tasks} </p>
            </div>

            {/* In Progress Tasks */}
            <div className="flex-1 text-center border-r border-emerald-400 px-4">
              <h2 className="text-blue-400 font-bold text-lg">In Progress Tasks</h2>
              <p className="text-lg">{!mystatus.my_in_progress_tasks==0?mystatus.my_in_progress_tasks:0} / {mystatus.total_in_progress_tasks} </p>
            </div>

            {/* Completed Tasks */}
            <div className="flex-1 text-center px-4">
              <h2 className="text-green-400 font-bold text-lg">Completed Tasks</h2>
              <p className="text-lg">{!mystatus.my_completed_tasks==0?mystatus.my_completed_tasks:0} / {mystatus.total_completed_tasks} </p>
            </div>
          </div>

          {flash.success && (
            <div className="bg-emerald-500 py-2 text-black text-2xl rounded mb-4 px-3 h-15">
              {flash.success}
            </div>
          )}
          {/* <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 bg-pink-50"> */}
          {/* <div className="overflow-hidden bg-gray-900  shadow-sm sm:rounded-lg"> */}
          <TaskTable tasks={tasks} queryParams={queryParams} myTask={true} user={user} />
          {/* </div> */}
          {/* </div> */}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
