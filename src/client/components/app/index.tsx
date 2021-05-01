import React from 'react';
// import styled from 'styled-components';
// import UnicornSVG from '../../../../images/unicorn.svg';

interface StateProps {
  message: string;
}

interface DispatchProps {}

interface Props extends StateProps, DispatchProps {}

const App: React.FunctionComponent<Props> = (props) => {
  const { message } = props;
  return <h1> {message} </h1>;
}

export default App;
