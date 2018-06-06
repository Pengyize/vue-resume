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
                    {name: 'HTML5 & CSS3', description: '了解 HTML5 语义化结构......'},
                    {name: '移动端页面', description: '会使用 REM、vw/vh、FastClick 等技术......'},
                    {name: 'jQuery', description: '熟悉 jQuery 的常用API......'},
                    {name: 'JavaScript', description: '在不使用框架的情况下，能够使用原生 JS......'}
                ],
                projects: [
                    {name: '键盘导航页', link: 'http://pengyize.top', description: '利用原生 JavaScript 面，还可以自定义每个键绑定的导航网址。'},
                    {name: '皮卡丘', link: 'http://pengyize.top', description: '利用原生 JavaScript 动态向 &ltstyle&gt 标签添加样式以及 &ltpre&gt 标签添加文本。'}
                ]
            },
            previewResume: {},
            skinPickerVisible: false,
            logoutVisible: false
        }
    },
    methods: {
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
            this.currentUser.objectId = user.objectId;
            this.currentUser.email = user.email;
            this.shareLink = location.origin + location.pathname + '?user_id=' +this.currentUser.objectId
            this.getResume(this.currentUser).then((resume)=>{this.resume = resume})
            alert('登陆成功')
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
    $('#main')[0].className = 'col-md-12';
}
