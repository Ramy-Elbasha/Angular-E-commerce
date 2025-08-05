<?php

use App\Http\Controllers\ItemController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');


Route::get('/items',[ItemController::class,'index'])->name('getItems');
Route::get('/items/{id}',[ItemController::class,'show'])->name('itemByID');





