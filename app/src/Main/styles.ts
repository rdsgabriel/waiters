import styled from 'styled-components/native';
import { Platform, StatusBar } from 'react-native';

const isAndroid = Platform.OS === 'android';


export const Container = styled.View`
margin-top: ${isAndroid ? `${StatusBar.currentHeight}px` : '0'};
flex:1;
background: #fafafa;
`;

export const CategoriesContainer = styled.View`
height: 73px;
margin-top: 34px;
`;

export const MenuContainer = styled.View`
flex: 1;
`;

export const Footer = styled.View`
min-height: 110px;
background: #fff;
padding: 32px 24px;
`;

export const FooterContainer = styled.View`

`;

export const CenteredContainer = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`;
