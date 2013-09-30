var img, smInput;
var greekWords = new Array();
greekWords[0] = new Array("Kuinka monta jaetta"); //pitäisi sisällään tarvittavaa meta-tietoa: jakeiden määrä, yms.
greekWords[1] = new Array("Παῦλος", "δοῦλος", "Χριστοῦ", "Ἰησοῦ,", "κλητὸς", "ἀπόστολος,", "ἀφωρισμένος", "εἰς", "εὐαγγέλιον", "θεοῦ,");
greekWords[2] = new Array("2ὃ ", "προεπηγγείλατο ", "διὰ ", "τῶν ", "προφητῶν ", "αὐτοῦ ", "ἐν ", "γραφαῖς ", "ἁγίαις,");
greekWords[3] = new Array("3περὶ ", "τοῦ ", "υἱοῦ ", "αὐτοῦ ", "τοῦ ", "γενομένου ", "ἐκ ", "σπέρματος ", "Δαυὶδ ", "κατὰ ", "σάρκα,");
var sijamuodot = new Array();
sijamuodot[1] = new Array("N-NSM", "N-NSM", "N-GSM", "N-GSM", "A-NSM", "N-NSM", "V-RPP-NSM", "PREP", "N-ASN", "N-GSM");
sijamuodot[2] = new Array("R-ASN", "V-ADI-3S", "PREP", "T-GPM", "N-GPM", "P-GSM", "PREP", "N-DPF", "A-DPF");
sijamuodot[3] = new Array("PREP", "T-GSM", "N-GSM", "P-GSM", "T-GSM", "V-2ADP-GSM", "PREP", "N-GSN", "N-PRI", "PREP", "N-ASF");
//greekWords[jaeNro][sanat]

var sanaOliot = new Array();
for (var j = 1; j < greekWords.length; j++) {
    sanaOliot[j] = new Array();
    for (var i = 0; i < greekWords[j].length; i++) {
        sanaOliot[j][i] = new Sana(greekWords[j][i], sijamuodot[j][i], "#ffffff", j + "-" + i);
    }
}
var tapahtuma = new Tapahtuma();
var tabIndex = 1;
var s_tabIndex = 0;
/* TODO: tehdä tulostus täysin olioilla
 * 2. vaihe: for-silmukkaan
 * 
 * 
 */

/* kaikki näkyvä tulostus täytyy tapahtua vasta ikkunan ladattua eli tässä
 * window.onload funktiossa, koska muuten ei voida liittää bodyyn, mitään, koska
 * ei ole vielä olemassa bodya.
 * 
 * Toisaalta tämän funktion sisällä luotuihin olioihin pääsee käsiksi vain tässä
 * funktiossa
 * 
 * @returns {undefined}
 */
window.onload = function() {

    var naytto = new Screen("Roomalaiskirje");
    for (var jaeNro = 1; jaeNro < sanaOliot.length; jaeNro++) {
        naytto.tulostaJae(jaeNro);
        tabIndex = tabIndex+s_tabIndex;
    }
}
/* Tapahtuma-olio, joka tarkkailee parametrina tuodussa elementissä 
 * tapahtuvia muutoksia.
 * 
 * @param {type} elementti Mitä tarkkaillaan?
 * @returns {Tapahtuma}
 */
function Tapahtuma()
{
    // Liitetään metodit olioon:
    this.asetaKuuntelija = asetaKuuntelija;
    this.tarkista = tarkista;

    /*  Funktio asettaa tapahtuman kuuntelijan parametrina tuotuun elementtiin
     * 
     * @param {type} elementti
     * @returns {undefined}
     */
    function asetaKuuntelija(elementti) {
        if (elementti.addEventListener) {
            elementti.addEventListener('change', tarkista, false);
        } else if (elementti.attachEvent) {
            elementti.attachEvent('onchange', tarkista);
        }
    }

    /* Tarkistaa onko input olion sijamuoto
     * jos on => vaihtaa kuvan class=visible ja src=oikein.jpg
     * jos ei => vaihtaa kuvan class=visible
     * 
     * @returns {undefined}
     */
    function tarkista() {
        var id = this.getAttribute("id");
        id = id.slice(9).toString();  //id=1-0
        var taulukko = id.split("-"); // {1, 0}
        if (this.value.toUpperCase() === sanaOliot[taulukko[0]][taulukko[1]].getSijamuoto()) {
            document.getElementById("kuvake" + id).className = "visible";
            document.getElementById("kuvake" + id).src = "http://www.lookseeedit.com/resources/tick.jpg";
        } else {
            document.getElementById("kuvake" + id).className = "visible";
            document.getElementById("kuvake" + id).src = "http://griponclimate.files.wordpress.com/2013/03/wrong.png";
        }
    }
}

/** Screen olio, joka huolehtii ohjelman tulostamisen
 * 
 * Huolehtii lomakkeen ja muun näkyvän tulostamisesta sekä isännöi globaaleja 
 * metodeja. Olion vastuulla kaikki tulostettava ja käyttäjän syöte.
 * TabIndeksin tulostuksessa ongelmia
 * 
 *
 * Attribuutit:
 * -kirjeen nimi???
 * Metodit:
 * tulostaMain() => done
 * tulostaLyhenteet()
 * tulostaMenu()???
 * tarkista(input, olio.getSijamuoto())
 * merkkaa(input color, olio.setColor())
 * @param {kirje} mista Raamatun kirjasta on kyse
 * @returns {Screen}
 */
function Screen(kirje)
{
    // Sijoitetaan parametreina tulevat tiedot olion omiin muuttujiin:
    this.kirje = kirje;
    var h1 = document.createElement("h1");
    h1.appendChild(document.createTextNode(kirje));
    document.body.appendChild(h1);

    // Liitetään metodit olioon:
    this.tulostaJae = tulostaJae;



    /*
     * Tulostaa yhden jakeen annetuilla parametreillä
     * @param olioTaulukko {Objects Array} 
     * 
     * @returns {undefined}
     */
    function tulostaJae(jaeNro) //1-2
    {
        var divJae = document.createElement("div"); //jae-raja
        divJae.setAttribute("class", "jae");
        document.body.appendChild(divJae);

        var h2Jae = document.createElement("h2");
        divJae.appendChild(h2Jae);
        h2Jae.appendChild(document.createTextNode(jaeNro + ". jae:"));

        var nayttoSolu = new ScreenSolu(jaeNro);
        for (var i = 0; i < sanaOliot[jaeNro].length; i++) {
            nayttoSolu.tulostaSolu(divJae, i);
        }
    }
}
/*
 * 
 * @param {type} divJae
 * @param {type} jaeNro
 * @param {type} i
 * @returns {undefined}
 */
function ScreenSolu(jaeNro)
{
    this.jaeNro = jaeNro;
    this.tulostaSolu = tulostaSolu;

    function tulostaSolu(divJae, sananPaikka)
    {
        s_tabIndex = tabIndex + sanaOliot[jaeNro].length;
        var divSolu = document.createElement("div");
        divSolu.className = "solu";
        divJae.appendChild(divSolu);

        var span = document.createElement("span");
        span.className = "solu-sijamuoto-span";
        divSolu.appendChild(span);
        smInput = document.createElement("input"); //sm-input
        smInput.className = "solu-sijamuoto-input";
        smInput.value = "";
        smInput.id = "sijamuoto" + jaeNro + "-" + sananPaikka;          //ID
        smInput.type = "text";
        smInput.name = "sijamuoto" + jaeNro + "-" + sananPaikka;
        smInput.tabIndex = tabIndex;   //TODO laskee nyt 1+0
        smInput.maxlength = "10";
        smInput.size = "10";
        smInput.title = "";
        span.appendChild(smInput);
        tapahtuma.asetaKuuntelija(smInput);

        var img = document.createElement("img");
        img.id = "kuvake" + jaeNro + "-" + sananPaikka;                 //ID
        img.src = "http://griponclimate.files.wordpress.com/2013/03/wrong.png";
        img.alt = sanaOliot[jaeNro][sananPaikka].getSijamuoto();
        img.title = sanaOliot[jaeNro][sananPaikka].getSijamuoto();
        img.className = "hidden";
        span.appendChild(img);

        var label = document.createElement("label"); //kreikan sana
        label.appendChild(document.createTextNode(sanaOliot[jaeNro][sananPaikka].getGreekWord()));
        label.className = "solu-greekWord-label";
        divSolu.appendChild(label);

        var suomInput = document.createElement("input"); //suom-input          
        suomInput.id = "suomennos" + jaeNro + "-" + sananPaikka;
        suomInput.type = "text";
        suomInput.name = "suomennos" + jaeNro + "-" + sananPaikka;
        suomInput.maxlength = "20";
        suomInput.size = "20";
        suomInput.value = "";
        suomInput.title = "";
        suomInput.tabIndex = s_tabIndex;
        divSolu.appendChild(suomInput);
        tabIndex++;
    }

}
/* Sana-olio, joka Huolehtii apuKreikan toiminnallisuuden ytimestä. Eli tarjoaa 
 * yhden kreikan sanan, sen sijamuodon ja värin.
 * 
 * Attribuutit:
 * var greekWord
 * var sijamuoto
 * var color //kertoo taustavärin. default white, mutta esim. red, syanidi, jne.
 *  
 * Metodit:
 * setColor()
 * getGreekWord()
 * getSijamuoto()
 * 
 * @param {type} kirje
 * @returns {Screen}
 */
function Sana(greekWord, sijamuoto, color, paikka)
{
    // Sijoitetaan parametreina tulevat tiedot olion omiin muuttujiin:
    this.greekWord = greekWord;
    this.sijamuoto = sijamuoto;
    this.color = color;
    this.paikka = paikka;

    // Liitetään metodit olioon:
    this.getGreekWord = getGreekWord;
    this.getSijamuoto = getSijamuoto;
    this.getPaikka = getPaikka;

    /*
     * funktion tehtävänä palauttaa olion kreikkalainen "nimi"
     * 
     */
    function getGreekWord()
    {
        return this.greekWord;
    }
    /*
     * funktion tehtävänä palauttaa olion kreikkalainen "nimi"
     * 
     */
    function getSijamuoto()
    {
        return this.sijamuoto;
    }
    /*
     * funktion tehtävänä palauttaa olion kreikkalainen "nimi"
     * 
     */
    function getPaikka()
    {
        return this.paikka;
    }
}