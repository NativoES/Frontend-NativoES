import { Quill } from 'react-quill-new';
import ImageResize from 'quill-image-resize-module-react';

if (typeof window !== 'undefined' && Quill && !Quill.imports['modules/imageResize']) {
  Quill.register('modules/imageResize', ImageResize);
}
