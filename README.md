# CS:GO Teams

En nettside som presenterer e-sport lag og spillere til spillet Counter-Strike: Global Offensive. Vi benytter et REST-API for e-sportnettsiden HLTV for å hente informasjon om lagene og spillerne.

## Oppsett

For å starte nettsiden, installer og kjør med npm:  
`npm install`  
`npm run dev`

## Krav

### Funksjonelle krav

- Brukeren blir presentert én og én ressurs om gangen - ett lag blir vist, og man kan bla til første, siste, frem og tilbake i navigasjonsknappene under.
- Brukeren kan sortere etter rangering eller alfabetisk i begge retninger. Brukeren kan filtrere lag med spillere fra et valgt land, kan vise internasjonale eller mononasjonale lag, og kan vise bare favorittlag. Disse valgene lagres i session storage sånn at de huskes selv om man laster siden inn på nytt. Vi er usikre på det med "hvordan det presenteres". Fra Piazza @36, virker det som det er betinget rendring av komponenter dere vil ha. Da har vi vel betinget rendring av favorittstjernen, og TeamNavigation er også full av betinget rendring.
- Brukeren kan velge lag som favoritt ved å trykke på stjernen. Vi har et context som passer på hvem som er favoritt og lagrer tilstanden i local storage. Det gjør at favorittene forblir selv om man krysser ut av nettleseren.
- Nettsiden har responsivt design: På mobil går spillerne fra å være plassert horisontalt til vertikalt, og navigasjonsknappene blir midtstilt.

### Tekniske krav

- Vi bruker React state i blant annet Mainpage og useSortedTeams. Vi sender TeamData som props til Team komponenten, og PlayerData til Player komponenten.
- Vi bruker TanStack Query i vår useTeams hook som henter data fra REST APIet. APIet gir oss CS:GO lag med spillere. useQuery i useTeams skal være konfigurert til å unngå unødvendige kall til REST APIet.
- Local storage brukes til favoritter; session storage brukes til sortering og filtreringsvalg.
- Vi hadde React Router i starten, men så endte vi opp med bare én side, så vi tok det bort. Se Piazza @32.

## Testing

For å teste, kjør `npm test` i csgo-teams mappen.  
Vi har fått testet TeamNavigation, Team, Player og Mainpage med Vitest.
Vi har en snaphot test av hele appen.  
Vi har prøvd nettsiden på Firefox, Edge og Chrome på PC; Safari, Chrome og Firefox på mobil; Safari på iPad - alt ser ut til å være greit.
