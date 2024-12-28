<script setup>
import { useRouter } from 'vue-router';
defineProps({
  isSidebarVisible: Boolean,
  default:true,
});
const router = useRouter();

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
</script>

<template>
  <div :class="{ navigation: true, active: !isSidebarVisible }" v-show="isSidebarVisible">
    <div class="close-btn" @click="$emit('close-sidebar')">
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
.navigation {
  position: fixed;
  width: 300px;
  height: 100%;
  background: var(--blue);
  border-left: 10px solid var(--blue);
  transition: 0.5s;
  overflow: hidden;
  border-radius: 0px 10px 10px 0px;
  overflow: auto;
}
.navigation.active {
  width: 80px;
}

.navigation ul {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.navigation ul li {
  position: relative;
  width: 100%;
  top:200px;
  list-style: none;
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
}

.navigation ul li:hover,
.navigation ul li.hovered {
  background-color: var(--white);
}

.navigation .logo-link {
  width: 100%;
  pointer-events: none;
}
.logo-link img{
  width: 80%;
  background-color: white;
  border-radius: 0px 0px 50px 50px;
  margin-left: 10px;
}

.navigation ul li .nav-link {
  position: relative;
  display: block;
  width: 100%;
  display: flex;
  text-decoration: none;
  color: var(--white);
}
.navigation ul li:hover .nav-link,
.navigation ul li.hovered .nav-link
 {
  color: var(--blue);
}

.navigation ul li .nav-link .icon {
  position: relative;
  display: block;
  min-width: 60px;
  height: 60px;
  line-height: 75px;
  text-align: center;
}
.navigation ul li .nav-link .icon i {
  font-size: 1.75rem;
  color: var(--white);
}
.navigation ul li:hover .nav-link .icon i,
.navigation ul li.hovered .nav-link .icon i {
  color: var(--blue);
}
.navigation ul li .nav-link .title {
  position: relative;
  display: block;
  padding: 0 10px;
  height: 60px;
  line-height: 60px;
  text-align: start;
  white-space: nowrap;
}

.navigation ul li:hover .nav-link::before,
.navigation ul li.hovered .nav-link::before {
  content: "";
  position: absolute;
  right: 0;
  top: -50px;
  width: 50px;
  height: 50px;
  background-color: transparent;
  border-radius: 50%;
  box-shadow: 35px 35px 0 10px var(--white);
  pointer-events: none;
}
.navigation ul li:hover .nav-link::after,
.navigation ul li.hovered .nav-link::after {
  content: "";
  position: absolute;
  right: 0;
  bottom: -50px;
  width: 50px;
  height: 50px;
  background-color: transparent;
  border-radius: 50%;
  box-shadow: 35px -35px 0 10px var(--white);
  pointer-events: none;
}
.close-btn{display: none;}
@media screen and (max-width:1024px){
  .navigation {
    display: block; 
    width: 100%;
    z-index: 1;
    border-radius: 0;
    border-left: none;
    border-right: none;
    border-top: 10px solid var(--blue);
    border-bottom: 10px solid var(--blue);
  }

  .navigation ul {
    position: relative;
    width: 100%;
    top: 0;
    
  }
  .navigation ul li {
    width: 100%;
    top: 0;
    border-radius: 0;
    margin-bottom: 3%;
  }
  .navigation ul li .nav-link {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
  }
  .navigation ul li .nav-link .icon {
    min-width: 50px;
    height: 60px;
    line-height: 60px;
    text-align: center;
  }
  .navigation ul li .nav-link .title {
    padding: 0px 20px;
    height: 60px;
    line-height: 60px;
    text-align:center;
    white-space: normal;
  }

  .logo-link img{
    width: 50%; 
    margin-bottom: 20px;
    margin-left: 25%; 
  }
  .close-btn {
  display: block;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 1.5rem;
  color: var(--white);
  background-color: transparent;
  border: none;
  outline: none;
}
}
</style>
