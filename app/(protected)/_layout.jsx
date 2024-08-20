import { Stack } from 'expo-router';

export default function ProtectedLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: 'transparent',
        },
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: 16,
        },
      }}>
      <Stack.Screen
        name="artisan/portal/rentalMachine/[id]"
        options={{ headerShown: true, title: 'Machine Details' }}
      />
      <Stack.Screen
        name="artisan/portal/rentalMachine/create"
        options={{ headerShown: true, title: 'List a Machine for rent' }}
      />
      <Stack.Screen
        name="artisan/portal/job/create"
        options={{ headerShown: true, title: 'Create New Job' }}
      />
      <Stack.Screen
        name="artisan/portal/rentalMachine/book/[id]"
        options={{ headerShown: true, title: 'Machine Booking' }}
      />
      <Stack.Screen name="artisan/portal/rentalMachine/listedMachines" options={{ headerShown: true, title: 'My Listed Machine' }} />

      <Stack.Screen name="artisan/portal/job/listedJobs" options={{ headerShown: true, title: 'My Listed Jobs' }} />


      <Stack.Screen
        name="artisan/workshop/[id]"
        options={{ headerShown: true, title: 'Workshop Details' }}
      />
      <Stack.Screen
        name="artisan/brochure/[id]"
        options={{ headerShown: true, title: 'Products Brochure' }}
      />

      <Stack.Screen
        name="artisan/events/[id]"
        options={{ headerShown: true, title: 'Event Details' }}
      />

      <Stack.Screen
        name="district/[id]"
        options={{ headerShown: true, title: 'District Details' }}
      />

      <Stack.Screen
        name="artisan/profile/connectionRequests"
        options={{ headerShown: true, title: 'Get In Touch Requests' }}
      />
      <Stack.Screen
        name="artisan/profile/edit"
        options={{ headerShown: true, title: 'Edit Your Profile' }}
      />
      <Stack.Screen
        name="artisan/profile/inventory"
        options={{ headerShown: true, title: 'Product Inventory' }}
      />
      <Stack.Screen name="artisan/profile/[id]" options={{ headerShown: true, title: 'Profile' }} />

      

      <Stack.Screen name="artisan/info/[id]" options={{ headerShown: true, title: 'Details' }} />
      <Stack.Screen
        name="artisan/info/index"
        options={{ headerShown: true, title: 'Know more about ODOP' }}
      />

      <Stack.Screen name="order/[id]" options={{ headerShown: true, title: 'Order Details' }} />
      <Stack.Screen name="order/all" options={{ headerShown: true, title: 'All Orders' }} />
      <Stack.Screen name="order/cart" options={{ headerShown: true, title: 'My Cart' }} />
      <Stack.Screen name="order/checkout" options={{ headerShown: true, title: 'Checkout' }} />

      <Stack.Screen name="product/[id]" options={{ headerShown: true, title: 'Product Details' }} />
      <Stack.Screen
        name="product/list"
        options={{ headerShown: true, title: 'List your product' }}
      />

      


    </Stack>
  );
}
