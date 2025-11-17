import { useEffect, useState } from "react";
import { api } from "../API/api";
import { useParams } from "react-router-dom";

export default function CareerDetail() {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    api.get(`/jobs/${id}`).then((res) => setJob(res.data));
  }, [id]);

  if (!job) return <p className="text-center py-6">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-green-700">{job.title}</h1>

      <p className="text-gray-600 mt-2">
        Closing Date: {job.closing_date ?? "Open Until Filled"}
      </p>

      {job.thumbnail && (
        <img
          src={`http://127.0.0.1:8000/storage/${job.image}`}
          className="w-full h-64 object-cover rounded-lg mt-6"
        />
      )}

      <h2 className="text-xl font-bold mt-8">Job Description</h2>
      <p className="mt-2 whitespace-pre-line">{job.description}</p>

      <h2 className="text-xl font-bold mt-8">Requirements</h2>
      <p className="mt-2 whitespace-pre-line">{job.requirements}</p>

      <div className="mt-8">
        <a
          href="mailto:job@ngoforum.org.kh"
          className="bg-green-700 text-white px-6 py-2 rounded-lg"
        >
          Apply Now
        </a>
      </div>
    </div>
  );
}
