
export function parse(text: string, values: any, startDelimeter:string="{", endDelimeter:string = "}"){
    // You recieved {comment.amount} money from {comment.link}
    let startIndex = 0;
    let endIndex = 1;
    let finalString = "";
    while(endIndex <= text.length){
        if (text[startIndex] === startDelimeter){
            let endPoint = startIndex + 2;
            while(text[endPoint] !== endDelimeter && endPoint <= text.length){
                endPoint ++;
            }

            let stringHoldingValue = text.slice(startIndex + 1, endPoint);
            const keys = stringHoldingValue.split('.');
            let localValues = {
                ...values
            }
            for(let i = 0; i < keys.length; i ++){
                if(typeof localValues === "string"){
                    localValues = JSON.parse(localValues);
                }
                localValues = localValues[keys[i]];
            }
            finalString += localValues;
            //iterations for more delimeter checks
            startIndex = endPoint + 1;
            endIndex = endPoint + 2;
        } else {
            finalString += text[startIndex]
            startIndex ++;
            endIndex ++;
        }
    }
    
    return finalString;
}