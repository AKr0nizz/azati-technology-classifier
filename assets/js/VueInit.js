var app = new Vue({
    el: '#vue-app',
    data: {
        inputData: '',
        sampleTechnologies: {},
        sortedTechnologies: {},
        technologyStackLocation: './assets/data/technologies.json'
    },
    created() {
        this.loadTechnologies()
    },
    methods: {
        loadTechnologies() {
            fetch(this.technologyStackLocation).then((response) => response.json()).then((response) => {
                this.sampleTechnologies = response.technologies
            })
        },
        handleClassificationButtonClick() {
            let cleansedInputData = this.inputData.split('\n').map(x => x.trim());

            // Create and fill sample object
            let sampleObject = {
                "technologies": {}
            };
            for (const key in this.sampleTechnologies) {
                sampleObject["technologies"][key] = [];
            }

            // Process the data
            cleansedInputData.forEach(inputElement => {
                for (const technologyType in this.sampleTechnologies) {
                    if (this.sampleTechnologies[technologyType].map(x => x.toLowerCase()).includes(inputElement.toLowerCase())) {
                        sampleObject["technologies"][technologyType].push(inputElement);
                        cleansedInputData = cleansedInputData.filter(item => item !== inputElement);
                        break;
                    }
                }
            });

            sampleObject["technologies"]["Unclassified"] = cleansedInputData;
            this.sortedTechnologies = sampleObject["technologies"];
        }
    }
})