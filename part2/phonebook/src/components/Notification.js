import React from 'react';


const Notification = ( {message} ) => {
    if (message === null) {
        return null
    }

    return (
        <div className={message.type}>
            {message.body}
        </div>
    );
};


export default Notification;