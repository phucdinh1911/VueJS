<script setup>
import { ref, onMounted } from 'vue';
import Sidebar from '@/components/Sidebar.vue';
import Header from '@/components/Header.vue';
import FormAdd from '@/components/FormAdd.vue';
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
  <h2>Thêm mới bài viết<small>Sucodev community</small></h2>
    <FormAdd/>
  </div>
</div>
</template>

<style scoped>
h2{
  text-align:center; 
  margin-top: 5%;
  margin-bottom:2%; 
}
h2 small { 
  font-weight:normal; 
  color:#888; 
  display:block; 
}
</style>
