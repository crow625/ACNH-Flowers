// Takes two gene values, a and b, which could be any combination of 0, 1, and 2
// And returns a list of each possible gene outcome
const punnett = (a, b) => {
    
    a = parseInt(a);
    b = parseInt(b);
    let output = [];

    switch (a + b) {
        // RR x RR
        case 4:
            output = [2, 2, 2, 2,];
            break;
        // RR x Rr
        case 3:
            output = [2, 2, 1, 1];
            break;
        case 2:
            // RR x rr
            if (a === 2 || b === 2) {
                output = [1, 1, 1, 1];
            }
            // Rr x Rr
            if (a === 1 && b === 1) {
                output = [2, 1, 1, 0];
            }
            break;
        // Rr x rr
        case 1:
            output = [1, 1, 0, 0];
            break;
        // rr x rr
        case 0:
            output = [0, 0, 0, 0];
            break;
        default:
            console.log(`Invalid genes ${a} and ${b}`);
    }

    return output;

}

// returns all possible flower combinations from breeding flowers f1 and f2
const breed = (f1, f2) => {
    if (typeof f1 === "string") f1 = genesFromString(f1);
    if (typeof f2 === "string") f2 = genesFromString(f2);

    const squares = {};

    for (const key of Object.keys(f1)) {
        squares[key] = punnett(f1[key], f2[key]);
    }

    const combinations = [];

    for (const red of squares.r) {
        for (const yellow of squares.y) {
            for (const white of squares.w) {
                if (squares["b"]) {
                    for (const brightness of squares.b) {
                        let genes = stringFromGenes({r: red, y: yellow, w: white, b: brightness});
                        combinations.push(genes);
                    }
                }
                else {
                    let genes = stringFromGenes({r: red, y: yellow, w: white});
                    combinations.push(genes);
                }
            }
        }
    }

    return combinations;

}

// expects a string of the form R0Y1W2
// or of the form R1Y2W2B1 in the case of roses
const genesFromString = (s) => {
    const output = {
        r: parseInt(s.charAt(1)),
        y: parseInt(s.charAt(3)),
        w: parseInt(s.charAt(5))
    };
    if (s.length === 8) output.b = parseInt(s.charAt(7));
    return output;
}

// expects an object with keys r, y, w (and potentially b)
// returns a string of form "R{r}Y{y}W{w}B{b}" such as R2Y0W2 or R2Y2W1B1
const stringFromGenes = (obj) => {
    let output = "RrYyWw";
    output = output.replace("r", obj.r);
    output = output.replace("y", obj.y);
    output = output.replace("w", obj.w);
    if (obj.hasOwnProperty('b')) {
        output = output.concat("B" + obj.b);
    }
    return output;
}

// counts the number of times a specific element appears in an array
// returns an object that maps the element to its number of appearances divided by total number of elements
// keys - flower gene strings
// values - probability of that gene string resulting
const geneProbability = (arr) => {

    const output = {};
    
    for (const gene of arr) {
        output[gene] = output[gene] ? output[gene] + 1 : 1;
    }

    for (const gene of Object.keys(output)) {
        if (gene !== "total") {
            output[gene] = output[gene] / arr.length;
        }
    }
    
    return output;
}

export { breed, geneProbability, genesFromString, stringFromGenes };