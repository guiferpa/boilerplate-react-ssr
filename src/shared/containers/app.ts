import { connect } from 'react-redux';

import App, { StateProps, DispatchProps } from '../components/app';

const mapStateToProps = (state: any): StateProps => ({
  message: state.message
})

const mapDispatchToProps = (): DispatchProps => ({})

export default connect(mapStateToProps, mapDispatchToProps)(App);
