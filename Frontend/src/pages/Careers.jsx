import { useEffect, useState } from "react";
import { api } from "../API/api";
import { Link } from "react-router-dom";

export default function Careers() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    api.get("/jobs").then((res) => setJobs(res.data));
  }, []);

  return (
    <div className="max-w-8xl mx-auto px-6 py-12">
      <h1 className="text-lg text-center lg:text-4xl font-bold text-green-700 mb-8">Career Opportunities</h1>

      {jobs.map((job) => (
        <Link
          to={`/careers/${job.id}`}
          key={job.id}
          className="block p-6 bg-white shadow rounded-lg border mb-6 hover:border-green-600 transition"
        >
          <h2 className="text-2xl font-bold">{job.title}</h2>
          <p className="text-gray-600 mt-2">
            Closing Date: {job.closing_date ?? "Open Until Filled"}
          </p>
        </Link>
      ))}
    </div>
  );
}
