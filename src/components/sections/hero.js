import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { emailLink } from '@config';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';

const StyledHeroSection = styled.section`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  /* Start below the fixed nav. Vertical centering clips the top of longer
     bios (greeting + Catalysis + prior roles) off the top of the viewport. */
  padding: calc(var(--nav-height) + 40px) 0 80px;

  @media (max-width: 480px) {
    padding-top: calc(var(--nav-height) + 20px);
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 10px;
    color: var(--slate);
    line-height: 0.9;
  }

  p {
    margin: 20px 0 0;
    max-width: 500px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, [prefersReducedMotion]);

  const one = <h1>Hi, my name is</h1>;
  const two = <h2 className="big-heading">Abhishek Kumar.</h2>;
  const three = <h3 className="big-heading">I build DeFi infrastructure that institutions can trust.</h3>;
  const four = (
    <p>
      I'm a founder and commercial operator with{' '}
      <strong>5+ years in DeFi and crypto infrastructure</strong> — spanning strategy, business
      development, and partnerships.
      <br />
      <br />
      Previously, I founded{' '}
      <a href="https://catalysis.network/">Catalysis</a>, DeFi's first vault-native risk coverage
      protocol — raised $1.3M pre-seed, hired an 8-person team, and closed 20+ partnerships with Tier-1
      protocols including Morpho, Gauntlet, and EigenLayer.
      <br />
      <br />
      Prior to that, I led product at <a href="https://obol.tech/">Obol Labs</a> and an engineer at{' '}
      <a href="https://nethermind.io/">Nethermind</a>,{' '}
      <a href="https://www.atlassian.com/">Atlassian</a>, and{' '}
      <a href="https://www.amazon.com/">Amazon</a>.
    </p>
  );
  const five = (
    <a href={emailLink} className="email-link">
      Get In Touch
    </a>
  );

  const items = [one, two, three, four, five];

  return (
    <StyledHeroSection>
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
