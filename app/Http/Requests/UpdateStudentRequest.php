<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class UpdateStudentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->role === 'admin';
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nama' => 'required|string',
            'email' => 'required|email|unique:users,email,' . $this->route('student')->user_id,
            'password' => ['nullable','string',Password::min(8)->letters()->numbers()],
            'nis' => 'required|unique:students,nis,' . $this->route('student')->id,
            'kelas_id' => 'required|exists:kelas,id',
        ];
    }
}
