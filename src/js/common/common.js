import { library } from '@fortawesome/fontawesome-svg-core';
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faHome, faKey, faDollarSign, faPoundSign, faRupeeSign, faHandshake } from '@fortawesome/free-solid-svg-icons';

library.add(far, fab, faHome, faKey, faDollarSign, faPoundSign, faRupeeSign, faHandshake);

export const ruler = (measure) => {
    let ruler = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    }

    if(measure) {
        let s = measure.split(' ');
        if(s.length === 1) {
            ruler = {...ruler, top: parseInt(s[0]), right: parseInt(s[0]), bottom: parseInt(s[0]), left: parseInt(s[0])};
        } else if(s.length === 2) {
            ruler = {...ruler, top: parseInt(s[0]), right: parseInt(s[1]), bottom: parseInt(s[0]), left: parseInt(s[1])};
        } else if(s.length === 3) {
            ruler = {...ruler, top: parseInt(s[0]), right: parseInt(s[1]), bottom: parseInt(s[2]), left: parseInt(s[1])};
        } else if(s.length === 4) {
            ruler = {...ruler, top: parseInt(s[0]), right: parseInt(s[1]), bottom: parseInt(s[2]), left: parseInt(s[3])};
        }
    }

    return ruler;
};

export const formatMoney = (amount, decimalCount = 2, decimal = ".", thousands = ",") => {
    try {
        decimalCount = Math.abs(decimalCount);
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

        const negativeSign = amount < 0 ? "-" : "";

        let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
        let j = (i.length > 3) ? i.length % 3 : 0;

        return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
    } catch (e) {
        console.log(e)
    }
};

export const getQuoteOfTheDay = (capturedQuote) => {
    let new_line = "\n";
    let hiphen = " - ";
    let str, str1, str2 = "";
    let replace_pattern = ["br.writeln(\"", "<br>\");"];
    let replace_more_pattern = ["\");", "\\"];

    let str_split = capturedQuote.split(new_line);

    //echo $captured_quote;

    for(let temp in str_split) {
        if(temp.indexOf("=document;") !== -1) {
            str1 = temp;
            for(let i in replace_pattern) {
                str1 = str1.replace(i, "");
            }
            str2 = str1;
            for(let i in replace_more_pattern) {
                str2 = str2.replace(i, "");
            }

            if(str2.length > 0) {
                str += str2 + hiphen;
            }
        }
    }
    return str.substring(0, str.length - 3);
}