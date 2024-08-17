import React, { useState } from 'react';
import { YStack, H2, Paragraph, Form, Button, ScrollView, Input } from 'tamagui';
import { useForm, useWatch, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { SwitchWithLabel } from '~/components/shared/SwitchWithLabel';
import Dimensions from '~/components/productListForm/Dimensions';
import { ControlledInput, ControlledTextArea } from '~/components/forms/Controllers/ControlFields';
import ProductSheet from '~/components/productListForm/ProductCategorySheet';
import RawMaterialSheet from '~/components/productListForm/RawMaterialSheet';
import ProductDetailsSheet from '~/components/productListForm/ProductDetailsSheet';

function Create() {
  const [open, setOpen] = useState(false);
  const [openRawMaterials, setOpenRawMaterials] = useState(false);
  const [openProductDetails, setOpenProductDetails] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedRawMaterial, setSelectedRawMaterial] = useState('');
  const [productDetails, setProductDetails] = useState({});

  const schema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().required(),
    back_story: yup.string().required(),
    price: yup.number().required('Price is required'),
    quantity: yup.number().required('Quantity is required'),
    is_customizable: yup.boolean().default(false),
    customize_note: yup.string().when('is_customizable', {
      is: true,
      then: (schema) => schema.default('none').required('Customize note is required'),
      otherwise: (schema) => schema.notRequired(),
    }),
    category: yup.string().required('Category is required'),
    raw_material: yup.string().required('Raw material is required'),
    product_details: yup.object().shape({}), // No validation for product details, as it can be dynamic
  });

  const {
    control,
    setValue, // to manually set the value of the category field
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const isCustomizable = useWatch({
    control,
    name: 'is_customizable',
    defaultValue: false,
  });

  const onSubmit = (data: any) => {
    const formData = {
      ...data,
      product_details: productDetails, // Include the product details in the final data
    };
    console.log(formData);
    if (formData) {
      setTimeout(() => reset(), 3000);
    }
  };

  return (
    <ScrollView mt="$6">
      <ProductSheet
        open={open}
        setOpen={setOpen}
        onSelectCategory={(category) => {
          setSelectedCategory(category);
          setValue('category', category); // manually set the form value
        }}
      />
      <RawMaterialSheet
        open={openRawMaterials}
        setOpen={setOpenRawMaterials}
        onSelectRawMaterial={(rawMaterial) => {
          setSelectedRawMaterial(rawMaterial);
          setValue('raw_material', rawMaterial);
        }}
      />
      <ProductDetailsSheet
        open={openProductDetails}
        setOpen={setOpenProductDetails}
        onSubmit={(details) => {
          setProductDetails(details);
          setValue('product_details', details); // manually set the form value
        }}
      />
      <YStack width={'100%'} height={'100%'} justifyContent="center" paddingHorizontal="$5">
        <H2 fontWeight={'bold'} mb="$2">
          List a New Product
        </H2>
        <Paragraph theme={'alt2'} fontSize={'$4'}>
          Fill the form below in order to list your product on the National Marketplace
        </Paragraph>
        <Form width="100%" pb="$2" onSubmit={handleSubmit(onSubmit)} mt="$6">
          <ControlledInput
            control={control}
            name="title"
            label="Title"
            placeholder="Title"
            error={errors.title?.message}
          />

          <ControlledTextArea
            control={control}
            name="description"
            label="Description"
            placeholder="Describe about the Job, and what are your expectations from the applicants."
            error={errors.description?.message}
          />

          <ControlledTextArea
            control={control}
            name="back_story"
            label="Back Story"
            placeholder="Any specific skill the applicant should have? Write it here"
            error={errors.back_story?.message}
          />

          <ControlledInput
            control={control}
            name="price"
            label="Product Price"
            placeholder="Price of the Product"
            error={errors.price?.message}
            keyboardType="numeric"
          />

          <Controller
            control={control}
            name="is_customizable"
            render={({ field: { onChange, value } }) => (
              <SwitchWithLabel
                size="$2"
                label="Enabling this would allow users to ask for customizations"
                onChange={onChange}
                value={value || false}
              />
            )}
          />
          {errors.is_customizable && (
            <Paragraph size={'$4'} color={'$red10'} mt="$-4">
              {errors.is_customizable.message}
            </Paragraph>
          )}

          {isCustomizable && (
            <ControlledTextArea
              control={control}
              name="customize_note"
              label="Customize Note"
              placeholder="Add any customization notes here"
              error={errors.customize_note?.message}
            />
          )}

          <Dimensions errors={errors} control={control} />

          <ControlledInput
            control={control}
            name="quantity"
            label="Product Quantity"
            placeholder="Quantity of the Product"
            error={errors.quantity?.message}
            keyboardType="numeric"
          />

          <Controller
            control={control}
            name="category"
            render={({ field: { value } }) => (
              <>
                <Button mb="$2" onPress={() => setOpen(true)}>
                  Choose From the Categories
                </Button>
                {value && <Paragraph my="$2">Selected Category: {value}</Paragraph>}
                {errors.category && (
                  <Paragraph size={'$4'} color={'$red10'} mt="$2">
                    {errors.category.message}
                  </Paragraph>
                )}
              </>
            )}
          />

          <Controller
            control={control}
            name="raw_material"
            render={({ field: { value } }) => (
              <>
                <Button onPress={() => setOpenRawMaterials(true)}>Choose Raw Material</Button>
                {value && <Paragraph mt="$2">Selected Raw Material: {value}</Paragraph>}
                {errors.raw_material && (
                  <Paragraph size={'$4'} color={'$red10'} mt="$2">
                    {errors.raw_material.message}
                  </Paragraph>
                )}
              </>
            )}
          />

          <Button mt="$2" onPress={() => setOpenProductDetails(true)}>
            Add Product Details
          </Button>
          {Object.keys(productDetails).length > 0 && (
            <YStack mt="$4">
              <H2>Product Details:</H2>
              {Object.entries(productDetails).map(([key, value], index) => (
                <Paragraph key={index} mt="$2">
                  {key}: {value}
                </Paragraph>
              ))}
            </YStack>
          )}

          <Form.Trigger asChild>
            <Button my="$6" themeInverse width={'100%'}>
              SUBMIT
            </Button>
          </Form.Trigger>
        </Form>
      </YStack>
    </ScrollView>
  );
}

export default Create;
