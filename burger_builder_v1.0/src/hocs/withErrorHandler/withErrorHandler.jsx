import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal'
import Aux from '../../hocs/Aux/Aux'


const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        constructor(props) {
            super(props)
            this.state = {
                err: null
            }
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({ err: null })
                return req
            })
            this.respInterceptor = axios.interceptors.response.use(res => res, err => {
                this.setState({ err: err })

            })
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor)
            axios.interceptors.response.eject(this.respInterceptor)
        }


        errConfirmedHandler = () => {
            this.setState({ err: null })
        }

        render() {
            return (
                <Aux>
                    <Modal
                        show={this.state.err}
                        modalClosed={this.errConfirmedHandler}
                    >
                        {this.state.err ? this.state.err.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );

        }
    }
};
export default withErrorHandler;