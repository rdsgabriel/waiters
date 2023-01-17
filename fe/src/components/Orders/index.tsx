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

  return (
    <Container>
      <OrdersBoard
        icon="🕑"
        title="Fila de espera"
        orders={waiting}
        onCancelOrder={handleCancelOrder}
      />
      <OrdersBoard
        icon="👩‍🍳"
        title="Em produção"
        orders={inProduction}
        onCancelOrder={handleCancelOrder}
      />
      <OrdersBoard
        icon="✅"
        title="Pronto!"
        orders={done}
        onCancelOrder={handleCancelOrder}
      />
    </Container>
  );
}
