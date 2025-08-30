<template>
  <el-main class="main">
    <el-row :gutter="20">
      <el-col :span="23">
        <el-card class="creamy-card welcome-card animated-fade-in">
          <el-row>
            <el-col :span="6">
              <el-avatar :size="180" :src="user.avatarUrl"></el-avatar>
            </el-col>
            <el-col :span="18" class="welcome-text">
              <h2>欢迎来到{{ user.name }}的学习空间</h2>
              <p>{{ user.bio }}</p>
            </el-col>
          </el-row>
        </el-card>
      </el-col>  

      <el-col :span="17"> 
        <el-card class="creamy-card section-card animated-fade-in">
          <template #header>
            <div class="card-header">
              <span>最新文章</span>
            </div>
          </template>
          <el-row :gutter="20">
            <el-col
              :span="12"
              v-for="note in notes.slice(0, 2)"
              :key="note.id"
              class="article-col"
            >
              <el-card class="article-card" shadow="hover">
                <router-link :to="`/article/${note.id}`" class="article-link">
                  <div class="article-content">
                    <h4 class="article-title">{{ note.title }}</h4>
                    <p class="article-summary">{{ note.summary }}</p>
                  </div>
                  <div class="article-date">
                    <span>{{ note.date }}</span>
                  </div>
                </router-link>
              </el-card>
            </el-col>
          </el-row>
        </el-card>

        <el-card class="creamy-card section-card animated-fade-in">
          <template #header>
            <div class="card-header">
              <span>精选照片</span>
            </div>
          </template>
          <el-row :gutter="20">
            <el-col
              :span="6"
              v-for="photo in photos.slice(0, 4)"
              :key="photo.id"
              class="photo-col"
            >
              <el-image
                :src="photo.url"
                fit="cover"
                class="photo-item"
              ></el-image>
            </el-col>
          </el-row>
        </el-card>
      </el-col>

      
        <el-card class="creamy-card animated-fade-in" style="margin-top: 20px;">
          <template #header>
            <div class="card-header">
              <span>最新动态</span>
            </div>
          </template>
          <ul class="latest-moments">
            <li v-for="moment in lifeMoments" :key="moment.id" class="moment-item">
              <span class="moment-date">{{ moment.date }}</span>
              <p class="moment-text">{{ moment.text }}</p>
            </li>
          </ul>
        </el-card>
      
     
    </el-row>
  </el-main>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const user = computed(() => store.state.user);
const notes = computed(() => store.state.notes);
const photos = computed(() => store.state.photos);
const lifeMoments = computed(() => store.state.lifeMoments);

</script>

<style scoped>
.main {
  padding: 20px;
}
.creamy-card {
  background-color: rgba(247, 243, 233, 0.7);
  border: 10px solid #e0d8c9;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
  margin-left: 10px;
}
.creamy-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
}
.welcome-card {
  margin-bottom: 20px;
  padding: 10px;
}
.welcome-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 20px;
  width: 400px;
}
.welcome-text h2 {
  font-size: 2rem;
  font-weight: bold;
  color: #6d5b4f;
  margin-bottom: 10px;
}
.welcome-text p {
  font-size: 1rem;
  color: #8c786a;
}
.section-card {
  margin-top: 20px;
}
.card-header {
  font-size: 1.5rem;
  font-weight: bold;
  color: #6d5b4f;
  padding: 10px 0;
  border-bottom: 2px solid #d19777;
  position: relative;
  display: flex;
  align-items: center;
}
.card-header::before {
  content: '';
  width: 8px;
  height: 24px;
  background-color: #d19777;
  margin-right: 10px;
  border-radius: 4px;
}
.article-col {
  margin-bottom: 20px;
}
.article-card {
  background-color: #ffffff;
  border: 1px solid #e0d8c9;
  border-radius: 10px;
  height: 100%;
}
.article-link {
  text-decoration: none;
  color: inherit;
  display: block;
}
.article-content {
  margin-bottom: 10px;
}
.article-title {
  font-size: 1.2rem;
  font-weight: bold;
  color: #6d5b4f;
  margin-bottom: 5px;
}
.article-summary {
  font-size: 0.9rem;
  color: #8c786a;
}
.article-date {
  text-align: right;
  font-size: 0.8rem;
  color: #b0a194;
}
.photo-col {
  margin-bottom: 10px;
}
.photo-item {
  width: 100%;
  height: 120px;
  border-radius: 8px;
  object-fit: cover;
  transition: transform 0.3s ease;
}
.photo-item:hover {
  transform: scale(1.05);
}

.latest-moments {
  list-style: none;
  padding: 0;
  margin: 0;
}
.moment-item {
  border-left: 3px solid #d19777;
  padding-left: 15px;
  margin-bottom: 15px;
}
.moment-date {
  font-size: 0.8rem;
  color: #b0a194;
}
.moment-text {
  font-size: 1rem;
  color: #6d5b4f;
  margin-top: 5px;
  line-height: 1.5;
}
</style>
