// 'use client';

// import { useEffect, useState } from 'react';
// import { adminAPI } from '@/lib/api';

// export default function SubmissionsPage() {
//   const [submissions, setSubmissions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filter, setFilter] = useState('');
//   const [selectedImage, setSelectedImage] = useState(null);

//   useEffect(() => {
//     loadSubmissions();
//   }, [filter]);

//   const loadSubmissions = async () => {
//     setLoading(true);
//     try {
//       const result = await adminAPI.getSubmissions(filter);
//       if (result.success) {
//         setSubmissions(result.submissions);
//       }
//     } catch (error) {
//       console.error('Error loading submissions:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleApprove = async (id) => {
//     try {
//       const result = await adminAPI.approveSubmission(id);
//       if (result.success) {
//         loadSubmissions();
//       }
//     } catch (error) {
//       console.error('Error approving submission:', error);
//     }
//   };

//   const handleReject = async (id) => {
//     try {
//       const result = await adminAPI.rejectSubmission(id);
//       if (result.success) {
//         loadSubmissions();
//       }
//     } catch (error) {
//       console.error('Error rejecting submission:', error);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!confirm('Are you sure you want to delete this submission?')) return;

//     try {
//       const result = await adminAPI.deleteSubmission(id);
//       if (result.success) {
//         loadSubmissions();
//       }
//     } catch (error) {
//       console.error('Error deleting submission:', error);
//     }
//   };

//   const getStatusBadge = (status) => {
//     const classes = {
//       pending: 'badge-warning',
//       approved: 'badge-success',
//       rejected: 'badge-danger'
//     };
//     return `badge ${classes[status] || 'badge-warning'}`;
//   };

//   return (
//     <div>
//       <div className="page-header">
//         <h1 className="page-title">Submissions</h1>
//         <p className="page-subtitle">Manage run submissions</p>
//       </div>

//       <div className="filter-container">
//         <select
//           className="form-select"
//           value={filter}
//           onChange={(e) => setFilter(e.target.value)}
//           style={{ maxWidth: '200px' }}
//         >
//           <option value="">All Status</option>
//           <option value="pending">Pending</option>
//           <option value="approved">Approved</option>
//           <option value="rejected">Rejected</option>
//         </select>
//       </div>

//       {loading ? (
//         <div className="loading-screen">
//           <div className="spinner"></div>
//         </div>
//       ) : (
//         <div className="table-container">
//           <table className="table">
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Phone</th>
//                 <th>Distance</th>
//                 <th>Image</th>
//                 <th>Status</th>
//                 <th>Date</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {submissions.length === 0 ? (
//                 <tr>
//                   <td colSpan="8" style={{ textAlign: 'center', padding: '40px' }}>
//                     No submissions found
//                   </td>
//                 </tr>
//               ) : (
//                 submissions.map((sub) => (
//                   <tr key={sub._id}>
//                     <td>{sub.name}</td>
//                     <td>{sub.email}</td>
//                     <td>{sub.phone}</td>
//                     <td>{sub.distance} km</td>
//                     <td>
//                       {sub.image && (
//                         <img
//                           src={sub.image}
//                           alt="Submission"
//                           style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px', cursor: 'pointer' }}
//                           onClick={() => setSelectedImage(sub.image)}
//                         />
//                       )}
//                     </td>
//                     <td>
//                       <span className={getStatusBadge(sub.status)}>
//                         {sub.status}
//                       </span>
//                     </td>
//                     <td>{new Date(sub.createdAt).toLocaleDateString()}</td>
//                     <td>
//                       <div className="actions">
//                         {sub.status === 'pending' && (
//                           <>
//                             <button
//                               className="action-btn"
//                               style={{ background: '#00ff88', color: '#0a0a0a' }}
//                               onClick={() => handleApprove(sub._id)}
//                             >
//                               Approve
//                             </button>
//                             <button
//                               className="action-btn"
//                               style={{ background: '#ff9800', color: 'white' }}
//                               onClick={() => handleReject(sub._id)}
//                             >
//                               Reject
//                             </button>
//                           </>
//                         )}
//                         <button
//                           className="action-btn"
//                           style={{ background: '#ff4444', color: 'white' }}
//                           onClick={() => handleDelete(sub._id)}
//                         >
//                           Delete
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Image Modal */}
//       {selectedImage && (
//         <div 
//           style={{
//             position: 'fixed',
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             background: 'rgba(0,0,0,0.9)',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             zIndex: 9999,
//             cursor: 'pointer'
//           }}
//           onClick={() => setSelectedImage(null)}
//         >
//           <img
//             src={selectedImage}
//             alt="Full size"
//             style={{ maxWidth: '90%', maxHeight: '90%', borderRadius: '12px' }}
//           />
//         </div>
//       )}
//     </div>
//   );
// }

"use client";
import { useEffect, useState } from "react";

export default function Submissions() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/submissions`)
      .then((res) => res.json())
      .then((res) => setData(res.data || []));
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">📊 Submissions</h1>

      <div className="bg-white rounded-2xl shadow-xl p-5 overflow-x-auto">
        <table className="w-full text-sm">
          
          <thead>
            <tr className="text-gray-500 border-b">
              <th className="p-3 text-left">Name</th>
              <th>Email</th>
              <th>Distance</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-10 text-gray-400">
                  🚫 No submissions yet
                </td>
              </tr>
            ) : (
              data.map((item, i) => (
                <tr key={i} className="border-b hover:bg-gray-50 transition">
                  <td className="p-3 font-semibold">{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.distance}</td>

                  <td>
                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs">
                      {item.status}
                    </span>
                  </td>

                  <td>
                    <button className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600">
                      Approve
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
}