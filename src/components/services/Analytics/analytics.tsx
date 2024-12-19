'use client';

import { useEffect } from 'react';
import ReactGA from 'react-ga4';

export default function Analytics() {
  useEffect(() => {
    ReactGA.initialize("G-JNMJVK8C0Q");
    ReactGA.send("pageview");
  }, []);

  return null;
}