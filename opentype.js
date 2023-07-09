const buffer = fetch(
    `${window.location.pathname.replace(
        'index.html',
        ''
    )}AsAbove,SoBelow(Beta40)VF.ttf`
).then((res) => res.arrayBuffer());

let font;
