import {
  pgTable,
  varchar,
  integer,
  text,
  foreignKey,
  doublePrecision,
  real,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const products = pgTable(
  "products",
  {
    productId: varchar("product_id", { length: 1024 }).primaryKey().notNull(),
    brand: varchar({ length: 512 }).notNull(),
    productLine: varchar("product_line", { length: 512 }).notNull(),
    productType: varchar("product_type", { length: 512 }).notNull(),
    sillage: varchar({ length: 512 }),
    longevity: varchar({ length: 512 }),
    category: varchar({ length: 512 }),
    country: varchar({ length: 512 }),
    segment: varchar({ length: 512 }),
    manufacturer: varchar({ length: 512 }),
    testers: integer(),
    samples: integer(),
    miniatures: integer(),
    refills: integer(),
    salesHitsParentChildAccessory: varchar(
      "sales_hits_parent_child_accessory",
      { length: 512 }
    ),
    salesHits: integer("sales_hits"),
    giftIdea: integer("gift_idea"),
    aromaNotes: varchar("aroma_notes", { length: 512 }),
    perfumer: varchar({ length: 512 }),
    year: integer(),
    gender: varchar({ length: 512 }),
    topNotes: text("top_notes"),
    heartNotes: text("heart_notes"),
    baseNotes: text("base_notes"),
    description: text(),
    photoUrl: varchar("photo_url", { length: 1024 }),
    floral: integer(),
    gourmand: integer(),
    woody: integer(),
    citrus: integer(),
    musky: integer(),
    fresh: integer(),
    fruity: integer(),
    fougere: integer(),
    oriental: integer(),
    green: integer(),
    leather: integer(),
    oud: integer(),
    spicy: integer(),
    chypre: integer(),
    sweet: integer(),
    vanilla: integer(),
    aromatic: integer(),
    aquatic: integer(),
    ambery: integer(),
  },
  (table) => [
    uniqueIndex("products_brand_line_type_unique").on(
      table.brand,
      table.productLine,
      table.productType
    ),
  ]
);

export const productVariants = pgTable(
  "product_variants",
  {
    productId: integer("product_id"),
    rawName: varchar("raw_name", { length: 512 }).primaryKey().notNull(),
    price: doublePrecision().notNull(),
    isInStock: integer("is_in_stock").notNull(),
    volume: real(),
    isTester: integer("is_tester").default(0),
    isRefill: integer("is_refill").default(0),
    isRefillTester: integer("is_refill_tester").default(0),
    isBlackList: integer("is_black_list").default(0),
    weight: real(),
    finalPrice: doublePrecision("final_price"),
  },
  (table) => [
    foreignKey({
      columns: [table.productId],
      foreignColumns: [products.productId],
      name: "product_variants_product_id_fkey",
    }),
  ]
);
