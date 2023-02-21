import React, {
    useCallback,
    useEffect,
    useState,
    useRef,
  } from 'react'
  
  import {
    Text,
    StatusBar,
    View,
    Pressable,
    StyleSheet,
    Image,
    Alert,
    Linking,
    ActivityIndicator,
  } from 'react-native'
  
  import Capture from './assets/capture.png'
  import ActiveButton from '../components/ActiveButton'
  
  
  import ImagePicker, { ImageOrVideo } from 'react-native-image-crop-picker'
  import TextRecognition from 'react-native-text-recognition'
  import {
    Camera,
    // CameraPermissionRequestResult,
    useCameraDevices
  } from 'react-native-vision-camera'
  const findCardNumberInArray = (arr) => {
    console.log('cardnumberArrcardnumberArrcardnumberArrcardnumberArr', arr)
    let cardNumber = '';
    arr.forEach(e => {
      let numbericValue = e.replace(/\D/g, '')
      const cardNumberRegex =
        /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
      if (cardNumberRegex.test(numbericValue)) {
        cardNumber = numbericValue
        return
      }
    })
    return cardNumber
  }
  function RecognizeCard({ navigation: { goBack } }) {
    const [processedText, setProcessedText] = useState('Scan a Card to see\nCard Number here')
    const [isProcessingText, setIsProcessingText] = useState(false)
    const camera = useRef(null)
    const devices = useCameraDevices()
    let device = devices.back
    const [hasPermissions, setHasPermissions] = useState(false)
    const [cardIsFound, setCardIsFound] = useState(false)
  
    const pickAndRecognize = useCallback(async () => {
      console.log('------------------------------------------------------------------')
      try {
        ImagePicker.openPicker({
          cropping: false,
        }).then(async (res) => {
          console.log('************************************************', typeof (res || ''), JSON.stringify(res || ''))
          setIsProcessingText(true)
          // const result = await TextRecognition.recognize(res?.path);
          setIsProcessingText(false)
          // validateCard(result)
        }).catch(err => {
          setIsProcessingText(false)
          console.log('pickPicture', err)
        })
      } catch (err) {
        console.log('************** pick picture failed', err)
      }
  
    }, [])
    const validateCard = (result) => {
      const cardNumber = findCardNumberInArray(result)
      if (cardNumber?.length) {
        setProcessedText(cardNumber)
        setCardIsFound(true)
      } else {
        setProcessedText('无效卡号，请重试')
        setCardIsFound(false)
      }
    }
    const captureAndRecognize = useCallback(async () => {
      try {
        const image = await camera.current?.takePhoto({
          qualityPrioritization: 'quality',
          enableAutoStabilization: true,
          flash: 'on',
          skipMetadata: true,
        })
        setIsProcessingText(true)
        // const result = await TextRecognition.recognize(image?.path)
        console.log('++++++++++++++++++++++++++++++++++++++', typeof (image || ''), JSON.stringify(image || ''))
        setIsProcessingText(false)
        // validateCard(result)
      } catch (err) {
        console.log('err: ', err)
        setIsProcessingText(false)
      }
    }, [])
    useEffect(() => {
      console.log('nioljpoiaefaewfaew', '-------------')
      !(async () => {
        console.log('device:------------------- ', device)
        const cameraPermission = await Camera.requestCameraPermission()
        const microPhonePermission = await Camera.requestMicrophonePermission()
        console.log('cameraPermission:++++++++++++++ ', cameraPermission, 'microPhonePermission:++++++++++++++ ', microPhonePermission)
        if (cameraPermission === 'denied' || microPhonePermission === 'denied') {
          Alert.alert(
            'Allow Permissions',
            'Please allow camera and microphone permission to access camera features',
            [
              {
                text: 'Go to Settings',
                onPress: () => Linking.openSettings(),
              },
              {
                text: 'Cancel',
                onpress: () => console.log('Cancel'),
                style: 'cancel',
              },
            ],
          )
          setHasPermissions(false)
        } else {
          setHasPermissions(true)
        }
      })()
    }, [])
    return (
      <View>
        <StatusBar barStyle={'dark-content'} />
        <Pressable style={styles.galleryBtn} onPress={() => { goBack() }}>
          <Text style={styles.btnText}>返回</Text>
        </Pressable>
        {/* <ActiveButton
          handler={pickAndRecognize}
          buttonTitle={'选择照片'}
        /> */}
        <Pressable style={styles.galleryBtn} onPress={pickAndRecognize} >
          <Text style={styles.btnText}>选择照片</Text>
        </Pressable>
        <Text style={styles.title}>Credit Card Scanner</Text>
        {
          device && hasPermissions ? (
            <View>
              <Camera
                photo
                enableHighQualityPhotos
                ref={camera}
                style={styles.camera}
                isActive={true}
                device={device}
              />
              <Pressable
                style={styles.captureBtnContainer}
                onPress={captureAndRecognize}>
                <Image source={Capture} />
              </Pressable>
            </View>
          ) : (
            <Text>No Camera Found</Text>
          )
        }
        {isProcessingText ? (
          <ActivityIndicator
            size={'large'}
            style={styles.activityIndicator}
            color={'blue'}
          />
        ) : cardIsFound ? (
          <Text style={styles.creditCardNo}>
            {'获取图片'}
          </Text>
        ) : (
          <Text style={styles.errorText}>{'获取成功'}</Text>
        )}
  
      </View>
    )
  }
  
  export default RecognizeCard
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 20,
      fontWeight: '700',
      color: '#111',
      letterSpacing: 0.5,
      marginTop: 18,
    },
    galleryBtn: {
      paddingVertical: 14,
      paddingHorizontal: 24,
      backgroundColor: '#000',
      borderRadius: 40,
      marginTop: 18,
    },
    btnText: {
      fontSize: 16,
      color: '#fff',
      fontWeight: '400',
      letterSpacing: 0.4,
    },
    camera: {
      marginVertical: 24,
      height: 240,
      width: 360,
      borderRadius: 20,
      borderWidth: 2,
      borderColor: '#000',
    },
    captureBtnContainer: {
      position: 'absolute',
      bottom: 28,
      right: 10,
    },
    errorText: {
      marginTop: 24,
      fontSize: 16,
      fontWeight: 'bold',
      color: 'purple',
      textAlign: 'center',
      alignSelf: 'center',
    },
    creditCardNo: {
      fontSize: 22,
      fontWeight: 'bold',
      letterSpacing: 2,
      color: 'blue',
      marginTop: 40,
      textAlign: 'center',
      alignSelf: 'center',
    },
    activityIndicator: {
      marginTop: 34,
    },
  })
  