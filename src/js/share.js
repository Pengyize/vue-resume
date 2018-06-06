Vue.component('share',{
    props:['sharelink'],
    template:`
<div v-cloak class="modal fade share" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="myModalLabel">复制链接进行分享</h4>
            </div>
            <div class="shareLink modal-body">
                {{sharelink}}
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
`
})
