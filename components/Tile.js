import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
  Image,
} from "react-native";
import React, { useEffect } from "react";
import { TILE_MARGIN, TILE_SIZE, GRID_SIZE, GRID_PADDING } from "../constants";

export default function Tile({ tile, onPress, index }) {
  useEffect(() => {
    // console.log({ tile });
  }, [tile]);

  const calculateTop = () => {
    if (tile === 1 || tile < 4) {
      console.log(-GRID_PADDING / 2);
      return -GRID_PADDING / 2;
    }

    if (tile > 3 && tile < 7) {
      console.log(-TILE_SIZE - GRID_PADDING);
      return -TILE_SIZE - GRID_PADDING;
    }

    if (tile > 6 && tile < 9) {
      return -(TILE_SIZE * 2) - GRID_PADDING * 2;
    }
  };

  const calculateLeft = () => {
    if (tile === 1 || tile === 4 || tile === 7) {
      return 0;
    }

    if (tile > 1 && tile < 4) {
      return -(TILE_SIZE * (tile - 1));
    }

    if (tile === 4 || tile === 7) {
      return 0;
    }

    if (tile === 5 || tile === 8) {
      return -TILE_SIZE;
    }

    if (tile === 6 || tile === 0) {
      return -TILE_SIZE * 2;
    }
  };

  const imageStyle = {
    position: "absolute",
    height: GRID_SIZE,
    width: GRID_SIZE,
    top: calculateTop(),
    left: calculateLeft(),
  };

  return (
    <Pressable
      style={[
        styles.container,
        {
          overflow: "hidden",
          opacity: tile === 0 ? 0 : 1,
        },
      ]}
      onPress={() => {
        onPress(tile);
      }}
    >
      <Image style={imageStyle} source={require("../assets/pepe.png")} />
      <View style={styles.circularContainer}>
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>
          {tile}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: TILE_SIZE,
    height: TILE_SIZE,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginRight: TILE_MARGIN,
    marginBottom: TILE_MARGIN,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  circularContainer: {
    backgroundColor: "#222B39",
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    justifyContent: "center",
    alignItems: "center",
  },
});
