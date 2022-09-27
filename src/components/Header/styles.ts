import styled from 'styled-components';

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const NavigationSession = styled.nav`
  gap: 0.8rem;
  display: flex;

  > a {
    width: 4.8rem;
    height: 4.8rem;
    border-top: 3px solid transparent;
    border-bottom: 3px solid transparent;

    display: flex;
    align-items: center;
    justify-content: center;

    color: ${({ theme }) => theme.colors.gray[100]};

    &:hover {
      border-bottom: 3px solid ${({ theme }) => theme.colors.green[500]};
    }

    &.active {
      color: ${({ theme }) => theme.colors.green[500]};
    }
  }
`;
