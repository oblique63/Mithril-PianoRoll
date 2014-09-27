"use strict";

var NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
var _NOTE_COUNT = NOTE_NAMES.length;

// Accepts midi note data
var Note = function (noteData, beat) {
    var pitchInfo = midiToNote(noteData.pitch);

    return {
        beat: parseFloat(beat), // Beat was a string key in the original data structure coming out of the MIDIFileReader. Ensure it's a number.
        midiValue: noteData.pitch,
        velocity: noteData.velocity,
        duration: noteData.duration,
        release: noteData.release,
        pitch: pitchInfo[0],
        octave: pitchInfo[1]
    };
};

var numberToName = function (number) {
    while (number < 0) {
        number += _NOTE_COUNT;
    }

    return NOTE_NAMES[number % _NOTE_COUNT];
};

var nameToNumber = function (name) {
    var note = name.charAt(0).toUpperCase();
    var number = NOTE_NAMES.indexOf(note);
    var accidentals = _sumAccidentals(name) || 0;

    return (number + accidentals) % _NOTE_COUNT;
};

var midiToNote = function (midiNumber) {
    var note = midiNumber % _NOTE_COUNT;
    var octave = Math.floor(midiNumber / _NOTE_COUNT) - 1;

    return [NOTE_NAMES[note], octave];
};

var noteToMidi = function (note, octave) {
    var midi = (octave+1) * _NOTE_COUNT;
    midi += nameToNumber(note);

    return midi;
};


/*
 * Returns beat duration in seconds
 */
var noteDuration = function (beat, bpm) {
    return (60.0 * beat) / (bpm * (1/4))
};

var spellOut = function (noteName) {
    if (noteName.charAt(1) === "#") {
        return noteName.slice(0,1) + " sharp";
    }
    else if (noteName.charAt(1) === "b") {
        return noteName.slice(0,1) + " flat";
    }
    else if (noteName.length === 1) {
        return noteName;
    }
};


/*
 * Sums half-steps required for accidentals
 */
var _sumAccidentals = function (name) {
    var accidentals = name.slice(1);
    var sum = 0;

    for (var i = 0; i < accidentals.length; i++) {
        if (accidentals.charAt(i) === "#") {
            sum += 1;
        }
        else if (accidentals.charAt(i) === "b") {
            sum -= 1;
        }
        else {
            console.log("ERROR: invalid note name '"+name+"'");
            return;
        }
    }

    return sum;
};