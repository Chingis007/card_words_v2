"use client"
import React, { useState } from "react"
import { Button } from "./ui/button"
import PlayCard from "./PlayCard"

const CardPlayer = (cards: any) => {
  const [started, setStarted] = useState(false)
  const [currentCard, setCurrentCard] = useState(0)
  return (
    <>
      <div className="md:mt-10 max-w-sm mx-auto gap-1 flex flex-col justify-center items-center w-[330px]">
        <div className="relative flex flex-row justify-between w-full h-[36px]">
          {currentCard > 0 && (
            <Button
              className="absolute left-0"
              onClick={() => setCurrentCard(currentCard - 1)}
            >
              Prev
            </Button>
          )}
          <Button
            className="absolute left-[40%]"
            onClick={() => setStarted(!started)}
          >
            {started ? "Stop" : "Start"}
          </Button>
          {currentCard < cards.cards?.length - 1 && (
            <Button onClick={() => setCurrentCard(currentCard + 1)}>
              Next
            </Button>
          )}
        </div>

        {started ? (
          cards.cards?.length > 0 ? (
            <PlayCard key={currentCard} post={cards.cards[currentCard]} />
          ) : (
            <p className="w-fit">There are no Cards in Deck</p>
          )
        ) : (
          <p className="w-fit">Press Start</p>
        )}
      </div>
    </>
  )
}

export default CardPlayer
