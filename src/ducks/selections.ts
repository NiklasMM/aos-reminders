import { createSlice, createSelector } from 'redux-starter-kit'
import { ISelections, IAllySelections } from 'types/selections'
import { TSupportedFaction } from 'meta/factions'
import { TUnits } from 'types/army'

type TInitialStateType = {
  selections: ISelections
  allySelections: { [key: string]: IAllySelections }
}

const initialState: TInitialStateType = {
  selections: {
    allegiances: [] as string[],
    artifacts: [] as string[],
    battalions: [] as string[],
    endless_spells: [] as string[],
    spells: [] as string[],
    traits: [] as string[],
    units: [] as string[],
  },
  allySelections: {},
}

const deleteAllySelection = (state, action: { payload: TSupportedFaction }) => {
  delete state.allySelections[action.payload]
}
const resetAllySelection = (state, action: { payload: TSupportedFaction }) => {
  state.allySelections[action.payload] = { units: [] as string[] }
}
const resetAllySelections = (state, action) => {
  state.allySelections = initialState.allySelections
}
const resetSelections = (state, action) => {
  state.selections = initialState.selections
}
const updateAllegiances = (state, action) => {
  state.selections.allegiances = action.payload
}
const updateAllyUnits = (state, action: { payload: { factionName: TSupportedFaction; units: TUnits } }) => {
  const { factionName, units } = action.payload
  state.allySelections[factionName] = { units }
}
const updateArtifacts = (state, action) => {
  state.selections.artifacts = action.payload
}
const updateBattalions = (state, action) => {
  state.selections.battalions = action.payload
}
const updateEndlessSpells = (state, action) => {
  state.selections.endless_spells = action.payload
}
const updateSpells = (state, action) => {
  state.selections.spells = action.payload
}
const updateTraits = (state, action) => {
  state.selections.traits = action.payload
}
const updateUnits = (state, action) => {
  state.selections.units = action.payload
}

export const selections = createSlice({
  slice: 'selections',
  initialState,
  reducers: {
    deleteAllySelection,
    resetAllSelections: (state, action) => initialState,
    resetAllySelection,
    resetAllySelections,
    resetSelections,
    updateAllegiances,
    updateAllyUnits,
    updateArtifacts,
    updateBattalions,
    updateEndlessSpells,
    updateSpells,
    updateTraits,
    updateUnits,
  },
})

selections.selectors.getSelections = createSelector(
  ['selections.selections'],
  selections => selections
)

selections.selectors.getAllySelections = createSelector(
  ['selections.allySelections'],
  allySelections => allySelections
)

//@ts-ignore
selections.selectors.getAllyFactionNames = createSelector(
  ['selections.allySelections'],
  allySelections => Object.keys(allySelections)
)
