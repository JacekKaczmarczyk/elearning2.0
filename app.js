
const routes=[
    { path:'/home', component: home },
    { path:'/student', component: student },
    { path:'/grupa', component: grupa }
]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
  })
  
  
const app = Vue.createApp({})
app.use(router)
app.mount('#app')