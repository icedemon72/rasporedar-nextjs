import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html'

export const toHTML = (data: SerializedEditorState) => {
  return convertLexicalToHTML({ data });
};