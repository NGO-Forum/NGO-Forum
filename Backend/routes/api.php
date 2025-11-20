<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PeopleController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\ExecutiveDirectorController;
use App\Http\Controllers\AdminAuthController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\LibraryController;
use App\Http\Controllers\JobApplicationController;

// Aplly Job
Route::post('/apply-job', [JobApplicationController::class, 'send']);

// Public routes
Route::get('/departments', [DepartmentController::class, 'index']);
Route::get('/departments/{id}', [DepartmentController::class, 'show']);

// people show routes
Route::get('/people', [PeopleController::class, 'index']);
Route::get('/people/{id}', [PeopleController::class, 'show']);


// executive director route
Route::get('/executive-director', [ExecutiveDirectorController::class, 'show']);

// organization chart route
Route::get('/organization-chart', [PeopleController::class, 'organizationChart']);

// Admin authentication routes
Route::post('/admin/login', [AdminAuthController::class, 'login']);

// Posts routes
Route::get('/posts', [PostController::class, 'index']);
Route::get('/posts/{post}', [PostController::class, 'show']);

// Jobs routes
Route::get('/jobs', [JobController::class, 'index']);
Route::get('/jobs/{id}', [JobController::class, 'show']);

// Media contact
Route::get('media', [PeopleController::class, 'media']);

// Document file
Route::get('/documents', [DocumentController::class, 'index']);
Route::get('/documents/{id}', [DocumentController::class, 'show']);

// Document file
Route::get('/librarys', [LibraryController::class, 'index']);
Route::get('/librarys/{id}', [LibraryController::class, 'show']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    // Admin authentication
    Route::get('/admin', [AdminAuthController::class, 'me']);
    Route::post('/admin/logout', [AdminAuthController::class, 'logout']);

    // People management
    Route::post('/people', [PeopleController::class, 'store']);
    Route::put('/people/{person}', [PeopleController::class, 'update']);
    Route::delete('/people/{person}', [PeopleController::class, 'destroy']);

    // Posts management
    Route::post('/posts', [PostController::class, 'store']);
    Route::put('/posts/{post}', [PostController::class, 'update']);
    Route::delete('/posts/{post}', [PostController::class, 'destroy']);

    // Jobs management
    Route::post('/jobs', [JobController::class, 'store']);
    Route::put('/jobs/{id}', [JobController::class, 'update']);
    Route::delete('/jobs/{id}', [JobController::class, 'destroy']);

    // Document file
    Route::post('/documents', [DocumentController::class, 'store']);
    Route::put('/documents/{id}', [DocumentController::class, 'update']);
    Route::delete('/documents/{id}', [DocumentController::class, 'destroy']);

    // Document file
    Route::post('/librarys', [LibraryController::class, 'store']);
    Route::put('/librarys/{id}', [LibraryController::class, 'update']);
    Route::delete('/librarys/{id}', [LibraryController::class, 'destroy']);
    
});