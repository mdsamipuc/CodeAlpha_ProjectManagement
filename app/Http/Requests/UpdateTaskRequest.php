<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name'=>['required','string','max:255'],
            'description'=>['nullable','string','max:1000'],
            'due_date'=>['nullable','date'],
            'image'=>['nullable','image','max:2048'],
            'status'=>['required','string','in:pending,completed,in_progress'],
            'priority'=>['required','string','in:low,medium,high'],
            'project_id'=>['required','exists:projects,id'],
            'assigned_user_id'=>['required','exists:users,id'],
        ];
    }
}
