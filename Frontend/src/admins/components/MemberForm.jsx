import React, { useState, useEffect } from "react";

export default function MemberForm({ member, onClose, onSave }) {
  const [form, setForm] = useState({
    name: "",
    link: "",
    logo: null,
    oldLogo: "",
  });

  useEffect(() => {
    if (member) {
      setForm({
        name: member.name,
        link: member.link,
        logo: null,
        oldLogo: member.logo_url ?? "",
      });
    }
  }, [member]);

  const handleSubmit = () => {
    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("link", form.link);

    if (form.logo) {
      fd.append("logo", form.logo);
    }

    onSave(fd, member?.id || null);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">

        <h2 className="text-xl font-bold mb-4">
          {member ? "Edit Member" : "Add Member"}
        </h2>

        <label className="block mb-1">Name</label>
        <input
          className="w-full p-2 border rounded mb-3"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <label className="block mb-1">Website Link</label>
        <input
          className="w-full p-2 border rounded mb-3"
          value={form.link}
          onChange={(e) => setForm({ ...form, link: e.target.value })}
        />

        <label className="block mb-1">Logo</label>
        <input
          type="file"
          className="mb-3"
          accept="image/*"
          onChange={(e) => setForm({ ...form, logo: e.target.files[0] })}
        />

        {(form.logo || form.oldLogo) && (
          <img
            src={form.logo ? URL.createObjectURL(form.logo) : form.oldLogo}
            className="w-20 h-20 mb-4 object-cover rounded border shadow"
          />
        )}

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-orange-300 rounded hover:bg-orange-400 text-white"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Save
          </button>
        </div>

      </div>
    </div>
  );
}
