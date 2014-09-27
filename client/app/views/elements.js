"use strict";

var button = function (title, onClick, content) {
    var class_name = title.toLowerCase().split(' ').join('_');

    return m('button', {
        type: 'button',
        title: title,
        class: class_name,
        onclick: onClick
    }, content || title);
};

var input = function(ctrl, attrs) {
    return m('div', {name:attrs.name, class: 'input'}, [
        m('label', {'for': attrs.id}, attrs.name),
        m('input', attrs)
    ]);
};

var slider = function(ctrl, attrs) {
    attrs.type = 'range';
    attrs.min = attrs.min || 1;
    attrs.max = attrs.max || 200;

    return input(ctrl, attrs);
};

var table = function(rowData) {
    var row = function (cellData) {
        var cells = [];
        for (var i=0; i < cellData.length; i++) {
            cells.push(m('td', cellData[i]));
        }
        return m('tr', cells);
    };

    var rows = [];
    for (var j=0; j < rowData.length; j++) {
        rows.push(row(rowData[j]));
    }

    return m('table', rows);
};

var _getPosition = function(selector) {
    return document.querySelector(selector).getBoundingClientRect();
};