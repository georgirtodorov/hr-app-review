<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAbsenceRequestsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('absence_requests', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('employee_id');
            $table->date('start_date');
            $table->date('end_date');
            $table->integer('days');
            $table->bigInteger('type_id');
            $table->enum('approval', ['NOT_NEED', 'WAITING', 'APPROVED', 'DECLINED'])->default('NOT_NEED');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('absence_requests');
    }
}
