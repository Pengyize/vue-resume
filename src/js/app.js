window.App = {
    props: ['displayresume', 'mode', 'resume', 'logoutvisible'],
    template:`
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-2">
                <app-aside   v-show="mode === 'edit'" :logoutvisible="logoutvisible" @logout="$emit('logout')"  @save="$emit('save')" @share="$emit('share')" @print="print" @skin="$emit('skin')"></app-aside>
            </div>
            
            <div class="col-md-10" id="main">
                <main><resume :resume="resume" :mode="mode" :displayresume="displayresume" ></resume></main>
            </div>
        </div>
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
        }
    },
    methods:{
        print(){
            window.print()
        },
    },


}


Vue.component('app',App)



