# Proiect Tehnologii Web 2024-2025
## Echipa
- DMOTeam - Oprea Ovidiu, Neacsu David, Neculai Marius
- Seria D
- Grupa 1096

## Tema proiectului
Tema 7 - Conference Organizer - Aplicație web pentru organizarea de conferințe

## Tehnologii folosite
- front-end: React
- back-end: node.js Express
- baza de date: MySQL

## Instructiuni de rulare
### Front-end:  
`cd frontend`  
`npm i`  
`npm start`  

### Back-end  
`cd backend`  
`npm i`  
`npm start`  

### Baza de date
Rulare script de migrare cu prefix **USE_latest**
> e.g. USE_latest_21_01_14_40.sql 

## Structura fisiere .env
### frontend
- `REACT_APP_API_URL` = adresa la care ruleaza serverul back-end (default `http://localhost:3600`)
### backend
- `DB_USERNAME` = nume utilizator baza de date MySQL
- `DB_PASSWORD`  =  parola utilizator baza de date MySQL
- `DB_HOST`  =  host baza de date MySQL
- `DB_NAME`  =  nume tabela din baza de date (default `tw_database`)
- `DB_PORT`  = port baza de date (default `3306`)
- `PORT` = port server back-end (default `3600`)