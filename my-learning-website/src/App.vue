<template>
  <el-container class="creamy-bg">
    <el-header class="header">
      <el-row type="flex" justify="space-between" align="middle" class="header-row">
        <el-col :span="6" class="header-left">
          <router-link to="/" class="avatar-link">
            <el-avatar :size="50" :src="user.avatarUrl" class="animated-avatar"></el-avatar>
          </router-link>
          <span class="site-name">我的博客</span>
        </el-col>
        <el-col :span="12">
          <el-menu mode="horizontal" :router="true" class="creamy-menu">
            <el-menu-item index="/">首页</el-menu-item>
            <el-menu-item index="/notes">笔记</el-menu-item>
            <el-menu-item index="/photo-album">相册</el-menu-item>
            <el-menu-item index="/life">生活</el-menu-item>
            <el-menu-item index="/about">关于我</el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="6" class="header-right">
          <el-button text @click="searchDialogVisible = true">
            <el-icon :size="20"><Search /></el-icon>
          </el-button>
          <el-button text @click="alarmDialogVisible = true">
            <el-icon :size="20"><AlarmClock /></el-icon>
          </el-button>
        </el-col>
      </el-row>
    </el-header>

    <router-view />
  </el-container>

  <el-dialog v-model="searchDialogVisible" title="搜索文章" width="50%">
    <el-input
      v-model="searchKeyword"
      placeholder="输入关键词"
      clearable
      :prefix-icon="Search"
    />
    <template #footer>
      <el-button @click="searchDialogVisible = false">取消</el-button>
      <el-button type="primary" @click="performSearch">搜索</el-button>
    </template>
  </el-dialog>

  <el-dialog v-model="alarmDialogVisible" title="设置闹钟" width="30%">
    <el-time-picker
      v-model="alarmTime"
      placeholder="选择时间"
      style="width: 100%;"
    />
    <template #footer>
      <el-button @click="alarmDialogVisible = false">取消</el-button>
      <el-button type="primary" @click="setAlarm">设置</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { computed, ref, watch, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { Search, AlarmClock } from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import bg from './assets/bg.jpg';

const store = useStore();
const router = useRouter();

const user = computed(() => store.state.user);
const notes = computed(() => store.state.notes);

const searchDialogVisible = ref(false);
const searchKeyword = ref('');
const alarmDialogVisible = ref(false);
const alarmTime = ref(null);
let alarmTimer = null;

const performSearch = () => {
  const keyword = searchKeyword.value.toLowerCase();
  if (keyword) {
    const results = notes.value.filter(note =>
      note.title.toLowerCase().includes(keyword) ||
      note.content.toLowerCase().includes(keyword)
    );
    if (results.length > 0) {
      const resultString = results.map(note => `- ${note.title}`).join('\n');
      ElMessageBox.alert(`找到以下文章：\n${resultString}`, '搜索结果', {
        confirmButtonText: '确定',
      });
    } else {
      ElMessageBox.alert('没有找到相关的文章。', '搜索结果', {
        confirmButtonText: '确定',
      });
    }
  } else {
    ElMessage.info('请输入关键词进行搜索。');
  }
  searchDialogVisible.value = false;
};

const setAlarm = () => {
  if (!alarmTime.value) {
    ElMessage.warning('请选择一个时间！');
    return;
  }
  
  if (alarmTimer) {
    clearTimeout(alarmTimer);
  }

  const now = new Date();
  const targetTime = new Date();
  targetTime.setHours(alarmTime.value.getHours(), alarmTime.value.getMinutes(), 0, 0);

  let timeUntilAlarm = targetTime.getTime() - now.getTime();
  if (timeUntilAlarm < 0) {
    timeUntilAlarm += 24 * 60 * 60 * 1000; 
  }

  alarmTimer = setTimeout(() => {
    ElMessageBox.alert('闹钟响了！！', '闹钟', {
      confirmButtonText: '确定',
    }).then(() => {
      
      clearTimeout(alarmTimer);
      alarmTimer = null;
    });
  }, timeUntilAlarm);

  ElMessage.success('闹钟设置成功！');
  alarmDialogVisible.value = false;
};

onMounted(() => {
  document.body.style.backgroundImage = `url(${bg})`;
  document.body.style.backgroundSize = 'cover';
  document.body.style.backgroundAttachment = 'fixed';
  document.body.style.backgroundPosition = 'center center';
  document.body.style.opacity = '0.9';
  document.body.style.margin = '0';
  document.body.style.fontFamily = 'Inter, sans-serif';
  document.body.style.transition = 'background-color 0.5s ease';
});
</script>

<style scoped>
.creamy-bg {
  min-height: 100vh;
}
.header {
  padding: 0 20px;
  background-color: rgba(247, 243, 233, 0.9);
  border-bottom: 1px solid #e0d8c9;
  position: sticky;
  top: 0;
  z-index: 100;
  border-radius: 0 0 10px 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}
.header-row {
  height: 60px;
}
.header-left {
  display: flex;
  align-items: center;
}
.avatar-link {
  display: flex;
  align-items: center;
}
.animated-avatar {
  transition: transform 0.3s ease;
}
.animated-avatar:hover {
  transform: scale(1.1);
}
.site-name {
  margin-left: 10px;
  font-size: 30px;
  font-weight: bold;
  color: #9e4c15;
}
.header-right {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.creamy-menu {
  background-color: transparent;
  border-bottom: none;
}
.creamy-menu .el-menu-item {
  color: #9e4c15;
  font-weight: bold;
  font-size: 20px;
}
.creamy-menu .el-menu-item:hover,
.creamy-menu .el-menu-item.is-active {
  background-color: #f7e9d7;
  color: #d19777;
}

/* Override Element Plus default styles */
:deep(.el-input__wrapper) {
  border-radius: 8px;
}
:deep(.el-message-box) {
  border-radius: 12px;
}
:deep(.el-dialog) {
  border-radius: 12px;
}
</style>
