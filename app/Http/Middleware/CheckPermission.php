<?php
declare(strict_types=1);

namespace App\Http\Middleware;

use Closure;

class CheckPermission
{
    public function handle($request, Closure $next, $permissionName)
    {
//        return $next($request);
        if (!auth()->check() || !$this->hasPermission($permissionName)) {
            // Redirect to a different page or return an error response
            return redirect('/')->withErrors(['error' => 'You do not have permission to access this page.']);
        }

        return $next($request);
    }

    private function hasPermission($permissionName): bool
    {
        $user = auth()->user();

        // Check if the user has the permission directly
        if ($user->hasPermissionTo($permissionName)) {
            return true;
        }

        // Check if the user has the permission through one of their roles
        foreach ($user->roles as $role) {
            if ($role->hasPermissionTo($permissionName)) {
                return true;
            }
        }

        return false;
    }
}


//example for the middleware to the route
//Route::get('/admin/dashboard', function () {
//    return view('admin.dashboard');
//})->middleware('permission:view_dashboard');
