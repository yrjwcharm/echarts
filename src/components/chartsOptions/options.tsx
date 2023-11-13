import { Input, Checkbox, Radio, Form, Switch, ColorPicker } from "antd";
import { useContext, useState } from "react";
import styles from "./chartsOptions.less";
import { ChartContext } from "../chartconfig";

const Options = () => {
  const { options, setOptions, optList } = useContext(ChartContext);
  const change = (e: any, item:any) => {
    if (item.type === "Input") {
      const { value } = e.target;
      setOptions({ ...options, [item.name]: value });
    } else if (item.type === "Switch") {
      setOptions({ ...options, [item.name]: e });
    } else if (item.type === "ColorPicker") {
      setOptions({
        ...options,
        [item.name]: "#" + e.metaColor.toHex(),
      });
    }
  };
  return (
    <Form
      style={{ maxWidth: 600 }}
    >
      {optList.map((item:any, i) => {
        if (item.type == "Input") {
          return (
            <Form.Item key={i} label={item.label } name={item.name}>
              <Input value={options[item.name]}
                onChange={(e) => {
                  change(e, item);
                }} min={0} placeholder="请输入" />
            </Form.Item>

            // <div key={i}>
            //   <div>{item.label}</div>
            //   <Input
            //     placeholder="title"
            //     value={options[item.name]}
            //     onChange={(e) => {
            //       change(e, item);
            //     }}
            //   />
            // </div>
          );
        } else if (item.type == "Switch") {
          return (
            <Form.Item key={i} label={item.label} name={item.name}>
              <Switch
              defaultChecked
                onChange={(e) => {
                  change(e, item);
                }}
              />
            </Form.Item>

            // <div key={i}>
            //   <div>{item.label}</div>{" "}
            //   <Switch
            //     value={options[item.name]}
            //     onChange={(e) => {
            //       change(e, item);
            //     }}
            //   />
            // </div>
          );
        } else if (item.type == "ColorPicker") {
          return (
            <Form.Item key={i} label={item.label } name={item.name}>
              <ColorPicker
                showText
                defaultFormat="hex"
                value={options[item.name]}
                onChange={(e) => {
                  change(e, item);
                }}
              />
            </Form.Item>

            // <div key={i}>
            //   <div>{item.label}</div>{" "}
            //   <ColorPicker
            //     showText
            //     defaultFormat="hex"
            //     value={options[item.name]}
            //     onChange={(e) => {
            //       change(e, item);
            //     }}
            //   />
            // </div>
          );
        }
      })}

    </Form>


    // <div className={styles.box}>
    //   {optList.map((item, i) => {
    //     if (item.type == "Input") {
    //       return (
    //         <div key={i}>
    //           <div>{item.label}</div>
    //           <Input
    //             placeholder="title"
    //             value={options[item.name]}
    //             onChange={(e) => {
    //               change(e, item);
    //             }}
    //           />
    //         </div>
    //       );
    //     } else if (item.type == "Switch") {
    //       return (
    //         <div key={i}>
    //           <div>{item.label}</div>{" "}
    //           <Switch
    //             value={options[item.name]}
    //             onChange={(e) => {
    //               change(e, item);
    //             }}
    //           />
    //         </div>
    //       );
    //     } else if (item.type == "ColorPicker") {
    //       return (
    //         <div key={i}>
    //           <div>{item.label}</div>{" "}
    //           <ColorPicker
    //             showText
    //             defaultFormat="hex"
    //             value={options[item.name]}
    //             onChange={(e) => {
    //               change(e, item);
    //             }}
    //           />
    //         </div>
    //       );
    //     }
    //   })}

    // </div>
  );
};
export default Options;
