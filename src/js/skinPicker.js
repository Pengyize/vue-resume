Vue.component('skinPicker',{
    methods:{
        setTheme(name){
            document.body.className = name
        }
    },
    template: `
    <div class="skinPlicker" v-cloak>
        <button @click="setTheme('default')">默认</button>
        <button @click="setTheme('dark')">暗黑</button>
    </div>`
})