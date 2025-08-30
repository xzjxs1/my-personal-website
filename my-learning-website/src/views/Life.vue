<template>
  <el-container class="creamy-bg">
    <el-main class="main-content">
      <el-row type="flex" justify="space-between" align="middle" class="title-row">
        <el-col :span="12">
          <h1>生活动态</h1>
        </el-col>
        <el-col :span="12" class="button-container">
          <el-button type="primary" :icon="Plus" @click="openDialog(null)">
            发布新动态
          </el-button>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col
          v-for="moment in lifeMoments"
          :key="moment.id"
          :span="8"
          class="moment-card-col"
        >
          <el-card shadow="hover" class="creamy-card moment-card">
            <template #header>
              <div class="card-header">
                <h3>生活碎片</h3>
                <div class="card-actions">
                  <el-button 
                    type="info" 
                    :icon="Edit" 
                    circle 
                    size="small" 
                    @click="openDialog(moment)"
                  ></el-button>
                  <el-button 
                    type="danger" 
                    :icon="Delete" 
                    circle 
                    size="small" 
                    @click="deleteMoment(moment.id)"
                  ></el-button>
                </div>
              </div>
            </template>
            <div class="moment-content">
              <p>{{ moment.text }}</p>
              <img v-if="moment.image" :src="moment.image" alt="Life Moment Image" class="moment-image">
            </div>
          </el-card>
        </el-col>

        <el-col v-if="lifeMoments.length === 0" :span="24" class="empty-placeholder">
          <el-empty description="你还没有发布任何动态哦！"></el-empty>
        </el-col>
      </el-row>
    </el-main>
  </el-container>

  <el-dialog
    v-model="dialogVisible"
    :title="momentForm.id ? '编辑动态' : '发布新动态'"
    width="50%"
    class="create-moment-dialog"
  >
    <el-form :model="momentForm" label-width="80px">
      <el-form-item label="内容">
        <el-input
          v-model="momentForm.text"
          type="textarea"
          :rows="5"
          placeholder="分享你的生活..."
        ></el-input>
      </el-form-item>
      <el-form-item label="选择图片">
        <el-upload
          action="#"
          :show-file-list="false"
          :http-request="uploadImage"
        >
          <el-button type="info" :icon="Picture">选择图片</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="发布日期">
        <el-date-picker
          v-model="momentForm.date"
          type="date"
          placeholder="选择日期"
          style="width: 100%;"
        ></el-date-picker>
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveMoment">{{ momentForm.id ? '保存' : '发布' }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Plus, Picture, Edit, Delete } from '@element-plus/icons-vue';

const store = useStore();
const lifeMoments = computed(() => store.state.lifeMoments);

const dialogVisible = ref(false);
const momentForm = ref({
  id: null,
  text: '',
  image: '',
  date: new Date(),
});

const openDialog = (moment) => {
  if (moment) {
    momentForm.value = {
      id: moment.id,
      text: moment.text,
      image: moment.image,
      date: new Date(moment.date),
    };
  } else {
    momentForm.value = {
      id: null,
      text: '',
      image: '',
      date: new Date(),
    };
  }
  dialogVisible.value = true;
};

const saveMoment = () => {
  if (!momentForm.value.text) {
    ElMessage.warning('内容不能为空！');
    return;
  }
  
  const formattedDate = momentForm.value.date.toLocaleDateString();

  if (momentForm.value.id) {
    store.commit('updateLifeMoment', {
      id: momentForm.value.id,
      text: momentForm.value.text,
      image: momentForm.value.image,
      date: formattedDate,
    });
    ElMessage.success('动态已保存！');
  } else {
    const newMoment = {
      id: Date.now(),
      text: momentForm.value.text,
      image: momentForm.value.image,
      date: formattedDate,
    };
    store.commit('addLifeMoment', newMoment);
    ElMessage.success('动态发布成功！');
  }

  dialogVisible.value = false;
};

const deleteMoment = (id) => {
  ElMessageBox.confirm('确定要删除这条动态吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
  .then(() => {
    store.commit('deleteLifeMoment', id);
    ElMessage.success('动态已删除！');
  })
  .catch(() => {
    ElMessage.info('已取消删除');
  });
};

const uploadImage = (option) => {
  const file = option.file;
  const reader = new FileReader();

  if (!file.type.startsWith('image/')) {
    ElMessage.error('上传失败，请确保您上传的是图片文件！');
    return;
  }

  reader.onload = (e) => {
    momentForm.value.image = e.target.result;
    ElMessage.success('图片已加载！');
  };

  reader.onerror = () => {
    ElMessage.error('图片加载失败，请重试！');
  };

  try {
    reader.readAsDataURL(file);
  } catch (error) {
    ElMessage.error('文件读取失败！');
  }
};
</script>

<style scoped>
.creamy-bg {
  background-color: transparent;
  min-height: 100vh;
}
.main-content {
  padding: 40px;
}
.title-row {
  margin-bottom: 20px;
}
.moment-card-col {
  margin-bottom: 20px;
}
.creamy-card {
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease;
}
.creamy-card:hover {
  transform: translateY(-5px);
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.moment-content {
  white-space: pre-wrap;
  color: #606266;
  word-break: break-word;
}
.moment-image {
  max-width: 100%;
  height: auto;
  border-radius: 6px;
  margin-top: 10px;
}
.empty-placeholder {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}
.card-actions .el-button {
  margin-left: 5px;
}
</style>