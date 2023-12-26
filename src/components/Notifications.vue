<template>
  <div class="notifications">
    <transition-group name="notification">
      <div
        class="notification"
        :class="`notification-type-${notification.type}`"
        v-for="notification in notifications"
        :key="notification.id"
      >
        <span>{{ notification.message }}</span>
        <button @click="removeNotification(notification.id)"><v-icon color="rgb(199, 6, 6)">mdi-close</v-icon></button>
      </div>
    </transition-group>
  </div>
</template>
<script lang="ts">
import useNotifications from '@/composables/useNotifications'
export default {
  setup () {
    const { notifications, removeNotification } = useNotifications()
    return { notifications, removeNotification }
  }
}
</script>
<style scoped>
  .notifications {
  position: fixed;
  bottom: 20px;
  right: 0;
}
*{
  -webkit-user-select: none;  /* Chrome all / Safari all */
  -moz-user-select: none;     /* Firefox all */
  -ms-user-select: none;      /* IE 10+ */
  user-select: none;          /* Likely future */      
}
.notification {
  background: white;
  display: flex;
  justify-content: space-between;
  width: 450px;
  box-shadow: 2px 2px 2px 2px rbga(0, 0, 0.5);
  padding: 10px 20px;
  margin-bottom: 5px;
  border-left: 10px solid #263959;
  border-top-left-radius : 5px ;
  border-bottom-left-radius: 5px;
}
.notification.notification-type-error{
  border-left: 10px solid rgb(199, 6, 6);
}
.notification.notification-type-success{
  border-left: 10px solid rgb(12, 199, 6);
}
.notification-enter-active,
.notification-leave-active {
  transition: all .5s ease;
}
.notification-enter-from,
.notification-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
.notification-move {
  transition: transform 0.8s ease;
}
</style>