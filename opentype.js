const buffer = fetch('/AsAboveSoBelow/AsAbove,SoBelow(Beta40)VF.ttf').then(
    (res) => res.arrayBuffer()
);

let font;
