<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Pacientes extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pacientes', function (Blueprint $table) {
            $table->unsignedBigInteger('id_usuario')->unique();
            $table->foreign('id_usuario')->references('id')->on('usuarios');
            $table->bigInteger('obra_social')->nullable();
            $table->bigInteger('numero_obra_social')->nullable();
            $table->string('historia_clinica')->nullable();
            $table->string('turnos')->nullable();
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
        Schema::dropIfExists('pacientes');
    }
}
