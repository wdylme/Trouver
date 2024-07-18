<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CityController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\FavoriteController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::controller(AuthController::class)->group(function() {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');
    Route::put('update-profile', 'updateProfile');
});

Route::apiResource("/events", EventController::class)->except("update");
Route::post("/events/{event}", [EventController::class, "edit"])->middleware("auth:api");
Route::apiResource("/favorites", FavoriteController::class)->middleware("auth:api");
Route::delete("/favorites", [FavoriteController::class, "delete"])->middleware("auth:api");
Route::apiResource("/categories", CategoryController::class);
Route::apiResource("/cities", CityController::class);
