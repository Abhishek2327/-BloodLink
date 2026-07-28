const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const Hospital = require("../src/models/Hospital");

dotenv.config({ path: __dirname + "/../.env" });

const createHospital = async () => {
    // Get command line arguments or use defaults
    const args = process.argv.slice(2);
    
    const name = args[0] || "City Civil Hospital";
    const email = args[1] || "cityhospital@bloodlink.com";
    const rawPassword = args[2] || "Hospital@12345";
    const phone = args[3] || "9876543211";
    const address = args[4] || "District Hospital Campus, Una, HP";
    const license = args[5] || "BL-HP-002";

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB successfully.");

        // Check if hospital already exists by email
        const existingEmail = await Hospital.findOne({ email });
        if (existingEmail) {
            console.log(`Hospital with email '${email}' already exists in database.`);
            console.log("ID:", existingEmail._id.toString());
            console.log("Name:", existingEmail.name);
            console.log("License:", existingEmail.license);
            process.exit(0);
        }

        // Check if license exists
        const existingLicense = await Hospital.findOne({ license });
        if (existingLicense) {
            console.log(`Hospital with license '${license}' already exists in database.`);
            process.exit(1);
        }

        const hashedPassword = await bcrypt.hash(rawPassword, 10);

        const hospital = new Hospital({
            name,
            email,
            password: hashedPassword,
            phone,
            address,
            license
        });

        await hospital.save();

        console.log("\n=========================================");
        console.log("  New Hospital Account Created Successfully!");
        console.log("=========================================");
        console.log(` ID (_id)  : ${hospital._id}`);
        console.log(` Email     : ${hospital.email}`);
        console.log(` Password  : ${rawPassword}`);
        console.log(` Name      : ${hospital.name}`);
        console.log(` Phone     : ${hospital.phone}`);
        console.log(` Address   : ${hospital.address}`);
        console.log(` License   : ${hospital.license}`);
        console.log("=========================================\n");

        process.exit(0);
    } catch (err) {
        console.error("Failed to create hospital:", err.message);
        process.exit(1);
    }
};

createHospital();
