$(document).ready(function(){
    var ip1 = 'http://172.17.99.114:10014/api/jp-BSO-Order-ms/bus_instructions/getCountBystationId';
    var ip2 = 'http://172.17.99.114:10014/api/jp-BSO-Order-ms/bus_instructions/getCountListBystationId'
		$.ajax({
            type: 'GET',
            dataType:"json",
			url: ip1,
			data: {
                "stationId":"9BECB65D-4E52-4039-993B-369DAA145EAF",
                "stationType":"ALL",
                
				// "userID":"05CDCA8F-B3F4-4DF6-BAD0-F51D2CEAFDA6",
			},
			success:function(req){   
            
                console.log(req);
                console.log(req[1]);         
                myChart.setOption({
                    series:{
                        data:[
                        {value:req[2].count, name:'案件指令'},
                        {value:req[4].count, name:'重点人指令'},
                        {value:req[1].count, name:'网情指令'},
                        {value:req[0].count, name:'警情指令'},  
                    ],
                    }
                    
                });

			}
        })
        $.ajax({
            type: 'GET',
            dataType:"json",
            url: ip2,
            aysnc:true,
			data: {
                "stationId":"9BECB65D-4E52-4039-993B-369DAA145EAF",
                "stationType":"ALL",
                "pageNum":'1',
                "pageSize":"13"
				// "userID":"05CDCA8F-B3F4-4DF6-BAD0-F51D2CEAFDA6",
			},
			success:function(req){   
                var jq = [];
                var aj = [];
                var zdr = [];
                var wq = [];
                console.log(req);
                console.log(req.list)
                var msg = req;
                for(var i = 0; i < req.list.length; i++){
                    jq.push(req.list[i].jqCount);
                    aj.push(req.list[i].ajCount);
                    zdr.push(req.list[i].zdrCount);
                    wq.push(req.list[i].wqCount);
                }
                myChart2.setOption({
                    series:[
                        {name:'警情指令',data:jq},
                        {name:'案件指令',data:aj},
                        {name:'重点人指令',data:zdr},
                        {name:'网情指令',data:wq},
                    ]
                })                     
			}
        })
})
var vm = new Vue({
    el:'.out-ul',
    data:{
        list:["事件处置","研判预警","基础管控","决策指挥","事件归档","舆情应对"],
        list1:["数据","数据","数据","数据"]
    },
    methods:{
        show:function(ev){
            var el = ev.target;
            if(!$(el).hasClass('on')){
                $(el).addClass('on');
                $(el).parent().find('.in-ul').slideDown().parent().siblings().find('.in-ul').slideUp();
            }else{
                $(el).removeClass('on');
                $(el).parent().find('.in-ul').slideUp();
            }
        },     
    }
        
})

var vm1 = new Vue({
    el:'.posi',
    data:{
        list:["警情","案件","重点人","网情"],
        look:false,
    },
    methods:{
        show(){
            this.look = !this.look;
        },
        changeli(i){
            var inp = document.getElementsByClassName('ulli')[0];
            var el = document.getElementsByClassName('listLi')[i];
            inp.setAttribute('value',el.innerHTML);
            this.look = !this.look;
        }
    }
})

    var dom = document.getElementById("container");
    var myChart = echarts.init(dom);
    var app = {};
    option = null;
    option = {
    title : {
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
    orient: 'vertical',
    
    x:"50px",
    y:"50px",
    data: [
        {
            name:'案件指令',
            textStyle:{
                color:"white"}},
        {
            name:'重点人指令',
            textStyle:{
                color:"white"}},
        {
            name:'网情指令',
            textStyle:{
                color:"white"}},
        {
            name:'警情指令',
            textStyle:{
                color:"white"}},
                ]
    },
    series : [
    {
        name: '访问来源',
        type: 'pie',
        radius : '50%',
        center: ['50%', '50%'],
        data:[
            {value:100, name:'案件指令'},
            {value:100, name:'重点人指令'},
            {value:100, name:'网情指令'},
            {value:100, name:'警情指令'},  
        ],
        itemStyle: {
            emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        }
    }
    ],
    color:["rgb(0,255,255)","rgb(216,138,255)","rgb(255,195,3)","rgb(52,162,251)"],
    };
    
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }


//右侧柱状图
var dom2 = document.getElementById("container2");
var myChart2 = echarts.init(dom2);
var app2 = {};
option = null;
app2.title = '堆叠条形图';

option = {
    // title:{
    //     text:"主标题",
    //     show:"true",
    //     textStyle:{
    //         color:"#ccc",
    //         align:"center",
    //         verticalAlign:"center",
    //     },
    //     subtext:'副标题',
    //     subtextStyle:{
    //         color:"red",
    //     },
    //     left:"50%",
    // },
    
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {
        data: [{
            name:"警情指令",
            borderRadius:[2,2,5,5]
        }, '案件指令','重点人指令','网情指令'],
        top:"50px",
        //图例列表的布局朝向，默认水平
        orient:"horizontal",
       //图例选择模式，通过点击图例改变系列的显示状态,默认为true
       selectedMode:true,
       //图例关闭时颜色，默认#ccc
       inactiveColor:'#ccc',
        textStyle:{
            color:'white',
            // borderWidth:'5px',
            // borderColor:'red',
            // borderRadius:"2px"
        },
        
        // formatter:function(data){
        //     return 'legend'+data;
        // }

    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis:  {
        type: 'category',
        splitLine:{
            show:false
        },
        axisLabel:{
            textStyle:{
                color:"white"
            },
            
        },
        axisLine:{
            lineStyle:{
                type:'solid',
                color:"#2ca1d3",
                width:"1"
            }
        },
        data: ['指挥','情报','网安','宣传','技侦','刑侦','消防','信通','反恐','国保','法制','治安','特警']
    },
    yAxis: {
        type:"value",
        // data:[250,500,750,1000,1250]  
        splitLine:{
            show:false
        },
        axisLabel:{
            textStyle:{
                color:"white"
            },
            
        },
        axisLine:{
            lineStyle:{
                //y轴宽度
                type:'solid',
                color:"#2ca1d3",
                width:"1"
            }
        },
    },
    series: [
        {
            name: '警情指令',
            type: 'bar',
            stack: '总量',
            label: {
                normal: {
                    show: false,
                    position: 'insideRight'
                }
            },
            data: [510, 350, 400, 400, 370, 280, 270,260,280,270,260,250,150]
        },
        {
            name: '案件指令',
            type: 'bar',
            stack: '总量',
            label: {
                normal: {
                    show: false,
                    position: 'insideRight'
                }
            },
            data: [200,300, 200, 200, 220, 230, 200,150,200,150,150,150,100]
        },
        {
            name: '重点人指令',
            type: 'bar',
            stack: '总量',
            label: {
                normal: {
                    show: false,
                    position: 'insideRight'
                }
            },
            data: [200, 120,120, 120, 80, 120,120,250,80,80,80,80,80]
        },
        {
            name: '网情指令',
            type: 'bar',
            stack: '总量',
            label: {
                normal: {
                    show: false,
                    position: 'insideRight'
                }
            },
            data: [150,180,180,130,130, 110,130,70,70,130,130,130,100]
        },
    ],
    color:["rgb(0,255,255)","rgb(216,138,255)","rgb(255,195,3)","rgb(52,162,251)"],
};;
if (option && typeof option === "object") {
    myChart2.setOption(option, true);
}



