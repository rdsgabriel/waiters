import {Board, OrdersContainer} from './styles';
import { Order } from '../../types/Order';
import {OrderModal} from '../OrderModal';
import { useState } from 'react';
import { api } from '../../utils/api';
import { toast } from 'react-toastify';

interface OrdersBoardProps {
  icon: string;
  title: string;
  orders: Order[];
  onCancelOrder: (orderId: string) => void;
  onChangeOrderStatus: (orderId: string, status: Order['status']) => void;
}

export function OrdersBoard ({icon, title, orders, onCancelOrder,onChangeOrderStatus }: OrdersBoardProps) {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectOrder, setSelectOrder] = useState<null | Order>(null);
  const [isLoading, setIsLoading] = useState(false);

  function handleOpenModal(order: Order){
    setIsModalVisible(true);
    setSelectOrder(order);
  }

  function handleCloseModal(){
    setIsModalVisible(false);
    setSelectOrder(null);
  }

  async function handleChangeOrderStatus () {
    setIsLoading(true);

    const status = selectOrder?.status === 'WAITING' ? 'IN_PRODUCTION' :  'DONE';

    await api.patch(`/orders/${selectOrder?._id}`, {status});

    toast.success(`
      O pedido da mesa ${selectOrder?.table} teve o status alterado com sucesso!
    `);
    onChangeOrderStatus(selectOrder!._id, status);
    setIsLoading(false);
    setIsModalVisible(false);
  }

  async function handleCancelOrder () {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    await api.delete(`/orders/${selectOrder?._id}`);
    {selectOrder?.status === 'DONE'
      ? toast.success(`
    O pedido da mesa ${selectOrder?.table} foi concluído com sucesso!
  `)
      : toast.success(`
  O pedido da mesa ${selectOrder?.table} foi cancelado com sucesso!
`);}

    onCancelOrder(selectOrder!._id);
    setIsLoading(false);
    setIsModalVisible(false);
  }

  return (
    <Board>
      <OrderModal visible={isModalVisible}
        order= {selectOrder}
        onClose={handleCloseModal}
        onCancelOrder={handleCancelOrder}
        isLoading={isLoading}
        onChangeOrderStatus= {handleChangeOrderStatus}
      />

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
