import { ModalState } from '@/types/global';
import { useCallback, useState } from 'react';


export function useModal() {
  const [state, setState] = useState<ModalState>({ key: null });
  const open = useCallback((key: string, props?: any) => setState({ key, props }), []);
  const close = useCallback(() => setState({ key: null }), []);
  return { state, open, close };
}