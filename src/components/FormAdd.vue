<script setup>
import { ref } from 'vue';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';

const router = useRouter();
const form = ref({
  title: '',
  content: '',
  category: '',
  views: 0,
  image: 'logoSucodev.png',
});

const userID = JSON.parse(localStorage.getItem('user'))?.id || null;
const createdAt = Math.floor(Date.now() / 1000);

const submitForm = async () => {
  if (!userID) {
    Swal.fire('Error', 'Không tìm thấy thông tin người dùng.', 'error');
    return;
  }

  const newPost = {
    createdAt,
    userID,
    title: form.value.title,
    content: form.value.content,
    image: form.value.image,
    views: form.value.views,
    tags: form.value.category,
    postID: Math.random().toString(36).substr(2, 9), 
  };

  try {
    const response = await fetch('https://67691fe4cbf3d7cefd39ab5a.mockapi.io/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPost),
    });

    if (!response.ok) {
      throw new Error('Failed to add post');
    }
    await Swal.fire('Thành công', 'Bài viết đã được thêm mới!', 'success');
    router.push('/manage');
  } catch (error) {
    console.error(error);
    Swal.fire('Error', 'Có lỗi xảy ra khi thêm bài viết.', 'error');
  }
};
</script>


<template>
  <div class="form-Main">
    <form @submit.prevent="submitForm">
      <div class="group">
        <input type="text" v-model="form.title" required>
        <span class="highlight"></span>
        <span class="bar"></span>
        <label>Tiêu đề</label>
      </div>
      <div class="group">
        <textarea v-model="form.content" required></textarea>
        <span class="highlight"></span>
        <span class="bar"></span>
        <label>Nội dung</label>
      </div>
      <div class="group">
        <select v-model="form.category" required>
          <option value="" disabled hidden>Chọn loại bài viết</option>
          <option value="Tin công nghệ">Tin công nghệ</option>
          <option value="Hội thảo">Hội thảo</option>
          <option value="Kiến thức IT">Kiến thức IT</option>
        </select>
        <span class="highlight"></span>
        <span class="bar"></span>
      </div>
      <div class="group">
        <input type="hidden" v-model="form.views" readonly>
        <span class="highlight"></span>
        <span class="bar"></span>
        <label> 0</label>
      </div>
      <div class="group">
        <input type="text" v-model="form.image" readonly>
        <span class="highlight"></span>
        <span class="bar"></span>
      </div>
      <button type="submit" class="submit-button">Lưu bài viết</button>
    </form>
  </div>
</template>


<style scoped>
* {
  box-sizing: border-box;
}

.form-Main {
  font-family: 'Roboto';
  width: 600px;
  margin: 30px auto;
  display: block;
  background: #FFF;
  padding: 20px 50px 50px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.group {
  position: relative;
  margin-bottom: 45px;
}

input,
textarea,
select {
  font-size: 18px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 100%;
  border: none;
  border-bottom: 1px solid #757575;
}

input:focus,
textarea:focus,
select:focus {
  outline: none;
}

select {
  appearance: none;
  background-color: transparent;
  cursor: pointer;
}

label {
  color: #999;
  font-size: 18px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 10px;
  transition: 0.2s ease all;
}
input:focus ~ label,
input:valid ~ label,
textarea:focus ~ label,
textarea:valid ~ label,
select:focus ~ label,
select:valid ~ label {
  top: -20px;
  font-size: 14px;
  color: #5264AE;
}

.bar {
  position: relative;
  display: block;
  width: 100%;
}
.bar:before,
.bar:after {
  content: '';
  height: 2px;
  width: 0;
  bottom: 1px;
  position: absolute;
  background: #5264AE;
  transition: 0.2s ease all;
}
.bar:before {
  left: 50%;
}
.bar:after {
  right: 50%;
}
input:focus ~ .bar:before,
input:focus ~ .bar:after,
textarea:focus ~ .bar:before,
textarea:focus ~ .bar:after,
select:focus ~ .bar:before,
select:focus ~ .bar:after {
  width: 50%;
}
.highlight {
  position: absolute;
  height: 60%;
  width: 100px;
  top: 25%;
  left: 0;
  pointer-events: none;
  opacity: 0.5;
}

input:focus ~ .highlight,
textarea:focus ~ .highlight,
select:focus ~ .highlight {
  animation: inputHighlighter 0.3s ease;
}

@keyframes inputHighlighter {
  from {
    background: #5264AE;
  }
  to {
    width: 0;
    background: transparent;
  }
}
.submit-button {
  font-size: 18px;
  padding: 10px 20px;
  background: #5264AE;
  color: #FFF;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.submit-button:hover {
  background: #415a99;
}
@media screen and (max-width: 1024px) {
  .form-Main {
    width: 80%;
    padding: 20px 30px;
  }

  input,
  textarea,
  select {
    font-size: 16px;
  }

  label {
    font-size: 16px;
  }

  .submit-button {
    font-size: 16px;
    padding: 8px 16px;
  }
}

@media screen and (max-width: 768px) {
  .form-Main {
    width: 90%;
    padding: 15px 25px;
  }

  input,
  textarea,
  select {
    font-size: 14px;
  }

  label {
    font-size: 14px;
  }

  .submit-button {
    font-size: 14px;
    padding: 8px 12px;
  }
}

@media screen and (max-width: 576px) {
  .form-Main {
    width: 95%;
    padding: 10px 20px;
  }

  input,
  textarea,
  select {
    font-size: 12px;
    padding: 8px 8px 8px 5px;
  }

  label {
    font-size: 12px;
  }

  .submit-button {
    font-size: 12px;
    padding: 6px 10px;
  }
}

@media screen and (max-width: 400px) {
  .form-Main {
    width: 100%;
    padding: 10px 15px;
  }

  input,
  textarea,
  select {
    font-size: 11px;
    padding: 6px 6px 6px 5px;
  }

  label {
    font-size: 11px;
  }

  .submit-button {
    font-size: 11px;
    padding: 5px 8px;
  }
}
</style>
