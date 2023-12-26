import { reactive } from 'vue'
import { addNotification } from '@/composables/useNotifications';

type Notification = {
  id?: number | string,
  message: string,
  timeout?: number | string | null,
  type : string
}

const notifications : Notification[]  = reactive([])


const addNotification = ({ message, timeout = null, type = "info" }: Notification) => {
  const randomId = Math.random() + Date.now();
  notifications.push({
    id: randomId,
    message,
    type,
  });
  if (timeout) {
    setTimeout(() => {
      removeNotification(randomId);
    }, +timeout);
  }
};

const removeNotification = (id) => {
  const index = notifications.findIndex(item => item.id === id)
  notifications.splice(index, 1)
}
export default function useNotifications() {
  return { notifications, addNotification, removeNotification }
}