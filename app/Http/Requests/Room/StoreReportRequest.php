<?php

namespace App\Http\Requests\Room;

use Illuminate\Foundation\Http\FormRequest;
use App\Rules\ValidateOtherSendReport;


class StoreReportRequest extends FormRequest
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
            'idEquipment' => 'bail|required|numeric',
            'other' => ['max:100', new ValidateOtherSendReport],
            'photo' => 'required|array|min:1|max:6',
            'photo.*' => 'required|image|max:30000',
            'description' => 'max:2000',
            'roomId' => 'required',
            'token' => 'required|string',
        ];
    }

    public function messages(): array
    {
        return [
            'idEquipment' => [
                'required' => 'Bạn chưa chọn thiết bị cần sửa',
            ],
            'photo' => [
                'required' => 'Vui lòng chọn file hình ảnh gửi báo cáo',
                'min:1' => 'Cần ít nhât 1 ảnh',
                'max:6' => 'Tối đa chỉ 6 bức ảnh'
            ],
            'photo*' => [
                'max:30000' => 'Độ dài của mỗi bức ảnh là 300MB'
            ],
            'description' => [
                'max:2000' => 'Độ dài tối đa 2000 kí tự'
            ],
            'token' => [
                'required' => 'Hãy xác thực bạn không phải robot',
            ]   
        ];

    }
}
