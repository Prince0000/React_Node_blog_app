import React from 'react';

const generateAvatarInitials = (name) => {
    const initials = name.split(' ').map(word => word.charAt(0)).join('').toUpperCase();
    return initials;
}

const generateAvatarColor = (name) => {

    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = Math.abs(hash % 360);
    return `hsl(${hue}, 70%, 50%)`; 
}

const UserAvatar = ({ name }) => {
    const avatarStyle = {
        backgroundColor: generateAvatarColor(name),
        color: 'white',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: '5px'
    };

    return (
        <div style={avatarStyle}>
            {generateAvatarInitials(name)}
        </div>
    );
};

export default UserAvatar;
