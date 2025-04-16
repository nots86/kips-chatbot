import { boolean, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const cellTags = pgTable('cell_tags', {
    id: serial('id').primaryKey(),
    cell_name: varchar('cell_name', {length:100}).notNull(),
    optix_path: varchar('optix_path', {length:255}).notNull(),
    symbol_name: varchar('symbol_name', {length:255}).notNull(),
    data_type: varchar('data_type', {length:50}).notNull(),
    array_dimensions: varchar('array_dimensions', {length:50}),
    node_id: varchar('node_id', {length:100}),
    description: text('description'),
    selectable: boolean('selectable').notNull()
});

// Define the TypeScript type for inserting data into the cellTags table
export interface CellTagInsertType {
    cell_name: string;
    optix_path: string;
    symbol_name: string;
    data_type: string;
    array_dimensions: string;  
    node_id: string;           
    description: string;       
    selectable: boolean;
}

// Define the TypeScript type for a retrieved CellTag row
export interface CellTag {
    id: number;
    cell_name: string;
    optix_path: string;
    symbol_name: string;
    data_type: string;
    array_dimensions: string | null;
    node_id: string | null;
    description: string | null;
    selectable: boolean;
    patterns?: string[]; 
  }