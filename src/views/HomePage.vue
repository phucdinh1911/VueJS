<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Sidebar from '@/components/Sidebar.vue';
import Header from '@/components/Header.vue';
const isSidebarVisible = ref(false);

const toggleSidebar = () => {
  isSidebarVisible.value = !isSidebarVisible.value;
};

const closeSidebar = () => {
  isSidebarVisible.value = false;
};
import ButtonDetails from '@/components/Buttons/ButtonDetails.vue';
const posts = ref([]);
const users = ref([]);
const apiPosts = 'https://67691fe4cbf3d7cefd39ab5a.mockapi.io/api/posts';
const apiUsers = 'https://67691fe4cbf3d7cefd39ab5a.mockapi.io/api/users';
const fetchPostsAndUsers = async () => {
  try {
    const [postsResponse, usersResponse] = await Promise.all([
      axios.get(apiPosts),
      axios.get(apiUsers),
    ]);
    users.value = usersResponse.data;
    posts.value = postsResponse.data.map((post) => {
      const user = users.value.find((u) => u.id === post.userID);
      return {
        ...post,
        username: user ? user.name : 'Unknown User',
      };
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
onMounted(() => {
  fetchPostsAndUsers();
});
</script>

<template>
  <div class="container">
    <Sidebar :isSidebarVisible="isSidebarVisible" @close-sidebar="closeSidebar" />
    <div class="main">
      <Header @toggle-sidebar="toggleSidebar" />
      <div class="intro">
        <h2>Sucodev Community</h2>
        <p>Là cộng đồng cung cấp, chia sẻ kiến thức về lập trình</p>
      </div>
      
      <div class="content">
        <div v-for="post in posts" :key="post.postID" class="card">
          <div class="card__header">
            <img :src="`../src/assets/images/${post.image}`" alt="card__image" class="card__image" width="600" />
          </div>
          <div class="card__body">
            <span class="tag" :class="{
              'tag-blue': post.tags === 'Tin công nghệ',
              'tag-brown': post.tags === 'Hội thảo',
              'tag-red': post.tags === 'Kiến thức IT'
            }">
              {{ post.tags }}
            </span>
            <h5>{{ post.views }} views</h5>
            <h4>{{ post.title }}</h4>
            <p>{{ post.content }}</p>
          </div>
          <div class="card__footer">
            <div class="user">
              <div class="user__info">
                <h5>Người đăng: {{ post.username }}</h5>
                <small>{{ new Date(post.createdAt * 1000).toLocaleString() }}</small>
              </div>
            </div>
            <ButtonDetails :postID="post.postID"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.intro {
  margin-top: 1%;
  padding: 20px;
  background-color: var(--secondary-color);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}
.intro h2 {
  color: var(--blue);
  margin-bottom: 10px;
  text-transform: uppercase;
}
.intro p {
  color: var(--black1);
}
.content {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items:center;
  max-width: 100%;
  margin-block: 2rem;
  gap: 2rem;
}
.card {
  display: flex;
  flex-direction: column;
  width: clamp(20rem, calc(20rem + 2vw), 22rem);
  overflow: hidden;
  box-shadow: 0 .1rem 1rem rgba(0, 0, 0, 0.1);
  border-radius: 1em;
  background: linear-gradient(to right, #FFFFFF, var(--secondary-color));
  /* transition: transform 0.3s ease-in-out;  */
}
/* .card:hover {
  transform: translateY(-10px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); 
} */
.card__header img {
  max-width: 100%;
  display: block;
  object-fit: cover;
}
.card__body {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: .5rem;
}
.card__body p {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
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
.tag-brown {
  background: linear-gradient(to bottom, #FFD194, #D1913C);
  color: #fafafa;
}
.tag-red {
  background: linear-gradient(to bottom, #ef473a, #cb2d3e);
  color: #fafafa;
}
.card__footer {
  display: flex;
  padding: 1rem;
  margin-top: auto;
}
.user {
  display: flex;
  gap: .5rem;
}
.user__info small {
  color: #666;
}
</style>
