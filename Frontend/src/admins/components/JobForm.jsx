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

    const formData = new FormData();
    formData.append("title", title);
    formData.append("closing_date", closingDate);
    formData.append("department", department);
    formData.append("description", description);
    formData.append("requirements", requirements);

    if (image) {
      formData.append("image", image);
    }

    try {
      if (editingJob) {
        await api.post(`/jobs/${editingJob.id}?_method=PUT`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await api.post(`/jobs`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      onSaved();

    } catch (error) {
      console.error("Submit failed:", error);
      alert("Validation failed — check your required fields.");
    }
  };


  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-2xl shadow-lg space-y-6"
    >

      {/* HEADER */}
      <div className="flex items-center justify-between border-b pb-4">
        <h2 className="text-2xl font-bold text-green-700">
          {editingJob ? "Edit Job Posting" : "Create New Job"}
        </h2>

        {editingJob && (
          <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-lg">
            Editing ID: {editingJob.id}
          </span>
        )}
      </div>

      {/* INPUT GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Job Title */}
        <div>
          <label className="font-semibold text-gray-700">Job Title</label>
          <input
            className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-green-500 focus:outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Senior Finance Officer"
            required
          />
        </div>

        {/* Closing Date */}
        <div>
          <label className="font-semibold text-gray-700">Closing Date</label>
          <input
            type="date"
            className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-green-500 focus:outline-none"
            value={closingDate}
            onChange={(e) => setClosingDate(e.target.value)}
          />
        </div>

        {/* Department */}
        <div className="md:col-span-2">
          <label className="font-semibold text-gray-700">Department</label>
          <input
            className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-green-500 focus:outline-none"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            placeholder="e.g. Finance, Admin, HR, Program"
          />
        </div>

        {/* Thumbnail */}
        <div className="md:col-span-2">
          <label className="font-semibold text-gray-700">Job Image / Banner</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="mt-2 border rounded-lg px-3 py-2 w-full bg-gray-50"
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="font-semibold text-gray-700">Job Description</label>
        <textarea
          className="w-full border rounded-lg px-3 py-2 mt-1 h-40 
                 focus:ring-2 focus:ring-green-500 focus:outline-none"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe the role, duties, working environment, expectations…"
          required
        />
      </div>

      {/* Requirements */}
      <div>
        <label className="font-semibold text-gray-700">Requirements</label>
        <textarea
          className="w-full border rounded-lg px-3 py-2 mt-1 h-40 
                 focus:ring-2 focus:ring-green-500 focus:outline-none"
          value={requirements}
          onChange={(e) => setRequirements(e.target.value)}
          placeholder="List required qualifications, experience, and skills…"
        />
      </div>

      {/* BUTTONS */}
      <div className="flex justify-end gap-3 pt-4 border-t">
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2 rounded-lg border bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="px-6 py-2 rounded-lg bg-green-700 text-white font-semibold hover:bg-green-800 transition"
        >
          Save Job
        </button>
      </div>
    </form>

  );
}
