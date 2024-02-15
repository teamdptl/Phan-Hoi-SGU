<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class ValidateOtherSendReport implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        //
        $idEquipment = request()->input('idEquipment');

        if ($idEquipment === '-1' && (is_null($value) || empty($value))) {
            $fail('Vui lòng ghi tên thiết bị khác')->translate();
        }
    }
}
