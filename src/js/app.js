let app = new Vue({
    el: '#app',
    data: {
        editingName: false,
        loginVisible: false,
        signUpVisible: false,
        currentUser: {
            objectId: undefined,
            email: ''
        },
        login: {
            email: '',
            password: ''
        },
        resume: {
            name: '姓名',
            gender: '女',
            birthday: '1996年5月25',
            jobTitle: '前端工程师',
            phone: '123456789',
            email: '123@qq.com'
        },
        signUp: {
            email: '',
            password: ''
        }
    },
    methods: {
        onEdit(key, value) {
            this.resume[key] = value;
            console.log('app', app.resume);
        },
        hasLogin(){
            return !!this.currentUser.objectId
        },
        onLogin(){
            AV.User.logIn(this.login.email, this.login.password).then((user) =>{
                user = user.toJSON()
                this.currentUser={
                    objectId: user.objectId,
                    email: user.email
                }
                this.loginVisible = false
            }, function (error) {
                if(error.code === 211){
                    alert('邮箱不存在')
                }else if(error.code === 210){
                    alert('邮箱或密码错误')
                }
            });
        },
        onSignUp(){
            const user = new AV.User();
            // 设置用户名
            user.setUsername(this.signUp.email);
            // 设置密码
            user.setPassword(this.signUp.password);
            // 设置邮箱
            user.setEmail(this.signUp.email);
            user.signUp().then((user) =>{
                alert('注册成功')
                user = user.toJSON()
                this.currentUser={
                    objectId: user.objectId,
                    email: user.email
                }
                this.signUpVisible = false
            }, function (error) {
                alert(error.rawMessage)
            });
        },
        onClickSave() {
            let currentUser = AV.User.current();
            if (!currentUser) {
                this.loginVisible = true
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
            alert('注销成功')
            window.location.reload()
        },
        getResume(){
            let query = new AV.Query('User');
            query.get(this.currentUser.objectId).then((user) => {
                this.resume = user.toJSON().resume;
                console.log(this.resume)
            }, (error) => {
                // 异常处理
            });
        }
    }
});

let currentUser = AV.User.current()
if(currentUser){
    app.currentUser = currentUser.toJSON()
    app.getResume();
}
