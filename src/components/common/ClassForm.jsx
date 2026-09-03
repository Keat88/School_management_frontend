import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {  classRoomApi } from "../../data/classrooms";


export default function ClassForm({ classItem: propClass = null, onSuccess }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const isEditMode = Boolean(propClass || id);
  const classId = propClass?.id || id;

  const [formData, setFormData] = useState({
    name: "",
    start_date: "",
    end_date: "",
    is_current: false,
    grade: "",
    section: "",
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(!propClass && Boolean(id));
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    if (propClass) {
      populateForm(propClass);
    } else if (id) {
      classRoomApi
        .getShow(id)
        .then((response) => {
          const classDataObj = response?.data || response;
          populateForm(classDataObj);
          setFetching(false);
        })
        .catch((error) => {
          console.error("Failed to load class details", error);
          setFetching(false);
          setFeedback({
            type: "error",
            text: "Failed to load class details for editing.",
          });
        });
    }
  }, [propClass, id]);

  const populateForm = (data) => {
    setFormData({
      name: data.name || "",
      start_date: data.start_date || "",
      end_date: data.end_date || "",
      is_current: Boolean(data.is_current),
      grade: data.grade || "",
      section: data.section || "",
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);

    try {
      if (isEditMode) {
        await classRoomApi.upDate(formData, classId);
        setFeedback({ type: "success", text: "Class updated successfully!" });
      } else {
        await classRoomApi.addNew(formData);
        setFeedback({ type: "success", text: "Class added successfully!" });
      }

      if (onSuccess) {
        onSuccess();
      } else {
        setTimeout(() => navigate("/classes"), 1000);
      }
    } catch (error) {
      setFeedback({
        type: "error",
        text:
          error.response?.data?.message ||
          "Something went wrong. Please check your inputs.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl border border-gray-200 shadow-sm text-center text-gray-500">
        Loading class details...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-800">
          {isEditMode ? "Edit Class" : "Add New Class"}
        </h2>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors flex items-center space-x-1"
        >
          <span>← Back</span>
        </button>
      </div>

      {feedback && (
        <div
          className={`p-4 mb-6 rounded-lg text-sm font-medium ${
            feedback.type === "success"
              ? "bg-green-50 text-green-600 border border-green-200"
              : "bg-red-50 text-red-600 border border-red-200"
          }`}
        >
          {feedback.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h3 className="text-md font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-100">
            Class Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Class Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                maxLength={255}
                placeholder="e.g., Mathematics 101"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Section
              </label>
              <input
                type="text"
                name="section"
                value={formData.section}
                onChange={handleChange}
                required
                placeholder="e.g., Section A"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Grade
              </label>
              <input
                type="number"
                name="grade"
                value={formData.grade}
                onChange={handleChange}
                required
                placeholder="e.g., 10"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center pt-6">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="is_current"
                  checked={formData.is_current}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-600">
                  Is Current Active Class
                </span>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Start Date
              </label>
              <input
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                End Date
              </label>
              <input
                type="date"
                name="end_date"
                value={formData.end_date}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 space-x-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {loading ? "Saving..." : isEditMode ? "Update Class" : "Save Class"}
          </button>
        </div>
      </form>
    </div>
  );
}