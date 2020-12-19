# Secrets
Testing different forms of authorization / authentication.
1. Store users passwords into database and compare request.body.password with password stored in database.
2. Use environmental variables. Encrypt DB.
3. Hash passwords. Using md5 hashing.
4. Add Salt to Hashed passwords. Using bcrypt hashing.
