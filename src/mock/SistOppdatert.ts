import { getTime } from 'date-fns';
import { RestRequest } from 'msw';
import { SistOppdatert } from '../utils/Typer';

export const getSistOppdatert = (): ((req: RestRequest) => { sistOppdatert: number | Date }) => {
    const now = new Date();
    let timestamp = getTime(now);
    let oppdaterTimestamp = true;

    return (req) => {
        const respons = { sistOppdatert: timestamp };

        if (oppdaterTimestamp) timestamp = getTime(new Date());

        oppdaterTimestamp = false;
        return respons;
    };
};
