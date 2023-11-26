<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PermissionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'permission.name' => 'required',
            'permission.localized_name' => 'required',
            'permission.localized_description' => 'nullable',
        ];
    }

    public function messages()
    {
        return [
            'permission.name' => 'Permission name is missing!',
            'permission.localized_name' => 'Name localization is missing!'
        ];
    }
}
