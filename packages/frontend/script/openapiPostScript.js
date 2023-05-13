/* eslint @typescript-eslint/no-var-requires: 0 */
/* eslint no-console: 0 */
const fs = require("fs");
const { execSync } = require("child_process");

const apiServicesFolder = "./src/services/";

function main() {
    const filenames = fs.readdirSync(apiServicesFolder);

    for (const filename of filenames) {
        const data = fs.readFileSync(apiServicesFolder + filename, "utf8");
        fs.writeFileSync(apiServicesFolder + filename, data.replaceAll(/'..\/models\/.*/g, "'models';"));
    }

    try {
        execSync("prettier --write " + apiServicesFolder + "*");
    } catch (e) {
        console.error(e);
    }

    console.log("✨  Openapi Post Script Done");
}

main();
