<script setup>
import { ref } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';

const router = useRouter(); 
const apiURL = 'https://67691fe4cbf3d7cefd39ab5a.mockapi.io/api/users';
const userName = ref('');

const loginUser = async () => {
  if (!userName.value.trim()) {
    Swal.fire({
      title: "Lỗi!",
      text: "Vui lòng nhập tên của bạn!",
      icon: "error",
      confirmButtonText: "Đồng ý",
    });
    return;
  }

  try {
    const { data: users } = await axios.get(apiURL);
    const existingUser = users.find((user) => user.name === userName.value.trim());

    if (!existingUser) {
      Swal.fire({
        title: "Tên không tồn tại!",
        text: "Vui lòng nhập lại tên hoặc đăng ký tên mới.",
        icon: "warning",
        confirmButtonText: "Đồng ý",
      });
      return;
    }
    Swal.fire({
      title: "Đăng nhập thành công!",
      text: `Chào mừng, ${existingUser.name}!`,
      icon: "success",
      confirmButtonText: "OK",
    }).then(() => {
      localStorage.setItem('user', JSON.stringify(existingUser));
      router.push('/');
    });
    userName.value = '';
  } catch (error) {
    console.error('Lỗi khi đăng nhập:', error);
    Swal.fire({
      title: "Thất bại!",
      text: "Đăng nhập thất bại. Vui lòng thử lại!",
      icon: "error",
      confirmButtonText: "Đồng ý",
    });
  }
};
</script>

<template>
  <div class="form">
    <div class="container">
      <div class="brand-logo"></div>
      <div class="brand-title">Xin chào!</div>
      <div class="inputs">
        <input
          type="text"
          placeholder="Nhập tên của bạn"
          v-model="userName"
        />
        <button type="button" @click="loginUser">Truy cập</button>
        <a href="/register">Đăng ký tên mới</a>
      </div>
    </div>
  </div>
</template>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;900&display=swap');
.form{
    display:flex;
    justify-content:center;
    align-items:center; 
    height: 100vh;
  
}
.container {
  position: relative;
  width: 350px;
  height: 500px;
  border-radius: 20px;
  padding: 40px;
  box-sizing: border-box;
  background: #ecf0f3;
  box-shadow: 14px 14px 20px #cbced1, -14px -14px 20px white;
}

.brand-logo {
  height: 100px;
  width: 100px;
  background: url("../assets/images/logoSucodev.png");
  background-size:cover;
  background-position-x: 120px;
  margin: auto;
  border-radius: 50%;
  box-sizing: border-box;
  box-shadow: 7px 7px 10px #cbced1, -7px -7px 10px white;
}

.brand-title {
  text-align: center;
  margin-top: 10px;
  font-weight: 900;
  font-size: 1.8rem;
  color: #187528;
  letter-spacing: 1px;
}

.inputs {
  text-align: left;
  margin-top: 30px;
}

label, input, button, a {
  display: block;
  width: 100%;
  padding: 0;
  border: none;
  outline: none;
  box-sizing: border-box;
}

label {
  margin-bottom: 4px;
}

label:nth-of-type(2) {
  margin-top: 12px;
}

input::placeholder {
  color: gray;
}

input {
  background: #ecf0f3;
  padding: 10px;
  padding-left: 20px;
  height: 50px;
  font-size: 14px;
  border-radius: 50px;
  box-shadow: inset 6px 6px 6px #cbced1, inset -6px -6px 6px white;
}

button,a {

	position: relative;
    top:30px;
	background-color: #187528;
	border: 0;
	color: var(--white);
	border-radius: 0.5em;
	font-size: 1rem;
	padding: 0.375em 1em;
	font-weight: 600;
	text-shadow: 0 0.0625em 0 #fff;
	box-shadow: inset 0 0.0625em 0 0 #f4f4f4, 0 0.0625em 0 0 #efefef,
		0 0.125em 0 0 #ececec, 0 0.25em 0 0 #e0e0e0, 0 0.3125em 0 0 #dedede,
		0 0.375em 0 0 #dcdcdc, 0 0.425em 0 0 #cacaca, 0 0.425em 0.5em 0 #cecece;
	transition: 0.25s ease;
	cursor: pointer;
	touch-action: manipulation;
	-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
	cursor: pointer;
	&:active,
	&:hover {
		transform: translateY(0.225em);
		box-shadow: inset 0 0.03em 0 0 #f4f4f4, 0 0.03em 0 0 #efefef,
			0 0.0625em 0 0 #ececec, 0 0.125em 0 0 #e0e0e0, 0 0.125em 0 0 #dedede,
			0 0.2em 0 0 #dcdcdc, 0 0.225em 0 0 #cacaca, 0 0.225em 0.375em 0 #cecece;

		&:after {
			height: calc(100% + 0.225em);
		}
	}

	&:after {
		position: absolute;
		content: "";
		display: block;
		width: 100%;
		height: calc(100% + 0.375em);
		top: 0;
		left: 0;
		background-color: transparent;
		transition: height 0.25s ease;
	}
}


button:hover {
  box-shadow: none;
}
a{
  display: flex;
  text-decoration: none;
  justify-content: center;
  align-items: center;
  color: white;
  margin-top: 20px;
  background: #187528;
  
}
</style>