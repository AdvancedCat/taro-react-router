import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { AtIcon } from "taro-ui";

export default function BackToHome() {
  const clickBackToHome = () => {
    Taro.redirectTo({
      url: "/pages/home/index"
    });
  };
  return (
    <View onClick={clickBackToHome} style={{ textDecoration: "underline" }}>
      <AtIcon value="home" size="30" color="#F00"></AtIcon>返回首页
    </View>
  );
}
