export const defaultSymbol = {
    id: "",
    name: "",
    pantheonIds: [],
    kindId: "",
    otherSpellings: [],
    description: "",
    thumbnail: "",
    images: [],
    backgroundText: "",
    meaningText:"",
    number: "",
    info: {}
}

export const defaultConnection = {
      id: "",
      mainId: "",
      connectedId: "",
      relationship: "",
      strength: "",
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
    pantheon_overview: "",
    pantheon_history: "",
    pantheon_culture: "",
    start_year: 0,
    end_year: 0
  }

  export const defaultPantheonKeys = [
    'pantheon_name',
    'pantheon_description',
    'pantheon_overview',
    'pantheon_history',
    'pantheon_culture',
    'start_year',
    'end_year'
  ]

export const defaultCategory = {
    id: "",
    name: "",
    description: "",
    kindIds: [],
    prerequisiteIds: [],
    overviewText: "",
    sourcesText: "",
}

export const defaultUser = {

}
