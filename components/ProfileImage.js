import React from 'react'

const ProfileImage = (params) => {
    console.log(params.src)
    return (
        params.src ? (
            <div className="w-10 h-10 rounded-full" style={{ backgroundImage: `url(${params.src})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            </div>
        ): <div></div>
    )
}

export default ProfileImage

// <div className="profilePicture rounded-full w-10 h-10 overflow-hidden">
//     <img className='w-10 h-auto object-cover' src={profilePic} alt="" />
// </div>}