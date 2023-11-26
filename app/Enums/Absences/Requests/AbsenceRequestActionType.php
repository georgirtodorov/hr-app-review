<?php

namespace App\Enums\Absences\Requests;

class AbsenceRequestActionType
{
    const CREATED = 'CREATED';
    const CHANGED = 'CHANGED';
    const DECLINED = 'DECLINED';
    const APPROVED = 'APPROVED';

    // Optional: Method to get all allowed action types as an array
    public static function getAllowedActionTypes(): array
    {
        return [
            self::CREATED,
            self::CHANGED,
            self::DECLINED,
            self::APPROVED,
        ];
    }

    public static function isValid(string $action): bool
    {
        return in_array($action, self::getAllowedActionTypes(), true);
    }
}
