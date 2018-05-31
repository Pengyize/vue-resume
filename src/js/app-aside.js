Vue.component('app-aside',{
    props:['logoutvisible'],
    methods:{
        gotoLogin(){
            this.$router.push('/login')
        }
    },
    template:`
    <aside>
        <div class="upper">
            <p>简历编辑</p>
            <ul class="actions">
                <li><button class="button" @click="$emit('save')">保存</button></li>
                <li><button class="button" @click="$emit('share')">分享</button></li>
                <li><button class="button" @click="$emit('print')">打印</button></li>
                <li><button class="button" @click="$emit('skin')">换肤</button></li>
            </ul>
        </div>
        <div class="down">
            <button class="button" @click="$emit('logout')" v-show="logoutvisible">注销</button>
            <button class="button" @click="gotoLogin" v-show="!logoutvisible">登陆</button>
        </div>
    </aside>
    `
})
