apuKreikka
==========
10.10.13
Työskennellään tallennuksen ja latauksen parissa.
Javascriptillä ei voi tallentaa, joten pitää ajax-kutsulla ja PHP:llä tallentaa.

Homman tulee toimia seuraavasti:
1) Ohjelman latautuessa muodostetaan jokaisesta Sana-oliosta JSON merkkijono 
    => laitetaan taulukkoon: JSON_sanat[jae][paikka]. Eli tämä tapahtuu heti sen
    jälkeen, kun sanat-oliot on luotu.
2) käyttäjän syöttäessä jotain => tarkista(). Ennen kuin tarkistetaan metodi 
    muuttaa JSON_sanat taulukosta ko. kohdan tekstin uudenlaiseksi 
    JSON merkkijonoksi. Tällöin mukaan tulee uusi käyttäjän syöte
    
    TODO
    2)-kohta tulee käydä läpi myös, kun syötetään suomennos tai maalataan tekstiä

3) Lataaminen on ihan oma juttunsa vielä



apuKreikka 2.0 olioilla.
websovellus, joka auttaa kääntämään Ut:n kreikkaa.

