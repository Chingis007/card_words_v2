"use client"
import React, { useEffect, useState } from "react"
import { Button } from "./ui/button"
import PlayCard from "./PlayCard"
import { CardType } from "./DeckCards"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { cards } from "@/db/schema"
import { Label } from "@radix-ui/react-label"
import { Checkbox } from "@radix-ui/react-checkbox"
import CardCarousel from "./CardCarousel"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ConnectTest from "./ConnectTest"

const CardPlayer = (props: {
  cards: {
    id: number
    originalWord: string
    originalWordDescription: string
    translation: string
    translationDescription: string
    image: string
    deckId: number
    createdAt: string
    updatedAt: string
  }[]
}) => {
  const [started, setStarted] = useState<{
    arr: CardType[]
    bool: boolean
    type: "repetition" | "manual" | "writing" | "connect" | "choose_one"
  }>({ arr: [...props.cards], bool: false, type: "repetition" })
  const [allowFinish, setAllowFinish] = useState(false)
  const [shuffleState, setShuffleState] = useState(false)
  const [imageState, setImageState] = useState(false)
  const [cardsArrayState, setCardsArrayState] = useState(props.cards)
  const shuffle = (array: CardType[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }
  const [flipped, setFlipped] = useState(false)
  const [attempts, setAttempts] = useState(1)
  // useEffect(() => {
  //   if(cardsArrayState)
  //   setStarted(true)
  // }, [cardsArrayState])
  // window.addEventListener("click", () => {
  //   console.log("window click")
  //   setFlipped(false)
  // })
  return (
    <>
      <div
        className="flex flex-col justify-start items-center w-full gap-5 pt-[50px] md:pt-[100px] h-[calc(100vh-107px)] md:h-[calc(100vh-157px)]"
        onClick={() => {
          setFlipped(false)
        }}
      >
        {started.bool ? (
          <div className="w-[60%]  py-6 px-15  flex justify-start items-end gap-5 flex-col">
            <Button
              className=""
              onClick={() => {
                setStarted({
                  arr: [...props.cards],
                  bool: false,
                  type: started.type,
                })
              }}
            >
              Stop
            </Button>
            {started.type === "repetition" ? (
              <CardCarousel
                imageState={imageState}
                shuffleState={shuffleState}
                cards={started.arr}
                flipped={flipped}
                setFlipped={setFlipped}
                type={started.type}
                setAllowFinish={setAllowFinish}
                attempts={attempts}
              />
            ) : started.type === "manual" ? (
              <CardCarousel
                imageState={imageState}
                shuffleState={shuffleState}
                cards={started.arr}
                flipped={flipped}
                setFlipped={setFlipped}
                type={started.type}
                setAllowFinish={setAllowFinish}
                attempts={attempts}
              />
            ) : started.type === "writing" ? (
              <CardCarousel
                imageState={imageState}
                shuffleState={shuffleState}
                cards={started.arr}
                flipped={flipped}
                setFlipped={setFlipped}
                type={started.type}
                setAllowFinish={setAllowFinish}
                attempts={attempts}
              />
            ) : started.type === "connect" ? (
              <ConnectTest cards={started.arr} />
            ) : started.type === "choose_one" ? (
              <div></div>
            ) : undefined}

            {allowFinish ? (
              <Button
                className="w-full"
                onClick={() => {
                  setStarted({
                    arr: [...props.cards],
                    bool: false,
                    type: started.type,
                  })
                }}
              >
                Finish
              </Button>
            ) : undefined}
          </div>
        ) : (
          <div className="flex flex-row justify-center items-center border-black border-1 p-5 bg-white gap-10 rounded-md">
            <div className="flex flex-col justify-start items-start">
              <Tabs
                defaultValue="repetition"
                className="flex flex-col justify-center items-center gap-4"
              >
                <TabsList className="bg-gray-400 gap-5">
                  <TabsTrigger
                    value="repetition"
                    className="hover:bg-gray-200 data-[state=active]:bg-gray-300"
                  >
                    Repetition
                  </TabsTrigger>
                  <TabsTrigger
                    value="manual"
                    className="hover:bg-gray-200 data-[state=active]:bg-gray-300"
                  >
                    Manual Test
                  </TabsTrigger>
                  <TabsTrigger
                    value="writing"
                    className="hover:bg-gray-200 data-[state=active]:bg-gray-300"
                  >
                    Writing Test
                  </TabsTrigger>
                  <TabsTrigger
                    value="connect"
                    className="hover:bg-gray-200 data-[state=active]:bg-gray-300"
                  >
                    Connect Test
                  </TabsTrigger>
                  <TabsTrigger
                    value="choose_one"
                    className="hover:bg-gray-200 data-[state=active]:bg-gray-300"
                  >
                    Choose One
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="repetition" className="w-full">
                  <div className="flex flex-col gap-5 w-full">
                    <div className="flex flex-row justify-start items-center gap-1">
                      <Label htmlFor="shuffle">
                        <img
                          src="/shuffle.png"
                          alt=""
                          className="w-[30px] h-[30px]"
                        />
                      </Label>
                      <input
                        type="checkbox"
                        id="shuffle"
                        onChange={() => {
                          setShuffleState(!shuffleState)
                        }}
                      />
                      {/* <Checkbox
                className="w-[40px] h-[40px] data-[state=checked]:bg-primary data-[state=unchecked]:bg-black"
                onCheckedChange={(checked: boolean | "indeterminate") => {
                  if (checked === true) setShuffleState(true)
                  if (checked === false) setShuffleState(false)
                  }}
                  id="shuffle"
              /> */}
                      {/* <Switch
                className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-black"
                onCheckedChange={(checked) => {
                  setShuffleState(checked)
                  }}
                  id="shuffle"
                  /> */}
                      <Label htmlFor="shuffle">Shuffle</Label>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                      <Button
                        className=""
                        onClick={() => {
                          if (shuffleState) {
                            let newArrr = shuffle([...props.cards])
                            setStarted({
                              arr: [...newArrr],
                              bool: true,
                              type: "repetition",
                            })
                          } else {
                            setStarted({
                              arr: [...props.cards],
                              bool: true,
                              type: "repetition",
                            })
                          }
                        }}
                      >
                        Start Repetition
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="manual" className="w-full">
                  <div className="flex flex-col gap-5 w-full">
                    <div className="flex flex-row justify-start items-center gap-1">
                      <Label htmlFor="shuffle">
                        <img
                          src="/shuffle.png"
                          alt=""
                          className="w-[30px] h-[30px]"
                        />
                      </Label>
                      <input
                        type="checkbox"
                        id="shuffle"
                        onChange={() => {
                          setShuffleState(!shuffleState)
                        }}
                      />
                      {/* <Checkbox
                className="w-[40px] h-[40px] data-[state=checked]:bg-primary data-[state=unchecked]:bg-black"
                onCheckedChange={(checked: boolean | "indeterminate") => {
                  if (checked === true) setShuffleState(true)
                  if (checked === false) setShuffleState(false)
                  }}
                  id="shuffle"
                  /> */}
                      {/* <Switch
                className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-black"
                onCheckedChange={(checked) => {
                  setShuffleState(checked)
                  }}
                  id="shuffle"
                  /> */}
                      <Label htmlFor="shuffle">Shuffle</Label>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                      <Button
                        className=""
                        onClick={() => {
                          if (shuffleState) {
                            let newArrr = shuffle([...props.cards])
                            setStarted({
                              arr: [...newArrr],
                              bool: true,
                              type: "manual",
                            })
                          } else {
                            setStarted({
                              arr: [...props.cards],
                              bool: true,
                              type: "manual",
                            })
                          }
                        }}
                      >
                        Start Manual Test
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="writing" className="w-full">
                  <div className="flex flex-col gap-5 w-full">
                    <div className="flex flex-row justify-start items-center gap-1">
                      <Label htmlFor="shuffle">
                        <img
                          src="/shuffle.png"
                          alt=""
                          className="w-[30px] h-[30px]"
                        />
                      </Label>
                      <input
                        type="checkbox"
                        id="shuffle"
                        onChange={() => {
                          setShuffleState(!shuffleState)
                        }}
                      />
                      <Label htmlFor="shuffle">Shuffle</Label>
                    </div>
                    <div className="flex flex-row justify-start items-center gap-1">
                      <img
                        src="/retry.png"
                        alt=""
                        className="w-[30px] h-[30px]"
                      />
                      <Select
                        name="attempts"
                        value={String(attempts)}
                        onValueChange={(values) => setAttempts(Number(values))}
                      >
                        <SelectTrigger className="w-[70px]" id="attempts">
                          <SelectValue placeholder="Choose number of attempts" />
                        </SelectTrigger>
                        <SelectContent className="z-10 bg-white">
                          <SelectItem value="1">1</SelectItem>
                          <SelectItem value="2">2</SelectItem>
                          <SelectItem value="3">3</SelectItem>
                          <SelectItem value="4">4</SelectItem>
                          <SelectItem value="5">5</SelectItem>
                        </SelectContent>
                      </Select>
                      Number of attempts
                    </div>
                    <div className="flex flex-col justify-center items-center">
                      <Button
                        className=""
                        onClick={() => {
                          if (shuffleState) {
                            let newArrr = shuffle([...props.cards])
                            setStarted({
                              arr: [...newArrr],
                              bool: true,
                              type: "writing",
                            })
                          } else {
                            setStarted({
                              arr: [...props.cards],
                              bool: true,
                              type: "writing",
                            })
                          }
                        }}
                      >
                        Start Writing Test
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="connect" className="w-full">
                  <div className="flex flex-col gap-5 w-full">
                    {/* <div className="flex flex-row justify-start items-center gap-1">
                      <Label htmlFor="shuffle">
                        <img
                          src="/shuffle.png"
                          alt=""
                          className="w-[30px] h-[30px]"
                        />
                      </Label>
                      <input
                        type="checkbox"
                        id="shuffle"
                        onChange={() => {
                          setShuffleState(!shuffleState)
                        }}
                      />
                      <Label htmlFor="shuffle">Shuffle</Label>
                    </div>
                    <div className="flex flex-row justify-start items-center gap-1">
                      <img
                        src="/retry.png"
                        alt=""
                        className="w-[30px] h-[30px]"
                      />
                      <Select
                        name="attempts"
                        value={String(attempts)}
                        onValueChange={(values) => setAttempts(Number(values))}
                      >
                        <SelectTrigger className="w-[70px]" id="attempts">
                          <SelectValue placeholder="Choose number of attempts" />
                        </SelectTrigger>
                        <SelectContent className="z-10 bg-white">
                          <SelectItem value="1">1</SelectItem>
                          <SelectItem value="2">2</SelectItem>
                          <SelectItem value="3">3</SelectItem>
                          <SelectItem value="4">4</SelectItem>
                          <SelectItem value="5">5</SelectItem>
                        </SelectContent>
                      </Select>
                      Number of attempts
                    </div> */}
                    <div className="flex flex-col justify-center items-center">
                      <Button
                        className=""
                        onClick={() => {
                          if (shuffleState) {
                            let newArrr = shuffle([...props.cards])
                            setStarted({
                              arr: [...newArrr],
                              bool: true,
                              type: "connect",
                            })
                          } else {
                            setStarted({
                              arr: [...props.cards],
                              bool: true,
                              type: "connect",
                            })
                          }
                        }}
                      >
                        Start Connect Test
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="choose_one" className="w-full">
                  <div className="flex flex-col gap-5 w-full">
                    <div className="flex flex-row justify-start items-center gap-1">
                      <Label htmlFor="shuffle">
                        <img
                          src="/shuffle.png"
                          alt=""
                          className="w-[30px] h-[30px]"
                        />
                      </Label>
                      <input
                        type="checkbox"
                        id="shuffle"
                        onChange={() => {
                          setShuffleState(!shuffleState)
                        }}
                      />
                      <Label htmlFor="shuffle">Shuffle</Label>
                    </div>
                    <div className="flex flex-row justify-start items-center gap-1">
                      <img
                        src="/retry.png"
                        alt=""
                        className="w-[30px] h-[30px]"
                      />
                      <Select
                        name="attempts"
                        value={String(attempts)}
                        onValueChange={(values) => setAttempts(Number(values))}
                      >
                        <SelectTrigger className="w-[70px]" id="attempts">
                          <SelectValue placeholder="Choose number of attempts" />
                        </SelectTrigger>
                        <SelectContent className="z-10 bg-white">
                          <SelectItem value="1">1</SelectItem>
                          <SelectItem value="2">2</SelectItem>
                          <SelectItem value="3">3</SelectItem>
                          <SelectItem value="4">4</SelectItem>
                          <SelectItem value="5">5</SelectItem>
                        </SelectContent>
                      </Select>
                      Number of attempts
                    </div>
                    <div className="flex flex-col justify-center items-center">
                      <Button
                        className=""
                        onClick={() => {
                          if (shuffleState) {
                            let newArrr = shuffle([...props.cards])
                            setStarted({
                              arr: [...newArrr],
                              bool: true,
                              type: "choose_one",
                            })
                          } else {
                            setStarted({
                              arr: [...props.cards],
                              bool: true,
                              type: "choose_one",
                            })
                          }
                        }}
                      >
                        Start Choose One Test
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default CardPlayer
