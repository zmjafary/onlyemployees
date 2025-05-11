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
        Schema::create('questions', function (Blueprint $table) {
            $table->id();
            $table->string('question_regular')->nullable();
            $table->string('question_meme')->nullable();
            $table->string('favour_gif')->nullable();
            $table->string('against_gif')->nullable();
            $table->boolean('is_active')->default(true);
            $table->foreignId('topic_id')->nullable()->references('id')->on('topics');
            $table->boolean('needs_additional_responses')->default(false);
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('questions');
    }
};
