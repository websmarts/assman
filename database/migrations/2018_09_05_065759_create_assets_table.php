<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAssetsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('assets', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('client_id')->unsigned();
            $table->string('asset_id');
            $table->string('vendor')->nullable();
            $table->string('vendor_part_reference')->nullable();
            $table->string('description')->nullable();
            //$table->string('size')->nullable();
            $table->float('cost_price')->nullable();
            $table->integer('site_id')->unsigned();
            $table->integer('department_id')->unsigned()->nullable();
            $table->string('cost_centre')->nullable();

            $table->integer('asset_type_id')->unsigned();
            $table->json('meta')->nullable();
            
            $table->string('condition')->nullable();
            //$table->tinyInteger('quarantined')->default(0);
            $table->tinyInteger('retire_from_service')->default(0);

            $table->date('commissioned_date')->nullable();
            $table->date('retired_date')->nullable();
            $table->date('next_audit_due')->nullable();
            
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
        Schema::dropIfExists('assets');
    }
}
