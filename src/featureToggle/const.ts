export enum FeatureToggle {
    VIS_SKJUL_AKTIVITET_KNAPP = 'arbeidsrettet-dialog.vis-skjul-aktivitet-knapp'
}

export const featureToggleQuery = new URLSearchParams({ feature: FeatureToggle.VIS_SKJUL_AKTIVITET_KNAPP }).toString();
