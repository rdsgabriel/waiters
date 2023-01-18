import {useEffect, useState} from 'react';
import { Container } from './styles';
import { OrdersBoard } from '../OrdersBoard';
import { Order } from '../../types/Order';
import { api } from '../../utils/api';

export function Orders () {

  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    api.get('/orders')
      .then(({data}) => {
        setOrders(data);
      });
  }, []);

  const waiting = orders.filter((orders) => orders.status === 'WAITING');
  const inProduction = orders.filter((orders) => orders.status === 'IN_PRODUCTION');
  const done = orders.filter((orders) => orders.status === 'DONE');

  function handleCancelOrder (orderId: string) {
    setOrders((prevState) => prevState.filter(order => order._id !== orderId));
  }

  function handleOrderStatusChange (orderId : string, status: Order['status']) {
    setOrders((prevState) => prevState.map((order) => (
      order._id === orderId ? {...order, status } : order
    )));

  }

  return (
    <Container>
      <OrdersBoard
        icon="🕑"
        title="Fila de espera"
        orders={waiting}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus = {handleOrderStatusChange}
      />
      <OrdersBoard
        icon="👩‍🍳"
        title="Em produção"
        orders={inProduction}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus = {handleOrderStatusChange}
      />
      <OrdersBoard
        icon="✅"
        title="Pronto!"
        orders={done}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus = {handleOrderStatusChange}
      />
    </Container>
  );
}
