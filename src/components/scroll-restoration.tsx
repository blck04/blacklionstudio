"use client";

import { useEffect } from 'react';

export default function ScrollRestoration() {
  useEffect(() => {
    if (history.scrollRestoration !== 'manual') {
      history.scrollRestoration = 'manual';
    }
  }, []);

  return null;
}
