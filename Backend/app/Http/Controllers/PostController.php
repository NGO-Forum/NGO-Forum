<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class PostController extends Controller
{
    // GET /api/posts?limit=4
    public function index(Request $request)
    {
        $query = Post::orderBy('published_at', 'desc')
            ->orderBy('created_at', 'desc');

        if ($limit = $request->get('limit')) {
            $posts = $query->take((int)$limit)->get();
        } else {
            $posts = $query->paginate(10);
        }

        return response()->json($posts, 200);
    }

    // GET /api/posts/{id}
    public function show(Post $post)
    {
        return response()->json($post, 200);
    }

    // POST /api/posts
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'department' => 'required|string|in:PALI,RITI,SACHAS,MACOR',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'content' => 'nullable|string',
            'published_at' => 'nullable|date',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('posts', 'public');
        }

        $post = Post::create($validated);

        return response()->json($post, 201);
    }

    // PUT/PATCH /api/posts/{id}
    public function update(Request $request, Post $post)
    {
        $validated = $request->validate([
            'title' => 'string|max:255',
            'department' => 'string|in:PALI,RITI,SACHAS,MACOR',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'content' => 'nullable|string',
            'published_at' => 'nullable|date',
        ]);

        if ($request->hasFile('image')) {
            if ($post->image) {
                Storage::disk('public')->delete($post->image);
            }
            $validated['image'] = $request->file('image')->store('posts', 'public');
        }

        $post->update($validated);

        return response()->json($post, 200);
    }


    // DELETE /api/posts/{id}
    public function destroy(Post $post)
    {
        if ($post->thumbnail && Storage::disk('public')->exists($post->thumbnail)) {
            Storage::disk('public')->delete($post->thumbnail);
        }

        $post->delete();

        return response()->json(['message' => 'Deleted successfully'], 200);
    }
}
