Vue.component('share',{
    props:['sharelink'],
    template:`
    <div class="share" v-cloak>
        <h2>请将以下链接分享给面试官</h2>
        <textarea readonly cols="30" rows="10">{{sharelink}}</textarea>
    </div>`
})