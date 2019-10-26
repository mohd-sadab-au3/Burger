import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
class Orders extends Component {

    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {

        const queryParams = '?auth=' + this.props.token + '&orderBy="userId"&equalTo="' + this.props.userId + '"';
        axios.get("/orders.json" + queryParams).then(res => {
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
        if (!orderList.length)
            orderList = (<p
                style={{
                    textAlign: "center",
                    boxShadow: "0 2px 3px #ccc",
                    padding: "10px",
                    margin: "5px",
                    boxSizing: "border-box"
                }} >No Order Place Yet Order Some Tasty Burger</p>);
        return (
            <div>
                {orderList}

            </div>
        );
    }
}

const mapStatetoProps = state => {

    return {
        token: state.auth.token,
        userId: state.auth.userId
    }
}

export default connect(mapStatetoProps)(withErrorHandler(Orders, axios));