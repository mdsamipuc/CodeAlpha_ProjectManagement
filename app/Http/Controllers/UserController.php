<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = User::query();

        $sort_field = request('sort_field', 'created_at');
        $sort_direction = request('sort_direction', 'desc');

        if (request('search_user')) {
            $query->where('name', 'like', '%' . request('search_user') . '%')
                ->orWhere('email', 'like', '%' . request('search_user') . '%');
        }

        $users = $query->orderBy($sort_field, $sort_direction)->paginate(10)->onEachSide(1);

        return Inertia::render('User/Index', [

            'users' => UserResource::collection($users),
            'queryPrams' => request()->query() ?: null
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('User/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $data= $request->validated();
        $data['password']=bcrypt($data['password']);
        $data['email_verified_at'] = now();
        User::create($data);

        return to_route('user.index')->with('success', 'User created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {

        return Inertia::render('User/Edit', [
            'user' => new UserResource($user)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        if (!$user) {
            return to_route('user.index')->with('error', 'User Not Found');
        }

        $data= $request->validated();
        $password=$data['password']??null;
        if($password){
            $data['password'] = Hash::make($password);
        } else {
            unset($data['password']);
        }
        $user->update($data);

        return to_route('user.index')->with('success', 'User updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        if (Auth::check() && Auth::id() == $user->id) {
            return to_route('user.index')->with('error', 'You cannot delete your own account');
        }

        $user->delete();
        return to_route('user.index')->with('success', 'User deleted successfully');
    }
}
