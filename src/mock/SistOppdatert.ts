import { getTime } from 'date-fns';

export const getSistOppdatert = () => {
    const now = new Date();
    let timestamp = getTime(now);
    let oppdaterTimestamp = true;

    return () => {
        const respons = { sistOppdatert: timestamp };

        if (oppdaterTimestamp) timestamp = getTime(new Date());

        oppdaterTimestamp = false;
        return respons;
    };
};
