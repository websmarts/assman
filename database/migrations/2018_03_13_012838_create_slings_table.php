<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSlingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('slings', function (Blueprint $table) {
            $table->increments('id');
            $table->string('barcode');
            $table->string('vendor')->nullable();
            $table->string('vendor_part_reference')->nullable();
            $table->integer('site_id')->unsigned();
            $table->integer('department_id')->unsigned();
            $table->string('cost_centre')->nullable();
            $table->string('description')->nullable();
            $table->string('size')->nullable();
            $table->date('commissioned_date')->nullable();
            $table->integer('wash_count')->nullable();
            $table->date('last_washed_date')->nullable();
            $table->timestamp('last_wash_updated_at')->nullable();
            $table->string('current_location')->nullable();
            $table->enum('quarantined', ['yes', 'no'])->nullable();
            $table->enum('retire_from_service', ['yes', 'no'])->nullable();
            $table->date('retired_date')->nullable();
            $table->date('next_audit_due')->nullable();
            $table->enum('condition', ['Excellent', 'Good', 'Satisfactory', 'Unsatisfactory'])->nullable();

            $table->timestamp('updated_at')->nullable();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('deleted_at')->nullable();

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('slings');
    }
}
