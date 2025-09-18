import {Pressable, Text, View, Image} from 'react-native';
import React from 'react';

const AchievementRow = props => (
  <View
    style={{
      flex: 4,
      justifyContent: 'center',
      alignItems: 'center',
      width: props.width * 0.9,
    }}>
    <Pressable
      style={{
        width: props.width * 0.9,
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 36,
        backgroundColor: props.color,
        marginBottom: props.marginBottom,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.0,
        elevation: 1,
      }}
      onPress={props.onPress}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}>
        <Image
          source={require('../assets/soccer.png')}
          resizeMethod="scale"
          width={50}
        />
      </View>
      <View
        style={{
          flex: 2,
          justifyContent: 'space-between',
          flexDirection: 'column',
          alignItems: 'center',
          alignContent: 'center',
        }}>
        <View
          style={{
            flex: 1.1,
            justifyContent: 'flex-end',
            alignContent: 'center',
            alignItems: 'center',
            marginVertical: 5,
          }}>
          <Text style={{fontSize: 25}}>축구</Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-start',
            alignContent: 'center',
            alignItems: 'center',
            marginVertical: 5,
          }}>
          <Text>축구가 언급되는 일기 작성</Text>
        </View>
      </View>
    </Pressable>
  </View>
);

export default AchievementRow;
