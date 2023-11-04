<?php

namespace App\Http\Controllers;
use App\Models\Userdetails;

use Illuminate\Http\Request;
use Carbon\Carbon;

class StatsController extends Controller
{
    //
    public function totalCount(Request $request)
    {
        $result = Userdetails::count();
        return response()->json($result, 200);
    }

    public function todayCount(Request $request)
    {
        $today = Carbon::today();
        $start = $today->copy()->startOfDay();
        $end = $today->copy()->endOfDay();
        $result = Userdetails::where([['date', '>=', $start], ['date', "<=", $end]])->count();
        return response()->json($result, 200);
    }

    public function monthCount(Request $request)
    {
        $today = Carbon::today();
        $start = $today->copy()->startOfMonth();
        $end = $today->copy()->endOfMonth();
        $result = Userdetails::where([['date', '>=', $start], ['date', "<=", $end]])->count();
        return response()->json($result, 200);
    }

    public function approvedRequest(Request $request)
    {
        $result = Userdetails::whereIn('approval', [true, 1])->count();
        return response()->json($result, 200);
    }

    public function pendingApproval(Request $request)
    {
        $result = Userdetails::whereNull('approval')->orWhereIn('approval', [false, 0])->count();
        return response()->json($result, 200);
    }

    public function unverified(Request $request)
    {
        $result = Userdetails::whereNull('panPhoto')->orWhereIn('panPhoto', [""])->count();
        return response()->json($result, 200);
    }

    public function monthlyRequest(Request $request)
    {
       $result = Userdetails::selectRaw('year(date) year, monthname(date) month, count(*) data')
       ->groupBy('year', 'month')
       ->orderBy('year', 'asc')
       ->get();

       $months = array();
       $docCount = array();
         foreach($result as $res) {
              array_push($months, substr($res->month, 0, 3) . "-" . substr($res->year, -2));
              array_push($docCount, $res->data);
            }
            $res = array(
                "resMonth" => $months,
                "resData" => $docCount
            );

        return response()->json($res, 200);
    }

    public function stateRequest(Request $request)
    {
        $stateArr = ['Maharashtra', 'Jharkhand', 'Tamilnadu', 'Bihar', 'Madhya Pradesh', 'West Bengal', 'Odisha', 'Delhi', 'Gujarat'];
        $result = Userdetails::selectRaw('count(*) as count, state')->whereIn('state', $stateArr)->groupBy('state')->get()->toArray();
        $userCount = array();
        foreach ($stateArr as $key => $value) {
            $userCount[$key] = 0;
            foreach ($result as $key2 => $value2) {
                if ($value2['state'] == strtolower($value)) {
                    $userCount[$key] = $value2['count'];
                }
            }
        }

        $response = array();
        $response['stateArr'] = $stateArr;
        $response['stateData'] = $userCount;
        return response()->json($response, 200);
    }


    public function getApk(Request $request) {
        $path = base_path('../public_html/apk/loanpe.apk');
        $header = array();
        $header["Content-Type"]="application/vnd.android.package-archive";
        return response()->download($path, "loanpe.apk", $header);
    }


}
