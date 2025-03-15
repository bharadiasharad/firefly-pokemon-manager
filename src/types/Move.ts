export interface Move {
    id: number;
    name: string;
    accuracy: number;
    effect_chance: number;
    pp: number;
    priority: number;
    power: number;
    contest_combos: {
      normal: {
        use_before: Array<{ name: string }>;
        use_after: Array<{ name: string }>;
      };
      super: {
        use_before: Array<{ name: string }>;
        use_after: Array<{ name: string }>;
      };
    };
    contest_effect: {
      url: string;
    };
    damage_class: {
      name: string;
    };
    effect_entries: Array<{
      effect: string;
      short_effect: string;
      language: {
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
    generation: {
      name: string;
    };
    machines: Array<{
      machine: {
        url: string;
      };
      version_group: {
        name: string;
      };
    }>;
    meta: {
      ailment: {
        name: string;
      };
      category: {
        name: string;
      };
      min_hits: number;
      max_hits: number;
      min_turns: number;
      max_turns: number;
      drain: number;
      healing: number;
      crit_rate: number;
      ailment_chance: number;
      flinch_chance: number;
      stat_chance: number;
    };
    names: Array<{
      name: string;
      language: {
        name: string;
      };
    }>;
    past_values: Array<{
      accuracy: number;
      effect_chance: number;
      power: number;
      pp: number;
      effect_entries: Array<{
        effect: string;
        short_effect: string;
        language: {
          name: string;
        };
      }>;
      type: {
        name: string;
      };
      version_group: {
        name: string;
      };
    }>;
    stat_changes: Array<{
      change: number;
      stat: {
        name: string;
      };
    }>;
    super_contest_effect: {
      url: string;
    };
    target: {
      name: string;
    };
    type: {
      name: string;
    };
  }