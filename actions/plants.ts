import axios from "axios";

import {
  database,
  DATABASE_ID,
  PERENUAL_API_KEY,
  PLANT_CATALOG_COLLECTION_ID,
  USER_PLANTS_COLLECTION_ID,
} from "@/services/appwrite";
import { PerenualSpeciesList, Plant, PlantCatalog } from "@/types/plants";
import { ID, Query } from "react-native-appwrite";

const perenualList = "https://perenual.com/api/v2/species-list?";

export const getPlants = async (userId: string) => {
  try {
    const response = await database.listRows({
      databaseId: DATABASE_ID!,
      tableId: USER_PLANTS_COLLECTION_ID!,
      queries: [Query.equal("userId", userId!)],
    });
    console.log(response.rows);
  } catch (error) {
    console.log(error);
  }
};

export const addPlant = async (
  userId: string | undefined,
  nickname: string,
  wateringUnit: string,
  lastWateredAt: Date,
  commonName?: string,
  scientificName?: string,
  image?: string,
  wateringFrequency?: number[],
) => {
  try {
    await database.createRow({
      databaseId: DATABASE_ID!,
      tableId: USER_PLANTS_COLLECTION_ID!,
      rowId: ID.unique(),
      data: {
        userId,
        nickname,
        wateringUnit,
        lastWateredAt,
        commonName,
        scientificName,
      },
    });
    console.log("[", nickname, "] has been created!");
  } catch (error) {
    console.log(error);
  }
};

export const addPlantToCatalog = async (plant: PerenualSpeciesList) => {
  try {
    const exists = await database.createRow({
      databaseId: DATABASE_ID!,
      tableId: PLANT_CATALOG_COLLECTION_ID!,
      rowId: ID.unique(),
      data: {
        externalId: plant.id,
        externalSource: "perenual",
        commonName: plant.common_name.toLowerCase(),
        scientificName: plant.scientific_name[0].toLowerCase(),
        defaultImage: [
          plant.default_image.small_url ? plant.default_image.small_url : null,
          plant.default_image.medium_url
            ? plant.default_image.medium_url
            : null,
          plant.default_image.thumbnail ? plant.default_image.thumbnail : null,
        ],
      },
    });
    console.log(
      "DEV LOG: [",
      plant.common_name,
      "] has been added to catalog!",
    );
  } catch (error) {
    console.log("Error fetching data:", error);
  }
};

export const searchPlantCatalog = async (plantName: string) => {
  try {
    const nameLower = plantName.toLowerCase();
    const catalogResponse = await database.listRows({
      databaseId: DATABASE_ID!,
      tableId: PLANT_CATALOG_COLLECTION_ID!,
      queries: [
        Query.or([
          Query.contains("scientificName", nameLower),
          Query.contains("commonName", nameLower),
        ]),
      ],
    });

    // check if something was found in catalog
    if (catalogResponse.rows.length === 0) {
      try {
        const result = await axios.get(
          `${perenualList}q=${plantName}&key=${PERENUAL_API_KEY}`,
        );

        const plantResults = result.data.data.slice(0, 12);

        // no plants found in data
        if (plantResults.length === 0) {
          console.log("No related plants were found in catalog");
          return null;
        } else {
          const newCatalog = await result.data.data.forEach(
            async (plant: PerenualSpeciesList) => {
              await addPlantToCatalog(plant);
            },
          );
          return newCatalog;
        }
      } catch (error) {
        console.log(error);
        return null;
      }
    }

    // assign to state object. have only first 12 items rendered from it
    // on continue scroll show more
    return catalogResponse;
  } catch (error) {
    console.log(error);
    return null;
  }
};
