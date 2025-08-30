<template>
  <el-container class="creamy-bg">
    <el-main class="main-content">
      <el-row type="flex" justify="space-between" align="middle" class="title-row">
        <el-col :span="12">
          <h1>我的照片相册</h1>
        </el-col>
        <el-col :span="12" class="button-container">
          <el-upload
            action="#"
            :show-file-list="false"
            :http-request="uploadImage"
            multiple
          >
            <el-button type="primary" :icon="Upload">
              上传图片
            </el-button>
          </el-upload>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col
          v-for="photo in photos"
          :key="photo.id"
          :span="6"
          class="photo-col"
        >
          <el-card shadow="hover" :body-style="{ padding: '0px' }" class="creamy-card photo-card">
            <div class="image-wrapper">
              <el-image
                :src="photo.url"
                fit="cover"
                :preview-src-list="[photo.url]"
                class="photo-image"
              ></el-image>
              <div class="photo-overlay">
                <el-button type="info" :icon="Edit" circle @click="openEditDialog(photo)"></el-button>
                <el-button type="danger" :icon="Delete" circle @click="deletePhoto(photo.id)"></el-button>
              </div>
            </div>
            <div class="photo-caption">{{ photo.caption }}</div>
          </el-card>
        </el-col>

        <el-col v-if="photos.length === 0" :span="24" class="empty-placeholder">
          <el-empty description="你还没有上传任何照片哦！"></el-empty>
        </el-col>
      </el-row>
    </el-main>
  </el-container>

  <el-dialog
    v-model="editDialogVisible"
    title="编辑照片"
    width="30%"
    class="edit-photo-dialog"
  >
    <el-form :model="currentPhoto" label-width="80px">
      <el-form-item label="照片标题">
        <el-input v-model="currentPhoto.caption" placeholder="输入照片标题"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="editDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="savePhotoChanges">保存</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Upload, Edit, Delete } from '@element-plus/icons-vue';

const store = useStore();
const photos = computed(() => store.state.photos);
const editDialogVisible = ref(false);
const currentPhoto = ref({ id: null, url: '', caption: '' });

// 删除照片功能
const deletePhoto = (photoId) => {
  ElMessageBox.confirm('确定要删除这张照片吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
  .then(() => {
    store.commit('deletePhoto', photoId);
    ElMessage.success('照片已删除！');
  })
  .catch(() => {
    ElMessage.info('已取消删除');
  });
};

// 打开编辑对话框
const openEditDialog = (photo) => {
  currentPhoto.value = { ...photo };
  editDialogVisible.value = true;
};

// 保存照片修改
const savePhotoChanges = () => {
  store.commit('updatePhoto', currentPhoto.value);
  editDialogVisible.value = false;
  ElMessage.success('照片已更新！');
};

const uploadImage = (option) => {
  const file = option.file;
  const reader = new FileReader();

  reader.onload = (e) => {
    if (file.type.startsWith('image/')) {
      const newPhoto = {
        id: Date.now(),
        url: e.target.result,
        caption: '' // 新增caption字段
      };
      store.commit('addPhoto', newPhoto);
      ElMessage.success('图片上传成功！');
    } else {
      ElMessage.error('上传失败，请确保您上传的是图片文件！');
    }
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
.photo-col {
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
.image-wrapper {
  position: relative;
}
.photo-image {
  width: 100%;
  height: 200px;
  display: block;
}
.photo-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}
.image-wrapper:hover .photo-overlay {
  opacity: 1;
}
.photo-caption {
  padding: 10px;
  text-align: center;
  font-size: 14px;
  color: #606266;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.empty-placeholder {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}
</style>
