<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Userdetails;
new \Symfony\Component\Console\Output\ConsoleOutput;
use Illuminate\Support\Str;
use Carbon\Carbon;
use Illuminate\Support\Facades\Validator;


class UserController extends Controller
{
    public static $desired_keys = array('choice' => array('amount', 'tenurePeriod'), 'bankDetails' => array('bankIFSC', 'bankAccountNumber', 'bankAccountName'), 'automobile' => array('amount', 'tenurePeriod'), 'home' => array('amount', 'tenurePeriod'), 'gold' => array('amount', 'tenurePeriod'), 'education' => array('amount', 'tenurePeriod'), 'transaction' => array('phoneNumber', 'transactionNumber', 'image'));

    public static function mapRequestBody(array $requestBody)
    {

        $body = $requestBody;
        foreach (static::$desired_keys as $key => $value) {
            foreach ($value as $key2 => $value2) {
                if (isset($requestBody[$key]) && isset($requestBody[$key][$value2]))
                $body[$key.'_'.$value2] = $requestBody[$key][$value2];
            }
        }

        return $body;
    }

    public static function mapUserDetailsToBody(array $responseBody) {

        $body = $responseBody;
        foreach (static::$desired_keys as $key => $value) {
            $body[$key] = array();
            foreach ($value as $key2 => $value2) {
                unset($body[$key.'_'.$value2]);
                if (isset($responseBody[$key.'_'.$value2]))
                $body[$key][$value2] = $responseBody[$key.'_'.$value2];

            }
            if(count($body[$key]) == 0) {
                unset($body[$key]);
            }
        }

        return $body;
    }

    public static function mapArrayUserDetailsToBody(array $responseBody) {
        $body = array();
        foreach ($responseBody as $key => $value) {
            $body[$key] = static::mapUserDetailsToBody($value);
        }
        return $body;
    }

    public function getUser(Request $request)
    {
        $userDetails = Userdetails::limit(100)->orderBy('date', 'DESC')->get()->toArray();
        return response()->json($this->mapArrayUserDetailsToBody($userDetails), 200);
    }
    public function getRejectedUsers(Request $request)
    {
        $userDetails = Userdetails::where('approval', $request->query()["approval"])->limit(100)->orderBy('date', 'DESC')->get()->toArray();
        return response()->json($this->mapArrayUserDetailsToBody($userDetails), 200);
    }

    public function uploadImage(Request $request)
    {
        // upload image to public folder with unique path and name and return the path
        $validator = Validator::make($request->all(),
        [
            'image' => 'required',
            'image.*' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]
      );
      if($validator->fails()) {
        return response()->json(["status" => "failed", "message" => "Validation error", "errors" => $validator->errors()]);
         }
        $image = $request->file('image');
        $imageName =  uniqid().'.'.$image->extension();
        $image->move(public_path('images'), $imageName);
        $response = array();
        $response["msg"] = "Image uploaded successfully";
        $response["imagePath"] = url('').'/images/admin/'.$imageName;
        return response()->json($response, 200);
    }

    public function getUserPage(Request $request)
    {
        $userDetails = Userdetails::skip($request->query()["skip"])->limit($request->query()["limit"])->orderBy('date', 'DESC')->get()->toArray();
        return response()->json($this->mapArrayUserDetailsToBody($userDetails), 200);
    }

    public function getTwentyUser(Request $request) {
        $userDetails = Userdetails::limit(20)->orderBy('date', 'DESC')->get()->toArray();
        return response()->json($this->mapArrayUserDetailsToBody($userDetails), 200);
    }

    public function createUser(Request $request)
    {
        $requestBody = $this->mapRequestBody($request->all());
        $userDetails = Userdetails::create($requestBody)->toArray();
        return response()->json($this->mapUserDetailsToBody($userDetails), 201);
    }

    public function updatePhoto(Request $request)
    {
        $body = $this->mapRequestBody($request->all());
        $userDetails = Userdetails::where('_id', $body["userId"])->first()->update($body);

        $response = array();
        $response["msg"] = "Photo updated successfully";
        // $response["approval_date"] = $body["approval_date"];
        $response["token"] = Str::random(16);
        return response()->json($response, 200);
    }

    public function updateAutomobile(Request $request)
    {
        $body = $this->mapRequestBody($request->all());
        $userDetails = Userdetails::where('_id', $body["userId"])->first()->update($body);

        $response = array();
        $response["msg"] = "Success";
        return response()->json($response, 200);
    }

    public function updateHome(Request $request) {
        $body = $this->mapRequestBody($request->all());
        $userDetails = Userdetails::where('_id', $body["userId"])->first()->update($body);

        $response = array();
        $response["msg"] = "Success";
        return response()->json($response, 200);
    }

    public function updateGold(Request $request) {
        $body = $this->mapRequestBody($request->all());
        $userDetails = Userdetails::where('_id', $body["userId"])->first()->update($body);

        $response = array();
        $response["msg"] = "Success";
        return response()->json($response, 200);
    }

    public function updateEducation(Request $request) {
        $body = $this->mapRequestBody($request->all());
        $userDetails = Userdetails::where('_id', $body["userId"])->first()->update($body);

        $response = array();
        $response["msg"] = "Success";
        return response()->json($response, 200);
    }

    public function getUserById(Request $request)
    {
        $id = $request->route('userId');
        $userDetails = Userdetails::where('_id', $id)->first()->toArray();
        $response = array();
        $response["value"] = $userDetails["approval"];
        return response()->json($response, 200);
    }

    public function getUserByName(Request $request)
    {
        $name = $request->route('name');
        $userDetails = Userdetails::where('firstName', $name)->orderBy("date", "DESC")->get()->toArray();
        return response()->json($this->mapArrayUserDetailsToBody($userDetails), 200);
    }

    public function getUserByPhoneNumber(Request $request)
    {
        $phone = $request->route('number');
        $userDetails = Userdetails::where('phoneNumber', $phone)->orderBy("date", "DESC")->get()->toArray();
        return response()->json($this->mapArrayUserDetailsToBody($userDetails), 200);
    }

    public function getUserStatus(Request $request)
    {
        $number = $request->route('number');
        $userDetails = Userdetails::where('phoneNumber', $number)->orderBy("date", "DESC");
        $response = array();
        if (count($userDetails->get()->toArray()) == 0) {
            $response["status"] = "fail";
        } else {
            $user = $userDetails->first()->toArray();
            $response["status"] = "success";
            $response["userId"] = $user["_id"];
            $response["firstName"] = $user["firstName"];
            $response["lastName"] = $user["lastName"];
            $response["bankAccountNumber"] = $user["bankDetails_bankAccountNumber"];
            $response["bankIFSC"] = $user["bankDetails_bankIFSC"];
            $response["amount"] = $user["choice_amount"];
            $response["tenurePeriod"] = $user["choice_tenurePeriod"];
            $response["approval"] = $user["approval"]? 'true' : 'false';
            $response["photo"] = $user["adharPhotoFront"] || $user["panPhoto"] ? "success": "";
            $response["automobile"] = $user["automobile_amount"] ? "success": "";
            $response["home"] = $user["home_amount"] ? "success": "";
            $response["gold"] = $user["gold_amount"] ? "success": "";
            $response["education"] = $user["education_amount"] ? "success": "";
        }
        return response()->json($response, 200);
    }

    // this need to check
    public function getUserByDate(Request $request)
    {
        $dateInput = $request->route('date');
        // $date = Carbon::createFromFormat('Y-m-d\TH:i:s',  $dateInput."T00:00:00");
        $date = Carbon::createFromFormat('D M d Y H:i:s e+', $dateInput);
        $start = $date->copy()->startOfDay();
        $end = $date->copy()->endOfDay();
        $userDetails = Userdetails::where([['date','>=', $start], ['date', '<=', $end]])->orderBy("date", "DESC")->get()->toArray();
        return response()->json($this->mapArrayUserDetailsToBody($userDetails), 200);
    }

    public function deleteUser(Request $request)
    {
        $id = $request->route('_id');
        $userDetails = Userdetails::where('_id', $id)->first()->delete();
        $response = array();
        $response["message"] = "reveiw deleted with id: " . $id;
        return response()->json($response, 200);
    }

    public function updateTransaction(Request $request)
    {
        $body = $this->mapRequestBody($request->all());
        $userDetails = Userdetails::where('_id', $body["userId"])->first()->update($body);

        $response = array();
        $response["msg"] = "Thank You For Using Our Service";
        return response()->json($response, 200);
    }

    public function updateApproval(Request $request)
    {
        $body = $this->mapRequestBody($request->all());
        $userDetails = Userdetails::where('_id', $body["userId"])->first()->update($body);

        $response = array();
        $response["msg"] = "User approved for loan";
        return response()->json($response, 200);
    }

    public function updateApprovalAll(Request $request)
    {
        $body = $this->mapRequestBody($request->all());
        $updateValue = array();
        $updateValue["approval"] = true;
        $userDetails = Userdetails::query()->update($updateValue);

        $response = array();
        $response["msg"] = "User approved for loan";
        return response()->json($response, 200);
    }

    public function postEmi(Request $request)
    {
        $amount = $request->all()["amount"];
        $tenurePeriod = $request->all()["tenurePeriod"];
        $emi = $amount / $tenurePeriod;
        $installment = array();
        for ($i = 0; $i < $tenurePeriod; $i++) {
            $installment[$i] = $emi;
        }
        $response = array();
        $response["installment"] = $installment;
        $response["period"] = $tenurePeriod;
        return response()->json($response, 200);
    }
}
