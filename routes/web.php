<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/how-it-works', function () {
    return Inertia::render('HowItWorksPage');
});

Route::get('/explore', function () {
    return Inertia::render('ExplorePage');
});

Route::get('/review', function () {
    return Inertia::render('ReviewPage');
});

Route::get('/company/{companyId}', function ($companyId) {
    return Inertia::render('CompanyProfilePage', ['companyId' => $companyId]);
});

Route::get('/privacy-policy', function () {
    return Inertia::render('PrivacyPolicy');
});

Route::get('/terms-of-use', function () {
    return Inertia::render('TermsOfUse');
});

Route::fallback(function () {
    return Inertia::render('NotFoundPage');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
