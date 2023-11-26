<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEmployeesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('employees', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id')->unique();
            $table->string('first_name');
            $table->string('surname');
            $table->string('last_name');
            $table->string('city');
            $table->string('address');
            $table->string('post_code');
            $table->string('country');
            $table->string('email')->unique();
            $table->string('pin')->unique();
            $table->string('personal_phone')->unique()->nullable();
            $table->string('work_phone');
            $table->date('start');
            $table->date('end');
            $table->string('department');
            $table->string('position');
            $table->json('supervisors');
            $table->string('location');
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
        Schema::dropIfExists('employees');
    }
}
