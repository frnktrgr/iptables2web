export function humanReadable10(num) {
    let suffix = ['', 'K', 'M', 'G', 'T', 'P'];
    let divisor = 1000;
    let maxLen = 5;
    if (num < Number.MIN_SAFE_INTEGER || num > Number.MAX_SAFE_INTEGER) {
        return "err";
    }
    let suffixIndex = 0;
    while (num >= divisor) {
        num = num / divisor;
        suffixIndex++;
    }
    maxLen -= suffix[suffixIndex].length;
    let result = num.toString();
    for (let p = result.length; result.length > maxLen; p--) {
        if (p < 1) {
            return 'err';
        }
        result = num.toPrecision(p);
    }
    return result + suffix[suffixIndex];
}

export function humanReadable2(num) {
    let suffix = ['', 'K', 'M', 'G', 'T', 'P'];
    let divisor = 1024;
    let maxLen = 5;
    if (num < Number.MIN_SAFE_INTEGER || num > Number.MAX_SAFE_INTEGER) {
        return "err";
    }
    let suffixIndex = 0;
    while (num >= divisor) {
        num = num / divisor;
        suffixIndex++;
    }
    maxLen -= suffix[suffixIndex].length;
    let result = num.toString();
    for (let p = result.length; result.length > maxLen; p--) {
        if (p < 1) {
            return 'err';
        }
        result = num.toPrecision(p);
    }
    return result + suffix[suffixIndex];
}