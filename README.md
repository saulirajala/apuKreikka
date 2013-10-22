apuKreikka
==========
23.10.2013
Ohjelman toimintalogiikkaa muutettu.

Käyttäjältä kysytään aluksi haluaako hän 1) aloittaa uuden "session" vai 2) ladata 
JSON-tekstistä vanhan "sessionsa".
1) avaa perinteisen näkymän "tietokannasta" haetuilla tiedoilla

2) avaa div-lohkon, johon käyttäjä syöttää JSON-tekstin ja painaa nappia
=> ohjelma latautuu "perinteiseen" näkymään vanhoilla attribuuteilla

Eli vanhan lataus täytyy aina tapahtua sivun uudelleen latauksen kautta. Ensin
ladataan sivu, sitten tiedot

TODO:
sanaOliot-taulukon universaalisuus. Nyt kovakoodattu sanaOliot.length == 4.

Done:
ohjelma tallentaa sekä käyttäjän syöttämän sijamuodon, että suomennuksen.




apuKreikka 2.0 olioilla.
websovellus, joka auttaa kääntämään Ut:n kreikkaa.

