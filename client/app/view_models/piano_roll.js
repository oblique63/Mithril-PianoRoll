"use strict";

var PianoRoll = function(midiData) {
    var self = this;

    // TODO: use starting and ending octaves instead of octave count
    //this.lowestOctave = m.prop(0);
    //this.highestOctave = m.prop(4);
    this.octaves = m.prop(5);
    this.measures = m.prop(6);
    this.minimumMeasures = m.prop(4);
    this.beatsPerMeasure = m.prop(4);
    this.tempo = m.prop(120);

    this.hZoom = m.prop(100);
    this.vZoom = m.prop(100);

    this.midiData = m.prop(midiData || {});
    this.track = m.prop({});

    this.isEmpty = function () {
        return Object.keys(this.midiData()).length === 0;
    };

    this.loadMidi = function(midi) {
        self.midiData(midi);
        self.track( Track(midi[0]) );
        self.beatsPerMeasure(self.track().beatsPerMeasure);

        if (self.track().measures >= self.minimumMeasures()) {
            self.measures(self.track().measures);
        }
    };

    this.addMeasure = function() {
        self.measures(self.measures()+1);
    };

    this.removeMeasure = function() {
        if (self.measures() > self.minimumMeasures()) {
            self.measures(self.measures() - 1);
        }
    };

    this.beatWidth = function() {
        return (self.hZoom() / 100) * 40;
    };
    this.measureWidth = function() {
        var beatBorderWidth = 1;
        return (self.beatWidth() + beatBorderWidth) * self.beatsPerMeasure();
    };
    this.rowWidth = function() {
        var measureBorderWidth = 2;
        return (self.measureWidth() + measureBorderWidth) * self.measures();
    };
    this.rowHeight = function() {
        return (self.vZoom() / 100) * 30;
    };

    this.style = function() {
        return {
            measure: {
                width: self.measureWidth()+"px"
            },
            beat: {
                width: self.beatWidth()+"px",
                height: self.rowHeight()+"px"
            },
            row: {
                height: self.rowHeight()+"px",
                width: self.rowWidth()+"px"
            },
            key: {
                height: self.rowHeight()+"px"
            },
            octave: {
                width: self.rowWidth()+"px"
            }
        };
    };
};