import { WYSIWYGBlock as WYSIWYGBlockType } from '@/types/payload';
import { toHTML } from '@/utils/serializeLexical';
import React from 'react';

const WYSIWYGBlock: React.FC<WYSIWYGBlockType> = ({
  text,
}) => {
  const element = toHTML(text);

  if (!element?.length) return null;

  return (
    <div className="main" dangerouslySetInnerHTML={{ __html: element }} />
  );
}

export default WYSIWYGBlock;