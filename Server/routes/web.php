<?php

use App\Http\Controllers\ItemController;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
//authentication
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register',[AuthController::class,'register']);
Route::post('/logout',[AuthController::class,'logout'])->middleware("auth:sanctum");

//user
Route::middleware(['web', 'auth:sanctum'])->get('/user', [AuthController::class,"user"]);


//items
Route::middleware(['web', 'auth:sanctum'])->put('/items/{id}', [ItemController::class, 'update'])->name('updateItem');
Route::delete('/items/{id}',[ItemController::class,'destroy'])->name("deleteItem")->middleware("auth:sanctum");
Route::post('/items',[ItemController::class,'store'])->name('addItem')->middleware("auth:sanctum");
Route::middleware(['web', 'auth:sanctum'])->get('/userItems', [ItemController::class,"getUserItems"]);