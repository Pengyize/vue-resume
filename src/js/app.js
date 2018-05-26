let app = new Vue({
    el: '#app',
    data: {
        editingName: false,
        loginVisible: false,
        signUpVisible: false,
        resume: {
            name: '姓名',
            gender: '女',
            birthday: '1996年5月25',
            jobTitle: '前端工程师',
            phone: '123456789',
            email: '123@qq.com'
        }
    },
    methods: {
        onEdit(key, value) {
            this.resume[key] = value;
            console.log('app', app.resume);
        },
        onClickSave() {
            let currentUser = AV.User.current();
            if (!currentUser) {
                this.loginVisible = true

            }
            else {
            }
        },


    }
});