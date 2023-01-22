<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class HistoriaClinica extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('historia_clinica', function (Blueprint $table) {
            $table->unsignedBigInteger('id_paciente');
            $table->foreign('id_paciente')->references('id_usuario')->on('pacientes');
            $table->unsignedBigInteger('id_medico');
            $table->foreign('id_medico')->references('id')->on('usuarios');
            $table->string('fecha', 10);
            $table->string('motivo_consulta');
            $table->string('diagnostico');
            $table->string('estado', 10);
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
        Schema::dropIfExists('historia_clinica');
    }
}
