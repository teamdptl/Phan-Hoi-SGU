<?php

namespace App\Http\Requests\Room;

use Illuminate\Foundation\Http\FormRequest;

class GuestViewRoomRequest extends FormRequest
{
    protected $redirectRoute = 'room.error';

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
            'id' => ['required', 'exists:rooms,qr_code']
        ];
    }
}
