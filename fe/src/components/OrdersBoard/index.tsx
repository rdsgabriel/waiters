import {Board, OrdersContainer} from './styles';
import { Order } from '../../types/Order';
import {OrderModal} from '../OrderModal';
import { useState } from 'react';

interface OrdersBoardProps {
  icon: string;
  title: string;
  orders: Order[];
  onClose: () => void;
}

export function OrdersBoard ({icon, title, orders }: OrdersBoardProps) {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectOrder, setSelectOrder] = useState<null | Order>(null);

  function handleOpenModal(order: Order){
    setIsModalVisible(true);
    setSelectOrder(order);
  }

  function handleCloseModal(order: Order){
    setIsModalVisible(false);
    setSelectOrder(null);
  }

  return (
    <Board>
      <OrderModal visible={isModalVisible}
        order= {selectOrder}
        onClose={handleCloseModal}/>

      <header>
        <span>{icon}</span>
        <strong>{title}</strong>
        <span>({orders.length})</span>
      </header>

      {orders.length > 0 &&
      <OrdersContainer>
        {orders.map((order) => (
          <button type="button" key= {order._id} onClick={() => handleOpenModal(order)}>
            <strong>Mesa {order.table}</strong>
            <span>{order.products.length} itens</span>
          </button>
        ) )}
      </OrdersContainer>}
    </Board>
  );
}
