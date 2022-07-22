<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Pacientes extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create('pacientes', function (Blueprint $table) {
            $table->bigIncrements('id')->unique();
            $table->bigInteger('id_usuario');
            $table->bigInteger('id_obra_social');
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
    public function down() {
        Schema::dropIfExists('pacientes');
    }
}
