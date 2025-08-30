import { createStore } from 'vuex'
import headtitle from '../assets/head.jpg';
import photo1 from '../assets/1.jpg';
import photo2 from '../assets/2.jpg';
import photo3 from '../assets/3.jpg';
import photo4 from '../assets/4.jpg';
import photo5 from '../assets/5.jpg';

const store = createStore({
  state() {
    return {
      user: {
        
        avatarUrl: headtitle,
        name: 'meixianwu',
        bio: '仅以此记录一下我的学习进度还有生活日常，随便发一下',
        contactInfo: '邮箱: 2801523298@qq.com'
      },
      notes: [
        {
          id: 1,
          title: 'Vue 3 组合式 API 深度解析',
          content: '本文详细介绍了 Vue 3 中的组合式 API，包括 setup 语法糖、ref、reactive、computed、watch 等核心概念，并提供了丰富的代码示例。组合式 API 的引入，使得 Vue 组件的逻辑组织更加清晰、可复用性更高，尤其适用于大型复杂组件的开发...',
          summary: '本文详细介绍了 Vue 3 中的组合式 API...',
          images: [],
          date: '2025-01-15'
        },
        {
          id: 2,
          title: '手把手教你搭建 Vite 项目',
          content: 'Vite 是一个由 Vue 创始人尤雨溪开发的现代前端构建工具。它利用了浏览器原生 ESM (ECMAScript Modules) 和 esbuild 等工具，极大地提升了开发体验。本文将从零开始，手把手教你如何搭建一个 Vite + Vue 的项目...',
          summary: 'Vite 快速构建工具，带来极佳的开发体验...',
          images: [],
          date: '2025-03-20'
        }
      ],
      photos: [
        {
          id: 1,
          url: photo1
        },
        {
          id: 2,
          url: photo2
        },
        {
          id: 3,
          url: photo3
        },
        {
          id: 4,
          url: photo4
        },
        {
          id: 5,
          url: photo5
        }
      ],
      skills: {
        frontend: ['Vue 3', 'React', 'Angular'],
        languages: ['JavaScript', 'TypeScript'],
        tools: ['Vite', 'Webpack']
      },
      lifeMoments: [
        {
          id: 1,
          text: '今天天气真好，出去散步了',
          image: '',
          date: '2025-08-20'
        },
        {
          id: 2,
          text: '最近在学习前端有关的技术栈，收获很多',
          image: '',
          date: '2025-08-28'
        }
      ]
    }
  },
  mutations: {
    addNote(state, note) {
      state.notes.unshift(note);
    },
    updateNote(state, updatedNote) {
      const index = state.notes.findIndex(note => note.id === updatedNote.id);
      if (index !== -1) {
        state.notes.splice(index, 1, updatedNote);
      }
    },
    addPhoto(state, photo) {
      state.photos.unshift(photo);
    },
    updateUserInfo(state, user) {
      state.user = { ...state.user, ...user };
    },
    updateSkills(state, skills) {
      state.skills = skills;
    },
    addLifeMoment(state, moment) {
      state.lifeMoments.unshift(moment);
    },
    updateLifeMoment(state, payload) {
      const index = state.lifeMoments.findIndex(moment => moment.id === payload.id);

      if (index !== -1) {
        state.lifeMoments[index] = payload;
      }
    },

    deleteLifeMoment(state, id) {
      state.lifeMoments = state.lifeMoments.filter(moment => moment.id !== id);
    },
    deleteNote(state, noteId) {
      state.notes = state.notes.filter(note => note.id !== noteId);
    },
    
    
    deletePhoto(state, photoId) {
      state.photos = state.photos.filter(photo => photo.id !== photoId);
    },
    
   
    updatePhoto(state, updatedPhoto) {
      const index = state.photos.findIndex(p => p.id === updatedPhoto.id);
      if (index !== -1) {
        state.photos.splice(index, 1, updatedPhoto);
      }
    }
  },
  actions: {
   
  }
})

export default store
