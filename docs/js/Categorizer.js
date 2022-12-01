class Categorizer {
  static Platform;
  static ESRB_Rating;
  static Genre;
  static stratum;
  constructor() {
    this.stratum = "Platform";
    this.Platform = {
      "Other": {
        active: true,
        subcategories: ["3DO", "Aco", "Arc", "BBCM", "BRW", "CDi", "FMT", "GIZ", "NG", "Ouya", "PCFX", "PCE", "TG16", "WS", "Mobi"]
      },
      "Atari": {
        active: true,
        subcategories: ["2600", "5200", "7800", "AJ", "Lynx", "AST"]
      },
      "Nintendo": {
        active: true,
        subcategories: ["NES", "SNES", "N64", "GC", "Wii", "WW", "WiiU", "NS", "GB", "GBC", "GBA", "DS", "DSiW", "DSi", "3DS", "iQue", "VB", "VC"]
      },
      "Sega": {
        active: true,
        subcategories: ["MS", "GEN", "SCD", "S32X", "DC", "SAT", "GG"]
      },
      "Microsoft": {
        active: true,
        subcategories: ["XB", "XBL", "X360", "XOne"]
      },
      "Sony": {
        active: true,
        subcategories: ["PS", "PS2", "PS3", "PS4", "PS5", "PSP", "PSV", "PSN", "PSVR"]
      },
      "PC": {
        active: true,
        subcategories: ["Amig", "CD32", "ACPC", "ApII", "CV", "C128", "C64", "Int", "Linux", "OSX", "PC", "MSD", "MSX", "ZXS"]
      },
      "Mobile": {
        active: true,
        subcategories: ["And", "iOS", "NGage", "Mob", "WinP"]
      }
    };
    this.ESRB_Rating = {
      "Unrated": {
        active: true,
        subcategories: ["N/A", "RP", ""]
      },
      "EC": {
        active: true,
        subcategories: ["EC"]
      },
      "E": {
        active: true,
        subcategories: ["E"]
      },
      "E10": {
        active: true,
        subcategories: ["E10"]
      },
      "T": {
        active: true,
        subcategories: ["T"]
      },
      "M": {
        active: true,
        subcategories: ["M"]
      }
    };
    this.Genre = {
      "Misc": {
        active: true,
        subcategories: ["N/A", "Visual Novel", "Board Game", "Education", "Sandbox", "Music", "Party", "Misc"]
      },
      "Sports": {
        active: true,
        subcategories: ["Sports"]
      },
      "Racing": {
        active: true,
        subcategories: ["Racing"]
      },
      "Platforming": {
        active: true,
        subcategories: ["Platform"]
      },
      "Role-Playing": {
        active: true,
        subcategories: ["Role-Playing", "MMO"]
      },
      "Puzzle": {
        active: true,
        subcategories: ["Puzzle", "Adventure"]
      },
      "Fighting": {
        active: true,
        subcategories: ["Fighting"]
      },
      "Action": {
        active: true,
        subcategories: ["Action", "Action-Adventure"]
      },
      "Shooter": {
        active: true,
        subcategories: ["Shooter"]
      },
      "Strategy": {
        active: true,
        subcategories: ["Strategy"]
      },
      "Simulation": {
        active: true,
        subcategories: ["Simulation"]
      }
    };
  }
  generalize(stratum, property) {
    for (let category of Object.keys(this[stratum])) {
      if (this[stratum][category].subcategories.includes(property)) {
        return category;
      }
    }
    return property;
  }
  getStratum(category) {
    if (Object.keys(this.Platform).includes(category)) return "Platform";
    if (Object.keys(this.Genre).includes(category)) return "Genre";
    if (Object.keys(this.ESRB_Rating).includes(category)) return "ESRB_Rating";
  }
  toggle(category) {
    let stratum = this.getStratum(category);
    this[stratum][category].active = this[stratum][category].active ? false : true;
  }
  get activeStratum() {
    return this.stratum;
  }
  set activeStratum(stratum) {
    this.stratum = stratum;
  }

}
