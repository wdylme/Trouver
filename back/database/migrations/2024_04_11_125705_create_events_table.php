<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('events', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger("city_id");
            $table->foreign("city_id")->references("id")->on("cities")->cascadeOnDelete();

            $table->unsignedBigInteger("category_id");
            $table->foreign("category_id")->references("id")->on("categories")->cascadeOnDelete();

            $table->string("image")->nullable();
            $table->string("name");
            $table->text("description")->nullable();
            $table->string("address");
            $table->string("date");
            $table->string("time_start");
            $table->string("time_end");
            $table->decimal("cost")->default(0);
            $table->string("contact")->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
