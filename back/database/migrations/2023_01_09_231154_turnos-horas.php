<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class TurnosHoras extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('turnos_horas', function (Blueprint $table) {
            $table->unsignedBigInteger('id_turnos_fechas');
            $table->foreign('id_turnos_fechas')->references('id')->on('turnos_fechas');
            $table->string('hora', 5);
            $table->string('estado');
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
        Schema::dropIfExists('turnos_horas');
    }
}
