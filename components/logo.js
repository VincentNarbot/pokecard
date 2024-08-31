"use client";

import React from 'react';
import styled from 'styled-components';
import { Press_Start_2P } from 'next/font/google';

const pressStart2P = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
});

const LogoContainer = styled.div`
  font-family: ${pressStart2P.style.fontFamily};
  font-size: 36px;
  color: #FFCB05;
  text-shadow: 3px 3px #3D7DCA;
  letter-spacing: 2px;
  text-align: center;
  padding: 20px;
`;

const Logo = () => {
  return (
    <LogoContainer>
      PokeCard
    </LogoContainer>
  );
};

export default Logo;
