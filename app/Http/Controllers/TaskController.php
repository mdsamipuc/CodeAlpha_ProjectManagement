<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\CommentResouce;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use App\Http\Resources\UserResource;
use App\Models\Comment;
use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Str;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Task::query();

        $sort_field = request('sort_field', 'created_at');
        $sort_direction = request('sort_direction', 'desc');

        if (request('name')) {
            $query->where('name', 'like', '%' . request('name') . '%');
        }

        if (request('status')) {
            $query->where('status', 'like', '%' . request('status') . '%');
        }

        $tasks = $query->orderBy($sort_field, $sort_direction)->paginate(10)->onEachSide(1);

        return Inertia::render('Task/Index', [

            'tasks' => TaskResource::collection($tasks),
            'queryPrams' => request()->query() ?: null
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $users = User::all();
        $projects = Project::all();

        return Inertia::render('Task/Create', [
            'users' => UserResource::collection($users),
            'projects' => ProjectResource::collection($projects),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        $data = $request->validated();
        $image = $data['image'] ?? null;

        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();

        //dd($data);

        if ($image) {
            $data['image_path'] = $image->store('tasks/' . Str::random(), 'public');
        }

        Task::create($data);

        return to_route('task.index')->with('success', 'Task created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        $task = $task->with('project', 'assignedUser', 'createdBy', 'updatedBy')->find($task->id);
        $comments=Comment::where('task_id',$task->id)->with('user')->get();
        //dd($task);
        //dd($comments);
        return Inertia::render('Task/Show', [
            'task' => new TaskResource($task),
            'comments' =>CommentResouce::collection($comments)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        $users = User::all();
        $projects = Project::all();

        return Inertia::render('Task/Edit', [
            'task' => new TaskResource($task),
            'users' => UserResource::collection($users),
            'projects' => ProjectResource::collection($projects)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $data = $request->validated();
        $data['updated_by'] = Auth::id();
        $image = $data['image'] ?? null;
        if ($image) {
            if ($task->image_path) {
                Storage::disk('public')->deleteDirectory(dirname($task->image_path));
            }
            $data['image_path'] = $image->store('tasks/' . Str::random(), 'public');
        }

        $task->update($data);
        return to_route('task.index')->with('success', 'Task updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $image = $task->image_path ?? null;
        if ($image) {
            Storage::disk('public')->deleteDirectory(dirname($image));
        }

        $task->delete();
        return to_route('task.index')->with('success', 'Task deleted successfully.');
    }

    public function myTask($id)
    {

        $my_tasks = Task::where('assigned_user_id', $id);

        $sort_field = request('sort_field', 'created_at');
        $sort_direction = request('sort_direction', 'desc');

        if (request('name')) {
            $my_tasks->where('name', 'like', '%' . request('name') . '%');
        }

        if (request('status')) {
            $my_tasks->where('status', 'like', '%' . request('status') . '%');
        }

        $my_tasks=$my_tasks->orderBy($sort_field,$sort_direction)
        ->whereIn('status',['in_progress','pending','completed'])
        ->paginate(10)
        ->onEachSide(1);

        $total_pending_tasks=Task::where('status','pending')->count();
        $total_in_progress_tasks=Task::where('status','in_progress')->count();
        $total_completed_tasks=Task::where('status','completed')->count();

        $my_pending_tasks=Task::where([
            ['status','pending'],
            ['assigned_user_id',$id]
            ])->count();

        $my_in_progress_tasks=Task::where([
                ['status','in_progress'],
                ['assigned_user_id',$id]
                ])->count();

        $my_completed_tasks=Task::where([
                ['status','completed'],
                ['assigned_user_id',$id]
                ])->count();

        $my_status=[
            'total_pending_tasks'=>$total_pending_tasks,
            'total_in_progress_tasks'=>$total_in_progress_tasks,
            'total_completed_tasks'=>$total_completed_tasks,
            'my_pending_tasks'=>$my_pending_tasks,
            'my_in_progress_tasks'=>$my_in_progress_tasks,
            'my_completed_tasks'=>$my_completed_tasks,
        ];

        //dd($my_status);

        return Inertia::render('Task/MyTask', [
            'tasks' => TaskResource::collection($my_tasks),
            'queryPrams' => request()->query() ?: null,
             'mystatus'=>$my_status,
        ]);
    }


}
