import React, { useState } from "react";
import ExecomCard from "../components/ExecomCard";

const CampusDashboard = () => {
  const [execom, setExecom] = useState([
    {
      name: "Aaron S Varghese",
      role: "General Secretary",
      muid: "aaronsvarghese@mulearn",
    },
    {
      name: "Adhithya Mohan",
      role: "Technical Lead",
      muid: "adhithyamohans@mulearn",
    },
  ]);

  const [form, setForm] = useState({ name: "", role: "", muid: "" });
  const [showReview, setShowReview] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const isFormValid = form.name && form.role && form.muid;

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

  const handleUpdate = (index, updatedMember) => {
    const updated = execom.map((m, i) =>
      i === index ? updatedMember : m
    );
    setExecom(updated);
  };

  const filteredExecom = execom.filter((member) =>
    `${member.name} ${member.role} ${member.muid}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-xl">
      {/* Logo */}
      <div className="flex justify-center mb-4">
        <img
          src="/mulearn-logo.png"
          alt="µLearn Logo"
          className="h-16 object-contain"
        />
      </div>

      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
        Campus Execom Management
      </h1>

      {/* Search */}
      <input
        type="text"
        className="w-full p-2 mb-4 border rounded"
        placeholder="Search members..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Add Member Form */}
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
        onClick={() => setShowReview(true)}
        disabled={!isFormValid}
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

      {/* Member Cards */}
      <div className="mt-6 grid sm:grid-cols-2 gap-6">
        {filteredExecom.length > 0 ? (
          filteredExecom.map((member, index) => (
            <ExecomCard
              key={index}
              member={member}
              onRemove={() => handleRemove(index)}
              onUpdate={(updated) => handleUpdate(index, updated)}
            />
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">No matching members found.</p>
        )}
      </div>
    </div>
  );
};

export default CampusDashboard;
