import { createRoot } from 'react-dom/client';
import Root from 'Root';
import 'typeface-roboto'; // eslint-disable-line import/extensions
import 'normalize.css';

createRoot(document.getElementById('react')!).render(<Root />);
