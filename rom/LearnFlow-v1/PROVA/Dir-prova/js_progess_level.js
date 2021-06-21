let can;  // identifica l'elemento canvas
/* var content_pb; // identifica l'elemento contenuto nella pb nel caso volessi mostrare la percentuale*/
let c; //per la creazione di oggetti disegnabili 2d
let FINALLOAD; // fino a che punto volgio si carichi

let posX; //posizione centrale X canvas
let posY; // posizione centrale Y canva
let fps = 1; // velocità di caricamento graduale della barra ms

let oneProcent = 360 / 100; // varibile che serve per i calcoli ad indicare l'efftiva percentuale
let result; //risultato del calcolo dell'angolo scelto di fine in radianti

let radius=70; //raggio del cerchio
let line_width = 10; // spessore cerchio
let incomplete_col='#000'; // colore cerchio incompleto
let complete_col= '#3949AB'; // colore cerchio completo


function loadPB() {
    // identifica il canvas
    can = document.getElementById('pb_1');
    // cra un contesto di disegno nel canvas di tipo 2d
    c = can.getContext('2d');
    //si posiziona al centro del canvas
    posX = can.width / 2;
    posY = can.height / 2;
    // per il contorno "arrotondato" della barra
    c.lineCap = 'round';

    // si legge (tramite un tag) a che punto bisogna arrivare con la percentuale di caricamento della pb
    FINALLOAD = can.getAttribute('percentage');

    // a che percentuale deve caricarsi la progress-bar
    result = oneProcent * FINALLOAD;

    // fa partire la funzione di caricamento della progress-bar
    arcMove();
}

let deegres;
let acrInterval;

function arcMove(){

    deegres = 0; // gradi iniziali = 0

    acrInterval = setInterval ( // method calls a function or evaluates an expression at specified intervals (in milliseconds).
        function() { // funzione creata come parametro che fa aumentare la pb

            deegres += 1; //aumenta per l'intervallo fps i gradi da raggiungere

            c.clearRect( 0, 0, can.width, can.height ); /* method of the Canvas 2D API
            erases the pixels in a rectangular area by setting them to transparent black.*/

            // parte INcompleta
                    c.beginPath(); //inizia a far apparire la pb (la parte incompleta)
                    c.arc( posX, posY, radius, (Math.PI/180) * 270, (Math.PI/180) * (270 + 360) );
                    /*
                        si crea un cerchio
                        -   in centro posX,posY
                        -   di raggio raius,
                        -   parte da 270° (è radianti)
                        -   e finisce a 270+360 (giro completo)
                    */
                    c.strokeStyle = incomplete_col; // setta il colore di un bianchino (la parte da completare)
                    c.lineWidth = line_width; //aggiunge uno spessore
                    c.stroke(); // e termina la fase di costruzione del cerchio incolpleto

            // parte COmpleta
                    c.beginPath(); //inizia a far colorare la pb (la parte completata) (creando un altro arc overlappato al precedente)
                    c.arc( posX, posY, radius, (Math.PI/180) * 270, (Math.PI/180) * (270 + deegres) );
                    /*
                        si crea un cerchio (overlappato al prrecedente, quindi stesso centro e raggio)
                        -   in centro posX,posY
                        -   di raggio raius,
                        -   parte da 270° (è radianti)
                        -   e finisce a 270+deegres fin quando deegres aumenta il cerchio aumenta
                    */
                    c.strokeStyle = complete_col; // setta il colore che deve avere la parte di arc completa
                    c.lineWidth = line_width; // setta lo spessore
                    c.stroke(); // e termina la fase di costruzione del cerchio incolpleto

            if( deegres >= result ) clearInterval(acrInterval);
            // controlla che i degrees incrementali volta per volta siano < ai gradi che si vuole raggiungere

        },fps); //ovviamente questa funzione ha una durata di fps ms
}

//per cambiare all'occorrenza
function updateProgress(value, id){
    FINALLOAD=value;
    result = oneProcent * FINALLOAD;
    can = document.getElementById(id);
    c = can.getContext('2d');
    c.lineCap = 'round';
    posX = can.width / 2;
    posY = can.height / 2;
    arcMove();
}