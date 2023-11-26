<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\SalariesController;
use App\Http\Controllers\SickLeaveController;
use App\Http\Controllers\DepartmentsController;
use App\Http\Controllers\PositionsController;
use App\Http\Controllers\LocationsController;
use App\Http\Controllers\AbsenceTypesController;
use App\Http\Controllers\AbsencesController;
use App\Http\Controllers\AbsencesArchiveController;
use App\Http\Controllers\MailController;

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

/*
 * AUTH SHOULD BE REMVOED FOR NOW FOR DEV PURPOSES, SSL IS NEEDED
 */
//Route::any('/{any}', [UserController::class, 'index'])->where('any', '^(?!api).*$');
//Route::any('/users', [UserController::class, 'index']);

Route::post('/login', [UserController::class, 'login']);

Route::prefix('password')->group(function () {
    Route::post('/forgotten', [\App\Http\Controllers\PasswordController::class, 'forgotten'])->middleware('guest')->name('password.request');
    Route::post('/reset', [\App\Http\Controllers\PasswordController::class, 'reset'])->middleware('guest')->name('password.update');;
    Route::post('/change', [\App\Http\Controllers\PasswordController::class, 'change'])->middleware('auth:api')->name('password.change');
    Route::post('/force-change', [\App\Http\Controllers\PasswordController::class, 'forceChange'])
        ->middleware(['auth:api', 'check-permission:can_force_change_password'])
        ->name('password.force.change');
});

Route::middleware(['auth:api'])->group(function () {

    Route::prefix('access')->middleware('check-permission:can_manage_accesses')->group(function () {
        Route::resource('/roles', \App\Http\Controllers\Access\RolesController::class)
            ->only(['index', 'store', 'destroy', 'update']);
        Route::prefix('/permissions')->group(function () {
            Route::get('/index', [\App\Http\Controllers\Access\PermissionsController::class, 'index']);
            Route::post('/store', [\App\Http\Controllers\Access\PermissionsController::class, 'store'])
                ->middleware('check-permission:can_manage_permissions');
            Route::delete('/destroy/{id}', [\App\Http\Controllers\Access\PermissionsController::class, 'destroy'])
                ->middleware('check-permission:can_manage_permissions');
        });
        Route::resource('/users', \App\Http\Controllers\Access\UsersAccessController::class)
            ->only(['index', 'store', 'destroy']);
    });

    Route::prefix('profile')->group(function () {
        Route::resource('/picture', \App\Http\Controllers\Profile\Picture\ProfilePicture::class)->only('store')->middleware(['auth:api', 'check-permission:can_change_profile_pictures_global,can_change_profile_picture']);
    });

    Route::post('/logout', [UserController::class, 'logout']);

    Route::get('/user-permissions', [\App\Http\Controllers\UserPermissionController::class, 'index']);

    //testing api //
    Route::get('/permission/test', [UserController::class, 'permissionTest']);
    //above api is used for tests only //

    Route::get('', [\App\Http\Controllers\Absences\PendingAbsencesController::class, 'index']);

    Route::resource('/official-holidays', \App\Http\Controllers\Absences\OfficialHolidays::class)
        ->only(['index', 'store', 'update', 'destroy']);
});


//tova trqbwa da se trie otdolu autoraiz
Route::prefix('authorize')->group(function () {
    Route::get('/permissions/user', [\App\Http\Controllers\AuthorizeController::class, 'user']);
    Route::get('/permissions/users', [\App\Http\Controllers\AuthorizeController::class, 'users']);
});


Route::middleware('auth:api')->group(function () {
    Route::get('/users/me', [UserController::class, 'user']);
});

//    Route::prefix('settings')->group(function () {
//        Route::prefix('general')->group(function () {
//            Route::resource('/departments', DepartmentsController::class)
//                ->only(['index', 'show', 'store', 'update', 'destroy']);
//            Route::resource('/positions', PositionsController::class)
//                ->only(['index', 'show', 'store', 'update', 'destroy']);
//            Route::resource('/locations', LocationsController::class)
//                ->only(['index', 'show', 'store', 'update', 'destroy']);
//        });
//    });

Route::any('/users', [UserController::class, 'index']);
//Route::get('/users/me', [UserController::class, 'user']);
Route::post('/users/register', [UserController::class, 'register']);
Route::delete('/users/delete/{id}', [UserController::class, 'delete']);


//Route::get('/employee/me', [EmployeeController::class, 'me'])->middleware('auth:api');

Route::resource('/employee', EmployeeController::class)
    ->only(['index', 'show', 'store', 'update', 'destroy', 'create'])
    ->middleware('auth:api');

Route::resource('/employees-list', \App\Http\Controllers\EmployeesListController::class)
    ->only(['index', 'show', 'store', 'update', 'destroy', 'create'])
    ->middleware('auth:api');


Route::resource('/salaries', SalariesController::class)
    ->only(['index', 'show', 'store', 'update', 'destroy']);

Route::get('/sick-leave/export', [SickLeaveController::class, 'export'])
    ->middleware('auth:api');
Route::resource('/sick-leave', SickLeaveController::class)
    ->only(['index', 'show', 'store', 'update', 'destroy']);


Route::get('/mail/me', [MailController::class, 'sendMail']);

Route::resource('/departments', DepartmentsController::class)
    ->only(['index', 'show', 'store', 'update', 'destroy'])
    ->middleware('auth:api');;

Route::resource('/positions', PositionsController::class)
    ->only(['index', 'show', 'store', 'update', 'destroy']);

Route::resource('/locations', LocationsController::class)
    ->only(['index', 'show', 'store', 'update', 'destroy']);

Route::resource('/absence-types', AbsenceTypesController::class)
    ->only(['index', 'show', 'store', 'update', 'destroy']);

Route::resource('/notifications', \App\Http\Controllers\Notifications::class)
    ->only(['index', 'show', 'store', 'update', 'destroy'])->middleware('auth:api');

Route::prefix('logs')->group(function () {
    Route::resource('/absence-requests', \App\Http\Controllers\Logs\AbsenceRequestsLogs::class)
        ->only(['index', 'show', 'store', 'update', 'destroy'])->middleware('auth:api');
});

Route::resource('/absence-types', AbsenceTypesController::class)
    ->only(['index', 'show', 'store', 'update', 'destroy'])->middleware('auth:api');

Route::get('/absences/remaining-days', [AbsencesController::class, 'getRemainingDays'])->middleware('auth:api');
Route::get('/absences/remaining-days/{id}', [AbsencesController::class, 'getRemainingDaysById'])->middleware('auth:api');
Route::resource('/absences/request', \App\Http\Controllers\Absences\RequestsController::class)
    ->only(['index', 'show', 'store', 'update', 'destroy', 'create'])
    ->middleware('auth:api');
Route::post('/absences/request/decline', [\App\Http\Controllers\Absences\RequestsController::class, 'decline'])
    ->middleware('auth:api');
Route::post('/absences/request/approve', [\App\Http\Controllers\Absences\RequestsController::class, 'approve'])
    ->middleware('auth:api');

Route::resource('/absences', AbsencesController::class)
    ->only(['index', 'show', 'store', 'update', 'destroy', 'create'])
    ->middleware('auth:api');

Route::resource('/absences-archive', AbsencesArchiveController::class)
    ->only(['index', 'show', 'store', 'update', 'destroy', 'create'])
    ->middleware('auth:api');
