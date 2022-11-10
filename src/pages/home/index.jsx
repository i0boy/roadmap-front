import React from 'react';
import { Link } from 'react-router-dom';
import { Container, SubTitle, Title } from './index.styles';

/**
 * @type{()=>import('../../types.d').Data}
 * @returns
 */
const generateType = () => ({ name: 'test' });

const Home = () => {
  return (
    <Container>
      <Title>
        <span>Roady.io</span>
      </Title>
      <SubTitle>ready to roadmap, for easy to start</SubTitle>
      <Link to="/make">
        <button>START!</button>
      </Link>
    </Container>
  );
};

export default Home;
