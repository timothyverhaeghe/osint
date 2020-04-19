import Vue from 'vue'
import Router from 'vue-router'

// Instagram
import instagramVideos from '@/pages/instagram/videos.vue'

Vue.use(Router);


window.routes = [
  // Default endpoint
  { path: '/', name: 'home', redirect: '/instagram/videos' },

  // Instagram
  { path: '/instagram/videos', name: 'instagramVideos', component: instagramVideos },


]

const router = new Router({
  routes: window.routes
})

export default router
