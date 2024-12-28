<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Sidebar from '../components/Sidebar.vue';
import Header from '../components/Header.vue';
import ButtonDetails from '../components/Buttons/ButtonDetails.vue';
const isSidebarVisible = ref(true);

const toggleSidebar = () => {
  isSidebarVisible.value = !isSidebarVisible.value;
};

const closeSidebar = () => {
  isSidebarVisible.value = false;
};
const route = useRoute(); 
const searchResults = ref([]);
const searchQuery = ref(route.query.tukhoa || ''); 

onMounted(() => {
  fetchSearchResults(); 
});

const fetchSearchResults = async () => {
  const apiURL = 'https://67691fe4cbf3d7cefd39ab5a.mockapi.io/api/posts';
  const response = await fetch(apiURL);
  const data = await response.json();
  searchResults.value = data.filter(post =>
    post.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
};
</script>

<template>
  <div class="container">
    <Sidebar :isSidebarVisible="isSidebarVisible" @close-sidebar="closeSidebar" />
    <div class="main">
      <Header @toggle-sidebar="toggleSidebar" />
      <div class="intro">
        <h2>Kết quả tìm kiếm cho: "{{ searchQuery }}"</h2>
        <p>
          Tìm thấy <b>{{ searchResults.length }}</b> bài viết phù hợp.
        </p>
      </div>

      <div class="content">
        <div v-for="post in searchResults" :key="post.postID" class="card">
          <div class="card__header">
            <img :src="`../images/${post.image}`" alt="card__image" class="card__image" width="600" />
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
                <h5>Người đăng: {{ post.userID }}</h5>
                <small>{{ new Date(post.createdAt * 1000).toLocaleString() }}</small>
              </div>
            </div>
            <ButtonDetails :postID="post.postID" />
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
  max-width: 100%;
  margin-block: 2rem;
  gap: 2rem;
}
.card {
  display: flex;
  flex-direction: column;
  width: clamp(20rem, calc(20rem + 2vw), 22rem);
  overflow: hidden;
  box-shadow: 0 0.1rem 1rem rgba(0, 0, 0, 0.1);
  border-radius: 1em;
  background: linear-gradient(to right, #ffffff, var(--secondary-color));
}
.card__header img {
  max-width: 100%;
  display: block;
  object-fit: cover;
}
.card__body {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
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
  padding: 0.25em 0.75em;
  border-radius: 1em;
  font-size: 0.75rem;
}
.tag-blue {
  background: linear-gradient(to bottom, #2f80ed, #56ccf2);
  color: #fafafa;
}
.tag-brown {
  background: linear-gradient(to bottom, #ffd194, #d1913c);
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
  gap: 0.5rem;
}
.user__info small {
  color: #666;
}
</style>
