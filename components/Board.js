import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import Tile from "./Tile";
import { GRID_PADDING, GRID_SIZE, TILE_SIZE } from "../constants";

export default function Board() {
  const TILES_COUNT = 9;
  const tiles = [...Array(TILES_COUNT).keys()];
  const [gameTiles, setGameTiles] = useState([]);

  useEffect(() => {
    let game = shuffle(tiles);
    setGameTiles(game);
  }, []);

  const countInversions = (tiles) => {
    let inversions = 0;

    for (let i = 0; i < tiles.length - 1; i++) {
      const tile_1 = tiles[i];
      for (let j = i + 1; j < tiles.length - 1; j++) {
        const tile_2 = tiles[j];
        if (tile_2 > tile_1) {
          inversions++;
        }
      }
    }

    return inversions;
  };

  function isSolvable(tiles) {
    let cantBeSolved = countInversions(tiles) % 2 === 1;

    return !cantBeSolved;
  }

  function isSolved(gameTiles) {
    let defaultTiles = [...tiles];
    defaultTiles.shift();
    defaultTiles.push(0);
    let notTheSame = 0;
    for (let i = 0; i < defaultTiles.length; i++) {
      const tile = defaultTiles[i];
      const gameTile = gameTiles[i];
      if (tile !== gameTile) {
        notTheSame++;
      }
    }
    return notTheSame === 0;
  }

  function shuffle(tiles) {
    const shuffledTiles = [
      ...tiles
        .filter((t) => t !== tiles.length - 1)
        .sort(() => Math.random() - 0.5),
      tiles.length - 1,
    ];
    return isSolvable(shuffledTiles) && !isSolved(shuffledTiles)
      ? shuffledTiles
      : shuffle(shuffledTiles);
  }

  const exchangeTiles = (from, to) => {
    let tiles = [...gameTiles];
    let temp = tiles[from];

    tiles[from] = tiles[to];
    tiles[to] = temp;

    setGameTiles(tiles);
  };

  useEffect(() => {
    console.log("called");

    let solved = isSolved(gameTiles);
    if (solved) {
      alert("win");
    }
  }, [gameTiles]);

  const handleShuffleOnPress = () => {
    const shuffled = shuffle(gameTiles);
    setGameTiles(shuffled);
  };

  return (
    <>
      <View style={[styles.container, { width: GRID_SIZE }]}>
        {gameTiles.map((tile, i) => (
          <Tile
            key={i}
            tile={tile}
            index={i}
            onPress={(activeTile) => {
              const index = gameTiles.indexOf(activeTile);

              // // can go right
              if (gameTiles[index + 1] === 0) {
                if (index !== 5) {
                  exchangeTiles(index + 1, index);
                  return;
                }
              }

              // // can go left
              if (gameTiles[index - 1] === 0) {
                if (index !== 3 && index !== 6 && index !== 9) {
                  exchangeTiles(index - 1, index);
                  return;
                }
              }

              // // can go upward
              if (gameTiles[index - 3] === 0) {
                exchangeTiles(index - 3, index);
                return;
              }

              // // can go downward
              if (gameTiles[index + 3] === 0) {
                exchangeTiles(index + 3, index);
                return;
              }
            }}
          />
        ))}
      </View>
      <View style={{ paddingTop: 10 }}>
        <TouchableOpacity
          onPress={handleShuffleOnPress}
          style={{ backgroundColor: "#222B39", padding: 10, borderRadius: 10 }}
        >
          <Text style={{ color: "white" }}>Re-shuffle</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#222B39",
    flexWrap: "wrap",
    flexDirection: "row",
    borderRadius: 5,
    paddingLeft: GRID_PADDING,
    paddingTop: GRID_PADDING,
  },
});
