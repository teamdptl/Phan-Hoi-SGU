<?php

namespace App\Enums;

enum RoleEnum : int
{
    case ADMIN = 1;
    case WORKER = 2;
    case INSPECTOR = 3;
}
