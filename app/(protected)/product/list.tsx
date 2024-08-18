import React, { useState } from 'react';
import { YStack, H2, Paragraph, Form, Button, ScrollView, Input, H3 } from 'tamagui';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { SwitchWithLabel } from '~/components/shared/SwitchWithLabel';
import Dimensions from '~/components/productListForm/Dimensions';
import { ControlledInput, ControlledTextArea } from '~/components/forms/Controllers/ControlFields';
import ProductSheet from '~/components/productListForm/ProductCategorySheet';
import RawMaterialSheet from '~/components/productListForm/RawMaterialSheet';
import ProductDetailsSheet from '~/components/productListForm/ProductDetailsSheet';
import { axiosRequest } from '~/lib/api';
import ImageUploader from '~/components/shared/ImageAdd';

function CreateProduct() {
  const [open, setOpen] = useState(false);
  const [openRawMaterials, setOpenRawMaterials] = useState(false);
  const [openProductDetails, setOpenProductDetails] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedRawMaterial, setSelectedRawMaterial] = useState('');
  const [productDetails, setProductDetails] = useState({});
  const [images, setImages] = useState<any[]>([]);

  const schema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().required(),
    back_story: yup.string().required(),
    price: yup.number().required('Price is required'),
    quantity: yup.number().required('Quantity is required'),
    is_customizable: yup.boolean().default(false),
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

  async function onSubmit(data: any) {
    const formData = new FormData();

    // Append form data fields
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    // Append each image in the array
    images.forEach((image, index) => {
      formData.append(`images[${index}]`, image);
    });

    const res = await axiosRequest(
      'product/',
      {
        method: 'post',
        data: formData,
      },
      true
    );

    if (res.success) {
      alert('Product was uploaded, wait before we review and list on the marketplace');
    } else {
      alert(res.message);
    }
  }

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
        selectedCategory={selectedCategory}
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
          Fill the form below in order to list your product on the ODOP Marketplace
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
            placeholder="Describe about the product, material used, etc ..."
            error={errors.description?.message}
          />

          <ImageUploader images={images} setImages={setImages} />

          <ControlledTextArea
            control={control}
            name="back_story"
            label="Back Story"
            placeholder="Back story for this product that you would like to share"
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

          <Dimensions errors={errors} control={control} />

          <ControlledInput
            control={control}
            name="quantity"
            label="Product Quantity"
            placeholder="Number of products you currently have to sell online"
            error={errors.quantity?.message}
            keyboardType="numeric"
          />

          <Controller
            control={control}
            name="category"
            render={({ field: { value } }) => (
              <>
                <Button mb="$2" onPress={() => setOpen(true)} themeInverse={Boolean(value)}>
                  {value ? `Selected Category: ${value}` : 'Choose your Product Category'}
                </Button>

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
                <Button onPress={() => setOpenRawMaterials(true)} themeInverse={Boolean(value)}>
                  {value
                    ? `Selected Raw Material: ${value}`
                    : 'Select raw material for your product'}
                </Button>

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
              <H3 theme={'alt2'}>Product Details:</H3>
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

export default CreateProduct;
