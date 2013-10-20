apuKreikka
==========
20.10.13
- lataus iframe on nyt valmiina
- Todo: lataus()-metodi

Homman tulee toimia seuraavasti:
1) tallennus-nappia painettaessa, tallennetaan olion attribuutit tiedostoon 
    - yritetään saada tämä JSON olioiden avulla, mutta metodi pitää ylikirjoittaa
      koska ei muuten pääse käsiksi yksityisiin metodeihin.
    - JSON toimii, mutta: JSON.parse ei osaa parsettaa useamman muuttujan joukkoa {...},{...},{...}
      vaan ladattaessa yksi {...} kerrallaan pitää parsettaa (jonkinlainen silmukka ja split??)

Mutta nyt siis oliot sarjalisoidaan ja ovat siten valmiita tiedostoon 
tallennukseen.

Tallennus tapahtuu siten, että tulostetaan joko uudelle välilehteen/alertin avulla
JSON stringit => käyttäjä kopioi ne => käyttäjä tallentaa tiedoston

ToDo:
-kopiointi ohjeet (nyt toimii alertilla, mikä on ok ainakin toistaiseksi) Joskus
 voisi tehdä fiksummin    

2) Lataaminen
Lataus tapahtuu: Käyttäjä painaa lataus-painiketta => aukeaa ikkuna, johon voi 
kopioida tiedostossa olevan tekstin => Käyttäjä kopioi teksin => 
käyttäjä painaa ok => uusi sivu latautuu

- käyttäjä painaa lataa-painiketta => syöttää tekstitiedoston => ohjelma avaa
    uuden sivun eli sen sivun, joka käyttäjällä on tallennettuna
- Kannattaisiko muokata SanaOlioiden muodostusta siten, että aina ne muodostetaan
    JSON.parse-metodin avulla. JSON stringi tulee joko käyttäjältä tai tietokannasta??
- JSON.parse ei osaa lukea kuin vain yhden olion attribuutit kerrallaan







apuKreikka 2.0 olioilla.
websovellus, joka auttaa kääntämään Ut:n kreikkaa.

