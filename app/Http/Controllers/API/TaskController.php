<?php

namespace App\Http\Controllers\API;

use App\Models\Task;
use App\Traits\ResponseData;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Validation\ValidationException;

class TaskController extends Controller
{
    use ResponseData;
    public function index()
    {
        try {
            $tasks = Task::where('user_id', auth()->id())->latest()->with('category')->get();
            return $this->responseData($tasks, 'success', true, 200);
        } catch (\Throwable $th) {
            return $this->responseData(null, $th->getMessage(), false, 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $data = $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'nullable|string',
                'task_status' => 'required|in:pending,completed',
                'category_id' => 'required|exists:categories,id',
            ]);

            $data['user_id'] = auth()->id();

            $task = Task::create($data);
            return $this->responseData($task, 'created success', true, 201);
        } catch (ValidationException $e) {
            $errors = $e->errors();
            return $this->responseData(null, $errors, false, 422);
        } catch (\Throwable $th) {
            return $this->responseData(null, $th->getMessage(), false, 500);
        }
    }


    public function update(Request $request, Task $task)
    {
        try {
            if ($task->user_id !== auth()->id()) {
                return response()->json(['error' => 'Unauthorized'], 403);
            }

            $data = $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'nullable|string',
                'task_status' => 'required|in:pending,completed',
                'category_id' => 'required|exists:categories,id',
            ]);

            $task->update($data);
            return $this->responseData($task, 'updated success', true, 200);
        } catch (ValidationException $e) {
            $errors = $e->errors();
            return $this->responseData(null, $errors, false, 422);
        } catch (\Throwable $th) {
            return $this->responseData(null, $th->getMessage(), false, 500);
        }
    }

    public function destroy(Task $task)
    {
        try {
            if ($task->user_id !== auth()->id()) {
                return response()->json(['error' => 'Unauthorized'], 403);
            }

            $task->delete();
            return $this->responseData(null, 'deleted success', true, 200);
        } catch (\Throwable $th) {
            return $this->responseData(null, $th->getMessage(), false, 500);
        }
    }


    public function restore($id)
    {
        try {
            $task = Task::withTrashed()->where('id', $id)->where('user_id', auth()->id())->firstOrFail();
            $task->restore();
            return $this->responseData($task, 'restored success', true, 200);
        }catch (\Throwable $th) {
            return $this->responseData(null, $th->getMessage(), false, 500);
        }
    }
}
