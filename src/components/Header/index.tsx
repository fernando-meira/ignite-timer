import { NavLink } from 'react-router-dom';
import { Timer, Scroll } from 'phosphor-react';

import logoIgnite from '../../assets/logo-ignite.svg';

import * as S from './styles';

export function Header() {
  return (
    <S.HeaderContainer>
      <img src={logoIgnite} alt="" />

      <S.NavigationSession>
        <NavLink to="/" title="Timer">
          <Timer size={24} />
        </NavLink>

        <NavLink to="/history" title="Histórico">
          <Scroll size={24} />
        </NavLink>
      </S.NavigationSession>
    </S.HeaderContainer>
  );
}
