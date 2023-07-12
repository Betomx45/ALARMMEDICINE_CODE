import { useState, useEffect } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

export default function Notifications() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const notificationInterval = setInterval(() => {
      sendNotification();
    }, getMillisecondsUntilNextNotification());

    return () => {
      clearInterval(notificationInterval);
    };
  }, [currentTime]);

  const sendNotification = () => {
    // Código específico para enviar la notificación
    NotificationManager.info('¡Es hora de tu Medicamento!');
  };

  const getMillisecondsUntilNextNotification = () => {
    const currentHour = currentTime.getHours();
    const startHour = 16;
    const interval = 8;

    let nextNotificationHour;

    if (currentHour < startHour) {
      nextNotificationHour = startHour;
    } else {
      const completedIntervals = Math.floor((currentHour - startHour) / interval);
      nextNotificationHour = startHour + (completedIntervals + 1) * interval;
    }

    const nextNotificationTime = new Date(currentTime);
    nextNotificationTime.setHours(nextNotificationHour, 0, 0, 0);

    const millisecondsUntilNextNotification = nextNotificationTime.getTime() - currentTime.getTime();

    return millisecondsUntilNextNotification;
  };

  return (
    <div>
      <h1>Servicio de Notificaciones</h1>
      <p>Hora actual: {currentTime.toLocaleTimeString()}</p>
      <NotificationContainer />
    </div>
  );
}