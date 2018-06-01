window.SignUp ={
    data(){
        return{
            signUp: {
                email: '',
                password: ''
            },
        }
    },
    methods:{
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
                this.$emit('signup',user)
            }, function (error) {
                alert(error.rawMessage)
            });
        },
    },
    template:`
    <div class="signUp" v-cloak>
    <form class="form-horizontal form" @submit.prevent="onSignUp">
        <h2>注册账户</h2>
        <div class="form-group">
            <!--<label for="inputEmail3" class="col-sm-2 control-label" >邮箱</label>-->
            <div class="col-sm-12">
                <input type="email" class="form-control" id="inputEmail3" placeholder="邮箱" v-model="signUp.email">
            </div>
        </div>
        <div class="form-group">
            <!--<label for="inputPassword3" class="col-sm-2 control-label">密码</label>-->
            <div class="col-sm-12">
             <input v-model="signUp.password" type="password" class="form-control" id="inputPassword3" placeholder="输入密码">
            </div>
        </div>
  
        <div class="form-group">
         <div class="col-sm-offset-2 col-sm-10">
            <button type="submit" class="btn btn-default loginButton">提交</button>
            <button type="submit" class="btn btn-default"><router-link to="/login">去登陆</router-link></button>
         </div>
        </div>
    </form>
    
    
        <!--<form action="" class="form" @submit.prevent="onSignUp">-->
            <!--<h2>注册</h2>-->
            <!--<router-link to="/">关闭</router-link>-->
            <!--<div class="row">-->
                <!--<label for="">邮箱</label>-->
                <!--<input type="text" v-model="signUp.email">-->
            <!--</div>-->
            <!--<div class="row">-->
                <!--<label for="">密码</label>-->
                <!--<input type="password" v-model="signUp.password">-->
            <!--</div>-->
            <!--<div class="actions">-->
                <!--<button type="submit">提交</button>-->
                <!--<router-link to="/login">登陆</router-link>-->
            <!--</div>-->
        <!--</form>-->
    </div>
`
}
Vue.component('signUp',window.SignUp)   //注册组件，注册之后就可以在html里随便写了