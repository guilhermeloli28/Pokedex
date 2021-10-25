import React from 'react';
import { ReactNotificationOptions, store } from 'react-notifications-component';

const Notification = ({title, message, type}: ReactNotificationOptions) => {
    return (
        store.addNotification({
            title,
            message,
            type,
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: true
            }
          })
    );
}

export default Notification;