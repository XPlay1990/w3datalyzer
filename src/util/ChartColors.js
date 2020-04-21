export function chartColors(palette, dataLength, chartType) {
    /*Gradients
      The keys are percentage and the values are the color in a rgba format.
      You can have as many "color stops" (%) as you like.
      0% and 100% is not optional.*/
    let gradient;
    switch (palette) {
        case 'cool':
            gradient = {
                0: [255, 255, 255, 1],
                20: [220, 237, 200, 1],
                45: [66, 179, 213, 1],
                65: [26, 39, 62, 1],
                100: [0, 0, 0, 1]
            };
            break;
        case 'warm':
            gradient = {
                0: [255, 255, 255, 1],
                20: [254, 235, 101, 1],
                45: [228, 82, 27, 1],
                65: [77, 52, 47, 1],
                100: [0, 0, 0, 1]
            };
            break;
        case 'neon':
            gradient = {
                0: [255, 255, 255, 1],
                20: [255, 236, 179, 1],
                45: [232, 82, 133, 1],
                65: [106, 27, 154, 1],
                100: [0, 0, 0, 1]
            };
            break;
    }

    //Get a sorted array of the gradient keys
    const gradientKeys = Object.keys(gradient);
    gradientKeys.sort(function (a, b) {
        return +a - +b;
    });

    //Find datasets and length
    let setsCount;
    switch (chartType) {
        case "pie":
        case "doughnut":
            setsCount = dataLength;
            break;
        case "bar":
        case "line":
            setsCount = dataLength;
            break;
    }

    //Calculate colors
    const chartColors = [];
    for (var i = 0; i < setsCount; i++) {
        const gradientIndex = (i + 1) * (100 / (setsCount + 1)); //Find where to get a color from the gradient
        for (var j = 0; j < gradientKeys.length; j++) {
            const gradientKey = gradientKeys[j];
            if (gradientIndex === +gradientKey) { //Exact match with a gradient key - just get that color
                chartColors[i] = 'rgba(' + gradient[gradientKey].toString() + ')';
                break;
            } else if (gradientIndex < +gradientKey) { //It's somewhere between this gradient key and the previous
                const prevKey = gradientKeys[j - 1];
                const gradientPartIndex = (gradientIndex - prevKey) / (gradientKey - prevKey); //Calculate where
                const color = [];
                for (let k = 0; k < 4; k++) { //Loop through Red, Green, Blue and Alpha and calculate the correct color and opacity
                    color[k] = gradient[prevKey][k] - ((gradient[prevKey][k] - gradient[gradientKey][k]) * gradientPartIndex);
                    if (k < 3) color[k] = Math.round(color[k]);
                }
                chartColors[i] = 'rgba(' + color.toString() + ')';
                break;
            }
        }
    }

    return chartColors;
}