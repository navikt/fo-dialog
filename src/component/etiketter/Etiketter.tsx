import { visibleIfHoc } from "../hoc/visibleIfHoc";
import {
  EtikettFokus as EtikettFocusRaw,
  EtikettAdvarsel as EtikettAdvarselRaw
} from "nav-frontend-etiketter";

export const EtikettFokus = visibleIfHoc(EtikettFocusRaw);
export const EtikettAdvarsel = visibleIfHoc(EtikettAdvarselRaw);
