<template>
  <el-container class="creamy-bg">
    <el-main class="main-content">
      <el-row type="flex" justify="space-between" align="middle" class="title-row">
        <el-col :span="12">
          <h1>我的学习笔记</h1>
        </el-col>
        <el-col :span="12" class="button-container">
          <el-button type="primary" :icon="Plus" @click="openDialog('create')">
            创建新笔记
          </el-button>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col
          v-for="note in notes"
          :key="note.id"
          :span="8"
          class="note-card-col"
        >
          <el-card shadow="hover" class="creamy-card note-card" @click="openDialog('edit', note)">
            <template #header>
              <div class="card-header">
                <h3>{{ note.title }}</h3>
                <el-tag type="info">{{ note.date }}</el-tag>
              </div>
            </template>
            <div class="note-content">
              <p>{{ note.summary }}</p>
            </div>
          </el-card>
        </el-col>

        <el-col v-if="notes.length === 0" :span="24" class="empty-placeholder">
          <el-empty description="你还没有创建任何笔记哦！"></el-empty>
        </el-col>
      </el-row>
    </el-main>
  </el-container>

  <el-dialog
    v-model="dialogVisible"
    :title="dialogTitle"
    width="50%"
    class="create-note-dialog"
  >
    <el-form :model="noteForm" label-width="80px">
      <el-form-item label="标题">
        <el-input
          v-model="noteForm.title"
          placeholder="请输入笔记标题"
        ></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <el-input
          v-model="noteForm.content"
          type="textarea"
          :rows="10"
          placeholder="开始你的创作吧..."
        ></el-input>
      </el-form-item>
      <el-form-item label="发布日期">
        <el-date-picker
          v-model="noteForm.date"
          type="date"
          placeholder="选择日期"
          style="width: 100%;"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-upload
          action="#"
          :show-file-list="false"
          :http-request="uploadImage"
        >
          <el-button type="info" :icon="Picture">插入图片</el-button>
        </el-upload>
      </el-form-item>
      <div v-if="noteForm.images.length > 0" class="image-preview-container">
        <h4>已插入图片:</h4>
        <div v-for="(image, index) in noteForm.images" :key="index" class="image-item">
          <img :src="image.url" class="image-preview" />
          <el-button @click="removeImage(index)" type="danger" circle :icon="Delete" size="small" class="remove-btn" />
        </div>
      </div>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveNote">发布</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { ElMessage } from 'element-plus';
import { Plus, Picture, Delete } from '@element-plus/icons';

const store = useStore();
const notes = computed(() => store.state.notes);

const dialogVisible = ref(false);
const dialogType = ref('create');
const dialogTitle = computed(() => (dialogType.value === 'create' ? '创建新笔记' : '编辑笔记'));
const noteForm = ref({
  id: null,
  title: '',
  content: '',
  date: new Date(),
  images: [],
});

const openDialog = (type, note = null) => {
  dialogType.value = type;
  if (type === 'edit' && note) {
    noteForm.value = {
      id: note.id,
      title: note.title,
      content: note.content,
      date: new Date(note.date),
      images: note.images || [],
    };
  } else {
    noteForm.value = {
      id: null,
      title: '',
      content: '',
      date: new Date(),
      images: [],
    };
  }
  dialogVisible.value = true;
};

const saveNote = () => {
  if (!noteForm.value.title || !noteForm.value.content) {
    ElMessage.warning('标题和内容不能为空！');
    return;
  }
  
  const newNote = {
    id: noteForm.value.id || Date.now(),
    title: noteForm.value.title,
    summary: noteForm.value.content.substring(0, 100) + '...',
    content: noteForm.value.content,
    images: noteForm.value.images,
    date: new Date(noteForm.value.date).toLocaleDateString(),
  };

  if (dialogType.value === 'create') {
    store.commit('addNote', newNote);
    ElMessage.success('笔记发布成功！');
  } else {
    store.commit('updateNote', newNote);
    ElMessage.success('笔记更新成功！');
  }

  dialogVisible.value = false;
};

const uploadImage = (option) => {
  const file = option.file;
  const reader = new FileReader();

  if (!file.type.startsWith('image/')) {
    ElMessage.error('上传失败，请确保您上传的是图片文件！');
    return;
  }

  reader.onload = (e) => {
    noteForm.value.images.push({ url: e.target.result, name: file.name });
    ElMessage.success('图片已加载到预览区域！');
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

const removeImage = (index) => {
  noteForm.value.images.splice(index, 1);
};
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
.title-row {
  margin-bottom: 20px;
}
.article-link {
  text-decoration: none;
  color: inherit;
}
.note-card-col {
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
.note-content p {
  color: #606266;
  line-height: 1.6;
}
.note-actions {
  text-align: right;
  margin-top: 10px;
}
.empty-placeholder {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}

.image-preview-container {
  margin-top: 20px;
}

.image-item {
  position: relative;
  display: inline-block;
  margin: 5px;
  border: 1px solid #ddd;
  border-radius: 6px;
  overflow: hidden;
}

.image-preview {
  max-width: 100px;
  max-height: 100px;
  display: block;
}

.remove-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 10;
}
</style>
