window.App = {
    template:`
    <div>
        <app-aside  v-show="mode === 'edit'" :logoutvisible="true" @logout="onLogOut" @save="onClickSave"></app-aside>

        <main>
           <resume :mode="mode" :displayresume="displayResume"></resume>
        </main>
                    
        <button v-if="mode === 'preview'" class="exitPreview" @click="mode = 'edit'">退出预览</button>
    </div>
    `,
    data(){
        return {
            previewUser: {
                objectId: undefined
            },
            previewResume: {},
            editingName: false,
            loginVisible: false,
            signUpVisible: false,
            currentUser: {
                objectId: undefined,
                email: ''
            },
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
            shareLink: 'none',
            shareVisible: false,
            mode: 'edit',    //  'preview'
            skinPickerVisible: false,
        }
    },
    methods:{
        onShare(){
            if(this.hasLogin()){
                this.shareVisible = true
            }else{
                alert('请先登陆')
            }
        },
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
        onLogin(user){
            this.currentUser.objectId = user.objectId;
            this.currentUser.email = user.email;
            this.loginVisible = false
        },
        hasLogin(){
            return !!this.currentUser.objectId
        },
        onClickSave() {
            let currentUser = AV.User.current();
            if (!currentUser) {
                this.$router.push('/login')
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
        getResume(user){
            let query = new AV.Query('User');
            return query.get(user.objectId).then((user) => {
                let resume = user.toJSON().resume
                return resume;
            }, (error) => {
                // 异常处理
            });
        },
        print(){
            window.print()
        },
    },
    computed: {
        displayResume(){
            return this.mode === 'preview' ? this.previewResume : this.resume
        }
    },
    watch: {
        'currentUser.objectId': function (newValue) {
            if(newValue){
                this.getResume(this.currentUser).then((resume)=>{this.resume = resume})
                this.shareLink = location.origin + location.pathname + '?user_id=' + app.currentUser.objectId
            }
        }
    },
}

Vue.component('app',App)
