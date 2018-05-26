let app = new Vue({
    el: '#app',
    data: {
        editingName: false,
        loginVisible: false,
        signUpVisible: false,
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
        onLogin(){
            AV.User.logIn(this.login.email, this.login.password).then(function (user) {
                console.log(user);
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
            user.signUp().then(function (loggedInUser) {
                console.log(loggedInUser);
            }, function (error) {
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
            let {id} = AV.User.current()
            let user = AV.Object.createWithoutData('User', id);
            // 修改属性
            user.set('resume', this.resume);
            // 保存到云端
            user.save();
        },
        onLogOut(){
            AV.User.logOut();
            alert('注销成功')
            window.location.reload()
        }

    }
});