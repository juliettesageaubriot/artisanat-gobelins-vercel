import React from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Loader from '../Loader/Loader';

const Layout = ({children}) => {
  return (
    <div>
      {/* <Loader /> */}
      {/* <Header /> */}
      {children}
      {/* <Footer /> */}
    </div>
  );
}

export default Layout;
