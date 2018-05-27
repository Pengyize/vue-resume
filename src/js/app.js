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
            email: '123@qq.com',
            skills:[
                {name: '请填写技能名称',description: '请填写描述'},
                {name: '请填写技能名称',description: '请填写描述'},
                {name: '请填写技能名称',description: '请填写描述'},
                {name: '请填写技能名称',description: '请填写描述'}
            ],
            projects:[
                {name: '请填写项目名称', link: 'http://...', keywords: '请填写关键词', description: '请详细描述'},
                {name: '请填写项目名称', link: 'http://...', keywords: '请填写关键词', description: '请详细描述'}
            ]
        },
        signUp: {
            email: '',
            password: ''
        },
        shareLink: 'none',
        shareVisible: false
    },
    methods: {
        onEdit(key, value) {
            // this.resume[key] = value;
            let regex = /\[(\d+)\]/g
            key = key.replace(regex, (match, number)=> `.${number}`)
            let keys = key.split('.')
            let result = this.resume;
            for(let i=0;i<keys.length;i++){
                if(i === keys.length -1){
                    result[keys[i]] = value;
                }else{
                    result = result[keys[i]];
                }
                //result = this.resume
                //keys = ['skills', '0', 'name']
                //i=0 result === result['skills'] === this.resume.skills
                //i=1 result === result['0'] === this.resume.skills.0
                //i=2 result === result['name'] === this.resume.skills.0.name
                //result === this.resume['skills']['0']['name']
            }

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
                Object.assign(this.resume, user.toJSON().resume)
            }, (error) => {
                // 异常处理
            });
        },
        addSkill(){
            this.resume.skills.push({name:'请填写技能名称', description:'请填写描述'});
        },
        removeSkill(index){
            this.resume.skills.splice(index,1)
        },
        addProject(){
            this.resume.projects.push(
                {name: '请填写项目名称', link: 'http://...', keywords: '请填写关键词', description: '请详细描述'}
            );
        },
        removeProject(index){
            this.resume.projects.splice(index,1)
        },
    }
});

let currentUser = AV.User.current();
if(currentUser){
    app.currentUser = currentUser.toJSON();
    app.getResume();
    app.shareLink = location.origin + location.pathname + '?user_id=' + app.currentUser.objectId
}
