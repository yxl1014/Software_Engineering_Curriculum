var $eo = {
    getLengend1: function (data) {
        return {
            show: true,
            top: '5%',
            itemWidth: 10,
            itemHeight: 10,
            right: '1%',
            orient: 'horizontal',
            textStyle: {
                color: '#d5d5d5',
                fontSize: 14
            },
            data: data
        };
    },
    getXAxis1: function (data) {
        return {
            type: 'category',
            data: data,
            axisLine: {
                lineStyle: {
                    color: "#244163"
                }
            },
            axisLabel: {
                // rotate: 30,
                // interval: 0,
                color: "#dbe1de"
            },
            axisTick: {
                show: false,
            }
        }
    },
    getYAxis1: function (name, obj) {
        var o = {
            type: 'value',
            name: name,
            nameTextStyle: {
                color: "#8c908e"
            },
            nameGap: 10,
            axisLabel: {
                color: "#b7bcb9"
            },
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            splitLine: {
                lineStyle: {
                    color: "#343434",
                    type: "dashed"
                }
            }
        };
        if (obj) {
            for (var k in obj) {
                o[k] = obj[k];
            }
        }
        return o;
    }
};
$eo.rowBars = function (param) {
    var label = {
        show: true,
        position: "right",
        color: "#fff",
        fontSize: 14,
        formatter: function (o) {
            return o.value + param.unit;
        }
    };
    var series = [];
    var color = [];
    param.legendData.forEach(function (value, i) {
        series.push({
            name: value,
            type: 'bar',
            label: label,
            barMaxWidth: "40%",
            data: param.seriesData[i]
        });
        color.push({
            type: 'linear',
            x: 0,
            y: 0.5,
            x2: 1,
            y2: 0.5,
            colorStops: [{
                offset: 0, color: param.color[i][0] // 0% 处的颜色
            }, {
                offset: 1, color: param.color[i][1] // 100% 处的颜色
            }],
        });
    })
    return {
        color: color,
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: $eo.getLengend1(param.legendData),
        grid: {
            left: '1%',
            right: '10%',
            bottom: '1%',
            containLabel: true
        },
        xAxis: {
            show: false
        },
        yAxis: {
            type: 'category',
            data: param.yAxisData,
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            },
            axisLabel: {
                color: "#fff",
                fontSize: 14
            }
        },
        series: series
    };
};
$eo.lines = function (param) {
    var yAxisIndex = param.yAxisIndex;
    var series = [];
    param.seriesData.forEach(function (value, i) {
        series.push({
            name: param.legendData[i],
            data: value,
            type: 'line',
            smooth: true,
            yAxisIndex: yAxisIndex ? yAxisIndex[i] : 0,
            lineStyle: {
                color: param.color[i],
                width: 3
            },
            symbolSize: 6,
            symbol: 'circle',
            itemStyle: {
                color: param.color[i],
                borderWidth: 0.4,
                borderColor: '#fff',
            },
            areaStyle: {
                opacity: 0.8,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: param.areaColor[i][0]
                }, {
                    offset: 1,
                    color: param.areaColor[i][1]
                }])
            },
            emphasis: {
                focus: 'series'
            },
        });
    });
    return {
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: $eo.getLengend1(param.legendData),
        xAxis: $eo.getXAxis1(param.xAxisData),
        yAxis: yAxisIndex ? [$eo.getYAxis1(param.unit[0]), $eo.getYAxis1(param.unit[1], {splitLine: {show: false}})] : $eo.getYAxis1(param.unit),
        grid: {
            bottom:'8%',
            right:'0%',
            left:'0%',
            containLabel: true
        },
        series: series
    };
}

// 参保率配置
$eo.getCblOption = function (data) {
    var val = data.value;  //值为百分比  如 0.4 形式
    var option = {
        series: [
            {
                name: '',
                type: 'pie',
                radius: ['65%', '80%'],
                avoidLabelOverlap: false,
                label: {
                    show: true,
                    position: 'center',
                    formatter: function () {
                        return "{a|" + parseInt(val*100) + "%}\n{b|" + data.name + "}";
                    },
                    rich: {
                        a: {
                            fontSize: 18,
                            color: "#fff",
                            fontWeight: 700,
                            height: "28"
                        },
                        b: {
                            fontSize: 14,
                            color: "#88C9FA",
                        }
                    }
                },
                itemStyle: {
                    color: data.color[0]
                },
                emphasis: {
                    label: {
                        show: false,
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    {value: 1, name: ''},
                ]
            },
            {
                name: '',
                type: 'pie',
                radius: ['73%', '90%'],
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    position: 'center'
                },
                itemStyle: {
                    color: data.color[1]
                },
                emphasis: {
                    label: {
                        show: false,
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    {value: val, name: ''},
                    { //画中间的图标
                        "name": "",
                        "value": 0.03,
                        labelLine: {
                            show: false
                        },
                        itemStyle: {
                            color: '#ffffff',
                            "normal": {
                                "color": data.color[1],
                                "borderColor": data.color[1],
                                "borderWidth": 6,
                                borderRadius: '100%'
                            },
                        },
                        label: {
                            borderRadius: '50%'
                        },
                        emphasis: {
                            labelLine: {
                                show: false
                            },
                            itemStyle: {
                                color: '#5886f0'
                            },
                        }

                    },
                    {
                        value: 1 - 0.03 - val,
                        name: '',
                        itemStyle: {
                            color: "transparent"
                        }
                    }
                ]
            }
        ]
    }
    return option;
}