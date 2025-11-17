import { useState } from "react";
import { api } from "../../API/api";

export default function JobForm({ editingJob, onSaved, onCancel }) {
  const [title, setTitle] = useState(editingJob?.title || "");
  const [description, setDescription] = useState(editingJob?.description || "");
  const [requirements, setRequirements] = useState(
    editingJob?.requirements || ""
  );
  const [closingDate, setClosingDate] = useState(editingJob?.closing_date || "");
  const [department, setDepartment] = useState(editingJob?.department || "");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("title", title);
    form.append("description", description);
    form.append("requirements", requirements);
    form.append("closing_date", closingDate);
    if (image) form.append("image", image);

    if (editingJob) {
      await api.post(`/jobs/${editingJob.id}?_method=PUT`, form);
    } else {
      await api.post("/jobs", form);
    }

    onSaved();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md mb-6"
    >
      <h2 className="text-xl font-bold text-green-700 mb-4">
        {editingJob ? "Edit Job Posting" : "Create Job Posting"}
      </h2>

      {/* Title */}
      <div className="mb-4">
        <label className="font-semibold">Job Title</label>
        <input
          className="w-full border p-2 rounded mt-1"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      {/* Closing Date */}
      <div className="mb-4">
        <label className="font-semibold">Closing Date</label>
        <input
          type="date"
          className="w-full border p-2 rounded mt-1"
          value={closingDate}
          onChange={(e) => setClosingDate(e.target.value)}
        />
      </div>

      <div>
        <label className="font-semibold">Department</label>
        <input
          className="w-full border p-2 rounded mt-1"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
        />
      </div>

      {/* Thumbnail */}
      <div className="mb-4">
        <label className="font-semibold">Image</label>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="mt-2"
        />
      </div>

      {/* Description */}
      <div className="mb-4">
        <label className="font-semibold">Job Description</label>
        <textarea
          className="w-full border p-2 rounded mt-1 h-32"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      {/* Requirements */}
      <div className="mb-4">
        <label className="font-semibold">Requirements</label>
        <textarea
          className="w-full border p-2 rounded mt-1 h-32"
          value={requirements}
          onChange={(e) => setRequirements(e.target.value)}
        />
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex gap-3 mt-4">
        <button
          type="submit"
          className="bg-green-700 text-white px-4 py-2 rounded-lg"
        >
          Save
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 px-4 py-2 rounded-lg"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
