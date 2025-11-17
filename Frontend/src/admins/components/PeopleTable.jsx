import React from "react";
import { api } from "../../API/api";
import { Pencil, Trash2 } from "lucide-react";

export default function PeopleTable({ people, loadPeople, setEditing }) {
  const remove = async (id) => {
    if (!confirm("Delete?")) return;
    await api.delete(`/people/${id}`);
    loadPeople();
  };

  const imgUrl = (path) =>
    path ? `http://127.0.0.1:8000/storage/${path}` : "/images/no-image.png";

  return (
    <div className="rounded-xl shadow overflow-hidden border border-gray-200">
      <table className="w-full text-sm">
        <thead className="text-white bg-green-700">
          <tr>
            <th className="p-3">Image</th>
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Role</th>
            <th className="p-3">Position</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {people.map((p) => (
            <tr key={p.id}>
              <td className="p-3">
                <img
                  src={imgUrl(p.img)}
                  className="w-10 h-10 object-cover rounded-full"
                />
              </td>

              <td className="p-3">{p.name}</td>
              <td className="p-3">{p.email}</td>
              <td className="p-3">{p.role}</td>
              <td className="p-3">{p.position}</td>

              <td className="p-3 flex gap-2 justify-center">
                <button
                  onClick={() => setEditing(p)}
                  className="p-2 bg-blue-500 text-white rounded-full"
                >
                  <Pencil size={16} />
                </button>

                <button
                  onClick={() => remove(p.id)}
                  className="p-2 bg-red-500 text-white rounded-full"
                >
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
