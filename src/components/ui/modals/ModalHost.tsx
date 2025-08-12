import { ModalState } from '@/types/global';
import React from 'react';
 
type Registry = Record<string, React.FC<any>>;

export const ModalHost: React.FC<{
  state: ModalState;
  close: () => void;
  registry: Registry;
}> = ({ state, close, registry }) => {
  if (!state.key) return null;
  const Comp = registry[state.key];
  if (!Comp) return null;
  return <Comp {...state.props} onClose={close} />; 
};