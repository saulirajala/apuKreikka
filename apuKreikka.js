//greekWords[jaeNro][sanat]
var greekWords = new Array();
var sijamuodot = new Array();
var portti = new Portti();

var sanaOliot = new Array();
sanaOliot[1] = new Array();
sanaOliot[2] = new Array();
sanaOliot[3] = new Array();
var nayttoSolu = new ScreenSolu();
var tapahtuma = new Tapahtuma();
var maalaa = new Maalaa();
var tabIndex = 1;
var s_tabIndex = 0;
var tallennus = "";
var naytto;
var str;



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
    naytto = new Screen("Roomalaiskirje");
    naytto.tulostaKysymys();
}

function Portti() {

    this.lataaVanha = lataaVanha; //ladataan sanat, yms. käyttäjän syötteestä
    this.lataaUusi = lataaUusi; //ladataan sanat, yms. "tietokannasta"
    this.makeSanaOliot = makeSanaOliot;
    this.lataaInput = lataaInput;

    /*
     * 
     * @returns {undefined}
     */
    function makeSanaOliot() {
        naytto.tulostaOtsikko();
        for (var j = 1; j < greekWords.length; j++) {
            sanaOliot[j] = new Array();
            for (var i = 0; i < greekWords[j].length; i++) {
                sanaOliot[j][i] = new Sana(greekWords[j][i], sijamuodot[j][i], "#ffffff", j + "-" + i, "", "");
            }
        }


        document.getElementById("lataaUusi").setAttribute("style", "display: none;");
        document.getElementById("lataaVanha").setAttribute("style", "display: none;");
        naytto.tulostaJakeet();
        naytto.tulostaNavi();
        naytto.tulostaLyhenteet();
        //naytto.tulostaIframe();

    }

    /*
     * 
     * @returns {undefined}
     */
    function lataaUusi() {

        greekWords[0] = new Array("Kuinka monta jaetta"); //pitäisi sisällään tarvittavaa meta-tietoa: jakeiden määrä, yms.
        greekWords[1] = new Array("1Παῦλος", "δοῦλος", "Χριστοῦ", "Ἰησοῦ,", "κλητὸς", "ἀπόστολος,", "ἀφωρισμένος", "εἰς", "εὐαγγέλιον", "θεοῦ,");
        greekWords[2] = new Array("2ὃ ", "προεπηγγείλατο ", "διὰ ", "τῶν ", "προφητῶν ", "αὐτοῦ ", "ἐν ", "γραφαῖς ", "ἁγίαις,");
        greekWords[3] = new Array("3περὶ ", "τοῦ ", "υἱοῦ ", "αὐτοῦ ", "τοῦ ", "γενομένου ", "ἐκ ", "σπέρματος ", "Δαυὶδ ", "κατὰ ", "σάρκα,");

        sijamuodot[1] = new Array("N-NSM", "N-NSM", "N-GSM", "N-GSM", "A-NSM", "N-NSM", "V-RPP-NSM", "PREP", "N-ASN", "N-GSM");
        sijamuodot[2] = new Array("R-ASN", "V-ADI-3S", "PREP", "T-GPM", "N-GPM", "P-GSM", "PREP", "N-DPF", "A-DPF");
        sijamuodot[3] = new Array("PREP", "T-GSM", "N-GSM", "P-GSM", "T-GSM", "V-2ADP-GSM", "PREP", "N-GSN", "N-PRI", "PREP", "N-ASF");

        makeSanaOliot();
    }


    function lataaVanha() {
        naytto.tulostaIframe();
        //lataaInput();
    }

    /* TODO 
     * 
     * Tässä vaiheessa SanaOliot-taulukkoa ei ole vielä esittelyä enempää luotu.
     * Siksi tässä pitäisi jotenkin pyöräyttää vastaavat for-silmukat kuin makeSanaOliot()
     * Haastavaksi tämän tekee, ettei JSON:nnässä ole eroteltu jakeita mitenkään
     * vaan kaikki ovat putkeen => pitää parsettaa paikasta
     * @param {type} arvo
     * @returns {undefined}
     */
    function lataaInput() {
        naytto.tulostaOtsikko();
        var JSON_teksti = document.getElementById("tekstiAlue").value;
        //parsetetaan JSON_teksti siten, että vain yksi olio kerrallaan
        var JSON_sanat = JSON_teksti.split("{"); //taulukkoon jokainen sana omaan soluun
        var jae;
        var paikka;
        for (var k = 1; k < JSON_sanat.length; k++) {

            //"{"greekWord":"PAavali","sijamuoto":"N-NSM","userInput":"DASF","bgColor":"#ffffff","paikka":"1-0"}"
            var JSON_yksi = "{" + JSON_sanat[k].slice(0, (JSON_sanat[k].lastIndexOf("}") + 1)); //lopusta pois ,"-merkit
            var id = JSON_yksi.slice((JSON_yksi.lastIndexOf(":") + 2), (JSON_yksi.lastIndexOf(":") + 5));

            id = id.split("-");  //id=1-0
            jae = id[0];
            paikka = id[1];
            var obj = JSON.parse(JSON_yksi);
            sanaOliot[jae][paikka] = new Sana(obj.greekWord, obj.sijamuoto, obj.bgColor, obj.paikka, obj.userInput, obj.suomennus);

        }
        
        document.getElementById("lataaUusi").setAttribute("style", "display: none;");
        document.getElementById("lataaVanha").setAttribute("style", "display: none;");
        document.getElementById("iframe").setAttribute("class", "hidden");
        naytto.tulostaJakeet();
        naytto.tulostaNavi();
        naytto.tulostaLyhenteet();

    }
}

/* Tapahtuma-olio, joka omistaa asetaKuuntelija()-metodin.
 * 
 * @returns {Tapahtuma}
 */
function Tapahtuma()
{
    // Liitetään metodit olioon:
    this.asetaKuuntelija = asetaKuuntelija;
    this.tarkista = tarkista;
    this.tallennusOlioon = tallennusOlioon;

    /*  Funktio asettaa tapahtuman kuuntelijan parametrina tuotuun elementtiin
     * 
     * @param {type} elementti
     * @returns {undefined}
     */
    function asetaKuuntelija(elementti) {
        if (elementti.id.slice(0, 9) == "sijamuoto") {
            if (elementti.addEventListener) {
                elementti.addEventListener('change', tarkista, false);
            } else if (elementti.attachEvent) {
                elementti.attachEvent('onchange', tarkista);
            }
        }
        else {
            if (elementti.addEventListener) {
                elementti.addEventListener('change', tallennusOlioon, false);
            } else if (elementti.attachEvent) {
                elementti.attachEvent('onchange', tallennusOlioon);
            }
        }
    }
    
    /* Tarkistaa onko input olion sijamuoto
     * jos on => vaihtaa kuvan class=visible ja src=oikein.jpg
     * jos ei => vaihtaa kuvan class=visible
     * 
     * @returns {undefined}
     */
    function tallennusOlioon() {
        var id = this.getAttribute("id");
        id = id.slice(9).toString();  //id=1-0
        var taulukko = id.split("-"); // {1, 0}
        sanaOliot[taulukko[0]][taulukko[1]].setSuomennus(this.value); //asetaan käyttäjän syöte olioon
        
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
        sanaOliot[taulukko[0]][taulukko[1]].setInput(this.value.toUpperCase()); //asetaan käyttäjän syöte olioon
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
 * Metodit:
 * tulostaMain() => done
 * tulostaLyhenteet() => done
 * tulostaMenu() => TODO
 * merkkaa(input color, olio.setColor()) => TODO: omaan olioon???
 * @param {kirje} mista Raamatun kirjasta on kyse
 * @returns {Screen}
 */
function Screen(kirje)
{
    this.kirje = kirje;
    this.tulostaJae = tulostaJae;
    this.tulostaLyhenteet = tulostaLyhenteet;
    this.tulostaNavi = tulostaNavi;
    this.tulostaIframe = tulostaIframe;
    this.tulostaKysymys = tulostaKysymys;
    this.tulostaOtsikko = tulostaOtsikko;
    this.tulostaJakeet = tulostaJakeet;
    var divMain;

    divMain = document.createElement("div");
    divMain.className = "divMain";
    document.body.appendChild(divMain);

    function tulostaJakeet() {
        for (var jaeNro = 1; jaeNro < sanaOliot.length; jaeNro++) {
            naytto.tulostaJae(jaeNro);
            tabIndex = tabIndex + s_tabIndex;
        }
    }

    function tulostaOtsikko() {
        var h1 = document.createElement("h1");
        h1.appendChild(document.createTextNode(kirje));
        divMain.appendChild(h1);
    }
    /*
     * 
     * @returns {undefined}
     */
    function tulostaKysymys() {
        var input = document.createElement("input");
        input.type = "button";
        input.value = "Uusi";
        input.id = "lataaUusi";
        input.setAttribute("style", "position: absolute; top: 100px; left: 0;")
        input.setAttribute("onClick", "portti.lataaUusi()");

        var input2 = document.createElement("input");
        input2.type = "button";
        input2.value = "Lataa vanha";
        input2.id = "lataaVanha";
        input2.setAttribute("style", "position: absolute; top: 100px; left: 100px;")
        input2.setAttribute("onClick", "portti.lataaVanha()");
        document.body.appendChild(input);
        document.body.appendChild(input2);
    }

    /*
     * 
     * @returns {undefined}
     */
    function tulostaIframe() {
        var divIframe = document.createElement("div");
        divIframe.id = "iframe";
        divIframe.className = "lataaIframe_visible";
        var form = document.createElement("form");
        form.name = "iframeForm";
        var input = document.createElement("input");
        input.type = "button";
        input.value = "Lataa";
        var label = document.createElement("label");
        label.setAttribute("for", "tekstiAlue");
        label.appendChild(document.createTextNode("Kopioi tähän aiemmat merkintäsi"));
        var textarea = document.createElement("textarea");
        textarea.name = "tekstiAlue";
        textarea.id = "tekstiAlue";
        input.setAttribute("onClick", "portti.lataaInput()");
        form.appendChild(label);
        form.appendChild(textarea);
        form.appendChild(input);
        divIframe.appendChild(form);
        document.body.appendChild(divIframe);
    }

    /*
     * Tulostaa halutun jakeen. Käyttää apurina ScreenSolu-oliota.
     * @param jaeNro > Mikä jae pitää tulostaa?
     * 
     * @returns {undefined}
     */
    function tulostaJae(jaeNro)
    {
        var divJae = document.createElement("div");
        divJae.setAttribute("class", "jae");
        divMain.appendChild(divJae);

        var h2Jae = document.createElement("h2");
        divJae.appendChild(h2Jae);
        h2Jae.appendChild(document.createTextNode(jaeNro + ". jae:"));

        for (var i = 0; i < sanaOliot[jaeNro].length; i++) {
            nayttoSolu.tulostaSolu(divJae, jaeNro, i);
        }
    }

    function tulostaLyhenteet()
    {
        var divAlaTausta = document.createElement("div");
        divAlaTausta.className = "alaPalkkiTausta";
        document.body.appendChild(divAlaTausta);

        var divAla = document.createElement("div");
        divAla.className = "alaPalkki";
        divAlaTausta.appendChild(divAla);

        var h1 = document.createElement("h1");
        h1.appendChild(document.createTextNode("Sijamuodon syntaksi"));
        divAla.appendChild(h1);

        var ul = document.createElement("ul");
        var taulukko = new Array("SL(-TenseVoiceMood)", "(-caseNumberGender)", "(-personNumber)");
        for (var i = 0; i < taulukko.length; i++)
        {
            var li = document.createElement("li");
            li.appendChild(document.createTextNode(taulukko[i]));
            ul.appendChild(li);
        }
        divAla.appendChild(ul);


        var lyhenteet = new Array();
        lyhenteet[0] = new Array("1. Sanaluokka=SL", "N: Substantiivi", "V: Verbi", "ADJ: Adjektiivi", "ADV: Adverbi", "CONJ: Konjuktio", "COND: Konditionaali", "PRT: Partikkeli", "PREP: Prepositio");
        lyhenteet[1] = new Array("2. Tense", "P: Preesens", "I: Imprerfekti", "F: Futuuri", "2F: 2. futuuri", "A: Aoristi", "2A: 2. aoristi", "R: Perfekti", "2R: 2. perfekti", "L: Pluskvamperfekti", "2. L: 2. pluskvamperfekti");
        lyhenteet[2] = new Array("3. Voice", "A: Aktiivi", "M: Mediumi", "P: Passiivi", "D: Mediumi deponentti", "O: Passiivi deponentti", "N: Med. tai pas. deponentti");
        lyhenteet[3] = new Array("4. Mood", "I: Indikatiivi", "S: Konjuktiivi", "O: Optatiivi", "M: Imperatiivi", "N: Infinitiivi", "P: Partisiippi", "R: Välttämätön partisiippi");
        lyhenteet[4] = new Array("5. Case", "N: Nominatiivi", "V: Vokatiivi", "G: Genetiivi", "D: Datiivi", "A: Akkusatiivi");
        lyhenteet[5] = new Array("6. Number", "S: Yksikkö", "P: Monikko");
        lyhenteet[6] = new Array("7. Gender", "M: Maskuliini", "F: Feminiini", "N: Neutri");
        lyhenteet[7] = new Array("8. Person", "1: 1. persoona", "2: 2. persoona", "3: 3. persoona");

        for (var j = 0; j < lyhenteet.length; j++) {
            var dl = document.createElement("dl");
            divAla.appendChild(dl);
            for (var i = 0; i < lyhenteet[j].length; i++) {
                if (i == 0) {
                    var dt = document.createElement("dt");
                    dt.appendChild(document.createTextNode(lyhenteet[j][i]));
                    dl.appendChild(dt);
                    continue;
                }
                var dd = document.createElement("dd");
                dd.appendChild(document.createTextNode(lyhenteet[j][i]));
                dl.appendChild(dd);
                //divSivuPalkki.appendChild();
            }
        }
    }
    /*
     * Funktio tulostaa navigointivalikon 
     *
     */
    function tulostaNavi()
    {
        var divNaviTausta = document.createElement("div");
        divNaviTausta.className = "divNaviTausta";
        divNaviTausta.id = "divNaviTausta";
        document.body.appendChild(divNaviTausta);
        var divNavi = document.createElement("div");
        divNavi.className = "divNavi";
        divNavi.id = "divNavi";
        divNaviTausta.appendChild(divNavi);

        var divNaviDockLeft = document.createElement("div");
        divNaviDockLeft.className = "divNaviDockLeft";
        divNaviDockLeft.id = "divNaviDockLeft";
        divNavi.appendChild(divNaviDockLeft);
        var dock = new MacStyleDock(
                document.getElementById("divNaviDockLeft"),
                [
                    {
                        name: "kuvakkeet/info",
                        extension: ".png",
                        sizes: [48, 48],
                        onclick: function() {
                            alert("apuKreikka on alkukielisen Ut:n kääntämiseen tarkoitettu työväline. \nOhjelma automaattisesti tarkistaa oletko analysoinut sanan sijamuodon oikein.\n\nKreikan teksti: greekbible.com, http://www.greekbible.com. \nSijamuodot: biblestudytools.com/, http://www.biblestudytools.com/ \n\n\n2013\napuKreikka 2.0 (c) Sauli J. Rajala. ");
                        }
                    },
                    {
                        name: "kuvakkeet/tallenna",
                        extension: ".png",
                        sizes: [48, 48],
                        onclick: function() {
                            var JSON_sanat = new Array();
                            for (var j = 1; j < sanaOliot.length; j++) {
                                JSON_sanat[j] = new Array();
                                for (var i = 0; i < sanaOliot[j].length; i++) {
                                    JSON_sanat[j][i] = JSON.stringify(sanaOliot[j][i]);
                                }
                            }
                            tallennus = JSON_sanat.toString().replace(/\\/g, "");
                            tallennus = tallennus.replace(/\},","\{/g, "},{");
                            alert(tallennus);
                        }
                    },
                    {
                        name: "kuvakkeet/kansio",
                        extension: ".png",
                        sizes: [48, 48],
                        onclick: function() {
                            /*
                             var teksti = "{\"greekWord\":\"Παῦλος\",\"sijamuoto\":\"N-NSM\",\"userInput\":\"tyhja\",\"bgColor\":\"#ffffff\",\"paikka\":\"1-0\"}";
                             var obj = JSON.parse(teksti); //osaisiko parse vain yhden ei monen kokoelmaa
                             //console.log(tallennus);
                             console.log(obj);*/


                            if (document.getElementById("iframe").className == "lataaIframe_hidden") {
                                document.getElementById("iframe").className = "lataaIframe_visible";
                            }
                            else {
                                document.getElementById("iframe").className = "lataaIframe_hidden";
                            }
                            ;

                        }
                    },
                    {
                        name: "kuvakkeet/korosta",
                        extension: ".png",
                        sizes: [48, 48],
                        onclick: function() {
                            maalaa.maalaaSelectedText();
                        }
                    }
                ], 38, 48, 2);

        var divNaviDockRight = document.createElement("div");
        divNaviDockRight.className = "divNaviDockRight";
        divNaviDockRight.id = "divNaviDockRight";
        divNavi.appendChild(divNaviDockRight);
        var dock2 = new MacStyleDock(
                document.getElementById("divNaviDockRight"),
                [
                    {
                        name: "kuvakkeet/vasen2",
                        extension: ".png",
                        sizes: [48, 48],
                        onclick: function() {

                        }
                    },
                    {
                        name: "kuvakkeet/oikea2",
                        extension: ".png",
                        sizes: [48, 48],
                        onclick: function() {
                            alert("You clicked on right icon");
                        }
                    }

                ],
                32,
                48,
                2);
        var divSelect = document.createElement("div");
        divSelect.className = "divSelect";
        divNavi.appendChild(divSelect);
        var selectBook = document.createElement("select");
        selectBook.id = "kirja";
        selectBook.name = "kirja";
        divSelect.appendChild(selectBook);
        var optgroup = document.createElement("optgroup");
        optgroup.label = "Valitse Ut:n kirja";
        selectBook.appendChild(optgroup);
        var booksArray = new Array("Matt.", "Mark.", "Luuk.", "Joh.", "Apt.", "Room.", "1. Kor.", "2. Kor.", "Gal.", "Efe.", "Fil.", "Kol.", "1. Tess.", "2. Tess.", "1. Tim.", "2. Tim.", "Titus", "Filemon", "Hepr.", "Jaakob", "1. Piet.", "2. Piet.", "1. Joh.", "2. Joh.", "3. Joh.", "Juudas", "Ilm.");

        for (var i = 0; i < booksArray.length; i++)
        {
            var option = document.createElement("option");
            option.value = booksArray[i];
            option.appendChild(document.createTextNode(booksArray[i]));
            if (i == 5)
                option.setAttribute("selected", "selected");
            selectBook.appendChild(option);
        }

        var selectLuku = document.createElement("select");
        selectLuku.id = "Luku";
        selectLuku.name = "Luku";
        divSelect.appendChild(selectLuku);
        var lukuArray = new Array("1. luku", "2. luku", "3. luku");

        for (var i = 0; i < lukuArray.length; i++)
        {
            var option = document.createElement("option");
            option.value = lukuArray[i];
            option.appendChild(document.createTextNode(lukuArray[i]));
            selectLuku.appendChild(option);
        }
    }

}


/* Huolehtii yhden solun(sijamuoto-input, img, label ja suom.input) 
 * tulostamisesta. 
 * 
 * @returns {undefined}
 */
function ScreenSolu()
{
    this.tulostaSolu = tulostaSolu;

    /* Tulostaa solun
     * 
     * @param {type} divJae, Minkä div-lohkon lapseksi solu laitetaan
     * @param {type} jaeNro, Mikä jae on kyseessä?
     * @param {type} sananPaikka, Missä kohtaa jaetta sana/solu sijaitsee
     * @returns {undefined}
     */
    function tulostaSolu(divJae, jaeNro, sananPaikka)
    {
        var img, smInput;
        s_tabIndex = tabIndex + sanaOliot[jaeNro].length;
        var divSolu = document.createElement("div");
        divSolu.className = "solu";
        divJae.appendChild(divSolu);

        //<span><input id=sijamuoto/><img /></span>
        var span = document.createElement("span");
        span.className = "solu-sijamuoto-span";
        divSolu.appendChild(span);
        smInput = document.createElement("input"); //sm-input
        smInput.className = "solu-sijamuoto-input";
        smInput.value = sanaOliot[jaeNro][sananPaikka].getInput();
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

        //<label>paulos</label>
        var label = document.createElement("label"); //kreikan sana
        label.appendChild(document.createTextNode(sanaOliot[jaeNro][sananPaikka].getGreekWord()));
        label.className = "solu-greekWord-label";
        //label.setAttribute("style", "background: red;");
        divSolu.appendChild(label);

        //<input id=suomennos/>
        var suomInput = document.createElement("input"); //suom-input          
        suomInput.id = "suomennos" + jaeNro + "-" + sananPaikka;
        suomInput.type = "text";
        suomInput.name = "suomennos" + jaeNro + "-" + sananPaikka;
        suomInput.maxlength = "20";
        suomInput.size = "20";
        suomInput.value = sanaOliot[jaeNro][sananPaikka].getSuomennus();
        suomInput.title = "";
        suomInput.tabIndex = s_tabIndex;
        divSolu.appendChild(suomInput);
        tapahtuma.asetaKuuntelija(suomInput);
        tabIndex++;
    }
}

/* Sana-olio, joka huolehtii apuKreikan toiminnallisuuden ytimestä. Eli tarjoaa 
 * yhden kreikan sanan, sen sijamuodon ja värin.
 * 
 * @param {type} greekWord - kreikankielinen sana
 * @param {type} sijamuoto - sanan sijamuoto
 * @param {type} color - sijamuodon mukaan vaihtuva väri, oletuksena #ffffff
 * @param {type} paikka - sanan paikka tekstissä (jae-paikkaJakeessa)
 * 
 * @returns {Sana}
 */
function Sana(grkWord, sm, color, sijainti, input, suom)
{
    var greekWord = grkWord; //luo yksityisen muuttujan, joka saatavilla vain oliolle. TODO: muuta kaikki     
    var sijamuoto = sm;
    var userInput = input;  //käyttäjän syöttämä input, joka tallennetaan
    var bgColor = color;
    var paikka = sijainti;
    var suomennus = suom;
    this.getGreekWord = getGreekWord;
    this.getSijamuoto = getSijamuoto;
    this.getPaikka = getPaikka;
    this.getInput = getInput;
    this.getSuomennus = getSuomennus;
    this.getBgColor = getBgColor;
    this.setColor = setColor;
    this.setInput = setInput;
    this.setGreekWord = setGreekWord;
    this.setSuomennus = setSuomennus;
    this.toJSON = toJSON;

    var jae = paikka.split("-"); // {1, 0}

    /* Tällä ylikirjoitetaan se, mitä Stringify oletuksena palauttaa */
    function toJSON() {
        return '{"greekWord":"' + greekWord + '","sijamuoto":"' + sijamuoto + '","userInput":"' + userInput + '","bgColor":"' + bgColor + '","suomennus":"' + suomennus + '","paikka":"' + paikka + '"},';
    }
    /* 
     * Funktion tehtävänä palauttaa olion kreikkalainen "nimi"
     * @returns {string} greekWord - palauttaa kreikankielisen sanan
     */
    function getGreekWord()
    {
        return greekWord;
    }

    /*
     * Funktion tehtävänä palauttaa olion sijamuoto 
     * @returns {string} sijamuoto - palauttaa sanan sijamuodon
     */
    function getSijamuoto()
    {
        return sijamuoto;
    }

    /*
     * Funktion tehtävänä palauttaa olion kreikkalainen "nimi"
     * @returns {string} paikka - palauttaa sanan paikan (jae-paikkaSanassa)
     */
    function getPaikka()
    {
        return paikka;
    }

    /*
     * Funktion tehtävänä palauttaa sanan taustaväri.
     * @returns {string} color - palauttaa sanan taustavärin.
     */
    function getBgColor()
    {
        return bgColor;
    }

    function getInput()
    {
        return userInput;
    }

    function getSuomennus()
    {
        return suomennus;
    }

    /*
     * Funktion tehtävänä on asettaa parametrina tuleva uusi väri taustaväriksi. 
     * @param {type} newColor - uusi taustaväri
     * @returns {Sana.setColor}
     */
    function setColor(newColor)
    {
        bgColor = newColor;
    }

    function setInput(input)
    {
        userInput = input;
    }
    
    function setSuomennus(newSuom) {
        suomennus = newSuom;
    }

    function setGreekWord(newGrWord)
    {
        greekWord = newGrWord;
    }


}

/* Maalaa-olio, joka laittaa päälle maalaustyökalun ja huolehtii varsinaisesta
 * sanan maalaamisesta
 * Toimintaperiaate: 1) maalaa sana 2) paina maalauspainiketta/väriä => sana maalataan
 * Eli maalauspainike ei laita päälle mitään maalaustyökalua vaan siitä saa valittua värin
 * => maalauspainikkeen voisi korvata eri väreillä/värivalikolla
 * 
 * Nyt homma toimii, mutta ilman yhteistyötä sana-olioiden kanssa => ei voi tallentaa niin helposti
 * TODO: yhteistyöhön sana-olioiden kanssa. getColor() ja setColor(). Tätä varten pitää jotenkin 
 * tunnistaa mistä sana-oliosta on kyse. Pitäisikö kenties ympäröidä kaikki sanat span-elementillä?
 * Vai maalata label-elementti, jolloin punainen väri täyttää koko labeli (pelkän tekstin lisäksi)?
 * 
 * Kuitenkin ydinongelma on nyt saada selville, mikä label on valittuna???
 * 
 * 
 * Todennäköisesti tämä täytyy tehdä niin, että jokaiseen labeliin lisätään
 * kuuntelija joka kuuntelee koska label maalataan. Tällöin toiminnallisuus 
 * olisi seuraavanlainen:
 * 1) paina maalaa-painiketta
 * 2) valitse sanan, jonka haluat maalata => ohjelma automaattisesti maalaa sanan
 *      ja poistaa valinnan
 *      
 * Jätetään tämä asia hautumaan ja siirrytään olioiden tallentamiseen ja 
 * lataamiseen, mikä on tällä hetkellä suurin ongelma.
 * 
 * @returns {Sana}
 */
function Maalaa()
{
    this.maalausNappiaPainettu = maalausNappiaPainettu;
    this.maalaaSelectedText = maalaaSelectedText;


    /* Maalaa valitun tekstin
     * 
     * @returns {undefined}
     */
    function maalausNappiaPainettu()
    {
        //maalaaSelectedText();
    }

    /* Laittaa käyttäjän valitseman tekstin ympärille span-elementit
     * Netistä ladattu: jostain stackoverflow.com
     * 
     * @returns {unresolved}
     */
    function maalaaSelectedText() {

        if (typeof window.getSelection != "undefined") { //tämä ilmeisesti ei-ie:lle
            var span = document.createElement("span");
            span.setAttribute("style", "background-color: red;");
            var valinta = window.getSelection();
            var range = valinta.getRangeAt(0);
            range.surroundContents(span);
            poistaValinta();


        } else if (typeof document.selection != "undefined" && document.selection.type == "Text") { //tämä ie:lle
            text = document.selection.createRange().text;
            poistaValinta();

        }

        /*
         * Poistaa käyttäjän valinnan. Netistä ladattu
         * http://stackoverflow.com/questions/3169786/clear-text-selection-with-javascript
         */
        function poistaValinta() {
            if (window.getSelection) {
                if (window.getSelection().empty) {  // Chrome
                    window.getSelection().empty();
                } else if (window.getSelection().removeAllRanges) {  // Firefox
                    window.getSelection().removeAllRanges();
                }
            } else if (document.selection) {  // IE?
                document.selection.empty();
            }
        }

    }
}