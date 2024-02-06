<?php

namespace App\Http\Requests\Room;

use App\Enums\RoomFacility;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateRoomRequest extends FormRequest
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
            'new_qr' => ['required', 'boolean'],
            'name' => ['required', 'string'],
            'type' => ['required', 'string'],
            'facility' => ['required', Rule::in([RoomFacility::CS1->value, RoomFacility::CS2->value, RoomFacility::CSC->value])],
            'qr_code' => ['required_if_accepted:new_qr,unique:rooms,qr_code'],
            'equipments' => ['nullable','array'],
        ];
    }
}
