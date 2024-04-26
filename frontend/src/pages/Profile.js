// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function Profile() {
//   const [profileData, setProfileData] = useState(null);
//   const [profilePhoto, setProfilePhoto] = useState(null);

//   useEffect(() => {
//     const fetchProfileData = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get('/api/users/profile', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setProfileData(response.data);
//       } catch (err) {
//         console.error('Error fetching profile data:', err);
//       }
//     };

//     fetchProfileData();
//   }, []);

//   const handlePhotoUpload = async (e) => {
//     const file = e.target.files[0];
//     const formData = new FormData();
//     formData.append('profilePhoto', file);

//     try {
//       const token = localStorage.getItem('token');
//       await axios.post('/api/users/upload-photo', formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       // Refresh profile data or show success message
//     } catch (err) {
//       console.error('Error uploading photo:', err);
//     }
//   };

//   return (
//     <div>
//         {/* console.log("Hit profile page"); */}
//       <h2>Profile</h2>
//       {profileData && (
//         <div>
//           <p>Email: {profileData.email}</p>
//           {profileData.profilePhoto && (
//             <img src={profileData.profilePhoto} alt="Profile" />
//           )}
//         </div>
//       )}
//       <input type="file" onChange={handlePhotoUpload} />
//     </div>
//   );
// }

// export default Profile;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function Profile() {
//     const [profileData, setProfileData] = useState(null);
//     const [error, setError] = useState(null);
//     const [success, setSuccess] = useState(null);

//     useEffect(() => {
//         const fetchProfileData = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 const response = await axios.get('/api/users/profile', {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 });
//                 setProfileData(response.data);
//             } catch (err) {
//                 console.error('Error fetching profile data:', err);
//                 setError('Error fetching profile data');
//             }
//         };

//         fetchProfileData();
//     }, []);

//     const handlePhotoUpload = async (e) => {
//         const file = e.target.files[0];
//         const formData = new FormData();
//         formData.append('photo', file);

//         try {
//             const token = localStorage.getItem('token');
//             const response = await axios.post('/api/users/upload-photo', formData, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });
//             // Set success message and refresh profile data
//             setSuccess('Photo uploaded successfully!');
//             fetchProfileData(); // Refresh profile data after photo upload
//         } catch (err) {
//             console.error('Error uploading photo:', err);
//             setError('Error uploading photo');
//         }
//     };

//     return (
//         <div>
//             <h2>Profile</h2>
//             {error && <p style={{ color: 'red' }}>{error}</p>}
//             {success && <p style={{ color: 'green' }}>{success}</p>}
//             {profileData && (
//                 <div>
//                     <p>Email: {profileData.email}</p>
//                     {profileData.profilePhoto && (
//                         <img src={profileData.profilePhoto} alt="Profile" />
//                     )}
//                 </div>
//             )}
//             <input type="file" onChange={handlePhotoUpload} />
//         </div>
//     );
// }

// export default Profile;




// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function Profile() {
//     const [profileData, setProfileData] = useState(null);
//     const [error, setError] = useState(null);
//     const [success, setSuccess] = useState(null);

//     // Define fetchProfileData function outside of useEffect
//     const fetchProfileData = async () => {
//         try {
//             const token = localStorage.getItem('token');
//             const response = await axios.get('/api/users/profile', {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });
//             setProfileData(response.data);
//         } catch (err) {
//             console.error('Error fetching profile data:', err);
//             setError('Error fetching profile data');
//         }
//     };

//     // Call fetchProfileData when component mounts
//     useEffect(() => {
//         fetchProfileData();
//     }, []);

//     const handlePhotoUpload = async (e) => {
//         const file = e.target.files[0];
//         const formData = new FormData();
//         formData.append('photo', file);

//         try {
//             const token = localStorage.getItem('token');
//             const response = await axios.post('/api/users/upload-photo', formData, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });
//             // Set success message and refresh profile data
//             setSuccess('Photo uploaded successfully!');
//             fetchProfileData(); // Refresh profile data after photo upload
//         } catch (err) {
//             console.error('Error uploading photo:', err);
//             alert(err);
//             setError('Error uploading photo');
//         }
//     };

//     return (
//         <div>
//             <h2>Profile</h2>
//             {error && <p style={{ color: 'red' }}>{error}</p>}
//             {success && <p style={{ color: 'green' }}>{success}</p>}
//             {profileData && (
//                 <div>
//                     <p>Email: {profileData.email}</p>
//                     {profileData.profilePhoto && (
//                         <img src={profileData.profilePhoto} alt="Profile" />
//                     )}
//                 </div>
//             )}
//             <input type="file" onChange={handlePhotoUpload} />
//         </div>
//     );
// }

// export default Profile;


import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Profile() {
    const [profileData, setProfileData] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // Define fetchProfileData function outside of useEffect
    const fetchProfileData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('/api/users/profile', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setProfileData(response.data);
        } catch (err) {
            console.error('Error fetching profile data:', err);
            setError('Error fetching profile data');
        }
    };

    // Fetch profile data when component mounts
    useEffect(() => {
        fetchProfileData();
    }, []);

    // Handle file selection
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file); // Store selected file in state
    };

    // Handle photo upload
    const handlePhotoUpload = async () => {
        if (!selectedFile) {
            setError('Please select a photo to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('photo', selectedFile);

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('/api/users/upload-photo', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            // Set success message and refresh profile data
            setSuccess('Photo uploaded successfully!');
            setError(null); // Clear any previous errors
            setSelectedFile(null); // Clear the selected file
            fetchProfileData(); // Refresh profile data after photo upload
        } catch (err) {
            console.error('Error uploading photo:', err);
            alert(err);
            setError('Error uploading photo');
        }
    };

    return (
        <div>
            <h2>Profile</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            {profileData && (
                <div>
                    <p>Email: {profileData.email}</p>
                    {profileData.profilePhoto && (
                        <img src={profileData.profilePhoto} alt="Profile" />
                    )}
                </div>
            )}
            <input type="file" onChange={handleFileChange} />
            <button onClick={handlePhotoUpload}>Upload</button>
        </div>
    );
}

export default Profile;
