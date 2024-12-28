<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Button1 from './Buttons/Button1.vue';

const accountName = ref(''); 
const searchQuery = ref('');
const router = useRouter();

onMounted(() => {
  const userData = localStorage.getItem('user');
  if (userData) {
    const user = JSON.parse(userData);
    accountName.value = user.name; 
  }
});


const handleSearch = () => {
  if (searchQuery.value.trim() !== '') {
    router.push({ path: '/search', query: { tukhoa: searchQuery.value } }).then(() => {
      location.reload();
    });
  }
};

</script>


<template>
  <div class="topbar">
    <div class="toggle" @click="$emit('toggle-sidebar')">
    <i class="bx bx-menu"></i>
  </div>

    <div class="search">
      <label>
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Tìm kiếm" 
          @keypress.enter="handleSearch"
        />
        <i class='bx bx-search-alt' @click="handleSearch"></i>
      </label>
    </div>

    <Button1 />

    <div class="info">
      <div class="account">
        <img src="../assets/images/user-icon1.jpg" alt="User Icon">
      </div>
      <div class="accountname">
        <p>Xin chào, {{ accountName }}</p> 
      </div>
    </div>
  </div>
</template>

<style scoped>
.topbar {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  border-bottom: 1px solid var(--gray); 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
}

.toggle {
 display: none;
  position: relative;
  width: 60px;
  height: 60px;
  justify-content: center;
  align-items: center;
  font-size: 2.5rem;
  cursor: pointer;
}

.search {
  position: relative;
  width: 400px;
  margin: 0 10px;
}

.search label {
  position: relative;
  width: 100%;

}

.search label input {
  width: 100%;
  height: 40px;
  border-radius: 40px;
  padding: 5px 20px;
  padding-left: 35px;
  font-size: 18px;
  outline: none;
  border: 1px solid var(--black2);
}

.search label i {
  position: absolute;
  top: 0;
  left: 10px;
  font-size: 1.2rem;
}
.info {
  display: flex;
  align-items: center;
  gap:5px;
}

.account {
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
}

.accountname {
    color: var(--black1);
    position: relative;
}

.account img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
@media screen and (max-width:1160px) {
  .search {
  width: 200px;
}

}
@media screen and (max-width:1024px) {
  .toggle{
    display: flex;
  }
  .search {
  width: 200px;

}
}
@media screen and (max-width:768px) {
  .search {
  width: 200px;

}
}
@media screen and (max-width:650px) {
  .search {
  width: 130px;


}
.accountname {
    display: none; 
  }
  .info {
  display: flex;
  align-items:flex-end;
  gap:5px;
}
}
@media screen and (max-width:525px) {

}
@media screen and (max-width:486px) {
  .search {
  width: 100px;
 
}

}
@media screen and (max-width:400px){
  .search {
  width: 80px;
}

}
</style>