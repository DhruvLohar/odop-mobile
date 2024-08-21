import React, { useEffect, useMemo, useState } from 'react';
import { YStack, ScrollView } from 'tamagui';
import RentalMachineCardArtisan from '~/components/custom/RentalMachineCardArtisan';
import RentalMachineCard from '~/components/custom/RentalMachineCardArtisan';
import { axiosRequest } from '~/lib/api';

export default function listedJob({ currentFilters }: any) {
  const [rentalMachines, setRentalMachines] = useState<any[]>([]);

  async function fetchRentalMachines() {
    const res = await axiosRequest(
      'community/rental_machines/',
      {
        method: 'get',
      },
      false
    );

    if (res?.success) {
      setRentalMachines(res.rental_machines);
    }
  }

  useEffect(() => {
    console.log(currentFilters);
  }, [currentFilters]);

  useEffect(() => {
    fetchRentalMachines();
  }, []);

  return (
    <ScrollView flex={1}>
      <YStack flex={1} alignItems="center" px="$4">
        {rentalMachines.map((rentalmachine: RentalMachine) => (
          <RentalMachineCardArtisan key={rentalmachine.id} {...rentalmachine} />
        ))}
      </YStack>
    </ScrollView>
  );
}
