<?php

namespace App\Enums;

enum ReportStatus : string
{
    case COMPLETE = 'complete';
    case SENT = 'sent';
    case PROCESS = 'process';
    case IGNORE = 'ignore';
}
