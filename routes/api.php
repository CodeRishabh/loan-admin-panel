<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\StatsController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserRequestController;
use App\Http\Middleware\LogRoute;
use App\Http\Controllers\ReviewController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware' => ['log.route']],function () {

    Route::get('admin', [AdminController::class, 'getAdmin']);
    Route::post('admin', [AdminController::class, 'createAdmin']);
    Route::post('adminSignin', [AdminController::class, 'signIn']);
    Route::get('adminLogout', [AdminController::class,'logout']);
    Route::patch('/admin/{_id}', [AdminController::class, 'updateAdminById']);
    Route::patch('/adminUpdateAuth/{_id}', [AdminController::class, 'changePassword']);

    Route::get('contact', [ContactController::class, 'getContact']);
    Route::post('contact', [ContactController::class, 'createContact']);

    Route::get('todayCount', [StatsController::class, 'todayCount']);
    Route::get('monthCount', [StatsController::class, 'monthCount']);
    Route::get('totalCount', [StatsController::class, 'totalCount']);
    Route::get('approvedRequest', [StatsController::class, 'approvedRequest']);
    Route::get('pendingApproval', [StatsController::class, 'pendingApproval']);
    Route::get('unverified', [StatsController::class, 'unverified']);
    Route::get('monthlyRequest', [StatsController::class, 'monthlyRequest']);
    Route::get('stateRequest', [StatsController::class, 'stateRequest']);


    Route::get('task', [TaskController::class, 'fetchTask']);
    Route::post('task', [TaskController::class, 'addTask']);
    Route::patch('/task/{_id}', [TaskController::class, 'updateTask']);
    Route::delete('/task/{_id}', [TaskController::class, 'deleteTask']);

    Route::get('users', [UserController::class, 'getUser']);
    Route::get('rejectedUsers', [UserController::class, 'getRejectedUsers']);
    Route::post('upload', [UserController::class, 'uploadImage']);
    Route::get('usersPage', [UserController::class, 'getUserPage']);
    Route::get('usertwenty', [UserController::class, 'getTwentyUser']);
    Route::post('users', [UserController::class, 'createUser']);
    Route::patch('updatePhoto', [UserController::class, 'updatePhoto']);
    Route::patch('updateAutomobile', [UserController::class, 'updateAutomobile']);
    Route::patch('updateHome', [UserController::class, 'updateHome']);
    Route::patch('updateGold', [UserController::class, 'updateGold']);
    Route::patch('updateEducation', [UserController::class, 'updateEducation']);
    Route::get('userById/{userId}', [UserController::class, 'getUserById']);
    Route::get('userByName/{name}', [UserController::class, 'getUserByName']);
    Route::get('userByPhoneNumber/{number}', [UserController::class, 'getUserByPhoneNumber']);
    Route::get('userStatus/{number}', [UserController::class, 'getUserStatus']);
    Route::get('userByDate/{date}', [UserController::class, 'getUserByDate']);
    Route::patch('updateTransaction', [UserController::class, 'updateTransaction']);
    Route::patch('updateApproval', [UserController::class, 'updateApproval']);
    Route::patch('updateApprovalAll', [UserController::class, 'updateApprovalAll']);
    Route::post('emi', [UserController::class, 'postEmi']);
    Route::delete('delete/{_id}', [UserController::class, 'deleteUser']);

    Route::get('usersRequestPage', [UserRequestController::class, 'getUserRequestPage']);
    Route::post('usersRequest', [UserRequestController::class, 'createUserRequest']);
    Route::get('userRequestCount', [UserRequestController::class, 'userRequestCount']);

    Route::get('reviews', [ReviewController::class, 'getReviews']);
    Route::get('reviews_web', [ReviewController::class, 'getReviewsPage']);
    Route::post('reviews', [ReviewController::class, 'createReview']);
    Route::delete('/reviews/{_id}', [ReviewController::class, 'deleteReview']);
});

Route::get('/getApk', [StatsController::class, 'getApk']);

