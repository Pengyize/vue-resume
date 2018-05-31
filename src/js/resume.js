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
                {name: '请填写项目名称', link: 'http://...', keywords: '请填写关键词', description: '请详细描述'}
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
    <div class="resume">
            <section class="profile">
                <h1>
                    <editable-span :disabled="mode === 'preview'"  :value="displayresume.name" @edit="onEdit('name',$event)"></editable-span>
                </h1>

                <p>应聘职位：<editable-span :disabled="mode === 'preview'"  :value="displayresume.jobTitle" @edit="onEdit('jobTitle',$event)"></editable-span></p>
                
                <p class="profile">
                    年龄：<editable-span :disabled="mode === 'preview'"  :value="displayresume.birthday" @edit="onEdit('birthday',$event)"></editable-span>
                    |
                    性别：<editable-span :disabled="mode === 'preview'"  :value="displayresume.gender" @edit="onEdit('gender',$event)"></editable-span>
                    |
                    邮箱：<editable-span :disabled="mode === 'preview'"  :value="displayresume.email" @edit="onEdit('email',$event)"></editable-span>
                    |
                    手机：<editable-span :disabled="mode === 'preview'"  :value="displayresume.phone" @edit="onEdit('phone',$event)"></editable-span>
                </p>
            </section>
            <section class="skills">
                <h2>技能</h2>
                <ul>
                    <li v-for="skill,index in displayresume.skills">
                        <editable-span :disabled="mode === 'preview'"  :value="skill.name" class="name" @edit="onEdit('skills[' + index + '].name',$event)"></editable-span>
                        <div class="description">
                            <editable-span :disabled="mode === 'preview'"  :value="skill.description" @edit="onEdit('skills[' + index + '].description',$event)"></editable-span>
                        </div>
                        <span class="remove" v-if="index >= 4 && mode === 'edit'" @click="removeSkill(index)">x</span>
                    </li>
                    <li v-if="mode === 'edit'" class="add">
                        <span @click="addSkill">添加</span>
                    </li>
                </ul>
            </section>
            <section class="projects">
                <h2>项目经历</h2>
                <ol>
                    <li v-for="project,index in displayresume.projects">
                        <header>
                            <div class="start">
                                <h3 class="name">
                                    <editable-span :disabled="mode === 'preview'"  :value="project.name" @edit="onEdit('projects[' + index + '].name', $event)"></editable-span>
                                </h3>
                                <span class="link">
                                    <editable-span :disabled="mode === 'preview'"  :value="project.link" @edit="onEdit('projects[' + index + '].link', $event)"></editable-span>

                                </span>
                            </div>
                            <div class="end">
                                <span class="keywords">
                                    <editable-span :disabled="mode === 'preview'" :value="project.keywords" @edit="onEdit('projects[' + index + '].keywords', $event)"></editable-span>
                                </span>
                            </div>
                        </header>
                        <p class="description">
                            <editable-span :disabled="mode === 'preview'" :value="project.description" @edit="onEdit('projects[' + index + '].description', $event)"></editable-span>
                        </p>
                        <span v-if="index >=2 && mode === 'edit'" class="remove" @click="removeProject">x</span>
                    </li>
                    <li v-if="mode === 'edit'" class="add">
                        <span @click="addProject">添加</span>
                    </li>
                </ol>
            </section>
        </div>
    `
})

