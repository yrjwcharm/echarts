/*
 * @Author: yanruifeng xlyanrui@sina.com
 * @Date: 2023-11-07 13:17:38
 * @LastEditors: yanruifeng xlyanrui@sina.com
 * @LastEditTime: 2023-11-13 09:20:22
 * @FilePath: /schneider/src/components/form.tsx
 * @Description: Form表单自定义封装
 */
import { Button, Form, Input, Select, Slider, Space } from "antd";
import React from "react";
import { useEffect, useState } from "react";
import ColorPicker from "./ColorSlider";
interface IFormProps {
  configProps: any; //css属性配置
  updateConfig: (config: any) => void; //更新CSS配置属性
  handleCancel: () => void; //modal取消弹窗
}
const FormSettings = ({
  configProps = {},
  updateConfig,
  handleCancel,
}: IFormProps) => {
  const [form] = Form.useForm(); //form表
  const linearList: { value: string; label: string }[] = [
    { value: "to top", label: "朝上" },
    { value: "to right", label: "朝右" },
    { value: "to bottom", label: "朝下" },
    { value: "to left", label: "朝左" },
  ];
  const radialList = [
    { value: "circle", label: "圆形" },
    { value: "ellipse", label: "椭圆形" },
  ]; //径向渐变List
  const [gradientList, setGradientList] = useState<
    { label: string; value: string }[]
  >([]); //线性渐变List
  //表单提交更新config配置
  const onFinish = (values: any) => {
    //剔除属性值为undefined属性
    let configStyle = values;
    for (const key in configStyle) {
      if (configStyle[key] === undefined) {
        delete configStyle[key];
      }
    }
    //更新样式配置
    updateConfig(configStyle);
    handleCancel();
  };
  useEffect(() => {
    //把相关prop属性映射成对象，然后遍历进行setFieldValues
    const fieldMappings: any = {
      width: "width",
      height: "height",
      backgroundColor: "backgroundColor",
      borderWidth: "borderWidth",
      borderStyle: "borderStyle",
      borderRadius: "borderRadius",
      borderColor: "borderColor",
      gradientShape: "gradientShape",
      gradientStartColor: "gradientStartColor",
      gradientEndColor: "gradientEndColor",
      gradientDirection: "gradientDirection",
      gradientWay: "gradientWay",
      transform: "transform",
      gradientAngle: "gradientAngle",
      boxShadowHorizontal: "boxShadowHorizontal",
      boxShadowVertical: "boxShadowVertical",
      boxShadowBlurRadius: "boxShadowBlurRadius",
      boxShadowSpreadRadius: "boxShadowSpreadRadius",
      boxShadowColor: "boxShadowColor",
    };
    if (configProps) {
      if (configProps.gradientWay === "linear") {
        setGradientList(linearList);
      } else if (configProps.gradientWay === "radial") {
        setGradientList(radialList);
      } else {
        fieldMappings.gradientAngel = "gradientAngle";
      }
      for (const key in fieldMappings) {
        const mapping = fieldMappings[key];
        const value = configProps[key];
        if (value) form.setFieldValue(mapping, value);
      }
    }
  }, [configProps]);

  //选择渐变颜色
  const changeGradientWay = (value: string) => {
    const newGradientList: { value: string; label: string }[] =
      value === "linear" ? linearList : value === "radial" ? radialList : [];
    setGradientList(newGradientList);
  };
  const formItems = [
    {
      label: "宽度",
      name: "width",
      inputType: "number",
      min: 0,
      placeholder: "请输入",
    },
    {
      label: "高度",
      name: "height",
      inputType: "number",
      min: 0,
      placeholder: "请输入",
    },
    {
      label: "背景颜色",
      name: "backgroundColor",
      component: <ColorPicker />,
    },
    {
      label: "渐变方式",
      name: "gradientWay",
      component: (
        <Select placeholder="请选择" onChange={changeGradientWay}>
          <Select.Option value="linear">线性渐变</Select.Option>
          <Select.Option value="radial">径向渐变</Select.Option>
          <Select.Option value="conic">角度渐变</Select.Option>
        </Select>
      ),
    },
    {
      condition: ["linear"],
      label: "渐变方向",
      name: "gradientDirection",
      component: (
        <Select placeholder="请选择">
          {gradientList.map((item, index) => (
            <Select.Option key={index} value={item.value}>
              {item.label}
            </Select.Option>
          ))}
        </Select>
      ),
    },
    {
      condition: ["radial"],
      label: "渐变形状",
      name: "gradientShape",
      component: (
        <Select placeholder="请选择">
          {gradientList.map((item, index) => (
            <Select.Option key={index} value={item.value}>
              {item.label}
            </Select.Option>
          ))}
        </Select>
      ),
    },
    {
      condition: ["conic"],
      label: "渐变角度",
      name: "gradientAngle",
      component: <Input type="number" placeholder="请输入" />,
    },
    {
      label: "开始颜色",
      name: "gradientStartColor",
      component: <ColorPicker />,
    },
    {
      label: "结束颜色",
      name: "gradientEndColor",
      component: <ColorPicker />,
    },
    {
      label: "边框宽度",
      name: "borderWidth",
      inputType: "number",
      min: 0,
      placeholder: "请输入",
    },
    {
      label: "边框颜色",
      name: "borderColor",
      component: <ColorPicker />,
    },
    {
      label: "边框样式",
      name: "borderStyle",
      component: (
        <Select placeholder="请选择">
          <Select.Option value="solid">实线</Select.Option>
          <Select.Option value="dashed">虚线</Select.Option>
          <Select.Option value="dotted">点线</Select.Option>
        </Select>
      ),
    },
    { label: "边框圆角", name: "borderRadius", component: <Slider /> },
    {
      label: "水平偏移",
      name: "boxShadowHorizontal",
      component: <Input type="number" placeholder="请输入" />,
    },
    {
      label: "垂直偏移",
      name: "boxShadowVertical",
      component: <Input type="number" placeholder="请输入" />,
    },
    {
      label: "模糊半径",
      name: "boxShadowBlurRadius",
      inputType: "number",
      min: 0,
      placeholder: "请输入",
    },
    {
      label: "扩展半径",
      name: "boxShadowSpreadRadius",
      inputType: "number",
      min: 0,
      placeholder: "请输入",
    },
    {
      label: "阴影颜色",
      name: "boxShadowColor",
      component: <ColorPicker />,
    },
    {
      label: "旋转角度",
      name: "transform",
      component: <Input type="number" placeholder="请输入" />,
    },
  ];
  return (
    <Form
      form={form}
      onFinish={onFinish}
      labelCol={{ flex: "80px" }}
      labelAlign="left"
      labelWrap
      wrapperCol={{ flex: 1 }}
      colon={true}
      initialValues={{
        borderRadius: 0,
        // backgroundColor: "#1677FF",
        // borderColor: "#1677FF",
        // boxShadowColor: "#1677FF",
        // gradientStartColor: "#1677FF",
        // gradientEndColor: "#1677FF",
      }}
      style={{ maxWidth: 600 }}
    >
      {formItems.map((item, index) => (
        <React.Fragment key={index}>
          {item.condition ? (
            item.condition.includes(form.getFieldValue("gradientWay")) && (
              <Form.Item label={item.label} name={item.name}>
                {item.component}
              </Form.Item>
            )
          ) : (
            <Form.Item label={item.label} name={item.name}>
              {item.component || (
                <Input
                  type={item.inputType}
                  min={item.min}
                  placeholder={item.placeholder}
                />
              )}
            </Form.Item>
          )}
        </React.Fragment>
      ))}
      <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
        <Space>
          <Button type="primary" htmlType="submit">
            应用设置
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default FormSettings;
