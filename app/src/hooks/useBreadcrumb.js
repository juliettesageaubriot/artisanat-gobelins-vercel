import { useState } from "react";

const useBreadcrumb = () => {
  const [isShowingBreadcrumb, setIsShowingBreadcrumb] = useState(true);

  const toggle = () => {
    setIsShowingBreadcrumb(!isShowingBreadcrumb);
  }
  
  return {
    isShowingBreadcrumb,
    toggle
  };
};

export default useBreadcrumb;