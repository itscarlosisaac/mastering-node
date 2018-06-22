function* threeThings(){
    yield 'one';
    yield 'two';
    yield 'three'
}

let tt = threeThings();

console.log(tt);
console.log(tt.next());
console.log(tt.next());
console.log(tt.next());
console.log(tt.next());

// Iterator replicate

function demoIterator(array){
    let idx = 0;
    return {
        next: () => {
            return idx < array.length ? {
                value: array[idx++],
                done: false
            } : { done: true };
        }
    }
}

let it = demoIterator(['one', 'two', 'three']);
console.log(it);
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());


// Live generator
function* liveData(){
    let state = ['one', 'two', 'three'];
    let current
    while( current = state.shift() ){
        yield current;
    }

    let list = liveData([])
    let item;
    while ( item = list.next()){
        if ( !item.value){
            break;
        }
        console.log('generated: ', item.value)
    }
}
console.log("FROM LIVE DATA");
let ldata = liveData();
console.log(ldata.next())
console.log(ldata.next())