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
var posList = [
    'left', 'right', 'top', 'bottom',
    'inside',
    'insideTop', 'insideLeft', 'insideRight', 'insideBottom',
    'insideTopLeft', 'insideTopRight', 'insideBottomLeft', 'insideBottomRight'
];
option = {
    color:["rgb(0,255,255)","rgb(216,138,255)","rgb(255,195,3)","rgb(52,162,251)"],
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        data: ['警情指令', '案件指令', '重点人指令', '网情指令'],
        textStyle:{
            color:"white",
        },
        top:"30px"
    },
   
    xAxis: [
        {
            type: 'category',
            axisTick: {
                show: false
            },
            data: ['指挥', '情报','指挥', '情报','指挥', '情报','指挥', '情报','指挥', '情报','指挥', '情报','指挥'],
            axisLabel:{
                textStyle:{
                    color:"white",
                },
        },
        axisLine:{
            lineStyle:{
                type:'solid',
                color:"#2ca1d3",
                width:"1"
            }
        }
        },
       
    ],
    yAxis: [
        {
            type: 'value',
            splitLine:{
                show:false,
            },
            axisLabel:{
                textStyle:{
                    color:"white",
                },
            },
            axisLine:{
                lineStyle:{
                    type:'solid',
                    color:"#2ca1d3",
                    width:"1"
                }
            }
        }
    ],
    series: [
       
        {
            name: '警情指令',
            type: 'bar',
            stack:'未完成jq',
            barGap: 0,
            data: [320, 332, 301, 334, 390,320, 332, 301, 334, 390,320, 332, 301]
        },
        {
            name: '案件指令',
            type: 'bar',
            stack:'未完成aj',
            data: [220, 182, 191, 234, 290,220, 182, 191, 234, 290,220, 182, 191]
        },
        {
            name: '重点人指令',
            type: 'bar',
            stack:'未完成zdr',
            data: [150, 232, 201, 154, 190,150, 232, 201, 154, 190,150, 232, 201]
        },
        {
            name: '网情指令',
            type: 'bar',
            stack:'未完成wq',
            data: [98, 77, 101, 99, 40,98, 77, 101, 99, 40,98, 77, 101]
        },
        {
            name: '警情未完成',
            type: 'bar',
            stack:'未完成jq',
            itemStyle:{
                color:"#ccc",
            },
            // label: labelOption,
            data: [20, 20, 20, 20, 20,20, 20, 20, 20, 20,20, 20, 20]
        },
        {
            name: '案件未完成',
            type: 'bar',
            stack:'未完成aj',
            itemStyle:{
                color:"#ccc",
            },
            // label: labelOption,
            data: [30, 30, 30, 30, 30,30, 30, 30, 30, 30,30, 30, 30]
        },
        {
            name: '重点人未完成',
            type: 'bar',
            stack:'未完成zdr',
            itemStyle:{
                color:"#ccc",
            },
            // label: labelOption,
            data: [40, 40, 40, 40, 40,40, 40, 40, 40, 40,40, 40, 40]
        },
        {
            name: '网情未完成',
            type: 'bar',
            stack:'未完成wq',
            itemStyle:{
                color:"#ccc",
            },
            // label: labelOption,
            data: [20, 20, 20, 20, 20,20, 20, 20, 20, 20,20, 20, 20],

        },
    ]
};
// console.log(option['series'].length);
// var unit = document.getElementsByClassName('ulli')[0];

if (option && typeof option === "object") {
    myChart.setOption(option, true);
}