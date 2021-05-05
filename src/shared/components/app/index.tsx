import React from 'react';
import UnicornSVG from '../../../../images/unicorn.svg';

import Title from '../title';

export interface StateProps {
  message: string;
}

export interface DispatchProps {}

interface Props extends StateProps, DispatchProps {}

const App: React.FunctionComponent<Props> = (props) => {
  return (
    <>
      <UnicornSVG />
      <Title>{props.message}</Title>
    </>
  )
}

export default App;
