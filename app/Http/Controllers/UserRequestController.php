<?php

namespace App\Http\Controllers;
use App\Models\UserRequest;
use Illuminate\Http\Request;

class UserRequestController extends Controller
{
    //
    public function getUserRequestPage(Request $request)
    {
        $requestQuery = $request->query();
        $skipValue = 0;
        $limitValue = 10;

        if (array_key_exists("skip", $requestQuery) && array_key_exists("limit", $requestQuery)) {
            $skipValue = $requestQuery["skip"];
            $limitValue = $requestQuery["limit"];
        }

        $userDetails = UserRequest::skip($skipValue)->limit($limitValue)->orderBy('date', 'DESC')->get()->toArray();
        return response()->json($userDetails, 200);
    }

    public function createUserRequest(Request $request)
    {
        $userRequest = UserRequest::create($request->all());
        return response()->json($userRequest, 201);
    }

    public function userRequestCount(Request $request) {
        $result = UserRequest::count();
        return response()->json($result, 200);

    }

}
