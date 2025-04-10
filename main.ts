let litera = ""
let numar_sertar = 0
let ultima_durata = 0
let cod_morse = ""
let timp_actual = 0
let timp_precedent = 0
let stare_senzor_actuala = 0
let stare_senzor_precedenta = 0
let litere = [
"A",
"B",
"C",
"D",
"E",
"F",
"G",
"H",
"I",
"J",
"K",
"L",
"M",
"N",
"O",
"P",
"Q",
"R",
"S",
"T",
"U",
"V",
"W",
"X",
"Y",
"Z",
"0",
"1",
"2",
"3",
"4",
"5",
"6",
"7",
"8",
"9"
]
let codurimorse = [
".-",
"-...",
"-.-.",
"-..",
".",
"..-.",
"--.",
"....",
"..",
".---",
"-.-",
".-..",
"--",
"-.",
"---",
".--.",
"--.-",
".-.",
"...",
"-",
"..-",
"...-",
".--",
"-..-",
"-.--",
"--..",
"-----",
".----",
"..---",
"...--",
"....-",
".....",
"-....",
"--...",
"---..",
"----."
]
basic.forever(function () {
    if (input.lightLevel() > 45) {
        stare_senzor_actuala = 1
        music.ringTone(262)
    } else {
        stare_senzor_actuala = 0
        music.stopAllSounds()
    }
    timp_actual = control.millis()
    ultima_durata = timp_actual - timp_precedent
    if (stare_senzor_precedenta != stare_senzor_actuala) {
        if (ultima_durata > 50 && ultima_durata <= 200 && stare_senzor_precedenta == 1) {
            cod_morse = "" + cod_morse + "."
        }
        if (ultima_durata > 200 && ultima_durata <= 600 && stare_senzor_precedenta == 1) {
            cod_morse = "" + cod_morse + "-"
        }
        if (ultima_durata > 200 && ultima_durata <= 600 && stare_senzor_precedenta == 0) {
            numar_sertar = codurimorse.indexOf(cod_morse)
            if (numar_sertar == -1) {
                serial.writeString("?")
            } else {
                litera = litere[numar_sertar]
                serial.writeString("" + (litera))
            }
            cod_morse = ""
        }
        if (ultima_durata > 600 && ultima_durata <= 1200 && stare_senzor_precedenta == 0) {
            numar_sertar = codurimorse.indexOf(cod_morse)
            if (numar_sertar == -1) {
                serial.writeString("?")
            } else {
                litera = litere[numar_sertar]
                serial.writeString("" + (litera))
            }
            serial.writeString(" ")
            cod_morse = ""
        }
        stare_senzor_precedenta = stare_senzor_actuala
        timp_precedent = timp_actual
    }
    if (ultima_durata > 1500 && cod_morse.length > 0) {
        numar_sertar = codurimorse.indexOf(cod_morse)
        if (numar_sertar == -1) {
            serial.writeLine("?")
        } else {
            litera = litere[numar_sertar]
            serial.writeLine("" + (litera))
        }
        cod_morse = ""
    }
})
