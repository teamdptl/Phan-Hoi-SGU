<?php

namespace App\Http\Requests\Rating;

use Illuminate\Foundation\Http\FormRequest;

class RatingRequest extends FormRequest{
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
            'rating' => ['required', 'numeric','min:1','max:5'],
            'y_kien' => ['required','string','max:255'],
            'rooms_id' => ['required','numeric','min:1'],
            'token' => ['required','string'],
        ];
    }

    public function messages(): array
    {
        return [
            'rating.required' => 'Vui lòng đánh giá sao!',
            'rating.numeric' => 'Sao phải là số',
            'rating.min' => 'Số sao phải từ 1 đến 5',
            'rating.max' => 'Số sao phải từ 1 đến 5',
            'y_kien.required' => 'Vui lòng nhập nội dung đánh giá!',
            'y_kien.string' => '',
            'y_kien.max' => 'Số sao phải từ 1 đến 255',
            'token.required' => 'Hãy xác thực bạn không phải robot',
            'token.string' => 'M cook',
            'rooms_id.requied' => 'Thiếu id phòng rồi!',
            'rooms_id.min' => 'ID phòng không hợp lệ',
            'rooms_id.numeric' => 'ID phòng không hợp lệ'
        ];
    }
}