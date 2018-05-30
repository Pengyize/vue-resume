window.App = {
    props: ['displayresume', 'mode' ,'id', 'resume'],
    template:`
    <div>
        <app-aside   v-show="mode === 'edit'" :logoutvisible="true" @logout="onLogOut" @save="onClickSave" ></app-aside>

        <main>
           <resume :resume="resume" :id="id" :mode="mode" :displayresume="displayresume" ></resume>
        </main>
                    
        <button v-if="mode === 'preview'" class="exitPreview" @click="mode = 'edit'">退出预览</button>
    </div>
    `,
    data(){
        return {
            previewUser: {
                objectId: undefined
            },
            editingName: false,
            loginVisible: false,
            signUpVisible: false,
            currentUser: {
                objectId: undefined,
                email: ''
            },
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
        print(){
            window.print()
        },
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



