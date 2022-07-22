<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Medicos extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create('medicos', function (Blueprint $table) {
            $table->bigIncrements('id')->unique();
            $table->bigInteger('id_usuario');
            $table->string('turnos_disponibles')->nullable();
            $table->string('obras_sociales')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        Schema::dropIfExists('medicos');
    }
}
