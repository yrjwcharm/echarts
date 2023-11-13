import Screenshots from "./index";
import { Dispatch, SetStateAction, createContext, useState } from "react";
interface d {
  options: any;
  setOptions: any;
  optList: Array<string | number>;
  setOptList: any;
}
export const c = createContext<d>({
  options: {},
  setOptions: null,
  optList: [],
  setOptList: null,
});
const DocsPage = () => {
  // const [optList, setOptList] = useState<any>({})
  const [optList, setOptList] = useState<any>([]);
  const [options, setOptions] = useState({
    title: "",
    legendShow: true,
    width: "100%",
    height: "200px",
    tooltipShow: true,
  });
  return (
    <div>
      {/* <p>This is umi docs.</p> */}
      <div style={{ height: "50vh" }}></div>
    </div>
  );
};

export default DocsPage;
