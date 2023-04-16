import { Database } from "fakebase";

const db = new Database("./data");

export const Company = db.table("companies");
export const Job = db.table("jobs");
export const User = db.table("users");

//replace with sql db connection and data models
//replace with neo4j db connection and data models
