import { useEffect, useState } from "react";
import { api } from "../../API/api";
import JobForm from "../components/JobForm";

export default function JobAdmin() {
  const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const loadJobs = async () => {
    const res = await api.get("/jobs");
    setJobs(res.data);
  };

  useEffect(() => {
    loadJobs();
  }, []);

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold text-green-700">Job Careers</h1>
        <button
          onClick={() => {
            setEditingJob(null);
            setShowForm(true);
          }}
          className="bg-green-700 text-white px-4 py-2 rounded-lg"
        >
          + New Job
        </button>
      </div>

      {showForm && (
        <JobForm
          editingJob={editingJob}
          onSaved={() => {
            setShowForm(false);
            loadJobs();
          }}
          onCancel={() => setShowForm(false)}
        />
      )}

      <table className="w-full bg-white shadow rounded-lg overflow-hidden">
        <thead className="bg-green-700 text-white">
          <tr>
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Closing Date</th>
            <th className="px-4 py-2 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((j) => (
            <tr key={j.id} className="border-b">
              <td className="px-4 py-2">{j.title}</td>
              <td className="px-4 py-2">{j.closing_date || "-"}</td>
              <td className="px-4 py-2 text-right space-x-3">
                <button
                  onClick={() => {
                    setEditingJob(j);
                    setShowForm(true);
                  }}
                  className="px-3 py-1 bg-blue-600 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={async () => {
                    if (confirm("Delete job?")) {
                      await api.delete(`/jobs/${j.id}`);
                      loadJobs();
                    }
                  }}
                  className="px-3 py-1 bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {jobs.length === 0 && (
            <tr>
              <td colSpan={3} className="text-center py-6 text-gray-500">
                No job postings found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
