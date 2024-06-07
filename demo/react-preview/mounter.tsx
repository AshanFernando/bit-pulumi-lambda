import React, { ReactNode } from 'react';
import { createMounter } from '@teambit/react.mounter';

export type DefaultMounterProps = {
  children?: ReactNode;
};

export function DefaultMounter({ children }: DefaultMounterProps) {
  return <>{children}</>;
}

// @ts-ignore
export default createMounter(DefaultMounter) as any;
