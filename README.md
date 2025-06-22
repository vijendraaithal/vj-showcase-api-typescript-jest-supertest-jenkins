### API Testing Framework

#### Technology Stack
Language: Typescript<br>
JS Test Framework: Jest<br>
Library for testing HTTP APIs: SuperTest<br>
CI: Jenkins

#### Setup and Installation
```bash 
npm init -y
npm list
npm install jest supertest --save-dev
npm install ts-jest --save-dev 
sudo npm install ts-jest --save-dev 
npx ts-jest config:init
npm install @types/supertest @types/jest --save-dev
npm list
```

#### Manual Execution command line
```bash 
npx jest
```

```bash 
npx jest folder-name/file-name.spec.ts
```
#### Integrating Faker
- `npm list`
- URL: https://fakerjs.dev/
- `npm install @faker-js/faker --save-dev`
- `npm list`

```bash
import {faker} from '@faker-js/faker';
```
