import React, { useState } from "react";

const ExecomCard = ({ member, onRemove, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedMember, setEditedMember] = useState(member);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSave = () => {
    onUpdate(editedMember);
    setIsEditing(false);
  };

  return (
    <>
      <div className="p-4 bg-gray-100 rounded-lg shadow hover:shadow-md transition-all relative">
        {isEditing ? (
          <>
            <input
              className="border p-1 mb-2 w-full rounded"
              value={editedMember.name}
              onChange={(e) => setEditedMember({ ...editedMember, name: e.target.value })}
            />
            <input
              className="border p-1 mb-2 w-full rounded"
              value={editedMember.role}
              onChange={(e) => setEditedMember({ ...editedMember, role: e.target.value })}
            />
            <input
              className="border p-1 mb-2 w-full rounded"
              value={editedMember.muid}
              onChange={(e) => setEditedMember({ ...editedMember, muid: e.target.value })}
            />
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-3 py-1 mr-2 rounded hover:bg-green-700"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold">{member.name}</h2>
            <p className="text-gray-600">{member.role}</p>
            <p className="text-sm text-gray-500 mb-4">{member.muid}</p>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-yellow-500 text-white px-3 py-1 mr-2 rounded hover:bg-yellow-600"
            >
              Edit
            </button>
            <button
              onClick={() => setShowConfirm(true)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Remove
            </button>
          </>
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded-xl shadow-xl text-center max-w-sm w-full">
            <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
            <p className="mb-6">Are you sure you want to remove <strong>{member.name}</strong>?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  onRemove();
                  setShowConfirm(false);
                }}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Yes, Remove
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ExecomCard;
