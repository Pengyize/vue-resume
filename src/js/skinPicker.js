Vue.component('skinPicker',{
    methods:{
        setTheme(name){
            document.body.className = name
        }
    },
    template: `
<div v-cloak class="skinPlicker modal fade" id="mySkin" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="myModalLabel">换肤</h4>
            </div>
            <div class="modal-body">
                <button @click="setTheme('default')" type="button" class="btn btn-primary" data-toggle="button" aria-pressed="false" autocomplete="off">
                    默认配色
                </button>
                <button @click="setTheme('dark')" type="button" class="btn btn-primary" data-toggle="button" aria-pressed="false" autocomplete="off">
                    暗黑配色
                </button>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>


<!--<div class="skinPlicker modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">-->
  <!--<div class="modal-dialog modal-sm" role="document">-->
    <!--<div class="modal-content">-->
      <!---->
    <!--</div>-->
  <!--</div>-->
<!--</div>-->
    <!--<div class="skinPlicker" v-cloak>-->
        <!--<button @click="setTheme('default')">默认</button>-->
        <!--<button @click="setTheme('dark')">暗黑</button>-->
    <!--</div>-->
`
})