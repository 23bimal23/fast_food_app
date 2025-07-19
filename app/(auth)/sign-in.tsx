import CustomButton from '@/components/CustomButton'
import CustomInput from '@/components/CustomInput'
import { signIn } from '@/lib/appwrite'
import { Link, router } from 'expo-router'
import React from 'react'
import { Alert, Text, View } from 'react-native'

const SignIn = () => {
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [form, setForm] = React.useState({
    email: '',
    password: ''
  })

  const submit = async () => {
    const { email, password } = form
    if (!email || !password) {
      return Alert.alert('Error', 'Please fill all fields')
    }
    setIsSubmitting(true)
    try {
      await signIn({ email, password })
      router.replace('/')
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'An unknown error occurred';
      Alert.alert('Error', errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <View className="gap-10 bg-white rounded-lg mt-5">

      <CustomInput
        placeholder="Enter your Email"
        value={form.email}
        onChangeText={(text) => setForm((prev) => ({ ...prev, email: text }))}
        label="Email"
        secureTextEntry={false}
        keyboardType="email-address"
      />
      <CustomInput
        placeholder="Enter your Password"
        value={form.password}
        onChangeText={(text) => setForm((prev) => ({ ...prev, password: text }))}
        label="Password"
        secureTextEntry={true}
      />
      <CustomButton
        title='Sign In '
        isLoading={isSubmitting}
        onPress={submit}
      />
      <View className='flex justify-center mt-5 flex-row gap-2'>
        <Text className='base-regular text-gray-100'> Don&apos;t have an account?
        </Text>
        <Link href="/sign-up" className='base-regular text-primary'>Sign Up</Link>
      </View>
    </View>
  )
}

export default SignIn