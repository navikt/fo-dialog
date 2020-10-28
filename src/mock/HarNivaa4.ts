import { harIkkeNivaa4 } from './demo/sessionstorage';

export const harNivaa4Data = (fnr: string) => ({
    harbruktnivaa4: !harIkkeNivaa4(),
    personidentifikator: fnr
});
