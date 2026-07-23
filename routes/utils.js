
function truncate(num, decimals = 2) {
    const factor = 10 ** decimals;
    return Math.trunc(num * factor) / factor;
}

module.exports = {
    truncate,
}

