"use strict";

// Does not support tempo/time-signature changes (yet)
var Track = function (midiTrackData) {
    var _track = {
        notes: [],
        bpm: 120,
        timeSignature: [4,4],
        measureDuration: 0,
        measures: 4,
        beatsPerMeasure: 4
    };

    for (var beatTime in midiTrackData) {
        if (midiTrackData.hasOwnProperty(beatTime)) {
            var beatData = midiTrackData[beatTime];

            for (var j=0; j < beatData.length; j++) {
                var noteData = beatData[j];

                if (noteData.type === "note") {
                    _track.notes[_track.notes.length] = new Note(noteData, beatTime);
                }
                else if (noteData.type === "tempo") {
                    _track.bpm = noteData.bpm;
                    _track.measureDuration = noteDuration(1, _track.bpm);
                }
                else if (noteData.type === "time signature") {
                    _track.timeSignature = [noteData.numerator, noteData.denominator];
                }
            }
        }
    }
    _track.beatsPerMeasure = _track.timeSignature[0];
    _track.measures = _measureCountFromNotes(_track.notes, _track.beatsPerMeasure);
    return _track;
};

var _measureCountFromNotes = function(notes, beatsPerMeasure) {
    //var beats = _.map(Object.keys(midiBeats), parseFloat);
    //console.log(beats);
    var lastBeatIndex = notes[notes.length-1].beat;
    return Math.ceil(lastBeatIndex / beatsPerMeasure);
};
