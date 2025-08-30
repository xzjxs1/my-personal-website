import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Notes from '../views/Notes.vue'
import PhotoAlbum from '../views/PhotoAlbum.vue'
import About from '../views/About.vue'
import Article from '../views/Article.vue'
import Life from '../views/Life.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/notes',
    name: 'Notes',
    component: Notes
  },
  {
    path: '/photo-album',
    name: 'PhotoAlbum',
    component: PhotoAlbum
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/article/:id',
    name: 'Article',
    component: Article
  },
  {
    path: '/life',
    name: 'Life',
    component: Life
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
