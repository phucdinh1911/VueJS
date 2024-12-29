<script setup>
import { ref, onMounted } from 'vue';
import Sidebar from '@/components/Sidebar.vue';
import Header from '@/components/Header.vue';
import AlertDev from '@/components/AlertDev.vue';
import NavMobile from '@/components/NavMobile.vue';
const isSidebarVisible = ref(false);

const toggleSidebar = () => {
  isSidebarVisible.value = !isSidebarVisible.value;
};
</script>

<template>
   <div class="container">
    <Sidebar/>
   <div class="Sidebar-Mobile" v-if="isSidebarVisible">
    <NavMobile @closeSlidebar="toggleSidebar"/>
   </div> 
    <div class="main">
      <Header @toggle-sidebar="toggleSidebar" />
      <AlertDev/>
     
    </div>
  </div>
</template>
<style scoped>
</style>
