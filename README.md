<p align="center">
  <img src="https://docs.google.com/uc?id=1SxtPu_jpOt8iB3hsuPjEO69jSJfJ8Che" width="100%" />
</p>

# Ignite Gym - Mobile App

Repositório do terceiro projeto construído na trilha de React Native do Ignite 🚀

## Executando o projeto

Abaixo seguem as instruções para você executar o projeto em sua máquina.

Comece clonando o repositório:

```sh
git clone https://github.com/matheushdmoreira/ignite-rn-03-ignitegym
```

### Back-end

O back-end desse projeto é construído em Node.js, mais especificamente sua versão LTS.

> Você pode instalar o Node.js seguindo [esse guia](https://efficient-sloth-d85.notion.site/Instalando-o-Node-js-d40fdabe8f0a491eb33b85da93d90a2f).

Após instalar o Node.js, vamos acessar a pasta api do projeto, instalar as dependências e, então, subir o servidor HTTP.

```sh
cd api

# Instalando as dependências
npm install

# Subir o servidor HTTP
npm run dev
```

### Mobile

Para executar o app ignitegyn utilizamos o Expo, uma ferramenta incrível da comunidade React Native. Além do Expo, é necessário que você utilize algum emulador local ou um dispositivo físico pra visualizar a aplicação.

> Você pode instalar o Expo e os emuladores seguindo [esse guia](https://react-native.rocketseat.dev/).

Instalando suas dependências:

```sh
cd mobile

# Instalando as dependências
npm install
```

Após configurar o ambiente mobile, você pode abrir o emulador e executar o projeto de acordo com a plataforma que estiver utilizando:

```sh
npx expo start
```

## Links rápidos ↗

- [Layout | Figma 🎨](https://www.figma.com/file/zAPU4eLqG0mzBKAAihS9xm/Ignite-Gym-(Community)?type=design&t=hjGs6vc5TK5oyE0w-6)

**🏧 Server:**

- [Express](https://expressjs.com/)
- [DayJs](https://day.js.org/docs/en/installation/node-js)
- [Knex](https://knexjs.org/guide/) `(sqlite3)`
- [Json Web Token](https://www.npmjs.com/package/jsonwebtoken)

**📱 Mobile:**

- [Expo](https://github.com/expo/expo)
- [TypeScript](https://github.com/microsoft/TypeScript)
- [Expo Google Fonts](https://github.com/expo/google-fonts)
- [NativeBase](https://docs.nativebase.io/getting-started)
- [React Hook Form](https://react-hook-form.com/)
- [Yup](https://www.npmjs.com/package/yup)


## License

MIT License © [Matheus Moreira](https://github.com/matheushdmoreira)
