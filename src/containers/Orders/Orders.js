import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
class Orders extends Component {

    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {

        axios.get("/orders.json?auth="+this.props.token).then(res => {

            // console.log(res.data);
            const fetchOrders = [];
            for (let key in res.data) {
                fetchOrders.push({
                    ...res.data[key],
                    id: key
                })
            }
            this.setState({ loading: false, orders: fetchOrders });

        }).catch(error => {
            this.setState({ loading: false })

        });
    }

    render() {

        let orderList = this.state.orders.map(order => (
            <Order key={order.id}
                ingredients={order.ingredients} price={order.price} />
        ))
        return (
            <div>
                {orderList}

            </div>
        );
    }
}

const mapStatetoProps= state=>{

    return{
        token:state.auth.token
    }
}

export default connect(mapStatetoProps)(withErrorHandler(Orders, axios));