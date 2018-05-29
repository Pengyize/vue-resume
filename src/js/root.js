const routes = [
    { path: '/', component: window.App },
    { path: '/login', component: window.Login},
    { path: '/signUp', component: window.SignUp},
]

const router = new VueRouter({
    routes: routes // (缩写) 相当于 routes: routes
})

const root = new Vue({
    router: router,
    data(){
        return{
            currentUser: {}
        }
    }
}).$mount('#root')


// let app = new Vue({
//     el: '#app',
//     data: {
//     },
//     methods: {
//     }
// });
//
// // 获取当前用户的id
// let currentUser = AV.User.current();
// if(currentUser){
//     app.currentUser = currentUser.toJSON();
//     app.shareLink = location.origin + location.pathname + '?user_id=' + app.currentUser.objectId
//     app.getResume(app.currentUser).then((resume)=>{
//         app.resume = resume
//     })
// }
//
// // 获取预览用户的id
// let search = location.search
// let regex = /user_id=([^&]+)/
// let matches = search.match(regex)
// let userId;
// if(matches){
//     userId = matches[1]
//     app.mode = 'preview'
//     app.getResume({objectId: userId}).then((resume)=>{
//         app.previewResume = resume
//     });
// }

