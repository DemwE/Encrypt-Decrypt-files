# Encrypt & Decrypt files
A command line tool for encrypting and decrypting files using the AES-256-CBC encryption algorithm. | The program computes the SHA-256 hash of the password and uses it to authenticate the user and protect against brute-force attacks.

## Usage
To use this tool, run the following command:
```
node main.js <file> <password>
```

Where `<file>` is the path to the file you want to encrypt or decrypt, and `<password>` is the password you want to use for the encryption or decryption.
You will then be prompted to choose whether you want to encrypt or decrypt the file.

## Requirements

- Node.js version 14 or later.

## License
This project is licensed under the MIT License - see the [LICENSE](https://github.com/DemwE/Encrypt-Decrypt-files/blob/main/LICENSE) file for details.
