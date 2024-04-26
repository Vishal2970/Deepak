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


import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Profile() {
    const [profileData, setProfileData] = useState(null);
    const [error, setError] = useState(null);

    const fetchProfileData = async () => {
        try {
            // Include the token in the request headers
            const token = localStorage.getItem('jwtToken'); // Assuming you stored the token in localStorage
            const response = await axios.get('/api/users/profile', {
                headers: {
                    'Authorization': `Bearer ${token}`, // Use Bearer token
                },
            });
            setProfileData(response.data);
        } catch (error) {
            setError(`Error fetching profile data: ${error.message}`);
            console.error(error);
        }
    };

    useEffect(() => {
        fetchProfileData();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>Profile</h2>
            {profileData ? (
                <div>
                    <p>Email: {profileData.email}</p>
                    <p>Profile Photo: {profileData.profilePhoto}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default Profile;
