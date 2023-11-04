<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserdetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('userdetails', function (Blueprint $table) {
            $table->bigIncrements('_id');
            $table->timestamp('date')->default(\DB::raw('CURRENT_TIMESTAMP'));
            $table->string('phoneNumber')->nullable(true);
            $table->string('firstName')->nullable(true);
            $table->string('lastName')->nullable(true);
            $table->string('occupation')->nullable(true);
            $table->string('income')->nullable(true);
            $table->string('fatherName')->nullable(true);
            $table->string('fatherOccupation')->nullable(true);
            $table->string('fatherIncome')->nullable(true);
            $table->string('address')->nullable(true);
            $table->string('state')->nullable(true);
            $table->string('emailID')->nullable(true);
            $table->string('sex')->nullable(true);
            $table->string('pincode')->nullable(true);
            $table->string('employmentStatus')->nullable(true);
            $table->double('choice_amount', 15, 8)->nullable(true);
            $table->string('choice_tenurePeriod')->nullable(true);
            $table->string('adhaarCardNumber')->nullable(true);
            $table->string('panCardNumber')->nullable(true);
            $table->string('bankDetails_bankIFSC')->nullable(true);
            $table->string('bankDetails_bankAccountNumber')->nullable(true);
            $table->string('bankDetails_bankAccountName')->nullable(true);
            $table->double('automobile_amount', 15, 8)->nullable(true);
            $table->string('automobile_tenurePeriod')->nullable(true);
            $table->double('home_amount', 15, 8)->nullable(true);
            $table->string('home_tenurePeriod')->nullable(true);
            $table->double('gold_amount', 15, 8)->nullable(true);
            $table->string('gold_tenurePeriod')->nullable(true);
            $table->double('education_amount', 15, 8)->nullable(true);
            $table->string('education_tenurePeriod')->nullable(true);
            $table->string('passportPhoto')->nullable(true);
            $table->string('panPhoto')->nullable(true);
            $table->string('adharPhotoFront')->nullable(true);
            $table->string('adharPhotoBack')->nullable(true);
            $table->string('passbookPhoto')->nullable(true);
            $table->string('approval_date')->nullable(true);
            $table->boolean('approval')->nullable(true)->default(false);
            $table->string('time')->nullable(true);
            // $table->datetime('date', $precision = 0)->nullable(true);
            $table->string('transaction_phoneNumber')->nullable(true);
            $table->string('transaction_transactionNumber')->nullable(true);
            $table->string('transaction_image')->nullable(true);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('userdetails');
    }
}
