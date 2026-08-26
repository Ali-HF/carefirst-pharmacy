export interface Category {
  id: string;
  name: string;
  slug: string;
  children?: Category[];
}

export const categories: Category[] = [
  {
    id: "medicine",
    name: "Medicine",
    slug: "medicine",
    children: [
      {
        id: "fever-pain",
        name: "Fever & Pain Relief",
        slug: "fever-pain",
      },
      {
        id: "cold-cough",
        name: "Cold & Cough",
        slug: "cold-cough",
      },
      {
        id: "stomach-care",
        name: "Stomach Care",
        slug: "stomach-care",
      },
      {
        id: "first-aid",
        name: "First Aid",
        slug: "first-aid",
      },
    ],
  },
  {
    id: "baby-mother-care",
    name: "Baby & Mother Care",
    slug: "baby-mother-care",
    children: [
      {
        id: "diapers",
        name: "Diapers & Wipes",
        slug: "diapers",
      },
      {
        id: "baby-food",
        name: "Baby Food & Formula",
        slug: "baby-food",
      },
      {
        id: "maternity",
        name: "Maternity Care",
        slug: "maternity",
      },
    ],
  },
  {
    id: "nutrition-supplements",
    name: "Nutrition & Supplements",
    slug: "nutrition-supplements",
    children: [
      {
        id: "multivitamins",
        name: "Multivitamins",
        slug: "multivitamins",
      },
      {
        id: "protein",
        name: "Protein Supplements",
        slug: "protein",
      },
      {
        id: "herbal",
        name: "Herbal Supplements",
        slug: "herbal",
      },
    ],
  },
  {
    id: "personal-care",
    name: "Personal Care",
    slug: "personal-care",
    children: [
      {
        id: "skin-care",
        name: "Skin Care",
        slug: "skin-care",
      },
      {
        id: "hair-care",
        name: "Hair Care",
        slug: "hair-care",
      },
      {
        id: "oral-care",
        name: "Oral Care",
        slug: "oral-care",
      },
      {
        id: "bath-body",
        name: "Bath & Body",
        slug: "bath-body",
      },
    ],
  },
  {
    id: "otc-health",
    name: "OTC & Health Needs",
    slug: "otc-health",
    children: [
      {
        id: "eye-ear",
        name: "Eye & Ear Care",
        slug: "eye-ear",
      },
      {
        id: "family-planning",
        name: "Family Planning",
        slug: "family-planning",
      },
      {
        id: "feminine-hygiene",
        name: "Feminine Hygiene",
        slug: "feminine-hygiene",
      },
    ],
  },
  {
    id: "devices-support",
    name: "Devices & Support",
    slug: "devices-support",
    children: [
      {
        id: "bp-monitors",
        name: "Blood Pressure Monitors",
        slug: "bp-monitors",
      },
      {
        id: "thermometers",
        name: "Thermometers",
        slug: "thermometers",
      },
      {
        id: "sugar-testing",
        name: "Blood Sugar Testing",
        slug: "sugar-testing",
      },
      {
        id: "supports-braces",
        name: "Supports & Braces",
        slug: "supports-braces",
      },
    ],
  },
];
