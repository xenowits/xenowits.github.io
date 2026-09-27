import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig, emailLink, socialMedia } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledContactSection = styled.section`
  max-width: 640px;
  margin: 0 auto;
  padding-top: 40px;
  padding-bottom: 40px;
  text-align: center;

  @media (max-width: 768px) {
    padding-top: 30px;
    padding-bottom: 20px;
  }

  .overline {
    display: block;
    margin-bottom: 20px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-md);
    font-weight: 400;

    &:before {
      bottom: 0;
      font-size: var(--fz-sm);
    }

    &:after {
      display: none;
    }
  }

  .title {
    font-size: clamp(40px, 5vw, 60px);
  }
`;

const Contact = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const twitter = socialMedia.find(({ name }) => name === 'Twitter').url;
  const linkedin = socialMedia.find(({ name }) => name === 'Linkedin').url;

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, [prefersReducedMotion]);

  return (
    <StyledContactSection id="contact" ref={revealContainer}>
      <h2 className="numbered-heading overline">What’s Next?</h2>

      <h2 className="title">Get In Touch</h2>

      <p>
        After wrapping up Catalysis, I'm now actively looking for roles in
        <br />
        partnerships, GTM & business development.
      </p>

      <p>
        If you're building an early-stage startup, I'd like to hear what you're working on.
      </p>

      <p>
        You can reach me via <a href={emailLink}>email</a>
        {', '}
        <a href={twitter} target="_blank" rel="noopener noreferrer">
          Twitter
        </a>
        {', or '}
        <a href={linkedin} target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
        .
      </p>
    </StyledContactSection>
  );
};

export default Contact;
