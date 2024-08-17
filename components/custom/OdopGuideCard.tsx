import React, { useState } from 'react';
import { View, Image, Modal, TouchableOpacity } from 'react-native';
import { H4, YStack, Paragraph } from 'tamagui';
import { Video, ResizeMode } from 'expo-av';
import { CloseCircle } from 'iconsax-react-native';

type OdopCardProps = {
  id: number;
  description: string;
  title: string;
  image: string;
  video: string;
};

const imageMap: { [key: string]: any } = {
  'Workshop1.jpg': require('~/assets/Workshops/Workshop1.jpg'),
  'Workshop2.jpg': require('~/assets/Workshops/Workshop2.jpg'),
};

const videoMap: { [key: string]: any } = {
  'Workshop1.mp4': require('~/assets/Info/Workshop1.mp4'),
  'Workshop2.mp4': require('~/assets/Info/Workshop2.mp4'),
};

const OdopCard: React.FC<OdopCardProps> = ({ id, title, description, image, video }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <YStack 
      backgroundColor="#222222"
      borderRadius="$3"
      marginBottom="$5"
      width={"100%"}
    >
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Image
          source={imageMap[image]}
          style={{ width: '100%', height: 200, borderRadius: 10, marginBottom: 10 }}
        />
      </TouchableOpacity>
      <YStack paddingHorizontal="$3">
        <H4 
          fontWeight={700}
          marginBottom={"$2"}
        >
          {title}
        </H4>
        <Paragraph width={"100%"} size={"$3"} theme="alt2" marginBottom={"$3"}>
          {description}
        </Paragraph>
      </YStack>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
        }}>
          <View style={{
            width: '90%',
            aspectRatio: 16 / 9,
            backgroundColor: 'black',
            borderRadius: 10,
            overflow: 'hidden',
          }}>
            <Video
              source={videoMap[video]}
              rate={1.0}
              volume={1.0}
              isMuted={false}
              resizeMode={ResizeMode.CONTAIN}
              shouldPlay
              useNativeControls
              style={{
                width: '100%',
                height: '100%',
              }}
            />
            <TouchableOpacity 
              onPress={() => setModalVisible(false)}
              style={{
                position: 'absolute',
                top: 10,
                right: 10,
                padding: 10,
                borderRadius: 5,
              }}
            >
              <CloseCircle size="20" color="#ffffff"/>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </YStack>
  );
}

export default OdopCard;