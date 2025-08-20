<?php

use App\Http\Controllers\RegistryController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::prefix('registry')->name('registry.')->controller(RegistryController::class)->group(function () { 
        Route::get('/', 'index')->name('index');
        // Route::get('/create', 'create')->name('create');
        // Route::post('/', 'store')->name('store');
        // Route::get('/{registry}/edit', 'edit')->name('edit');
        // Route::put('/{registry}', 'update')->name('update');
        // Route::delete('/{registry}', 'destroy')->name('destroy');
    });

});


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
