## Where i can get the `.htpasswd` file?

You can generate the `.htpasswd` file using the following command:

```sh
htpasswd -c .htpasswd <username>
```

or you can use online tools like [this](https://www.web2generators.com/apache-tools/htpasswd-generator) or [this](https://hostingcanada.org/htpasswd-generator/) to generate the `.htpasswd` file.

## Where i can get the `.crt` and `.key` files?

You can generate the files using the following command:

```sh
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout ./nginx/certs/server.key -out ./nginx/certs/server.crt \
  -subj "/CN=localhost"
```
