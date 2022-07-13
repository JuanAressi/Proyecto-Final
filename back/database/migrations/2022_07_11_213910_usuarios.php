<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Usuarios extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
		Schema::create('usuarios', function (Blueprint $table) {
			$table->bigIncrements('id');
			$table->string('email');
			$table->string('password');
			$table->string('first_name');
			$table->string('last_name');
			$table->string('dni');
			$table->string('telefono');
			$table->string('rol');
			$table->timestamps();
		});
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        //
    }
}
