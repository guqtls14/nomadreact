import styled from "styled-components";

const Container = styled.div<ContainerProps>``;

interface ContainerProps {
  bgColor: string;
}

interface CircleProps {
  bgColor: string;
}

const Circle = ({ bgColor }: CircleProps) => {
  return <Container bgColor={bgColor} />;
};
export default Circle;
