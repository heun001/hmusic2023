<template>
  <div>
    <div class="">
      <nuxtLink to="/auth/signin" v-if="!useAuth.isUserLoggedIn" class="btn btn-primary btn-outline mb-1">
        đăng nhập
      </nuxtLink>
      <div v-if="useAuth.isUserLoggedIn" class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost btn-circle avatar">
          <img class="w-12 h-12 rounded-full" src="~/assets/images/meo.jpg" />
        </label>

        <ul tabindex="0" class="mt-3 border-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
          <div class="bg-gradient-to-l from-green-400/10 via-cyan-400/10 to-blue-400/10 p-2 rounded-box">
            <div class="avatar">
              <div class="w-12 h-12 rounded-full">
                <img src="~/assets/images/meo.jpg" />
              </div>
              <p class="mt-3 px-2">{{ useUser.user.name }}</p>
            </div>
            <li></li>

            <li @click="usePlay.isBgImage = !usePlay.isBgImage" class="hover-bordered">
              <a>
                <OtherVIcon icon="fa-solid fa-panorama" />
                <div v-if="usePlay.isBgImage">Tắt hình nền</div>
                <div v-else>Bật hình nền</div>
              </a>
            </li>

            <li class="hover-bordered" v-for="i in dataAvatarcComputed" :key="i">
              <NuxtLink v-if="i.name != 'Đăng xuất'" :to="i.url">
                <OtherVIcon :icon="i.icon"></OtherVIcon>
                {{ i.name }}
              </NuxtLink>
              <NuxtLink @click="logout()" v-if="i.name == 'Đăng xuất'" :to="i.url">
                <OtherVIcon :icon="i.icon"></OtherVIcon>
                {{ i.name }}
              </NuxtLink>
            </li>
          </div>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { authStore } from "~~/stores/auth.store";
import { playStore } from "~~/stores/play.store";
import { userStore } from "~~/stores/user.store";

const useAuth = authStore();
const useUser = userStore();
const usePlay = playStore();
const dataAvatar = [
  {
    name: "Trang cá nhân",
    url: "/dashboard",
    icon: "fa-solid fa-address-card",
  },

  {
    name: "Yêu thích",
    url: "/favourite",
    icon: "fa-solid fa-heart",
  },
  {
    name: "Đăng xuất",
    url: "/auth/signin",
    icon: "fa-solid fa-right-from-bracket",
  },
];

const dataAvatarcComputed = computed(() => {
  let list = [];
  if (useUser.isAdmin) {
    const admin = {
      name: "Admin",
      url: "/admin/music",
      icon: "fa-solid fa-bars-progress",
    };
    list = [admin, ...dataAvatar];
  } else {
    list = [...dataAvatar];
  }
  return list;
});

function logout() {
  useAuth.logout();
}

async function getApi() {
  useAuth.loadAuthState();
  try {
    if (useAuth.user) {
      await useUser.findOne(useAuth.user.id);
    }
  } catch (error) {
    console.log(error);
  }
}

onMounted(() => {
  getApi();
});
</script>

<style></style>
