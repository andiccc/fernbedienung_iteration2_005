serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    serielle_zeile = serial.readLine()
    if (serielle_zeile == "temp") {
        id = 5
        basic.showLeds(`
            # # # # #
            . . # . .
            . . # . .
            . . # . .
            . . # . .
            `)
    }
    if (serielle_zeile == "licht") {
        id = 6
        basic.showLeds(`
            # . . . .
            # . . . .
            # . . . .
            # . . . .
            # # # # .
            `)
        basic.pause(1000)
    }
})
radio.onReceivedValue(function (name, value) {
    if (name == "Temp") {
        serial.writeValue("Temperatur", value)
        basic.pause(2000)
    }
    if (name == "Licht") {
        serial.writeValue("Lichtstaerke", value)
        basic.pause(2000)
    }
})
let serielle_zeile = ""
let id = 0
id = 0
let varfunkgruppe = 0
let Temperatur = 100
radio.setGroup(varfunkgruppe)
let schalter = 0
basic.forever(function () {
    if (input.buttonIsPressed(Button.A)) {
        id = 1
    }
    if (input.buttonIsPressed(Button.B)) {
        id = 2
    }
    if (input.buttonIsPressed(Button.AB)) {
        id = 3
    }
    if (input.logoIsPressed()) {
        id = 4
    }
    if (input.buttonIsPressed(Button.A) && input.logoIsPressed()) {
        if (varfunkgruppe > 0) {
            varfunkgruppe += -1
            radio.setGroup(varfunkgruppe)
            basic.showString("" + (varfunkgruppe))
            basic.pause(500)
        }
        id = 0
    }
    if (input.buttonIsPressed(Button.B) && input.logoIsPressed()) {
        if (varfunkgruppe < 10) {
            varfunkgruppe += 1
            radio.setGroup(varfunkgruppe)
            basic.showString("" + (varfunkgruppe))
            basic.pause(500)
        }
        id = 0
    }
    radio.sendNumber(id)
    basic.clearScreen()
    if (id == 1) {
        basic.showLeds(`
            . . # . .
            . # . . .
            # # # # #
            . # . . .
            . . # . .
            `)
    } else if (id == 2) {
        basic.showLeds(`
            . . # . .
            . . . # .
            # # # # #
            . . . # .
            . . # . .
            `)
    } else if (id == 3) {
        basic.showLeds(`
            . . # . .
            . # # # .
            # . # . #
            . . # . .
            . . # . .
            `)
    } else if (id == 4) {
        basic.showLeds(`
            . . # . .
            . . # . .
            # . # . #
            . # # # .
            . . # . .
            `)
    } else {
        basic.showLeds(`
            # . . . #
            . # . # .
            . . # . .
            . # . # .
            # . . . #
            `)
    }
    Temperatur = 100
    if (id < 5) {
        id = 0
    }
})
