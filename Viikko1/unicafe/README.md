# Unicafe

### Toiminnasta...

Sovelluksen kautta voi antaa palautetta Unicafelle. Palautteen tiedot
näytetään Statistic -otsikon alla eriteltynä. Annetut palautteet
säilyvä vain sen hetkisen istunnon ajan eli sivun refressauksessa
tiedot häviävät. Palautteen antamiseen on 3 eri nappia: good, bad ja neutral.
Annetuista palautteista lasketaan niiden määrien mukaisia tilastotietoja.
Jos palauttettakaan ei ole annettu tulostuu näytölle huomautus puuttuvista
palautteenanto -tiedoista. Statistic -komponentti käyttää StatisticLine 
-komponenttiä tietojen renderöimiseen näytölle. Laskutoimitusten tulokset
ovat rajoitettu 2 -desimaali n tarkkuuteen ja tiedot komponenteille 
välitetään propseina.