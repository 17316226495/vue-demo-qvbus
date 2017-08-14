/images/icon_compile.png<template>
    <div class="div_passenger">
      <div class="person">
      <div class="div_top">第一次乘车请添加乘车人信息</div>
        <div class="finish" @click="finish">
          <img src="../assets/images/row.png">
        </div>
      </div>
      <div class="div_group">
        <template v-for="personItem in personInfo">
        <div class="group" v-longTap>
        <div class="div_personGroup">
          <div @click="selectPerson">
            <img src="../assets/images/icon_unselected.png" class="radio" :data-id="personItem.id">
          </div>
          <div>{{personItem.username}}</div>
          <div>{{personItem.carid}}</div>
          <router-link :to="{name:'AddPerson',params:{id:personItem.id,idCard:personItem.carid,phone:personItem.phone,username:personItem.username}}">
          <div>
            <img src="../assets/images/icon_compile.png" class="write">
          </div>
          </router-link>
        </div>
        </div>
        </template>
      </div>
      <!--params:{id:''} 不能传‘’空 至少要传个值-->
      <router-link :to="{name:'AddPerson',params:{id:'null',idCard:'null',phone:'null',username:'null'}}">
      <div class="add_icon">
        <img src="../assets/images/add.png">
      </div>
      </router-link>
     </div>

</template>
<script>
  import $ from 'webpack-zepto'
  export default{
    data(){
      return{
        ids:'',
        price:"",
        lineid:"",
        carnumber:"",
        selectedPersonid:[],
        personInfo:[
          {"username":"\u5f90\u6167","type":1,"carid":"411424199303183365","id":1,"phone":"17316226495"},
          {"username":"\u5f90\u5c0f","type":1,"carid":"411424199103183365","id":2,"phone":"17316226493"},
          {"username":"\u5f90\u5dde","type":1,"carid":"411424199503183365","id":3,"phone":"17316226491"}
        ]
      }
    },
    created(){
    this.getParams();
    },
    directives:{//自定义指令
      longTap(el,binging){//长按指令
        var oDiv = el,
          z = 0,
          timer = null;
        oDiv.addEventListener("touchstart", function(e) {
          if (e.touches.length > 1) {
            return false;
          }
          z = 0;
          timer = setTimeout(function() {//大于0.5秒就代表长按
            z = 1;
          }, 500);
//          e.preventDefault();//阻止冒泡之后，小笔的编辑状态就点无法点击
        });
        document.addEventListener("touchmove", function(e) {
            clearTimeout(timer);
        });
        document.addEventListener("touchend", function(ev) {
          if (z != 1) {
            clearTimeout(timer);
            return false;
          } else {//z=1的时候就代表长按了
            z = 0;
            alert("是否删除该用户")
            //console.log("长按了啊"+binging.name);//写长按删除的功能
            //调取后台接口 传要删除的id 重新赋值
          }
        });
      }
    },
    methods:{
      getParams(){
        this.ids=this.$route.params.ids.split(",");//用，转化成数组
        this.price=this.$route.params.price;
        this.lineid=this.$route.params.lineid;
        this.carnumber=this.$route.params.carnumber;
      },
      selectPerson(){
        var childnode=$(event.currentTarget).find("img");
        if(childnode.attr("src")==require("../assets/images/icon_unselected.png")){
          childnode.attr('src',require("../assets/images/icon_selected.png"));//使用require vue里面使用的是base64位的格式
        }else{
          childnode.attr('src',require("../assets/images/icon_unselected.png"));//使用require vue里面使用的是base64位的格式
        }
      },
      selectedPersonId(){//查找所有被选中的id 放到一个数组里面
        var selectedArr=$(".radio");
        var selectPersonarr=[];
        for (var i=0;i<selectedArr.length;i++){
          if(selectedArr.eq(i).attr("src")==require("../assets/images/icon_selected.png")){
            selectPersonarr.push(selectedArr.eq(i).attr("data-id")+":"+this.ids[i])
          }
        }
        this.selectedPersonid=selectPersonarr;
      },
      finish(){
        this.selectedPersonId();
        var ids=this.ids;
        var select=this.selectedPersonid;
        if(ids.length!=select.length){
          alert("请选择"+ids.length+"个乘客！")
        }else if(ids.length==0){
          alert("请选择乘客人！")
        }else{
          var amount=ids.length*this.price;
          this.$router.push({name:'ScanResult',params:{appointment:'yes',amount:amount,carnumber:this.carnumber,producelineid:this.lineid,contratid:this.selectedPersonid+""}});
        }

      },
    }
  }
</script>
<style lang="scss" type="text/css" rel="stylesheet/scss">
  .div_passenger{
    width: 100%;
    height: 100vh;
    background: #f2f2f2;
    font-size: 1.6rem;
    .finish,.add_icon{
      height:3rem;
      width:3rem;
      line-height:3rem;
      text-align:center;
      color:#fff;
      border-radius:50%;
      background:#f15a48;
    }
    .finish{
      position:absolute;
      right:1.5rem;
      top:0.65rem;
      img{
        width:1.8rem;
        height:1.8rem;
        margin:0 auto;
        display:flex;
        margin-top:0.6rem;
      }
    }
    .add_icon{
    margin-left:5%;
    margin-top:1.3rem;
      img{
        width:1.8rem;
        height:1.8rem;
       margin-top: 0.6rem;
      }
     }
    .person{
      z-index:100;
      position:fixed;
      width:100%;
      background:#f0f0f0;
      height:4.5rem;
      line-height:4.5rem;
      .div_top{
        width: 80%;
        margin:0.5rem 0 0.5rem 5%;
        border:1px solid #d0d1d3;
        height:3.2rem;
        line-height:3.2rem;
        font-size:1.5rem;
        text-indent:1.5rem;
        color:#14293a;
      }
    }
    .div_group{
      padding-top: 5.5rem;
    }
    .group{
      width: 100%;
      height: auto;
      border-bottom:1px solid #d0d1d3;
      background: #fff;
    }
    .div_personGroup{
      width: 90%;
      height:4rem;
      display: flex;
      flex-wrap: nowrap;
      justify-content: space-between;
      margin: 0 auto;
      div{
        line-height: 4rem;
        min-width: 3.2rem;
        text-align: center;
      }
      .radio{
        width: 1.5rem;
      }
      .write{
        width: 2.1rem;
      }
    }
  }
</style>
