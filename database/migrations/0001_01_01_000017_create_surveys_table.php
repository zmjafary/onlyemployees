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
        Schema::create('surveys', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->references('id')->on('users');
            $table->foreignId('company_id')->nullable()->references('id')->on('companies');
            $table->foreignId('city_id')->nullable()->references('id')->on('cities');
            $table->foreignId('role_id')->nullable()->references('id')->on('roles');
            $table->foreignId('department_id')->nullable()->references('id')->on('departments');
            $table->boolean('is_anonymous')->default(false);
            $table->boolean('is_employed')->default(true);
            $table->timestamp('employed_from_date')->nullable();
            $table->timestamp('employed_to_date')->nullable();
            $table->integer('overall_rating')->nullable();
            $table->unsignedBigInteger('last_answered')->nullable();
            // $table->foreignId('last_answered')->nullable()->references('id')->on('survey_questions');
            $table->string('review')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('surveys');
    }
};
