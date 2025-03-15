
  
  export interface Ability {
    id: number;
    name: string;
    is_main_series: boolean;
    generation: {
      name: string;
    };
    names: Array<{
      name: string;
      language: {
        name: string;
      };
    }>;
    effect_entries: Array<{
      effect: string;
      short_effect: string;
      language: {
        name: string;
      };
    }>;
    effect_changes: Array<{
      effect_entries: Array<{
        effect: string;
        language: {
          name: string;
        };
      }>;
      version_group: {
        name: string;
      };
    }>;
    flavor_text_entries: Array<{
      flavor_text: string;
      language: {
        name: string;
      };
      version_group: {
        name: string;
      };
    }>;
    pokemon: Array<{
      is_hidden: boolean;
      slot: number;
      pokemon: {
        name: string;
      };
    }>;
  }