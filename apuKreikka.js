/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
window.onload = function() {
    //luodaan screen-luokan olio
    var naytto = new Screen("Roomalaiskirje");
    //document.write(naytto.kirje);
    naytto.tulostaMain();
}


/**
 * Screen olio, joka huolehtii ohjelman tulostamisen
 * Huolehtii lomakkeen ja muun näkyvän tulostamisesta sekä isännöi globaaleja 
 * metodeja. Olion vastuulla kaikki tulostettava ja käyttäjän syöte.
 *
 * Attribuutit:
 * -kirje???
 * Metodit:
 * tulostaLomake()
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



    // Liitetään metodi olioon:
    this.tulostaMain = tulostaMain;




    /*
     * funktion tehtävänä on tulostaa käyttöliittymän pääikkuna
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
            label.appendChild(document.createTextNode("Paulos"));
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