const bcrypt = require("bcrypt");

(async () => {
    const password = "Hospital@123";
    const hash = await bcrypt.hash(password, 10);

    console.log(hash);
})();