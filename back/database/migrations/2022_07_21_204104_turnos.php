<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Turnos extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create('turnos', function (Blueprint $table) {
            $table->bigIncrements('id')->unique();
            $table->bigInteger('id_usuario');
            $table->bigInteger('id_medico');
            $table->string('dia');
            $table->string('horario');
            $table->string('estado');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        Schema::dropIfExists('turnos');
    }
}
