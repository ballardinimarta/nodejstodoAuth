# nodejstodo
Andra inlämningen för kursen Dynamisk Webbutveckling. 

### Uppgiften: ###
Utveckla vidare todo-appen från inlämning 1, man ska då behöva logga in för att kunna skapa, ändra och ta bort todos. Då behöver man göra en registrering och inloggning, sedan ska man också kunna återställa lösenordet till sitt konto genom en länk man får på mailen. Sedan har jag också kopplat ens todos men sitt konto så man då bara får upp sina egna och ingen annans.

### Se Appen: ###
För att ladda ner repot och starta appen.

- ` > git clone https://github.com/ballardinimarta/nodejstodo.git `
- ` > npm install `
- lägg till dessa uppgifter i en ` .env` fil
    - `DATABASE_URL = <connectionstring från MongoDB>`
    - `PORT = <porten för localhost>`
    - `SECRETKEY = <en secret key för jsonwebtoken>`
    - `EMAIL_SERVICE= <email service>`
    - `EMAIL_PORT= <port för smtp>`
    - `EMAIL_NAME= <email användarnamn>`
    - `EMAIL_PASS= <email lösenord> `
- ` > npm start ` 
