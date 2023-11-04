<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAdmindetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */

    public function up()
    {
        Schema::create('admindetails', function (Blueprint $table) {
            $table->bigIncrements('_id');
            $table->timestamps();
            $table->string('user')->nullable(true);
            $table->string('password')->nullable(true);
            $table->string('bankAccountname')->nullable(true);
            $table->string('bankAccountNumber')->nullable(true);
            $table->string('bankIFSCCode')->nullable(true);
            $table->string('emailId')->nullable(true);
            $table->string('logo')->nullable(true);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('admindetails');
    }
}
