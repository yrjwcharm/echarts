/*
 * @Author: yanruifeng xlyanrui@sina.com
 * @Date: 2023-11-10 15:27:49
 * @LastEditors: yanruifeng xlyanrui@sina.com
 * @LastEditTime: 2023-11-10 16:08:50
 * @FilePath: /ChartConfig/src/components/chartconfig/ColorSlider.tsx
 * @Description: 封装颜色选择器组件
 */
// ColorSlider.tsx
import { HuePicker } from "react-color";
import React from "react";
interface SliderProps {
  color?: any;
  onChange?: any;
}

class ColorSlider extends React.Component<SliderProps> {
  state = {
    color: this.props.color,
  };

  handleChange: any = (color: { rgb: any }, event: any) => {
    this.setState({ color: color.rgb }); // update internal state
    this.props.onChange(color, event); // send the new value 'up' to the parent
  };

  render() {
    return <HuePicker color={this.state.color} onChange={this.handleChange} />;
  }
}

export default ColorSlider;
