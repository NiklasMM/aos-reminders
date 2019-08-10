import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import styled from '@emotion/styled'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

type TQuote = { id: string; content: string }

const initial: TQuote[] = Array.from({ length: 10 }, (v, k) => k).map(k => {
  const custom: TQuote = {
    id: `id-${k}`,
    content: `Quote ${k}`,
  }

  return custom
})

const grid = 8
const reorder = (list: TQuote[], startIndex: number, endIndex: number): TQuote[] => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

const QuoteItem = styled.div`
  width: 200px;
  border: 1px solid grey;
  margin-bottom: ${grid}px;
  background-color: lightblue;
  padding: ${grid}px;
`

function Quote({ quote, index }) {
  return (
    <Draggable draggableId={quote.id} index={index}>
      {provided => (
        <QuoteItem ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          {quote.content}
        </QuoteItem>
      )}
    </Draggable>
  )
}
type TQuoteState = { quotes: TQuote[] }

const QuoteList = ({ quotes }: TQuoteState) => (
  <>
    {quotes.map((quote: TQuote, index: number) => (
      <Quote quote={quote} index={index} key={quote.id} />
    ))}
  </>
)

export const QuoteApp = () => {
  const [state, setState] = useState<TQuoteState>({ quotes: initial })

  const onDragEnd = result => {
    if (!result.destination) return
    if (result.destination.index === result.source.index) return

    const quotes = reorder(state.quotes, result.source.index, result.destination.index)
    setState({ quotes })
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="list">
        {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <QuoteList quotes={state.quotes} />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}
