<?php

use App\Http\Controllers\RegistryController;
use App\Http\Controllers\SmallBusinessEntityController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('registry.index');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::prefix('registry')->name('registry.')->controller(RegistryController::class)->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('/create', 'editOrCreate')->name('create');
        Route::get('/edit/{id}', 'editOrCreate')->name('edit');
        Route::post('/store', 'updateOrStore')->name('store');
        Route::put('/update/{id}', 'updateOrStore')->name('update');
        Route::delete('/delete/{registry}', 'destroy')->name('destroy');
        Route::get('/export', 'export')->name('export');
        Route::get('/one/export/{id}', 'exportOne')->name('export.one');
        Route::get('/many/export', 'exportMany')->name('export.many');
    });

    Route::prefix('sbe')->name('sbe.')->controller(SmallBusinessEntityController::class)->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('/create', 'editOrCreate')->name('create');
        Route::get('/edit/{id}', 'editOrCreate')->name('edit');
        Route::post('/store', 'updateOrStore')->name('store');
        Route::put('/update/{id}', 'updateOrStore')->name('update');
        Route::delete('/delete/{id}', 'destroy')->name('destroy');
    });

    Route::prefix('api')->name('api.')->group(function () {
        Route::get('supervisory-authorities', [App\Http\Controllers\SupervisoryAuthorityController::class, 'getSupervisoryAuthorities'])->name('supervisory-authorities');
        Route::get('small-business-entities', [App\Http\Controllers\SmallBusinessEntityController::class, 'getSmallBusinessEntities'])->name('small-business-entities');
    });
});


require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
