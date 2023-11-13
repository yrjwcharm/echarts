import * as echarts from "echarts";
import { useContext, useEffect, useRef, useState } from "react";
import { ChartContext } from "../chartconfig";
const EchartsOptions = (props: any) => {
  type EChartsOption = echarts.EChartsOption;
  const barchart = useRef(null);
  const { options, setOptions, optList, setOptList } = useContext(ChartContext);
  // interface opt {
  //     title?: string,
  //     legendShow?: boolean
  //     tooltipShow?: boolean
  // }
  const opt = [
    { type: "Input", label: "图表名", name: "title" },
    { type: "Input", label: "柱圆角", name: "barborderRadius" },
    { type: "Input", label: "柱宽", name: "barWidth" },
    { type: "Input", label: "图表名", name: "title" },
    { type: "Switch", label: "图表头", name: "legendShow" },
    { type: "Switch", label: "悬浮信息", name: "tooltipShow" },
    { type: "Switch", label: "图上文字是否显示", name: "labelShow" },
    { type: "Switch", label: "横轴分割线", name: "xsplitLineShow" },
    { type: "Switch", label: "纵轴分割线", name: "ysplitLineShow" },
    { type: "ColorPicker", label: "横轴颜色", name: "xaxisLineColor" },
    { type: "ColorPicker", label: "纵轴颜色", name: "yaxisLineColor" },
    { type: "ColorPicker", label: "坐标轴颜色", name: "axisTickLineColor" },
    { type: "ColorPicker", label: "柱颜色", name: "itemStyleColor" },
    { type: "ColorPicker", label: "文字颜色", name: "labelColor" },
  ];
  // const opt = {
  //     title: [
  //         { type: 'Input', label: '图表名', name: 'text' },
  //         { type: 'Switch', label: '图表头', name: 'show' },
  //     ]
  // }
  // {
  //     // const opt: opt = {
  //     title: '默认名称',
  //     legendShow: true,
  //     tooltipShow: true
  // }
  // const [opt, setOpt] = useState<opt>({
  //     title: '默认名称',
  //     legendShow: true,
  //     tooltipShow: true
  // })
  // const [options, setOptions] = useState<EChartsOption>({
  //     title: {
  //         text: ''
  //     },
  //     legend: { show: true },
  //     tooltip: {},
  //     xAxis: {
  //         data: props.xAxisData||['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
  //     },
  //     yAxis: {},
  //     series: [
  //         {
  //             name: '销量',
  //             type: 'bar',
  //             data:props.data||[5, 20, 36, 10, 10, 20]
  //         }
  //     ]
  // })
  const [style, setStyle] = useState({ width: "100%", height: "200px" });

  const initChart = () => {
    setOptList(opt);
    // setOpt({ ...opt, ...options })
    var chart = echarts.init(barchart.current);
    // 绘制图表
    chart.setOption({
      title: {
        text: options.title || "默认名称",
      },
      legend: { show: options.legendShow },
      tooltip: { show: options.tooltipShow },
      xAxis: {
        data: props.xAxisData || [
          "衬衫",
          "羊毛衫",
          "雪纺衫",
          "裤子",
          "高跟鞋",
          "袜子",
        ],
        axisLine: {
          lineStyle: {
            color: options.xaxisLineColor,
          },
        },
        nameTextStyle: {
          color: options.xaxisLineColor,
        },
        splitLine: {
          show: options.xsplitLineShow,
        },
      },
      yAxis: {
        axisLine: {
          lineStyle: {
            color: options.yaxisLineColor,
          },
        },
        splitLine: {
          show: options.ysplitLineShow,
        },
      },
      axisTick: {
        lineStyle: {
          color: options.axisTickLineColor,
        },
      },
      series: [
        {
          name: "销量",
          type: "bar",
          barWidth: options.barWidth - 0,
          data: props.data || [5, 20, 36, 10, 10, 20],
          itemStyle: {
            color: options.itemStyleColor,
            borderRadius: options.barborderRadius - 0 || 0,
          },
          label: {
            show: options.labelShow,
            color: options.labelColor,
          },
        },
      ],
    });
    chart.resize();
  };
  // const titleChange = (e: any) => {
  //     console.log(e)
  //     setOptions({ ...options, title: { text: e.target.value } })
  // }
  const optionsChange = (e: any) => {
    const { name, value } = e.target;
    switch (name) {
      case "type":
        setOptions({
          ...options,
          series: [{ ...options.series[0], [name]: value }],
        });
        break;
      case "title":
        setOptions({ ...options, title: { ...options.title, text: value } });
        break;
    }
  };
  const legendChange = (e: any) => {
    setOptions({ ...options, legend: { ...options.legend, show: e } });
  };
  // const widthChange = (e: any) => {
  //     console.log(e)
  //     setStyle({ ...style, width: e.target.value })
  // }
  const styleChange = (e: any) => {
    const { name, value } = e.target;
    setStyle({ ...style, [name]: value });
  };

  useEffect(() => {
    initChart();
  }, [options]);
  return (
    <div>
      <div
        ref={barchart}
        style={{ width: options.width, height: options.height }}
      ></div>

      {/* <div style={{ width: style.width, height: style.height, background: 'red' }}></div> */}
    </div>
  );
};
export default EchartsOptions;
