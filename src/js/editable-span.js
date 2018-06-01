Vue.component('editable-span',{
    props: ['value', 'disabled'],
    template: `
        <span class="editableSpan">
            <span class="fullName" v-show="!editing" >{{value}}</span>
            <input v-show="editing" type="text" :value="value" @input="triggerEdit" >
            <span @click="editing = !editing" v-if="!disabled" class="glyphicon glyphicon-edit" aria-hidden="true"></span>
        </span>
        `,
    data(){
        return {
            editing: false
        }
    },
    methods: {
        triggerEdit(e){
            this.$emit('edit',e.target.value)
        },
        onEditing(){
            this.editing = true;
        }
    }
});