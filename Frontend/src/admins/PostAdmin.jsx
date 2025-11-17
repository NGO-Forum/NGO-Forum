import { useEffect, useState } from "react";
import { api } from "../API/api";
import PostForm from "./components/PostForm";

export default function PostAdmin() {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const loadPosts = async () => {
    try {
      const res = await api.get("/posts");
      // if paginated:
      const items = res.data.data || res.data;
      setPosts(items);
    } catch (err) {
      console.error("Failed to load posts", err);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleNew = () => {
    setEditingPost(null);
    setShowForm(true);
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setShowForm(true);
  };

  const handleDelete = async (post) => {
    if (!window.confirm("Delete this post?")) return;
    try {
      await api.delete(`/posts/${post.id}`);
      loadPosts();
    } catch (err) {
      console.error("Failed to delete", err);
      alert("Error deleting");
    }
  };

  const imgUrl = (path) =>
    path ? `http://127.0.0.1:8000/storage/${path}` : "/images/no-image.png";

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-green-700">Posts / News</h1>
        <button
          onClick={handleNew}
          className="px-4 py-2 rounded-lg bg-green-700 text-white hover:bg-green-800"
        >
          + New Post
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-auto">
          <div className="w-full bg-white max-w-2xl p-6 mt-2 rounded-xl">
            <div className="flex  justify-between items-center mb-4">
              <h2 className="text-xl font-bold  text-green-700">
                {editingPost ? "Edit Post" : "Create New Post"}
              </h2>

              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingPost(null);
                }} 
                className="text-gray-500 hover:text-black text-2xl"
              >
                ×
              </button>
            </div>

            <PostForm
              editingPost={editingPost}
              onSaved={() => {
                setShowForm(false);
                setEditingPost(null);
                loadPosts();
              }}
              onCancel={() => {
                setShowForm(false);
                setEditingPost(null);
              }}
            />
          </div>
        </div>
      )}


      <div className="shadow rounded-lg overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="text-white bg-green-700 ">
            <tr>
              <th className="px-4 py-2 text-left">Image</th>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Published</th>
              <th className="px-4 py-2 text-left">Description</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="px-4 py-2">
                  <img
                    src={imgUrl(p.thumbnail)}
                    alt={p.title}
                    className="h-12 w-16 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-2">{p.title}</td>
                <td className="px-4 py-2">
                  {p.published_at
                    ? new Date(p.published_at).toLocaleDateString()
                    : "-"}
                </td>
                <td className="px-4 py-2">
                  {p.created_at
                    ? new Date(p.content).toLocaleDateString()
                    : "-"}
                </td>
                <td className="px-4 py-2 text-right space-x-2">
                  <button
                    onClick={() => handleEdit(p)}
                    className="px-3 py-1 rounded bg-blue-600 text-white text-xs"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p)}
                    className="px-3 py-1 rounded bg-red-600 text-white text-xs"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {posts.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-6 text-center text-gray-500"
                >
                  No posts yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
