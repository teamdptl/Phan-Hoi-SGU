<?php

namespace App\Enums;

enum EquipmentStatus : string
{
    case USING = 'Đang sử dụng';
    case BROKEN = 'Hư hỏng';
}
