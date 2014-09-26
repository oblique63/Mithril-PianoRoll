"use strict";

var FileHandler = function(dropTarget, callback) {
    var self = this;

    this.dropTarget = dropTarget;
    this.callback = callback;
    this.supported = true;

    this._init = function() {
        if ( !(window.File && window.FileReader && window.FileList && window.Blob) ) {
            self.supported = false;
            //alert('The File APIs are not fully supported in this browser.');
        }
        else {
            self.dropTarget.addEventListener('dragenter', self.onDragEnter, false);
            self.dropTarget.addEventListener('dragover', self.onDragOver, false);
            self.dropTarget.addEventListener('drop', self.onFileSelect, false);
        }
    };

    this.onDragEnter = function(event) {
        //console.log('drag entered');
        self._stopEvent(event);
        return false;
    };
    this.onDragOver = function(event) {
        //console.log('drag over');
        self._stopEvent(event);
        event.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
    };
    this.onDragLeave = function(event) {
        //console.log('left drag');
        self._stopEvent(event);
    };

    this.onFileSelect = function(event) {
        self._stopEvent(event);
        var file = event.dataTransfer.files[0];
        self.callback(file);
    };

    this._stopEvent = function(event) {
        event.stopPropagation();
        event.preventDefault();
    };

    this._init();
};