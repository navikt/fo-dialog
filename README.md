# Arbeidsrettet-dialog

Arbeidsrettet-dialog er et verktøy for veiledere og brukere i Nav. Verktøyet gjør det mulig for brukere under arbeidsrettet oppfølging å kommunisere med veilederne deres.

Dette prosjektet er satt opp med [Create React App](https://github.com/facebook/create-react-app)

### Komme i gang

```sh
# Installer bun
curl -fsSL https://bun.sh/install | bash

# Installere avhengigheter
npm install
bun install

# Bygge produksjonskode
npm run build

# Lokal utvikling med mock
npm run dev

```

### Api-url-er

Alle url-er **sitt prefiks** slutter alltid på `/veilarbdialog/api`

Eksterne url-er sitt prefix har `/arbeid/dialog` i tillegg

`PUBLIC_URL` blir tatt fra package.json -> "homepage" når den ikke er satt

Ekstern eksempel:

https://pto.ekstern.dev.nav.no/arbeid/dialog/veilarbdialog/api/*

Intern eksempel:

https://veilarbpersonflate.dev.intern.nav.no/veilarbdialog/api/*

### Kontakt og spørsmål

Opprett en issue i GitHub for eventuelle spørsmål.
