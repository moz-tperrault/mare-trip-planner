/**
 * One short letter from each property, in the voice of someone who works there.
 *
 * Hardcoded for now (one entry per slug). Promote to a Supabase `letters`
 * table when there's reason to rotate per-property or schedule by season.
 */

export type PropertyLetter = {
  body: string;
  signature: string;
  role: string;
};

export const propertyLetters: Record<string, PropertyLetter> = {
  "casa-del-mare": {
    body:
      "The morning bell of San Gennaro rings at six, and by seven the cook has bread in the oven. Most guests miss it — they wake to the smell instead. Come for the linen breakfast on the terrace if you arrive before eight.",
    signature: "Maria",
    role: "Head housekeeper, Casa del Mare",
  },
  "olive-grove-estate": {
    body:
      "The first cold press of the season is in October. We invite all guests in residence to walk the groves with our miller on the morning the olives come in. Bring shoes you don't mind staining green.",
    signature: "Lorenzo",
    role: "Frantoio, Olive Grove Estate",
  },
  "quiet-reef": {
    body:
      "The tide turns at four, and when it does, the lagoon settles like a held breath. The reef is loudest just before. If you've come to free-dive, this is the hour.",
    signature: "Aanand",
    role: "Dive guide, The Quiet Reef",
  },
  "marsila-springs": {
    body:
      "Phones go in the cedar drawer at intake. We promise we won't lose them. Most guests forget they left them by the third evening — that's when the silence stops being uncomfortable and becomes the thing they came for.",
    signature: "Hadley",
    role: "Wellness director, Marsila Springs",
  },
  "auberge-saint-bertrand": {
    body:
      "The thermal baths close at nine, then the village goes still. Walk down to the cathedral after — the doors are unlocked until ten, and the nave is empty save for the candles. There's no better quiet in the valley.",
    signature: "Père Émile",
    role: "Innkeeper, Auberge Saint-Bertrand",
  },
  "vondre-house": {
    body:
      "The cabin runs on driftwood for the sauna and a single pendant for the dock. We've found two guests is the right number — enough company, not enough conversation. The fjord does most of the talking.",
    signature: "Sigrid",
    role: "Caretaker, The Vondré House",
  },
};

export function letterForSlug(slug: string): PropertyLetter | null {
  return propertyLetters[slug] ?? null;
}
