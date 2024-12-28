<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import Sidebar from '../components/Sidebar.vue';
import Header from '../components/Header.vue';
const isSidebarVisible = ref(true);

const toggleSidebar = () => {
  isSidebarVisible.value = !isSidebarVisible.value;
};

const closeSidebar = () => {
  isSidebarVisible.value = false;
};
import ButtonDetails from '../components/Buttons/ButtonDetails.vue';
import FormUpdate from '../components/FormUpdate.vue';

const posts = ref([]);
const users = ref([]); 
const isEditing = ref(false);
const editingPost = ref(null);
const apiPosts = 'https://67691fe4cbf3d7cefd39ab5a.mockapi.io/api/posts';
const apiUsers = 'https://67691fe4cbf3d7cefd39ab5a.mockapi.io/api/users'; 
const accountName = ref('');
const fetchPosts = async () => {
  const userData = localStorage.getItem('user');
  
  if (userData) {
    const user = JSON.parse(userData);
    accountName.value = user.name;  

    try {
      const usersResponse = await axios.get(apiUsers);
      users.value = usersResponse.data;
      const response = await axios.get(apiPosts);
      const filteredPosts = response.data.filter(post => post.userID === user.id);
      posts.value = filteredPosts.map(post => {
        const user = users.value.find(user => user.id === post.userID);
        return { ...post, username: user ? user.name : 'Unknown' };
      });
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  } else {
    console.log('No user data found in localStorage');
  }
};

const editPost = (post) => {
  isEditing.value = true;
  editingPost.value = { ...post };
};

const closeEditForm = () => {
  isEditing.value = false;
  editingPost.value = null;
};

const saveEditedPost = async (updatedPost) => {
  try {
    const response = await axios.put(`${apiPosts}/${updatedPost.postID}`, updatedPost);
    const index = posts.value.findIndex((post) => post.postID === updatedPost.postID);
    if (index !== -1) {
      posts.value[index] = response.data;
    }
    Swal.fire('Thành công', 'Bài viết đã được cập nhật', 'success');
    closeEditForm();
  } catch (error) {
    console.error('Error updating post:', error);
    Swal.fire('Lỗi', 'Không thể cập nhật bài viết', 'error');
  }
};

const deletePost = async (postID) => {
  try {
    await axios.delete(`${apiPosts}/${postID}`);
    posts.value = posts.value.filter((post) => post.postID !== postID);
    Swal.fire('Thành công', 'Bài viết đã được xóa', 'success');
  } catch (error) {
    console.error('Error deleting post:', error);
    Swal.fire('Lỗi', 'Không thể xóa bài viết', 'error');
  }
};

onMounted(() => {
  fetchPosts();
});
</script>

<template>
  <div class="container">
    <Sidebar :isSidebarVisible="isSidebarVisible" @close-sidebar="closeSidebar" />
    <div class="main">
      <Header @toggle-sidebar="toggleSidebar" />
      <div class="intro">
        <h2>Bài viết của bạn</h2>
      </div>
      <div class="content">
        <div v-if="posts.length === 0" class="no-posts">
          <p>Không có bài viết nào được tìm thấy.</p>
        </div>
        <div v-for="post in posts" :key="post.postID" class="card">
          <div class="card__header">
            <img :src="`../src/assets/images/${post.image}`" alt="card__image" class="card__image" />
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
            <div class="actions">
              <div class="user">
              <div class="user__info">
                <h5>Người đăng: {{ post.username }}</h5>
                <small>{{ new Date(post.createdAt * 1000).toLocaleString() }}</small>
              </div>
            </div>
              <ButtonDetails :postID="post.postID" class="btn btn-details" />
              <button class="btn btn-edit" @click="editPost(post)">Sửa</button>
              <button class="btn btn-delete" @click="deletePost(post.postID)">Xóa</button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="isEditing" class="overlay" @click="closeEditForm"></div>
      <FormUpdate 
        v-if="isEditing" 
        :editingPost="editingPost" 
        :onSave="saveEditedPost" 
        :onCancel="closeEditForm" 
        class="FormUpdate"
      />
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
.content {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 100%;
  margin-block: 2rem;
  gap: 2rem;
}
.no-posts {
  text-align: center;
  font-size: 1.2rem;
  color: var(--black1);
}
.card {
  display: flex;
  flex-direction: column;
  width: clamp(20rem, calc(20rem + 2vw), 22rem);
  overflow: hidden;
  box-shadow: 0 .1rem 1rem rgba(0, 0, 0, 0.1);
  border-radius: 1em;
  background: linear-gradient(to right, #FFFFFF, var(--secondary-color));
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

.actions {
  margin-left: auto;
  display: flex;
  gap: 0.5rem;
}
.btn {
  padding: 0.25rem 0.25rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}
.btn-details{
  width: 60px;
  border:1px solid var(--blue);
  color:var(--blue);
}
.btn-edit {
  background: var(--blue);
  color: white;
}
.btn-edit:hover {
  background: var(--blue);
}
.btn-delete {
  background: #F44336;
  color: white;
}
.btn-delete:hover {
  background: #e53935;
}
.FormUpdate {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  background-color: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: clamp(300px, 50%, 600px);
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}
.overlay, .FormUpdate {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
