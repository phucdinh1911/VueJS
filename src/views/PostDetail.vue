<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import Sidebar from '@/components/Sidebar.vue';
import Header from '@/components/Header.vue';
import NavMobile from '@/components/NavMobile.vue';
const isSidebarVisible = ref(false);
const toggleSidebar = () => {
  isSidebarVisible.value = !isSidebarVisible.value;
};

const closeSidebar = () => {
  isSidebarVisible.value = false;
};
const route = useRoute();
const postID = route.params.postID;
const post = ref(null);
const user = ref(null);
const apiPosts = 'https://67691fe4cbf3d7cefd39ab5a.mockapi.io/api/posts';
const apiUsers = 'https://67691fe4cbf3d7cefd39ab5a.mockapi.io/api/users';


const fetchPost = async () => {
  try {
    const response = await axios.get(`${apiPosts}/${postID}`);
    post.value = response.data;
    fetchUser(response.data.userID);
  } catch (error) {
    console.error('Error fetching post data:', error);
  }
};

const fetchUser = async (userID) => {
  try {
    const response = await axios.get(`${apiUsers}/${userID}`);
    user.value = response.data.name;
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};

onMounted(() => {
  fetchPost();
});
</script>

<template>
  <div class="container">
    <Sidebar/>
   <div class="Sidebar-Mobile" v-if="isSidebarVisible">
    <NavMobile @closeSlidebar="toggleSidebar"/>
   </div> 
    <div class="main">
      <Header @toggle-sidebar="toggleSidebar" />
      <main class="l-card" v-if="post && user">
        <section class="l-card__text">
          <img :src="`../images/${post.image}`" alt="" class="my-image" />
          <h1 class="title">{{ post.title }}</h1>
          <span class="tag tag-blue">{{ post.tags }}</span>
          <p>{{ post.content }}</p>
        </section>
        <section class="l-card__user">
          <div class="l-card__userInfo">
            <span>Người đăng: {{ user }}</span> 
            <span>{{ new Date(post.createdAt * 1000).toLocaleString() }}</span>
            <span>{{ post.views }} views</span>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<style scoped>
.l-card {
  margin: 3%;
  width: auto;
  min-width: 360px;
  max-width: 100%;
  height: auto;
  background: var(--secondary-color);
  color: #272727;
  padding: 50px;
  box-shadow: 0px 7px 24px rgba(100, 100, 100, 0.4);
}
.l-card__text p {
  margin-top: 10px;
  font-size: 30px;
  font-family: "Vollkorn", serif;
  font-weight: 400;
  color: #3f3f55;
  text-align: left;
}

.l-card__text p::after {
  content: "\201D";
  display: inline;
  color: #999;
}

.l-card__text p::before {
  content: "\201C";
  display: inline;
  color: #999;
}

.l-card__user {
  display: flex;
  flex-direction: row;
  padding-top: 24px;
  margin-top: 12px;
  border-top: 1px solid #c1c1c1;
  align-items: center;
}

.l-card__userInfo {
  display: flex;
  flex-direction: column;
  margin-left: 16px;
}

.l-card__userInfo span:nth-child(1) {
  font-weight: bold;
  font-family: sans-serif;
  font-size: 14px;
  color: #3f3f55;
}

.l-card__userInfo span:nth-child(2), .l-card__userInfo span:nth-child(3) {
  color: #adada6;
  font-family: sans-serif;
  font-size: 12px;
  margin-top: 2px;
}

.l-card__userInfo span:nth-child(3) {
  width: 80px;
  height: 30px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--blue);
  color: white;
  font-family: sans-serif;
  font-size: 14px;
  margin-top: 5%;
  border: 1px solid grey;
  border-radius: 30px;
}

.my-image {
  width: 50%;
  margin-left: 25%;
  height: auto;
  border-radius: 10px;

}

.tag {
  align-self: flex-start;
  padding: .25em .75em;
  border-radius: 1em;
  font-size: .75rem;
}

.tag-blue {
  background: linear-gradient(to bottom, #2F80ED, #56CCF2);
  color: #fafafa;
}

.title {
  text-transform: uppercase;
}
</style>
