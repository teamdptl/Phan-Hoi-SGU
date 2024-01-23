<?php

namespace App\Http\Requests\Room;

use App\Enums\RoomFacility;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CreateRoomRequest extends FormRequest
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
            'name' => ['required', 'string'],
            'type' => ['required', 'string'],
            'facility' => ['required', Rule::in([RoomFacility::CS1->value, RoomFacility::CS2->value, RoomFacility::CSC->value])],
            'qr_code' => ['uuid', 'unique:rooms'],
            'icon' => ['string'],
            'extra_data' => ['json']
        ];
    }
}
