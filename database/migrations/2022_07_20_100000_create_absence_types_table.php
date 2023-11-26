<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAbsenceTypesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('absence_types', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('details');
            $table->integer('annual_limit');
            $table->integer('duration_limit');
            $table->boolean('transferable');
            $table->integer('transferable_amount');
            $table->boolean('estimate_cost');
            $table->boolean('approval');
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
        Schema::dropIfExists('absence_types');
    }
}
