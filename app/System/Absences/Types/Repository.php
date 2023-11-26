<?php

namespace App\System\Absences\Types;

use App\Models\AbsenceTypes;


class Repository
{
    public function get()
    {
        try {
            return AbsenceTypes::all();
        } catch (\Throwable $e) {

        }
    }

    public function getById($id)
    {
        try {
            return AbsenceTypes::where('id', $id)->get();
        } catch (\Throwable $e) {

        }
    }
}
