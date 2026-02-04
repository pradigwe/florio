import { Account, Client, Databases, TablesDB } from "react-native-appwrite";

export const client = new Client()
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)
  .setPlatform(process.env.EXPO_PUBLIC_APPWRITE_PLATFORM!);

export const account = new Account(client);

export const database = new TablesDB(client);

export const DATABASE_ID = process.env.EXPO_PUBLIC_DB_ID;
export const USER_PLANTS_COLLECTION_ID =
  process.env.EXPO_PUBLIC_USER_PLANTS_COLLECTION_ID;
export const PLANT_CATALOG_COLLECTION_ID =
  process.env.EXPO_PUBLIC_PLANT_CATALOG_COLLECTION_ID;

export const PERENUAL_API_KEY = process.env.EXPO_PUBLIC_PERENUAL_API_KEY!;
