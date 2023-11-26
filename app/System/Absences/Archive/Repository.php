<?php

namespace App\System\Absences\Archive;

use App\Models\AbsencesArchive;


class Repository
{
    public function get()
    {
        $archive = AbsencesArchive::join('absence_types', 'absences_archive.type_id', '=', 'absence_types.id')
            ->get([
                'absences_archive.*',
                'absence_types.name as type_name',
            ]);
        return $archive;
    }
    public function getById(int $employeeId)
    {
        $archive = AbsencesArchive::where('employee_id', strval($employeeId))->get();
        return $archive;
//
//        try {
//            return AbsencesArchive::where('employee_id', strval($employeeId))->get();
//        } catch (\Exception $e) {
//            throw $e;
//        }
    }
}

