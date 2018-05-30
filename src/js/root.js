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
            currentUser: {},
            shareLink: 'none',
            shareVisible: false,
            mode: 'edit',    //  'preview'
            resume: {
                name: '姓名',
                gender: '女',
                birthday: '1996年5月25',
                jobTitle: '前端工程师',
                phone: '123456789',
                email: '123@qq.com',
                skills: [
                    {name: '请填写技能名称', description: '请填写描述'},
                    {name: '请填写技能名称', description: '请填写描述'},
                    {name: '请填写技能名称', description: '请填写描述'},
                    {name: '请填写技能名称', description: '请填写描述'}
                ],
                projects: [
                    {name: '请填写项目名称', link: 'http://...', keywords: '请填写关键词', description: '请详细描述'},
                    {name: '请填写项目名称', link: 'http://...', keywords: '请填写关键词', description: '请详细描述'}
                ]
            },
            previewResume: {},
        }
    },
    methods: {
        getResume(user){
            let query = new AV.Query('User');
            return query.get(user.objectId).then((user) => {
                let resume = user.toJSON().resume
                return resume;
            }, (error) => {
                // 异常处理
            });
        },
        onLogin(user){
            this.currentUser.objectId = user.objectId;
            this.currentUser.email = user.email;
            alert('登陆成功')
            this.$router.push('/')
        },

    },
    computed: {
        displayResume(){
            return this.mode === 'preview' ? this.previewResume : this.resume
        }
    },
}).$mount('#root')


// 获取当前用户的id
let currentUser = AV.User.current();
if(currentUser){
    root.currentUser = currentUser.toJSON();
    root.shareLink = location.origin + location.pathname + '?user_id=' + root.currentUser.objectId
    root.getResume(root.currentUser).then((resume)=>{
        root.resume = resume
    })
}


// 获取预览用户的id
let search = location.search
let regex = /user_id=([^&]+)/
let matches = search.match(regex)
let userId;
if(matches){
    userId = matches[1]
    root.mode = 'preview'
    root.getResume({objectId: userId}).then((resume)=>{
        root.previewResume = resume
    });
}
