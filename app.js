const _ = require("lodash");
const rect = [];
rect.push({
    p1 : {
        x:0,
        y:0
    },
    p2: {
        x:10,
        y:10
    }
}
);
rect.push({
    p1 : {
        x:0,
        y:0
    },
    p2: {
        x:6,
        y:7
    }
}
);
rect.push({
    p1 : {
        x:4,
        y:0
    },
    p2: {
        x:10,
        y:5
    }
}
);
console.log("Answer", recursive(rect));


function recursive(arr){
    if(arr.length === 1) {
        return getArea(arr[0].p1,arr[0].p2);
    }
    if(arr.length === 0){
        return 0;
    }
    let arrs = meetingArray(arr);
    const ss = arrs[0];
    let flag = true;
    arrs.forEach(element => {
        if(JSON.stringify(element) !== JSON.stringify(ss)){
            flag = false;
        }
    });
    if(flag && arrs.length >0) {
        arrs = [arrs[0]];
    }
    return area(arr) - recursive(arrs);
}

function meetingArray(arr){
    answerArr = [];
    let n = arr.length;
    if(n===0){
        return [];
    }
    if(arr.length === 2) {
        let re = findPoints(arr[0],arr[1]);
        if(re)
        answerArr.push(re);
        return answerArr;
    } else {
        if(n>2){
            let re1 = findPoints(arr[n-1],arr[0]);
            if(re1)
            answerArr.push(re1);
        }
        while(n!==1){
            let res = findPoints(arr[n-1],arr[n-2]);
            if (res) {
                    answerArr.push(res);
                }       
            n--;
        }
        return answerArr;
    }
}

function findPoints(r1,r2) {
    let x1 = r1.p1.x;
    let y1 = r1.p1.y;
    let x2 = r1.p2.x;
    let y2 = r1.p2.y;
    let x3 = r2.p1.x;
    let y3 = r2.p1.y;
    let x4 = r2.p2.x;
    let y4 = r2.p2.y;
    let x5 = Math.max(x1, x3); 
    let y5 = Math.max(y1, y3);   
    let x6 = Math.min(x2, x4); 
    let y6 = Math.min(y2, y4); 
    if (x5 > x6 || y5 > y6)  { 
    return null; 
    }
    if (x5 === x6 && y5 === y6)  { 
        return null; 
        }
    let x7 = x5; 
    let y7 = y6; 
    let p1 ,p2;
    p1 = {
        x:x5,
        y:y5
    };
    let x8 = x6; 
    let y8 = y5;
    p2 = {
        x: x6,
        y:y6
    }
    return {p1,p2};
}

function area(arr) {
    let val = 0;
    arr.forEach(element => {
        val+=getArea(element.p1,element.p2);
    });
    return val;
}
function getArea(p1,p2){
    return Math.abs(p1.x - p2.x) * Math.abs(p1.y-p2.y);
}
