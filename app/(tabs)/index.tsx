import React, {useState} from 'react';
import { ScrollView, Image} from 'react-native';
import { H3, H6, YStack, Paragraph, Tabs, Button,XStack, Text, H4 } from 'tamagui';

type Product = {
  id: number;
  name: string;
  price: string;
  location: string;
  image: any; // You might want to use a more specific type for images
};

type Category = 'Edibles' | 'Clothing' | 'Handicraft';

type CategoryProducts = {
  [key in Category]: Product[];
};

const productsNearby = [
  {
    id: 1,
    name: 'Product 1',
    price: '$100',
    location : 'Ratnagiri, Mumbai',
    image: require('../../assets/Product1.png'),
  },
  {
    id: 2,
    name: 'Product 2',
    price: '$200',
    location : 'Nashik, Mumbai',
    image: require('../../assets/Product2.png'),
  },
  {
    id: 3,
    name: 'Product 3',
    price: '$150',
    location : 'Mumbai, Mumbai',
    image: require('../../assets/Product3.png'),
  },
];

const exploreMoreProducts = [
  {
    id: 4,
    name: 'Product 4',
    price: '$120',
    location : 'Mumbai, Mumbai',
    image: require('../../assets/Product1.png'),
  },
  {
    id: 5,
    name: 'Product 5',
    price: '$180',
    location : 'Mumbai, Mumbai',
    image: require('../../assets/Product2.png'),
  },
  {
    id: 6,
    name: 'Product 6',
    price: '$220',
    location : 'Mumbai, Mumbai',
    image: require('../../assets/Product3.png'),
  },
];

const categories: Category[] = ['Edibles', 'Clothing', 'Handicraft'];

const categoryProducts: CategoryProducts = {
  Edibles: [
    {
      id: 1,
      name: 'Mango Pickle',
      price: '$5',
      location: 'Ratnagiri, Maharashtra',
      image: require('../../assets/Product1.png'),
    },
    {
      id: 2,
      name: 'Coconut Ladoo',
      price: '$3',
      location: 'Kolhapur, Maharashtra',
      image: require('../../assets/Product1.png'),
    },
    {
      id: 3,
      name: 'Alphonso Mango',
      price: '$10',
      location: 'Ratnagiri, Maharashtra',
      image: require('../../assets/Product1.png'),
    },
  ],
  Clothing: [
    {
      id: 1,
      name: 'Mango Pickle',
      price: '$5',
      location: 'Ratnagiri, Maharashtra',
      image: require('../../assets/Product2.png'),
    },
    {
      id: 2,
      name: 'Coconut Ladoo',
      price: '$3',
      location: 'Kolhapur, Maharashtra',
      image: require('../../assets/Product2.png'),
    },
    {
      id: 3,
      name: 'Alphonso Mango',
      price: '$10',
      location: 'Ratnagiri, Maharashtra',
      image: require('../../assets/Product2.png'),
    },
  ],
  Handicraft: [
    {
      id: 1,
      name: 'Mango Pickle',
      price: '$5',
      location: 'Ratnagiri, Maharashtra',
      image: require('../../assets/Product3.png'),
    },
    {
      id: 2,
      name: 'Coconut Ladoo',
      price: '$3',
      location: 'Kolhapur, Maharashtra',
      image: require('../../assets/Product3.png'),
    },
    {
      id: 3,
      name: 'Alphonso Mango',
      price: '$10',
      location: 'Ratnagiri, Maharashtra',
      image: require('../../assets/Product3.png'),
    },
  ],
};

const HomePage: React.FC = () => {

  const [activeCategory, setActiveCategory] = useState('Edibles');

  return (
    <ScrollView>
      <YStack 
        flex={1} 
        alignItems="center"
        paddingHorizontal="$5"
      >
        <H3 width={"100%"} color="#fff">Good Afternoon, User</H3>
        <Paragraph 
          width={"100%"}
          size={"$4"}
          theme="alt2"
          marginBottom={"$3"}
        >
          Ratnagiri, Maharashtra
        </Paragraph>
        
        <Image
          source={require('../../assets/HomePageImage.png')}
          style={{
            width: "100%",
            height: 200,
            borderRadius: 20,
            marginBottom: 20,
          }}
        />

        <H4 width={"100%"} color="#fff">Products Nearby</H4>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={{ marginTop: 10 }}
        >
          {productsNearby.map(product => (
            <YStack 
              key={product.id} 
              marginRight="$3" 
              borderRadius="$3" 
              marginTop="$1" 
              width={150}
            >
              <Image
                source={product.image}
                style={{ width: "100%", height: 200, borderRadius: 10, marginBottom: 10 }}
              />
              <H6
              size={"$4"}
            >{product.name}</H6>
            <H6
              size={"$1"}
              theme="alt2"
            >{product.location}</H6>
            <H6
              size={"$5"}
            >{product.price}</H6>
            </YStack>
          ))}
        </ScrollView>



      
      {/* Explore More */}
      <YStack width={"100%"} flexDirection="row" alignItems="center" justifyContent="space-between" marginTop="$7">
          <H4 color="#fff">Explore More</H4>
         
          <H6
              size={"$3"}
              theme="alt2"
            >See More</H6>
        
        </YStack>
        
        <YStack width="100%" flexDirection="row">
        <Tabs
          defaultValue="Edibles"
          orientation="horizontal"
          flexDirection="column"
          width="100%"
          height={400}
          marginTop="$2"
        >
          <Tabs.List
              disablePassBorderRadius="bottom"
              aria-label="Product categories"
              backgroundColor="transparent"
              style={{ marginRight: 10 }}
            >
              {categories.map((category) => (
                <Tabs.Tab
                  key={category}
                  value={category}
                  flex={1}
                  unstyled
                  onPress={() => setActiveCategory(category)}
                >
                  <XStack
                    backgroundColor="transparent"
                    alignItems="center"
                    justifyContent="flex-start" 
                    width={"100%"}
                    borderBottomWidth={2}
                    borderBottomColor={activeCategory === category ? '$orange10' : 'transparent'}
                    paddingVertical="$2"
                    paddingLeft="$3"
                  >
                    <H6
                      size={"$2"} // Smaller font size
                      color={activeCategory === category ? '$orange10' : '$gray10'}
                      fontWeight={activeCategory === category ? "bold" : "normal"}
                    >
                      {category}
                    </H6>
                  </XStack>
                </Tabs.Tab>
              ))}
            </Tabs.List>

          {categories.map((category) => (
            <Tabs.Content key={category} value={category}>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false} 
                style={{ marginTop: 10, height: "auto" }}
              >
                {categoryProducts[category].map((product: Product) => (
                  <YStack 
                    key={product.id} 
                    marginRight="$3" 
                    marginTop="$2" 
                    borderRadius="$3" 
                    width={150}
                    backgroundColor="$backgroundStrong"
                    padding="$2"
                  >
                    <Image
                      source={product.image}
                      style={{ width: "100%", height: 200, borderRadius: 10, marginBottom: 10 }}
                    />
                    <H6
                        size={"$4"}
                      >{product.name}</H6>
                      <H6
                        size={"$1"}
                        theme="alt2"
                      >{product.location}</H6>
                      <H6
                        size={"$5"}
                      >{product.price}</H6>
                  </YStack>
                ))}
                
              </ScrollView>
            </Tabs.Content>
          ))}
        </Tabs>
        </YStack>
      </YStack>
    </ScrollView>
  );
};

export default HomePage;