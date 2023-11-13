import * as echarts from 'echarts';
import { useEffect, useRef, useState } from 'react';
import { Input, Checkbox, Radio, Form } from 'antd';
import styles from './chartsOptions.less';
import { enGBIntl, useDebounceValue } from '@ant-design/pro-components';
const EchartsOptions = () => {
    // interface series {
    //     data: Array<number>;
    //     type: string;
    //     [propName: string]: any;
    // }
    // interface options {
    //     title?: { text: string };
    //     tooltip?: object;
    //     xAxis?: { data?: Array<string | number>, type?: string };
    //     yAxis?: { data?: Array<string | number>, type?: string };
    //     series: series[];

    // }
    type EChartsOption = echarts.EChartsOption;
    const barchart = useRef(null)
    const [options, setOptions] = useState<EChartsOption>({
        title: {
            text: ''
        },
        tooltip: {},
        xAxis: {
            data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
            {
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }
        ]
    })
    const [style, setStyle] = useState({ width: '100%', height: '200px' })

    const initChart = () => {
        console.log(barchart.current, "barchart.current")
        var chart = echarts.init(barchart.current);
        // 绘制图表
        chart.setOption(options);
        chart.resize();
    }
    // const titleChange = (e: any) => {
    //     console.log(e)
    //     setOptions({ ...options, title: { text: e.target.value } })
    // }
    const optionsChange = (e: any) => {
        const { name, value } = e.target;
        switch (name) {
            case 'type':
                setOptions({ ...options, series: [{ ...options.series[0], [name]: value }] })
                break;
            case 'title':
                setOptions({ ...options, title: { ...options.title, text: value } })
                break;
        }
        console.log(style)

    }
    // const widthChange = (e: any) => {
    //     console.log(e)
    //     setStyle({ ...style, width: e.target.value })
    // }
    const styleChange = (e: any) => {
        const { name, value } = e.target;
        setStyle({ ...style, [name]: value })

    }

    useEffect(() => {
        initChart()
        console.log('修改', style)
    }, [style, options])
    return (
        <div>
            <div ref={barchart} style={{ width: style.width, height: style.height }}></div>
            <div className={styles.box}>
                <Radio.Group name="type" onChange={optionsChange} value={options.series[0].type}>
                    <Radio value={'bar'}>柱状图</Radio>
                    <Radio value={'pie'}>饼状图</Radio>
                    <Radio value={'line'}>折线图</Radio>
                </Radio.Group>
                <Input placeholder="title" name="title" value={options.title!.text} onChange={optionsChange} />
                <Input placeholder="宽度" name="width" value={style.width} onChange={styleChange} />
                <Input placeholder="高度" name="height" value={style.height} onChange={styleChange} />
            </div>
            {/* <div style={{ width: style.width, height: style.height, background: 'red' }}></div> */}

        </div>
    )
}
export default EchartsOptions