import React, { Component } from 'react';
import Aux from '../Aux';
import Modal from '../../components/UI/Modal/Modal';

let errorHandler = (WrappedComponent, axios) => {

    return class extends Component {

        state = {
            error: null
        }

        clickHandler = () => {
            this.setState({ error: null });
        }
        constructor() {
            super()
            //saving refrences to req and res for cleaning(prevent from memory leak) when some component is not needed it is not neccessary in the memory so for unmounting that component
            this.reqInterceptors = axios.interceptors.request.use(req => {
                this.setState({ error: null });
                return req;
            })

            this.resInterceptors = axios.interceptors.response.use(res => res, error => {
                this.setState({ error: error });
            })

        }

        componentWillUnmount() {

            console.log("will unmount", this.reqInterceptors, this.resInterceptors);
            axios.interceptors.request.eject(this.reqInterceptors);
            axios.interceptors.response.eject(this.resInterceptors);

        }
        render() {
            return (
                <Aux>
                    <Modal show={this.state.error} clickHandler={this.clickHandler} >
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>

            )
        }

    }
}

export default errorHandler;