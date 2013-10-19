apuKreikka
==========
19.10.13
Työskennellään tallennuksen ja latauksen parissa.
Javascriptillä ei voi tallentaa, joten pitää ajax-kutsulla ja PHP:llä tallentaa.

Homman tulee toimia seuraavasti:
1) tallennus-nappia painettaessa, tallennetaan olion attribuutit tiedostoon 
    - yritetään saada tämä JSON olioiden avulla, mutta metodi pitää ylikirjoittaa
      koska ei muuten pääse käsiksi yksityisiin metodeihin.
    - JSON toimii, mutta: JSON.parse ei osaa parsettaa useamman muuttujan joukkoa {...},{...},{...}
      vaan ladattaessa yksi {...} kerrallaan pitää parsettaa (jonkinlainen silmukka ja split??)

Mutta nyt siis oliot sarjalisoidaan ja ovat siten valmiita tiedostoon 
tallennukseen.

Tämä toteutetaan PHP:llä. Samalla pitää tallentaa metatietoja 
(mikä kirja ja luku), jotta voi ladata oikein => TODO

      

2) Lataaminen
- käyttäjä painaa lataa-painiketta => syöttää tekstitiedoston => ohjelma avaa
    uuden sivun eli sen sivun, joka käyttäjällä on tallennettuna





apuKreikka 2.0 olioilla.
websovellus, joka auttaa kääntämään Ut:n kreikkaa.

