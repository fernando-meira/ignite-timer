import * as S from './styles';

export interface ButtonProps {
  color: 'primary' | 'secondary' | 'danger' | 'success';
}

export function Button({ color }: ButtonProps) {
  return <S.ButtonContainer color={color}>Enviar</S.ButtonContainer>;
}
