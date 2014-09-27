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
            m.redraw.strategy('diff');
            m.redraw(true);

            document.querySelector('note').scrollIntoView(false);
        });
    });

    this.play = function() {
        if (!self.pianoRoll.isEmpty()) {
            self.player.play(
                self.pianoRoll.track().notes,
                self.pianoRoll.tempo(),
                self.volume() / 100
            );
        }
        else {
            console.log("WARNING: No MIDI Data Loaded");
        }
    };

    // Demo
    self.pianoRoll.loadMidi([
        {
            "0": [
                {
                    "type": "sequence name",
                    "text": "Electric Guitar"
                },
                {
                    "type": "program change",
                    "number": 27,
                    "channel": 1
                },
                {
                    "type": "tempo",
                    "bpm": 120
                },
                {
                    "type": "time signature",
                    "numerator": 4,
                    "denominator": 4
                },
                {
                    "type": "note",
                    "pitch": 55,
                    "velocity": 80,
                    "duration": 1,
                    "release": 64,
                    "channel": 1
                }
            ],
            "1": [
                {
                    "type": "note",
                    "pitch": 58,
                    "velocity": 80,
                    "duration": 0.75,
                    "release": 64,
                    "channel": 1
                }
            ],
            "3": [
                {
                    "type": "note",
                    "pitch": 55,
                    "velocity": 80,
                    "duration": 0.5,
                    "release": 64,
                    "channel": 1
                }
            ],
            "4": [
                {
                    "type": "note",
                    "pitch": 55,
                    "velocity": 80,
                    "duration": 1,
                    "release": 64,
                    "channel": 1
                }
            ],
            "5": [
                {
                    "type": "note",
                    "pitch": 62,
                    "velocity": 80,
                    "duration": 0.75,
                    "release": 64,
                    "channel": 1
                }
            ],
            "7": [
                {
                    "type": "note",
                    "pitch": 62,
                    "velocity": 80,
                    "duration": 0.5,
                    "release": 64,
                    "channel": 1
                }
            ],
            "8": [
                {
                    "type": "note",
                    "pitch": 55,
                    "velocity": 80,
                    "duration": 0.5,
                    "release": 64,
                    "channel": 1
                }
            ],
            "9": [
                {
                    "type": "note",
                    "pitch": 67,
                    "velocity": 80,
                    "duration": 0.5,
                    "release": 64,
                    "channel": 1
                }
            ],
            "11": [
                {
                    "type": "note",
                    "pitch": 57,
                    "velocity": 80,
                    "duration": 0.5,
                    "release": 64,
                    "channel": 1
                }
            ],
            "1.75": [
                {
                    "type": "note",
                    "pitch": 55,
                    "velocity": 80,
                    "duration": 0.25,
                    "release": 64,
                    "channel": 1
                }
            ],
            "2.25": [
                {
                    "type": "note",
                    "pitch": 55,
                    "velocity": 80,
                    "duration": 0.25,
                    "release": 64,
                    "channel": 1
                }
            ],
            "2.5": [
                {
                    "type": "note",
                    "pitch": 60,
                    "velocity": 80,
                    "duration": 0.5,
                    "release": 64,
                    "channel": 1
                }
            ],
            "3.5": [
                {
                    "type": "note",
                    "pitch": 53,
                    "velocity": 80,
                    "duration": 0.5,
                    "release": 64,
                    "channel": 1
                }
            ],
            "5.75": [
                {
                    "type": "note",
                    "pitch": 55,
                    "velocity": 80,
                    "duration": 0.25,
                    "release": 64,
                    "channel": 1
                }
            ],
            "6.25": [
                {
                    "type": "note",
                    "pitch": 55,
                    "velocity": 80,
                    "duration": 0.25,
                    "release": 64,
                    "channel": 1
                }
            ],
            "6.5": [
                {
                    "type": "note",
                    "pitch": 63,
                    "velocity": 80,
                    "duration": 0.5,
                    "release": 64,
                    "channel": 1
                }
            ],
            "7.5": [
                {
                    "type": "note",
                    "pitch": 55,
                    "velocity": 80,
                    "duration": 0.5,
                    "release": 64,
                    "channel": 1
                }
            ],
            "8.5": [
                {
                    "type": "note",
                    "pitch": 62,
                    "velocity": 80,
                    "duration": 0.5,
                    "release": 64,
                    "channel": 1
                }
            ],
            "9.5": [
                {
                    "type": "note",
                    "pitch": 55,
                    "velocity": 80,
                    "duration": 0.25,
                    "release": 64,
                    "channel": 1
                }
            ],
            "9.75": [
                {
                    "type": "note",
                    "pitch": 53,
                    "velocity": 80,
                    "duration": 0.25,
                    "release": 64,
                    "channel": 1
                }
            ],
            "10.25": [
                {
                    "type": "note",
                    "pitch": 53,
                    "velocity": 80,
                    "duration": 0.25,
                    "release": 64,
                    "channel": 1
                }
            ],
            "10.5": [
                {
                    "type": "note",
                    "pitch": 50,
                    "velocity": 80,
                    "duration": 0.5,
                    "release": 64,
                    "channel": 1
                }
            ],
            "11.5": [
                {
                    "type": "note",
                    "pitch": 55,
                    "velocity": 80,
                    "duration": 3,
                    "release": 64,
                    "channel": 1
                }
            ]
        }
    ]);
};

app.view = function(controller) {
    return [
        makeTransport(controller),
        makeFileDropper(controller),
        m('#main', [
            makePianoRoll(controller),
            makeMidiEditor(controller)
        ])
    ];
};

var ctrl = new app.controller();

m.module(document.getElementById("app"), app);