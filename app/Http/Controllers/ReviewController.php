<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Reviews;

class ReviewController extends Controller
{
    public function getReviews(Request $request)
    {
        $reviews = Reviews::all();
        return response()->json($reviews, 200);
    }

    public function createReview(Request $request)
    {
        $review = Reviews::where('phoneNumber', $request->phoneNumber)->first();
        if ($review) {
            return response()->json(['error' => 'Review with this phone number already exist.'], 400);
        }
        $review = Reviews::create($request->all());
        return response()->json($review, 201);
    }

    public function getReviewById(Request $request, $id)
    {
        $review = Reviews::find($id);
        return response()->json($review, 200);
    }

    public function deleteReview(Request $request, $id)
    {
        $review = Reviews::find($id);
        $review->delete();
        return response()->json(null, 204);
    }

    public function getReviewsPage(Request $request) {
        $requestQuery = $request->query();
        $skipValue = 0;
        $limitValue = 5;

        $reviews = Reviews::skip($skipValue)->limit($limitValue)->orderBy('date', 'DESC')->get()->toArray();
        return response()->json($reviews, 200);
    }
}
