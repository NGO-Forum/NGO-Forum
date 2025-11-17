import { useState, useEffect } from "react";
import { api } from "../../API/api";

export default function PostForm({ editingPost, onSaved, onCancel }) {
  const [title, setTitle] = useState(editingPost?.title || "");
  const [content, setContent] = useState(editingPost?.content || "");
  const [publishedAt, setPublishedAt] = useState(editingPost?.published_at || "");
  const [department, setDepartment] = useState(editingPost?.department || "");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(
    editingPost?.image ? `http://127.0.0.1:8000/storage/${editingPost.image}` : null
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const form = new FormData();
      form.append("title", title);
      form.append("content", content);
      form.append("published_at", publishedAt);
      form.append("department", department);
      if (image) form.append("image", image);

      if (editingPost) {
        await api.post(`/posts/${editingPost.id}?_method=PUT`, form);
      } else {
        await api.post("/posts", form);
      }

      alert("Post saved successfully!");
      onSaved();
    } catch (err) {
      console.error(err);
      alert("Error saving post");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-xl p-8 border border-gray-200"
    >

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Title */}
        <div className="flex flex-col">
          <label className="font-semibold mb-1">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border px-3 py-2 rounded-lg focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        {/* Department */}
        <div className="flex flex-col">
          <label className="font-semibold mb-1">Department</label>
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="border px-3 py-2 rounded-lg focus:ring-2 focus:ring-green-500"
            required
          >
            <option value="">Select Department</option>
            <option value="PALI">PALI</option>
            <option value="RITI">RITI</option>
            <option value="SACHAS">SACHAS</option>
            <option value="MACOR">MACOR</option>
          </select>
        </div>

        {/* Publish Date */}
        <div className="flex flex-col">
          <label className="font-semibold mb-1">Publish Date</label>
          <input
            type="datetime-local"
            value={publishedAt}
            onChange={(e) => setPublishedAt(e.target.value)}
            className="border px-3 py-2 rounded-lg focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Image */}
        <div className="flex flex-col">
          <label className="font-semibold mb-1">Thumbnail Image</label>
          <input
            type="file"
            onChange={(e) => {
              setImage(e.target.files[0]);
              setPreview(URL.createObjectURL(e.target.files[0]));
            }}
            className="border p-2 rounded-lg"
          />

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-3 w-32 h-32 object-cover rounded-lg border"
            />
          )}
        </div>
      </div>

      {/* Content (full width) */}
      <div className="mt-6">
        <label className="font-semibold mb-1 block">Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border px-3 py-2 rounded-lg h-40 focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-3 mt-8">
        <button
          type="submit"
          className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-lg"
        >
          Save Post
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 hover:bg-gray-400 px-6 py-2 rounded-lg"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
