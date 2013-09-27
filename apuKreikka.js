window.onload = function() {
    //luodaan screen-luokan olio
    var naytto = new Screen("Roomalaiskirje");
    
    //document.write(naytto.kirje);
    naytto.tulostaMain();
}
var sana = new Sana("", "n-nsm", "#ffffff");

/** Screen olio, joka huolehtii ohjelman tulostamisen
 * 
 * Huolehtii lomakkeen ja muun näkyvän tulostamisesta sekä isännöi globaaleja 
 * metodeja. Olion vastuulla kaikki tulostettava ja käyttäjän syöte.
 *
 * Attribuutit:
 * -kirjeen nimi???
 * Metodit:
 * tulostaMain() => done, muuten mutta nyt pitäis saada sana-oliolta apua
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

    // Liitetään metodit olioon:
    this.tulostaMain = tulostaMain;

    /*
     * funktion tehtävänä on tulostaa käyttöliittymän pääikkuna
     * TODO: sana-oliolta apua
     */
    function tulostaMain()
    {
        //document.write('<div class="jae"><h2>1 jae:</h2>');
        var divJae = document.createElement("div");
        divJae.setAttribute("class", "jae");
        document.body.appendChild(divJae);

        var h2Jae = document.createElement("h2");
        divJae.appendChild(h2Jae);
        h2Jae.appendChild(document.createTextNode("1. jae:"));

        var br = document.createElement("br");


        for (var i = 0; i < 10; i++)
        {
            var divSolu = document.createElement("div");
            divSolu.setAttribute("class", "solu");
            divJae.appendChild(divSolu);

            var span = document.createElement("span");
            span.className = "solu-sijamuoto-span";
            divSolu.appendChild(span);
            var smInput = document.createElement("input"); //sm-input
            smInput.className = "solu-sijamuoto-input";
            smInput.value = i;
            smInput.id = "sijamuoto";
            smInput.type = "text";
            smInput.name = "sijamuoto11";
            smInput.tabindex = i;
            smInput.maxlength = "10";
            smInput.size = "10";
            smInput.title = "";
            span.appendChild(smInput);

            var img = document.createElement("img");
            img.id = "kuvake";
            img.src = "http://griponclimate.files.wordpress.com/2013/03/wrong.png";
            img.alt = "väärä";
            img.title = "";
            img.className = "visible";
            span.appendChild(img);

            var label = document.createElement("label"); //kreikan sana
            label.appendChild(document.createTextNode(sana.getGreekWord()));
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
            divSolu.appendChild(suomInput);
        }
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

    /*
     * funktion tehtävänä palauttaa olion kreikkalainen "nimi"
     * 
     */
    function getGreekWord()
    {
       return "Παῦλος";
    }
}