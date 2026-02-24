import React, { useEffect } from "react";
import { Image, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient"; 
import { useRouter } from "expo-router";

const logoApp = require("@/assets/images/Logonutri.png");

export default function Inicio() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("login");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient
          colors={["#0a1f1a", "#0f172a", "#03001de8"]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.gradient}
        >
      <View style={styles.container}>
        <Image source={logoApp} style={styles.logo} resizeMode="contain" />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 240,
    height: 90,
    marginBottom: 15,
  },
});
