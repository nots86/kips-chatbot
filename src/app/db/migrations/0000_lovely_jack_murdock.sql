CREATE TABLE "cell_tags" (
	"id" serial PRIMARY KEY NOT NULL,
	"cell_name" varchar(100) NOT NULL,
	"optix_path" varchar(255) NOT NULL,
	"symbol_name" varchar(255) NOT NULL,
	"data_type" varchar(50) NOT NULL,
	"array_dimensions" varchar(50),
	"node_id" varchar(100),
	"description" text,
	"selectable" boolean NOT NULL
);
