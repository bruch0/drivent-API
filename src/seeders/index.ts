/* eslint-disable */
import "@/setup";

import readline from "readline-sync";
import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import { Connection } from "typeorm";

import connectDatabase from "@/database";

async function runSeedFile(filename: string, connection: Connection) {
  try {
    const content = fs.readFileSync(path.join(__dirname, filename));
    const file: any = yaml.load(content.toString());
    
    const seeds: any = file["seeds"];

    for (const seed of seeds) {
      const entityName = Object.keys(seed)[0];
      const data = seed[entityName];

      const metadata = connection.getMetadata(entityName);
      const table = metadata.tableName;

      const keys = Object.keys(data);
      const query = `
        INSERT INTO "${table}" 
          (${keys.map(key => `"${key}"`).join(", ")})
        VALUES 
          (${keys.map(key => ['number', 'boolean'].indexOf(typeof data[key]) > -1 ? data[key] : `'${data[key]}'`)})
      `;
      
      await connection.query(query);
      await connection.query(`SELECT setval('${table}_id_seq', (SELECT MAX(id) from "${table}"))`);
    }
  } catch (error) {
    /* eslint-disable-next-line no-console */
    console.error(`Error while running seed file "${filename}"!`, error);
  }
}

async function init() {
  /* eslint-disable-next-line no-console */
  console.log("Connecting to database...");
  const connection = await connectDatabase();
  /* eslint-disable-next-line no-console */
  console.log("Connected!");

  const files = fs.readdirSync(path.join(__dirname));
  
  for (const file of files) {
    if (file.indexOf(".seed.yml") === -1 || file.indexOf(".seed.yml") !== file.length - 9) continue;

    if (readline.keyInYNStrict(`Run seed file "${file}"? `)) {
      await runSeedFile(file, connection);
    }
  }

  /* eslint-disable-next-line no-console */
  console.log("Closing connection to database...");
  await connection.close();
}

init();
