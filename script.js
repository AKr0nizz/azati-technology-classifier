let io = require('./modules/io.js');

settings = {
    inputFilePath: './data/input.txt',
    outputFilePath: './data/output.json',
    technologiesFilePath: './models/technologies.json',
}

runScript = async () => {
    // Extract input data and process it to the array
    let inputData = await io.readFile(settings.inputFilePath);
    inputData = inputData.split('\n').map(x => x.trim());

    // Extract technologies classification model from JSON
    const inputTechnologies = JSON.parse(await io.readFile(settings.technologiesFilePath))

    // Create duplicate object and will it with dummy data
    let sample_object = {
        "technologies": {}
    }
    for (const key in inputTechnologies["technologies"]) {
        sample_object["technologies"][key] = []
    }

    // Process the data
    inputData.forEach(inputElement => {
        for (const technologyType in inputTechnologies["technologies"]) {
            if (inputTechnologies["technologies"][technologyType].map(x => x.toLowerCase()).includes(inputElement.toLowerCase())) {
                sample_object["technologies"][technologyType].push(inputElement)
                inputData.pop(inputElement)
            }
        }
    });

    // Add data as unclassifies
    sample_object["technologies"]["Unclassifies"] = inputData

    console.log(sample_object["technologies"]["Unclassifies"]);
}

runScript();