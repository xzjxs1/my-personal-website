<template>
  <el-container class="creamy-bg">

    <el-main class="main-content">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-card shadow="hover" class="creamy-card profile-card">
            <el-upload
              action="#"
              :show-file-list="false"
              :http-request="uploadAvatar"
              class="avatar-uploader"
            >
              <el-avatar :size="225" :src="user.avatarUrl" class="avatar-hover"></el-avatar>
            </el-upload>
            <h2>{{ user.name }}</h2>
            <p>{{ user.bio }}</p>
            <el-button type="primary" :icon="Edit" @click="openUserEditDialog">编辑个人信息</el-button>
          </el-card>
        </el-col>
        <el-col :span="16">
          <el-card shadow="hover" class="creamy-card skills-card">
            <div class="card-header">
              <h2>我的技能栈</h2>
              <el-button text class="edit-btn" @click="openSkillsEditDialog">
                <el-icon><Edit /></el-icon>
              </el-button>
            </div>
            <el-row :gutter="20">
              <el-col :span="8">
                <h3>前端框架</h3>
                <div class="skill-tags">
                  <el-tag v-for="tag in skills.frontend" :key="tag" class="creamy-tag">{{ tag }}</el-tag>
                </div>
              </el-col>
              <el-col :span="8">
                <h3>编程语言</h3>
                <div class="skill-tags">
                  <el-tag v-for="tag in skills.languages" :key="tag" class="creamy-tag">{{ tag }}</el-tag>
                </div>
              </el-col>
              <el-col :span="8">
                <h3>构建工具</h3>
                <div class="skill-tags">
                  <el-tag v-for="tag in skills.tools" :key="tag" class="creamy-tag">{{ tag }}</el-tag>
                </div>
              </el-col>
            </el-row>
          </el-card>

          <el-card shadow="hover" class="creamy-card contact-card">
            <h2>联系我</h2>
            <p>{{ user.contactInfo }}</p>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
  </el-container>

  
  <el-dialog v-model="skillsDialogVisible" title="编辑技能栈" width="50%">
    <el-form :model="editSkillsForm" label-width="100px">
      <el-form-item label="前端框架">
        <el-input v-model="editSkillsForm.frontend" placeholder="用逗号分隔，如 Vue,React"></el-input>
      </el-form-item>
      <el-form-item label="编程语言">
        <el-input v-model="editSkillsForm.languages" placeholder="用逗号分隔，如 JavaScript,TypeScript"></el-input>
      </el-form-item>
      <el-form-item label="构建工具">
        <el-input v-model="editSkillsForm.tools" placeholder="用逗号分隔，如 Vite,Webpack"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="skillsDialogVisible = false">取消</el-button>
      <el-button type="primary" @click="saveSkills">保存</el-button>
    </template>
  </el-dialog>

  
  <el-dialog v-model="userDialogVisible" title="编辑个人信息" width="50%">
    <el-form :model="editUserForm" label-width="100px">
      <el-form-item label="姓名">
        <el-input v-model="editUserForm.name"></el-input>
      </el-form-item>
      <el-form-item label="简介">
        <el-input v-model="editUserForm.bio" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input v-model="editUserForm.contactInfo"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="userDialogVisible = false">取消</el-button>
      <el-button type="primary" @click="saveUser">保存</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { Edit } from '@element-plus/icons';
import { ElMessage } from 'element-plus';

const store = useStore();
const user = computed(() => store.state.user);
const skills = computed(() => store.state.skills);

const skillsDialogVisible = ref(false);
const userDialogVisible = ref(false);

const editSkillsForm = ref({
  frontend: '',
  languages: '',
  tools: '',
});

const editUserForm = ref({
  name: '',
  bio: '',
  contactInfo: '',
});

const openSkillsEditDialog = () => {
  editSkillsForm.value.frontend = skills.value.frontend.join(',');
  editSkillsForm.value.languages = skills.value.languages.join(',');
  editSkillsForm.value.tools = skills.value.tools.join(',');
  skillsDialogVisible.value = true;
};

const openUserEditDialog = () => {
  editUserForm.value = { ...user.value };
  userDialogVisible.value = true;
};

const saveSkills = () => {
  store.commit('updateSkills', {
    frontend: editSkillsForm.value.frontend.split(',').map(s => s.trim()).filter(s => s),
    languages: editSkillsForm.value.languages.split(',').map(s => s.trim()).filter(s => s),
    tools: editSkillsForm.value.tools.split(',').map(s => s.trim()).filter(s => s),
  });
  skillsDialogVisible.value = false;
};

const saveUser = () => {
  store.commit('updateUserInfo', editUserForm.value);
  userDialogVisible.value = false;
};

const uploadAvatar = (option) => {
  const file = option.file;
  const reader = new FileReader();

  if (!file.type.startsWith('image/')) {
    ElMessage.error('上传失败，请确保您上传的是图片文件！');
    return;
  }

  reader.onload = (e) => {
    store.commit('updateUserInfo', { avatarUrl: e.target.result });
    ElMessage.success('头像更新成功！');
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
  background-color: #f7f3e9;
  min-height: 100vh;
}
.header {
  padding: 0;
}
.creamy-menu {
  background-color: #cbbd9a;
  border-bottom: none;
}
.creamy-menu .el-menu-item {
  color: #6d5b4f;
  font-weight: bold;
  font-size: 20px;
}
.creamy-menu .el-menu-item:hover,
.creamy-menu .el-menu-item.is-active {
  background-color: #f7e9d7;
  color: #d19777;
}
.main-content {
  padding: 40px;
}
.creamy-card {
  border-radius: 8px;
  margin-bottom: 20px;
}
.profile-card {
  text-align: center;
}
.skills-card .card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ebebeb;
  padding-bottom: 15px;
  margin-bottom: 15px;
}
.skill-tags {
  margin-top: 10px;
}
.creamy-tag {
  background-color: #f7e9d7;
  color: #6d5b4f;
  border: none;
  margin-right: 5px;
}
.contact-card p {
  line-height: 1.8;
}
.avatar-uploader {
  cursor: pointer;
  border-radius: 50%;
  transition: box-shadow 0.3s ease;
}
.avatar-uploader:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
