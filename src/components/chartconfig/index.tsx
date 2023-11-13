/*
 * @Author: yanruifeng xlyanrui@sina.com
 * @Date: 2023-11-09 11:19:45
 * @LastEditors: yanruifeng xlyanrui@sina.com
 * @LastEditTime: 2023-11-10 08:45:16
 * @FilePath: /ChartConfig/src/components/chartconfig/index.tsx
 * @Description: 首页
 */
import { createContext, useMemo, useState } from "react";
import { Button, Modal, Tabs, TabsProps } from "antd";
import styles from "./index.module.less";
import FormSettings from "./FormSettings";
import BarOptions from "../chartsOptions/barChart";
import Options from "../chartsOptions/options";
interface IChartOptions {
  options: any;
  setOptions: any;
  optList: Array<string | number>;
  setOptList: any;
}
export const ChartContext = createContext<IChartOptions>({
  options: {},
  setOptions: null,
  optList: [],
  setOptList: null,
});
const ChartConfig = () => {
  const [optList, setOptList] = useState<any>([]); //chart数据结构
  const [options, setOptions] = useState({
    title: "",
    legendShow: true,
    width: "100%",
    height: "200px",
    tooltipShow: true,
    xaxisLineColor: "#1677ff",
    yaxisLineColor: "#1677ff",
    axisTickLineColor: "#1677ff",
    itemStyleColor: "#1677ff",
    labelColor: "#1677ff",
    labelShow: true,
    xsplitLineShow: true,
    ysplitLineShow: true,
  }); //options配置项
  const showModal = () => setIsModalOpen(true); //显示弹窗
  const handleCancel = () => setIsModalOpen(false); //弹窗是否取消
  const [isModalOpen, setIsModalOpen] = useState(false); //modal弹窗开启状态
  const [config, setConfig] = useState<{ [key: string]: string | number }>({}); // config配置选项
  //初始化根据相关Config配置动态生成Div外观样式
  const style = useMemo(() => {
    const convertColor = (color: any) =>
      typeof color === "string" ? color : color?.hex;
    const [bgColor, startColor, endColor, borderColor, shadowColor] = [
      convertColor(config.backgroundColor),
      convertColor(config.gradientStartColor),
      convertColor(config?.gradientEndColor),
      convertColor(config?.borderColor),
      convertColor(config?.boxShadowColor),
    ];
    let gradient = "";
    if (
      config?.gradientWay &&
      config.gradientDirection &&
      startColor &&
      endColor
    ) {
      const direction = config.gradientDirection || "";
      if (config.gradientWay === "linear") {
        gradient = `${config.gradientWay}-gradient(${direction},${startColor},${endColor})`;
      } else if (config.gradientWay === "radial") {
        gradient = `radial-gradient(${config.gradientShape},${startColor},${endColor})`;
      } else {
        gradient = `${config.gradientWay}-gradient(from ${config.gradientAngle}deg,${startColor},${endColor})`;
      }
    }

    const configStyle = {
      ...(!gradient && bgColor && { backgroundColor: bgColor }),
      ...(config?.transform && { transform: `rotate(${config.transform}deg)` }),
      ...(config?.borderRadius && { borderRadius: `${config.borderRadius}px` }),
      ...(config?.height && { height: `${config.height}px` }),
      ...(config?.width && { width: `${config.width}px` }),
      ...(gradient && { background: gradient }),
      border: `${config?.borderWidth ?? 0}px ${
        config?.borderStyle ?? "solid"
      } ${borderColor || "transparent"}`,
      boxShadow: `${config?.boxShadowHorizontal ?? 0}px ${
        config?.boxShadowVertical ?? 0
      }px ${config?.boxShadowBlurRadius ?? 0}px ${
        config?.boxShadowSpreadRadius ?? 0
      }px ${shadowColor || "transparent"}`,
      ...(config?.transform && { transform: `rotate(${config.transform}deg)` }),
    };
    return configStyle;
  }, [config]);
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "外观设置",
      children: (
        <FormSettings
          updateConfig={(values) => {
            setOptions({
              ...options,
              width: values.width ? `${values.width}px` : options.width,
              height: values.height ? `${values.height}px` : options.height,
            });
            setConfig({ ...config, ...values });
          }}
          handleCancel={handleCancel}
          configProps={config}
        />
      ),
    },
    {
      key: "2",
      label: "Echarts设置",
      children: <Options />,
    },
  ];
  return (
    <ChartContext.Provider value={{ options, setOptions, optList, setOptList }}>
      <>
        <div className={styles.title_config}>
          <Button type="primary" onClick={showModal}>
            Chart配置设置项
          </Button>
        </div>
        <Modal
          footer={null}
          onCancel={handleCancel}
          title="设置"
          open={isModalOpen}
        >
          <Tabs defaultActiveKey="1" items={items} />
        </Modal>
        <div style={style} className={styles.chart_box}>
          <BarOptions
            data={[5, 20, 36, 10, 10, 20]}
            xAxisData={["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]}
          />
        </div>
      </>
    </ChartContext.Provider>
  );
};

export default ChartConfig;
