<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', '/project');

Route::middleware(['auth','verified'])->group(function(){

    Route::get('/dashboard', fn()=> Inertia::render('Dashboard'))->name('dashboard');

    Route::resource('project',ProjectController::class);
    Route::resource('task',TaskController::class);
    Route::resource('user',UserController::class);
    Route::get('my_task/{task}', [TaskController::class, 'myTask'])->name('mytask.index');
    Route::post('comment/{task}', [CommentController::class, 'store'])->name('comment.store');
    Route::delete('comment/{comment}', [CommentController::class, 'destroy'])->name('comment.destroy');
    
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
