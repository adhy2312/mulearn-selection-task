import React, { useState } from 'react';


const CampusDashboard = () => {
  const [execom, setExecom] = useState([
    { name: 'Aaron S Varghese', role: 'General Secretary', muid: 'aaronsvarghese@mulearn' },
    { name: 'Adhithya Mohan', role: 'Technical Lead', muid: 'adhithyamohans@mulearn' }
  ]);

  const[newMember, setNewMember] = useState({ name: '', role: '', muid: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const[editIndex, setEditIndex] = useState(null);
  const[showReview, setShowReview] = useState(false);
  const [memberToRemove, setMemberToRemove] = useState(null);

  const handleChange = (e) => {
    setNewMember({ ...newMember, [e.target.name]: e.target.value });
  };

  const handleAddClick = () => {
    if (newMember.name && newMember.role && newMember.muid) {
      setShowReview(true);
    }
  };

  const confirmAdd = () => {
    if (editIndex !== null) {
      const updated = [...execom];
      updated[editIndex] = newMember;
      setExecom(updated);
      setEditIndex(null);
    } else {
      setExecom([...execom, newMember]);
    }
    setNewMember({ name: '', role: '', muid: '' });
    setShowReview(false);
  };

  const cancelAdd = () => {
    setShowReview(false);
    setNewMember({ name: '', role: '', muid: '' });
    setEditIndex(null);
  };

  const handleEdit = (index) => {
    setNewMember(execom[index]);
    setEditIndex(index);
  };

  const handleRemove = (index) => {
    setMemberToRemove(index);
  };

  const confirmRemove = () => {
    const updated = execom.filter((_, i) => i !== memberToRemove);
    setExecom(updated);
    setMemberToRemove(null);
  };

  const cancelRemove = () => {
    setMemberToRemove(null);
  };

  const filteredExecom = execom.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.muid.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-7xl bg-white p-8 rounded-xl shadow-lg">
        <div className="flex flex-col items-center mb-6">
          <img src="/mulearn-logo.png" alt="μLearn Logo" className="h-12 mb-2" />
          <h1 className="text-2xl md:text-3xl font-bold text-blue-700">Campus Execom Management</h1>
        </div>

        <input
          type="text"
          placeholder="Search members..."
          className="w-full p-2 mb-6 border rounded-lg"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="bg-gray-100 p-6 rounded-xl mb-6">
          <h2 className="text-lg font-semibold mb-4">Add New Member</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <input
              type="text"
              name="name"
              value={newMember.name}
              onChange={handleChange}
              placeholder="Name"
              className="p-2 border rounded"
            />
            <input
              type="text"
              name="role"
              value={newMember.role}
              onChange={handleChange}
              placeholder="Role"
              className="p-2 border rounded"
            />
            <input
              type="text"
              name="muid"
              value={newMember.muid}
              onChange={handleChange}
              placeholder="MUID"
              className="p-2 border rounded"
            />
          </div>
          <button
            onClick={handleAddClick}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            {editIndex !== null ? 'Update Member' : 'Add Member'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExecom.map((member, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
              <p className="text-gray-500">{member.muid}</p>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => handleEdit(index)}
                  className="bg-yellow-400 px-3 py-1 rounded text-white"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleRemove(index)}
                  className="bg-red-500 px-3 py-1 rounded text-white"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {showReview && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-md text-center">
              <h3 className="text-lg font-bold mb-4">Confirm Member Details</h3>
              <p><strong>Name:</strong> {newMember.name}</p>
              <p><strong>Role:</strong> {newMember.role}</p>
              <p><strong>MUID:</strong> {newMember.muid}</p>
              <div className="flex justify-center gap-4 mt-6">
                <button onClick={confirmAdd} className="bg-green-500 px-4 py-2 rounded text-white">
                  Confirm
                </button>
                <button onClick={cancelAdd} className="bg-gray-500 px-4 py-2 rounded text-white">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {memberToRemove !== null && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-md text-center">
              <h3 className="text-lg font-bold mb-4">Are you sure you want to remove this member?</h3>
              <div className="flex justify-center gap-4 mt-6">
                <button onClick={confirmRemove} className="bg-red-500 px-4 py-2 rounded text-white">
                  Yes, Remove
                </button>
                <button onClick={cancelRemove} className="bg-gray-500 px-4 py-2 rounded text-white">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CampusDashboard;
