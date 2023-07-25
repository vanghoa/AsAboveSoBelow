var myDoc = app.activeDocument;
var target = myDoc.textFrames[0];
var chara1 = myDoc.textFrames[0].lines[0].characters[0]; //.insertionPoints[0];
var chara2 = myDoc.textFrames[0].lines[0].characters[1]; //.insertionPoints[0];
var alt = myDoc.textFrames[1].lines[2].appliedFont;
var altshort = myDoc.textFrames[1].lines[1].appliedFont;
var regular = myDoc.textFrames[1].lines[0].appliedFont;
var bip = 0;
