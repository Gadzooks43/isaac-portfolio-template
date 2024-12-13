# Secure Password Manager

The secure password manager is a windows desktop application meant to handle password storage locally in a secure and usable form. 

![photo](content/projects/spm-add.png)
![photo](content/projects/spm-list.png)
![photo](content/projects/spm-settings.png)


## Security

- Industry standard encryption was used at all stages of data standard and data transfer. This includes Argon2 for verifying and handling the Master password and keys, PBKDF2 for deriving unique instance keys for password storage, and AES GCM for encyrpting user data.
- Optional TOTP MFA was added onto master authentication. You can add your own TOTP app to it by scanning the QR code in the settings page.
- IPC communication is used to communicate between the interface and backend/application level processes. This isolates the two from eachother and stores communications behind a secure channel.
- General security techniques were taken into account too:
    - proper logging, crash and error handling
    - Clickjacking, Input injection and MITM attacks accounted for and handled
    - app certs have been purchased so exe files can be signed and verified by antivirus and firewalls

## Usability

- material UI was used to helpy style the application and give it a more modern feel.
- features like a password generator and the copy button on passwords were added to increase the ease of using the app in a secure way.
- Simple page layouts along with the existence of only three navigation pages was used to simplify the experience for the user.




