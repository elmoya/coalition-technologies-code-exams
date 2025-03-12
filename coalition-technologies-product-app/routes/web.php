<?php

use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/', [ProductController::class, 'index']);
Route::post('/store', [ProductController::class, 'store'])->name('store');
Route::post('/update', [ProductController::class, 'update'])->name('update');