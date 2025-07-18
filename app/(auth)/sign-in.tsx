import CustomButton from '@/components/CustomButton'
import CustomInput from '@/components/CustomInput'
import React from 'react'
import { View } from 'react-native'

const SignIn = () => {
  return (
    <View className="gap-10 bg-white rounded-lg mt-5">
      
          <CustomInput
          placeholder="Enter your Email"
          value={''}
          onChangeText={() => { }}
          label="Email"
          secureTextEntry={false}
          keyboardType="email-address"
        />
            <CustomInput
          placeholder="Enter your Password"
          value={''}
          onChangeText={() => { }}
          label="Password"
          secureTextEntry={true}
        />
        <CustomButton 
        title='Sign In '
        />
    </View>
  )
}

export default SignIn