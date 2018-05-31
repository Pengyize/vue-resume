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
                birthday: '18',
                jobTitle: '前端工程师',
                phone: '13767676767',
                email: 'example@mail.com',
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
            skinPickerVisible: false,
            logoutVisible: false
        }
    },
    methods: {
        onShare(){
            if(this.hasLogin()){
                if(this.shareVisible === false){
                    this.shareVisible = true
                }else{
                    this.shareVisible = false
                }
            }else{
                alert('请先登陆')
            }
        },
        hasLogin(){
            return !!this.currentUser.objectId
        },
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
            console.log('user',user)
            this.currentUser.objectId = user.objectId;
            this.currentUser.email = user.email;
            this.shareLink = location.origin + location.pathname + '?user_id=' +this.currentUser.objectId
            this.getResume(this.currentUser).then((resume)=>{this.resume = resume})
            this.$router.push('/')
            this.logoutVisible = true;
        },
        changeSkin(){
            console.log(this.skinPickerVisible)
            if(this.skinPickerVisible === false){

                this.skinPickerVisible = true
            }else{
                this.skinPickerVisible = false
            }
        },
        onSignUp(newUser){
            let user = AV.Object.createWithoutData('User', newUser.objectId);
            // 修改属性
            user.set('resume', this.resume);
            // 保存到云端
            user.save().then((sth)=>{
                console.log('保存成功')
            },()=>{
            });
            this.$router.push('/login')
        },
        onClickSave() {
            let currentUser = AV.User.current();
            if (!currentUser) {
                alert('请先登陆')
            }
            else {
                this.saveResume()
            }
        },
        saveResume(){
            let {objectId} = AV.User.current().toJSON()
            let user = AV.Object.createWithoutData('User', objectId);
            // 修改属性
            user.set('resume', this.resume);
            // 保存到云端
            user.save().then(()=>{
                alert('保存成功')
            },()=>{
                alert('保存失败')
            });
        },
        onLogOut(){
            AV.User.logOut();
            window.location.reload()
            this.logoutvisible = false
            alert('注销成功')
        },
    },
    watch: {    //牛逼，监听
        'currentUser.objectId': function (newValue) {
            if(newValue){
                this.getResume(this.currentUser).then((resume)=>{this.resume = resume})
                this.shareLink = location.origin + location.pathname + '?user_id=' +this.currentUser.objectId
            }
        }
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
    root.logoutVisible = true;
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
