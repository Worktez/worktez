const fs = require('fs');
const path = require('path');

const dir = "functions/model/application";
const prodFile = "paymentKeys.js";

const content = `${process.RAZORPAY_KEYS}`;

fs.access(dir, fs.constants.F_OK, (err) => {
    if(err) {
        console.log("cred doesn't exit, creating now", process.cwd());

        fs.mkdir(dir, {recursive: true}, (err) => {
            if (err) throw err;
        });
    }

    try {
        fs.writeFileSync(dir + "/" + prodFile, content);
        console.log("Created successfully in", process.cwd());
        if(fs.existsSync(dir + "/" + prodFile)) {
            console.log("File is created", path.resolve(dir + "/" + prodFile));
            const str = fs.readFileSync(dir + "/" + prodFile).toString();
            console.log(str);
        }
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
});