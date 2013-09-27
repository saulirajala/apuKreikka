/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
window.onload = function() {
    //luodaan screen-luokan olio
    var naytto = new Screen("Roomalaiskirje");
    document.write(naytto.kirje);
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
        document.write('<div class="jae"><h2>1:</h2>');
        document.write('<div class="solu">');
        document.write('<input /><label>Greek</label><input />');
        document.write('</div></div>');
    }
} 