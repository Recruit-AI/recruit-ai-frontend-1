export const defaultSymbol = {
    symbol_name: "",
    symbol_kind_id: 1,
    other_spellings: "",
    symbol_description: "",
    symbol_overview_text: "",
    symbol_meaning_text:"",
    order_number: 0,
    extra_info: {}
}

export const defaultSymbolKeys = [
    'symbol_name',
    'symbol_kind_id',
    'other_spellings',
    'symbol_description',
    'symbol_overview_text',
    'symbol_meaning_text',
    'order_number',
    'extra_info'
]

export const defaultConnection = {
      id: "",
      mainId: "",
      connectedId: "",
      relationship: 0,
      strength: 0,
      description: "",
      aboutText: ""
}

export const defaultKind = {
  'kind_name': "",
  'kind_description': "",
  'kind_application_theory_text': "",
  'kind_background_history_text': "",
  'creator_pantheon_id': 1,
  'total_number': 0,
  'specific_order': false,
  'default_extra_info': {}
}

export const defaultKindKeys = [
  'kind_id',
  'kind_name',
  'kind_description',
  'kind_application_theory_text',
  'kind_background_history_text',
  'creator_pantheon_id',
  'total_number',
  'specific_order',
  'default_extra_info'
]

export const defaultPantheon = {
    pantheon_name: "",
    pantheon_description: "",
    pantheon_overview_text: "",
    pantheon_history_text: "",
    pantheon_culture_text: "",
    start_year: 0,
    end_year: 0
  }

  export const defaultPantheonKeys = [
    'pantheon_name',
    'pantheon_description',
    'pantheon_overview_text',
    'pantheon_history_text',
    'pantheon_culture_text',
    'start_year',
    'end_year'
  ]

export const defaultCategory = {
    category_name: "",
    category_description: "",
    category_overview_text: "",
    category_sources_text: "",
    category_number: 0
}

export const defaultCategoryKeys = [
      'category_name',
      'category_description',
      'category_overview_text',
      'category_sources_text',
      'category_number'
]
