"use strict";

describe("Note Functions", function () {
    it("Should convert numbers to note names", function () {
        expect(numberToName(0)).toBe("C");
        expect(numberToName(1)).toBe("C#");
        expect(numberToName(3)).toBe("D#");
        expect(numberToName(13)).toBe("C#");
        expect(numberToName(-1)).toBe("B");
    });

    it("Should convert names to numbers", function () {
        expect(nameToNumber("C")).toBe(0);
        expect(nameToNumber("C#")).toBe(1);
        expect(nameToNumber("Db")).toBe(1);
        expect(nameToNumber("Ebb")).toBe(2);
        expect(nameToNumber("B#")).toBe(0);
        expect(nameToNumber("D#b")).toBe(2);
    });

    it("Should convert midi to notes", function () {
        expect(midiToNote(60)).toBe("C4");
        expect(midiToNote(62)).toBe("D4");
        expect(midiToNote(70)).toBe("A#4");
        expect(midiToNote(100)).toBe("E7");
    });

    it("Should convert notes to midi", function () {
        expect(noteToMidi("C", 4)).toBe(60);
        expect(noteToMidi("D", 4)).toBe(62);
        expect(noteToMidi("A#", 4)).toBe(70);
        expect(noteToMidi("E", 7)).toBe(100);
    });

    it("Should calculate note duration", function () {
        expect(noteDuration(1/2, 120)).toEqual(1);
        expect(noteDuration(1/4, 120)).toEqual(0.5);
        expect(noteDuration(1/8, 120)).toEqual(0.25);
        expect(noteDuration(1/4, 90)).toBeCloseTo(0.666);
    });
});