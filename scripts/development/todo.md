debug -> error(msg)

create jsdoc description of every exposed function


fajne efekty z otwiraniem devtoolsów-> https://brianiscreative.itch.io/fara

mapData = '';
for (let i=0; i<50; i++) {
    mapData+='[';
    for (let j=0; j<50; j++) {
        mapData += +(Math.random()<0.2);
        if (j<49) mapData += ',';
    }
    mapData+='],\n';
}
console.log(mapData)