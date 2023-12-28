export enum FeatureToggle {
    VIS_SKJUL_AKTIVITET_KNAPP = 'arbeidsrettet-dialog.vis-skjul-aktivitet-knapp',
    USE_WEBSOCKETS = 'arbeidsrettet-dialog.websockets'
}

export const featureToggleQuery = [FeatureToggle.VIS_SKJUL_AKTIVITET_KNAPP, FeatureToggle.USE_WEBSOCKETS]
    .reduce((params, nextToggle) => {
        params.append('feature', nextToggle);
        return params;
    }, new URLSearchParams())
    .toString();
