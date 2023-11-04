<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Contactdetails;

class ContactController extends Controller
{
    public function getContact(Request $request)
    {
        $result = Contactdetails::skip($request->query()["skip"])->limit($request->query()["limit"])->orderBy('created_at', 'DESC')->get()->toArray();

        return response()->json($result, 200);
    }

    public function createContact(Request $request)
    {
        $contactDetails = Contactdetails::create($request->all());

        return response()->json($contactDetails, 201);
    }

}
