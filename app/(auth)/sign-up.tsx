import CustomButton from '@/components/CustomButton'
import CustomInput from '@/components/CustomInput'
import { createUser } from '@/lib/appwrite'
import { Link, router } from 'expo-router'
import React from 'react'
import { Alert, Text, View } from 'react-native'

const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [form, setForm] = React.useState({
    name: '',
    email: '',
    password: ''
  })

  const submit = async () => {
    const { name, email, password } = form
    if (!form.name || !form.email || !form.password) {
      return Alert.alert('Error', 'Please fill all fields')
    }
    setIsSubmitting(true)
    try {
      await createUser({
        name,
        email,
        password
      })
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
        placeholder="Enter your Full Name"
        value={form.name}
        onChangeText={(text) => setForm((prev) => ({ ...prev, name: text }))}
        label="Full Name"
        secureTextEntry={false}
      />
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
        title='Sign Up'
        isLoading={isSubmitting}
        onPress={submit}
      />
      <View className='flex justify-center mt-5 flex-row gap-2'>
        <Text className='base-regular text-gray-100'> Alreadyhave an account?
        </Text>
        <Link href="/sign-in" className='base-regular text-primary'>Sign In</Link>
      </View>
    </View>
  )
}

export default SignUp