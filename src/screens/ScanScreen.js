import { Text, View, Pressable, Image, StyleSheet, SafeAreaView, ImageBackground} from "react-native";
import { useState } from "react";
import TextRecognition from "@react-native-ml-kit/text-recognition";
import ImagePicker from "react-native-image-crop-picker";
import TextMap from "../components/TextMap";
import ReactNativeZoomableView from '@openspacelabs/react-native-zoomable-view/src/ReactNativeZoomableView';


const ScanScreen = () => {
  const [image, setImage] = useState();
  const [result, setResult] = useState();

  const scan_file = async () => {
    setResult(undefined);
    const _image = await ImagePicker.openPicker({
      mediaType: "photo",
      width: 350,
      height: 400,
      cropping: true,
      // freeStyleCropEnabled: true
    });
    setImage(_image);
    const imageURL = "file://" + _image.path;
    const _result = await TextRecognition.recognize(imageURL);
    setResult(_result);
  };
  const scan_camera = async () => {


    const _image = await ImagePicker.openCamera({
      mediaType: "photo",
      width: 350,
      height: 400,
      cropping: true,
    });
    setImage(_image);
    const imageURL = "file://" + _image.path;
    const _result = await TextRecognition.recognize(imageURL);
    setResult(_result);
  };

  return (
    <SafeAreaView className={"flex-1"}>
      <ImageBackground 
        source={require("../img/paper.jpg")}
        className={"absolute w-screen h-screen"}
      />
      <View className={"flex-row mt-20 justify-evenly"}>
        <Pressable
          className={"h-20 w-40 items-center justify-center bg-red-800 rounded-lg"}
          onPress={() => scan_file()}
        >
          <Text className={"text-white"}>SCAN</Text>
        </Pressable>
        <Pressable
          className={"h-20 w-40 items-center justify-center bg-cyan-800 rounded-lg"}
          onPress={() => scan_camera()}
        >
          <Text className={"text-white"}>CAMERA</Text>
        </Pressable>
      </View>
    <View className={"items-center justify-center h-[400] w-[350] self-center mt-14 border-black border-2"}>
      <ReactNativeZoomableView
        maxZoom={3}
        minZoom={1}
        zoomStep={0.5}
        initialZoom={1}
        bindToBorders={true}
        contentWidth={350}
        contentHeight={400}
        style={{ height: 400, width: 350 }}

      >
      {image && (
        <View>
          <Image
            source={{ uri: image.path }}
            style={{ height: image.height, width: image.width }}
            className={"rounded-lg"}
          />
          {result && (
            <TextMap
              blocks={result.blocks}
            />
          )}
        </View>
      )}
      {!image && (
        <View><Text className={"text-lg font-bold"}>No image</Text></View>
      )}
      </ReactNativeZoomableView>
    </View>
    </SafeAreaView>

  );
};

export default ScanScreen;
