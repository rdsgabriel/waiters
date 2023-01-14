import { Container } from './styles';
import { OrdersBoard } from '../OrdersBoard';
import { Order } from '../../types/Order';

const orders: Order[] = [
  {
    '_id': '6377f076370c478474fd0c33',
    'table': '123',
    'status': 'WAITING',
    'products': [
      {
        'product': {
          'name': 'Coca cola',
          'imagePath': '1668803092382-coca-cola.png',
          'price': 7,
        },
        'quantity': 2,
        '_id': '6377f076370c478474fd0c34'
      }
    ],
  }
];

export function Orders () {
  return (
    <Container>
      <OrdersBoard
        icon="🕑"
        title="Fila de espera"
        orders={orders}
      />
      <OrdersBoard
        icon="👩‍🍳"
        title="Em produção"
        orders={orders}
      />
      <OrdersBoard
        icon="✅"
        title="Pronto!"
        orders={orders}
      />
    </Container>
  );
}
