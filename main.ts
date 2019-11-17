// Gra w Papier Kamień i Nożyce
// dwie osoby
// klawiszem "A" wybieramy symbol, którym gramy
// klawiszem "B" potwierdzamy i wysyłamy do przciwnika
// jeśli wygrałem - wykrzyknik jest z mojej lewej strony
// jeśli przegrałem - wykrzyknij jest z prawej strony
// jeśli jest remis - wyświetla się znak "="
// 
// Do zrobienia:
// 1. można zrobić jeszcze inną prezentację kto wygrał lub przegrał
// 2. można wysłać wynik gry przeciwnikowi, aby też wyświetliło się u niego kto zwyciężył

let odebrane = 0 // zmienna przechowująca odebrany symbol
let PKN = 0 // nasz wybrany symbol
PKN = 0
// każde dwie grające osoby muszą wybrać ten sam tunel komunikacyjny/grupę
// czyli dwie osoby "1", kolejne dwie osoby "2" itd.
radio.setGroup(1)

// Funkcja wybierająca i wyświetlająca jakim symbolem chcemy grać
// Papier to "1" - symbol "Square"
// Nożyce to "2" - symbol "Scissors"
// Kamień to "3" - musieliśmy go sami narysować
// 
// Naciśnięcie klawisza "A" zmienia symbol
// w kolejności Papier->Nożyce->Kamień->Papier itd.
input.onButtonPressed(Button.A, function () {
    PKN = PKN + 1      // zmieniamy symbol na kolejny
    if (PKN > 3) {     // jeśli zmieniamy z Kamienia ("3") 
        PKN = 1        // to na Papier ("1")
    }
    if (PKN == 1) {
        basic.showIcon(IconNames.Square)   // wyświetlamy Papier
    } else if (PKN == 2) {
        basic.showIcon(IconNames.Scissors) // wyświetlamy Nożyce
    } else if (PKN == 3) {
        basic.showLeds(`                   
            . . # . .
            . # # # .
            # # # # #
            . # # # .
            . . # . .
            `)                             // wyświetlamy Kamień
    }
})


// Funkcja zatwierdzająca nasz wybór
// Przesyła przeciwnikowy nasz symbol (ze zmiennej "PKN")
input.onButtonPressed(Button.B, function () {
    radio.sendNumber(PKN)
})

// Funkcja główna -> oczekuje na symbol wybrany przez naszego przeciwnika
// i stosuje logikę gry w papier kamień i nożyce
// papier - owija kamień
// nożyce - tną papier
// kamień - tępi nożyce
// ten sam symbol - remis
radio.onReceivedNumber(function (receivedNumber) {
    odebrane = receivedNumber // taki symbol wysłał nam przeciwnik
    if (PKN == odebrane) {    // jeśli mamy takie same symbole
        basic.showString("=") // wyświetlamy, że jest remis
    } else if (PKN == 1 && odebrane == 3) { // ja mam Papier, przeciwnik ma Kamień
        basic.showLeds(`
            # . . . .
            # . . . .
            # . . . .
            . . . . .
            # . . . .
            `)                              // Wygrałem!
    } else if (PKN == 2 && odebrane == 1) { // ja mam Nożyce, przeciwnik ma Papier 
        basic.showLeds(`
            # . . . .
            # . . . .
            # . . . .
            . . . . .
            # . . . .
            `)                              // Wygrałem!
    } else if (PKN == 3 && odebrane == 2) { // ja mam Kamień, przeciwnik ma Nożyce
        basic.showLeds(`
            # . . . .
            # . . . .
            # . . . .
            . . . . .
            # . . . .
            `)                              // Wygrałem!
    } else if (PKN == 1 && odebrane == 2) { // ja mam Papier, przeciwnik ma Nożyce
        basic.showLeds(`
            . . . . #
            . . . . #
            . . . . #
            . . . . .
            . . . . #
            `)                              // Przegrałem :-(
    } else if (PKN == 3 && odebrane == 1) { // ja mam Kamień, przeciwnik ma Papier
        basic.showLeds(`
            . . . . #
            . . . . #
            . . . . #
            . . . . .
            . . . . #
            `)                              // Przegrałem :-(
    } else if (PKN == 2 && odebrane == 3) { // ja mam Nożyce, przeciwnik ma Kamień
        basic.showLeds(`
            . . . . #
            . . . . #
            . . . . #
            . . . . .
            . . . . #
            `)                              // Przegrałem :-(
    }
})

