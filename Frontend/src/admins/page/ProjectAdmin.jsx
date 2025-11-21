import React, { useEffect, useState } from "react";
import { api } from "../../API/api";
import ProjectTable from "../components/Projects/ProjectTable";
import ProjectForm from "../components/Projects/ProjectForm";
import StatusModal from "../components/StatusModal";
import DeleteConfirmModal from "../components/DeleteConfirmModal";

export default function ProjectAdmin() {
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [status, setStatus] = useState({
    open: false,
    type: "",
    message: ""
  });

  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);


  // Confirm delete (notify parent)
  const confirmDelete = async () => {
    try {
      await api.delete(`/projects/${deleteId}`);
      setShowDelete(false);
      loadProjects();
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete project");
    }
  };

  const loadProjects = async () => {
    const res = await api.get("/projects");
    setProjects(res.data);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleCreate = () => {
    setEditingProject(null);
    setShowForm(true);
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowDelete(true);
  };

  const handleSave = async (formData, id = null) => {
    try {
      if (id) {
        formData.append("_method", "PUT");

        await api.post(`/projects/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        // CLOSE FORM HERE
        setShowForm(false);
        setEditingProject(null);

        setStatus({
          open: true,
          type: "success",
          message: "Project updated successfully!",
        });

      } else {
        await api.post("/projects", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        // CLOSE FORM HERE
        setShowForm(false);
        setEditingProject(null);

        setStatus({
          open: true,
          type: "success",
          message: "Project created successfully!",
        });
      }

    } catch (err) {
      console.error("Save failed:", err);

      setStatus({
        open: true,
        type: "error",
        message: "Failed to save project. Please check your fields.",
      });
    }
  };


  return (
    <div className="p-2 max-w-full mx-auto space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-green-700">
          Project Admin
        </h1>

        <button
          className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow"
          onClick={handleCreate}
        >
          + Add Project
        </button>
      </div>

      {/* Table */}
      <ProjectTable
        projects={projects}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Modal Form */}
      {showForm && (
        <ProjectForm
          project={editingProject}
          onClose={() => setShowForm(false)}
          onSave={handleSave}
        />
      )}

      <StatusModal
        open={status.open}
        type={status.type}
        message={status.message}
        onClose={() => {
          setStatus({ ...status, open: false });
          loadProjects();
        }}
      />

      {/* Delete Modal */}
      <DeleteConfirmModal
        open={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
