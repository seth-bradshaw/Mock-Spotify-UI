import { AnyObj } from "../components/playback/context/types";

const getOptionalParams = (optionalParams: Array<AnyObj>) => {
    const paramsToUse = optionalParams.filter(p => {
      const key = Object.keys(p)[0];
      return Boolean(p[key]); 
    });
  
    if (paramsToUse.length === 0) {
      return '';
    }
    const urlParams = new URLSearchParams();
  
    for (const param of paramsToUse) {
      const key = Object.keys(param)[0];
      urlParams.append(key, param[key]);
    }
  
    const params = urlParams.toString();
  
    return `?${params}`;
}

export default getOptionalParams;