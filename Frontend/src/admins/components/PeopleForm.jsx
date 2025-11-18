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
        await api.post(`/people/${editing.id}?_method=PUT`, data);
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
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl text-green-700 font-bold">
          {editing ? "Edit Person" : "Create New"}
        </h2>

        <button
          type="button"
          className="text-red-600 hover:text-red-800"
          onClick={() => {
            setEditing(null);   // cancel editing
            setForm(empty);
            setOpenForm(false);
          }}
        >
          <X size={24} />
        </button>
      </div>

      <form onSubmit={submit} className="space-y-3">
        <input
          placeholder="Name"
          className="border p-2 w-full"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Role"
          className="border p-2 w-full"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        />

        <input
          placeholder="Position"
          className="border p-2 w-full"
          value={form.position}
          onChange={(e) => setForm({ ...form, position: e.target.value })}
        />

        <input
          placeholder="Email"
          className="border p-2 w-full"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <select
          className="border p-2 w-full"
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

        <input
          type="file"
          accept="image/*"
          className="border p-2 w-full"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) setForm({ ...form, img: file });
          }}
        />

        {/* image preview */}
        {form.img && (
          <img
            src={
              form.img instanceof File
                ? URL.createObjectURL(form.img)
                : `http://127.0.0.1:8000/storage/${form.img}`
            }
            className="w-24 h-24 object-cover rounded mt-2"
          />
        )}

        <textarea
          placeholder="Description"
          className="border p-2 w-full"
          rows="3"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <textarea
          placeholder="Education (one per line)"
          className="border p-2 w-full"
          rows="3"
          value={form.education}
          onChange={(e) => setForm({ ...form, education: e.target.value })}
        />

        <button className="w-full bg-green-600 text-white p-2 rounded">
          {editing ? "Update" : "Create"}
        </button>
      </form>

      {/* status */}
      <StatusModal
        open={status.open}
        type={status.type}
        message={status.message}
        onClose={() => setStatus({ ...status, open: false })}
      />
    </section>
  );
}
