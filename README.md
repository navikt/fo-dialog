# Arbeidsrettet-dialog

Arbeidsrettet-dialog er et verktøy for veiledere og brukere i NAV. Verktøyet gjør det mulig for brukere under arbeidsrettet oppfølging å kommunisere med veilederne deres.

Dette prosjektet er satt opp med [Create React App](https://github.com/facebook/create-react-app)

### Komme i gang

```sh
# Installere avhengigheter
npm i

# Bygge produksjons kode
npm build

# Lokal utvikling med mock
npm start

```

### Api-url-er

Alle url-er **sitt prefiks** slutter alltid på `/veilarbdialog/api`

Eksterne url-er sitt prefix har `/arbeid/dialog` i tillegg

`PUBLIC_URL` blir tatt fra package.json -> "homepage" når den ikke er satt

Ekstern eksempel:

https://pto.dev.nav.no/arbeid/dialog/veilarbdialog/api/*

Intern eksempel:

https://veilarbpersonflate.dev.intern.nav.no/veilarbdialog/api/*

### Kontakt og spørsmål

Opprett en issue i GitHub for eventuelle spørsmål.
