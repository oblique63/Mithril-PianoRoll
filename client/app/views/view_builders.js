"use strict";

var makeTransport = function(ctrl) {
    return m('transport', [
        button('Play', ctrl.play),
        input(ctrl, {
            name: 'Tempo',
            id: 'tempo_input',
            class: 'tempo',
            onchange: m.withAttr('value', ctrl.pianoRoll.tempo),
            value: ctrl.pianoRoll.tempo()
        }),
        slider(ctrl, {
            name: 'Volume',
            id: 'volume_level',
            onchange: m.withAttr('value', ctrl.volume),
            value: ctrl.volume(),
            max: 100
        }),
        slider(ctrl, {
            name: 'Horizontal Zoom',
            id: 'horizontalZoomSelector',
            onchange: m.withAttr('value', ctrl.pianoRoll.hZoom),
            value: ctrl.pianoRoll.hZoom(),
            min: 30
        }),
        slider(ctrl, {
            name: 'Vertical Zoom',
            id: 'verticalZoomSelector',
            onchange: m.withAttr('value', ctrl.pianoRoll.vZoom),
            value: ctrl.pianoRoll.vZoom(),
            min: 40
        }),
        button('Remove Measure', ctrl.pianoRoll.removeMeasure),
        button('Add Measure', ctrl.pianoRoll.addMeasure)
    ]);
};


var makeFileDropper = function(ctrl) {
    if (ctrl.fileHandler.supported) {
        return [
            m('div.drag_drop_helper',
                'Load MIDI files with drag and drop.'),
            m('div.drop_indicator', {dragleave: ctrl.fileHandler.onDragLeave},
                m('div', 'Drop MIDI file to load it.')
            )
        ];
    }
    else {
        return m('.drag_drop_helper.not_supported',
            'File drag and drop not supported in this browser.');
    }
};


var makePianoKeys = function(ctrl, octave) {
    return _.map(NOTE_NAMES, function (name) {
        return m('key', {class:spellOut(name), title:name+octave, style: ctrl.pianoRoll.style().key});
    }).reverse();
};

var makePianoRoll = function(ctrl) {
    return m('piano_roll', makeOctaves(ctrl, makePianoKeys));
};

var makeOctaves = function(ctrl, makeContents) {
    var octaves = ctrl.pianoRoll.octaves();

    return _.times(octaves, function(i) {
        var octave = octaves-i-1; // 0-based octaves
        return m('octave', {number: octave, style: ctrl.pianoRoll.style().octave},
            makeContents(ctrl, octave));
    });
};

var makeRows = function(ctrl, octave) {
    var measures = ctrl.pianoRoll.measures();

    return _.map(NOTE_NAMES, function (name) {
        return m('row', {title:name+octave, style: ctrl.pianoRoll.style().row},
            _.times(measures, function() {
                return makeMeasure(ctrl);
            })
        );
    });
};

var makeMeasure = function (ctrl) {
    var beats = ctrl.pianoRoll.beatsPerMeasure();

    return m('measure', {style: ctrl.pianoRoll.style().measure},
        _.times(beats, function() {
            return m('beat', {duration:1/beats, style: ctrl.pianoRoll.style().beat});
        })
    );
};

var makeMidiEditor = function(ctrl) {
    return m('midi_editor',[
        m('layout', makeOctaves(ctrl, makeRows)),
        m('overlay', m('div'))
    ]);
};