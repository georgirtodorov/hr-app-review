<?php

namespace App\Enums\Absences\Requests;

class MailRecipientTypeType
{
    const EMPLOYEE = 'EMPLOYEE';
    const SUPERVISOR = 'SUPERVISOR';

    // Optional: Method to get all allowed action types as an array
    public static function getAllowedActionTypes(): array
    {
        return [
            self::EMPLOYEE,
            self::SUPERVISOR
        ];
    }

    public static function isValid(string $type): bool
    {
        return in_array($type, self::getAllowedActionTypes(), true);
    }
}
