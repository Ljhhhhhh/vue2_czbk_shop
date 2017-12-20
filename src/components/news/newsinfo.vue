<template>
  <div id="tmpl">
    <h3 v-text="list[0].title"></h3>
      <p v-text="list[0].ctime"></p>
      <img :src="list[0].picUrl">
      <p v-text="content"></p>
      <comment :id="id"></comment>
  </div>
</template>
<script>
import config from '../../common/config.js';
import comment from '../subcom/comment.vue';
export default {
    components:{
        comment
    },
	data(){
		return {
            list:[
                {
                    title:'',
                    ctime:'',
                    picUrl:''
                }
            ],
			id:0,
            content:''
		}
	},
	created(){
		this.id=this.$route.params.id;
        this.getinfo();
	},
    methods:{
        getinfo(){
            let url=config.apiurl+config.apiit+'?key='+config.apikey+'&num=1';
            this.$http.get(url).then(function(response) {
                let data = response.body;
                if (data.code != 200) {
                    Toast(data.msg);
                    return;
                }
                this.list = data.newslist;
                console.log(this.list[0].url)
                
            });

        }
    }
}
</script>
<style scoped>
</style>
