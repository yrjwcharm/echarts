import { Input, Checkbox, Radio, Form, Switch, ColorPicker } from 'antd';
import { useContext, useEffect, useState } from 'react';
import styles from './chartsOptions.less';
import { c } from '../docs';
const Options = () => {
    let mapList = []
    const { options, setOptions, optList } = useContext(c)
    const change = (e: any, item) => {
        if (item.type === 'Input') {
            const { value } = e.target
            setOptions({ ...options, [item.name]: value })
        } else if (item.type === 'Switch') {
            setOptions({ ...options, [item.name]: e })
        } else if (item.type === 'ColorPicker') {
            console.log(e.metaColor, "e.metaColor")
            setOptions({
                ...options, [item.name]: '#' + e.metaColor.toHex()
            })
            console.log(options, "options")
        }

    }
    const setMapList = () => {
        mapList = []
        for (let i in optList) {
            console.log(optList[i], "iiiiiiiiii")
            optList[i].forEach(item => {
                if (item.type == 'Input') {
                    mapList.push(<div key={i}><div>{item.label}</div><Input placeholder="title" value={options.title} onChange={(e) => { change(e, item) }} /></div>)
                } else if (item.type == 'Switch') {
                    mapList.push(<div key={i}><div>{item.label}</div> <Switch defaultChecked value={options.legendShow} onChange={(e) => { change(e, item) }} /></div>)
                } else if (item.type == 'ColorPicker') {
                    mapList.push(<div key={i}><div>{item.label}</div> <ColorPicker showText defaultFormat="hex" value={options.xaxisLineColor} onChange={(e) => { change(e, item) }} /></div>)

                }
            });
        }
    }
    useEffect(() => {
        setMapList()
    }, [optList])

    return (
        <div className={styles.box}>
            {
                mapList

                optList.forEach(item => {
                    if (item.type == 'Input') {
                mapList.push(<div key={i}><div>{item.label}</div><Input placeholder="title" value={options.title} onChange={(e) => { change(e, item) }} /></div>)
            } else if (item.type == 'Switch') {
                mapList.push(<div key={i}><div>{item.label}</div> <Switch defaultChecked value={options.legendShow} onChange={(e) => { change(e, item) }} /></div>)
            } else if (item.type == 'ColorPicker') {
                mapList.push(<div key={i}><div>{item.label}</div> <ColorPicker showText defaultFormat="hex" value={options.xaxisLineColor} onChange={(e) => { change(e, item) }} /></div>)

            }
                });
            }
            {/* <Input placeholder="title" name="title" value={options.title} onChange={change} />
            <Switch defaultChecked value={options.legendShow} onChange={legendChange} />
            <Switch defaultChecked value={options.tooltipShow} onChange={tooltipChange} />
            <Input placeholder="宽度" name="width" value={options.width} onChange={change} />
            <Input placeholder="高度" name="height" value={options.height} onChange={change} /> */}
        </div >
    )
}
export default Options 