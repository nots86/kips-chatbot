import postgres from 'postgres';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { cellTags, CellTagInsertType } from './schema'
import { db } from './db';

// Load environment variables from .env file
dotenv.config();

// Create a Postgres client connection using the DATABASE_URL from the environment variables
/* const client = postgres(process.env.DATABASE_URL as string, {
    debug: (connection, query, params) => {
        console.log(query, params);
    }
}); */

// Function to load JSON data and insert it into the database
const loadJsonData = async (jsonFile: string) => {
    const filePath = path.join(process.cwd(), 'src', 'data' , jsonFile);  // Construct the full file path
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));  // Read and parse the JSON file

    // Extract the cell name from the file name (e.g., "CELL1" from "CELL1_tags.json")
    const cellName = path.basename(jsonFile).split('_')[0];

    for (const tag of data) {
        // Create an object with default values for the cellTags schema
        const tagData: CellTagInsertType = {
            cell_name: cellName,
            optix_path: tag.optixPath || '',  // Default to empty string if undefined
            symbol_name: tag.symbolName || '',  // Default to empty string if undefined
            data_type: tag.dataType || '',  // Default to empty string if undefined
            array_dimensions: tag.arrayDimensions || '',  // Default to empty string if undefined
            node_id: tag.nodeId || '',  // Default to empty string if undefined
            description: tag.description || '',  // Default to empty string if undefined
            selectable: tag.selectable || false  // Default to false if undefined
        };

        // Insert the tag data into the cellTags table
        await db.insert(cellTags).values(tagData);
    }

    console.log(`Data from ${jsonFile} loaded successfully.`);
};

// Main function to manage loading data from multiple JSON files
const run = async () => {
    try {
        // List of JSON files to load
        const files = ['CELL1_tags.json', 'CELL2_tags.json'];
        
        // Loop through each file and load its data
        for (const file of files) {
            await loadJsonData(file);
        }
        
        console.log('All data loaded successfully.');
    } catch (error) {
        console.error('Error loading data:', error);
    } finally {
        // Close the Postgres client connection
        /* await db.end(); */
    }
};

// Run the main function
run();