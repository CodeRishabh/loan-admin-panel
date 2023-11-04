<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;

class TaskController extends Controller
{
    //
    public function fetchTask(Request $request)
    {
        $result = Task::all();
        return response()->json($result, 200);
    }

    public function addTask(Request $request)
    {
        $task = Task::create($request->all());
        return response()->json($task, 201);
    }

    public function updateTask(Request $request)
    {
        $task = tap(Task::where('_id', $request->route('_id')))->update($request->all())->first();
        return response()->json($task, 200);
    }

    public function deleteTask(Request $request)
    {
        // get the task
        $task = Task::where('_id', $request->route('_id'))->first();
        tap(Task::where('_id', $request->route('_id')))->delete()->first();
        return response()->json($task, 200);
    }
}
