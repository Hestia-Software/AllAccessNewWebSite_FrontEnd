import React, { Suspense, memo } from "react";
import { Layout } from "antd";
import Component from "./components";
import 'bootstrap/dist/css/bootstrap.min.css'
 import "./assets/styles/styles.scss";
import Routings from './views/Routings'
const { Content } = Layout;
function App() {
  const { Spinner} = Component;
 
  return (
    <>
      <Suspense fallback={<Spinner />}>
        <Layout
          className={`app-layout custom-layout`}
        >
         
          <Content className="app-content" style={{ padding: "0 48px" }}>
            <Routings />
          </Content>
         
        </Layout>
      </Suspense>
    </>
  );
}
 
export default memo(App);