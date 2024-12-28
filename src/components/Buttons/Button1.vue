<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const handleClick = () => {
  router.push('/addPost');
}
</script>
<template>
<button @click="handleClick">Thêm bài viết mới</button>
</template>
<style scoped>

button {
	position: relative;
	background-color: var(--blue);
	border: 0;
	width: 180px;
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
	cursor:pointer;
	touch-action: manipulation;
	-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
	cursor:pointer;

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
@media screen and (max-width:1160px) {
 
}
@media screen and (max-width:1024px) {
 
}
@media screen and (max-width:650px) {
  button {
    width: 150px;
    font-size: 0.9rem;
    padding: 0.25em 0.5em;
  }
}
@media screen and (max-width:525px) {
	button {
    width: 20%;
    font-size: 0.8rem;
    padding: 0.25em 0.5em;
  }
}
@media screen and (max-width:486px) {

}
@media screen and (max-width:400px){
  
}
</style>