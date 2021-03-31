import TheFooter from '@structure/Footer/TheFooter';
import TheHeader from '@structure/Header/TheHeader';
import TheLoader from '@structure/Loader/TheLoader';

import layout from "./styles.module.scss"
import MyProvider from '@helpers/myProvider';

const TheLayout = ({ children }) => {
  return (
    <MyProvider>
      <div className={`layout-wrapper`}>
        {/* <TheLoader /> */}
        {/* <TheHeader /> */}
        <div className={`${layout.layout_inner} layout_inner`}>
          <div className={layout['page-content']}>
            {children}
          </div>
          {/* <TheFooter /> */}
        </div>
      </div>
    </MyProvider>
  );
}

export default TheLayout;
