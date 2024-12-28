<script setup>
import { ref, onMounted } from 'vue';
import Sidebar from '@/components/Sidebar.vue';
import Header from '@/components/Header.vue';
const isSidebarVisible = ref(true);

const toggleSidebar = () => {
  isSidebarVisible.value = !isSidebarVisible.value;
};

const closeSidebar = () => {
  isSidebarVisible.value = false;
};
import AlertDev from '@/components/AlertDev.vue';
</script>

<template>
  <div class="container">
    <Sidebar :isSidebarVisible="isSidebarVisible" @close-sidebar="closeSidebar" />
    <div class="main">
      <Header @toggle-sidebar="toggleSidebar" />
      <AlertDev/>
     
    </div>
  </div>
</template>
<style scoped>
</style>
