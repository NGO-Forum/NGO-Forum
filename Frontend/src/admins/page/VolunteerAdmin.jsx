import { useEffect, useState } from "react";
import { api } from "../../API/api";
import VolunteerForm from "../components/VolunteerForm";
import StatusModal from "../components/StatusModal";
import MenuButton from "../components/MenuButton";
import DeleteConfirmModal from "../components/DeleteConfirmModal";

export default function VolunteerAdmin() {
  const [volunteers, setVolunteers] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);
  const [showDelete, setShowDelete] = useState(false);

  const [status, setStatus] = useState({
    open: false,
    type: "success",
    message: "",
  });

  const loadVolunteers = async () => {
    const res = await api.get("/volunteers");
    setVolunteers(res.data);
  };

  useEffect(() => {
    loadVolunteers();
  }, []);

  // Delete handler
  const handleDelete = async () => {
    if (!deleteItem) return;

    try {
      await api.delete(`/volunteers/${deleteItem.id}`);
      loadVolunteers();

      setStatus({
        open: true,
        type: "success",
        message: "Volunteer removed successfully!",
      });

    } catch (err) {
      setStatus({
        open: true,
        type: "error",
        message: "Failed to delete volunteer.",
      });
    }

    setShowDelete(false);
    setDeleteItem(null);
  };


  return (
    <>
      <div className="p-6">
        {/* HEADER */}
        <div className="flex justify-between mb-6 items-center">
          <h1 className="text-3xl font-bold text-green-700">Volunteers</h1>

          <button
            onClick={() => {
              setEditing(null);
              setShowForm(true);
            }}
            className="bg-green-700 text-white px-5 py-2 rounded-lg shadow hover:bg-green-800 transition"
          >
            + Add Volunteer
          </button>
        </div>

        {/* MODAL FORM */}
        {showForm && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center p-4 z-50">
            <div className="bg-white w-full max-w-2xl p-6 rounded-xl shadow-lg relative animate-fadeIn max-h-[90vh] overflow-y-auto">

              {/* Close Button */}
              <button
                onClick={() => setShowForm(false)}
                className="absolute top-2 right-3 text-2xl text-gray-500 hover:text-red-600"
              >
                ×
              </button>

              <VolunteerForm
                editing={editing}
                onSaved={() => {
                  loadVolunteers();
                  setShowForm(false);
                  setStatus({
                    open: true,
                    type: "success",
                    message: editing
                      ? "Volunteer updated successfully!"
                      : "Volunteer created successfully!",
                  });
                }}
                onCancel={() => setShowForm(false)}
              />
            </div>
          </div>
        )}

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full bg-white border border-gray-200 rounded-lg shadow-sm">
            <thead className="bg-green-700 text-white">
              <tr>
                <th className="px-4 py-3 text-left">Photo</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Position</th>
                <th className="px-4 py-3 text-left">Phone</th>
                <th className="px-4 py-3 text-left">Department</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {volunteers.map((v) => (
                <tr
                  key={v.id}
                  className="border-b hover:bg-gray-50 transition cursor-pointer"
                >
                  <td className="px-4 py-3">
                    {v.img ? (
                      <img
                        src={`http://127.0.0.1:8000/storage/${v.img}`}
                        className="w-12 h-12 rounded-full object-cover border"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-300" />
                    )}
                  </td>

                  <td className="px-4 py-3 font-medium">{v.name}</td>
                  <td className="px-4 py-3">{v.position}</td>
                  <td className="px-4 py-3">{v.phone}</td>
                  <td className="px-4 py-3">{v.department}</td>

                  <td className="px-4 py-2 text-center relative">
                    <MenuButton
                      onEdit={() => {
                        setEditing(v);
                        setShowForm(true);
                      }}
                      onDelete={() => {
                        setDeleteItem(v);
                        setShowDelete(true);
                      }}
                    />
                  </td>
                </tr>
              ))}

              {volunteers.length === 0 && (
                <tr>
                  <td colSpan="6" className="py-6 text-center text-gray-500">
                    No volunteers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* STATUS MODAL */}
      <StatusModal
        open={status.open}
        type={status.type}
        message={status.message}
        onClose={() => setStatus({ ...status, open: false })}
      />

      <DeleteConfirmModal
        open={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}
