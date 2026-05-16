'use client';

import { useEffect, useState } from 'react';
import { useLoading } from '@/contexts/loading.context';
import { Loader } from './loader';

export function DelayedLoading({
  duration = 2000,
  onComplete,
}: {
  duration?: number;
  onComplete?: () => void;
}) {
  const [done, setDone] = useState(false);
  const { setHeroReady } = useLoading();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDone(true);
      setHeroReady(true);
      onComplete?.();
    }, duration);
    return () => clearTimeout(timeout);
  }, [duration, onComplete, setHeroReady]);

  if (done) return null;

  return <Loader onLoadingComplete={onComplete ?? (() => {})} />;
}
