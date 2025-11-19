import React, { useEffect, useState } from "react";
import { api } from "../../API/api";
import { X } from "lucide-react";
import StatusModal from "./StatusModal";

export default function PeopleForm({
  category,
  setCategory,
  loadPeople,
  editing,
  setEditing,
  onSuccess,
  setOpenForm,
}) {
  const empty = {
    name: "",
    role: "",
    position: "",
    email: "",
    img: "",
    description: "",
    phone: "",
    education: "",
  };

  const [form, setForm] = useState(empty);

  useEffect(() => {
    if (editing) {
      setForm({
        ...editing,
        education: editing.education ? editing.education.join("\n") : "",
        img: editing.img || "",
      });

      if (editing.category) {
        setCategory(editing.category);
      }
    } else {
      setForm(empty);
    }
  }, [editing]);

  const submit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", form.name);
    data.append("role", form.role);
    data.append("position", form.position);
    data.append("phone", form.phone);
    data.append("email", form.email);
    data.append("category", category);
    data.append("description", form.description);


    const eduArray = form.education
      ? form.education.split("\n").map((v) => v.trim())
      : [];
    eduArray.forEach((item, index) => {
      data.append(`education[${index}]`, item);
    });

    if (form.img instanceof File) {
      data.append("img", form.img);
    }

    try {
      if (!editing) {
        await api.post("/people", data);
        setStatus({
          open: true,
          type: "success",
          message: "Person created successfully!",
        });
      } else {
        form.append("_method", "PUT");   // ⭐ REQUIRED ⭐
        await api.post(`/people/${editing.id}`, data);
        setStatus({
          open: true,
          type: "success",
          message: "Person updated successfully!",
        });
      }

      await loadPeople();
      onSuccess?.();

    } catch (error) {
      console.log("Validation error:", error.response?.data);
      setStatus({
        open: true,
        type: "error",
        message: "Validation failed. Please check your input.",
      });
    }
  };

  const [status, setStatus] = useState({
    open: false,
    type: "success",
    message: "",
  });

  return (
    <section className="bg-white p-6 rounded-xl shadow-md max-w-5xl mx-auto">

      {/* Header */}
      <div className="flex items-center justify-between mb-6 border-b pb-3">
        <h2 className="text-2xl font-bold text-green-700">
          {editing ? "Edit Person" : "Create New Person"}
        </h2>

        <button
          type="button"
          className="text-gray-500 hover:text-red-600 transition"
          onClick={() => {
            setEditing(null);
            setOpenForm(false);
          }}
        >
          <X size={28} />
        </button>
      </div>

      {/* TWO COLUMN FORM */}
      <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* LEFT COLUMN */}
        <div className="space-y-4">

          <div>
            <label className="font-semibold text-gray-700">Full Name</label>
            <input
              placeholder="Enter name"
              className="input-field"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div>
            <label className="font-semibold text-gray-700">Role</label>
            <input
              placeholder="Executive Director, Program Manager..."
              className="input-field"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            />
          </div>

          <div>
            <label className="font-semibold text-gray-700">Position</label>
            <input
              placeholder="Coordinator, Officer..."
              className="input-field"
              value={form.position}
              onChange={(e) => setForm({ ...form, position: e.target.value })}
            />
          </div>

          <div>
            <label className="font-semibold text-gray-700">Department</label>
            <select
              className="input-field"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="director">Directors</option>
              <option value="advisor">Advisors</option>
              <option value="sachas">SACHAS</option>
              <option value="pili">PILI</option>
              <option value="riti">RITI</option>
              <option value="macor">MACOR</option>
              <option value="executiveDirector">Executive Director</option>
            </select>
          </div>

        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-4">

          <div>
            <label className="font-semibold text-gray-700">Email</label>
            <input
              placeholder="example@domain.com"
              className="input-field"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div>
            <label className="font-semibold text-gray-700">Phone</label>
            <input
              placeholder="+855 12 345 678"
              className="input-field"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>

          <div>
            <label className="font-semibold text-gray-700">Image</label>
            <input
              type="file"
              accept="image/*"
              className="input-field"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) setForm({ ...form, img: file });
              }}
            />
          </div>

          {/* IMAGE PREVIEW */}
          {form.img && (
            <div className="w-32 h-32 rounded-full overflow-hidden shadow mx-auto">
              <img
                src={
                  form.img instanceof File
                    ? URL.createObjectURL(form.img)
                    : `http://127.0.0.1:8000/storage/${form.img}`
                }
                className="w-full h-full object-cover"
              />
            </div>
          )}

        </div>

        {/* FULL-WIDTH TEXT AREAS */}
        <div className="md:col-span-2 space-y-4">

          <div>
            <label className="font-semibold text-gray-700">Description</label>
            <textarea
              placeholder="Short biography..."
              className="input-field h-28"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </div>

          <div>
            <label className="font-semibold text-gray-700">Education</label>
            <textarea
              placeholder="One education per line"
              className="input-field h-28"
              value={form.education}
              onChange={(e) =>
                setForm({ ...form, education: e.target.value })
              }
            />
          </div>

        </div>

        {/* BUTTONS */}
        <div className="md:col-span-2 flex justify-end gap-4 mt-4">
          <button
            type="button"
            onClick={() => {
              setEditing(null);
              setOpenForm(false);
            }}
            className="px-6 py-2 rounded-lg border border-gray-400 hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-6 py-2 rounded-lg bg-green-700 text-white hover:bg-green-800 transition"
          >
            {editing ? "Update" : "Create"}
          </button>
        </div>

      </form>

      {/* STATUS MODAL */}
      <StatusModal
        open={status.open}
        type={status.type}
        message={status.message}
        onClose={() => setStatus({ ...status, open: false })}
      />
    </section>

  );
}
