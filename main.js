// Program whare file is crypting and decrypting
// Using AES-256-CBC algorithm with SHA256 hash

const crypto = require('crypto');
const fs = require('fs');

const readline = require("readline");

const algorithm = 'aes-256-cbc';

// Function for encrypting file
function encryptFile(file, password) {
    // Create read and write streams for the input and output files
    const input = fs.createReadStream(file);
    const output = fs.createWriteStream(file + '.enc');

    // Generate initialization vector (IV) for the encryption
    const iv = crypto.randomBytes(16);

    // Create cipher object with the algorithm and password
    const cipher = crypto.createCipheriv(algorithm, password, iv);

    // Write the IV to the output file
    output.write(iv);

    // Pipe the input stream through the cipher and then to the output stream
    input.pipe(cipher).pipe(output);

    // Log success message to the console
    console.log('File encrypted successfully!');
}

// Function for decrypting file using the password provided by the user
function decryptFile(file, password) {
    const readInitVect = fs.createReadStream(file, { end: 15 });

    let iv;
    readInitVect.on('data', (chunk) => {
        iv = chunk;
    });

    readInitVect.on('close', () => {
        const readStream = fs.createReadStream(file, { start: 16 });
        const decipher = crypto.createDecipheriv(algorithm, password, iv);
        const writeStream = fs.createWriteStream(`${file.slice(0, -4)}`, { flags: 'a' });

        readStream
            .pipe(decipher)
            .pipe(writeStream)
            .on('finish', () => console.log('Decryption complete!'));
    });

}

// Get the file name from the command line arguments
try {
    var file = process.argv[2];
} catch (error) {
    checkArguments();
}

// Get the password from the command line arguments and hash it
try {
    var password = crypto.createHash('sha256').update(process.argv[3]).digest('base64').substr(0, 32);
} catch (error) {
    checkArguments();
}

// If user not provide file name or password display message
function checkArguments() {
    if (!file || !password) {
        console.log('Please provide a file name and password!');
        console.log('Usage: node main.js <file> <password>');
        return;
    }
}

// Check if the file exists
if (!fs.existsSync(file)) {
    console.log('File not found!');
    return;
}

// User input for encrypting or decrypting file
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Do you want to encrypt or decrypt? (e/d): ', answer => {
    // Check if user wants to encrypt file
    if (answer === 'e') {
        encryptFile(file, password);
    }
    // Check if user wants to decrypt file
    else if (answer === 'd') {
        decryptFile(file, password);
    }
    // If user input is not valid
    else {
        console.log('Invalid input!');
    }

    rl.close();
});