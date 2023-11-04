<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Admindetails;
use Cookie;

class AdminController extends Controller
{
    public function getAdmin()
    {

        $data = Admindetails::all();
        // foreach ($data as $key => $value) {
        //     $data[$key]["logo"] = $imageValue;
        // }

        return $data;
    }

    public function createAdmin(Request $request)
    {
        $adminDetails = Admindetails::create($request->all());

        return response()->json($adminDetails, 201);
    }

    public function updateAdminById(Request $request)
    {
        $id = $request->route('_id');
        // remove id from request->all()
        $admin = tap(Admindetails::where('_id', $id))->update($request->except('id'))->first();

        return response()->json([$admin], 200);
    }

    public function signIn(Request $request)
    {
        $adminDetails = Admindetails::where('user', $request->user)->where('password', $request->password)->limit(1)->get();
        if (count($adminDetails) > 0) {
            $adminDetails = ["admin" => $adminDetails[0]];

            $cookie = cookie('userLogin', True);
            return response()->json($adminDetails, 200)->withCookie($cookie);
        } else {
            return response()->json(['message' => 'Invalid Credentials'], 401);
        }
    }

    public function changePassword(Request $request)
    {
           $id = $request->route('_id');
            Admindetails::where('_id', $id)->update(['password' => $request->password, 'user' => $request->user]);
            return response()->json(['msg' => 'Data updated Successfully'], 200);
    }

    public function logout(Request $request)
    {
        return response()->json(['msg' => 'user logout'], 200)->withCookie(Cookie::forget('userLogin'));
    }
}
