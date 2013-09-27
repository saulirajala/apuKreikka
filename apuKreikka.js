var greekWords = new Array("Παῦλος", "δοῦλος", "Χριστοῦ", "Ἰησοῦ,", "κλητὸς", "ἀπόστολος,", "ἀφωρισμένος", "εἰς", "εὐαγγέλιον", "θεοῦ,");
var sijamuodot = new Array("N-NSM", "N-NSM", "N-GSM", "N-GSM", "A-NSM", "N-NSM", "V-RPP-NSM", "PREP", "N-ASN", "N-GSM");

var sanat = new Array(); //luodaan taulukko, joka koostuu Sana-olioista
for (var i = 0; i < 10; i++)
{
    sanat[i] = new Sana(greekWords[i], sijamuodot[i], "#ffffff");
}
window.onload = function() {
    //luodaan screen-luokan olio
    var naytto = new Screen("Roomalaiskirje");
    naytto.tulostaMain();
    for (var i=0; i<10; i++){
        lisaaKuuntelija(document.getElementById("sijamuoto1-"+i), tarkista); //TODO: moninkertaistaa koskemaan kaikkia
    }
    

}

/**
 * Funktio lisää tapahtuman kuuntelijan parametrina annettuun elementtiin
 * @param {type} nappula Mitä elementtiä kuunnellaan?
 * @param {type} toiminto Mitä tehdään, kun toiminto tapahtuu?
 */
function lisaaKuuntelija(nappula, toiminto) {
    if (nappula.addEventListener) {
        nappula.addEventListener('change', toiminto, false);
    } else if (nappula.attachEvent) {
        nappula.attachEvent('onchange', toiminto);
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
    if (this.value.toUpperCase() === sanat[taulukko[1]].getSijamuoto()) {
        document.getElementById("kuvake" + id).className = "visible";
        document.getElementById("kuvake" + id).src = "http://www.lookseeedit.com/resources/tick.jpg";
    } else {
        document.getElementById("kuvake" + id).className = "visible";
        document.getElementById("kuvake" + id).src = "http://griponclimate.files.wordpress.com/2013/03/wrong.png";
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
 * @returns {Screen}
 */
function Screen(kirje)
{
    // Sijoitetaan parametreina tulevat tiedot olion omiin muuttujiin:
    this.kirje = kirje;
    var tabIndeksi = 1;
    
    // Liitetään metodit olioon:
    this.tulostaMain = tulostaMain;

    /*
     * funktion tehtävänä on tulostaa käyttöliittymän pääikkuna
     * 
     */
    function tulostaMain()
    {
        tulostaJae(1, 10);
        tulostaJae(2, 5);//DEMOTTU EI OIKEAT ARVOT
    }

    /*
     * Tulostaa yhden jakeen annetuilla parametreillä
     * @param {type} jaeNro otsikkoon
     * @param {type} sanojaJakeessa Kuinka monta sanaa tulostetaan?
     * @returns {undefined}
     */
    function tulostaJae(jaeNro, sanojaJakeessa)
    {
        var apu = 1*sanojaJakeessa+1;
        var divJae = document.createElement("div"); //jae-raja
        divJae.setAttribute("class", "jae");
        document.body.appendChild(divJae);

        var h2Jae = document.createElement("h2");
        divJae.appendChild(h2Jae);
        h2Jae.appendChild(document.createTextNode(jaeNro + ". jae:"));

        for (var i = 0; i < sanojaJakeessa; i++)
        {
            
            var divSolu = document.createElement("div");
            divSolu.setAttribute("class", "solu");
            divJae.appendChild(divSolu);

            var span = document.createElement("span");
            span.className = "solu-sijamuoto-span";
            divSolu.appendChild(span);
            var smInput = document.createElement("input"); //sm-input
            smInput.className = "solu-sijamuoto-input";
            smInput.value = "";
            smInput.id = "sijamuoto" + jaeNro + "-" + i;          //ID
            smInput.type = "text";
            smInput.name = "sijamuoto" + jaeNro + i;
            smInput.tabIndex = tabIndeksi;   //TODO laskee nyt 1+0
            smInput.maxlength = "10";
            smInput.size = "10";
            smInput.title = "";
            span.appendChild(smInput);

            var img = document.createElement("img");
            img.id = "kuvake" + jaeNro + "-" + i;                 //ID
            img.src = "http://griponclimate.files.wordpress.com/2013/03/wrong.png";
            img.alt = "väärä";
            img.title = "";
            img.className = "hidden";
            span.appendChild(img);

            var label = document.createElement("label"); //kreikan sana
            label.appendChild(document.createTextNode(sanat[i].getGreekWord()));
            //label.appendChild(document.createTextNode("paulos"));
            label.setAttribute("class", "solu-greekWord-label");
            divSolu.appendChild(label);

            var suomInput = document.createElement("input"); //suom-input          
            suomInput.id = "suomennos"; //TODO: oikeat indeksit
            suomInput.type = "text";
            suomInput.name = "suomennos"; //TODO: oikeat indeksit
            suomInput.maxlength = "20";
            suomInput.size = "20";
            suomInput.value = "";
            suomInput.title = "";
            suomInput.tabIndex = apu;
            divSolu.appendChild(suomInput);
            apu++;
            tabIndeksi++;
        }
        tabIndeksi = apu;
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
function Sana(greekWord, sijamuoto, color)
{
    // Sijoitetaan parametreina tulevat tiedot olion omiin muuttujiin:
    this.greekWord = greekWord;
    this.sijamuoto = sijamuoto;
    this.color = color;

    // Liitetään metodit olioon:
    this.getGreekWord = getGreekWord;
    this.getSijamuoto = getSijamuoto;

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
}