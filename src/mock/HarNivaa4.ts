import { RestRequest } from 'msw';

import { harIkkeNivaa4 } from './demo/sessionstorage';

export const harNivaa4Data = (req: RestRequest) => ({
    harbruktnivaa4: !harIkkeNivaa4(),
    personidentifikator: req.params.fmr
});
