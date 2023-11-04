<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserRequestsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_requests', function (Blueprint $table) {
            $table->bigIncrements('_id');
            $table->timestamp('date')->default(\DB::raw('CURRENT_TIMESTAMP'));
            $table->string('firstname');
            $table->string('loanType');
            $table->string('pancard');
            $table->string('sex');
            $table->string('pincode');
            $table->string('phoneNumber');
            $table->double('amount', 15, 8);
            $table->integer('tenurePeriod');
            $table->string('email')->nullable(true);
            $table->date('dob');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_requests');
    }
}
