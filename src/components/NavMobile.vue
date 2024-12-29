<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const emits = defineEmits(['closeSlidebar'])
const menuItems = [
  {
    title: "Trang chủ",
    icon: "bx bx-home-alt-2",
    link: "/",
  },
  {
    title: "Bài viết của bạn",
    icon: "bx bx-windows",
    link: "/manage",
  },
  {
    title: "Trợ giúp",
    icon: "bx bx-help-circle",
    link: "/help",
  },
  {
    title: "Cài đặt",
    icon: "bx bx-cog",
    link: "/setting",
  },
  {
    title: "Thoát",
    icon: "bx bx-exit",
    action: "logout", 
  },
];
const handleMenuAction = (item) => {
  if (item.action === "logout") {
    localStorage.removeItem("user");
    router.push("/login");
  } };
  const closeSlidebar =()=>{
  emits('closeSlidebar')
}
</script>

<template>
  <div class="navigation_Mobile">
    <div class="close-btn" @click="closeSlidebar">
      <i class="bx bx-x"></i>
    </div>
    <a href="/" class="logo-link">
      <img src="../assets/images/logoSucodev.png" alt="Logo" />
    </a>
    <ul>
      <li v-for="(item, index) in menuItems" :key="index">
        <a
          v-if="item.link"
          :href="item.link"
          class="nav-link"
          @click="handleMenuAction(item)"
        >
          <span class="icon">
            <i :class="item.icon"></i>
          </span>
          <span class="title">{{ item.title }}</span>
        </a>
        <a
          v-else
          href="#"
          class="nav-link"
          @click="handleMenuAction(item)"
        >
          <span class="icon">
            <i :class="item.icon"></i>
          </span>
          <span class="title">{{ item.title }}</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<style scoped>
:root {
  --blue: #007bff; /* Thay đổi màu sắc nếu cần */
  --white: #ffffff;
}

.navigation_Mobile {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--blue);
  z-index: 1000;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  transition: transform 0.3s ease-in-out;
  transform: translateX(0); /* Thay đổi thành -100% để ẩn menu nếu cần */
}

.navigation_Mobile.hidden {
  transform: translateX(-100%); /* Thêm class này khi cần ẩn menu */
}

.navigation_Mobile .close-btn {
  align-self: flex-end;
  margin-right: 20px;
  font-size: 2rem;
  cursor: pointer;
  color: var(--white);
}

.navigation_Mobile .logo-link {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.navigation_Mobile .logo-link img {
  width: 50%;
  max-width: 150px;
  margin: 10px auto;
  display: block;
  border-radius: 0 0 50px 50px;
  background-color: var(--white);
}

.navigation_Mobile ul {
  list-style: none;
  padding: 0;
  margin: 20px 0;
  width: 100%;
}

.navigation_Mobile ul li {
  width: 100%;
  text-align: center;
  margin-bottom: 10px;
  transition: background 0.3s ease;
}

.navigation_Mobile ul li:hover {
  background-color: var(--white);
}

.navigation_Mobile ul li .nav-link {
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: var(--white);
  font-size: 1.2rem;
  font-weight: 500;
  padding: 10px 20px;
  transition: color 0.3s ease;
}

.navigation_Mobile ul li:hover .nav-link {
  color: var(--blue);
}

.navigation_Mobile ul li .nav-link .icon {
  margin-right: 10px;
  font-size: 1.5rem;
}

.navigation_Mobile ul li .nav-link .icon i {
  color: var(--white);
  transition: color 0.3s ease;
}

.navigation_Mobile ul li:hover .nav-link .icon i {
  color: var(--blue);
}

.navigation_Mobile ul li .nav-link .title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
@media screen and (max-width: 768px) {
  .navigation_Mobile ul li .nav-link {
    font-size: 1rem;
    padding: 8px 15px;
  }

  .navigation_Mobile ul li .nav-link .icon {
    margin-right: 5px;
    font-size: 1.3rem;
  }
}
</style>
