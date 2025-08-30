<template>
  <el-container class="creamy-bg">
    <el-main class="main-content">
      <el-card class="creamy-card article-card">
        <el-button text class="back-button" @click="$router.go(-1)">
          <el-icon><ArrowLeftBold /></el-icon>返回
        </el-button>
        <div v-if="article">
          <h1>{{ article.title }}</h1>
          <div class="meta-info">
            <span class="date">{{ article.date }}</span>
          </div>
          <el-divider></el-divider>
          <div class="article-content">
            <p>{{ article.content }}</p>
            <div v-for="(image, index) in article.images" :key="index" class="article-image-container">
              <img :src="image.url" :alt="image.name" class="article-image" />
            </div>
          </div>
        </div>
        <div v-else>
          <el-empty description="文章不存在或已删除"></el-empty>
        </div>
      </el-card>
    </el-main>
  </el-container>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { ArrowLeftBold } from '@element-plus/icons';

const route = useRoute();
const store = useStore();

const article = computed(() => {
  const articleId = parseInt(route.params.id);
  return store.state.notes.find(note => note.id === articleId);
});
</script>

<style scoped>
.creamy-bg {
  background-color: transparent;
  min-height: 100vh;
}
.header {
  padding: 0;
}
.creamy-menu {
  background-color: transparent;
  border-bottom: none;
}
.creamy-menu .el-menu-item {
  color: #6d5b4f;
  font-weight: bold;
}
.creamy-menu .el-menu-item:hover,
.creamy-menu .el-menu-item.is-active {
  background-color: #f7e9d7;
  color: #d19777;
}
.main-content {
  padding: 40px;
}
.article-card {
  padding: 20px;
}
.article-content {
  line-height: 1.8;
  color: #555;
  white-space: pre-wrap;
}
.back-button {
  margin-bottom: 20px;
}
.meta-info {
  margin-top: -10px;
  color: #999;
  font-size: 14px;
}

.article-image-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.article-image {
  max-width: 40%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
