import { FlatList, Modal } from 'react-native';
import { Button } from '../components/Button';
import { Close } from '../components/Icons/Close';
import { Text } from '../components/Text';
import { Product } from '../types/Product';
import { formatCurrency } from '../utils/formatCurrency';
import { Image, CloseButton, ModalBody, Header, IngredientsContainer, Ingredient, FooterContainer, Footer, PriceContainer} from './style';

interface ProductModalProps {
  visible: boolean;
  onClose: () => void;
  product: null | Product;
  onAddToCart: (product: Product) => void;
}





export function ProductModal({visible,onClose, product, onAddToCart } : ProductModalProps) {
  if (!product) {
    return null;
  }

  function handleAddToCart( ) {
    onAddToCart(product!);
    onClose();
  }

  return (
    <Modal visible={visible}
      animationType="slide"
      onRequestClose={onClose}>
      <Image
        source={{uri:`http://192.168.1.64:3001/uploads/${product.imagePath}`}}
      >
        <CloseButton onPress={onClose}>
          <Close/>
        </CloseButton>
      </Image>
      <ModalBody>
        <Header>
          <Text size={24} weight='600'>{product.name}</Text>
          <Text color='#666' style= {{marginTop: 8}}>{product.description}</Text>
        </Header>

        {product.ingredients.length > 0 && (
          <IngredientsContainer>
            <Text weight='600' color='#666'>Ingredientes</Text>
            <FlatList
              style = {{marginTop: 16}}
              data= {product.ingredients}
              keyExtractor = {ingredient => ingredient._id}
              showsHorizontalScrollIndicator={false}
              renderItem={({item: ingredient}) => (
                <Ingredient>
                  <Text>{ingredient.icon}</Text>
                  <Text size={14} color='#666' style={{marginLeft: 20}}>{ingredient.name}</Text>
                </Ingredient>
              )}/>
          </IngredientsContainer>
        )}

      </ModalBody>
      <Footer>
        <FooterContainer>
          <PriceContainer>
            <Text color='#666'>Preço</Text>
            <Text size={20} weight='600'>{formatCurrency(product.price)}</Text>
          </PriceContainer>

          <Button onPress={handleAddToCart}>Adicionar ao pedido</Button>
        </FooterContainer>
      </Footer>
    </Modal>
  );
}
