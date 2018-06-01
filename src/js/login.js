window.Login ={
    data(){
        return{
            login: {
                email: '',
                password: ''
            },
        }
    },
    methods:{
        onLogin(){
            AV.User.logIn(this.login.email, this.login.password).then((user) =>{
                user = user.toJSON()
                this.$emit('login', user)
            }, function (error) {
                if(error.code === 211){
                    alert('邮箱不存在')
                }else if(error.code === 210){
                    alert('邮箱或密码错误')
                }
            });
        },
        onClickSignUp(){
            this.$emit('goToSignUp')
        }
    },
    template: `
    <div class="login" v-cloak>
    <form class="form-horizontal form" @submit.prevent="onLogin">
        <h2>简历编辑器</h2>
        <div class="form-group">
            <!--<label for="inputEmail3" class="col-sm-2 control-label" >邮箱</label>-->
            <div class="col-sm-12">
                <input type="email" class="form-control" id="inputEmail3" placeholder="邮箱" v-model="login.email">
            </div>
        </div>
        <div class="form-group">
            <!--<label for="inputPassword3" class="col-sm-2 control-label">密码</label>-->
            <div class="col-sm-12">
             <input v-model="login.password" type="password" class="form-control" id="inputPassword3" placeholder="密码">
            </div>
        </div>
  
        <div class="form-group">
         <div class="col-sm-offset-2 col-sm-10">
            <button type="submit" class="btn btn-default loginButton">登陆</button>
            <button type="submit" class="btn btn-default"><router-link to="/signUp">去注册</router-link></button>
         </div>
        </div>
    </form>
    
    
        <!--<form action="" class="form" @submit.prevent="onLogin">-->
            <!--<h2>登陆</h2>-->
            <!--<router-link to="/">关闭</router-link>-->
            <!--<div class="row">-->
                <!--<label for="">邮箱</label>-->
                <!--<input type="text" v-model="login.email">-->
            <!--</div>-->
            <!--<div class="row">-->
                <!--<label for="">密码</label>-->
                <!--<input type="password" v-model="login.password">-->
            <!--</div>-->
            <!--<div class="actions">-->
                <!--<button type="submit">提交</button>-->
                <!--<router-link to="/signUp">注册</router-link>-->
            <!--</div>-->
        <!--</form>-->
    </div>
`
}

Vue.component('login',window.Login);

