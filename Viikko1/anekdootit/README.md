# Anekdootit

### Sovelluksessa on 7 valmiiksi määritettyä anekdoottia. 

### Ohjelman toiminnasta: 
- Sovellus on Single Page App.
- Oletusarvoisesti anekdooteista ensimmäinen näytetään käyttäjälle sovelluksen
käynnistyessä. Myös näytettävän anekdootin saamat äänet näytetään anekdootin alapuolella.
Äänet ovat 0 alussa. 
- Äänten alapuolella ovat seuraavan anekdootin näyttävä painike sekä äänestyspainike
juuri näkyvälle anekdootille.
- Anekdooteille voi antaa ääniä niitä selatessaan.
- Näytettävä anekdootti arvotaan randomisti.
- Eniten ääniä saanut anekdootti näytetään äänestysnppuloiden alla sekä
sen saamat äänimäärät. 

Sivun renderöitymiseen vaikutetaan sivun tilan muutoksella, so. useState(...).
Alussa luodaan taulukko anekdooteille annettaville äänille. Taulukko alustetaan 0-arvoilla.
Aina äänestettäessä anekdoottia, sen tila muuttuu ja sivu renderöityy uudelleen. Aina anekdoottia
äänestettäessä kopioidaan aktiivisen taulukon sisältö väliaikaiseen taulukkoon ja asetetaan
väliaikainen taulukko useState() käyttämällä tilan muutokseen reagoivaksi taulukoksi.

useState täytyy importtaa react -kirjastosta.
