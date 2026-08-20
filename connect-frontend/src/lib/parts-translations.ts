export const partsTranslations: Record<string, Record<string, string>> = {
  "1220918": { en: "Lid with diaphragm", es: "Tapa con diafragma" },
  "1168542": { en: "Lid diaphragm (nitrilica)", es: "Diafragma de la tapa (nitrile)" },
  "1220919": { en: "Tank strainer", es: "Colador" },
  "1220618": { en: "Complete belt with transport handle", es: "Cinta completa con alza" },
  "1220973": { en: "Buckle", es: "Hebilla" },
  "1220619": { en: "Tank 20L", es: "Cuerpo del tanque 20L" },
  "1223765": { en: "Tank 16L", es: "Cuerpo del tanque 16L" },
  "1168397": { en: "Base lock", es: "Grapa de la base" },
  "1269105": { en: "PJB base seal", es: "Vedacion del la base PJB" },
  "1297142": { en: "SB electric sprayer base", es: "Base del pulverizador eléctrico SB" },
  "1297143": { en: "SB hose seal", es: "Anillo protector de la manguera SB" },
  "1265961": { en: "Electric pump", es: "Bomba electrica" },
  "1295630": { en: "JB-1680P LI-ION battery", es: "Batería LI-ION JB-1680P" },
  "1295629": { en: "JB-1640P LI-ION battery", es: "Batería LI-ION JB-1640P" },
  "1268711": { en: "Complete panel with potentiometer", es: "Panel completo conpotenciometro" },
  "1220622": { en: "Flange head screw Phillips slot 5 x 12 mm", es: "Tornillo PH 5 x 12 mm" },
  "1223781": { en: "Plug type C charger", es: "Cargador con plug tipo C" },
  "1220640": { en: "Base cover", es: "Tapa de la base" },
  "1297316": { en: "SB hose", es: "Manguera SB" },
  "1220962": { en: "Trigger valve handle LP 601", es: "Cabo del registro LP 601" },
  "1220966": { en: "Clip LP 601", es: "Pinza LP 601" },
  "1220968": { en: "Trigger valve body LP 601", es: "Cuerpo del registro LP 601" },
  "1217605": { en: "Trigger valve LP 601", es: "Registro completo LP 601" },
  "1220951": { en: "Trigger valve lever LP 601", es: "Palanca del registro LP 601" },
  "996058": { en: "Trigger valve cap LP 601/ 605 and seal", es: "Tapa del registro LP 601/605 con vedación" },
  "1230971": { en: "Trigger valve needle", es: "Aguja del registro" },
  "1220947": { en: "Pan head screw Phillips slot M 5x0,8x12", es: "Tornillo PH M 5x0,8x 12" },
  "1220969": { en: "Screw cap 11/16", es: "Tuerca conica 11/16" },
  "635276": { en: "Joint and cone packing", es: "Unión con junta cónica" },
  "100131": { en: "Stainless steel lance", es: "Tubo de pulverización" },
  "1168545": { en: "Nozzle filter M50/60", es: "Filtro de la boquilla M50/60" },
  "1168546": { en: "Nozzle cap", es: "Capa de la boquilla" },
  "1222664": { en: "Blue adjustable cone nozzle", es: "Boquilla cono ajustable azul" },
  "530626": { en: "Lance and trigger valve", es: "Lanza completa" },
  "1282460": { en: "Pump suction filter PJM-25", es: "Filtro de succión de la bomba" },
  "1220625": { en: "Hose kit", es: "Kit mangueras" },
  "1223797": { en: "Plug type A charger", es: "Cargador con plug tipo A" },
  "1223793": { en: "Plug type F charger", es: "Cargador con plug tipo F" },
  "1245614": { en: "Plug type G charger", es: "Cargador con plug tipo G" },
  "1255166": { en: "Plug type I charger", es: "Cargador con plug tipo I" },
};

export function getTranslatedPartName(code: string, originalName: string, locale: string): string {
  if (locale === "pt") return originalName;
  const t = partsTranslations[code];
  if (!t) return originalName;
  return t[locale] || originalName;
}

const machineTranslations: Record<string, Record<string, string>> = {
  "Pulverizador Costal Elétrico": { en: "Battery Backpack Sprayer", es: "Pulverizador de mochila a batería" },
  "Pulverizador Costal a bateria": { en: "Battery Backpack Sprayer", es: "Pulverizador de mochila a batería" },
};

export function getTranslatedMachineName(originalName: string, locale: string): string {
  if (locale === "pt") return originalName;
  const t = machineTranslations[originalName];
  if (!t) return originalName;
  return t[locale] || originalName;
}
