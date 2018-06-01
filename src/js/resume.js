Vue.component('resume',{
    props:['mode','displayresume', 'resume'],
    data(){
        return{
        }
    },
    methods:{
        addSkill(){
            this.resume.skills.push({name:'请填写技能名称', description:'请填写描述'});
        },
        removeSkill(index){
            this.resume.skills.splice(index,1)
        },
        addProject(){
            this.resume.projects.push(
                {name: '请填写项目名称', link: 'http://pengyize.top',  description: '请详细描述'}
            );
        },
        removeProject(index){
            this.resume.projects.splice(index,1)
        },
        onEdit(key, value) {
            // this.resume[key] = value;
            let regex = /\[(\d+)\]/g
            key = key.replace(regex, (match, number)=> `.${number}`)
            let keys = key.split('.');
            console.log('this.props',this.resume)
            let result = this.resume;
            for(let i=0;i<keys.length;i++){
                if(i === keys.length -1){
                    result[keys[i]] = value;
                }else{
                    result = result[keys[i]];
                }
                //result = this.resume
                //keys = ['skills', '0', 'name']
                //i=0 result === result['skills'] === this.resume.skills
                //i=1 result === result['0'] === this.resume.skills.0
                //i=2 result === result['name'] === this.resume.skills.0.name
                //result === this.resume['skills']['0']['name']
            }
        },
    },
    template:`
<div class="container-fluid">
    <div class="resume">
            <section class="profile">
            <div class="row">
                <div class="col-md-12" >
                   <h1><editable-span :disabled="mode === 'preview'"  :value="displayresume.name" @edit="onEdit('name',$event)"></editable-span></h1>
                </div>
            </div>
            
            <div class="row">
                <div class="col-md-12" >
                    <p class="info">应聘职位：<editable-span :disabled="mode === 'preview'"  :value="displayresume.jobTitle" @edit="onEdit('jobTitle',$event)"></editable-span></p>
                </div>
            </div>

            <div class="row">
               <div class="col-md-12 ">
                <p class="profile">
                    年龄：<editable-span class="info" :disabled="mode === 'preview'"  :value="displayresume.birthday" @edit="onEdit('birthday',$event)"></editable-span>
                    <span class="split">|</span>
                    性别：<editable-span class="info" :disabled="mode === 'preview'"  :value="displayresume.gender" @edit="onEdit('gender',$event)"></editable-span>
                    <span class="split">|</span>
                    邮箱：<editable-span class="info" :disabled="mode === 'preview'"  :value="displayresume.email" @edit="onEdit('email',$event)"></editable-span>
                    <span class="split">|</span>
                    手机：<editable-span class="info" :disabled="mode === 'preview'"  :value="displayresume.phone" @edit="onEdit('phone',$event)"></editable-span>
                </p>
                </div>
            </div>
            </section>
            
            <section class="skills">
            <div class="row">
            <div class="col-md-12" >
                <h2>技能</h2>
            </div>
            </div>
            
            <ul>
                <div class="row">
                <li v-for="skill,index in displayresume.skills">
                
                <div class="col-md-6" >
                <div class="wrapper">
                    <editable-span :disabled="mode === 'preview'"  :value="skill.name" class="name" @edit="onEdit('skills[' + index + '].name',$event)"></editable-span>
                    
                    <div class="description">
                        <editable-span :disabled="mode === 'preview'"  :value="skill.description" @edit="onEdit('skills[' + index + '].description',$event)"></editable-span>
                    </div>
                    
                    <span class="remove" v-if="index >= 4 && mode === 'edit'" @click="removeSkill(index)">
                        <span class="glyphicon glyphicon-remove" aria-hidden="true" ></span>
                    </span>
                </div>
                </div>

                </li>
                
                <div class="col-md-12">
                <li v-if="mode === 'edit'" class="add">
                    <span @click="addSkill" class="btn btn-primary">添加技能</span>
                </li>
                </div>
                </div>
            </ul>
            </section>
            
            <section class="projects">
            <div class="row">
                <div class="col-md-12" >
                <h2>项目经历</h2>
                </div>
            </div>
            
            <ol>
            <div class="row">
                <li v-for="project,index in displayresume.projects">
                    <div class="col-md-6">
                    <div class="wrapper">
                        <header>
                            <div class="start">
                                <h3 class="name" style="margin-top: 0;">
                                    <editable-span :disabled="mode === 'preview'"  :value="project.name" @edit="onEdit('projects[' + index + '].name', $event)"></editable-span>
                                </h3>
                                <span class="link">
                                    <editable-span :disabled="mode === 'preview'"  :value="project.link" @edit="onEdit('projects[' + index + '].link', $event)"></editable-span>
                                </span>
                            </div>
                        </header>
                        <p class="description">
                            <editable-span :disabled="mode === 'preview'" :value="project.description" @edit="onEdit('projects[' + index + '].description', $event)"></editable-span>
                        </p>
                        <span v-if="index >=2 && mode === 'edit'" class="remove" @click="removeProject(index)">
                            <span class="glyphicon glyphicon-remove" aria-hidden="true" ></span>
                        </span>
                    </div>
                    </div>
                </li>
                    
                <div class="col-md-12" >
                    <li v-if="mode === 'edit'" class="add">
                     <span @click="addProject" class="btn btn-primary">添加项目</span>
                    </li>
                </div>
            </div>
            </ol>
            
            </section>
        </div>
</div>
    `
})

