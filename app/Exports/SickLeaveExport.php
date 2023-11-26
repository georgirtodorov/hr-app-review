<?php

namespace App\Exports;

use App\Models\SickLeave;
use Maatwebsite\Excel\Concerns\FromCollection;

class SickLeaveExport implements FromCollection
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return [ '123' => '131' ];
    }

    private function formatData()
    {
        SickLeave::select('first_name','last_name')->get();
    }
}
