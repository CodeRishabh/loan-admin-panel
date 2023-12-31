<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class LogRoute
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);
        if(app()->environment('local')) {
            $log = [
                'method' => $request->method(),
                'url' => $request->getUri(),
                'response' => $response->getContent(),
                'requestBody' => $request->all(),
            ];
            Log::info(json_encode($log));
        }
        return $response;
    }
}
