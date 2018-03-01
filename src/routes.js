module.exports = [{
  path: '/',
  redirect: '/home'
}, {
  path: '/home',
  name: 'homePage',
  component: resolve => require(['./pages/home'], resolve),
  children: [{
    path: '/aboutMe',
      name: 'aboutMe',
      component: resolve => require(['./pages/aboutMe'], resolve),
      meta: {
          title: '关于我'
      }
  }]
}]
