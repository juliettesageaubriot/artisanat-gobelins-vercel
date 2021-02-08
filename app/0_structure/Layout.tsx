import React, { ReactNode } from 'react'
import Header from "./Header/Header"
import Footer from "./Footer"
import Loader from "../../components/0_structure/Loader";

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children }: Props) => (
  <div>
    <Loader />
    <Header />
    {children}
    <Footer />
  </div>
)

export default Layout
