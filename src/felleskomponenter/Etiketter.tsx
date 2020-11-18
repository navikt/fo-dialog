import { EtikettAdvarsel as EtikettAdvarselRaw, EtikettFokus as EtikettFocusRaw } from 'nav-frontend-etiketter';

import { visibleIfHoc } from './VisibleIfHoc';

export const EtikettFokus = visibleIfHoc(EtikettFocusRaw);
export const EtikettAdvarsel = visibleIfHoc(EtikettAdvarselRaw);
