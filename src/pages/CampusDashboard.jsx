import React, { useState } from "react";
import ExecomCard from "../components/ExecomCard";

const CampusDashboard = () => {
  const [execom, setExecom] = useState([
    { name: "Aaron S Varghese", role: "General Secretary", muid: "aaronsvarghese@mulearn" },
    { name: "Adhithya Mohan", role: "Technical Lead", muid: "adhithyamohans@mulearn" },
  ]);

  const [form, setForm] = useState({ name: "", role: "", muid: "" });
  const [showReview, setShowReview] = useState(false);

  const handleConfirmAdd = () => {
    setExecom([...execom, form]);
    setForm({ name: "", role: "", muid: "" });
    setShowReview(false);
  };

  const handleRemove = (index) => {
    const updated = [...execom];
    updated.splice(index, 1);
    setExecom(updated);
  };

  const handleUpdate = (indexToUpdate, updatedMember) => {
    const updated = execom.map((m, index) =>
      index === indexToUpdate ? updatedMember : m
    );
    setExecom(updated);
  };

  const isFormValid = form.name && form.role && form.muid;

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
        Campus Execom Management
      </h1>

      {/* Add Form */}
      <div className="grid sm:grid-cols-3 gap-4 mb-4">
        <input
          className="border p-2 rounded"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="border p-2 rounded"
          placeholder="Role"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        />
        <input
          className="border p-2 rounded"
          placeholder="MUID"
          value={form.muid}
          onChange={(e) => setForm({ ...form, muid: e.target.value })}
        />
      </div>
      <button
        disabled={!isFormValid}
        onClick={() => setShowReview(true)}
        className={`px-6 py-2 rounded ${
          isFormValid
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "bg-gray-300 text-gray-600 cursor-not-allowed"
        }`}
      >
        Add Member
      </button>

      {/* Review Modal */}
      {showReview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white p-6 rounded-xl shadow-xl text-center max-w-sm w-full">
            <h2 className="text-lg font-bold mb-4">Review Member Details</h2>
            <div className="text-left mb-6">
              <p><strong>Name:</strong> {form.name}</p>
              <p><strong>Role:</strong> {form.role}</p>
              <p><strong>MUID:</strong> {form.muid}</p>
            </div>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleConfirmAdd}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Confirm Add
              </button>
              <button
                onClick={() => setShowReview(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Member List */}
      <div className="mt-8 grid sm:grid-cols-2 gap-6">
        {execom.map((member, index) => (
          <ExecomCard
            key={index}
            member={member}
            onRemove={() => handleRemove(index)}
            onUpdate={(updatedMember) => handleUpdate(index, updatedMember)}
          />
        ))}
      </div>
    </div>
  );
};

export default CampusDashboard;
