<?php

namespace App\Http\Requests\Worker;

use Illuminate\Foundation\Http\FormRequest;

class CompletionReportRequest extends FormRequest
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
            'photo' => 'required|array|min:1|max:6',
            'photo.*' => 'required|image|max:30000',
            'content' => 'max:2000',
            'reports_id' => 'required',
        ];
    }

    public function messages(): array
    {
        return [
            'users_id' => [
                'required' => 'Không có userId',
            ],
            'photo' => [
                'required' => 'Vui lòng chọn file hình ảnh gửi báo cáo',
                'min:1' => 'Cần ít nhât 1 ảnh',
                'max:6' => 'Tối đa chỉ 6 bức ảnh'
            ],
            'photo*' => [
                'max:30000' => 'Độ dài của mỗi bức ảnh là 300MB'
            ],
            'content' => [
                'max:2000' => 'Độ dài tối đa 2000 kí tự',
            ],
            'reports_id' => [
                'required' => 'Không có reportId',
            ]
        ];

    }
}
