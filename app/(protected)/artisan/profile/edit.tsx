import React, { useState } from 'react';
import { YStack, H2, ScrollView, Button } from 'tamagui';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import * as DocumentPicker from 'expo-document-picker';
import { ControlledInput, ControlledTextArea } from '~/components/forms/Controllers/ControlFields';
import { useRouter } from 'expo-router';

function EditProfile() {
  const router = useRouter();
  const [profileImage, setProfileImage] = useState<any>(null);

  const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    address: yup.string().required('Address is required'),
    aboutMe: yup.string().required('About Me is required'),
    mobileNumber: yup
      .string()
      .required('Mobile number is required')
      .matches(/^[0-9]+$/, 'Must be only digits'),
    email: yup.string().required('Email is required').email('Invalid email'),
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const uploadProfileImage = async () => {
    try {
      const result: any = await DocumentPicker.getDocumentAsync({
        type: 'image/*',
      });

      const uri = result.assets[0].uri;
      const data = {
        uri,
        type: result?.assets[0]?.mimeType,
        name: result?.assets[0]?.name,
      };

      setProfileImage(data);
    } catch (error) {
      console.error('Failed to upload profile image:', error);
    }
  };

  async function onSubmit(data: any) {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    formData.append('profile_image', profileImage);

    // Log the formData contents
    console.log(formData);

    // Reset the form after 3 seconds
    setTimeout(() => {
      reset(); // Reset the form
    }, 3000);

    router.replace('/(protected)/(tabs)/profile');

    // API call (commented out for now)
    // const res = await updateProfile(uid, formData);
    // if (res?.success) {
    //   router.replace('/profile/')
    // } else {
    //   alert(res.message)
    // }
  }

  return (
    <ScrollView>
      <YStack width={'100%'} height={'100%'} justifyContent="center" paddingHorizontal="$5">
        <H2 fontWeight={'bold'} mb="$2">
          Edit Profile
        </H2>
        <YStack width="100%" pb="$2" mt="$6">
          <ControlledInput
            name="name"
            placeholder="Update Your Name"
            control={control}
            label="Name"
          />

          <ControlledInput
            name="address"
            placeholder="Update Your Address"
            control={control}
            label="Address"
          />

          <ControlledTextArea
            name="aboutMe"
            placeholder="Change your Description"
            label="About You"
            numberOfLines={4}
            control={control}
          />

          <ControlledInput
            keyboardType="numeric"
            name="mobileNumber"
            label="Mobile Number"
            placeholder="Update Phone Number"
            control={control}
          />

          <ControlledInput
            control={control}
            keyboardType="email-address"
            name="email"
            placeholder="Update Your Email"
            label="Email"
          />

          <Button onPress={uploadProfileImage} mt="$4">
            {profileImage ? `Uploaded: ${profileImage.name}` : 'Update Profile Picture'}
          </Button>

          <Button my="$6" themeInverse width={'100%'} onPress={handleSubmit(onSubmit)}>
            SUBMIT
          </Button>
        </YStack>
      </YStack>
    </ScrollView>
  );
}

export default EditProfile;
