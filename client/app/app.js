"use strict";

var app = {};

app.controller = function() {
    var self = this;
    this.pianoRoll = new PianoRoll();
    this.player = new SimpleSynthPlayer();
    this.volume = m.prop(90);

    this.fileHandler = new FileHandler(document.body, function (file) {
        var midi = new MIDIFileReader(new Html5FileStream(file));

        midi.read(function() {
            self.pianoRoll.loadMidi(midi.tracks);
            //console.log(JSON.stringify(midi.tracks, null, 2));
            m.redraw.strategy('diff');
            m.redraw(true);
        });
    });

    this.play = function() {
        self.player.play(
            self.pianoRoll.track().notes,
            self.pianoRoll.tempo(),
            self.volume()/100
        );
    };
};

app.view = function(ctrl) {
    return [
        makeTransport(ctrl),
        makeFileDropper(ctrl),
        m('#main', [
            makePianoRoll(ctrl),
            makeMidiEditor(ctrl)
        ])
    ];
};

var ctrl = new app.controller();
m.module(document.getElementById("app"), app);