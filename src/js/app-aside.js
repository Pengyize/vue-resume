Vue.component('app-aside',{
    props:['logoutvisible'],
    methods:{
        gotoLogin(){
            this.$router.push('/login')
        },
        gotoSignUp(){
            this.$router.push('/signUp')
        }
    },
    template:`
    <aside>
        <div class="upper">
            <p>简历编辑页面</p>
            <ul class="actions">
                <li>
                    <button class="button" @click="$emit('save')">
                    <span class="glyphicon glyphicon-floppy-saved" aria-hidden="true"></span>
                    保存
                    </button>
                </li>
                <li>
                    <button data-toggle="modal" data-target="#myModal" class="btn btn-primary btn-lg button" @click="$emit('share')">
                    <span class="glyphicon glyphicon-share-alt" aria-hidden="true" ></span>
                    分享
                    </button>
                </li>
                <li>
                    <button class="button" @click="$emit('print')">
                    <span class="glyphicon glyphicon-print" aria-hidden="true" ></span>
                    打印
                    </button>
                </li>
                <li>
                    <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#mySkin" @click="$emit('skin')">
                    <span class="glyphicon glyphicon-menu-right" aria-hidden="true" ></span>
                    换肤
                    </button>
                </li>
            </ul>
        </div>
        <div class="down">
            <button class="button signOutButton" @click="$emit('logout')" v-show="logoutvisible">
               <span class="glyphicon glyphicon-log-out" aria-hidden="true" ></span>
               注销
            </button>
            
            <button class="button" @click="gotoLogin" v-show="!logoutvisible">
                <span class="glyphicon glyphicon-log-in" aria-hidden="true" ></span>
                登陆
            </button>
            <button class="button" @click="gotoSignUp" v-show="!logoutvisible">
                <span class="glyphicon glyphicon-plus" aria-hidden="true" ></span>
                注册
            </button>
        </div>
    </aside>
    `
})
