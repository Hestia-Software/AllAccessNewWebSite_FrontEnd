import React from "react";
import { Typography } from "antd";
const { Title } = Typography;
const TypographyComponent = (props) => {
  const { children,className,level,type } = props;
  return (
    <>
      <Title className={className} level={level} type={type}>{children}</Title>
    </>
  );
};
export default TypographyComponent;
